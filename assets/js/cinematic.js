const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const searchData = [
  {name:'CUSTOM BLADE', type:'CATEGORY', href:'custom-blade/'},
  {name:'RENTALS', type:'CATEGORY', href:'rentals/'},
  {name:'DIVE GEAR', type:'CATEGORY', href:'dive-gear/'},
  {name:'SERVICES', type:'CATEGORY', href:'services/'},
  {name:'FUNFINS+ Wave / Notch Blade Only', type:'CUSTOM BLADE', href:'products/type-1/'},
  {name:'FUNFINS+ Rounded / Smooth Blade Only', type:'CUSTOM BLADE', href:'products/type-2/'},
  {name:'FUNFINS+ Bulb / Rounded-Lobed Blade Only', type:'CUSTOM BLADE', href:'products/type-3/'},
  {name:'Fin Repair', type:'SERVICE', href:'services/'},
  {name:'Fin Modification', type:'SERVICE', href:'services/'},
  {name:'Sticker Installation', type:'SERVICE', href:'services/'},
  {name:'Fins + Foot Pocket', type:'RENTAL', href:'rentals/'},
  {name:'Snorkel', type:'RENTAL / DIVE GEAR', href:'rentals/'},
  {name:'Low Volume Mask', type:'RENTAL / DIVE GEAR', href:'rentals/'},
  {name:'Dive Package', type:'RENTAL', href:'rentals/'}
];

const menuOverlay = $('#menuOverlay');
const menuBtn = $('#menuBtn');
const menuClose = $('#menuClose');
const menuShade = $('#menuShade');

function openMenu(){
  if(!menuOverlay) return;
  menuOverlay.classList.add('open');
  menuOverlay.setAttribute('aria-hidden','false');
  menuBtn?.setAttribute('aria-expanded','true');
  document.body.classList.add('locked');
}
function closeMenu(){
  if(!menuOverlay) return;
  menuOverlay.classList.remove('open');
  menuOverlay.setAttribute('aria-hidden','true');
  menuBtn?.setAttribute('aria-expanded','false');
  document.body.classList.remove('locked');
}
menuBtn?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);
menuShade?.addEventListener('click', closeMenu);
$$('.menuLinks a,.menuSub a').forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){ closeMenu(); closeSearch(); }
});

const searchOverlay = $('#search');
const searchBtn = $('#searchBtn');
const closeSearchBtn = $('#closeSearch');
const searchInput = $('#searchInput');
const results = $('#results');

function openSearch(){
  if(!searchOverlay) return;
  searchOverlay.classList.add('open');
  searchOverlay.setAttribute('aria-hidden','false');
  document.body.classList.add('locked');
  setTimeout(() => searchInput?.focus(), 250);
}
function closeSearch(){
  if(!searchOverlay) return;
  searchOverlay.classList.remove('open');
  searchOverlay.setAttribute('aria-hidden','true');
  document.body.classList.remove('locked');
}
searchBtn?.addEventListener('click', openSearch);
closeSearchBtn?.addEventListener('click', closeSearch);

function renderResults(query=''){
  const q=query.trim().toLowerCase();
  const items=q ? searchData.filter(item => `${item.name} ${item.type}`.toLowerCase().includes(q)) : searchData.slice(0,7);
  if(!results) return;
  results.innerHTML = items.map(item => `<a class="result" href="${item.href}"><span>${item.name}</span><small>${item.type} ↗</small></a>`).join('') || '<div class="empty">NO MATCH FOUND.</div>';
}
searchInput?.addEventListener('input', e => renderResults(e.target.value));
renderResults();

window.addEventListener('scroll', () => {
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const pct=max>0 ? (window.scrollY/max)*100 : 0;
  const bar=$('.progress'); if(bar) bar.style.width=`${pct}%`;
  const header=$('#siteHeader'); if(header) header.classList.toggle('scrolled',window.scrollY>30);
});
window.addEventListener('load',()=>setTimeout(()=>$('.loader')?.classList.add('done'),700));
