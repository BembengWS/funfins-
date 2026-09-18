const products = [
  {name:'FUNFINS+ Wave / Notch Blade Only',description:'Power & response. Fast response, direct power and active-kick control.',type:'WAVE / NOTCH',image:'products/type-1/funfins-type1-red-ferrari.jpg',href:'products/type-1/',price:'FROM RP 1.000.000'},
  {name:'FUNFINS+ Rounded / Smooth Blade Only',description:'Balance & comfort. Smooth flex and versatile kicking.',type:'ROUNDED / SMOOTH',image:'products/type-2/funfins-type2-red-ferrari.jpg',href:'products/type-2/',price:'FROM RP 1.000.000'},
  {name:'FUNFINS+ Bulb / Rounded-Lobed Blade Only',description:'Efficiency & control. Controlled movement and consistent propulsion.',type:'BULB / ROUNDED-LOBED',image:'products/type-3/funfins-type3-red-ferrari.jpg',href:'products/type-3/',price:'FROM RP 1.000.000'}
];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const productsEl=$('#products');
if(productsEl){productsEl.innerHTML=products.map(p=>`<article class="product"><a class="productMedia" href="${p.href}"><img src="${p.image}" alt="${p.name}"></a><div class="productInfo"><div><div class="productName">${p.name}</div><div class="productCat">${p.type} / BLADE ONLY</div><div class="productDescription">${p.description}</div><a class="quick" href="${p.href}">VIEW PRODUCT ↗</a></div><div class="price">${p.price}</div></div></article>`).join('');}
const menuBtn=$('#menuBtn'), menuPanel=$('#menuPanel'), menuClose=$('#menuClose');
function closeMenu(){menuPanel?.classList.remove('open');menuPanel?.setAttribute('aria-hidden','true');document.body.classList.remove('menuOpen');}
menuBtn?.addEventListener('click',()=>{menuPanel.classList.add('open');menuPanel.setAttribute('aria-hidden','false');document.body.classList.add('menuOpen');});
menuClose?.addEventListener('click',closeMenu);
menuPanel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
const searchBtn=$('#searchBtn'), search=$('#search'), closeSearch=$('#closeSearch'), input=$('#searchInput'), results=$('#results');
function closeSearchOverlay(){search?.classList.remove('open');search?.setAttribute('aria-hidden','true');}
searchBtn?.addEventListener('click',()=>{search.classList.add('open');search.setAttribute('aria-hidden','false');setTimeout(()=>input?.focus(),150);});
closeSearch?.addEventListener('click',closeSearchOverlay);
input?.addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();const filtered=products.filter(p=>(p.name+' '+p.type).toLowerCase().includes(q));results.innerHTML=filtered.map(p=>`<a class="result" href="${p.href}"><span>${p.name}</span><span>${p.price}</span></a>`).join('');if(q&&!filtered.length)results.innerHTML='<div class="empty">NO PRODUCT FOUND.</div>';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeSearchOverlay();}});
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;const bar=$('.progress');if(bar)bar.style.width=(max>0?scrollY/max*100:0)+'%';document.querySelector('header')?.classList.toggle('scrolled',scrollY>30);});
addEventListener('load',()=>setTimeout(()=>$('.loader')?.classList.add('done'),700));


// Shared controls for category pages
(function(){
  const mb=document.querySelector('[data-menu-btn]'), mp=document.querySelector('[data-menu-panel]'), mc=document.querySelector('[data-menu-close]');
  const sb=document.querySelector('[data-search-btn]'), so=document.querySelector('[data-search-overlay]'), sc=document.querySelector('[data-search-close]');
  const close=()=>{mp?.classList.remove('open');so?.classList.remove('open');document.body.classList.remove('menuOpen')};
  mb?.addEventListener('click',()=>{mp?.classList.add('open');document.body.classList.add('menuOpen')});
  mc?.addEventListener('click',close);
  sb?.addEventListener('click',()=>{so?.classList.add('open');so?.querySelector('input')?.focus()});
  sc?.addEventListener('click',close);
  mp?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
