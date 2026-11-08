// Round-1 feedback: document filters (F1/F2), assistant horizon (F3), medication boxes (F4/F5),
// purchase wording (F6) and document validity table (F7). Requires Playwright with WebKit.
// Optional SHOTS=<dir> saves screenshots for visual review.
const {webkit}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('assert');const path=require('path');
(async()=>{const b=await webkit.launch();try{
const p=await b.newPage({viewport:{width:375,height:812},isMobile:true,hasTouch:true,deviceScaleFactor:2});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto(process.env.NIDO_URL||'file://'+path.resolve(__dirname,'../public/index.html'));
const click=async(a,id)=>p.locator(`[data-action="${a}"]${id!==undefined?`[data-id="${id}"]`:''}`).first().click();
const submit=async sel=>p.locator(sel).evaluate(f=>f.requestSubmit());
const shot=async name=>{if(process.env.SHOTS)await p.screenshot({path:path.join(process.env.SHOTS,name+'.png')})};
const noOverflow=async where=>{for(const width of [375,390,430]){await p.setViewportSize({width,height:812});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&[...document.querySelectorAll('#main *, .sheet *')].filter(el=>!el.closest('.chips')).every(el=>el.getBoundingClientRect().right<=innerWidth+1)),`overflow ${where} ${width}`)}await p.setViewportSize({width:375,height:812})};
const text=sel=>p.locator(sel).innerText();
if(await p.locator('[data-action="actor"]').count())await click('actor','sofia');

// F1/F2 documents
await click('tab','docs');
assert(await p.locator('#doc-filter-panel').isHidden(),'filters closed by default');
const firstCard=await p.locator('#main [data-action=document]').first().boundingBox(),mainBox=await p.locator('#main').boundingBox();
assert(firstCard.y+firstCard.height<=mainBox.y+mainBox.height,'first result visible without scrolling');
const all=await p.locator('#main [data-action=document]').count();
await shot('docs-closed');
await click('toggle-doc-filters');
const [from,to]=[await p.locator('#doc-from').boundingBox(),await p.locator('#doc-to').boundingBox()];
assert(Math.abs(from.width-to.width)<1&&Math.abs(from.y-to.y)<1,'date fields aligned and same width');
await noOverflow('doc filters');
await click('filter','lucia');await p.locator('#doc-from').fill(await p.evaluate(()=>addDay(today(),-30)));
await shot('docs-filters');
assert((await text('.active-filters')).includes('Lucía'));assert((await text('#doc-filter-label')).includes('Filtros (1)'));
await p.locator('.active-filters [data-action=clear-document-filters]').click();
assert.equal(await p.locator('#main [data-action=document]').count(),all,'one tap shows everything again');
await p.locator('#doc-query').fill('odontológico');assert.equal(await p.locator('#main [data-action=document]').count(),1,'search applies while typing');
await p.locator('#doc-query').fill('');assert.equal(await p.locator('#main [data-action=document]').count(),all,'clearing the search restores the list');
await p.locator('#doc-query').fill('zzz-sin-resultados');assert.equal(await p.locator('.empty [data-action=clear-document-filters]').count(),1);await click('clear-document-filters');

// F7 validity
await click('doc-view','validity');
assert.equal(await p.locator('table.validity tbody tr').count(),4);
assert(await p.locator('.validity-cell.expired[data-id="doc-sport-mateo"]').count(),'expired cell');
assert(await p.locator('.validity-cell.soon[data-id="doc-sport-lucia"]').count(),'expiring soon cell');
assert.equal(await p.locator('table.validity .validity-cell.locked').count(),4,'no access to Fernando: locked, without revealing state');
await noOverflow('validity');await shot('validity');
assert.equal(await p.locator('[data-action=validity-upload][data-id="antonio:vt-mammo"]').count(),0,'not applicable: nothing to tap');
await p.locator('table.validity .validity-cell.missing').first().click();
assert.equal(await p.locator('#review-form [name=kind]').inputValue(),'Carné de vacunación');
await p.locator('#review-form [name=expires]').fill(await p.evaluate(()=>addDay(today(),400)));await p.locator('#review-form [name=confirmed]').check();await submit('#review-form');await click('finish-upload');
assert.equal(await p.locator('table.validity .validity-cell.missing').count(),0,'uploaded document fills the cell');
await click('document','doc-mammo-sofia');assert((await text('.sheet')).includes('Vencido'));await click('renew-document','doc-mammo-sofia');assert((await p.locator('#doc-task-form [name=title]').inputValue()).includes('Renovar'));await click('close');
// Privacy: Lucía sees only her own column; a private document of another person never appears.
await p.evaluate(()=>{db.documents.find(d=>d.id==='doc-vac-antonio').visibility='private';persist()});
await click('switch');await click('actor','antonio');await click('tab','docs');await click('doc-view','validity');assert(await p.locator('[data-id="doc-vac-antonio"]').count(),'owner still sees own private document');
await click('switch');await click('actor','sofia');await click('tab','docs');await click('doc-view','validity');assert.equal(await p.locator('[data-id="doc-vac-antonio"]').count(),0,'private document hidden from Sofía');
await click('switch');await click('actor','lucia');await click('tab','docs');await click('doc-view','validity');assert.equal(await p.locator('table.validity .validity-cell.locked').count(),16);assert.equal(await p.locator('[data-id="doc-mammo-sofia"]').count(),0);
await click('switch');await click('actor','sofia');

// F3 assistant
await click('tab','chat');await p.locator('#chat-form input').fill('qué tengo pendiente');await submit('#chat-form');
const answer=p.locator('.bubble').last();assert((await answer.innerText()).includes('próximos 7 días'));
const titles=await answer.locator('.answer-group .answer-item strong').allInnerTexts();assert.equal(new Set(titles).size,titles.length,'routines appear once');
assert(titles.some(t=>t.startsWith('Tomar Losartán')));assert((await answer.innerText()).includes('todos los días 09:00'));
assert((await answer.innerText()).includes('Sin fecha (1)'));
const chatBottom=await p.locator('#chat-form').boundingBox(),nav=await p.locator('.nav').boundingBox();assert(chatBottom.y+chatBottom.height<=nav.y+1,'chat box above navigation');
await shot('assistant-week');
await click('agenda-range',`${await p.evaluate(()=>chat.length-1)}:0`);assert((await p.locator('.bubble').last().innerText()).includes('Todas las actividades'));
await click('agenda-range',`${await p.evaluate(()=>chat.length-1)}:2`);assert((await p.locator('.bubble').last().innerText()).includes('hoy y mañana'));
await noOverflow('assistant');

// F4/F5/F6 medication
await click('tab','meds');assert((await text('#main')).includes('para comprar'));await click('med','med-a');
const sheetText=await text('.sheet');assert(sheetText.includes('3 cajas'));assert(sheetText.includes('Vence primero'));assert(sheetText.includes('1 caja con fecha vencida (3 comprimidos)'));assert(!/Caja \d/.test(sheetText),'no numbered boxes');
assert.equal(await p.getByRole('button',{name:'Editar caja'}).count(),3);assert.equal(await p.getByRole('button',{name:'Eliminar caja'}).count(),3);
for(const btn of await p.locator('.box-actions button').all()){const r=await btn.boundingBox();assert(r.width>=44&&r.height>=44,'44px touch target')}
await click('open-box','med-a:b1');assert((await text('.box-summary')).includes('Abierta'));assert(!(await text('.box-summary')).includes('Ninguna marcada'));
await noOverflow('med detail');await shot('med-detail');
await click('retire-box','med-a:b-old');assert((await text('.sheet')).includes('¿Eliminar la caja que venció'));await shot('med-delete');await submit('#retire-form');
assert((await text('#toast')).includes('Deshacer'));let m=await p.evaluate(()=>db.meds.find(m=>m.id==='med-a'));assert(m.batches.find(b=>b.id==='b-old').archived);assert(m.history.some(h=>h.action.startsWith('Eliminó la caja')));
await click('undo-delete-box','med-a:b-old');m=await p.evaluate(()=>db.meds.find(m=>m.id==='med-a'));assert(!m.batches.find(b=>b.id==='b-old').archived);
await p.getByRole('button',{name:'Marcar para comprar'}).click();assert.equal(await p.getByRole('button',{name:'Quitar de la lista de compras'}).count(),1);
await click('purchase','med-a');assert((await text('.sheet-head')).includes('Agregar caja'));await p.locator('#stock-form [name=qty]').fill('10');await submit('#stock-form');
assert.equal(await p.evaluate(()=>db.meds.find(m=>m.id==='med-a').shopping),false,'adding a box removes it from the shopping list');
assert.deepEqual(errors,[]);console.log('PASS round-1 feedback: live document filters and reset, validity table with privacy, assistant 7-day horizon without repeated routines, compact boxes with open/edit/delete+undo, shopping wording, mobile widths');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
