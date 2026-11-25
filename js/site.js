/* Interações do site Construbem. Os dados ficam em js/dados.js. */
{
const wa=t=>'https://wa.me/'+WA+'?text='+encodeURIComponent(t);
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:1});
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- lista da obra ---------- */
let list=[];
try{list=JSON.parse(localStorage.getItem('cb-lista')||'[]')}catch(e){list=[]}
const save=()=>{try{localStorage.setItem('cb-lista',JSON.stringify(list))}catch(e){}};
const qtxt=i=>fmt(i.q)+(i.u?' '+i.u:'×');
function toast(t){const e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>e.classList.remove('on'),1800)}
function add(n,q=1,u='',silent){const f=list.find(i=>i.n===n&&i.u===u);if(f)f.q+=q;else list.push({n,q,u});save();renderList();if(!silent)toast('Na lista: '+n)}
function msg(){const nm=$('lNome').value.trim(),cd=$('lCid').value.trim();let t='Olá, Construbem! Gostaria de um orçamento:\n'+list.map(i=>'• '+qtxt(i)+' – '+i.n).join('\n');t+='\n\n'+$('lEnt').value;if(nm)t+='\nNome: '+nm;if(cd)t+='\nCidade: '+cd;return t}
function renderList(){
  $('fabN').textContent=list.length;
  $('items').innerHTML=list.length?list.map((i,k)=>`<div class="it"><span>${esc(i.n)}</span><div class="q"><button data-k="${k}" data-d="-1" aria-label="Menos">−</button><b>${esc(qtxt(i))}</b><button data-k="${k}" data-d="1" aria-label="Mais">+</button></div></div>`).join(''):'<p class="empty">Sua lista está vazia. Toque em + nas etapas da obra, na parede de produtos ou use a calculadora.</p>';
  $('lWa').href=list.length?wa(msg()):wa('Olá, Construbem! Gostaria de um orçamento.');
}
$('items').addEventListener('click',e=>{const b=e.target.closest('button[data-k]');if(!b)return;const i=list[+b.dataset.k];const step=i.u&&i.q>=20?Math.max(1,Math.round(i.q/20)):1;i.q+=step*(+b.dataset.d);if(i.q<=0)list.splice(+b.dataset.k,1);save();renderList()});
['lNome','lCid','lEnt'].forEach(id=>$(id).addEventListener('input',renderList));
const open=v=>{$('sheet').classList.toggle('on',v);if(v)$('shX').focus()};
$('fab').onclick=()=>open(true);$('shX').onclick=()=>open(false);$('shBg').onclick=()=>open(false);
addEventListener('keydown',e=>{if(e.key==='Escape')open(false)});
$('lClr').onclick=()=>{list=[];save();renderList()};
$('lCp').onclick=async()=>{try{await navigator.clipboard.writeText(msg());toast('Lista copiada')}catch(e){toast('Não deu para copiar aqui')}};
renderList();

/* ---------- casa isométrica ---------- */
let paint=paints[1],stage=6,prev=-1;
const u=36,ox=270,oy=160,c=.866;
const P=(x,y,z)=>(ox+(x-y)*c*u).toFixed(1)+','+(oy+(x+y)*.5*u-z*u).toFixed(1);
const pg=(pts,fill,s,extra='')=>`<polygon data-s="${s}" points="${pts.map(p=>P(...p)).join(' ')}" fill="${fill}" ${extra}/>`;
const ln=(a,b)=>'M'+P(...a)+'L'+P(...b);
const shade=(h,f)=>'#'+[1,3,5].map(i=>Math.max(0,Math.min(255,Math.round(parseInt(h.slice(i,i+2),16)*f))).toString(16).padStart(2,'0')).join('');
function house(){
  const s=stage,z0=.35,Z=3.35,g=[];
  g.push(pg([[-1,-1,0],[9,-1,0],[9,7,0],[-1,7,0]],'var(--earth)',0));
  g.push(pg([[-1,7,0],[9,7,0],[9,7,-.35],[-1,7,-.35]],'var(--earth2)',0),pg([[9,-1,0],[9,7,0],[9,7,-.35],[9,-1,-.35]],'var(--earth2)',0));
  if(s===0){g.push(`<path data-s="0" d="${ln([0,0,.3],[8,0,.3])+ln([8,0,.3],[8,6,.3])+ln([8,6,.3],[0,6,.3])+ln([0,6,.3],[0,0,.3])}" stroke="#c2452a" stroke-width="2" stroke-dasharray="6 5" fill="none"/>`);[[0,0],[8,0],[8,6],[0,6]].forEach(([x,y])=>g.push(`<path data-s="0" d="${ln([x,y,0],[x,y,.7])}" stroke="#8a5a36" stroke-width="5"/>`))}
  if(s>=2)g.push(pg([[8,0,0],[9.4,.8,0],[9.4,6.6,0],[8,6,0]],'rgba(0,0,0,.13)',2));
  if(s>=1){g.push(pg([[0,0,z0],[8,0,z0],[8,6,z0],[0,6,z0]],'#d3cec4',1),pg([[0,6,0],[8,6,0],[8,6,z0],[0,6,z0]],'#b3ada2',1),pg([[8,0,0],[8,6,0],[8,6,z0],[8,0,z0]],'#97918a',1))}
  const painted=s>=6,wl=painted?paint[1]:'#bfb9ae',wr=painted?shade(paint[1],.8):'#a19b91';
  if(s>=2){
    g.push(pg([[0,6,z0],[8,6,z0],[8,6,Z],[0,6,Z]],wl,2),pg([[8,0,z0],[8,6,z0],[8,6,Z],[8,0,Z]],wr,2));
    if(s<4)g.push(pg([[0,0,Z],[8,0,Z],[8,6,Z],[0,6,Z]],'#cfc9be',2),pg([[.3,.3,Z],[7.7,.3,Z],[7.7,5.7,Z],[.3,5.7,Z]],'#a8a296',2));
    if(!painted){let d='';for(let r=0;r<6;r++){const a=z0+r*.5;if(r)d+=ln([0,6,a],[8,6,a])+ln([8,0,a],[8,6,a]);for(let x=(r%2?.5:1);x<8;x+=1)d+=ln([x,6,a],[x,6,a+.5]);for(let y=(r%2?.5:1);y<6;y+=1)d+=ln([8,y,a],[8,y,a+.5])}g.push(`<path data-s="2" d="${d}" stroke="#8b857a" stroke-width="1.2" fill="none"/>`)}
  }
  if(s===3||s===4){g.push(`<path data-s="3" d="${ln([8,4.6,z0],[8,4.6,1.1])+ln([8,4.6,1.1],[8,1.4,1.1])+ln([8,1.4,1.1],[8,1.4,2])}" stroke="#2f7fc1" stroke-width="5" fill="none" stroke-linecap="round"/>`,`<path data-s="3" d="${ln([2,6,Z],[2,6,2.6])+ln([2,6,2.6],[6.2,6,2.6])+ln([6.2,6,2.6],[6.2,6,1.6])}" stroke="#f2b632" stroke-width="4" fill="none" stroke-linecap="round"/>`,pg([[6,6,1.45],[6.4,6,1.45],[6.4,6,1.75],[6,6,1.75]],'#f2b632',3))}
  if(s>=5){
    g.push(pg([[5.1,6,z0],[6.4,6,z0],[6.4,6,2.55],[5.1,6,2.55]],'#8a5a36',5,'stroke="#f4f1ea" stroke-width="3"'),pg([[6.05,6,1.4],[6.2,6,1.4],[6.2,6,1.5],[6.05,6,1.5]],'#f2b632',5));
    const win=(a,b,z1,z2,face)=>{const q=face?[[8,a,z1],[8,b,z1],[8,b,z2],[8,a,z2]]:[[a,6,z1],[b,6,z1],[b,6,z2],[a,6,z2]];const m=(a+b)/2;g.push(pg(q,'var(--glass)',5,'stroke="#f4f1ea" stroke-width="3"'),`<path data-s="5" d="${face?ln([8,m,z1],[8,m,z2]):ln([m,6,z1],[m,6,z2])}" stroke="#f4f1ea" stroke-width="2.5"/>`)};
    win(1,3,1.3,2.55,0);win(1.4,3.6,1.3,2.55,1);
  }
  if(s>=4){
    const R=5.2,e=-.4,f=8.4,t1=[e,-.4,Z],t2=[f,-.4,Z];
    g.push(pg([t1,t2,[f,3,R],[e,3,R]],'#9e3620',4),pg([[8,0,Z],[8,6,Z],[8,3,R]],wr,4),pg([[e,6.4,Z],[f,6.4,Z],[f,3,R],[e,3,R]],'#c2452a',4));
    let d='';for(let k=1;k<9;k++){const t=k/9;d+=ln([e,6.4-3.4*t,Z+(R-Z)*t],[f,6.4-3.4*t,Z+(R-Z)*t])}for(let x=e+.55;x<f;x+=.55)d+=ln([x,6.4,Z],[x,3,R]);
    g.push(`<path data-s="4" d="${d}" stroke="#a63a22" stroke-width="1.2" fill="none"/>`,`<path data-s="4" d="${ln([f,6.4,Z],[f,3,R])+ln([f,3,R],[f,-.4,Z])}" stroke="#7a2a18" stroke-width="3" fill="none"/>`);
  }
  if(s>=6){g.push(pg([[5.3,6,0.02],[6.2,6,.02],[6.2,7,.02],[5.3,7,.02]],'#e8e1d3',6));[[2,6.6,.9],[3.6,6.7,.7],[8.6,2,.8],[8.7,4.4,.6]].forEach(([x,y,r])=>{const[p,q]=P(x,y,.35).split(',');g.push(`<circle data-s="6" cx="${p}" cy="${q}" r="${r*u*.55}" fill="#5f8a3a"/><circle data-s="6" cx="${+p-4}" cy="${+q-5}" r="${r*u*.3}" fill="#7aa64c"/>`)})}
  const svg=$('house');svg.innerHTML=g.join('');
  if(!reduce&&prev>=0&&stage>prev)svg.querySelectorAll('[data-s]').forEach(el=>{const k=+el.dataset.s;if(k>prev&&k<=stage){el.classList.add('drop');el.style.animationDelay=((k-prev-1)*.12)+'s'}});
  prev=stage;
}
function setStage(k){stage=k;const S=stages[k];$('stRange').value=k;$('stName').textContent=S.n;$('stDesc').textContent=S.d;$('stTag').textContent='Etapa '+(k+1)+' de 7';
  $('stItems').innerHTML=S.it.map(n=>`<button class="chip" data-n="${esc(n)}"><b>+</b>${esc(n)}</button>`).join('');
  $('paint').hidden=!S.paint;$('paintName').textContent=paint[0];
  $('steps').querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-current',i===k));house()}
$('steps').innerHTML=stages.map((s,i)=>`<button data-i="${i}">${esc(s.n)}</button>`).join('');
$('sw').innerHTML=paints.map((p,i)=>`<button class="sw" data-i="${i}" aria-label="${esc(p[0])}" aria-pressed="${i===1}" style="background:${p[1]}"></button>`).join('');
let auto=null;const stopAuto=()=>{clearInterval(auto);auto=null};
$('steps').addEventListener('click',e=>{const b=e.target.closest('button');if(b){stopAuto();setStage(+b.dataset.i)}});
$('stRange').addEventListener('input',e=>{stopAuto();setStage(+e.target.value)});
$('stItems').addEventListener('click',e=>{const b=e.target.closest('.chip');if(b)add(b.dataset.n)});
$('addStage').onclick=()=>{stages[stage].it.forEach(n=>add(n,1,'',1));toast(stages[stage].n+': '+stages[stage].it.length+' itens na lista')};
$('sw').addEventListener('click',e=>{const b=e.target.closest('.sw');if(!b)return;paint=paints[+b.dataset.i];$('sw').querySelectorAll('.sw').forEach(x=>x.setAttribute('aria-pressed',x===b));$('paintName').textContent=paint[0];prev=stage;house()});
if(reduce){setStage(6)}else{setStage(0);let k=0;auto=setInterval(()=>{k++;setStage(k);if(k>=6)stopAuto()},900)}

/* ---------- marca ---------- */
$('word').innerHTML=[...'CONSTRUBEM'].map(l=>`<span aria-hidden="true">${l}</span>`).join('');
$('word').addEventListener('pointermove',e=>{const sp=e.target.closest('span');if(!sp)return;sp.classList.add('up');setTimeout(()=>sp.classList.remove('up'),500)});

/* ---------- parede de produtos ---------- */
let cat=8,query='';
const norm=t=>t.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const matches=i=>{if(!query)return true;const C=cats[i];return norm([C.n,C.s,C.t,(C.b||''),...C.l].join(' ')).includes(query)};
function renderWall(){
  const B=i=>`<button class="brk ${query?(matches(i)?'hit':'dim'):''}" data-i="${i}" aria-pressed="${i===cat}">${esc(cats[i].n)}<small>${esc(cats[i].s)}</small></button>`,H='<span class="half" aria-hidden="true"></span>';
  $('wall').innerHTML=B(0)+B(1)+B(2)+H+B(3)+B(4)+H+B(5)+B(6)+B(7)+H+B(8)+B(9)+H;
  renderDetail();
}
function renderDetail(){
  const C=cats[cat],d=$('detail');
  d.innerHTML=`<div class="dhead"><div class="dicon">${catIcons[cat]||''}</div><div><h3>${esc(C.n)}</h3><p class="note" style="font-size:15px">${esc(C.t)}</p></div></div><div class="chips">${C.l.map(x=>`<button class="chip" data-n="${esc(x)}"><b>+</b>${esc(x)}</button>`).join('')}</div>${C.b?`<div><div class="note" style="margin-bottom:6px">Marcas na loja</div><div class="badges">${C.b.split(',').map(x=>`<span>${esc(x.trim())}</span>`).join('')}</div></div>`:''}<div class="ctas"><a class="btn solid" target="_blank" rel="noopener" href="${wa('Olá, Construbem! Quero preço de '+C.n.toLowerCase()+'.')}">Pedir preço</a>${C.go?`<a class="btn" href="${C.go}">Sob medida</a>`:''}</div>`;
  d.classList.remove('fade');void d.offsetWidth;if(!reduce)d.classList.add('fade');
}
$('detail').addEventListener('click',e=>{const b=e.target.closest('.chip');if(b)add(b.dataset.n)});
$('wall').addEventListener('click',e=>{const b=e.target.closest('.brk');if(b){cat=+b.dataset.i;renderWall();if(innerWidth<860)$('detail').scrollIntoView({block:'nearest',behavior:reduce?'auto':'smooth'})}});
$('q').addEventListener('input',e=>{query=norm(e.target.value.trim());const hits=cats.map((c,i)=>i).filter(matches);
  if(query&&hits.length&&!hits.includes(cat))cat=hits[0];
  $('qh').textContent=!query?'10 seções':hits.length?hits.length+(hits.length>1?' seções':' seção'):'sem resultado';
  renderWall();
  if(query&&!hits.length)$('detail').innerHTML=`<h3>Não achou?</h3><p class="lead">A loja tem muito mais do que cabe aqui. Pergunte direto no balcão do WhatsApp.</p><div class="ctas"><a class="btn solid" target="_blank" rel="noopener" href="${wa('Olá, Construbem! Vocês têm '+e.target.value.trim()+'?')}">Perguntar se tem</a></div>`;
});
renderWall();

/* ---------- vitrine ---------- */
$('gal').innerHTML=vitrine.map(v=>`<figure><img src="img/vitrine/${esc(v.f)}" alt="${esc(v.alt)}" loading="lazy" width="${v.w}" height="${v.h}"><figcaption><span>${esc(v.tag)}</span><b>${esc(v.t)}</b><small>${esc(v.d)}</small></figcaption></figure>`).join('');
$('gal').insertAdjacentHTML('beforeend',`<figure class="ig"><div><div class="n">2,5 mil</div><p>pessoas acompanham as novidades, ofertas e obras no Instagram.</p></div><a class="btn" href="https://www.instagram.com/construbemsa/" target="_blank" rel="noopener">@construbemsa</a></figure>`);
$('gal').addEventListener('click',e=>{const f=e.target.closest('figure:not(.ig)');if(!f)return;const v=vitrine[[...$('gal').querySelectorAll('figure:not(.ig)')].indexOf(f)];window.open(wa('Olá, Construbem! Vi no site: '+v.t+'. Pode me passar preço e disponibilidade?'),'_blank','noopener')});

/* ---------- fases: escolha sua situação ---------- */
const go=h=>{const el=document.querySelector(h);if(el)el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})};
const acts={
 calc:()=>{ct='parede';renderCalc(1);go('#calculadora')},
 tinta:()=>{ct='pintura';renderCalc(1);go('#calculadora')},
 basicos:()=>{['Cimento 50 kg','Areia média','Brita 1','Bloco de concreto 14×19×39','Vergalhão 3/8"'].forEach(n=>add(n,1,'',1));toast('Básicos da obra na lista');open(true)},
 kit:()=>{['Cuba de sobrepor','Louça sanitária','Torneira e metais','Tubos e conexões PVC','Registros'].forEach(n=>add(n,1,'',1));toast('Kit reforma de banheiro na lista');open(true)},
 loucas:()=>{cat=9;query='';$('q').value='';renderWall();go('#produtos')},
 portas:()=>{cat=8;query='';$('q').value='';renderWall();go('#produtos')},
 esq:()=>go('#sob-medida'),
 frete:()=>go('#ofertas'),
 obra:()=>{setTipo(0);go('#construtora')},
 flow:()=>go('#flow'),
 waObra:()=>window.open(wa('Olá, Construbem! Quero conversar com a construtora sobre uma obra.'),'_blank','noopener'),
 waInst:()=>window.open(wa('Olá, Construbem! Quero orçamento de instalação de portas e janelas.'),'_blank','noopener')
};
let ph=0;const doneSteps=new Set();
$('picks').innerHTML=phases.map((p,i)=>`<button data-i="${i}">${p.ic}${esc(p.q)}</button>`).join('');
function renderPhase(){
  const p=phases[ph];
  $('picks').querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',i===ph));
  $('scene').innerHTML=p.scene;
  $('path').innerHTML=`<h3>${esc(p.t)}</h3><p>${esc(p.d)}</p><ol>${p.steps.map((s,i)=>`<li class="${doneSteps.has(ph+'-'+i)?'ok':''}"><button data-i="${i}"><b>${doneSteps.has(ph+'-'+i)?'✓':i+1}</b><span>${esc(s[0])}<small>${esc(s[1])}</small></span><em>${esc(s[2])}</em></button></li>`).join('')}</ol>`;
  const a=$('ans');a.classList.remove('fade');void a.offsetWidth;if(!reduce)a.classList.add('fade');
}
$('picks').addEventListener('click',e=>{const b=e.target.closest('button');if(b){ph=+b.dataset.i;renderPhase()}});
$('path').addEventListener('click',e=>{const b=e.target.closest('li button');if(!b)return;const s=phases[ph].steps[+b.dataset.i];doneSteps.add(ph+'-'+b.dataset.i);renderPhase();acts[s[3]]()});
renderPhase();

/* ---------- esquadria sob medida ---------- */
const W={t:'Janela de correr',m:'Alumínio',c:'Branco'};
const wOpts={wType:['Janela de correr','Basculante','Porta de giro'],wMat:['Alumínio','Madeira'],wCor:['Branco','Preto','Bronze','Madeira natural']};
const wCol={Branco:'#f4f2ee',Preto:'#2b2b2b',Bronze:'#6b4a2f','Madeira natural':'#a8703f'};
const wKey={wType:'t',wMat:'m',wCor:'c'};
Object.keys(wOpts).forEach(id=>{$(id).innerHTML=wOpts[id].map(o=>`<button data-v="${esc(o)}" aria-pressed="${W[wKey[id]]===o}">${esc(o)}</button>`).join('');$(id).addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;W[wKey[id]]=b.dataset.v;if(id==='wType'&&b.dataset.v==='Porta de giro'&&+$('wH').value<180){$('wH').value=210;$('wW').value=80}if(id==='wMat')W.c=b.dataset.v==='Madeira'?'Madeira natural':'Branco';syncW()})});
function syncW(){Object.keys(wOpts).forEach(id=>$(id).querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===W[wKey[id]])));drawW()}
function drawW(){
  const s=$('win'),Wd=s.clientWidth,Ht=s.clientHeight;if(!Wd)return;
  const w=+$('wW').value,h=+$('wH').value;$('wWo').textContent=w+' cm';$('wHo').textContent=h+' cm';
  const m=Wd<520?46:64,sc=Math.min((Wd-m*2)/w,(Ht-m*2)/h),fw=w*sc,fh=h*sc,x=(Wd-fw)/2+10,y=(Ht-fh)/2+8,t=Math.max(7,5*sc),col=wCol[W.c],dk=W.c==='Branco'?'#b9b4aa':'rgba(0,0,0,.35)';
  let g=`<rect x="${x+6}" y="${y+6}" width="${fw}" height="${fh}" fill="rgba(0,0,0,.12)"/><rect x="${x}" y="${y}" width="${fw}" height="${fh}" fill="${col}" stroke="${dk}" stroke-width="1.5"/>`;
  const gl=(a,b,cw,ch)=>`<rect x="${a}" y="${b}" width="${cw}" height="${ch}" fill="var(--glass)" stroke="${dk}"/><path d="M${a+cw*.15} ${b+ch*.75}L${a+cw*.45} ${b+ch*.25}" stroke="#fff" stroke-width="3" opacity=".6"/>`;
  if(W.t==='Janela de correr'){const hw=(fw-t*2)/2;g+=`<rect x="${x+t}" y="${y+t}" width="${hw+t/2}" height="${fh-t*2}" fill="${col}" stroke="${dk}"/>`+gl(x+t*1.8,y+t*1.8,hw-t*1.1,fh-t*3.6)+`<rect x="${x+t+hw-t/2}" y="${y+t}" width="${hw+t/2}" height="${fh-t*2}" fill="${col}" stroke="${dk}"/>`+gl(x+t+hw+t*.3,y+t*1.8,hw-t*1.1,fh-t*3.6)+`<path d="M${x+fw/2-30} ${y+fh-t-14}h60m-8-6 8 6-8 6M${x+fw/2-22} ${y+fh-t-20}l-8 6 8 6" stroke="${dk}" stroke-width="2" fill="none"/>`}
  else if(W.t==='Basculante'){const n=Math.max(2,Math.round(h/35)),ph=(fh-t*2)/n;for(let i=0;i<n;i++)g+=gl(x+t,y+t+i*ph+2,fw-t*2,ph-4)+`<rect x="${x+t}" y="${y+t+i*ph+ph-3}" width="${fw-t*2}" height="4" fill="${col}"/>`}
  else{if(W.m==='Madeira'){g+=`<rect x="${x+t}" y="${y+t}" width="${fw-t*2}" height="${fh-t}" fill="${col}" stroke="${dk}"/>`;for(let i=1;i<6;i++)g+=`<path d="M${x+t+(fw-t*2)*i/6} ${y+t}v${fh-t}" stroke="${dk}" opacity=".5"/>`}else{g+=`<rect x="${x+t}" y="${y+t}" width="${fw-t*2}" height="${fh-t}" fill="${col}" stroke="${dk}"/>`;const n=Math.floor((fh-t*2)/10);for(let i=1;i<n;i++)g+=`<path d="M${x+t+6} ${y+t+i*10}h${fw-t*2-12}" stroke="${dk}" opacity=".55"/>`}g+=`<circle cx="${x+fw-t-14}" cy="${y+fh*.52}" r="5" fill="#f2b632" stroke="${dk}"/><path d="M${x-20} ${y+fh}h${fw+40}" stroke="var(--ink)" stroke-width="3"/>`}
  const dy=y-24,dx=x-24;
  g+=`<path d="M${x} ${dy}h${fw}M${x} ${dy-6}v12M${x+fw} ${dy-6}v12M${dx} ${y}v${fh}M${dx-6} ${y}h12M${dx-6} ${y+fh}h12" stroke="var(--brick)" stroke-width="2"/><text x="${x+fw/2}" y="${dy-8}" text-anchor="middle">${w} cm</text><text transform="translate(${dx-8} ${y+fh/2}) rotate(-90)" text-anchor="middle">${h} cm</text>`;
  s.innerHTML=g;
  const d=`${W.t}, ${W.m.toLowerCase()} ${W.c.toLowerCase()}, ${w} × ${h} cm`;
  $('wSum').textContent=d+' · área '+fmt(w*h/10000)+' m²';
  $('wWa').href=wa('Olá, Construbem! Quero orçamento de esquadria sob medida: '+d+'.');
}
$('wW').addEventListener('input',drawW);$('wH').addEventListener('input',drawW);
$('wAdd').onclick=()=>{const w=$('wW').value,h=$('wH').value;add(`${W.t} sob medida ${w}×${h} cm (${W.m.toLowerCase()} ${W.c.toLowerCase()})`)};
const roW=new ResizeObserver(drawW);roW.observe($('win'));

/* ---------- calculadora ---------- */
const calcs={
 parede:{n:'Paredes',f:[['comp','Comprimento total das paredes',24,'m'],['alt','Altura',2.8,'m'],['ab','Portas e janelas (descontar)',6,'m²']],sel:blocks,
  r:v=>{const a=Math.max(0,v.comp*v.alt-v.ab),b=blocks[v.sel],q=Math.ceil(a*b[1]*1.1);return{big:fmt(q),lb:b[0]+' (unidades)',rows:[['Área de parede',fmt(a)+' m²'],['Consumo',fmt(b[1])+' un/m²'],['Perda considerada','10%']],items:[[b[0],q,'un']]}}},
 concreto:{n:'Contrapiso e laje',f:[['area','Área',60,'m²'],['esp','Espessura',6,'cm']],
  r:v=>{const vol=v.area*v.esp/100*1.05,ci=Math.ceil(vol*7),ar=Math.ceil(vol*.56*10)/10,br=Math.ceil(vol*.83*10)/10;return{big:ci,lb:'sacos de cimento de 50 kg',rows:[['Volume com 5% de perda',fmt(vol)+' m³'],['Areia média',fmt(ar)+' m³'],['Brita 1',fmt(br)+' m³']],items:[['Cimento 50 kg',ci,'sacos'],['Areia média',ar,'m³'],['Brita 1',br,'m³']]}}},
 pintura:{n:'Pintura',f:[['area','Área de parede',120,'m²'],['dem','Demãos',2,'']],
  r:v=>{const L=Math.ceil(v.area*v.dem/12);let la=Math.floor(L/18),ga=Math.ceil((L-la*18)/3.6);if(ga>=4){la++;ga=0}const it=[];if(la)it.push(['Tinta acrílica 18 L',la,la>1?'latas':'lata']);if(ga)it.push(['Tinta acrílica 3,6 L',ga,ga>1?'galões':'galão']);return{big:fmt(L)+' L',lb:'de tinta',rows:[['Latas de 18 L',String(la)],['Galões de 3,6 L',String(ga)],['Rendimento usado','12 m² por litro por demão']],items:it}}}
};
let ct='parede';const cv={};
Object.entries(calcs).forEach(([k,c])=>{cv[k]={sel:0};c.f.forEach(f=>cv[k][f[0]]=f[2])});
$('ctabs').innerHTML=Object.entries(calcs).map(([k,c])=>`<button role="tab" data-k="${k}" id="tab-${k}">${esc(c.n)}</button>`).join('');
$('ctabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b){ct=b.dataset.k;renderCalc(1)}});
function renderCalc(full){
  const C=calcs[ct],V=cv[ct];
  $('ctabs').querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.k===ct));
  if(full)$('cin').innerHTML=(C.sel?`<label class="num"><span>Tipo de bloco</span><div><select id="c-sel">${C.sel.map((b,i)=>`<option value="${i}" ${i===V.sel?'selected':''}>${esc(b[0])}</option>`).join('')}</select></div></label>`:'')+C.f.map(f=>`<label class="num"><span>${esc(f[1])}</span><div><input id="c-${f[0]}" type="number" inputmode="decimal" min="0" step="any" value="${V[f[0]]}"><em>${esc(f[3])}</em></div></label>`).join('')+'<p class="note">Estimativa de referência. Nossa equipe confere as quantidades no orçamento.</p>';
  const R=C.r(V);
  $('cout').innerHTML=`<div><div class="big">${esc(R.big)}</div><div style="font-weight:700;margin-top:6px">${esc(R.lb)}</div></div><ul>${R.rows.map(r=>`<li><span>${esc(r[0])}</span><b>${esc(r[1])}</b></li>`).join('')}</ul><div class="ctas"><button class="btn yel" id="cAdd">+ Colocar na lista</button></div><small>Valores para planejamento. Para estrutura, siga o projeto do seu engenheiro.</small>`;
  $('cAdd').onclick=()=>{R.items.forEach(i=>add(i[0],i[1],i[2],1));toast(R.items.length+' item(ns) na lista');};
}
$('cin').addEventListener('input',e=>{const id=e.target.id.slice(2);const v=parseFloat(String(e.target.value).replace(',','.'));cv[ct][id]=isFinite(v)&&v>=0?v:0;renderCalc(0)});
renderCalc(1);

/* ---------- construtora: monte sua obra ---------- */
const PL={t:0,area:90,ter:'Sim',pro:'Ainda não',ini:'Em até 3 meses'};
const segOpts={pTer:['Sim','Ainda não'],pPro:['Sim','Ainda não','Preciso de ajuda'],pIni:['O quanto antes','Em até 3 meses','Em até 6 meses','Só pesquisando']};
const segKey={pTer:'ter',pPro:'pro',pIni:'ini'};
$('pTipo').innerHTML=tipos.map((t,i)=>`<button type="button" data-i="${i}">${t.ic}<b>${esc(t.n)}</b><small>${esc(t.s)}</small></button>`).join('');
Object.keys(segOpts).forEach(id=>{$(id).innerHTML=segOpts[id].map(o=>`<button type="button" data-v="${esc(o)}">${esc(o)}</button>`).join('');$(id).addEventListener('click',e=>{const b=e.target.closest('button');if(b){PL[segKey[id]]=b.dataset.v;renderPlan()}})});
function setTipo(i){PL.t=i;const T=tipos[i],r=$('pArea');r.min=T.min;r.max=T.max;r.step=T.step;PL.area=Math.min(T.max,Math.max(T.min,T.def));r.value=PL.area;renderPlan()}
$('pTipo').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setTipo(+b.dataset.i)});
$('pArea').addEventListener('input',e=>{PL.area=+e.target.value;renderPlan()});
['pNome','pCid'].forEach(id=>$(id).addEventListener('input',renderPlan));
function planSvg(){
  const T=tipos[PL.t],W=320,F='font-family="Archivo,sans-serif"',k=Math.sqrt((PL.area-T.min+1)/(T.max-T.min+1)),box={x:34,y:46,w:252,h:150};
  if(T.k==='calcada'){const len=60+(box.w-60)*Math.min(1,PL.area/T.max),x=(W-len)/2,y=104;let g=`<rect x="${x}" y="${y}" width="${len}" height="38" fill="#d9d2c4" stroke="#2b2622" stroke-width="2"/>`;for(let i=x+14;i<x+len;i+=14)g+=`<path d="M${i} ${y}v38" stroke="#b5ab9a"/>`;g+=`<path d="M${x} ${y-12}h${len}M${x} ${y-16}v8M${x+len} ${y-16}v8" stroke="#c2452a" stroke-width="2"/><text x="${W/2}" y="${y+64}" text-anchor="middle" ${F} font-weight="800" font-size="13" fill="#2b2622">${fmt(PL.area)} m² de calçada</text>`;return g}
  if(T.k==='amplia'){const ew=130,eh=96,nw=24+(box.w-ew-24)*k,ex=(W-ew-nw)/2,ey=box.y+(box.h-eh)/2;return hatch()+`<rect x="${ex}" y="${ey}" width="${ew}" height="${eh}" fill="#e7e0d3" stroke="#8b857a" stroke-width="3"/><text x="${ex+ew/2}" y="${ey+eh/2+4}" text-anchor="middle" ${F} font-size="12" fill="#6b6157">casa atual</text><rect x="${ex+ew}" y="${ey}" width="${nw}" height="${eh}" fill="url(#hatch)" stroke="#c2452a" stroke-width="3"/><text x="${ex+ew+nw/2}" y="${ey+eh+22}" text-anchor="middle" ${F} font-weight="800" font-size="13" fill="#c2452a">+${fmt(PL.area)} m²</text>`}
  const w=120+(box.w-120)*k,h=w*.58,x=(W-w)/2,y=box.y+(box.h-h)/2,m=Math.sqrt(PL.area/.58);
  let g=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fffdf8" stroke="#2b2622" stroke-width="4"/>`;
  g+=`<path d="M${x+w*.58} ${y}v${h*.62}M${x} ${y+h*.5}h${w*.58}M${x+w*.58} ${y+h*.62}h${w*.42}" stroke="#2b2622" stroke-width="2.5"/>`;
  g+=`<path d="M${x+w*.2} ${y+h}h18" stroke="#fffdf8" stroke-width="5"/><path d="M${x+w*.2} ${y+h}a18 18 0 0 1 18 -18" fill="none" stroke="#8b857a"/>`;
  if(w>170)g+=[['quarto',x+w*.29,y+h*.27],['sala',x+w*.29,y+h*.78],['quarto',x+w*.79,y+h*.33],['cozinha',x+w*.79,y+h*.84]].map(r=>`<text x="${r[1]}" y="${r[2]}" text-anchor="middle" ${F} font-size="11" fill="#8b857a">${r[0]}</text>`).join('');
  if(T.k==='reforma'){const f=Math.min(1,PL.area/T.max)*.85+.15;return hatch()+g+`<rect x="${x+w*.58+2}" y="${y+2}" width="${w*.42-4}" height="${(h*.62-4)*f}" fill="url(#hatch)" opacity=".9"/><text x="${W/2}" y="${y+h+22}" text-anchor="middle" ${F} font-weight="800" font-size="13" fill="#c2452a">reforma de ${fmt(PL.area)} m²</text>`}
  g+=`<path d="M${x} ${y-12}h${w}M${x} ${y-16}v8M${x+w} ${y-16}v8" stroke="#c2452a" stroke-width="2"/><text x="${x+w/2}" y="${y-19}" text-anchor="middle" ${F} font-weight="800" font-size="12" fill="#2b2622">≈ ${fmt(Math.round(m*10)/10)} m</text><text x="${W/2}" y="${y+h+22}" text-anchor="middle" ${F} font-weight="800" font-size="13" fill="#2b2622">${fmt(PL.area)} m² de casa</text>`;
  return g;
}
const hatch=()=>'<defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#f6dcd3"/><path d="M0 0v8" stroke="#c2452a" stroke-width="3"/></pattern></defs>';
function renderPlan(){
  const T=tipos[PL.t],nm=$('pNome').value.trim(),cd=$('pCid').value.trim();
  $('pTipo').querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',i===PL.t));
  Object.keys(segOpts).forEach(id=>$(id).querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===PL[segKey[id]])));
  $('pAreaL').textContent=T.al;$('pAreaO').textContent=fmt(PL.area)+' m²';
  $('pPlan').innerHTML=planSvg();
  const rows=[['Obra',T.n],[T.al,fmt(PL.area)+' m²'],['Terreno',PL.ter],['Projeto',PL.pro],['Início',PL.ini]];if(cd)rows.push(['Cidade',cd]);if(nm)rows.push(['Cliente',nm]);
  $('pDl').innerHTML=rows.map(r=>`<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join('');
  let t='Olá, Construbem! Quero conversar com a construtora:\n'+rows.map(r=>'• '+r[0]+': '+r[1]).join('\n');
  $('pWa').href=wa(t);
}
setTipo(0);
/* como funciona */
let fs=0;
function renderFlow(){$('flow').innerHTML=steps.map((s,i)=>`<button type="button" data-i="${i}" aria-current="${i===fs}" class="${i<fs?'done':''}">${i===0?'<span class="here">Você começa aqui</span>':''}<h3>${esc(s.n)}</h3><p>${esc(s.d)}</p></button>`).join('')}
$('flow').addEventListener('click',e=>{const b=e.target.closest('button');if(b){fs=+b.dataset.i;renderFlow()}});
renderFlow();
$('svc').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.t){setTipo(+b.dataset.t);$('plan').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})}else if(b.dataset.go)go(b.dataset.go);else if(b.dataset.add)add(b.dataset.add)});

/* ---------- entrega: rastreio ---------- */
let md=0,tick=null,played=false;
$('modes').innerHTML=modos.map((m,i)=>`<button role="tab" data-i="${i}">${ico[m.ic]}${esc(m.n)}</button>`).join('');
function setStation(k){const n=modos[md].st.length,r=$('route');
  r.querySelectorAll('.stn').forEach((s,i)=>{s.classList.toggle('on',i<=k);s.classList.toggle('now',i===k)});
  const f=n>1?k/(n-1):0;r.querySelector('.bar').style.width=`calc((100% - 100%/${n})*${f})`;r.querySelector('.veh').style.left=`calc(50%/${n} + (100% - 100%/${n})*${f})`}
function play(){clearInterval(tick);const n=modos[md].st.length;if(reduce){setStation(n-1);return}let k=0;setStation(0);tick=setInterval(()=>{k++;setStation(k);if(k>=n-1)clearInterval(tick)},850)}
function renderMode(){const m=modos[md],r=$('route');
  $('modes').querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-selected',i===md));
  r.style.setProperty('--n',m.st.length);
  r.innerHTML='<span class="bar"></span><svg class="veh" viewBox="0 0 64 40" aria-hidden="true"><rect x="2" y="6" width="38" height="24" rx="2" fill="#c2452a"/><path d="M40 12h12l10 10v8H40z" fill="#f2b632"/><path d="M44 15h7l6 7H44z" fill="#b9d7e2"/><circle cx="14" cy="32" r="6" fill="#1a1714" stroke="#f4efe7" stroke-width="2"/><circle cx="50" cy="32" r="6" fill="#1a1714" stroke="#f4efe7" stroke-width="2"/></svg>'+m.st.map(s=>`<div class="stn"><span class="dot">${ico[s[2]]}</span><b>${esc(s[0])}</b><small>${esc(s[1])}</small></div>`).join('');
  if(m.ic!=='truck')r.querySelector('.veh').innerHTML='<rect x="14" y="6" width="36" height="28" rx="4" fill="#f2b632"/><path d="M14 14h36" stroke="#2a2110" stroke-width="2"/><rect x="26" y="20" width="12" height="8" fill="#c2452a"/>';
  $('mT').textContent=m.t;$('mD').textContent=m.d;const c=$('mCta');c.textContent=m.cta;c.href=m.href.startsWith('wa:')?wa(m.href.slice(3)):m.href;
  setStation(0);if(played)play();
}
$('modes').addEventListener('click',e=>{const b=e.target.closest('button');if(b){md=+b.dataset.i;renderMode()}});
$('replay').onclick=play;
renderMode();
const ioR=new IntersectionObserver(es=>{if(es.some(x=>x.isIntersecting)&&!played){played=true;play()}},{threshold:.45});ioR.observe($('route'));
/* ofertas por interesse */
const picked=new Set(['Cimento e básicos','Tintas']);
function renderInts(){$('ints').innerHTML=interesses.map(x=>`<button data-v="${esc(x)}" aria-pressed="${picked.has(x)}">${esc(x)}</button>`).join('');
  const l=[...picked];$('offWa').href=wa('Olá, Construbem! Quero receber o encarte de ofertas do mês'+(l.length?'. Tenho interesse em: '+l.join(', ')+'.':'.'));$('offWa').textContent=l.length?`Receber ofertas (${l.length})`:'Receber o encarte'}
$('ints').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const v=b.dataset.v;picked.has(v)?picked.delete(v):picked.add(v);renderInts()});
renderInts();

/* ---------- chat ---------- */
$('qs').innerHTML=faq.map((f,i)=>`<button data-i="${i}">${esc(f[0])}</button>`).join('');
let busy=false;
$('qs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||busy)return;busy=true;const f=faq[+b.dataset.i],m=$('msgs');
  m.insertAdjacentHTML('beforeend',`<div class="mg me">${esc(f[0])}</div><div class="mg dots" id="typing"><span></span><span></span><span></span></div>`);m.scrollTop=m.scrollHeight;
  setTimeout(()=>{$('typing').remove();m.insertAdjacentHTML('beforeend',`<div class="mg">${esc(f[1])}</div>`);m.scrollTop=m.scrollHeight;busy=false},reduce?0:700)});

/* ---------- contato ---------- */
$('cpAddr').onclick=async()=>{try{await navigator.clipboard.writeText('Av. Dom Pedro II, 740, Centro, Serra Alta/SC, 89871-000');toast('Endereço copiado')}catch(e){toast('Av. Dom Pedro II, 740, Centro')}};

/* ---------- navegador lateral ---------- */
const secs=[...document.querySelectorAll('[data-trena]')];
$('railOl').insertAdjacentHTML('beforeend',secs.map((s,i)=>`<li><button data-i="${i}" aria-label="Ir para ${esc(s.dataset.trena)}"><i></i><span>${esc(s.dataset.trena)}</span></button></li>`).join(''));
const rbtn=[...$('railOl').querySelectorAll('button')];
rbtn.forEach((b,i)=>b.onclick=()=>secs[i].scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}));
let curI=-1;
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight,p=max>0?Math.min(1,scrollY/max):0;
  $('tapeFill').style.width=(p*100)+'%';
  let ci=0;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.45)ci=i});
  const ni=secs[ci+1],a=secs[ci].getBoundingClientRect().top,b=ni?ni.getBoundingClientRect().top:a+secs[ci].offsetHeight,f=Math.max(0,Math.min(1,(innerHeight*.45-a)/(b-a||1)));
  const b0=rbtn[ci],b1=rbtn[ci+1]||b0,y0=b0.offsetTop+14,y1=b1.offsetTop+14;
  $('railF').style.height=Math.max(0,y0-14+(y1-y0)*f)+'px';
  $('railL').textContent=Math.round(p*100)+'%';
  if(ci!==curI){rbtn.forEach((b,i)=>{b.setAttribute('aria-current',i===ci);b.classList.toggle('past',i<ci)});rbtn.forEach(b=>b.classList.remove('flash'));const cb=rbtn[ci];cb.classList.add('flash');clearTimeout(onScroll.t);onScroll.t=setTimeout(()=>cb.classList.remove('flash'),1400);curI=ci}
}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
}
