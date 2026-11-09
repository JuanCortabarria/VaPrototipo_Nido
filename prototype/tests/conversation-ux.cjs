const {webkit}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');const path=require('node:path');
(async()=>{const b=await webkit.launch();try{
 const p=await b.newPage({viewport:{width:375,height:812},isMobile:true,hasTouch:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.NIDO_URL||'file://'+path.resolve(__dirname,'../public/index.html'));
 const click=async(a,id)=>p.locator(`[data-action="${a}"]${id?`[data-id="${id}"]`:''}`).first().click();
 const send=async q=>{await p.locator('#chat-form input').fill(q);await p.locator('#chat-form button').click()};
 await click('actor','sofia');await click('tab','chat');await send('documentos');
 assert((await p.locator('#chat-messages').innerText()).includes('Vos'));assert(await p.locator('#chat-messages [data-action=document]').count());
 const first=await p.evaluate(()=>db.assistantActive[user]);await click('chat-new');await send('qué tengo esta semana');
 assert.notEqual(await p.evaluate(()=>db.assistantActive[user]),first);await click('chat-history');await click('chat-open',first);
 assert.equal(await p.locator('.from-user').innerText(),'Vos\ndocumentos');await p.reload();await click('tab','chat');assert.equal(await p.locator('.from-user').count(),1);
 // Replaying old answers uses today's permissions, even after a stored thread has been opened.
 await p.evaluate(()=>{db.grants.antonio={};persist();render()});assert.equal(await p.locator('#chat-messages [data-id=doc-a]').count(),0);
 await click('switch');await click('actor','lucia');await click('tab','chat');assert.equal(await p.locator('.chat-message').count(),0);await click('chat-history');assert.equal(await p.locator('[data-action=chat-open]').count(),0);await click('close');
 await click('switch');await click('actor','sofia');await click('tab','chat');assert.equal(await p.locator('.from-user').count(),1);
 for(const width of [320,375,390,430]){await p.setViewportSize({width,height:812});const composer=await p.locator('#chat-form').boundingBox(),nav=await p.locator('.nav').boundingBox();assert(composer.y+composer.height<=nav.y+1);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 if(process.env.SHOTS){for(const tab of ['calendar','meds','docs','chat','family']){await click('tab',tab);await p.evaluate(()=>hideToast());await p.screenshot({path:path.join(process.env.SHOTS,tab+'.png')})}}
 assert.deepEqual(errors,[]);console.log('PASS conversation UI: new/reopen/reload, current permissions, profile isolation, composer and mobile widths');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
