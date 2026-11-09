// Physical stock counts are explicit user corrections, independent of recorded doses.
function medicationSheet(s){
 if(s.type!=='reconcile-stock')return false;
 const m=db.meds.find(x=>x.id===s.id);if(!can(m)){denied();return true}
 const boxes=m.batches.filter(b=>!b.archived);
 sheet('Actualizar cantidad',`<h3>${esc(m.title)}</h3><p class="muted tiny">${people[m.owner].name} · ${qty(m)} ${esc(m.unit)} registrados</p><p style="margin-top:14px">Contá lo que queda en cada caja y corregí la cantidad. Podés hacerlo aunque te hayas olvidado de registrar tomas.</p>${boxes.length?`<form id="reconcile-stock-form">${boxes.map((b,i)=>`<div class="stock-count-row"><label for="count-${i}">${b.expiry?`${daysTo(b.expiry)<0?'Venció':'Vence'} ${dateLabel(b.expiry)}`:'Caja sin fecha de vencimiento'}${b.opened?' · Abierta':''}<small>Antes: ${b.qty} ${esc(m.unit)}</small></label><input id="count-${i}" type="number" name="count:${esc(b.id)}" min="0" step="1" value="${b.qty}" aria-label="Cantidad actual, caja ${i+1}" required></div>`).join('')}<p class="muted tiny">Si una caja ya se terminó, ingresá 0. Esto cambia el inventario; no registra tomas.</p><div class="actions"><button class="btn full">Guardar cantidad revisada</button></div></form>`:empty('Sin cajas registradas','Agregá una caja para ingresar su cantidad.')+button('Agregar caja','purchase',m.id,'btn full')}${boxes.length?button('Compré otra caja','purchase',m.id,'btn quiet full'):''}`);
 return true;
}
function medicationForm(form,f,v,s){
 if(form.id!=='reconcile-stock-form')return false;
 const m=db.meds.find(x=>x.id===s.id);if(!can(m)){denied();return true}
 const boxes=m.batches.filter(b=>!b.archived),counts=boxes.map(b=>Number(f.get('count:'+b.id)));
 if(!boxes.length||counts.some(n=>!Number.isInteger(n)||n<0)||boxes.some(b=>!f.has('count:'+b.id)||String(f.get('count:'+b.id)).trim()==='')){toast('Ingresá una cantidad entera, desde cero, para cada caja.');return true}
 const before=qty(m),changes=boxes.map((b,i)=>`${b.expiry?dateLabel(b.expiry):'Sin fecha'}: ${b.qty} → ${counts[i]}`);
 boxes.forEach((b,i)=>b.qty=counts[i]);m.updated=today();m.stockChecked=today();
 log(m,`Revisó cantidad en casa: ${before} → ${qty(m)} ${m.unit}. ${changes.join('; ')}`);
 persist();open('med',m.id);render();toast('Cantidad revisada y guardada');return true;
}
const medicationActions={'reconcile-stock':mid=>open('reconcile-stock',mid)};
