// Local demonstration of reminders and reassignment; no background delivery.
function actorCanSee(actor,r){if(!r)return false;if(r.owner===actor)return true;if(r.visibility==='private'||!grantCategories(db.grants[r.owner]?.[actor]).includes(recordCategory(r)))return false;return (!r.source||actorCanSee(actor,db.documents.find(d=>d.id===r.source)))&&(!r.medSource||actorCanSee(actor,db.meds.find(m=>m.id===r.medSource)))}
function dueForResponse(e){return e.status==='pending'&&e.date&&new Date(e.date+'T'+(e.time||'00:00'))<=new Date()&&!e.response&&!e.reassignment}
function responseBlock(e){
 if(e.status!=='pending')return '';
 let html='';
 if(e.reassignment)html=`<div class="notice"><strong>Necesita reasignación</strong><p>${people[e.reassignment.by].name} indicó que no puede realizarla. ${esc(e.reassignment.reason||'Sin motivo adicional.')}</p><small>${actorCanSee('sofia',e)?'Solicitud disponible en los avisos de Sofía.':'Sofía no tiene acceso a esta actividad; no se le muestra su información.'}</small>${user==='sofia'?button('Reasignar','reassign',e.id,'btn full'):''}</div>`;
 else if(e.assignee===user)html=`<div class="card"><h3>Tu respuesta</h3><p>${e.response?'Aviso respondido. La actividad sigue pendiente hasta que registres su resolución.':dueForResponse(e)?'La gestión llegó a su fecha. El aviso se repite hasta que respondas.':'Cuando llegue el momento, el aviso se repetirá hasta tu respuesta.'}</p>${!e.response?button('Estoy al tanto','acknowledge',e.id,'btn secondary full'):''}${button('No puedo realizarla','unable',e.id,'btn quiet full')}<small>Demo: repetición cada ${e.repeatMinutes||60} minutos, sin notificaciones reales.</small>${button('Configurar repetición','repeat-settings',e.id,'btn quiet full')}</div>`;
 return html;
}
function followupSheet(s){
 if(s.type==='alerts'){
  const ev=visible(db.events,'care').filter(e=>e.status==='pending'&&e.date&&e.date<=addDay(today(),3));
  const repeats=ev.filter(e=>e.assignee===user&&dueForResponse(e));
  const requests=user==='sofia'?visible(db.events,'care').filter(e=>e.status==='pending'&&e.reassignment):[];
  const meds=visible(db.meds).filter(needsAttention);
  sheet('Avisos',`<p class="muted tiny">Avisos de tu perfil y próximas gestiones compartidas.</p>${requests.length?'<h3>Necesitan reasignación</h3>'+requests.map(e=>`<div class="card"><h3>${esc(e.title)}</h3><p>${people[e.reassignment.by].name} no puede realizarla.</p>${button('Revisar y reasignar','reassign',e.id,'btn full')}</div>`).join(''):''}${repeats.length?'<h3>Esperan tu respuesta</h3>'+repeats.map(e=>`<div class="card"><h3>${esc(e.title)}</h3><p>Repetición: cada ${e.repeatMinutes||60} minutos. ${e.simulatedRepeats||0} repeticiones simuladas.</p>${button('Ver y responder','event',e.id,'btn secondary full')}</div>`).join('')+button('Simular siguiente repetición','simulate-repeat','','btn full'):''}<div class="section-title">Próximas gestiones</div>${ev.map(eventCard).join('')}${meds.map(m=>button(`<h3>${esc(m.title)}</h3><p>Revisar existencias o receta · ${people[m.owner].name}</p>`,'med',m.id,'card action')).join('')}${!ev.length&&!meds.length&&!requests.length?empty('Sin avisos','No hay gestiones próximas disponibles.'):''}<div class="notice demo">Simulación local. El botón representa el próximo intervalo configurado; no adelanta el calendario ni envía notificaciones. Responder detiene la repetición, pero no completa la actividad.</div>`);return true;
 }
 if(['unable','reassign','repeat-settings'].includes(s.type)){
  const e=db.events.find(e=>e.id===s.id);if(!can(e,'care')||e.status!=='pending'){denied();return true}
  if(s.type==='unable'){
   if(e.assignee!==user||e.reassignment){denied();return true}
   sheet('No puedo realizarla',`<p>${esc(e.title)}</p><form id="unable-form"><label>Motivo (opcional)</label><textarea name="reason" maxlength="300" placeholder="Ej. no puedo acompañarlo ese día"></textarea><p>${actorCanSee('sofia',e)?'Sofía verá la solicitud para buscar otro responsable.':'Sofía no tiene permiso para ver esta actividad. La solicitud quedará registrada aquí sin compartir información.'}</p><button class="btn full">Registrar y pedir reasignación</button></form>`);
  }else if(s.type==='reassign'){
   if(user!=='sofia'||!e.reassignment){denied();return true}
   const candidates=actors.filter(a=>a!==e.reassignment.by&&actorCanSee(a,e));
   sheet('Reasignar actividad',`<h3>${esc(e.title)}</h3><p>${people[e.reassignment.by].name}: ${esc(e.reassignment.reason||'No puede realizarla.')}</p>${candidates.length?`<form id="reassign-form"><label>Nuevo responsable con acceso</label><select name="assignee">${candidates.map(a=>`<option value="${a}">${people[a].name}</option>`).join('')}</select><button class="btn full" style="margin-top:16px">Confirmar reasignación</button></form>`:empty('No hay otro responsable autorizado','Primero debe autorizarse el acceso correspondiente.')}<div class="notice">La tarea conserva fecha, documento e historial. No se amplían permisos.</div>`);
  }else{
   if(e.assignee!==user){denied();return true}
   sheet('Repetición del aviso',`<form id="repeat-form"><label>Hasta que respondas, repetir cada</label><select name="minutes">${[30,60,120,1440].map(n=>`<option value="${n}" ${n===(e.repeatMinutes||60)?'selected':''}>${n===1440?'1 día':n+' minutos'}</option>`).join('')}</select><p>Solo simulación. La repetición termina al responder, completar, cancelar o pedir reasignación.</p><button class="btn full">Guardar</button></form>`);
  }return true;
 }
 if(s.type==='edit-document'){
  const d=db.documents.find(d=>d.id===s.id);if(!can(d)){denied();return true}
  sheet('Completar documento',`<p>El archivo original se conserva.</p><form id="document-edit-form"><label>Título (opcional)</label><input name="title" value="${esc(d.title)}"><label>Tipo</label><select name="kind">${documentKinds().map(k=>`<option ${k===d.kind?'selected':''}>${esc(k)}</option>`).join('')}</select><label>Fecha del documento (opcional)</label><input type="date" name="date" value="${d.date||''}"><label>Contenido o nota (opcional)</label><textarea name="text">${esc(d.text)}</textarea><button class="btn full">Guardar datos</button></form>`);return true;
 }
 return false;
}
function followupForm(form,f,v,s){
 if(form.id==='document-edit-form'){const d=db.documents.find(d=>d.id===s.id);if(!can(d)){denied();return true}Object.assign(d,{title:v.title.trim()||d.filename||'Documento sin título',kind:v.kind,date:v.date,text:v.text.trim(),needsDetails:false});log(d,'Actualizó datos del documento');open('document',d.id);render();return true}
 if(['unable-form','reassign-form','repeat-form'].includes(form.id)){
  const e=db.events.find(e=>e.id===s.id);if(!can(e,'care')||e.status!=='pending'){denied();return true}
  if(form.id==='unable-form'){
   if(e.assignee!==user||e.reassignment){denied();return true}e.reassignment={by:user,at:stamp(),reason:v.reason.trim()};e.response={by:user,at:stamp(),type:'unable'};log(e,'Indicó que no puede realizarla; solicitó reasignación');
  }else if(form.id==='reassign-form'){
   if(user!=='sofia'||!e.reassignment||v.assignee===e.reassignment.by||!actors.includes(v.assignee)||!actorCanSee(v.assignee,e)){denied();return true}
   const prior=e.assignee;e.assignee=v.assignee;e.recipient=v.assignee;e.response=null;e.reassignment=null;e.simulatedRepeats=0;log(e,`Reasignó de ${people[prior].name} a ${people[e.assignee].name}`);
  }else{if(e.assignee!==user||![30,60,120,1440].includes(Number(v.minutes))){denied();return true}e.repeatMinutes=Number(v.minutes);log(e,'Cambió intervalo de repetición del aviso')}
  open('event',e.id);render();return true;
 }
 return false;
}
const followupActions={
 'edit-document':id=>open('edit-document',id),'unable':id=>open('unable',id),'reassign':id=>open('reassign',id),'repeat-settings':id=>open('repeat-settings',id),
 acknowledge:id=>{const e=db.events.find(e=>e.id===id);if(!can(e,'care')||e.assignee!==user||e.status!=='pending'||e.reassignment)return denied();e.response={by:user,at:stamp(),type:'acknowledged'};log(e,'Respondió al aviso; la actividad sigue pendiente');render()},
 'simulate-repeat':()=>{const es=visible(db.events,'care').filter(e=>e.assignee===user&&dueForResponse(e));es.forEach(e=>{e.simulatedRepeats=(e.simulatedRepeats||0)+1});persist();render();toast(es.length?'Se simuló una nueva repetición para los avisos sin respuesta.':'No hay avisos que repetir.')}
};
