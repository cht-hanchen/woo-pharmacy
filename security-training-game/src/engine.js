(function(){
"use strict";
const C = window.COURSE;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const app = $("#app");
const INK = {pink:"var(--pink)",teal:"var(--teal)",yellow:"var(--yellow)",blue:"var(--blue)",red:"var(--red)",violet:"var(--violet)"};
const ink = k => INK[k]||k;
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- storage (per viewer, per course) ---------- */
const KEY="sectrain:"+C.id;
const store={
  get(){try{return JSON.parse(localStorage.getItem(KEY))||null}catch(e){return null}},
  set(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}}
};
const blank=()=>({seen:{},prac:{},done:{},boss:{pass:false,best:0},chk:{},last:null});
let S=Object.assign(blank(),store.get()||{});
const save=()=>store.set(S);

/* ---------- XP & ranks ---------- */
const nStages=C.chapters.reduce((a,c)=>a+c.stages.length,0);
const nPrac=C.chapters.reduce((a,c)=>a+c.stages.filter(s=>s.type==="sorter").length,0);
const XP_MAX=nStages*10+nPrac*100+C.chapters.length*50+300;
const xp=()=>Object.keys(S.seen).length*10+Object.keys(S.prac).length*100+Object.keys(S.done).length*50+(S.boss.pass?300:0);
const RANKS=C.ranks;
const rank=()=>{const f=xp()/XP_MAX;let r=RANKS[0][1];for(const [t,n] of RANKS) if(f>=t) r=n;return r;};
const allPrac=()=>Object.keys(S.prac).length>=nPrac;

/* ---------- splats ---------- */
function rng(seed){let a=seed>>>0||1;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function splatShape(seed){
  const r=rng(seed),n=16,pts=[];
  for(let i=0;i<n;i++){const ang=i/n*Math.PI*2+(r()-.5)*.25;let rad=26+r()*10;if(r()<.3) rad+=10+r()*8;pts.push([50+Math.cos(ang)*rad,50+Math.sin(ang)*rad]);}
  const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];let m=mid(pts[n-1],pts[0]),d="M"+m[0].toFixed(1)+" "+m[1].toFixed(1);
  for(let i=0;i<n;i++){const p=pts[i],q=mid(p,pts[(i+1)%n]);d+="Q"+p[0].toFixed(1)+" "+p[1].toFixed(1)+" "+q[0].toFixed(1)+" "+q[1].toFixed(1);}
  let dots="";for(let i=0;i<5;i++){const ang=r()*Math.PI*2,dist=42+r()*8;dots+="<circle cx='"+(50+Math.cos(ang)*dist).toFixed(1)+"' cy='"+(50+Math.sin(ang)*dist).toFixed(1)+"' r='"+(1.6+r()*3).toFixed(1)+"'/>";}
  return "<path d='"+d+"Z'/>"+dots;
}
const splat=(seed,color,cls="splat")=>"<svg class='"+cls+"' viewBox='0 0 100 100' aria-hidden='true'><g style='fill:"+color+"'>"+splatShape(seed)+"</g></svg>";
function burst(x,y,color){
  if(reduce) return;
  const d=document.createElement("div");d.innerHTML=splat(Math.floor(Math.random()*900)+1,color);const s=d.firstChild;
  Object.assign(s.style,{position:"fixed",left:(x-50)+"px",top:(y-50)+"px",width:"100px",height:"100px",zIndex:70});
  document.body.appendChild(s);
  s.animate([{transform:"scale(0) rotate(-30deg)",opacity:1},{transform:"scale(1.1) rotate(0)",opacity:1,offset:.4},{transform:"scale(1.15)",opacity:0}],{duration:900,easing:"cubic-bezier(.2,.9,.3,1.4)"}).onfinish=()=>s.remove();
}
function burstAt(el,color){const r=el.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,color);}

/* ---------- icons ---------- */
const ICONS={
  play:"<path d='M7 4l13 8-13 8z' fill='currentColor' stroke='none'/>",
  shield:"<path d='M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z'/><path d='M8.5 12l2.5 2.5 4.5-5'/>",
  download:"<path d='M12 3v12M7 10l5 5 5-5M4 20h16'/>",
  siren:"<path d='M6 18v-6a6 6 0 0112 0v6M4 18h16v3H4zM12 3V1M4.5 6L3 4.5M19.5 6L21 4.5'/>",
  key:"<circle cx='8' cy='15' r='4'/><path d='M11 12l9-9M16 7l3 3M14 9l2 2'/>",
  file:"<path d='M14 3H6v18h12V7z'/><path d='M14 3v4h4'/><rect x='9' y='12' width='6' height='5' rx='1'/><path d='M10 12v-1.5a2 2 0 014 0V12'/>",
  cloud:"<path d='M7 18a4 4 0 01-.5-8A6 6 0 0118 9a4.5 4.5 0 01-.5 9z'/><path d='M10 14l2 2 3-4'/>",
  flag:"<path d='M5 21V4M5 4h12l-2 4 2 4H5'/>",
  hook:"<path d='M12 2v9a4 4 0 11-4 4'/><path d='M6 13l2 2 2-2'/><rect x='14' y='4' width='8' height='6' rx='1'/><path d='M14 4l4 3 4-3'/>",
  clipboard:"<rect x='5' y='4' width='14' height='17' rx='2'/><path d='M9 4V2h6v2M8.5 12l2.5 2.5 4.5-5'/>",
  scale:"<path d='M12 3v18M5 7h14M7 7l-3 7h6zM17 7l-3 7h6zM8 21h8'/>",
  at:"<circle cx='12' cy='12' r='4'/><path d='M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-3.5 7.1'/>",
  gear:"<circle cx='12' cy='12' r='3'/><path d='M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1'/>",
  inbox:"<path d='M3 13l3-8h12l3 8v6H3z'/><path d='M3 13h5l1 2h6l1-2h5'/>",
  mega:"<path d='M3 10v4h4l7 5V5L7 10zM17 9a4 4 0 010 6M19.5 6.5a8 8 0 010 11'/>",
  lock:"<rect x='5' y='10' width='14' height='11' rx='2'/><path d='M8 10V7a4 4 0 018 0v3M12 14v3'/>",
  check:"<path d='M5 12l5 5 9-10'/>",
  user:"<circle cx='12' cy='8' r='4'/><path d='M4 21a8 8 0 0116 0'/>",
  skull:"<path d='M12 3a8 8 0 00-8 8c0 3 1.6 4.8 3 5.6V20h10v-3.4c1.4-.8 3-2.6 3-5.6a8 8 0 00-8-8z'/><circle cx='9' cy='11' r='1.6'/><circle cx='15' cy='11' r='1.6'/><path d='M10 20v-2M14 20v-2'/>",
  reset:"<path d='M4 12a8 8 0 108-8H7M7 1L4 4l3 3'/>",
  book:"<path d='M4 4h7a3 3 0 013 3v14a2 2 0 00-2-2H4zM20 4h-6M20 4v15h-6'/>"
};
const icon=(k,cls="ic")=>"<svg class='"+cls+"' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>"+(ICONS[k]||"")+"</svg>";

/* ---------- toast, lightbox, modal ---------- */
const toastEl=document.createElement("div");toastEl.id="toast";toastEl.setAttribute("role","status");document.body.appendChild(toastEl);
let tT=0;function toast(m){toastEl.textContent=m;toastEl.classList.add("on");clearTimeout(tT);tT=setTimeout(()=>toastEl.classList.remove("on"),1700);}
function overlay(id,html,focusSel){
  const o=document.createElement("div");o.id=id;o.setAttribute("role","dialog");o.setAttribute("aria-modal","true");o.innerHTML=html;document.body.appendChild(o);
  const prev=document.activeElement;
  const close=()=>{o.remove();document.removeEventListener("keydown",k,true);prev&&prev.focus&&prev.focus();};
  const k=e=>{if(e.key==="Escape"){e.stopPropagation();e.preventDefault();close();}};
  document.addEventListener("keydown",k,true);
  o.addEventListener("click",e=>{if(e.target===o||e.target.closest("[data-close]")) close();});
  const f=$(focusSel||"[data-close]",o);f&&f.focus();
  return o;
}
function lightbox(src,alt){overlay("lb","<img src='"+src+"' alt='"+esc(alt||"")+"'><button type='button' data-close>關閉 Esc</button>");}
function modal(title,html){overlay("modal","<div class='box'><h3>"+title+"</h3>"+html+"<button type='button' class='x' data-close>關閉</button></div>");}

/* ---------- screen transition: ink wipe ---------- */
const wipe=document.createElement("div");wipe.id="wipe";wipe.setAttribute("aria-hidden","true");document.body.appendChild(wipe);
let busy=false;
function go(render,color){
  if(busy) return;
  if(reduce){render();return;}
  busy=true;
  wipe.innerHTML="<svg viewBox='0 0 100 100'><g style='fill:"+(color||"var(--pink)")+"'>"+splatShape(Math.floor(Math.random()*900)+1)+"</g></svg>";
  const s=wipe.firstChild;
  s.animate([{transform:"scale(0) rotate(-25deg)"},{transform:"scale(1) rotate(0)"}],{duration:380,easing:"cubic-bezier(.6,0,.3,1)",fill:"forwards"}).onfinish=()=>{
    render();
    s.animate([{transform:"scale(1)",opacity:1},{transform:"scale(1.25)",opacity:0}],{duration:360,easing:"ease-out",fill:"forwards"}).onfinish=()=>{wipe.innerHTML="";busy=false;};
  };
}

/* ---------- shared chrome ---------- */
const hudXP=()=>"<div class='hudxp' aria-label='你的進度'><span class='rk'>"+rank()+"</span><span class='xp'>"+xp().toLocaleString()+" XP</span></div>";
const keys=arr=>"<div class='keys' aria-hidden='true'>"+arr.map(([k,t])=>"<span>"+k.split(" ").map(x=>"<kbd>"+x+"</kbd>").join("")+" "+t+"</span>").join("")+"</div>";
const decor=()=>"<div class='deco' style='right:-6rem;top:-5rem;width:22rem;height:22rem'>"+splat(31,"var(--pink)","splat").replace("class='splat'","class='splat' style='inset:0;width:100%;height:100%'")+"</div><div class='deco' style='left:-7rem;bottom:-7rem;width:24rem;height:24rem'>"+splat(57,"var(--teal)").replace("class='splat'","class='splat' style='inset:0;width:100%;height:100%'")+"</div>";
let screen="title", keyHandler=null;
function mount(html,name,onKey){app.innerHTML=decor()+html;screen=name;keyHandler=onKey||null;}
document.addEventListener("keydown",e=>{
  if(document.getElementById("modal")||document.getElementById("lb")) return;
  const tag=(document.activeElement||{}).tagName||"";
  if(/INPUT|TEXTAREA|SELECT/.test(tag)&&e.key!=="Escape") return;
  keyHandler&&keyHandler(e);
});

/* ================= TITLE ================= */
function renderTitle(){
  const T=C.titleScreen;
  const last=S.last&&C.chapters[S.last[0]];
  const html="<section class='scr' aria-label='標題畫面'>"+
   "<div class='title-grid'>"+
    "<div>"+
      "<div class='logo'>"+splat(7,ink(C.c1))+"<span class='eyebrow'>"+T.eyebrow+"</span><h1><span class='g l1' style='display:block'>"+T.l1+"</span><span class='g l2' style='--c1:"+ink(C.c1)+"'>"+T.l2+"</span></h1></div>"+
      "<p style='max-width:32em;font-weight:500;margin-bottom:1.3rem;color:var(--arena-mute)'>"+T.lede+"</p>"+
      "<div class='menu'>"+
        "<button class='mbtn play' type='button' id='tPlay'>"+icon("play")+"<span><b class='g'>PLAY</b><small>"+T.playSub+"</small></span></button>"+
        (last?"<button class='mbtn' type='button' id='tCont'>"+icon("flag")+"<span><b class='g'>繼續上次</b><small>"+esc(last.tag+" "+last.title)+"</small></span></button>":"")+
        "<button class='mbtn' type='button' id='tBoss'>"+icon("skull")+"<span><b class='g'>魔王戰</b><small>"+(allPrac()?(S.boss.pass?"已通過，可以再挑戰":"測驗 "+C.boss.Q.length+" 題，80 分過關"):"先完成章節裡的練習關卡才能挑戰")+"</small></span></button>"+
        "<button class='mbtn' type='button' id='tReset'>"+icon("reset")+"<span><b class='g'>重設進度</b><small>清除這台電腦上的 XP 與勾選紀錄</small></span></button>"+
      "</div>"+
      "<div class='meta'>"+T.meta.map(m=>"<span>"+m+"</span>").join("")+"</div>"+
    "</div>"+
    "<aside class='why'>"+T.why+"</aside>"+
   "</div>"+
   (T.tape?"<div class='tape' aria-hidden='true'><span>"+(T.tape.concat(T.tape)).map(t=>"<span>"+t+"</span><span>▲</span>").join("")+"</span></div>":"")+
   keys([["Enter","開始"]])+
  "</section>";
  mount(html,"title",e=>{if(e.key==="Enter"&&document.activeElement===document.body){e.preventDefault();toHub();}});
  $("#tPlay").onclick=()=>toHub();
  if($("#tCont")) $("#tCont").onclick=()=>toChapter(S.last[0],S.last[1]);
  $("#tBoss").onclick=()=>{allPrac()?toBoss():toast("先完成練習關卡 🔒");};
  const r=$("#tReset");let armed=false;
  r.onclick=()=>{if(!armed){armed=true;$("small",r).textContent="再按一次確認重設";return;}S=blank();save();toast("進度已重設");renderTitle();};
  $("#tPlay").focus({preventScroll:true});
}

/* ================= HUB ================= */
function chStat(ci){const ch=C.chapters[ci];const seen=ch.stages.filter((_,i)=>S.seen[ch.id+":"+i]).length;return{seen,total:ch.stages.length,done:!!S.done[ch.id]};}
function toHub(sel){go(()=>renderHub(sel),"var(--pink)");}
function renderHub(sel){
  const nCh=C.chapters.length, cols=Math.ceil((nCh+1)/2);
  const doneN=Object.keys(S.done).length;
  const cards=C.chapters.map((ch,i)=>{const st=chStat(i);
    return "<button class='mode' type='button' data-ci='"+i+"' style='--c:"+ink(ch.ink)+"' aria-label='"+esc(ch.tag+" "+ch.title)+"，"+st.seen+" / "+st.total+" 關'>"+
      "<div class='art'>"+splat(ch.seed||(i*7+3),ink(ch.ink))+"<div class='tags'><span>"+ch.tag+"</span>"+(ch.stages.some(s=>s.type==="sorter")?"<span>練習</span>":"")+"</div>"+(st.done?"<span class='done'>CLEAR</span>":"")+icon(ch.icon)+"</div>"+
      "<span class='ribbon'>"+ch.ribbon+"</span>"+
      "<div class='bd'><p>"+ch.desc+"</p><div class='chips'><span>"+st.total+" 關</span><span>"+ch.mins+" 分</span><span class='pg'>"+(st.done?"✓":st.seen+"/"+st.total)+"</span></div></div>"+
    "</button>";}).join("")+
   "<button class='mode boss' type='button' data-boss aria-label='魔王戰'>"+
    "<div class='art'>"+splat(99,"var(--red)")+"<div class='tags'><span>BOSS</span><span>"+C.boss.Q.length+" 題</span></div>"+(S.boss.pass?"<span class='done'>CLEAR</span>":"")+"<svg class='ic' viewBox='0 0 200 200' style='width:clamp(3.4rem,7vh,5.4rem);height:clamp(3.4rem,7vh,5.4rem)' aria-hidden='true'>"+C.boss.art+"</svg></div>"+
    "<span class='ribbon'>魔王戰</span>"+
    "<div class='bd'><p>"+C.boss.desc+"</p><div class='chips'><span>80 分過關</span><span class='pg'>"+(S.boss.pass?"✓":"BOSS")+"</span></div></div>"+
    (allPrac()?"":"<div class='lock'><div>🔒 尚未解鎖<small>先完成章節裡的練習關卡</small></div></div>")+
   "</button>";
  const html="<section class='scr' aria-label='選擇關卡'>"+
   "<div class='top'><button class='back' type='button' id='bk'><span class='k'>Esc</span>標題</button>"+hudXP()+"</div>"+
   "<div class='hub-head'><div class='ttl hub-ttl'>"+splat(5,"var(--pink)")+"<h2 class='g stroke'>PLAY</h2><p>選擇關卡。閱讀、練習、打倒魔王，一路累積 XP。</p></div>"+
    "<div class='player' aria-label='你的進度'><div class='av' style='--c1:"+ink(C.c1)+"'>"+icon("user")+"</div><span class='nm'>"+C.player+"</span><span class='rk'>"+rank()+"</span><div class='xpbar'><i style='width:"+Math.round(xp()/XP_MAX*100)+"%'></i></div>"+
    "<div class='st'><span><b>"+xp().toLocaleString()+"</b>/ "+XP_MAX.toLocaleString()+" XP</span><span><b>"+doneN+"</b>/ "+nCh+" 章</span><span>魔王 <b>"+(S.boss.pass?"✓":"—")+"</b></span></div></div></div>"+
   "<div class='modes' style='--cols:"+cols+"'>"+cards+"</div>"+
   keys([["← → ↑ ↓","移動"],["Enter","選擇"],["Esc","標題"]])+
  "</section>";
  const nav=e=>{
    if(e.key==="Escape"){e.preventDefault();go(renderTitle,"var(--teal)");return;}
    const ms=$$(".mode");let i=ms.indexOf(document.activeElement);
    const d={ArrowRight:1,ArrowLeft:-1,ArrowDown:cols,ArrowUp:-cols}[e.key];
    if(d===undefined) return;e.preventDefault();
    if(i<0) i=0; else i=Math.max(0,Math.min(ms.length-1,i+d));ms[i].focus();
  };
  mount(html,"hub",nav);
  $("#bk").onclick=()=>go(renderTitle,"var(--teal)");
  $$(".mode[data-ci]").forEach(b=>b.onclick=()=>{const ci=+b.dataset.ci;const ch=C.chapters[ci];
    let si=0;for(let k=0;k<ch.stages.length;k++){if(!S.seen[ch.id+":"+k]){si=k;break;}}
    if(S.done[ch.id]) si=0;
    toChapter(ci,si);});
  $(".mode[data-boss]").onclick=()=>{allPrac()?toBoss():toast("先完成練習關卡 🔒");};
  const f=sel!=null?$(".mode[data-ci='"+sel+"']")||$(".mode[data-boss]"):$(".mode");f&&f.focus({preventScroll:true});
}

/* ================= CHAPTER / STAGE SELECT ================= */
let CI=0,SI=0;
function toChapter(ci,si){go(()=>renderChapter(ci,si||0),ink(C.chapters[ci].ink));}
function locked(ci,si){const ch=C.chapters[ci];for(let k=0;k<si;k++){if(ch.stages[k].type==="sorter"&&!S.prac[ch.id+":"+k]) return true;}return false;}
function renderChapter(ci,si){
  CI=ci;const ch=C.chapters[ci];
  const html="<section class='scr' aria-label='"+esc(ch.tag+" "+ch.title)+"' style='--c:"+ink(ch.ink)+"'>"+
   "<div class='top'><button class='back' type='button' id='bk'><span class='k'>Esc</span>關卡</button>"+
    "<div class='ttl'>"+splat(ch.seed||(ci*7+3),ink(ch.ink))+"<h2 class='g stroke'>"+ch.title+"</h2><p>"+ch.tag+"・"+ch.stages.length+" 關・約 "+ch.mins+" 分鐘</p></div>"+hudXP()+"</div>"+
   "<div class='stagesel'>"+
    "<nav class='stages' aria-label='本章關卡'><div class='lab'><i></i>STAGES</div><div class='slist' role='tablist' aria-orientation='vertical' id='slist'></div>"+
     "<div class='chprog'><small id='cpTxt'></small><div class='bar'><i id='cpBar'></i></div></div></nav>"+
    "<article class='panel' id='panel' role='tabpanel' aria-live='polite'></article>"+
    "<div class='bar-bottom'><button class='nav' type='button' id='prev'>◀ 上一關</button><button class='start' type='button' id='next'><span class='tri'></span><span><b class='g' id='nextB'>下一關</b><small id='nextS'></small></span><span class='chev'>&gt;&gt;&gt;</span></button></div>"+
   "</div>"+
   keys([["↑ ↓","切換關卡"],["→","下一關"],["Esc","返回關卡選單"]])+
  "</section>";
  mount(html,"chapter",e=>{
    if(e.key==="Escape"){e.preventDefault();toHub(CI);return;}
    if(e.target.closest&&e.target.closest(".md,.sorter,.irw,.qopts")&&/Arrow/.test(e.key)) return;
    if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();const n=SI+(e.key==="ArrowDown"?1:-1);if(n>=0&&n<ch.stages.length&&!locked(CI,n)){showStage(n);$$(".sbtn")[n].focus();}}
    if(e.key==="ArrowRight"){e.preventDefault();$("#next").click();}
    if(e.key==="ArrowLeft"){e.preventDefault();$("#prev").click();}
  });
  $("#bk").onclick=()=>toHub(CI);
  $("#prev").onclick=()=>{if(SI>0) showStage(SI-1);};
  $("#next").onclick=()=>{
    if(SI<ch.stages.length-1){if(!locked(CI,SI+1)) showStage(SI+1);}
    else{const first=!S.done[ch.id];S.done[ch.id]=1;save();if(first) toast("CLEAR！+50 XP");toHub(CI);}
  };
  showStage(Math.min(si,ch.stages.length-1));
}
function stageList(){
  const ch=C.chapters[CI];
  $("#slist").innerHTML=ch.stages.map((s,i)=>{const lk=locked(CI,i),seen=S.seen[ch.id+":"+i],pr=s.type==="sorter";
    return "<button class='sbtn"+(seen?" seen":"")+(pr?" prac":"")+(lk?" locked":"")+"' role='tab' type='button' data-si='"+i+"' aria-selected='"+(i===SI)+"'"+(lk?" aria-disabled='true'":"")+" tabindex='"+(i===SI?0:-1)+"'>"+
      "<span class='n'>"+(seen?"✓":String(i+1).padStart(2,"0"))+"</span><span class='t'>"+s.t+"</span>"+(lk?"<span class='m'>🔒</span>":pr?"<span class='m'>"+(S.prac[ch.id+":"+i]?"CLEAR":"練習")+"</span>":"")+"</button>";}).join("");
  $$(".sbtn").forEach(b=>b.onclick=()=>{const i=+b.dataset.si;if(locked(CI,i)){toast("先通過前面的練習關卡 🔒");return;}showStage(i);});
  const sel=$(".sbtn[aria-selected='true']");sel&&sel.scrollIntoView({block:"nearest",inline:"nearest"});
  const seenN=ch.stages.filter((_,i)=>S.seen[ch.id+":"+i]).length;
  $("#cpTxt").textContent="本章進度 "+seenN+" / "+ch.stages.length;$("#cpBar").style.width=(seenN/ch.stages.length*100)+"%";
}
function updateNext(){
  const ch=C.chapters[CI],st=ch.stages[SI],last=SI===ch.stages.length-1;
  const gated=st.type==="sorter"&&!S.prac[ch.id+":"+SI];
  const b=$("#next");b.disabled=gated;b.classList.toggle("ready",last&&!gated);
  $("#nextB").textContent=last?"完成本章":"下一關";
  $("#nextS").textContent=gated?"全部答對才能前進":last?"回到關卡選單，領取 CLEAR":(ch.stages[SI+1].t);
  $("#prev").disabled=SI===0;
}
function showStage(si){
  const ch=C.chapters[CI],st=ch.stages[si];SI=si;
  S.last=[CI,si];
  const k=ch.id+":"+si;if(!S.seen[k]&&st.type!=="sorter"){S.seen[k]=1;toast("+10 XP");}
  save();
  const p=$("#panel");
  p.innerHTML="<header class='ph'><div><span class='sn g'>STAGE <b>"+String(si+1).padStart(2,"0")+"</b> / "+String(ch.stages.length).padStart(2,"0")+"</span><h3>"+st.t+"</h3></div>"+(st.sub?"<p class='sub'>"+st.sub+"</p>":"")+"</header><div class='pb' id='pb'></div>";
  const pb=$("#pb");
  if(st.type==="sorter") sorter(pb,st,k);
  else if(st.type==="irmas"){pb.innerHTML=st.html||"";irmas(pb);}
  else if(st.type==="pw"){pb.innerHTML=st.html||"";pwcheck($(".pw",pb)||pb);}
  else if(st.type==="dir"){pb.innerHTML=st.html||"";directory(pb);}
  else pb.innerHTML=st.html;
  wire(pb);
  stageList();updateNext();
  $(".hudxp").outerHTML=hudXP();
  if(!reduce) p.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"none"}],{duration:260,easing:"ease-out"});
  requestAnimationFrame(()=>fit(pb));
}

/* auto-fit: shrink type inside the panel until nothing overflows */
const small=()=>matchMedia("(max-width:900px), (max-aspect-ratio:1/1)").matches;
function fit(pb){
  if(!pb||!pb.isConnected) return;
  pb.style.setProperty("--fz",1);pb.classList.remove("scrolly");
  if(small()) return;
  let f=1;const over=()=>pb.scrollHeight>pb.clientHeight+1;
  if(!over()&&!pb.querySelector(".fig,.irw,.sorter,.md,.split")){
    while(!over()&&f<1.24){f=+(f+.04).toFixed(2);pb.style.setProperty("--fz",f);}
    if(over()){f=+(f-.04).toFixed(2);pb.style.setProperty("--fz",f);}
  }
  while(over()&&f>.66){f=+(f-.04).toFixed(2);pb.style.setProperty("--fz",f);}
  if(pb.scrollHeight>pb.clientHeight+1) pb.classList.add("scrolly");
}
let rT=0;addEventListener("resize",()=>{clearTimeout(rT);rT=setTimeout(()=>{const pb=$("#pb");pb&&fit(pb);},120);});

/* generic behaviours inside a stage */
function wire(root){
  $$("[data-md]",root).forEach(md=>{
    const trig=$$("[data-t]",md),panes=$$("[data-p]",md);
    const set=t=>{trig.forEach(b=>{const on=b.dataset.t===t;b.hasAttribute("role")?b.setAttribute("aria-selected",on):b.setAttribute("aria-pressed",on);b.tabIndex=on||!b.hasAttribute("role")?0:-1;});
      panes.forEach(p=>p.hidden=p.dataset.p!==t);requestAnimationFrame(()=>fit($("#pb")));};
    trig.forEach(b=>{b.onclick=()=>set(b.dataset.t);
      b.onkeydown=e=>{if(!b.hasAttribute("role")) return;const tabs=trig.filter(x=>x.hasAttribute("role"));const i=tabs.indexOf(b);
        const d={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(d===undefined) return;e.preventDefault();e.stopPropagation();
        const n=tabs[(i+d+tabs.length)%tabs.length];n.focus();set(n.dataset.t);};});
    set(md.dataset.md||trig[0].dataset.t);
  });
  $$("button.zoom",root).forEach(b=>b.onclick=()=>{const im=$("img",b);lightbox(im.src,im.alt);});
  $$(".fig",root).forEach(f=>{const zs=$$("button.zoom",f);if(zs.length<2) return;
    f.classList.add("multi");const pg=document.createElement("div");pg.className="pager";
    pg.innerHTML=zs.map((z,i)=>"<button type='button' aria-label='第 "+(i+1)+" 張圖' data-i='"+i+"'>"+(i+1)+"</button>").join("")+"<span>共 "+zs.length+" 張</span>";
    $(".imgs",f).after(pg);
    const set=i=>{zs.forEach((z,j)=>z.hidden=j!==i);$$("button",pg).forEach((b,j)=>b.setAttribute("aria-pressed",j===i));};
    $$("button",pg).forEach(b=>b.onclick=()=>set(+b.dataset.i));set(0);});
  $$("[data-modal]",root).forEach(b=>b.onclick=()=>{const t=$("template[data-mt='"+b.dataset.modal+"']",root);modal(b.dataset.title||b.textContent,t.innerHTML);});
  $$("[data-count]",root).forEach(el=>{const to=+el.dataset.count,fmt=v=>Math.round(v).toLocaleString();
    if(reduce){el.textContent=fmt(to);return;}const t0=performance.now(),d=1400;
    const step=t=>{const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);el.textContent=fmt(to*e);if(k<1&&el.isConnected) requestAnimationFrame(step);};requestAnimationFrame(step);});
  $$("[data-chk]",root).forEach(ul=>{const id=ul.dataset.chk;S.chk[id]=S.chk[id]||{};
    $$("input",ul).forEach((c,i)=>{c.checked=!!S.chk[id][i];c.onchange=()=>{S.chk[id][i]=c.checked?1:0;save();const n=$$("input:checked",ul).length;const o=$("[data-chkn='"+id+"']",root);o&&(o.textContent=n+" / "+$$("input",ul).length);if(c.checked) burstAt(c,"var(--teal)");};});
    const o=$("[data-chkn='"+id+"']",root);o&&(o.textContent=$$("input:checked",ul).length+" / "+$$("input",ul).length);
    const clr=$("[data-chkclear='"+id+"']",root);clr&&(clr.onclick=()=>{S.chk[id]={};save();$$("input",ul).forEach(c=>c.checked=false);o&&(o.textContent="0 / "+$$("input",ul).length);});
  });
}

/* ---------- practice: sort each card into the right bin ---------- */
function sorter(pb,st,key){
  const items=st.items;let i=0,lock=false;const done=!!S.prac[key];
  pb.innerHTML=(st.intro?"<p class='lead' style='text-align:center;align-self:center'>"+st.intro+"</p>":"")+
   "<div class='sorter'><span class='cnt' id='sCnt'></span><div class='cardx' id='sCard'><span class='fr' id='sFr'></span><div class='nm' id='sNm'></div><div class='ds' id='sDs'></div></div>"+
   "<div class='btns' id='sBtns'>"+st.btns.map(b=>"<button class='pick "+(b.cls||"")+"' type='button' data-a='"+esc(b.v)+"'>"+b.l+"</button>").join("")+"</div>"+
   "<div class='fb' id='sFb' aria-live='polite'></div></div>";
  const card=$("#sCard",pb),fb=$("#sFb",pb),btns=$$(".pick",pb);
  const show=()=>{const it=items[i];$("#sFr",pb).textContent=it.f||"";$("#sFr",pb).hidden=!it.f;$("#sNm",pb).textContent=it.n;$("#sDs",pb).textContent=it.d||"";$("#sCnt",pb).textContent=(i+1)+" / "+items.length;
    fb.className="fb";fb.textContent=st.hint||"選一個答案。";btns.forEach(b=>b.disabled=false);lock=false;
    if(!reduce) card.animate([{opacity:0,transform:"translateY(18px) rotate(-1.5deg)"},{opacity:1,transform:"none"}],{duration:320,easing:"cubic-bezier(.2,.9,.3,1.2)"});};
  const finish=()=>{
    $("#sFr",pb).hidden=true;$("#sNm",pb).textContent="恭喜過關";$("#sDs",pb).textContent="全部 "+items.length+" 題都答對了";$("#sCnt",pb).textContent="完成";
    card.insertAdjacentHTML("beforeend","<span class='clear g'>CLEAR!</span>");btns.forEach(b=>b.disabled=true);
    fb.className="fb good";fb.innerHTML="<b>練習完成。</b>　按右下角繼續下一關。";
    if(!S.prac[key]){S.prac[key]=1;S.seen[key]=1;save();toast("練習 CLEAR！+110 XP");}
    stageList();updateNext();$(".hudxp").outerHTML=hudXP();burstAt(card,"var(--yellow)");
  };
  btns.forEach(b=>b.onclick=()=>{
    if(lock) return;lock=true;btns.forEach(x=>x.disabled=true);
    const it=items[i],ok=it.a===b.dataset.a;
    fb.className="fb "+(ok?"good":"bad");fb.innerHTML=(ok?"<b>正確！</b>　":"<b>再想想，選另一個。</b>　")+it.why;
    if(!ok){if(!reduce){card.classList.remove("shake");void card.offsetWidth;card.classList.add("shake");}setTimeout(()=>{btns.forEach(x=>x.disabled=false);lock=false;},900);return;}
    burstAt(b,"var(--teal)");
    setTimeout(()=>{i++;i<items.length?show():finish();},1500);
  });
  if(done){i=items.length;finish();} else show();
}

/* ---------- IRMAS rebuild ---------- */
function irmas(pb){
  const SIM=C.irmas;const IR={sec:[],vul:[]};let pane="sec";
  const host=$("#irHost",pb);
  host.innerHTML="<div class='irwin' aria-label='IRMAS 視窗（重繪）'><div class='tb'><span class='lamp' id='irTL'></span>IRMAS 3.9.3<i>—☐✕</i></div><div class='bd'>"+
   "<div class='tree' role='tablist' aria-label='IRMAS 功能'><button role='tab' type='button' data-pn='info'>系統資訊</button><button role='tab' type='button' data-pn='sec'><span class='lamp' id='irLs'></span>安全查核</button><button role='tab' type='button' data-pn='vul'><span class='lamp' id='irLv'></span>弱點管理</button></div>"+
   "<div class='main' id='irMain'></div></div><div class='sb' id='irSb'>連線狀態：CHTNet</div></div>";
  const sim=$("#irSim",pb);
  sim.innerHTML="<div class='opts'>"+Object.keys(SIM).map(k=>"<button type='button' data-s='"+k+"'>"+SIM[k].l+"</button>").join("")+"<button type='button' class='reset' data-s='reset'>全部回復正常</button></div><div class='hint' id='irHint' aria-live='polite'><span class='lamp'></span><span>目前兩項皆為藍燈。點上方情境，看看 IRMAS 會怎麼變。</span></div><div id='irFix'></div>";
  const lamps=()=>{const s=!IR.sec.length,v=!IR.vul.length;$("#irLs",pb).className="lamp"+(s?"":" red");$("#irLv",pb).className="lamp"+(v?"":" red");$("#irTL",pb).className="lamp"+(s&&v?"":" red");};
  const draw=()=>{
    $$(".tree button",pb).forEach(b=>b.setAttribute("aria-selected",b.dataset.pn===pane));
    const m=$("#irMain",pb);
    if(pane==="info") m.innerHTML="<table><tr><th>項目</th><th>內容</th></tr><tr><td>主機名稱</td><td>DESKTOP-A1B2C3D</td></tr><tr><td>作業系統</td><td>Windows 11 Enterprise</td></tr><tr><td>使用人</td><td>（你的員工帳號）</td></tr><tr><td>資產ID</td><td>PC20XXXXXXXX</td></tr><tr><td>場域</td><td>一般辦公室終端</td></tr></table><p style='font-size:.9em'>記下「使用人」與「資產ID」，登入 IRMAS 網站檢查是否有違反項目。（範例資料）</p>";
    else if(pane==="sec") m.innerHTML="<div class='st'><span class='lamp"+(IR.sec.length?" red":"")+"'></span>"+(IR.sec.length?"有 "+IR.sec.length+" 個安全查核項目需要修正":"您目前沒有安全查核項目需要修正")+"</div>"+
      (IR.sec.length?"<table><tr><th style='width:2em'></th><th>安全查核違反項目</th></tr>"+IR.sec.map((k,i)=>"<tr><td><input type='checkbox' data-i='"+i+"' aria-label='選取 "+esc(SIM[k].t)+"'"+(SIM[k].auto?"":" disabled")+"></td><td>"+SIM[k].t+"</td></tr>").join("")+"</table>":"")+
      "<div class='act'><button type='button' id='irFixSel'"+(IR.sec.some(k=>SIM[k].auto)?"":" disabled")+">修正已選擇之安全查核項目</button><button type='button' id='irSync'>資料同步更新</button></div>";
    else m.innerHTML="<div class='st'><span class='lamp"+(IR.vul.length?" red":"")+"'></span>"+(IR.vul.length?"有修補程式需要更新":"您目前沒有修補程式需要更新")+"</div>"+
      (IR.vul.length?"<table><tr><th>修補程式編號</th><th>說明</th></tr>"+SIM.patch.rows.map(r=>"<tr><td>"+r[0]+"</td><td>"+r[1]+"</td></tr>").join("")+"</table>":"<p style='font-size:.9em;color:#475066'>Windows Update 離線掃描檔版本：2026-09-30</p>")+
      "<div class='act'><button type='button' id='irSync'>資料同步更新</button></div>";
    $$(".tree button",pb).forEach(b=>b.onclick=()=>{pane=b.dataset.pn;draw();});
    const fs=$("#irFixSel",pb);fs&&(fs.onclick=()=>{const sel=$$("#irMain input:checked",pb).map(c=>IR.sec[+c.dataset.i]);if(!sel.length){$("#irSb",pb).textContent="請先勾選要修正的項目";return;}
      IR.sec=IR.sec.filter(k=>!sel.includes(k));$("#irSb",pb).textContent="已修正，請按「資料同步更新」";draw();});
    const sy=$("#irSync",pb);sy&&(sy.onclick=()=>{$("#irSb",pb).textContent="資料同步更新完成";lamps();if(!IR.sec.length&&!IR.vul.length){hint("全部藍燈 ✓ 這就是每台電腦該有的樣子。",true);burstAt(sy,"var(--blue)");}});
  };
  const hint=(t,ok)=>{$("#irHint",pb).innerHTML="<span class='lamp"+(ok?"":" red")+"'></span><span>"+t+"</span>";};
  $$(".opts button",sim).forEach(b=>b.onclick=()=>{
    const k=b.dataset.s;$("#irFix",pb).innerHTML="";
    if(k==="reset"){IR.sec=[];IR.vul=[];pane="sec";draw();lamps();hint("全部回復正常，兩項皆為藍燈。",true);return;}
    const s=SIM[k];
    if(s.pane==="vul"){if(!IR.vul.includes(k)) IR.vul.push(k);}else if(!IR.sec.includes(k)) IR.sec.push(k);
    pane=s.pane;draw();lamps();hint(s.hint,false);
    if(s.fixLabel){$("#irFix",pb).innerHTML="<button type='button' class='fixbtn'>"+s.fixLabel+"</button>";
      $("#irFix button",pb).onclick=()=>{if(s.pane==="vul") IR.vul=IR.vul.filter(x=>x!==k);else IR.sec=IR.sec.filter(x=>x!==k);$("#irFix",pb).innerHTML="";draw();$("#irSb",pb).textContent="已修正，請按「資料同步更新」";hint("已修正。最後一步：在 IRMAS 按「資料同步更新」，燈號才會轉回藍燈。",true);};}
    requestAnimationFrame(()=>fit($("#pb")));
  });
  draw();lamps();
}

/* ---------- password strength ---------- */
function pwcheck(box){
  box.innerHTML="<div class='in'><input id='pwIn' type='password' autocomplete='off' spellcheck='false' aria-label='試打一組通行碼（請勿輸入真實密碼）' placeholder='試打一組，請勿輸入真實密碼'><button type='button' class='mini' id='pwEye'>顯示</button></div>"+
   "<div class='meter' aria-hidden='true'><i id='pwM'></i></div>"+
   "<ul class='rules' id='pwR'><li data-r='len'>長度至少 8 個字元</li><li data-r='up'>含大寫英文</li><li data-r='lo'>含小寫英文</li><li data-r='num'>含數字</li><li data-r='sym'>含符號</li><li data-r='pat'>不是生日、順序、重複或鍵盤排列</li></ul>"+
   "<p class='time' id='pwT' aria-live='polite'>輸入後顯示暴力破解估計時間。資料只在你的瀏覽器計算。</p>";
  const inp=$("#pwIn",box);
  $("#pwEye",box).onclick=e=>{const v=inp.type==="password";inp.type=v?"text":"password";e.target.textContent=v?"隱藏":"顯示";};
  const bad=p=>{const l=p.toLowerCase();if(/^(.)\1+$/.test(p)) return true;if(/(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/.test(p)) return true;
    if(/password|admin|qwerty|iloveyou/.test(l)) return true;
    const seqs=["0123456789","9876543210","abcdefghijklmnopqrstuvwxyz","qwertyuiop","asdfghjkl","zxcvbnm","1qaz2wsx3edc","!qaz@wsx"];
    for(const s of seqs){for(let k=0;k+4<=s.length;k++){if(l.includes(s.slice(k,k+4))) return true;}}return false;};
  const human=s=>{if(s<1) return "不到 1 秒";const u=[["年",31536000],["天",86400],["小時",3600],["分鐘",60],["秒",1]];if(s>31536000*1e6) return "超過一百萬年";for(const [n,v] of u){if(s>=v) return Math.round(s/v).toLocaleString()+" "+n;}};
  inp.oninput=()=>{const p=inp.value;const c={len:p.length>=8,up:/[A-Z]/.test(p),lo:/[a-z]/.test(p),num:/\d/.test(p),sym:/[^A-Za-z0-9]/.test(p),pat:p&&!bad(p)};
    $$("#pwR li",box).forEach(li=>li.classList.toggle("on",!!c[li.dataset.r]));
    const n=Object.values(c).filter(Boolean).length;const m=$("#pwM",box);m.style.width=(p?n/6*100:0)+"%";m.style.background=n>=6?"var(--blue)":n>=4?"var(--yellow)":"var(--red)";
    let cs=(c.up?26:0)+(c.lo?26:0)+(c.num?10:0)+(c.sym?33:0)||10;let sec=Math.pow(cs,p.length)/1e10/2;if(!c.pat) sec=Math.min(sec,.01);
    $("#pwT",box).innerHTML=p?"暴力破解估計：<span>"+human(sec)+"</span>":"輸入後顯示暴力破解估計時間。資料只在你的瀏覽器計算。";};
}

/* ---------- directory search ---------- */
function directory(pb){
  const rows=C.contacts,inp=$("#dirQ",pb),out=$("#dirOut",pb);
  const draw=()=>{const q=inp.value.trim().toLowerCase();const r=rows.filter(x=>!q||x.join(" ").toLowerCase().includes(q));
    out.innerHTML=r.length?r.map(x=>"<div class='p'><b>"+x[0]+"</b>"+x[2]+"<br><span>"+x[3]+" ・ "+x[1]+"</span></div>").join(""):"<p class='empty'>找不到「"+esc(inp.value)+"」。試試單位名稱、代碼或姓名。</p>";};
  inp.oninput=draw;draw();
}

/* ================= BOSS ================= */
function toBoss(){go(renderBoss,"var(--red)");}
function renderBoss(){
  const B=C.boss,Q=B.Q,need=Math.ceil(Q.length*.8);
  let qi=0,ok=0,answered=false;
  const html="<section class='scr' aria-label='魔王戰' style='--c:var(--red)'>"+
   "<div class='top'><button class='back' type='button' id='bk'><span class='k'>Esc</span>關卡</button><div class='ttl'>"+splat(99,"var(--red)")+"<h2 class='g stroke'>魔王戰</h2><p>答對 "+need+" 題（80 分）就能打倒 "+B.name+"</p></div>"+hudXP()+"</div>"+
   "<div class='arena'>"+
    "<div class='bossbox'>"+splat(77,"var(--red)")+"<svg class='monster' id='mon' viewBox='0 0 200 200' role='img' aria-label='"+esc(B.name)+"'>"+B.art+"</svg><h3 class='g stroke nm'>"+B.name+"</h3>"+
     "<div class='hp'><div class='lbl'><span>HP</span><span id='hpT'>100%</span></div><div class='bar'><i id='hpB' style='width:100%'></i></div></div></div>"+
    "<article class='panel qcard'><div class='pb' id='qb' aria-live='polite'></div></article>"+
   "</div>"+keys([["A B C D","作答"],["Enter","下一題"],["Esc","離開"]])+
  "</section>";
  mount(html,"boss",e=>{
    if(e.key==="Escape"){e.preventDefault();toHub(C.chapters.length);return;}
    const k=e.key.toUpperCase();const idx="ABCD".indexOf(k);
    if(idx>=0&&!answered){const b=$$(".qopt")[idx];b&&b.click();}
  });
  $("#bk").onclick=()=>toHub(C.chapters.length);
  const qb=$("#qb"),mon=$("#mon");
  const hp=()=>{const v=Math.max(0,Math.round((1-ok/need)*100));$("#hpB").style.width=v+"%";$("#hpT").textContent=v+"%";};
  const q=()=>{
    if(qi>=Q.length) return result();
    const it=Q[qi];answered=false;
    qb.innerHTML="<div class='qtop'><span>QUESTION "+String(qi+1).padStart(2,"0")+" / "+Q.length+"</span><span class='pill'>答對 "+ok+" 題</span></div><p class='qtext'>"+it.q+"</p><div class='qopts'>"+
      it.o.map((o,i)=>"<button class='qopt' type='button' data-i='"+i+"'><span class='k'>"+"ABCD"[i]+"</span><span>"+o+"</span></button>").join("")+"</div><div id='qx'></div>";
    $$(".qopt",qb).forEach(b=>b.onclick=()=>pick(+b.dataset.i,b));
    $(".qopt",qb).focus({preventScroll:true});
    requestAnimationFrame(()=>fit(qb));
  };
  const pick=(i,btn)=>{
    if(answered) return;answered=true;const it=Q[qi],right=i===it.a;
    $$(".qopt",qb).forEach((b,j)=>{b.disabled=true;if(j===it.a) b.classList.add("right");else if(j===i) b.classList.add("wrong");});
    if(right){ok++;hp();burstAt(mon,"var(--pink)");if(!reduce){mon.classList.remove("hit");void mon.getBoundingClientRect();mon.classList.add("hit");}}
    $("#qx",qb).innerHTML="<div class='qexp'><b class='"+(right?"good":"bad")+"'>"+(right?"命中！":"正確答案是 "+"ABCD"[it.a])+"</b>　"+it.e+"</div><div style='display:flex;justify-content:flex-end;margin-top:.6em'><button class='btn' type='button' id='qn'>"+(qi+1<Q.length?"下一題 ▶":"看結果")+"</button></div>";
    const n=$("#qn",qb);n.onclick=()=>{qi++;q();};n.focus({preventScroll:true});
    requestAnimationFrame(()=>fit(qb));
  };
  const result=()=>{
    const pct=Math.round(ok/Q.length*100),pass=pct>=80;
    const first=pass&&!S.boss.pass;
    if(pass) S.boss.pass=true;S.boss.best=Math.max(S.boss.best||0,pct);save();
    if(first) toast("魔王擊破！+300 XP");
    qb.innerHTML="<div class='result'><span class='g' style='font-size:1.3em'>"+(pass?"YOU WIN!":"再接再厲")+"</span><div class='score'>"+pct+"<span style='font-size:.35em'> 分</span></div><p class='msg'>"+(pass?B.win:"未達 80 分，"+B.name+" 還站著。複習後再挑戰一次。")+"</p><p style='color:var(--muted)'>答對 "+ok+" / "+Q.length+" 題・最高分 "+S.boss.best+"</p>"+
      "<div style='display:flex;gap:.6em;flex-wrap:wrap;justify-content:center'><button class='btn' type='button' id='qr'>再挑戰</button><button class='btn ghost' type='button' id='qh'>回到關卡選單</button></div></div>";
    $("#qr",qb).onclick=()=>{qi=0;ok=0;hp();q();};$("#qh",qb).onclick=()=>toHub(C.chapters.length);
    $(".hudxp").outerHTML=hudXP();
    if(pass){mon.animate&&!reduce&&mon.animate([{transform:"none",opacity:1},{transform:"translateY(30px) rotate(-12deg) scale(.8)",opacity:.25}],{duration:900,fill:"forwards",easing:"ease-in"});}
    $("#qr",qb).focus({preventScroll:true});
  };
  hp();q();
}

renderTitle();
})();
