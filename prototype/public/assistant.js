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

// Conversation messages belong to the active demo profile. Answers are rebuilt from
// current permissions whenever displayed, rather than replaying stored record HTML.
let conversationActor=null,conversationId=null;
function conversationReply(q,range){
 const term=q.toLocaleLowerCase();let html='',agenda;
 if(/grave|diagn[oó]st|tratamiento|qu[eé] significa/.test(term))html='Puedo recuperar la fuente y ayudarte a guardar una pregunta para tu consulta. La interpretación de resultados corresponde al profesional tratante.';
 else if(/medic|stock|reposici|comprar|compras/.test(term))html=medsAnswer();
 else if(/documento|informe/.test(term))html=visible(db.documents).map(d=>button(`${esc(d.title)} · ${people[d.owner].name}`,'document',d.id,'attachment')).join('');
 else if(isAgendaQuestion(term))agenda=range??agendaRangeFor(term);
 else if(/^(hola|buenas|buenos d[ií]as)[.! ]*$/.test(term))html=`Hola, ${people[user].name}. ¿Querés revisar tu agenda o buscar algo entre tus documentos?`;
 else if(/^(gracias|muchas gracias)[.! ]*$/.test(term))html='De nada. Podés seguir consultando en esta conversación.';
 else html=visible(db.documents).filter(d=>(d.title+' '+d.text).toLocaleLowerCase().includes(term)).map(d=>button(`${esc(d.title)} · ${people[d.owner].name}`,'document',d.id,'attachment')).join('');
 return agenda!==undefined?{agenda}:{html:html||'No encontré resultados en la información disponible para tu perfil. Probá con otro término.'};
}
function restoreConversation(){
 db.assistantConversations??=[];db.assistantActive??={};
 const active=db.assistantConversations.find(c=>c.id===db.assistantActive[user]&&c.actor===user);
 conversationActor=user;conversationId=active?.id||null;
 chat=active?active.messages.map(m=>({...m})):[];
}
function saveConversation(){
 db.assistantConversations??=[];db.assistantActive??={};
 let current=db.assistantConversations.find(c=>c.id===conversationId&&c.actor===user);
 if(!current){current={id:id(),actor:user,createdAt:new Date().toISOString(),messages:[]};db.assistantConversations.push(current);conversationId=current.id;conversationActor=user}
 current.title=chat.find(m=>m.role==='user')?.text.slice(0,90)||'Nueva conversación';current.updatedAt=new Date().toISOString();
 current.messages=chat.map(m=>m.role==='user'?{role:'user',text:m.text}:{role:'ai',query:m.query,...(m.agenda!==undefined?{agenda:m.agenda}:{})});
 db.assistantActive[user]=current.id;persist();
}
function newConversation(){
 restoreConversation();delete db.assistantActive[user];conversationId=null;chat=[];persist();close();tab='chat';render();$('#chat-form input')?.focus();
}
function conversationHistory(){
 restoreConversation();
 const conversations=db.assistantConversations.filter(c=>c.actor===user).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));
 sheet('Conversaciones',`<p class="muted tiny">Tus conversaciones como ${people[user].name}</p>${button(icon('plus')+' Nueva conversación','chat-new','','btn full')}${conversations.map(c=>button(`<div class="grow"><strong>${esc(c.title)}</strong><small>${new Date(c.updatedAt).toLocaleDateString('es-UY',{day:'numeric',month:'short'})} · ${c.messages.filter(m=>m.role==='user').length} mensajes${c.id===conversationId?' · Abierta':''}</small></div>${icon('next')}`,'chat-open',c.id,'person-choice conversation-choice')).join('')||empty('Todavía no hay conversaciones','Las conversaciones se guardan cuando enviás el primer mensaje.')}`);
}
Object.assign(assistantActions,{
 'chat-new':newConversation,
 'chat-history':conversationHistory,
 'chat-open':cid=>{const c=db.assistantConversations?.find(c=>c.id===cid&&c.actor===user);if(!c)return;db.assistantActive??={};db.assistantActive[user]=c.id;persist();close();tab='chat';render();const log=$('#chat-messages');if(log)log.scrollTop=log.scrollHeight}
});
// Keep an adjusted agenda horizon when reopening the same conversation.
assistantActions['agenda-range']=arg=>{const [i,r]=arg.split(':').map(Number),m=chat[i];if(!m||m.agenda===undefined)return;m.agenda=r;const top=$('#chat-messages')?.scrollTop||0;saveConversation();render();$('#chat-messages').scrollTop=top};
