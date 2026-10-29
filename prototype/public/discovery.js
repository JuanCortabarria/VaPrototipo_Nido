// Research-driven flows: document retrieval, follow-through and continuity of care.
function documentKinds(){return [...new Set(['Informe de consulta','Resultado','Indicación','Orden','Receta','Carné','Documento',...visible(db.documents).map(d=>d.kind)])]}
function documentLibrary(){
 const docs=filtered(db.documents).filter(d=>(d.title+' '+d.text).toLocaleLowerCase().includes(docQuery.toLocaleLowerCase())).filter(d=>!docType||d.kind===docType).filter(d=>!docFrom||(d.date&&d.date>=docFrom)).filter(d=>!docTo||(d.date&&d.date<=docTo)).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 return `<div class="page-title between"><div><h1>Documentos</h1><p>Encontrá la fuente cuando la necesites.</p></div>${allowedPatients().length?button(icon('plus'),'upload','','iconbtn'):''}</div>${chips()}<form id="document-filters"><label class="sr-only" for="doc-query">Buscar documentos</label><div class="search">${icon('search')}<input id="doc-query" name="query" placeholder="Título o contenido" type="search" value="${esc(docQuery)}"></div><label>Tipo de documento</label><select name="kind"><option value="">Todos los tipos</option>${documentKinds().map(k=>`<option ${docType===k?'selected':''}>${esc(k)}</option>`).join('')}</select><div class="inline"><div><label>Desde</label><input name="from" type="date" value="${docFrom}"></div><div><label>Hasta</label><input name="to" type="date" value="${docTo}"></div></div><div class="actions"><button class="btn">Buscar</button>${button('Limpiar','clear-document-filters','','btn quiet')}</div></form><div class="section-title">${docs.length} ${docs.length===1?'documento':'documentos'}</div>${docs.map(docCard).join('')||empty('Sin resultados','Probá con otra persona, tipo o intervalo de fechas.')}`;
}
function trackingBlock(e){
 if(!e.tracking)return '';
 const t=e.tracking;
 return `<div class="card"><div class="section-title" style="margin-top:0">Seguimiento de la indicación</div><span class="tag ${t.stage==='booked'?'done':'warn'}">${t.stage==='booked'?'Turno confirmado por vos':'Falta conseguir turno'}</span><dl class="details"><dt>Objetivo indicado</dt><dd>${dateLabel(t.targetDate)}</dd><dt>Empezar gestión</dt><dd>${dateLabel(t.planDate)}</dd>${t.stage==='booked'?`<dt>Fecha confirmada</dt><dd>${dateLabel(e.date)} ${esc(e.time)}</dd>`:''}</dl>${t.targetDate&&t.stage==='booked'&&e.date>t.targetDate?'<p class="tiny">La fecha confirmada es posterior al objetivo que registraste.</p>':''}${e.status==='pending'?button(t.stage==='booked'?'Actualizar turno confirmado':'Ya conseguí el turno','confirm-booking',e.id,'btn secondary full'):''}<small>El objetivo proviene de lo que registraste; no es una reserva ni una recomendación automática.</small></div>`;
}
function preparationBlock(e){
 if(!['Consulta','Estudio'].includes(e.type)&&!e.preparation?.length)return '';
 const all=e.preparation||[],done=all.filter(x=>x.done).length;
 return `<div class="card"><div class="between"><h3>Preparar la consulta</h3><span class="tag">${done}/${all.length} listos</span></div><p>Revisá qué aplica a esta consulta y agregá las indicaciones del prestador.</p>${all.map(item=>`<button class="prep-item ${item.done?'checked':''}" data-action="toggle-preparation" data-id="${e.id}:${item.id}" aria-pressed="${Boolean(item.done)}"><span class="prep-check">${item.done?'✓':''}</span><span>${esc(item.text)}${item.done?`<small>${people[item.by]?.name||'Usuario'} · ${esc(item.at)}</small>`:''}</span></button>`).join('')}${!all.length?button('Armar lista de preparación','init-preparation',e.id,'btn secondary full'):''}${button('Agregar indicación o paso','add-preparation',e.id,'btn quiet full')}</div>`;
}
function notesPanel(owner){
 const notes=visible(db.notes,'care').filter(n=>n.owner===owner).slice().sort((a,b)=>((b.occurredDate||b.date)+(b.occurredTime||'')).localeCompare((a.occurredDate||a.date)+(a.occurredTime||'')));
 sheet('Notas de cuidado',`<p class="muted tiny">${people[owner].name} · continuidad entre quienes cuidan</p>${notes.map(n=>`<article class="card"><small>${dateLabel(n.occurredDate||n.date)} ${esc(n.occurredTime||'Hora no registrada')}</small><h3 style="margin-top:12px">Qué ocurrió</h3><p style="color:inherit">${esc(n.text)}</p>${n.actionTaken?`<h3 style="margin-top:14px">Qué se hizo</h3><p>${esc(n.actionTaken)}</p>`:''}${n.photo?`<button class="care-photo" data-action="note-photo" data-id="${n.id}" aria-label="Abrir foto de la observación"><img src="${n.photo}" alt="Foto adjunta a la observación de cuidado"></button>`:''}<p class="tiny">Registró ${people[n.by].name} · ${esc(n.recordedAt||dateLabel(n.date))}</p></article>`).join('')||empty('Sin observaciones','Registrá lo que pasó para que otra persona pueda continuar el cuidado.')}<form id="care-note-form"><label>Qué ocurrió</label><textarea name="text" placeholder="Describí lo observado, sin interpretar" required></textarea><div class="inline"><div><label>Fecha de lo ocurrido</label><input type="date" name="occurredDate" value="${today()}" required max="${today()}"></div><div><label>Hora (opcional)</label><input type="time" name="occurredTime"></div></div><label>Qué se hizo</label><textarea name="actionTaken" placeholder="Ej. se avisó a Sofía y se anotó una pregunta para la consulta" required></textarea><label>Foto de ejemplo (opcional)</label><input type="file" name="photo" accept="image/jpeg,image/png,image/webp"><p class="muted tiny">Solo imágenes ficticias JPG, PNG o WebP, hasta 1 MB.</p><button class="btn full" style="margin-top:18px">Guardar observación</button></form>`);
}
function discoverySheet(s){
 if(['booking','preparation-add'].includes(s.type)){
  const e=db.events.find(e=>e.id===s.id);if(!can(e,'care')){denied();return true}
  if(s.type==='booking')sheet('Registrar turno confirmado',`<p>${esc(e.title)}</p><form id="booking-form"><label>Tipo de turno</label><select name="type"><option ${e.type==='Estudio'?'selected':''}>Estudio</option><option ${e.type==='Consulta'?'selected':''}>Consulta</option></select><div class="inline"><div><label>Fecha confirmada</label><input type="date" name="date" value="${e.tracking?.stage==='booked'?e.date:''}" required></div><div><label>Hora confirmada</label><input type="time" name="time" value="${e.time||''}" required></div></div><label>Lugar / prestador</label><input name="location" value="${esc(e.location||'')}" placeholder="Podés completarlo después"><label>Aviso de preparación</label><select name="reminder"><option>1 día antes</option><option>2 días antes</option><option>1 semana antes</option></select><label class="check"><input type="checkbox" name="confirmed" required>Ya confirmé este turno con el prestador</label><button class="btn full">Guardar turno</button></form><div class="notice">Se actualiza la misma gestión, conservando fuente, responsable e historial. Nido no reserva turnos.</div>`);
  else sheet('Agregar preparación',`<p class="muted tiny">${esc(e.title)}</p><form id="preparation-form"><label>Qué hay que preparar</label><input name="text" placeholder="Ej. llevar autorización del estudio" required maxlength="220"><button class="btn full" style="margin-top:18px">Agregar a la lista</button></form><div class="notice">Ingresá las indicaciones recibidas. Nido no genera instrucciones de ayuno o preparación clínica.</div>`);
  return true;
 }
 if(s.type==='note-photo'){
  const n=db.notes.find(n=>n.id===s.id);if(!can(n,'care')||!n.photo){denied();return true}
  sheet('Foto de la observación',`<p>${people[n.owner].name} · ${dateLabel(n.occurredDate||n.date)}</p><img class="file-preview full-photo" src="${n.photo}" alt="Foto de ejemplo registrada en la nota de cuidado"><p class="muted tiny">Registrada por ${people[n.by].name}</p>`);return true;
 }
 if(s.type==='original'){
  const d=db.documents.find(d=>d.id===s.id);if(!can(d)){denied();return true}
  let body=d.attachment?(d.attachment.startsWith('data:image/')?`<img class="file-preview full-photo" src="${d.attachment}" alt="Archivo original adjunto">`:`<p>El PDF adjunto se puede abrir o descargar desde el botón.</p>`):`<div class="paper">${esc(d.text)}</div>`;
  sheet('Fuente original',`<h3>${esc(d.title)}</h3><p class="muted tiny">${people[d.owner].name} · ${d.attachment?esc(d.filename):'Texto de ejemplo guardado; no hay un archivo adjunto'}</p>${body}${d.attachment?`<a class="btn full" href="${d.attachment}" download="${esc(d.filename||'documento')}">Descargar original</a>`:''}`);return true;
 }
 return false;
}
async function readDemoImage(file){
 if(!file?.size)return null;
 if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Elegí una imagen JPG, PNG o WebP.');
 if(file.size>1024*1024)throw Error('La foto supera 1 MB. Elegí una imagen más pequeña.');
 return await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(Error('No se pudo leer la imagen.'));r.readAsDataURL(file)});
}
async function handleDiscoveryForm(form,f,v,s){
 if(form.id==='document-filters'){
  if(v.from&&v.to&&v.from>v.to){toast('La fecha Desde debe ser anterior a Hasta.');return true}
  docQuery=v.query.trim();docType=v.kind;docFrom=v.from;docTo=v.to;render();return true;
 }
 if(form.id==='booking-form'){
  const e=db.events.find(e=>e.id===s.id);if(!can(e,'care')){denied();return true}
  if(!v.confirmed||!v.date||!v.time){toast('Completá y confirmá los datos del turno.');return true}
  const previous=e.date;e.tracking??={targetDate:'',planDate:e.date};e.tracking.stage='booked';e.date=v.date;e.time=v.time;e.type=v.type;e.location=v.location.trim();e.reminder=v.reminder;e.status='pending';
  log(e,`Registró turno confirmado: ${dateLabel(previous)} → ${dateLabel(v.date)} ${v.time}`);selected=v.date;open('event',e.id);render();toast('Turno registrado; ya podés preparar la consulta');return true;
 }
 if(form.id==='preparation-form'){
  const e=db.events.find(e=>e.id===s.id);if(!can(e,'care')){denied();return true}
  if(!v.text.trim()){toast('Escribí el paso que querés agregar.');return true}
  e.preparation??=[];e.preparation.push({id:id(),text:v.text.trim(),done:false});log(e,'Agregó un paso de preparación');open('event',e.id);render();return true;
 }
 if(form.id==='care-note-form'){
  const owner=s.id,by=user;if(!canOwner(owner,'care')){denied();return true}
  if(!v.text.trim()||!v.actionTaken.trim()){toast('Completá qué ocurrió y qué se hizo.');return true}
  if(!v.occurredDate||v.occurredDate>today()){toast('Revisá la fecha de lo ocurrido.');return true}
  const submit=form.querySelector('button[type="submit"],button:not([type])');if(submit)submit.disabled=true;
  try{
   const photo=await readDemoImage(f.get('photo'));
   if(user!==by||!canOwner(owner,'care')||sheetState?.id!==owner){toast('La vista cambió. Volvé a cargar la observación.');return true}
   const n={id:id(),owner,by,scope:'care',visibility:'shared',date:today(),recordedAt:stamp(),occurredDate:v.occurredDate,occurredTime:v.occurredTime,text:v.text.trim(),actionTaken:v.actionTaken.trim(),photo};
   db.notes.push(n);if(!persist()){db.notes.pop();return true}render();toast('Observación guardada con autor y fecha');
  }catch(err){toast(err.message)}finally{if(submit)submit.disabled=false}
  return true;
 }
 return false;
}
const discoveryActions={
 'clear-document-filters':()=>{docQuery='';docType='';docFrom='';docTo='';filter='all';render()},
 'confirm-booking':eid=>open('booking',eid),
 'init-preparation':eid=>{const e=db.events.find(e=>e.id===eid);if(!can(e,'care'))return denied();if(e.preparation?.length)return;e.preparation=['Revisar documentos para llevar','Consultar si requiere autorización','Organizar traslado o acompañamiento','Confirmar preparación con el prestador'].map(text=>({id:id(),text,done:false}));log(e,'Armó lista de preparación para revisar');render()},
 'add-preparation':eid=>open('preparation-add',eid),
 'toggle-preparation':value=>{const [eid,pid]=value.split(':'),e=db.events.find(e=>e.id===eid);if(!can(e,'care'))return denied();const p=e.preparation?.find(p=>p.id===pid);if(!p)return;p.done=!p.done;p.by=user;p.at=stamp();log(e,`${p.done?'Marcó listo':'Reabrió'}: ${p.text}`);render()},
 'note-photo':nid=>open('note-photo',nid),'document-original':did=>open('original',did)
};
