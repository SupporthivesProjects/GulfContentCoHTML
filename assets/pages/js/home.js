(function(){
const VERSION='2.0',BUILT='2026-10-19 17:50';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=q=>document.querySelector(q),$$=q=>[...document.querySelectorAll(q)];
const words=t=>t.trim().split(/\s+/).filter(Boolean).length;
const fmt=n=>n.toLocaleString('en-GB');
const CUR={USD:{s:'$',r:1,d:0},BHD:{s:'BHD ',r:.376,d:1},AED:{s:'AED ',r:3.6725,d:0}}; /* demo rates, flagged */
/* stand in rates per word, USD, until the money model is confirmed */
const GR=[{n:'Standard',r:.10,d:'Clean, professional writing from a qualified writer, checked and proofed.'},{n:'Premium',r:.15,d:'A senior writer and a second edit pass.'},{n:'Expert',r:.22,d:'The best writer on your subject, with research depth to match.'}];
const CATS=[ /* v1.8: confirmed catalogue (contentiqo), from prices in USD */
 {n:'Corporate content',s:[['Article content',44,'per 500 words'],['Press releases',44,'a release'],['CVs and resumes',44,'a document'],['Cover letters',44,'a letter'],['Website policies',26,'a policy'],['Review writing',18,'a review']]},
 {n:'Creative writing',s:[['Blog writing',39,'per 500 words'],['E-book writing',66,'a chapter'],['Script writing',53,'a piece'],['White papers',20,'per 500 words'],['Ghostwriting',18,'per 500 words'],['Tech writing',39,'a document']]},
 {n:'Advertising',s:[['Marketing content',26,'per 500 words'],['Website content',44,'a page'],['Tagline and slogan',55,'a route'],['Product descriptions',26,'a product']]},
 {n:'Social media',s:[['Captions and posts',44,'a post'],['Content calendars',20,'a month'],['Campaign copy',26,'a campaign'],['Ad copy',26,'a batch'],['Story scripts',69,'a script'],['Profile and bio copy',69,'a profile']]}];
/* the pull the page pricer (hidden in v1.8) keeps its own sample list */
const PCATS=[{s:[['Blog post',1200],['Article',1500],['Website copy',2000],['Product copy',150]]},{s:[['Ad copy',50],['Video script',600],['Email',300]]},{s:[['Captions',30],['Thread',280]]},{s:[['Press release',500],['Case study',900],['White paper',3000]]}];
const SVC=PCATS.flatMap(c=>c.s.map(s=>({n:s[0],w:s[1]})));
const st={cur:'USD',svc:0,len:1200,g:0,t:0,cart:0};
/* words struck across the visit (the header meter was removed; gcc.cut() still reads this) */
let cutTotal=0;function cut(n){cutTotal+=n||0}
const money=u=>{const c=CUR[st.cur],v=u*c.r;return c.s+(v>=1?(c.d?v.toFixed(c.d):Math.round(v).toLocaleString('en-GB')):v.toFixed(2))};

/* background waffle: typed, struck, rewritten */
const WAF=[[['unlock your full potential','do more'],['drive meaningful engagement','get replies'],['a holistic approach','all of it']],
 [['best in class','good'],['world class talent','good writers'],['seamless experience','it works']],
 [['end to end solutions','we do all of it'],['leverage synergies','work together'],['move the needle','sell more']]];
function slot(i){const el=$('#w'+i);let k=0;
  const run=()=>{const [j,r]=WAF[i][k%WAF[i].length];k++;
    el.innerHTML=`<span class="j"><span class="st">${j}</span></span><span class="r"><span class="hw">${r}</span></span>`;
    if(RM){el.querySelector('.st').classList.add('on');el.querySelector('.hw').classList.add('on');return}
    el.style.opacity=0;el.style.transition='opacity .8s';requestAnimationFrame(()=>el.style.opacity=1);
    setTimeout(()=>{el.querySelector('.st').classList.add('on');cut(words(j))},1400);
    setTimeout(()=>el.querySelector('.hw').classList.add('on'),2200);
    setTimeout(()=>{el.style.opacity=0},6400);setTimeout(run,7400)};
  setTimeout(run,RM?0:1800+i*1300)}
[0,1,2].forEach(slot);

/* draft: strikes and rewrites on load, hover to edit again */
const ALT=[['We fix office Wi-Fi. Properly.','Your Wi-Fi, fixed by Friday.','Slow Wi-Fi? We fix that.'],["Ask for help. We'll sort it.","Ask once. We'll sort it.","One call. Sorted."],['Call us. We pick up.','Ring us. A human answers.','Call. We answer.']];
const ed=$$('.edit'),altI=[0,0,0];
function tally(){const o=ed.reduce((a,e)=>a+words(e.querySelector('.o').textContent),0),n=ed.reduce((a,e)=>a+words(e.querySelector('.w').textContent),0);$('#tally').textContent=`${o} words to ${n}`}
ed.forEach((e,i)=>{
  const s=e.querySelector('.st'),w=e.querySelector('.hw');
  setTimeout(()=>{s.classList.add('on');cut(words(s.textContent))},RM?0:1500+i*900);setTimeout(()=>w.classList.add('on'),RM?0:2050+i*900);
  let busy=false;
  const again=()=>{if(busy||RM)return;busy=true;w.classList.remove('on');s.classList.remove('on');
    setTimeout(()=>{altI[i]=(altI[i]+1)%3;w.textContent=ALT[i][altI[i]];tally();s.classList.add('on');cut(words(s.textContent))},450);
    setTimeout(()=>{w.classList.add('on');busy=false},1100)};
  e.addEventListener('pointerenter',again);e.addEventListener('click',again);
});
setTimeout(()=>$('#tally').classList.add('on'),RM?0:4500);
$$('.start .hw').forEach(h=>h.classList.add('on'));

/* the edit: strike as you scroll */
const SEGS=[["In today's fast paced digital landscape, ",''],['our passionate team of wordsmiths leverages ','We write'],['best in class, end to end content solutions ','copy'],['that empower forward thinking brands to ','that helps you'],['unlock their full potential and drive meaningful engagement. ','sell more.'],['Reach out today to start your journey with us. ','Email us.']];
$('#para').innerHTML=SEGS.map((s,i)=>`<span class="seg" data-i="${i}"><span class="st">${s[0]}</span>${s[1]?`<span class="fix"><span class="hw">${s[1]}</span></span>`:''}</span>`).join('');
const before=SEGS.reduce((a,s)=>a+words(s[0]),0),after=SEGS.reduce((a,s)=>a+words(s[1]),0);
let shown=-1,editMax=0;

function editAt(p){const n=Math.min(SEGS.length,Math.floor(p*(SEGS.length+.6)));if(n===shown)return;shown=n;
  while(editMax<n){cut(words(SEGS[editMax][0]));editMax++}
  $$('.seg').forEach((s,i)=>{const on=i<n;s.classList.toggle('cut',on);s.querySelector('.st').classList.toggle('on',on);s.querySelector('.hw')&&s.querySelector('.hw').classList.toggle('on',on)});
  const cur=SEGS.reduce((a,s,i)=>a+(i<n?words(s[1]):words(s[0])),0);$('#wc').textContent=cur;$('#wcl').textContent=n>=SEGS.length?`words, from ${before}`:'words';$('#wbar').style.width=cur/before*100+'%'}
const track=$('#editTrack');
function onScroll(){if(getComputedStyle(track).height==='auto'||innerWidth<=760){const r=track.getBoundingClientRect();editAt(r.top<innerHeight*.5?1:0);return}
  const r=track.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));editAt(p)}
editAt(RM?1:0);if(!RM)addEventListener('scroll',onScroll,{passive:true});

/* contents */
const renderCats=()=>{$('#cats').innerHTML=CATS.map(c=>`<div class="cat"><h3>${c.n}</h3>${c.s.map(s=>`<div class="svc"><b>${s[0]}</b><span class="dots"></span><small>from ${money(s[1])} ${s[2]}</small><svg class="ring" preserveAspectRatio="none" viewBox="0 0 200 50"><path pathLength="1" d="M150 6C100 0 20 4 8 20c-10 16 30 26 90 25s100-8 98-24C194 6 150 3 110 5" fill="none" stroke="#d7263d" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linecap="round"/></svg></div>`).join('')}</div>`).join('');$$('.svc').forEach(s=>s.style.setProperty('--bw',s.querySelector('b').offsetWidth+'px'))};renderCats();
/* mobile: the four sheets swipe, dots follow */
(()=>{const c=$('#cats'),dots=$$('#swipe .sdots i');c.addEventListener('scroll',()=>{const w=c.firstElementChild?c.firstElementChild.offsetWidth+16:1,i=Math.min(dots.length-1,Math.round(c.scrollLeft/w));dots.forEach((x,k)=>x.classList.toggle('on',k===i))},{passive:true})})();
$$('.svc').forEach(s=>s.style.setProperty('--bw',s.querySelector('b').offsetWidth+'px'));
addEventListener('resize',()=>$$('.svc').forEach(s=>s.style.setProperty('--bw',s.querySelector('b').offsetWidth+'px')));

/* pull the page */
const SAMPLE={
'Blog post':['What nobody tells you about opening a second branch','The first shop runs on you. You know which supplier is late on Tuesdays, which regular wants oat milk, and where the spare keys live. None of that is written down, and that is the problem.','A second branch needs the first one to work without you in it. So before you sign the lease, spend a month writing down everything you do without thinking. It will feel slow. It is the cheapest hire you will ever make.','Then pick the manager before the location. A good site with the wrong person loses money quietly. The right person in an average site finds a way.'],
'Article':['The quiet return of the neighbourhood bakery','Ten years ago the corner bakery looked finished. Supermarkets sold a loaf for less than the flour cost to make it, and rents did the rest.','Now the queues are back, and they start before seven. Part of it is taste. Part of it is that people want somewhere to go that knows their name.','The bakers who survived did three things differently. They baked less, sold out earlier and stopped apologising for it. Scarcity, it turns out, is a better advert than a discount.'],
'Website copy':['Office Wi-Fi that works on Monday morning','We fix the networks in small offices, properly, so nobody has to sit next to the router to join a call.','Book a visit and an engineer walks the building, finds the dead spots and tells you what it will cost before touching anything. Most offices are sorted in a day.','After that we watch it for you. If something drops, we usually know before you do.'],
'Product copy':['The Harbour carry on','Forty litres, one zip that opens the whole lid, and a shell that shrugs off a wet runway.','Fits most cabin sizers with room to spare. Weighs 2.1kg empty, so the allowance goes on what you pack, not the bag.'],
'Ad copy':['Your books close on the 10th','Everyone else closes on the 2nd. Ledgerline matches your bank feed overnight, so month end is a morning, not a week.'],
'Video script':['Open on hands. Flour. A radio somewhere.','VOICE: Most mornings start before the alarm.','CUT TO: the shutter going up, the street still blue.','VOICE: Ours start with the ovens. Forty years, same recipe, same corner.','CUT TO: the first customer, hair still wet, pointing at the window.'],
'Email':['Your table at Sufra is ready for Friday','Hi John, we have set aside the corner table for four at 8pm.','The lamb ouzi takes ninety minutes, so if you would like it, reply to this email and the kitchen will start it before you arrive.','See you Friday.'],
'Captions':['Day one of the new menu','Fresh bread, old oven, same queue. Come early.'],
'Thread':['Five things we got wrong in our first year','1. We priced to win work, not to keep the lights on.','2. We said yes to every brief. Some of them were not for us.','3. We hired for speed, then spent months fixing the speed.','4. We wrote our own website last. It showed.','5. We waited too long to ask for referrals.'],
'Press release':['Harbour Logistics shows customers where every container is','Dubai, UAE. Harbour Logistics now shows customers where every container is, by the hour, from the port to their door.','The tracking platform goes live for all customers on 2 November. It is included in every contract at no extra cost.'],
'Case study':['How a family bakery doubled its online orders','Problem: the website took orders, but nobody could find the order button on a phone.','What we changed: one page per product, one button per page, and copy that said what was in the bread.','Result: online orders doubled in eight weeks, and the phone stopped ringing with questions.'],
'White paper':['Container visibility in Gulf ports','Executive summary. Shippers lose an average of two working days per consignment to uncertainty about where their goods are.','This paper sets out where that time goes, what it costs a mid sized importer each year, and how hourly tracking recovers most of it.','Section one looks at dwell time at the quay. Section two follows the container through customs. Section three covers the last mile.']
};
$('#pick').innerHTML=SVC.map((s,i)=>`<button data-s="${i}" aria-pressed="${i===0}">${s.n}</button>`).join('');
$('#gopts').innerHTML=GR.map((g,i)=>`<button data-g="${i}" aria-pressed="${i===0}">${g.n}<small data-rate="${g.r}"></small></button>`).join('');
const MIN=()=>Math.max(20,Math.round(SVC[st.svc].w*.25/10)*10),MAX=()=>Math.round(SVC[st.svc].w*3/10)*10;
const PX=()=>innerWidth<=760?[200,620]:[220,760];
function renderPrice(){
  const s=SVC[st.svc],w=st.len,[a,b]=PX(),p=Math.min(1,Math.max(0,(w-MIN())/(MAX()-MIN())));
  const page=$('#page');page.style.height=(a+p*(b-a))+'px';
  const L=$('#lines');if(L.dataset.s!==s.n){L.dataset.s=s.n;const d=SAMPLE[s.n],ps=d.slice(1).map(x=>'<p>'+x+'</p>').join('');L.innerHTML='<h4>'+d[0]+'</h4>'+ps+ps}
  $('#pName').textContent='Example copy: '+s.n;$('#pWords').textContent=fmt(w)+' words';if(document.activeElement!==lenIn)lenIn.value=fmt(w);$('#rR').textContent=Math.max(1,Math.round(w/238))+' min';
  $('#rP').textContent=money(w*GR[st.g].r*(st.t?1.25:1));
  const pw=$('#pageWrap');pw.classList.toggle('long',w>2000);pw.classList.toggle('vlong',w>5000);
  page.style.boxShadow=`0 ${30+Math.min(30,w/200)}px ${60+Math.min(40,w/150)}px -24px rgba(27,32,51,${(.18+Math.min(.14,w/40000)).toFixed(3)}),0 2px 4px rgba(27,32,51,.06)`;
  $('#pull').setAttribute('aria-valuenow',w);$('#pull').setAttribute('aria-valuemin',MIN());$('#pull').setAttribute('aria-valuemax',MAX());
  $$('#pick button').forEach((x,i)=>x.setAttribute('aria-pressed',i===st.svc));$$('#gopts button').forEach((x,i)=>x.setAttribute('aria-pressed',i===st.g));$$('#topts button').forEach((x,i)=>x.setAttribute('aria-pressed',i===st.t));
  $$('[data-rate]').forEach(d=>d.textContent=money(+d.dataset.rate)+' a word');
}
$('#pick').onclick=e=>{const b=e.target.closest('button');if(!b)return;st.svc=+b.dataset.s;st.len=SVC[st.svc].w;renderPrice()};
$('#gopts').onclick=e=>{const b=e.target.closest('button');if(!b)return;st.g=+b.dataset.g;renderPrice()};
$('#topts').onclick=e=>{const b=e.target.closest('button');if(!b)return;st.t=+b.dataset.t;renderPrice()};
const pull=$('#pull'),pageEl=$('#page');let bow=0,bowT=0,bowRaf=0;
const bowLoop=()=>{bow+=(bowT-bow)*.18;bowT*=.86;pageEl.style.transform=`rotateX(${(-bow*1.6).toFixed(3)}deg) scaleY(${(1+Math.abs(bow)*.006).toFixed(4)})`;bowRaf=(Math.abs(bow)>.01||Math.abs(bowT)>.01)?requestAnimationFrame(bowLoop):(pageEl.style.transform='',0)};
pull.addEventListener('pointerdown',e=>{pull.setPointerCapture(e.pointerId);const y0=e.clientY,l0=st.len,[a,b]=PX();let ly=e.clientY,lt=performance.now();
  const mv=e=>{const dy=e.clientY-y0;
    /* the longer the page, the heavier it pulls */
    const heavy=1/(1+Math.max(0,st.len-2000)/9000);
    let w=l0+dy*heavy/(b-a)*(MAX()-MIN());w=Math.round(Math.min(MAX(),Math.max(MIN(),w))/10)*10;if(Math.abs(w-SVC[st.svc].w)<(MAX()-MIN())*.02)w=SVC[st.svc].w;st.len=w;renderPrice();
    if(!RM){const t=performance.now(),v=(e.clientY-ly)/Math.max(8,t-lt);ly=e.clientY;lt=t;bowT=Math.max(-1.6,Math.min(1.6,bowT+v*.9));if(!bowRaf)bowRaf=requestAnimationFrame(bowLoop)}};
  const up=()=>{pull.removeEventListener('pointermove',mv);pull.removeEventListener('pointerup',up);
    if(!RM)pageEl.animate([{transform:'scaleY(1.014)'},{transform:'scaleY(.994)'},{transform:'scaleY(1.003)'},{transform:'scaleY(1)'}],{duration:520,easing:'cubic-bezier(.3,1.5,.5,1)'})};
  pull.addEventListener('pointermove',mv);pull.addEventListener('pointerup',up)});
pull.addEventListener('keydown',e=>{const k=e.shiftKey?100:10;if(e.key==='ArrowDown'||e.key==='ArrowRight'){st.len=Math.min(MAX(),st.len+k);renderPrice();e.preventDefault()}if(e.key==='ArrowUp'||e.key==='ArrowLeft'){st.len=Math.max(MIN(),st.len-k);renderPrice();e.preventDefault()}});
const lenIn=$('#lenIn');
const typed=commit=>{const n=parseInt(lenIn.value.replace(/[^0-9]/g,''),10);if(!isNaN(n)){st.len=Math.min(10000,Math.max(20,n));renderPrice()}if(commit)lenIn.value=fmt(st.len)};
lenIn.addEventListener('input',()=>typed(false));lenIn.addEventListener('blur',()=>typed(true));lenIn.addEventListener('keydown',e=>{if(e.key==='Enter'){typed(true);lenIn.blur()}});
$('#page').style.transition=RM?'none':'height .15s ease-out';
$('#addB').onclick=()=>{st.cart++;$('#added').classList.add('show');clearTimeout(window._a);window._a=setTimeout(()=>$('#added').classList.remove('show'),3200)};
addEventListener('resize',renderPrice);

/* grades */
const RATE=['base price','adds 50%','adds 120%'];
const LONG=['Clean, professional writing from a qualified writer, checked and proofed. Suited to blog posts, product copy, captions and emails, where the brief is clear and the subject is familiar. You get a tidy draft that sounds like you.',
 'A senior writer and a second edit pass. Suited to website copy, articles and scripts, where tone matters and the copy has to persuade. A second editor reads it cold and removes whatever does not earn its place.',
 'The best writer on your subject, with research depth to match. Suited to white papers, e-books and technical pieces, where readers will check the facts. Every claim is sourced and checked twice before the draft reaches you.'];
$('#cards').innerHTML=GR.map((g,i)=>`<div class="tilt rv" style="--base:${[-1.2,.8,-.6][i]}deg"><article class="card"><span class="pen rate">${RATE[i]}</span><h3>${g.n}</h3><p>${LONG[i]}</p><span class="stamp" style="--sr:${[-8,6,-5][i]}deg">${['Checked','Edited twice','Sourced'][i]}</span><i class="glare"></i></article></div>`).join('');
/* index cards tilt in 3D under the pointer */
if(!RM&&matchMedia('(hover:hover)').matches)$$('.tilt').forEach(w=>{const c=w.querySelector('.card');let raf=0,tx=0,ty=0;
  const set=()=>{raf=0;c.style.setProperty('--rx',(-ty*9).toFixed(2)+'deg');c.style.setProperty('--ry',(tx*11).toFixed(2)+'deg');c.style.setProperty('--gx',(50+tx*60)+'%');c.style.setProperty('--gy',(50+ty*60)+'%')};
  w.addEventListener('pointermove',e=>{const r=w.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;w.classList.add('on');if(!raf)raf=requestAnimationFrame(set)});
  w.addEventListener('pointerleave',()=>{w.classList.remove('on');tx=ty=0;set()})});

/* before and after: the release edits itself as you scroll */
const PR=[['Dubai, UAE. Harbour Logistics',null],[', a leading innovator in the logistics space,',''],[' is thrilled to announce the launch of its revolutionary next generation tracking platform,','now shows customers'],[' designed to empower businesses of all sizes to seamlessly unlock end to end visibility across their entire supply chain journey,','where every container is, by the hour,'],[" delivering unparalleled value in today's fast moving global marketplace.",'from the port to their door.']];
$('#bT').innerHTML=PR.map((x,i)=>x[1]===null?`<span class="pr keep">${x[0]}</span>`:`<span class="pr" data-i="${i}"><span class="st">${x[0]}</span>${x[1]?`<span class="fix"><span class="hw">${x[1]}</span></span>`:''}</span>`).join('');
const prE=$$('.pr[data-i]'),baB=$('#baB'),baA=$('#baA'),bW=$('#bW');let prN=-1,prMax=0,prDone=false;
const prCount=n=>PR.reduce((a,x,i)=>a+(x[1]===null?words(x[0]):(i-1<n?words(x[1]):words(x[0]))),0);
let bwShown=prCount(0),bwT=bwShown,bwRaf=0;
const bwTick=()=>{bwShown+=Math.sign(bwT-bwShown)*Math.max(1,Math.round(Math.abs(bwT-bwShown)*.2));if(Math.abs(bwT-bwShown)<1)bwShown=bwT;bW.textContent=bwShown+' words';bwRaf=bwShown!==bwT?requestAnimationFrame(bwTick):0};
function prAt(n){if(n===prN)return;prN=n;
  prE.forEach((e,i)=>{const on=i<n;e.querySelector('.st').classList.toggle('on',on);const h=e.querySelector('.hw');if(h)setTimeout(()=>h.classList.toggle('on',i<prN),on?380:0)});
  while(prMax<n){cut(words(PR[prMax+1][0]));prMax++}
  bwT=prCount(n);if(RM){bwShown=bwT;bW.textContent=bwT+' words'}else if(!bwRaf)bwRaf=requestAnimationFrame(bwTick);
  const done=n>=prE.length;baA.classList.toggle('wait',!done);if(done&&!prDone){prDone=true;setTimeout(()=>baA.classList.add('done'),300)}}
bW.textContent=bwShown+' words';$('#aW').textContent=words($('#aT').textContent)+' words';
const prScroll=()=>{const r=baB.getBoundingClientRect(),vh=innerHeight,p=Math.min(1,Math.max(0,(vh*.82-r.top)/(vh*.5)));prAt(Math.floor(p*(prE.length+.4)))};
if(RM)prAt(prE.length);else{addEventListener('scroll',prScroll,{passive:true});prScroll()}

/* order: the pen ticks each box as it reaches it, one line joining them */
const list=$('#list'),trail=$('#trail'),boxes=$$('.item .box'),items=$$('.item');let segAt=[],tLen=0;
function trailBuild(){const L=list.getBoundingClientRect();const pts=boxes.map(b=>{const r=b.getBoundingClientRect();return{x:r.left-L.left,y:r.top-L.top,w:r.width,h:r.height}});
  let d='',acc=0;segAt=[0];const tmp=document.createElementNS('http://www.w3.org/2000/svg','path');trail.parentNode.appendChild(tmp);
  const col=pts.every(q=>Math.abs(q.x-pts[0].x)<4);
  pts.forEach((p,i)=>{if(i===0){d=col?`M${p.x+2} ${p.y+38}`:`M${p.x+36} ${p.y+6}`;return}const a=pts[i-1];let seg;
    if(Math.abs(p.y-a.y)<4){const x0=a.x+38,y0=a.y+8,x1=p.x-6,y1=p.y+22,mx=(x0+x1)/2;seg=` C${x0+30} ${y0-26} ${mx-20} ${y0+46} ${mx} ${y0+18} S${x1-30} ${y1-30} ${x1} ${y1}`}
    else if(col){const y0=a.y+38,y1=p.y+2;seg=` C${a.x-16} ${y0+50} ${p.x-18} ${y1-70} ${p.x+2} ${y1}`;if(i<pts.length-1)seg+=` M${p.x+2} ${p.y+38}`}
    else seg=` M${p.x-6} ${p.y+22}`
    d+=seg;tmp.setAttribute('d',d);acc=tmp.getTotalLength();segAt.push(acc)});
  tmp.remove();trail.setAttribute('d',d);tLen=trail.getTotalLength();trail.style.strokeDasharray=tLen+' '+tLen;trailAt()}
function trailAt(){if(!tLen)return;let p;if(RM)p=1;else{const r0=boxes[0].getBoundingClientRect(),rN=boxes[boxes.length-1].getBoundingClientRect(),vh=innerHeight,start=vh*.78,span=Math.max(vh*.32,rN.top-r0.top+vh*.32);p=Math.min(1,Math.max(0,(start-r0.top)/span))}
  const dr=p*tLen;trail.style.strokeDashoffset=(tLen-dr).toFixed(1);items.forEach((it,i)=>it.classList.toggle('on',p>0&&dr>=segAt[i]-1))}
addEventListener('scroll',trailAt,{passive:true});addEventListener('resize',trailBuild);
(document.fonts?document.fonts.ready:Promise.resolve()).then(trailBuild);

/* sticky note: lifts on hover, peels off to show the form beneath */
const sticky=$('#sticky'),jform=$('#jform');
sticky.onclick=()=>{sticky.setAttribute('aria-expanded','true');if(RM){sticky.closest('.join').classList.add('formed');sticky.style.display='none';jform.classList.add('show');$('#jEmail').focus();return}
  sticky.classList.add('peel');jform.classList.add('show');sticky.closest('.join').classList.add('formed');setTimeout(()=>{sticky.style.display='none';$('#jEmail').focus({preventScroll:true})},800)};
$('#jf').onsubmit=e=>{e.preventDefault();const em=$('#jEmail');if(!/^\S+@\S+\.\S+$/.test(em.value)){em.closest('.field').style.borderColor='var(--red)';em.focus();return}jform.classList.add('sent')};

/* the contents page turns over at its corner as it leaves, onto the pricer */
const turn=$('#turn'),svcSec=$('#svcSec');
const turnAt=()=>{const r=svcSec.getBoundingClientRect(),vh=innerHeight,p=Math.min(1,Math.max(0,(vh*.95-r.bottom)/(vh*.6)));
  const e=p*p*(3-2*p),max=Math.min(innerWidth*.62,760);turn.style.setProperty('--ts',(e*max).toFixed(1)+'px')};
/* v1.8: the curl joined contents to the pricer; off while the pricer is hidden */
if(!RM&&!$('#pullSec').hidden){addEventListener('scroll',turnAt,{passive:true});addEventListener('resize',turnAt);turnAt()}else turn.style.display='none';

/* buttons */
$$('.btn').forEach(b=>b.addEventListener('pointerenter',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--x',e.clientX-r.left+'px');b.style.setProperty('--y',e.clientY-r.top+'px');b.style.setProperty('--d',Math.ceil(2*Math.hypot(r.width,r.height))+'px')}));

/* unbuilt pages */
const tip=$('#tip');let tt;
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();e.stopPropagation();const r=a.getBoundingClientRect();tip.classList.add('show');const tw=tip.offsetWidth,th=tip.offsetHeight,up=r.top>th+14;
  tip.className='tip show '+(up?'up':'dn');tip.style.top=(up?r.top-th-10:r.bottom+10)+'px';tip.style.left=Math.min(innerWidth-tw-8,Math.max(8,r.left+r.width/2-tw/2))+'px';clearTimeout(tt);tt=setTimeout(()=>tip.classList.remove('show'),1600)},true);
addEventListener('scroll',()=>tip.classList.remove('show'),{passive:true});

/* the desk scales to fit the viewport so the hero keeps equal space above and below */
const fitDesk=()=>{const box=$('.deskbox');if(innerWidth<=1180){box.style.removeProperty('--ds');return}
  const hero=$('#hero'),wrap=hero.querySelector('.wrap'),avail=hero.clientHeight-80-64,col=wrap.clientWidth-694-48;
  box.style.setProperty('--ds',Math.max(.5,Math.min(1,avail/800,col/760)).toFixed(4))};
fitDesk();addEventListener('resize',fitDesk);
/* the paper sits in 3D, leans toward the pointer and lifts in a soft wind */
(()=>{const st=$('.stack'),hero=$('#hero');if(!st||RM)return;
  const h=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)};
  const noise=(x,s)=>{const i=Math.floor(x),f=x-i,u=f*f*(3-2*f);return h(i+s*17)*(1-u)+h(i+1+s*17)*u};
  let mx=0,my=0,cx=0,cy=0,vis=true,t0=performance.now();
  hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5});
  hero.addEventListener('pointerleave',()=>{mx=0;my=0});
  new IntersectionObserver(es=>vis=es[0].isIntersecting).observe(hero);
  const gust=t=>Math.max(0,noise(t*.22,4.7)-.32)/.68,flut=(t,g)=>Math.sin(t*2.3+Math.sin(t*.8)*1.6)*g;
  const loop=now=>{if(vis){const t=(now-t0)/1000;cx+=(mx-cx)*.06;cy+=(my-cy)*.06;
    const w=gust(t),f=flut(t,w),wl=gust(t-.45),fa=flut(t-.45,wl),wm=gust(t-.9),fb=flut(t-.9,wm);
    st.style.transform='translate('+(w*7).toFixed(2)+'px,'+(Math.sin(t*.9)*6-w*5).toFixed(2)+'px) rotateX('+(8-cy*10+Math.sin(t*.7)*1.2+w*3.4+f*1.5).toFixed(2)+'deg) rotateY('+(-6+cx*14+f*2.2+(noise(t*.18,1.3)-.5)*3).toFixed(2)+'deg) rotateZ('+(Math.sin(t*.5)*.6+w*.9+f*.45).toFixed(2)+'deg) skewY('+(f*.35).toFixed(3)+'deg)';
    st.style.setProperty('--s2x',(wl*10+fa*3).toFixed(2)+'px');st.style.setProperty('--s2y',(-wl*3).toFixed(2)+'px');st.style.setProperty('--s2r',(wl*1.4+fa*.9).toFixed(3)+'deg');
    st.style.setProperty('--s3x',(wm*14+fb*4).toFixed(2)+'px');st.style.setProperty('--s3y',(-wm*4).toFixed(2)+'px');st.style.setProperty('--s3r',(wm*1.8+fb*1.2).toFixed(3)+'deg');}
    requestAnimationFrame(loop)};requestAnimationFrame(loop)})();
$('#cue').onclick=()=>$('#editSec').scrollIntoView({behavior:RM?'auto':'smooth'});
setTimeout(()=>$('#cueT').classList.add('on'),RM?0:2300);
/* reveals */
/* stamps tilt as in Figma */
$$('.stamp').forEach(s=>s.style.setProperty('--sr','-8deg'));
const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const t=en.target;t.classList.add('in');
  if(t.classList.contains('tilt'))setTimeout(()=>t.classList.add('stamped'),700+[...$$('.tilt')].indexOf(t)*260);
  io.unobserve(t)}),{rootMargin:'0px 0px -12% 0px'});
$$('.rv').forEach(el=>{if(RM){el.classList.add('in');el.classList.add('on');return}io.observe(el)});
$$('.cards .rv').forEach((el,i)=>el.style.transitionDelay=i*.1+'s');
$$('.copy .rv').forEach((el,i)=>el.style.transitionDelay=(.4+i*.12)+'s');

renderPrice();
requestAnimationFrame(()=>requestAnimationFrame(()=>{document.body.classList.add('ready');$$('.h1 .ln>span').forEach((s,i)=>s.style.transitionDelay=(.1+i*.1)+'s');$$('.copy .rv').forEach(el=>el.classList.add('in'))}));
window.gcc={version:VERSION,built:BUILT,state:()=>JSON.parse(JSON.stringify(st)),edit:p=>editAt(p),cut:()=>cutTotal,rates:GR.map(g=>[g.n,g.r]),pricer:()=>{const s=$('#pullSec');s.hidden=!s.hidden;renderPrice();return s.hidden?'pricer hidden':'pricer shown'}};
console.info('gcc homepage 02 v'+VERSION+' ('+BUILT+')');
})();
