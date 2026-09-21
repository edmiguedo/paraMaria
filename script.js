/* =========================================================
   Pantalla de carga
========================================================= */
(function(){
  const preloader=document.querySelector('#preloader');
  if(!preloader) return;
  document.body.style.overflow='hidden';
  const start=Date.now();
  const minTime=650;
  const maxTime=5000;
  let hidden=false;
  function hidePreloader(){
    if(hidden) return;
    hidden=true;
    const wait=Math.max(0,minTime-(Date.now()-start));
    setTimeout(()=>{
      preloader.classList.add('hide');
      document.body.style.overflow='';
      setTimeout(()=>preloader.remove(),800);
    },wait);
  }
  if(document.readyState==='complete'){
    hidePreloader();
  }else{
    window.addEventListener('load',hidePreloader);
  }
  setTimeout(hidePreloader,maxTime);
})();

const plans=[
['Nuestro primer plan cuando regresés de tu viaje','Elegir algo bonito para vernos y empezar a disfrutar todo lo que se viene, mi amor ♡'],

['Ir a brunch juntos','Buscar un lugar bonito, pedir algo diferente y convertir una mañana cualquiera en un plan.'],
['Almorzar juntos','Elegir un restaurante que nos guste o descubrir uno nuevo y simplemente compartir el rato.'],
['Cenar juntos','Una cena afuera o preparada en casa; arreglada o improvisada, pero nuestra.'],
['Ir al cine','Elegir una película, comprar palomitas y después discutir cuál fue la mejor parte.'],
['Ir por un matcha o un café juntos','Encontrar un rincón bonito para compartir un matcha, un café o simplemente el rato.'],
['Probar un restaurante nuevo','Pedir cosas distintas y compartir para probar un poco de todo.'],
['Ir a una librería juntos','Mirar libros y escoger uno para el otro sin explicar el porqué hasta después.'],
['Ir a un concierto','Cantar, disfrutar y guardar otra canción asociada a una historia nuestra.'],
['Retomar el club de lectura','Elegir un libro, leerlo a nuestro ritmo y volver a sentarnos a hablar de él.'],
['Hacer un picnic','Comida, algo de música, una manta y un lugar bonito donde quedarnos.'],
['Ir por un postre de noche','Salir únicamente porque se nos antojó algo dulce. Eso ya es suficiente plan.'],
['Hacer una escapada de fin de semana','Preparar una mochila, elegir un lugar y cambiar de paisaje por un par de días.'],
['Conocer juntos otro departamento','Elegir un departamento que tengamos pendiente, salir a conocerlo y volver con una historia nueva.'],
['Ir juntos a una playa','Pasar el día junto al mar y quedarnos hasta que cambie la luz.'],
['Viajar juntos a otro país','Escoger un país que ambos queramos conocer y disfrutar también todo lo que implica planearlo.'],
['Ver un amanecer','Levantarnos temprano alguna vez solo para ver juntos cómo empieza el día.'],
['Ver un atardecer','Buscar una buena vista, sentarnos y quedarnos hasta que se esconda el sol.'],
['Cocinar juntos','Elegir una receta y aceptar desde el inicio que seguramente vamos a improvisar.'],
['Preparar una cena en casa','Música, algo rico para cocinar y una mesa bonita sin necesitar una ocasión.'],
['Tener una noche de juegos','Cartas o juegos de mesa y descubrir quién lleva peor eso de perder.'],
['Hacer nuestra playlist','Agregar canciones que nos recuerden viajes, etapas, bromas y momentos.'],
['Tomarnos fotos en una aventura','No para posar todo el día, sino para guardar pequeñas pruebas de lo vivido.'],
['Visitar un museo o exposición','Ver algo diferente y después comparar qué fue lo que más nos gustó.'],
['Salir a caminar y hablar','Elegir un lugar agradable y caminar mientras hablamos de cualquier cosa.'],
['Volver a un lugar que nos gustó','Porque no todo tiene que ser nuevo; algunos lugares merecen repetirse.'],
['Hacer una noche de películas en casa','Elegir una película cada uno, pedir algo de comer y armar nuestro propio cine.'],
['Ir a desayunar juntos','Salir a desayunar y empezar el día compartiendo algo rico.'],
['Probar un postre nuevo','Elegir uno que ninguno conozca y decidir si merece repetirse.'],
['Hacer una mini sesión de fotos','Ir a un lugar bonito y tomar fotos espontáneas para guardar el día.'],
['Elegir una actividad nueva para los dos','Algo que ninguno domine: pintar, cocinar algo distinto, bailar o lo que aparezca.']

];

const desc=Object.fromEntries(plans);
const modal=document.querySelector('#modal');
const title=document.querySelector('#modalTitle');
const text=document.querySelector('#modalText');
const toast=document.querySelector('#toast');

let activePlanTitle='';
let activePlanDescription='';

function openPlan(t,d){
  activePlanTitle=t;
  activePlanDescription=d||'Un plan sencillo que puede terminar siendo un gran recuerdo.';
  title.textContent=activePlanTitle;
  text.textContent=activePlanDescription;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closePlan(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

document.addEventListener('click',e=>{
  const card=e.target.closest('[data-plan]');
  if(card && !card.closest('#scheduleModal')){
    openPlan(card.dataset.plan,desc[card.dataset.plan]);
  }
});
document.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click',closePlan));

document.querySelector('#randomHero').addEventListener('click',()=>{
  const p=plans[Math.floor(Math.random()*plans.length)];
  openPlan(...p);
});

const menu=document.querySelector('#menu');
const nav=document.querySelector('#nav');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const obs=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('show');
    obs.unobserve(e.target);
  }
}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

const orb=document.querySelector('.light-orb');
if(matchMedia('(pointer:fine)').matches){
  addEventListener('mousemove',e=>{
    orb.style.left=e.clientX+'px';
    orb.style.top=e.clientY+'px';
    orb.style.opacity='1';
  });
  addEventListener('mouseleave',()=>orb.style.opacity='0');
}

const prefersReducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const pointerFine=matchMedia('(pointer:fine)').matches;

/* =========================================================
   Barra de progreso de lectura
========================================================= */
const scrollProgress=document.querySelector('#scrollProgress');
function updateScrollProgress(){
  const h=document.documentElement;
  const max=h.scrollHeight-h.clientHeight;
  const pct=max>0?(h.scrollTop/max)*100:0;
  scrollProgress.style.width=pct+'%';
}
if(scrollProgress){
  addEventListener('scroll',updateScrollProgress,{passive:true});
  updateScrollProgress();
}

/* =========================================================
   Corazones flotantes ambientales
========================================================= */
const heartsLayer=document.querySelector('#floatingHearts');
if(heartsLayer && !prefersReducedMotion){
  const count=10;
  for(let i=0;i<count;i++){
    const h=document.createElement('span');
    h.className='floating-heart';
    h.textContent='♡';
    const size=(Math.random()*14+11).toFixed(0);
    const left=(Math.random()*100).toFixed(1);
    const duration=(Math.random()*12+16).toFixed(1);
    const delay=(-Math.random()*duration).toFixed(1);
    const drift=(Math.random()*90-45).toFixed(0)+'px';
    h.style.left=left+'%';
    h.style.fontSize=size+'px';
    h.style.animationDuration=duration+'s';
    h.style.animationDelay=delay+'s';
    h.style.setProperty('--drift',drift);
    heartsLayer.appendChild(h);
  }
}

/* =========================================================
   Inclinación 3D suave en las tarjetas de plan
========================================================= */
if(pointerFine && !prefersReducedMotion){
  document.querySelectorAll('.plan-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-0.5;
      const py=(e.clientY-r.top)/r.height-0.5;
      card.style.transform=`translateY(-8px) rotateX(${(-py*6).toFixed(2)}deg) rotateY(${(px*8).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });
}

/* =========================================================
   Botones magnéticos
========================================================= */
if(pointerFine && !prefersReducedMotion){
  document.querySelectorAll('.pill.primary, .pill.glass, .calendar-google').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      const x=e.clientX-r.left-r.width/2;
      const y=e.clientY-r.top-r.height/2;
      btn.style.transform=`translate(${(x*0.16).toFixed(1)}px,${(-3+y*0.28).toFixed(1)}px)`;
    });
    btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
  });
}

/* =========================================================
   Explosión de corazones al confirmar una acción
========================================================= */
function burstHearts(x,y,count=10){
  if(prefersReducedMotion) return;
  for(let i=0;i<count;i++){
    const h=document.createElement('span');
    h.className='heart-burst';
    h.textContent='♡';
    const angle=Math.random()*Math.PI*2;
    const dist=36+Math.random()*58;
    h.style.setProperty('--tx',`${(Math.cos(angle)*dist).toFixed(0)}px`);
    h.style.setProperty('--ty',`${(Math.sin(angle)*dist-36).toFixed(0)}px`);
    h.style.left=x+'px';
    h.style.top=y+'px';
    h.style.fontSize=(12+Math.random()*10).toFixed(0)+'px';
    document.body.appendChild(h);
    h.addEventListener('animationend',()=>h.remove());
  }
}
function burstFromElement(el){
  const r=el.getBoundingClientRect();
  burstHearts(r.left+r.width/2,r.top+r.height/2);
}

function esc(s){
  return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* =========================================================
   Ideas propias
========================================================= */
const list=document.querySelector('#personalList');

const ideaIconRules=[
  [/amanecer|atardecer/i,'sunrise'],
  [/postre|dulce/i,'dessert'],
  [/picnic/i,'picnic'],
  [/foto/i,'camera'],
  [/matcha|caf[eé]/i,'coffee'],
  [/cena/i,'wine'],
  [/almuerzo|almorzar|restaurante|brunch|desayun/i,'utensils'],
  [/cine|pel[ií]cula/i,'cinema'],
  [/libro|lectura|museo|exposici[oó]n/i,'book'],
  [/canci[oó]n|playlist|concierto|m[uú]sica/i,'music'],
  [/pa[ií]s|viaj/i,'plane'],
  [/departamento|mapa/i,'map'],
  [/playa|mar/i,'waves'],
  [/escapada|carretera|camin/i,'car'],
  [/cocinar|receta/i,'pan'],
  [/juego/i,'dice']
];
function pickIdeaIcon(v){
  const rule=ideaIconRules.find(([re])=>re.test(v));
  return rule?rule[1]:'heartline';
}

const defaultIdeas=[
  'Ver un amanecer juntos.',
  'Ir por un postre de noche.',
  'Hacer un picnic.',
  'Tomarnos fotos en alguna aventura.'
];

function getIdeas(){
  const saved=JSON.parse(localStorage.getItem('mariaPlans')||'null');
  return saved!==null?saved:defaultIdeas.slice();
}
function saveIdeasArr(arr){
  localStorage.setItem('mariaPlans',JSON.stringify(arr));
}

function renderIdeas(newIndex=-1){
  const ideas=getIdeas();
  const tiltClasses=['tilt-a','tilt-b','tilt-c','tilt-d'];
  const chipLabels=['pendiente','para vivir','algún día','con nosotros'];
  list.innerHTML='';
  ideas.forEach((v,i)=>{
    const d=document.createElement('article');
    d.className=`free-card ${tiltClasses[i%4]}${i===newIndex?' is-new':''}`;
    d.dataset.index=i;
    d.dataset.plan=v;
    d.innerHTML=`<span class="free-icon"><svg><use href="#icon-${pickIdeaIcon(v)}"/></svg></span>
    <div class="free-top">
      <small class="free-badge">idea nuestra</small>
      <div class="free-actions">
        <button type="button" class="free-action-btn" data-edit-idea="${i}" aria-label="Editar esta idea"><svg><use href="#icon-note"/></svg></button>
        <button type="button" class="free-action-btn danger" data-delete-idea="${i}" aria-label="Borrar esta idea"><svg><use href="#icon-trash"/></svg></button>
      </div>
    </div>
    <div class="free-meta">
      <span class="free-number">${String(i+1).padStart(2,'0')}</span>
      <span class="free-chip">${chipLabels[i%chipLabels.length]}</span>
    </div>
    <p>${esc(v)}</p>`;
    list.appendChild(d);
  });
}
renderIdeas();

const ideaModal=document.querySelector('#ideaModal');
const ideaInput=document.querySelector('#ideaInput');
const ideaCounter=document.querySelector('#ideaCounter');
const saveIdea=document.querySelector('#saveIdea');
const saveIdeaLabel=document.querySelector('#saveIdeaLabel');
const ideaTitle=document.querySelector('#ideaTitle');
const addPlanBtn=document.querySelector('#addPlan');

let editingIdeaIndex=-1;

function openIdeaModal(index=-1,text=''){
  editingIdeaIndex=index;
  ideaInput.value=text;
  updateIdeaCounter();
  ideaTitle.textContent=index>=0?'Edita esta idea nuestra':'¿Qué te gustaría vivir juntos?';
  saveIdeaLabel.textContent=index>=0?'Guardar cambios':'Guardar en nuestra lista';
  ideaModal.classList.add('open');
  ideaModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  setTimeout(()=>ideaInput.focus(),120);
}
function closeIdeaModal(){
  ideaModal.classList.remove('open');
  ideaModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  editingIdeaIndex=-1;
}
function updateIdeaCounter(){
  ideaCounter.textContent=`${ideaInput.value.length} / 120`;
}
function saveCustomIdea(){
  const v=ideaInput.value.trim();
  if(!v){
    ideaInput.focus();
    ideaInput.style.animation='none';
    void ideaInput.offsetWidth;
    ideaInput.style.animation='softShake .28s ease';
    return;
  }
  const ideas=getIdeas();
  const isEdit=editingIdeaIndex>=0 && editingIdeaIndex<ideas.length;
  if(isEdit){
    ideas[editingIdeaIndex]=v;
  }else{
    ideas.push(v);
  }
  saveIdeasArr(ideas);
  renderIdeas(isEdit?editingIdeaIndex:ideas.length-1);
  burstFromElement(saveIdea);

  toast.textContent=isEdit?`”${v}” actualizado ♡`:`”${v}” guardado en nuestras ideas ♡`;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2600);

  ideaInput.value='';
  updateIdeaCounter();
  closeIdeaModal();
}

list.addEventListener('click',e=>{
  const editBtn=e.target.closest('[data-edit-idea]');
  const delBtn=e.target.closest('[data-delete-idea]');
  if(editBtn){
    e.stopPropagation();
    const idx=Number(editBtn.dataset.editIdea);
    const ideas=getIdeas();
    openIdeaModal(idx,ideas[idx]);
  }
  if(delBtn){
    e.stopPropagation();
    const idx=Number(delBtn.dataset.deleteIdea);
    const ideas=getIdeas();
    ideas.splice(idx,1);
    saveIdeasArr(ideas);
    renderIdeas();
    toast.textContent='Idea eliminada de nuestra lista.';
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),2200);
  }
});

addPlanBtn.addEventListener('click',()=>openIdeaModal());
document.querySelectorAll('[data-close-idea]').forEach(el=>el.addEventListener('click',closeIdeaModal));
document.querySelectorAll('[data-suggestion]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    ideaInput.value=btn.dataset.suggestion;
    updateIdeaCounter();
    ideaInput.focus();
  });
});
ideaInput.addEventListener('input',updateIdeaCounter);
saveIdea.addEventListener('click',saveCustomIdea);
ideaInput.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==='Enter') saveCustomIdea();
});

/* =========================================================
   Agenda / calendario
========================================================= */
const scheduleModal=document.querySelector('#scheduleModal');
const schedulePlanName=document.querySelector('#schedulePlanName');
const schedulePlanDescription=document.querySelector('#schedulePlanDescription');
const eventDate=document.querySelector('#eventDate');
const startTime=document.querySelector('#startTime');
const endTime=document.querySelector('#endTime');
const repeatToggle=document.querySelector('#repeatToggle');
const repeatFrequency=document.querySelector('#repeatFrequency');
const repeatCard=document.querySelector('.repeat-card');
const eventNotes=document.querySelector('#eventNotes');
const schedulePreviewDate=document.querySelector('#schedulePreviewDate');
const schedulePreviewRepeat=document.querySelector('#schedulePreviewRepeat');
const scheduledPlansEl=document.querySelector('#scheduledPlans');
const scheduledCount=document.querySelector('#scheduledCount');
const calendarEmpty=document.querySelector('#calendarEmpty');
const miniMonthGrid=document.querySelector('#miniMonthGrid');
const currentMonthLabel=document.querySelector('#currentMonthLabel');

let schedulePlanTitle='';
let schedulePlanDesc='';

const monthNames=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const monthShort=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];

function pad(n){return String(n).padStart(2,'0');}

function toInputDate(d){
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

function nextRoundedHour(){
  const now=new Date();
  const d=new Date(now);
  d.setMinutes(0,0,0);
  d.setHours(d.getHours()+1);
  return d;
}

function setDefaultSchedule(){
  const start=nextRoundedHour();
  const end=new Date(start.getTime()+2*60*60*1000);
  eventDate.value=toInputDate(start);
  startTime.value=`${pad(start.getHours())}:00`;
  endTime.value=`${pad(end.getHours())}:00`;
  repeatToggle.checked=false;
  repeatFrequency.value='WEEKLY';
  repeatCard.classList.remove('active');
  eventNotes.value='';
  updateSchedulePreview();
}

function openSchedule(planTitle,planDesc=''){
  schedulePlanTitle=planTitle||'Una idea nuestra';
  schedulePlanDesc=planDesc||desc[schedulePlanTitle]||'Un plan que queremos convertir en recuerdo.';
  schedulePlanName.textContent=schedulePlanTitle;
  schedulePlanDescription.textContent=schedulePlanDesc;
  setDefaultSchedule();
  scheduleModal.classList.add('open');
  scheduleModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function closeSchedule(){
  scheduleModal.classList.remove('open');
  scheduleModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

document.querySelector('#scheduleFromPlan').addEventListener('click',()=>{
  closePlan();
  setTimeout(()=>openSchedule(activePlanTitle,activePlanDescription),110);
});

document.querySelector('#quickSchedule').addEventListener('click',()=>{
  const custom=prompt('¿Qué plan querés agendar?');
  if(custom && custom.trim()) openSchedule(custom.trim(),'Una idea nuestra que ya merece tener fecha.');
});

document.querySelectorAll('[data-close-schedule]').forEach(el=>el.addEventListener('click',closeSchedule));

repeatToggle.addEventListener('change',()=>{
  repeatCard.classList.toggle('active',repeatToggle.checked);
  updateSchedulePreview();
});
[eventDate,startTime,endTime,repeatFrequency].forEach(el=>el.addEventListener('change',updateSchedulePreview));

function prettyDate(dateString){
  if(!dateString) return 'Elegí una fecha';
  const [y,m,d]=dateString.split('-').map(Number);
  const date=new Date(y,m-1,d);
  return `${date.toLocaleDateString('es-NI',{weekday:'long'})} ${d} de ${monthNames[m-1]}`;
}

function repeatLabel(freq){
  return {
    DAILY:'Cada día',
    WEEKLY:'Cada semana',
    MONTHLY:'Cada mes',
    YEARLY:'Cada año'
  }[freq]||'Se repite';
}

function updateSchedulePreview(){
  const dateText=prettyDate(eventDate.value);
  const timeText=(startTime.value&&endTime.value)?` · ${startTime.value}–${endTime.value}`:'';
  schedulePreviewDate.textContent=dateText+timeText;
  schedulePreviewRepeat.textContent=repeatToggle.checked?repeatLabel(repeatFrequency.value):'Una sola vez';
}

function validateSchedule(){
  if(!schedulePlanTitle || !eventDate.value || !startTime.value || !endTime.value){
    toast.textContent='Falta elegir fecha y horario.';
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),2200);
    return false;
  }
  if(endTime.value<=startTime.value){
    toast.textContent='La hora de fin debe ser después de la hora de inicio.';
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),2400);
    return false;
  }
  return true;
}

function eventFromForm(){
  return {
    id:`event-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title:schedulePlanTitle,
    description:schedulePlanDesc,
    date:eventDate.value,
    start:startTime.value,
    end:endTime.value,
    repeats:repeatToggle.checked,
    frequency:repeatToggle.checked?repeatFrequency.value:null,
    notes:eventNotes.value.trim(),
    createdAt:new Date().toISOString()
  };
}

function getScheduledEvents(){
  return JSON.parse(localStorage.getItem('mariaScheduledPlans')||'[]');
}

function saveScheduledEvents(events){
  localStorage.setItem('mariaScheduledPlans',JSON.stringify(events));
}

function addEventToAgenda(event){
  const events=getScheduledEvents();
  events.push(event);
  events.sort((a,b)=>`${a.date}T${a.start}`.localeCompare(`${b.date}T${b.start}`));
  saveScheduledEvents(events);
  renderAgenda();
}

function localDateTime(date,time){
  const [y,m,d]=date.split('-').map(Number);
  const [hh,mm]=time.split(':').map(Number);
  return new Date(y,m-1,d,hh,mm,0);
}

function googleDateString(date,time){
  const [y,m,d]=date.split('-');
  const [hh,mm]=time.split(':');
  return `${y}${m}${d}T${hh}${mm}00`;
}

function googleCalendarUrl(event){
  const start=googleDateString(event.date,event.start);
  const end=googleDateString(event.date,event.end);
  const tz=Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Managua';
  const details=[
    event.description,
    event.notes?`Nota: ${event.notes}`:'',
    'Plan guardado desde “Nuestra lista de cosas por vivir ♡”.'
  ].filter(Boolean).join('\n\n');

  const params=new URLSearchParams({
    action:'TEMPLATE',
    text:event.title,
    dates:`${start}/${end}`,
    details,
    ctz:tz
  });
  if(event.repeats && event.frequency){
    params.set('recur',`RRULE:FREQ=${event.frequency}`);
  }
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcsText(s=''){
  return String(s)
    .replace(/\\/g,'\\\\')
    .replace(/\n/g,'\\n')
    .replace(/,/g,'\\,')
    .replace(/;/g,'\\;');
}

function icsDate(date,time){
  return googleDateString(date,time);
}

function makeIcs(event){
  const tz=Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Managua';
  const lines=[
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//E&M//Nuestra lista por vivir//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}@nuestra-lista.local`,
    `DTSTART;TZID=${tz}:${icsDate(event.date,event.start)}`,
    `DTEND;TZID=${tz}:${icsDate(event.date,event.end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText([event.description,event.notes].filter(Boolean).join('\n\n'))}`
  ];
  if(event.repeats&&event.frequency) lines.push(`RRULE:FREQ=${event.frequency}`);
  lines.push('END:VEVENT','END:VCALENDAR');
  return lines.join('\r\n');
}

function downloadIcsEvent(event){
  const blob=new Blob([makeIcs(event)],{type:'text/calendar;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=(event.title||'nuestro-plan').toLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi,'-')+'.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function saveCurrentSchedule(openGoogle=false,sourceEl=null){
  if(!validateSchedule()) return null;
  const event=eventFromForm();
  addEventToAgenda(event);
  if(sourceEl) burstFromElement(sourceEl);
  toast.textContent='Plan guardado en nuestra agenda ♡';
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2400);
  closeSchedule();

  if(openGoogle){
    window.open(googleCalendarUrl(event),'_blank','noopener');
  }
  return event;
}

document.querySelector('#saveLocalEvent').addEventListener('click',e=>saveCurrentSchedule(false,e.currentTarget));
document.querySelector('#openGoogleCalendar').addEventListener('click',e=>saveCurrentSchedule(true,e.currentTarget));
document.querySelector('#downloadIcs').addEventListener('click',()=>{
  if(!validateSchedule()) return;
  const event=eventFromForm();
  downloadIcsEvent(event);
});

function removeScheduledEvent(id){
  const events=getScheduledEvents().filter(e=>e.id!==id);
  saveScheduledEvents(events);
  renderAgenda();
  toast.textContent='Plan quitado de nuestra agenda.';
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2000);
}

function openScheduledInGoogle(id){
  const event=getScheduledEvents().find(e=>e.id===id);
  if(event) window.open(googleCalendarUrl(event),'_blank','noopener');
}

function eventTimeLabel(event){
  return `${event.start} – ${event.end}`;
}

function renderAgenda(){
  const events=getScheduledEvents().sort((a,b)=>`${a.date}T${a.start}`.localeCompare(`${b.date}T${b.start}`));
  scheduledCount.textContent=`${events.length} ${events.length===1?'plan programado':'planes programados'}`;

  scheduledPlansEl.querySelectorAll('.scheduled-event').forEach(el=>el.remove());

  if(calendarEmpty){
    calendarEmpty.style.display=events.length?'none':'flex';
  }

  events.forEach(event=>{
    const [y,m,d]=event.date.split('-').map(Number);
    const card=document.createElement('article');
    card.className=`scheduled-event${event.repeats?' repeating':''}`;
    card.innerHTML=`
      <div class="event-date-tile">
        <small>${monthShort[m-1]}</small>
        <strong>${d}</strong>
      </div>

      <div class="event-info">
        <h3>${esc(event.title)}</h3>
        <p>${esc(prettyDate(event.date))}</p>
        <div class="event-chips">
          <span class="event-chip">
            <svg><use href="#icon-clock"/></svg>
            ${esc(eventTimeLabel(event))}
          </span>
          ${event.repeats?`<span class="event-chip"><svg><use href="#icon-repeat"/></svg>${esc(repeatLabel(event.frequency))}</span>`:''}
        </div>
      </div>

      <div class="event-actions">
        <button class="event-icon-btn" type="button" title="Abrir en Google Calendar" data-google-event="${event.id}">
          <svg><use href="#icon-external"/></svg>
        </button>
        <button class="event-icon-btn danger" type="button" title="Quitar de la agenda" data-delete-event="${event.id}">
          <svg><use href="#icon-trash"/></svg>
        </button>
      </div>`;
    scheduledPlansEl.appendChild(card);
  });

  renderMiniMonth(events);
}

scheduledPlansEl.addEventListener('click',e=>{
  const g=e.target.closest('[data-google-event]');
  const d=e.target.closest('[data-delete-event]');
  if(g) openScheduledInGoogle(g.dataset.googleEvent);
  if(d) removeScheduledEvent(d.dataset.deleteEvent);
});

function renderMiniMonth(events){
  const now=new Date();
  const y=now.getFullYear();
  const m=now.getMonth();
  currentMonthLabel.textContent=`${monthNames[m][0].toUpperCase()+monthNames[m].slice(1)} ${y}`;

  const first=new Date(y,m,1);
  const last=new Date(y,m+1,0);
  let startDay=(first.getDay()+6)%7; // Monday = 0
  const prevLast=new Date(y,m,0).getDate();
  const eventDays=new Set(events.filter(e=>{
    const [ey,em]=e.date.split('-').map(Number);
    return ey===y && em===m+1;
  }).map(e=>Number(e.date.split('-')[2])));

  miniMonthGrid.innerHTML='';
  for(let i=startDay-1;i>=0;i--){
    const span=document.createElement('span');
    span.className='outside';
    span.textContent=prevLast-i;
    miniMonthGrid.appendChild(span);
  }

  for(let d=1;d<=last.getDate();d++){
    const span=document.createElement('span');
    span.textContent=d;
    if(d===now.getDate()) span.classList.add('today');
    if(eventDays.has(d)) span.classList.add('has-event');
    miniMonthGrid.appendChild(span);
  }

  let next=1;
  while(miniMonthGrid.children.length<42){
    const span=document.createElement('span');
    span.className='outside';
    span.textContent=next++;
    miniMonthGrid.appendChild(span);
  }
}

renderAgenda();

/* ESC closes whichever popup is visible */
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape') return;
  if(scheduleModal.classList.contains('open')) return closeSchedule();
  if(ideaModal.classList.contains('open')) return closeIdeaModal();
  if(modal.classList.contains('open')) return closePlan();
});
