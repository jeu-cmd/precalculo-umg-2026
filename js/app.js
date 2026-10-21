'use strict';

const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
function showView(name){$$('.view').forEach(v=>v.classList.remove('active'));$('#view-'+name)?.classList.add('active');$$('.nav button[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));$('#crumb').textContent=name==='inicio'?'Inicio':({temas:'Explorar temas',videos:'Videotutoriales',laboratorio:'Laboratorio gráfico',retos:'Ejercicios y retos',materiales:'Materiales',equipo:'Equipo',conferencia:'Conferencia'}[name]||'Tema');$('#sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
function openTopic(n){const t=topics.find(x=>x.n===Number(n));if(!t)return;window.currentTopicNumber=t.n;$('#topicCode').textContent=`PRE-${String(t.n).padStart(2,'0')} · ${t.type}`;$('#topicTitle').textContent=t.title;$('#topicIntro').textContent=t.intro;$('#topicFormula').textContent=t.formula;$('#topicProps').textContent=t.props;$('#topicFacts').innerHTML=`<div><span>01</span><span>${t.type}</span></div><div><span>02</span><span>Ejercicio guiado</span></div><div><span>03</span><span>${t.duration} min</span></div><div><span>04</span><span>Videotutorial</span></div>`;$('#exampleTitle').textContent=t.example;$('#exampleIntro').textContent='Procedimiento organizado en pasos para que el resultado pueda comprobarse al finalizar.';$('#steps').innerHTML=t.steps.map(s=>`<li>${s}</li>`).join('');$('#checkText').textContent='Use el resultado del ejemplo para verificar la resolución.';$('#checkResult').textContent='';$('#graphText').textContent=t.n===9?'La parábola permite observar el vértice, el eje de simetría, las raíces y la intersección con el eje y.':t.n===10?'La gráfica de un polinomio ayuda a relacionar sus ceros con los cruces o contactos con el eje x.':'La gráfica debe leerse relacionando coordenadas y características de la función.';const practiceData={
1:{question:'Simplifique √50. Escriba el resultado en su forma radical más simple.',answer:'5√2'},
2:{question:'Indique las restricciones de (x²−9)/(x²−3x). ¿Qué valores de x no se permiten?',answer:'x ≠ 0 y x ≠ 3'},
3:{question:'Resuelva la ecuación 2x − 7 = 9.',answer:'x = 8'},
4:{question:'Un servicio cobra Q20 fijos más Q5 por unidad. Si el total es Q60, plantee 5x + 20 = 60 y encuentre cuántas unidades se contrataron.',answer:'8 unidades'},
5:{question:'Encuentre el punto medio del segmento cuyos extremos son A(2,4) y B(6,8).',answer:'(4, 6)'},
6:{question:'Calcule la pendiente de la recta que pasa por (1,2) y (3,6).',answer:'m = 2'},
7:{question:'Si f(x)=3x−2, evalúe f(4).',answer:'10'},
8:{question:'Para f(x)=x²−4, indique su rango.',answer:'y ≥ −4'},
9:{question:'Para f(x)=x²−6x+5, determine el vértice.',answer:'(3, −4)'},
10:{question:'Factorice x³−6x²+11x−6 y encuentre sus ceros reales.',answer:'x = 1, 2 y 3'}
};
$('#practiceText').textContent=practiceData[t.n].question;
$('#practiceResult').textContent='';
$('#answer').value='';
$('#answer').setAttribute('aria-label','Respuesta del ejercicio de práctica');$('#videoCode').textContent=`PRE-${String(t.n).padStart(2,'0')}`;$('#videoDuration').textContent=t.duration+' min';$('#videoDesc').textContent=`Videotutoriales sobre: ${t.example}. Si hay más de un video para este tema, todos aparecerán en esta sección.`;
const topicVideos=Array.isArray(t.videos)?t.videos.filter(v=>v&&v.embedUrl):[];
$('#videoList').innerHTML=topicVideos.length?topicVideos.map((v,i)=>`<section class="topic-video"><h3>${v.title||'Videotutorial '+(i+1)}</h3><div class="video-box"><iframe src="${v.embedUrl}" title="${v.title||'Videotutorial '+(i+1)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><p class="video-desc">${v.description||''}</p></section>`).join(''):`<div class="video-box"><div class="placeholder"><div class="play">▶</div><p>Tutoriales pendientes de publicación</p><small>Cuando se incorporen los enlaces de los videos, se mostrarán aquí. Si un tema tiene dos tutoriales, aparecerán ambos en esta misma sección.</small></div></div>`;$('#videoFormulas').innerHTML=`<div class="formula"><small>Referencia principal</small><strong>${t.formula}</strong></div>`;$('#timestamps').innerHTML=['00:00 Presentación del ejercicio','00:40 Identificación de datos','01:30 Desarrollo','03:10 Comprobación'].map(x=>{let [time,...rest]=x.split(' ');return `<li><button><time>${time}</time><span>${rest.join(' ')}</span></button></li>`}).join('');$$('.lesson-nav button').forEach(b=>b.classList.toggle('active',b.dataset.tab==='conceptos'));$$('.lesson-panel').forEach(p=>p.classList.toggle('active',p.dataset.panel==='conceptos'));showView('topic')}
function build(){const tn=$('#topicNav');tn.innerHTML=topics.map(t=>`<button data-topic="${t.n}">PRE-${String(t.n).padStart(2,'0')} · ${t.title}</button>`).join('');$('#topicGrid').innerHTML=topics.map(t=>`<div class="topic-row" data-topic="${t.n}"><span class="code">PRE-${String(t.n).padStart(2,'0')}</span><div><h3>${t.title}</h3><p>${t.desc}</p></div><span class="topic-type">${t.type}</span><span class="arrow">→</span></div>`).join('');$('#videoTable').innerHTML=`<div class="vrow vhead"><span>Código</span><span>Ejercicio</span><span>Duración</span><span>Recurso</span></div>`+videos.map(v=>`<div class="vrow"><span class="code">${v.code}</span><span>${v.title}<small class="muted" style="display:block">${v.topic}</small></span><span class="muted">${v.duration}</span><a href="#" data-topic="${v.code.split('-')[1]}">Ver tutorial →</a></div>`).join('')}
document.addEventListener('click',e=>{const view=e.target.closest('[data-view]');if(view){e.preventDefault();showView(view.dataset.view);return}const topic=e.target.closest('[data-topic]');if(topic){e.preventDefault();openTopic(topic.dataset.topic);return}const tab=e.target.closest('[data-tab]');if(tab){const n=tab.dataset.tab;$('.lesson-nav button').forEach(b=>b.classList.toggle('active',b===tab));$('.lesson-panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===n));if(n==='grafica'&&window.loadTopicGeoGebra)window.loadTopicGeoGebra(window.currentTopicNumber);return}if(e.target.id==='showCheck'){const t=topics.find(x=>$('#topicTitle').textContent===x.title);$('#checkResult').textContent=t?.check||''}if(e.target.id==='checkPractice'){
const ans=$('#answer').value.trim().toLowerCase().replace(/\\s+/g,'').replace(/[−–]/g,'-').replace(/√/g,'sqrt').replace(/≠/g,'!=').replace(/,/g,'');
if(!ans){$('#practiceResult').textContent='Escriba una respuesta antes de comprobar.';return}
const n=Number(window.currentTopicNumber);
const checks={
1:()=>ans.includes('5sqrt2')||ans.includes('sqrt50')===false&&ans==='5*sqrt(2)',
2:()=>((ans.includes('0')&&ans.includes('3'))&&(ans.includes('!')||ans.includes('no')||ans.includes('distint'))),
3:()=>ans==='8'||ans==='x=8',
4:()=>ans==='8'||ans==='8unidades'||ans.includes('8unidad'),
5:()=>ans.includes('4')&&ans.includes('6')&&(ans.includes('(')||ans.includes('4;6')),
6:()=>ans==='2'||ans==='m=2',
7:()=>ans==='10'||ans==='f(4)=10',
8:()=>ans.includes('-4')&&(ans.includes('>=')||ans.includes('mayor')||ans.includes('[-4')||ans.includes('rango')),
9:()=>ans.includes('3')&&ans.includes('-4')&&(ans.includes('(')||ans.includes('vertice')),
10:()=>ans.includes('1')&&ans.includes('2')&&ans.includes('3')
};
const ok=checks[n]?checks[n]():false;
$('#practiceResult').textContent=ok?'¡Correcto! Compara tu procedimiento con el ejemplo paso a paso.':'Todavía no coincide con la respuesta esperada. Revisa los datos y el procedimiento e inténtalo de nuevo.';
}});

try{build()}catch(error){console.error('Error al construir el contenido:',error)}

$('#menu').onclick=()=>$('#sidebar').classList.toggle('open');
$('#search').addEventListener('input',e=>{const q=e.target.value.toLowerCase();$('#topicGrid .topic-row').forEach(r=>r.style.display=r.textContent.toLowerCase().includes(q)?'grid':'none')});

const conferenceFields={title:$('#conferenceTitle'),date:$('#conferenceDate'),place:$('#conferencePlace'),schedule:$('#conferenceSchedule'),description:$('#conferenceDescription')};
function updateConferencePreview(){
  $('#conferencePreviewTitle').textContent=conferenceFields.title.value.trim()||'Conferencia académica';
  const details=[conferenceFields.date.value.trim(),conferenceFields.place.value.trim(),conferenceFields.schedule.value.trim()].filter(Boolean);
  $('#conferencePreviewMeta').textContent=details.length?details.join(' · '):'La fecha, el lugar y el horario se mostrarán aquí.';
  $('#conferencePreviewDescription').textContent=conferenceFields.description.value.trim()||'La descripción de la conferencia aparecerá aquí.';
  $('#conferenceStatus').textContent='Vista previa actualizada.';
}
$('#applyConferenceText').addEventListener('click',updateConferencePreview);
$('#conferenceImage').addEventListener('change',e=>{
  const file=e.target.files&&e.target.files[0];
  if(!file)return;
  if(!file.type.startsWith('image/')){ $('#conferenceStatus').textContent='Selecciona un archivo de imagen.';return; }
  const reader=new FileReader();
  reader.onload=event=>{
    $('#conferenceImagePreview').src=event.target.result;
    $('#conferenceImagePreview').hidden=false;
    $('#conferenceImagePlaceholder').hidden=true;
    $('#conferenceStatus').textContent='Imagen cargada para vista previa en este navegador.';
  };
  reader.readAsDataURL(file);
});
