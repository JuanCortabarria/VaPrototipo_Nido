// Research-driven flows: document retrieval, follow-through and continuity of care.
function documentKinds(){return [...new Set(['Informe de consulta','Resultado','Indicación','Orden','Receta','Carné','Documento',...validityTypes().map(t=>t.name),...visible(db.documents).map(d=>d.kind)])]}
// Filters apply as they change; the results area is refreshed without re-rendering the form,
// so typing keeps focus and the iOS clear (✕) button immediately shows everything again.
function filteredDocuments(){return filtered(db.documents).filter(d=>(d.title+' '+d.text).toLocaleLowerCase().includes(docQuery.toLocaleLowerCase())).filter(d=>!docType||d.kind===docType).filter(d=>!docFrom||(d.date&&d.date>=docFrom)).filter(d=>!docTo||(d.date&&d.date<=docTo)).sort((a,b)=>(b.date||'').localeCompare(a.date||''))}
const docFilterCount=()=>[docType,docFrom,docTo].filter(Boolean).length;
const docFilterLabel=()=>docFilterCount()?`Filtros (${docFilterCount()})`:'Filtros';
function activeDocFilters(){const a=[];if(filter!=='all'&&people[filter])a.push(['person',people[filter].name]);if(docQuery)a.push(['query',`«${docQuery}»`]);if(docType)a.push(['kind',docType]);if(docFrom)a.push(['from','Desde '+dateLabel(docFrom)]);if(docTo)a.push(['to','Hasta '+dateLabel(docTo)]);return a}
function docResults(){
 const docs=filteredDocuments(),active=activeDocFilters();
 return `${active.length?`<div class="active-filters" aria-label="Filtros activos">${active.map(([k,t])=>`<button type="button" class="chip removable" data-action="remove-doc-filter" data-id="${k}" aria-label="Quitar filtro ${esc(t)}">${esc(t)}${icon('close')}</button>`).join('')}<button type="button" class="link-button" data-action="clear-document-filters">Quitar filtros</button></div>`:''}<div class="section-title">${docs.length} ${docs.length===1?'documento':'documentos'}</div>${docs.map(docCard).join('')||`<div class="empty"><h3>Sin resultados</h3><p>No hay documentos con estos filtros.</p>${active.length?button('Quitar filtros','clear-document-filters','','btn'):''}</div>`}`;
}
function documentLibrary(){
 const head=`<div class="page-title task-heading"><div><h1>Documentos</h1><p>Encontrá la fuente cuando la necesites.</p></div>${allowedPatients().length?button(icon('plus')+' Agregar documento','upload','','btn full primary-task'):''}</div><div class="seg" role="tablist">${button('Archivo','doc-view','archive',docView==='archive'?'active':'')}${button('Vigencias','doc-view','validity',docView==='validity'?'active':'')}</div>`;
 if(docView==='validity')return head+validityPage();
 const n=docFilterCount();
 return `${head}${chips()}<form id="document-filters" class="doc-filters" autocomplete="off"><div class="search-row"><div class="search"><label class="sr-only" for="doc-query">Buscar documentos</label>${icon('search')}<input id="doc-query" name="query" placeholder="Buscar documentos" type="search" enterkeyhint="search" value="${esc(docQuery)}"></div><button type="button" class="btn quiet filter-toggle ${n?'has-active':''}" data-action="toggle-doc-filters" aria-expanded="${docFiltersOpen}" aria-controls="doc-filter-panel">${icon('filter')}<span id="doc-filter-label">${docFilterLabel()}</span></button></div><div id="doc-filter-panel" class="filter-panel" ${docFiltersOpen?'':'hidden'}><label for="doc-kind">Tipo de documento</label><select id="doc-kind" name="kind"><option value="">Todos los tipos</option>${documentKinds().map(k=>`<option ${docType===k?'selected':''}>${esc(k)}</option>`).join('')}</select><fieldset class="date-range"><legend>Fecha del documento</legend><div class="inline"><div><label for="doc-from">Desde</label><input id="doc-from" name="from" type="date" value="${docFrom}"></div><div><label for="doc-to">Hasta</label><input id="doc-to" name="to" type="date" value="${docTo}"></div></div></fieldset></div></form><div id="doc-results" aria-live="polite">${docResults()}</div>`;
}
function readDocFilters(form,warn){
 const v=Object.fromEntries(new FormData(form).entries()),before=[docQuery,docType,docFrom,docTo].join('|');
 docQuery=(v.query||'').trim();docType=v.kind||'';docFrom=v.from||'';docTo=v.to||'';
 if(warn&&docFrom&&docTo&&docFrom>docTo)toast('La fecha «Desde» debe ser anterior a «Hasta».');
 // A blur-triggered change with no new value must not replace the button being tapped.
 if(before===[docQuery,docType,docFrom,docTo].join('|'))return;
 const results=$('#doc-results');if(results)results.innerHTML=docResults();
 const label=$('#doc-filter-label');if(label){label.textContent=docFilterLabel();label.parentElement.classList.toggle('has-active',docFilterCount()>0)}
}
for(const type of ['input','change'])document.addEventListener(type,e=>{const form=e.target.closest?.('#document-filters');if(form)readDocFilters(form,type==='change')});
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
  if(s.type==='booking')sheet('Registrar turno confirmado',`<p>${esc(e.title)}</p><form id="booking-form"><label>Tipo de turno</label><select name="type"><option ${(e.bookingType||e.type)==='Estudio'?'selected':''} value="Estudio">Estudio médico</option><option ${(e.bookingType||e.type)==='Consulta'?'selected':''} value="Consulta">Consulta médica</option></select><div class="inline"><div><label>Fecha confirmada</label><input type="date" name="date" value="${e.tracking?.stage==='booked'?e.date:''}" required></div><div><label>Hora confirmada</label><input type="time" name="time" value="${e.time||''}" required></div></div><label>Lugar / prestador</label><input name="location" value="${esc(e.location||'')}" placeholder="Podés completarlo después"><label>Aviso de preparación</label><select name="reminder"><option>1 día antes</option><option>2 días antes</option><option>1 semana antes</option></select><label class="check"><input type="checkbox" name="confirmed" required>Ya confirmé este turno con el prestador</label><button class="btn full">Guardar turno</button></form><div class="notice">Se actualiza la misma gestión, conservando fuente, responsable e historial. Nido no reserva turnos.</div>`);
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
 if(form.id==='document-filters'){readDocFilters(form,true);document.activeElement?.blur?.();return true}
 if(form.id==='booking-form'){
  const e=db.events.find(e=>e.id===s.id);if(!can(e,'care')){denied();return true}
  if(!v.confirmed||!v.date||!v.time){toast('Completá y confirmá los datos del turno.');return true}
  const previous=e.date;e.tracking??={targetDate:'',planDate:e.date};e.tracking.stage='booked';e.date=v.date;e.time=v.time;e.type=v.type;if(e.bookedTitle)e.title=e.bookedTitle;e.location=v.location.trim();e.reminder=v.reminder;e.status='pending';
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
 'remove-doc-filter':k=>{if(k==='person')filter='all';if(k==='query')docQuery='';if(k==='kind')docType='';if(k==='from')docFrom='';if(k==='to')docTo='';render()},
 'toggle-doc-filters':()=>{docFiltersOpen=!docFiltersOpen;const panel=$('#doc-filter-panel'),btn=document.querySelector('[data-action="toggle-doc-filters"]');if(panel)panel.hidden=!docFiltersOpen;if(btn)btn.setAttribute('aria-expanded',docFiltersOpen)},
 'doc-view':v=>{docView=v==='validity'?'validity':'archive';render()},
 'confirm-booking':eid=>open('booking',eid),
 'init-preparation':eid=>{const e=db.events.find(e=>e.id===eid);if(!can(e,'care'))return denied();if(e.preparation?.length)return;e.preparation=['Revisar documentos para llevar','Consultar si requiere autorización','Organizar traslado o acompañamiento','Confirmar preparación con el prestador'].map(text=>({id:id(),text,done:false}));log(e,'Armó lista de preparación para revisar');render()},
 'add-preparation':eid=>open('preparation-add',eid),
 'toggle-preparation':value=>{const [eid,pid]=value.split(':'),e=db.events.find(e=>e.id===eid);if(!can(e,'care'))return denied();const p=e.preparation?.find(p=>p.id===pid);if(!p)return;p.done=!p.done;p.by=user;p.at=stamp();log(e,`${p.done?'Marcó listo':'Reabrió'}: ${p.text}`);render()},
 'note-photo':nid=>open('note-photo',nid),'document-original':did=>open('original',did)
};
