// Document validity table. Expiry dates are entered by the family; Nido does not derive legal or
// clinical deadlines from the document type. The warning window is a configurable demo value.
const validityDefaultTypes=()=>[
 {id:'vt-vac',name:'Carné de vacunación',applies:{sofia:true,antonio:true,lucia:true,mateo:true,fernando:true}},
 {id:'vt-sport',name:'Carné de deportista',applies:{lucia:true,mateo:true}},
 {id:'vt-fit',name:'Carné de aptitud física',applies:{sofia:true,fernando:true}},
 {id:'vt-mammo',name:'Mamografía',applies:{sofia:true}}
];
function addValidityExamples(data){
 data.validity??={warnMonths:3,types:validityDefaultTypes()};
 if(data.validityExamplesVersion)return data;
 const t=today(),doc=(id,owner,kind,date,expires,text)=>({id,owner,title:kind,kind,date,expires,visibility:'shared',by:'sofia',text:`EJEMPLO FICTICIO · ${kind}\nPaciente: ${people[owner].full}\n${text}`});
 const samples=[
  doc('doc-vac-mateo','mateo','Carné de vacunación',addDay(t,-180),addDay(t,420),'Carné transcripto para la demostración. Confirmar los datos contra el carné original.'),
  doc('doc-vac-lucia','lucia','Carné de vacunación',addDay(t,-300),'none','Carné transcripto para la demostración. La familia registró que no vence.'),
  doc('doc-sport-lucia','lucia','Carné de deportista',addDay(t,-320),addDay(t,45),'Habilitación deportiva de ejemplo. Vencimiento ingresado por la familia.'),
  doc('doc-sport-mateo','mateo','Carné de deportista',addDay(t,-400),addDay(t,-20),'Habilitación deportiva de ejemplo. Vencimiento ingresado por la familia.'),
  doc('doc-fit-sofia','sofia','Carné de aptitud física',addDay(t,-160),addDay(t,200),'Constancia de ejemplo. Vencimiento ingresado por la familia.'),
  doc('doc-mammo-sofia','sofia','Mamografía',addDay(t,-400),addDay(t,-35),'Informe de ejemplo. La fecha de repetición la registró la familia según lo indicado por su profesional.'),
  doc('doc-vac-antonio','antonio','Carné de vacunación',addDay(t,-90),addDay(t,70),'Carné transcripto para la demostración. Vencimiento ingresado por la familia.')
 ];
 for(const d of samples)if(!data.documents.some(x=>x.id===d.id))data.documents.push(d);
 data.validityExamplesVersion=1;return data;
}
const validityTypes=()=>db?.validity?.types||[];
const addMonths=(iso,n)=>{const d=new Date(iso+'T12:00:00');d.setMonth(d.getMonth()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const shortMonth=d=>new Date(d+'T12:00').toLocaleDateString('es-UY',{month:'short',year:'2-digit'});
const longDate=d=>new Date(d+'T12:00').toLocaleDateString('es-UY',{day:'numeric',month:'long',year:'numeric'});

function expiryFields(d){return `<label>Vencimiento del documento (opcional)</label><input type="date" name="expires" value="${d.expires&&d.expires!=='none'?d.expires:''}"><label class="check"><input type="checkbox" name="noExpiry" ${d.expires==='none'?'checked':''}>No vence</label><p class="muted tiny">Ingresá la fecha que figura en el documento. Nido no calcula vencimientos.</p>`}
function expiryValue(v){return v.noExpiry?'none':(v.expires||'')}
function expiryState(d){
 if(d.expires==='none')return {key:'ok',sym:'✓',label:'No vence',short:'no vence'};
 if(!d.expires)return {key:'unknown',sym:'?',label:'Sin vencimiento registrado',short:'sin fecha'};
 if(daysTo(d.expires)<0)return {key:'expired',sym:'✕',label:'Vencido',short:shortMonth(d.expires)};
 if(d.expires<=addMonths(today(),Number(db.validity?.warnMonths??3)))return {key:'soon',sym:'!',label:'Vence pronto',short:shortMonth(d.expires)};
 return {key:'ok',sym:'✓',label:'Vigente',short:shortMonth(d.expires)};
}
function documentExpiryBlock(d){
 if(!d.expires&&!validityTypes().some(t=>t.name===d.kind))return '';
 const st=expiryState(d),days=d.expires&&d.expires!=='none'?daysTo(d.expires):null;
 const detail=d.expires==='none'?'Registrado como «No vence».':!d.expires?'Todavía no se registró su vencimiento.':days<0?`Venció el ${longDate(d.expires)}.`:`Vence el ${longDate(d.expires)}${days<=120?` (en ${days} días)`:''}.`;
 return `<div class="validity-note ${st.key}"><span class="validity-sym" aria-hidden="true">${st.sym}</span><div><strong>${st.label}</strong><p>${detail}</p></div></div>${['soon','expired'].includes(st.key)&&canOwner(d.owner,'calendar')?button('Crear pendiente para renovar','renew-document',d.id,'btn secondary full'):''}`;
}
function validityCell(type,p){
 if(p!==user&&!canOwner(p,'documents'))return {key:'locked',label:'Sin acceso',short:''};
 if(!type.applies?.[p])return {key:'na',sym:'—',label:'No aplica',short:''};
 const rank=d=>d.expires==='none'?'9999-12-31':d.expires||'0000';
 const doc=visible(db.documents).filter(d=>d.owner===p&&d.kind===type.name).sort((a,b)=>rank(b).localeCompare(rank(a))||(b.date||'').localeCompare(a.date||''))[0];
 if(!doc)return {key:'missing',sym:'+',label:'Falta cargar',short:'cargar'};
 return {...expiryState(doc),doc};
}
function validityPage(){
 const types=validityTypes(),cols=patientIds,warn=Number(db.validity?.warnMonths??3);
 const cells=types.flatMap(t=>cols.map(p=>validityCell(t,p)));
 const count=k=>cells.filter(c=>c.key===k).length;
 const summary=[['expired','vencido','vencidos'],['soon','vence pronto','vencen pronto'],['missing','falta cargar','faltan cargar']].filter(([k])=>count(k)).map(([k,one,many])=>`<span class="validity-count ${k}">${count(k)} ${count(k)===1?one:many}</span>`).join('');
 const head=`<tr><th scope="col"><span class="sr-only">Documento</span></th>${cols.map(p=>`<th scope="col"><span class="avatar small" style="${personStyle(p)}" title="${people[p].name}">${people[p].initial}</span><span class="col-name">${people[p].name}</span></th>`).join('')}</tr>`;
 const body=types.map(t=>`<tr><th scope="row">${esc(t.name)}</th>${cols.map(p=>{const c=validityCell(t,p),aria=`${people[p].name}, ${t.name}: ${c.label}${c.doc?.expires&&c.doc.expires!=='none'?`, ${daysTo(c.doc.expires)<0?'venció':'vence'} ${longDate(c.doc.expires)}`:''}`;const inner=`${c.key==='locked'?icon('lock'):`<span class="validity-sym" aria-hidden="true">${c.sym}</span>`}${c.short?`<small aria-hidden="true">${esc(c.short)}</small>`:''}`;
  if(c.doc)return `<td><button type="button" class="validity-cell ${c.key}" data-action="document" data-id="${c.doc.id}" aria-label="${esc(aria)}. Abrir documento">${inner}</button></td>`;
  if(c.key==='missing')return `<td><button type="button" class="validity-cell missing" data-action="validity-upload" data-id="${p}:${t.id}" aria-label="${esc(aria)}. Cargar documento">${inner}</button></td>`;
  return `<td><span class="validity-cell ${c.key}" role="img" aria-label="${esc(aria)}">${inner}</span></td>`}).join('')}</tr>`).join('');
 return `<p class="muted tiny" style="margin-bottom:12px">Qué documentos de la familia están vigentes, por vencer o vencidos. Tocá una celda para abrir el documento o cargarlo.</p>${summary?`<div class="validity-summary">${summary}</div>`:`<div class="validity-summary"><span class="validity-count ok">Todo vigente</span></div>`}${types.length?`<div class="validity-wrap"><table class="validity"><thead>${head}</thead><tbody>${body}</tbody></table></div>`:empty('Sin tipos de documento','Elegí qué documentos querés controlar para la familia.')}<ul class="validity-legend" aria-label="Referencias"><li><span class="validity-cell ok"><span class="validity-sym">✓</span></span>Vigente</li><li><span class="validity-cell soon"><span class="validity-sym">!</span></span>Vence en los próximos ${warn} ${warn===1?'mes':'meses'}</li><li><span class="validity-cell expired"><span class="validity-sym">✕</span></span>Vencido</li><li><span class="validity-cell missing"><span class="validity-sym">+</span></span>Falta cargar</li><li><span class="validity-cell na"><span class="validity-sym">—</span></span>No aplica</li><li><span class="validity-cell locked">${icon('lock')}</span>Sin acceso</li></ul>${user==='sofia'?button('Elegir documentos y personas','validity-settings','','btn quiet full'):''}<div class="notice demo">Los vencimientos los carga la familia. Nido no calcula plazos legales ni clínicos. Los documentos «Solo yo» de otra persona no aparecen, y sin permiso la celda no muestra su estado.</div>`;
}
function validitySheet(s){
 if(s.type!=='validity-settings')return false;
 if(user!=='sofia'){denied();return true}
 const types=validityTypes();
 sheet('Documentos a controlar',`<p class="muted tiny">Elegí qué documento corresponde a cada integrante. Es una configuración de la familia, no un requisito médico ni legal.</p><form id="validity-settings-form">${types.map(t=>`<fieldset class="validity-type"><legend>${esc(t.name)}</legend><div class="validity-people">${patientIds.map(p=>`<label class="check"><input type="checkbox" name="applies-${t.id}" value="${p}" ${t.applies?.[p]?'checked':''}>${people[p].name}</label>`).join('')}</div><label class="check remove"><input type="checkbox" name="remove" value="${t.id}">Quitar de la tabla</label></fieldset>`).join('')}<label for="validity-new">Agregar tipo de documento (opcional)</label><input id="validity-new" name="newType" maxlength="60" placeholder="Ej. Carné de salud"><label for="validity-warn">Marcar «vence pronto» con anticipación de (meses)</label><input id="validity-warn" name="warnMonths" type="number" min="1" max="12" step="1" value="${Number(db.validity?.warnMonths??3)}" required><p class="muted tiny">3 meses es un valor de demostración que podés cambiar.</p><button class="btn full" style="margin-top:18px">Guardar</button></form>`);
 return true;
}
function validityForm(form,f,v,s){
 if(form.id!=='validity-settings-form')return false;
 if(user!=='sofia'){denied();return true}
 const remove=f.getAll('remove'),warn=Number(v.warnMonths);
 if(!Number.isInteger(warn)||warn<1||warn>12){toast('Elegí entre 1 y 12 meses.');return true}
 db.validity.types=validityTypes().filter(t=>!remove.includes(t.id)).map(t=>({...t,applies:Object.fromEntries(f.getAll('applies-'+t.id).filter(p=>patientIds.includes(p)).map(p=>[p,true]))}));
 const name=(v.newType||'').trim();
 if(name&&!db.validity.types.some(t=>t.name.toLocaleLowerCase()===name.toLocaleLowerCase()))db.validity.types.push({id:id(),name,applies:Object.fromEntries(patientIds.map(p=>[p,true]))});
 db.validity.warnMonths=warn;
 tab='docs';docView='validity';saved('Tabla de vigencias actualizada');return true;
}
const validityActions={
 'validity-upload':arg=>{const [p,tid]=arg.split(':'),t=validityTypes().find(t=>t.id===tid);if(!t||!canOwner(p))return denied();open('review','',{owner:p,kind:t.name,title:t.name,validity:true})},
 'validity-settings':()=>open('validity-settings'),
 'renew-document':did=>{const d=db.documents.find(d=>d.id===did);if(!can(d)||!canOwner(d.owner,'calendar'))return denied();open('doc-task',d.id,{presetTitle:`Renovar ${d.kind.toLocaleLowerCase()} de ${people[d.owner].name}`,presetTarget:d.expires&&d.expires!=='none'&&daysTo(d.expires)>=0?d.expires:''})}
};
