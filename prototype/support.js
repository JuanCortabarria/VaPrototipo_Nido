/*
 * Nido · runtime del prototipo
 *
 * Interpreta la plantilla que está dentro de <x-dc> en index.html y la dibuja con React:
 *   - {{ ruta.al.valor }}   en texto y en atributos (incluido style)
 *   - <sc-if value="{{ x }}">          muestra el contenido si x es verdadero
 *   - <sc-for list="{{ xs }}" as="x">   repite el contenido por cada elemento
 *   - <helmet>                          su contenido (title, link, style) va al <head>
 *
 * La lógica vive en la clase Component (al final de index.html), que extiende DCLogic:
 *   state, setState(), renderVals() y los ciclos componentDidMount / componentDidUpdate / componentWillUnmount.
 */
(function () {
  'use strict';

  var ROOT = 'nido';
  var reg = window.__dcRegistry = window.__dcRegistry || {};
  reg[ROOT] = reg[ROOT] || { Logic: null, logicError: null, ver: 0, subs: [] };
  window.__dcRootName = function () { return ROOT; };

  // Oculta la plantilla cruda mientras carga (evita ver {{ }} un instante).
  var hide = document.createElement('style');
  hide.textContent = 'x-dc{display:none!important}';
  document.head.appendChild(hide);

  // ---------- Lógica base ----------
  function DCLogic() {}
  DCLogic.prototype.setState = function (update, cb) {
    var prev = this.state || {};
    var patch = typeof update === 'function' ? update(prev) : update;
    if (patch == null) return;
    this.state = Object.assign({}, prev, patch);
    if (this.__rerender) this.__rerender();
    if (typeof cb === 'function') cb();
  };
  window.DCLogic = DCLogic;

  // ---------- Compilación de la plantilla ----------
  var EXPR = /\{\{\s*([A-Za-z_$][\w$]*(?:\.[\w$]+)*)\s*\}\}/g;

  function parts(str) {
    var out = [], last = 0, m;
    EXPR.lastIndex = 0;
    while ((m = EXPR.exec(str))) {
      if (m.index > last) out.push({ s: str.slice(last, m.index) });
      out.push({ p: m[1].split('.') });
      last = m.index + m[0].length;
    }
    if (last < str.length) out.push({ s: str.slice(last) });
    return out;
  }

  var EVENTS = {
    onclick: 'onClick', onchange: 'onChange', oninput: 'onInput', onkeydown: 'onKeyDown', onkeyup: 'onKeyUp',
    onpointerdown: 'onPointerDown', onpointermove: 'onPointerMove', onpointerup: 'onPointerUp',
    onpointerleave: 'onPointerLeave', onpointercancel: 'onPointerCancel', onscroll: 'onScroll',
    onfocus: 'onFocus', onblur: 'onBlur', onsubmit: 'onSubmit', onmouseenter: 'onMouseEnter', onmouseleave: 'onMouseLeave'
  };

  function camel(name) { return name.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }); }

  function compile(node, inSvg) {
    if (node.nodeType === 3) {
      var txt = node.nodeValue;
      if (!txt.trim()) return { t: 'text', parts: [{ s: ' ' }] };
      return { t: 'text', parts: parts(txt.replace(/\s+/g, ' ')) };
    }
    if (node.nodeType !== 1) return null;
    var tag = node.localName;
    var svg = inSvg || tag === 'svg';
    var kids = [];
    var src = tag === 'template' ? node.content.childNodes : node.childNodes;
    for (var i = 0; i < src.length; i++) { var c = compile(src[i], svg); if (c) kids.push(c); }

    if (tag === 'sc-if') return { t: 'if', v: parts(node.getAttribute('value') || ''), kids: kids };
    if (tag === 'sc-for') return { t: 'for', v: parts(node.getAttribute('list') || ''), as: node.getAttribute('as') || 'item', kids: kids };

    var props = [];
    for (var j = 0; j < node.attributes.length; j++) {
      var a = node.attributes[j], n = a.name;
      if (n.indexOf('hint-placeholder') === 0) continue;
      var key;
      if (EVENTS[n]) key = EVENTS[n];
      else if (n === 'class') key = 'className';
      else if (n === 'for') key = 'htmlFor';
      else if (n === 'tabindex') key = 'tabIndex';
      else if (n === 'readonly') key = 'readOnly';
      else if (n === 'autofocus') key = 'autoFocus';
      else if (svg && n.indexOf('-') > 0 && n.indexOf('data-') !== 0 && n.indexOf('aria-') !== 0) key = camel(n);
      else key = n;
      props.push({ k: key, v: parts(a.value) });
    }
    if (tag === 'textarea') kids = [];
    return { t: 'el', tag: tag, props: props, kids: kids };
  }

  // ---------- Evaluación ----------
  function look(path, scope) {
    var v = scope[path[0]];
    for (var i = 1; i < path.length && v != null; i++) v = v[path[i]];
    return v;
  }
  function val(ps, scope) {
    if (ps.length === 1 && ps[0].p) return look(ps[0].p, scope);
    var s = '';
    for (var i = 0; i < ps.length; i++) {
      if (ps[i].p) { var v = look(ps[i].p, scope); s += v == null || v === false ? '' : v; }
      else s += ps[i].s;
    }
    return s;
  }
  function styleObj(str) {
    var o = {}, depth = 0, start = 0, decls = [];
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === '(') depth++; else if (ch === ')') depth--;
      else if (ch === ';' && depth === 0) { decls.push(str.slice(start, i)); start = i + 1; }
    }
    decls.push(str.slice(start));
    decls.forEach(function (d) {
      var k = d.indexOf(':'); if (k < 0) return;
      var p = d.slice(0, k).trim(), v = d.slice(k + 1).trim();
      if (!p || v === '') return;
      if (p.indexOf('--') !== 0) {
        var vendor = /^-(webkit|moz|ms)-/.exec(p);
        p = vendor ? (vendor[1] === 'ms' ? 'ms' : vendor[1][0].toUpperCase() + vendor[1].slice(1)) + camel('-' + p.slice(vendor[0].length)) : camel(p);
      }
      o[p] = v;
    });
    return o;
  }
  function truthy(v) { return !(v == null || v === false || v === 0 || v === '' || v === 'false'); }

  var h;
  function renderList(nodes, scope) {
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      var r = renderNode(nodes[i], scope, i);
      if (r != null) out.push(r);
    }
    return out;
  }
  function renderNode(n, scope, key) {
    if (n.t === 'text') { var t = val(n.parts, scope); return t == null || t === false ? null : String(t); }
    if (n.t === 'if') return truthy(val(n.v, scope)) ? h(React.Fragment, { key: key }, renderList(n.kids, scope)) : null;
    if (n.t === 'for') {
      var list = val(n.v, scope);
      if (!list || !list.length) return null;
      var items = [];
      for (var i = 0; i < list.length; i++) {
        var sc = Object.create(scope); sc[n.as] = list[i];
        items.push(h(React.Fragment, { key: i }, renderList(n.kids, sc)));
      }
      return h(React.Fragment, { key: key }, items);
    }
    var props = { key: key };
    for (var j = 0; j < n.props.length; j++) {
      var p = n.props[j], v = val(p.v, scope);
      if (p.k === 'style') { props.style = styleObj(String(v == null ? '' : v)); continue; }
      if (/^on[A-Z]/.test(p.k)) { if (typeof v === 'function') props[p.k] = v; continue; }
      if (p.k === 'disabled' || p.k === 'readOnly' || p.k === 'autoFocus') { props[p.k] = truthy(v); continue; }
      if (p.k === 'value') { props.value = v == null ? '' : v; continue; }
      if (v == null) continue;
      props[p.k] = typeof v === 'boolean' ? String(v) : v;
    }
    if ((n.tag === 'input' || n.tag === 'textarea') && 'value' in props && !props.onChange) props.readOnly = true;
    var kids = renderList(n.kids, scope);
    return kids.length ? h(n.tag, props, kids) : h(n.tag, props);
  }

  // ---------- Montaje ----------
  function boot() {
    h = React.createElement;
    var x = document.querySelector('x-dc');
    if (!x) return;

    var tree = [];
    Array.prototype.slice.call(x.childNodes).forEach(function (c) {
      if (c.nodeType === 1 && c.localName === 'helmet') {
        Array.prototype.slice.call(c.childNodes).forEach(function (hc) {
          if (hc.nodeType !== 1) return;
          if (hc.localName === 'title') document.title = hc.textContent;
          else document.head.appendChild(hc);
        });
        return;
      }
      var k = compile(c, false); if (k) tree.push(k);
    });

    var root = document.createElement('div');
    root.id = 'dc-root';
    x.parentNode.insertBefore(root, x);
    x.parentNode.removeChild(x);

    var entry = reg[ROOT], mounted = false;

    function Host(props) {
      var logic = props.logic;
      var force = React.useReducer(function (n) { return n + 1; }, 0)[1];
      logic.__rerender = force;
      var first = React.useRef(true);
      React.useLayoutEffect(function () {
        if (first.current) { first.current = false; if (logic.componentDidMount) logic.componentDidMount(); }
        else if (logic.componentDidUpdate) logic.componentDidUpdate();
      });
      React.useLayoutEffect(function () { return function () { if (logic.componentWillUnmount) logic.componentWillUnmount(); }; }, []);
      var vals;
      try { vals = logic.renderVals(); }
      catch (e) { console.error(e); return h('pre', { style: { padding: '24px', color: '#8E2A14', whiteSpace: 'pre-wrap' } }, 'Error en el prototipo: ' + (e && e.stack || e)); }
      return h(React.Fragment, null, renderList(tree, vals));
    }

    function mount() {
      if (mounted || !entry.Logic) return;
      mounted = true;
      var logic;
      try { logic = new entry.Logic(); }
      catch (e) { entry.logicError = e; console.error(e); return; }
      ReactDOM.createRoot(root).render(h(Host, { logic: logic }));
    }
    entry.subs.push(mount);
    mount();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
