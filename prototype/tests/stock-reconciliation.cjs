const {webkit}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('assert');const path=require('path');
(async()=>{const browser=await webkit.launch();try{
 const p=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.NIDO_URL||'file://'+path.resolve(__dirname,'../public/index.html'));
 const click=async(a,id)=>p.locator(`[data-action="${a}"]${id!==undefined?`[data-id="${id}"]`:''}`).first().click();
 const submit=async s=>p.locator(s).evaluate(f=>f.requestSubmit());
 if(await p.locator('[data-action=actor]').count())await click('actor','sofia');
 await click('tab','meds');assert.equal(await p.getByRole('button',{name:'Agregar medicamento',exact:true}).count(),1);
 await click('filter','antonio');await click('new-med');assert.equal(await p.locator('#med-form [name=owner]').inputValue(),'antonio');
 await p.locator('#med-form [name=title]').fill('Medicamento de prueba 25 mg');await p.locator('#med-form [name=qty]').fill('12');await submit('#med-form');
 let added=await p.evaluate(()=>db.meds.find(m=>m.title==='Medicamento de prueba 25 mg'));assert(added,'new medicine saved');assert.equal(added.owner,'antonio');assert.equal(added.batches[0].qty,12);assert.equal(added.batches[0].expiry,'');assert.equal(added.rx,'');
 await p.reload();await click('tab','meds');added=await p.evaluate(()=>db.meds.find(m=>m.title==='Medicamento de prueba 25 mg'));assert.equal(added.owner,'antonio','person and new medicine survive reload');assert.equal(added.batches[0].qty,12,'new medicine quantity persists');
 const original=await p.evaluate(()=>({med:structuredClone(db.meds.find(m=>m.id==='med-a')),events:JSON.stringify(db.events)}));
 await click('reconcile-stock','med-a');
 const boxes=original.med.batches.filter(b=>!b.archived);
 for(let i=0;i<boxes.length;i++)await p.locator(`#reconcile-stock-form [name="count:${boxes[i].id}"]`).fill(String(i===0?0:5));
 await submit('#reconcile-stock-form');
 const corrected=await p.evaluate(()=>db.meds.find(m=>m.id==='med-a'));
 assert.equal(corrected.batches.find(b=>b.id===boxes[0].id).qty,0);assert(corrected.stockChecked);assert(corrected.history.some(h=>h.action.startsWith('Revisó cantidad en casa')));
 assert.equal(await p.evaluate(()=>JSON.stringify(db.events)),original.events,'stock correction must not create or mark medication doses');
 assert.equal(corrected.batches.filter(b=>!b.archived).reduce((a,b)=>a+b.qty,0),(boxes.length-1)*5);
 await click('close');await p.reload();await click('tab','meds');await click('reconcile-stock','med-a');assert.equal(await p.locator(`#reconcile-stock-form [name="count:${boxes[0].id}"]`).inputValue(),'0','corrected count persists');
 for(const width of [375,390,430]){await p.setViewportSize({width,height:812});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'reconciliation fits mobile');}
 await click('close');await click('switch');await click('actor','rosa');await click('tab','meds');assert.equal(await p.locator('[data-action=reconcile-stock]').count(),0,'care-only actor cannot correct medicine stock');
 assert.deepEqual(errors,[]);console.log('PASS medication reconciliation: direct CTA, person preselection, per-box count and zero, audit, persistence, dose independence, permissions, mobile');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
