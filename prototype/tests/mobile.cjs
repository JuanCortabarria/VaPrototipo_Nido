// Requires Playwright and its WebKit browser. Run from any working directory.
const {webkit}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{
 const browser=await webkit.launch();
 try {
  for(const width of [375,390,430]){
   const page=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(process.env.NIDO_URL||pathToFileURL(path.resolve(__dirname,'../public/index.html')).href);
   await page.getByRole('button',{name:'Calendar',exact:true}).waitFor();
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
   if(overflow||errors.length)throw Error(JSON.stringify({width,overflow,errors}));
   console.log(`PASS WebKit ${width}px: calendar loaded, no horizontal overflow or JS errors`);
   await page.close();
  }
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
