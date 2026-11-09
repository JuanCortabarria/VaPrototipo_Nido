// Conversation persistence, profile isolation, reset, and permission-safe answers.
// No browser dependency: exercise the actual assistant state implementation.
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
const context=vm.createContext({
 db:{documents:[{id:'private-record',title:'Resultado reservado',owner:'antonio',text:''}],events:[],meds:[]},
 user:'sofia',chat:[],allowed:true,people:{sofia:{name:'Sofía'},antonio:{name:'Antonio'}},
 visible:list=>context.allowed?list:[],
 button:(text,action,id)=>`<button data-action="${action}" data-id="${id}">${text}</button>`,
 esc:s=>String(s??''),id:()=>`thread-${++counter}`,persist:()=>true,
 $:()=>null,close:()=>{},render:()=>{},tab:'chat',
});let counter=0;
vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../public/assistant.js'),'utf8'),context);
const run=source=>vm.runInContext(source,context);
run("restoreConversation();chat.push({role:'user',text:'documentos'},{role:'ai',query:'documentos',html:conversationReply('documentos').html});saveConversation()");
const first=context.db.assistantActive.sofia;
assert(first);assert.equal(context.db.assistantConversations[0].title,'documentos');
assert(!JSON.stringify(context.db.assistantConversations).includes('Resultado reservado'),'record HTML is never persisted in conversation history');
run('chat=[];restoreConversation()');assert.equal(context.chat[0].text,'documentos','same-profile reload restores messages');
context.allowed=false;
assert(!run("conversationReply(chat[1].query).html").includes('Resultado reservado'),'revoked records are removed when replaying an answer');
run("user='antonio';restoreConversation()");assert.equal(context.chat.length,0,'another profile starts with no messages');
run("chat.push({role:'user',text:'hola'},{role:'ai',query:'hola'});saveConversation()");
assert.notEqual(context.db.assistantActive.antonio,first);
run("user='sofia';chat=[];restoreConversation()");assert.equal(context.chat[0].text,'documentos','returning to a profile restores its own messages');
run("newConversation()");assert.equal(context.chat.length,0);assert.equal(context.db.assistantActive.sofia,undefined);assert.equal(context.db.assistantConversations.length,2,'new conversation preserves old threads');
context.db.assistantActive.sofia=first;run('restoreConversation()');assert.equal(context.chat[0].text,'documentos','old conversation reopens');
context.db={};run('restoreConversation()');assert.equal(context.chat.length,0,'reset removes active conversation');
console.log('PASS assistant conversations: persistence, reopening, new threads, profile isolation, current permissions, reset');
