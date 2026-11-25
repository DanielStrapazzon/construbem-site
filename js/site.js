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
let cat=8;
function renderWall(){
  const B=i=>`<button class="brk" data-i="${i}" aria-pressed="${i===cat}">${esc(cats[i].n)}<small>${esc(cats[i].s)}</small></button>`,H='<span class="half" aria-hidden="true"></span>';
  $('wall').innerHTML=B(0)+B(1)+B(2)+H+B(3)+B(4)+H+B(5)+B(6)+B(7)+H+B(8)+B(9)+H;
  const C=cats[cat];
  $('detail').innerHTML=`<h3>${esc(C.n)}</h3><p class="lead">${esc(C.t)}</p><ul>${C.l.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${C.b?`<p class="brands">Marcas na loja: ${esc(C.b)}</p>`:''}<div class="ctas"><a class="btn solid" target="_blank" rel="noopener" href="${wa('Olá, Construbem! Quero preço de '+C.n.toLowerCase()+'.')}">Pedir preço</a><button class="btn" id="catAdd">+ Lista</button>${C.go?`<a class="btn" href="${C.go}">Sob medida</a>`:''}</div>`;
  $('catAdd').onclick=()=>add(C.n);
}
$('wall').addEventListener('click',e=>{const b=e.target.closest('.brk');if(b){cat=+b.dataset.i;renderWall();if(innerWidth<860)$('detail').scrollIntoView({block:'nearest'})}});
renderWall();

/* ---------- fases ---------- */
const ic={
 zero:'<svg viewBox="0 0 52 52"><rect x="4" y="38" width="44" height="8" rx="2" fill="#c2452a"/><path d="M12 38V22l14-10 14 10v16" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="4 3"/></svg>',
 ban:'<svg viewBox="0 0 52 52"><path d="M8 26h36v6a12 12 0 0 1-12 12H20A12 12 0 0 1 8 32z" fill="#c2452a"/><path d="M14 26V12a5 5 0 0 1 10 0" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="18" r="2" fill="currentColor"/></svg>',
 jan:'<svg viewBox="0 0 52 52"><rect x="8" y="8" width="36" height="36" rx="2" fill="none" stroke="currentColor" stroke-width="3"/><path d="M26 8v36M8 26h36" stroke="currentColor" stroke-width="3"/><rect x="11" y="11" width="12" height="12" fill="#b9d7e2"/><rect x="29" y="29" width="12" height="12" fill="#c2452a"/></svg>',
 obra:'<svg viewBox="0 0 52 52"><path d="M6 30a20 20 0 0 1 40 0z" fill="#f2b632"/><rect x="4" y="30" width="44" height="6" rx="3" fill="#c2452a"/><path d="M26 10v20" stroke="currentColor" stroke-width="3"/></svg>'
};
const phases=[
 {i:'zero',q:'Vou construir do zero.',a:'Comece pela calculadora: você sai com blocos, cimento e tinta contados e manda a lista de uma vez.',b:'Abrir calculadora',f:()=>location.hash='#calculadora'},
 {i:'ban',q:'Quero reformar o banheiro.',a:'Louças, cubas, metais, hidráulica e tinta. Coloque o kit na lista e ajuste as quantidades.',b:'Montar kit reforma',f:()=>{['Cuba de sobrepor','Louça sanitária','Torneira e metais','Tubos e conexões PVC','Registros','Tinta acrílica 18 L'].forEach(n=>add(n,1,'',1));toast('Kit reforma de banheiro na lista');open(true)}},
 {i:'jan',q:'Preciso de uma janela de outro tamanho.',a:'Fabricamos esquadrias de metal e de madeira. Desenhe a sua com as medidas do vão.',b:'Desenhar esquadria',f:()=>location.hash='#sob-medida'},
 {i:'obra',q:'Quero alguém que faça a obra toda.',a:'A Construbem também é construtora: projeto, orçamento por escrito, obra e entrega, com material da própria loja.',b:'Ver a construtora',f:()=>location.hash='#construtora'}
];
$('phases').innerHTML=phases.map((p,k)=>`<div class="ph">${ic[p.i]}<q>${esc(p.q)}</q><p>${esc(p.a)}</p><button class="btn" data-k="${k}">${esc(p.b)}</button></div>`).join('');
$('phases').addEventListener('click',e=>{const b=e.target.closest('button[data-k]');if(b)phases[+b.dataset.k].f()});

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

/* ---------- construtora ---------- */
$('track').innerHTML=steps.map(s=>`<article class="st"><svg viewBox="0 0 260 92" aria-hidden="true">${s.s}</svg><h3 style="font-size:24px;font-stretch:112%;font-weight:900">${esc(s.n)}</h3><p>${esc(s.d)}</p></article>`).join('');
const go=d=>{const tr=$('track'),w=tr.querySelector('.st').offsetWidth+14;tr.scrollBy({left:d*w,behavior:reduce?'auto':'smooth'})};
$('prv').onclick=()=>go(-1);$('nxt').onclick=()=>go(1);
$('track').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});

/* ---------- chat ---------- */
$('qs').innerHTML=faq.map((f,i)=>`<button data-i="${i}">${esc(f[0])}</button>`).join('');
let busy=false;
$('qs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||busy)return;busy=true;const f=faq[+b.dataset.i],m=$('msgs');
  m.insertAdjacentHTML('beforeend',`<div class="mg me">${esc(f[0])}</div><div class="mg dots" id="typing"><span></span><span></span><span></span></div>`);m.scrollTop=m.scrollHeight;
  setTimeout(()=>{$('typing').remove();m.insertAdjacentHTML('beforeend',`<div class="mg">${esc(f[1])}</div>`);m.scrollTop=m.scrollHeight;busy=false},reduce?0:700)});

/* ---------- contato ---------- */
$('cpAddr').onclick=async()=>{try{await navigator.clipboard.writeText('Av. Dom Pedro II, 740, Centro, Serra Alta/SC, 89871-000');toast('Endereço copiado')}catch(e){toast('Av. Dom Pedro II, 740, Centro')}};

/* ---------- trena de progresso ---------- */
const secs=[...document.querySelectorAll('[data-trena]')];
const rail=$('rail');
secs.forEach(s=>{const a=document.createElement('a');a.href='#'+s.id;a.title=s.dataset.trena;a.setAttribute('aria-label',s.dataset.trena);rail.appendChild(a)});
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight,p=max>0?Math.min(1,scrollY/max):0;
  $('tapeFill').style.width=(p*100)+'%';
  const rh=rail.clientHeight;$('railM').style.top=(p*rh)+'px';$('railL').style.top=(p*rh)+'px';
  let cur=secs[0];secs.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.45)cur=s});$('railL').textContent=cur.dataset.trena;
  const H=document.documentElement.scrollHeight;rail.querySelectorAll('a').forEach((a,i)=>a.style.top=(secs[i].offsetTop/H*rh)+'px');
}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
}
