const products=[
{id:1,name:'FUNFINS+ Wave / Notch Blade Only',type:'WAVE / NOTCH',image:'products/type-1/funfins-type1-red-ferrari.jpg',href:'products/type-1/',price:'FROM RP 1.000.000'},
{id:2,name:'FUNFINS+ Rounded / Smooth Blade Only',type:'ROUNDED / SMOOTH',image:'products/type-2/funfins-type2-red-ferrari.jpg',href:'products/type-2/',price:'FROM RP 1.000.000'},
{id:3,name:'FUNFINS+ Bulb / Rounded-Lobed Blade Only',type:'BULB / ROUNDED-LOBED',image:'products/type-3/funfins-type3-red-ferrari.jpg',href:'products/type-3/',price:'FROM RP 1.000.000'}
];
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const productBox=$('#products');
if(productBox) productBox.innerHTML=products.map(p=>`<article class="product"><a class="productMedia" href="${p.href}"><img src="${p.image}" alt="${p.name}"></a><div class="productInfo"><div><div class="productName">${p.name}</div><div class="productCat">${p.type} / BLADE ONLY</div><a class="quick" href="${p.href}">VIEW PRODUCT ↗</a></div><div class="price">${p.price}</div></div></article>`).join('');
const menuBtn=$('#menuBtn'),menuClose=$('#menuClose'),menuPanel=$('#menuPanel'),menuBackdrop=$('#menuBackdrop');
function openMenu(){menuPanel.classList.add('open');menuBackdrop.classList.add('open');menuPanel.setAttribute('aria-hidden','false');document.body.classList.add('menuOpen');}
function closeMenu(){menuPanel.classList.remove('open');menuBackdrop.classList.remove('open');menuPanel.setAttribute('aria-hidden','true');document.body.classList.remove('menuOpen');}
menuBtn?.addEventListener('click',openMenu);menuClose?.addEventListener('click',closeMenu);menuBackdrop?.addEventListener('click',closeMenu);
$$('.menuLink,.menuMinor a').forEach(a=>a.addEventListener('click',closeMenu));
const searchBtn=$('#searchBtn'),searchClose=$('#closeSearch'),search=$('#search'),input=$('#searchInput'),results=$('#results');
function openSearch(){search.classList.add('open');input?.focus();}
function closeSearch(){search.classList.remove('open');}
searchBtn?.addEventListener('click',openSearch);searchClose?.addEventListener('click',closeSearch);
input?.addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();const found=products.filter(p=>(p.name+' '+p.type).toLowerCase().includes(q));results.innerHTML=found.map(p=>`<a class="result" href="${p.href}"><span>${p.name}</span><span>${p.price}</span></a>`).join('')||(q?'<div class="empty">NO PRODUCT FOUND.</div>':'');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeSearch();}});
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;$('.progress').style.width=(max>0?scrollY/max*100:0)+'%';$('#siteHeader').classList.toggle('scrolled',scrollY>30);});
addEventListener('load',()=>setTimeout(()=>$('.loader')?.classList.add('done'),700));
