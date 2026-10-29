function addAntonioExamples(data){
 if(data.antonioExamplesVersion)return data;
 const t=today();
 const samples=[{id:'med-a',title:'Losartán 50 mg',time:'09:00'}, {id:'med-antonio-met',title:'Metformina · ejemplo',time:'13:00'},{id:'med-antonio-ator',title:'Atorvastatina · ejemplo',time:'22:00'}];
 for(const sample of samples){
  let med=data.meds.find(m=>m.id===sample.id);
  if(!med){med={id:sample.id,owner:'antonio',title:sample.title,unit:'comprimidos',visibility:'shared',rx:addDay(t,60),updated:t,batches:[{id:id(),qty:28,expiry:addDay(t,180)}],shopping:false,history:[]};data.meds.push(med)}
  const seriesId=id();for(let offset=0;offset<14;offset++)data.events.push({id:id(),owner:'antonio',title:'Tomar '+med.title,type:'Medicación',scope:'calendar',date:addDay(t,offset),time:sample.time,assignee:'antonio',recipient:'antonio',medSource:med.id,status:'pending',visibility:'shared',reminder:'A la hora indicada',seriesId,seriesLabel:'Todos los días · ejemplo ficticio',seriesUntil:addDay(t,13),notes:'Horario ficticio para explorar el prototipo. No es una pauta médica ni indica dosis. Registrar la toma no descuenta stock automáticamente.',history:[]});
 }
 data.antonioExamplesVersion=1;return data;
}
