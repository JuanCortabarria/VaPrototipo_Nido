// Assistant answers about upcoming activities. Default horizon: next 7 days, adjustable with one tap.
// Repeated activities (routines) are shown once per series instead of once per occurrence.
const agendaRanges=[[2,'Próximos 2 días'],[7,'Esta semana'],[30,'Este mes'],[0,'Todo']];
const isAgendaQuestion=term=>/turno|consulta|agenda|pendiente|aviso|tengo|pr[oó]xim|\bhoy\b|ma[ñn]ana|semana|actividad|\bmes\b/.test(term);
function agendaRangeFor(term){if(/\btodo|todas|todos\b/.test(term))return 0;if(/\bmes\b/.test(term))return 30;if(/\bhoy\b|ma[ñn]ana/.test(term)&&!/semana/.test(term))return 2;return 7}
const byWhen=(a,b)=>(a.date||'9999').localeCompare(b.date||'9999')||(a.time||'99').localeCompare(b.time||'99');
function groupSeries(list){
 const out=[],series=new Map();
 for(const e of list){
  if(!e.seriesId){out.push({first:e,events:[e]});continue}
  let g=series.get(e.seriesId);if(!g){g={first:e,events:[],series:true};series.set(e.seriesId,g);out.push(g)}
  g.events.push(e);
 }
 return out;
}
function agendaLine(g,showDate){
 const e=g.first,who=people[e.owner]?.name||'';let when;
 if(g.series){const times=[...new Set(g.events.map(x=>x.time).filter(Boolean))].sort();const freq=(e.seriesLabel||'Actividad repetida').split(' · ')[0].toLocaleLowerCase();when=`${freq}${times.length?' '+times.join(' y '):''}${e.seriesUntil?`, hasta ${dateLabel(e.seriesUntil)}`:''}`}
 else when=[showDate&&e.date?dateLabel(e.date):'',e.time].filter(Boolean).join(' · ')||'Sin hora';
 return button(`<strong>${esc(e.title)}</strong><small>${esc(when)} · ${esc(who)}</small>`,'event',e.id,'answer-item');
}
function agendaAnswer(idx,range){
 const t=today(),tomorrow=addDay(t,1),end=range?addDay(t,range-1):'';
 const pending=visible(db.events,'care').filter(e=>e.status==='pending').sort(byWhen);
 const upcoming=pending.filter(e=>e.date&&e.date>=t),inRange=upcoming.filter(e=>!end||e.date<=end);
 const items=groupSeries(inRange),shownSeries=new Set(items.filter(g=>g.series).map(g=>g.first.seriesId));
 const later=groupSeries(upcoming.filter(e=>end&&e.date>end)).filter(g=>!(g.series&&shownSeries.has(g.first.seriesId)));
 const overdue=groupSeries(pending.filter(e=>e.date&&e.date<t)),undated=pending.filter(e=>!e.date).map(e=>({first:e,events:[e]}));
 const restLabel=range===7?'Resto de la semana':range===30?'Resto del mes':'Más adelante';
 const groups=[['Hoy',g=>g.first.date===t,false],['Mañana',g=>g.first.date===tomorrow,false],[restLabel,g=>g.first.date>tomorrow,true]];
 const intro=range?`${range===2?'Esto tenés hoy y mañana':`Esto tenés en los próximos ${range} días`}, hasta el ${dateLabel(end)}:`:'Todas las actividades pendientes con fecha:';
 const body=groups.map(([label,test,showDate])=>{const list=items.filter(test);return list.length?`<div class="answer-group"><h4>${label}</h4>${list.map(g=>agendaLine(g,showDate)).join('')}</div>`:''}).join('');
 const nextRange=range===2?7:range===7?30:0;
 const extra=(list,label)=>list.length?`<details class="answer-extra"><summary>${label} (${list.length})</summary>${list.map(g=>agendaLine(g,true)).join('')}</details>`:'';
 return `<p>${intro}</p>${body||'<p class="muted">No hay actividades en este período.</p>'}${later.length?`<p class="answer-more">Hay ${later.length} ${later.length===1?'actividad más':'actividades más'} después del ${dateLabel(end)} · ${button('Ver más','agenda-range',`${idx}:${nextRange}`,'link-button')}</p>`:''}${extra(overdue,'Atrasados')}${extra(undated,'Sin fecha')}<div class="chips answer-ranges" aria-label="Cambiar período">${agendaRanges.map(([r,label])=>button(label,'agenda-range',`${idx}:${r}`,`chip ${r===range?'active':''}`)).join('')}</div>`;
}
function medsAnswer(){
 const meds=visible(db.meds),buy=meds.filter(m=>m.shopping),rest=meds.filter(m=>!m.shopping);
 if(!meds.length)return '';
 const line=m=>button(`<strong>${esc(m.title)}</strong><small>${qty(m)} ${esc(m.unit)} · ${people[m.owner].name}</small>`,'med',m.id,'answer-item');
 return `<div class="answer-group"><h4>Para comprar (${buy.length})</h4>${buy.map(line).join('')||'<p class="muted tiny">No hay medicamentos marcados para comprar.</p>'}</div>${rest.length?`<div class="answer-group"><h4>Otros medicamentos</h4>${rest.map(line).join('')}</div>`:''}`;
}
const assistantActions={
 'agenda-range':arg=>{const [i,r]=arg.split(':').map(Number),m=chat[i];if(!m||m.agenda===undefined)return;m.agenda=r;const main=$('#main'),top=main.scrollTop;render();$('#main').scrollTop=top}
};
