const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const menuBtn = $('#menuBtn');
const menuPanel = $('#menuPanel');
const closeMenu = $('#closeMenu');
const searchBtn = $('#searchBtn');
const searchPanel = $('#searchPanel');
const closeSearch = $('#closeSearch');
const searchInput = $('#searchInput');
const searchResults = $('#searchResults');

function openMenu(){
  if(!menuPanel) return;
  menuPanel.classList.add('open');
  menuPanel.setAttribute('aria-hidden','false');
  menuBtn?.setAttribute('aria-expanded','true');
  document.body.style.overflow='hidden';
}
function hideMenu(){
  menuPanel?.classList.remove('open');
  menuPanel?.setAttribute('aria-hidden','true');
  menuBtn?.setAttribute('aria-expanded','false');
  if(!searchPanel?.classList.contains('open')) document.body.style.overflow='';
}
function openSearch(){
  if(!searchPanel) return;
  searchPanel.classList.add('open');
  searchPanel.setAttribute('aria-hidden','false');
  searchInput?.focus();
  document.body.style.overflow='hidden';
}
function hideSearch(){
  searchPanel?.classList.remove('open');
  searchPanel?.setAttribute('aria-hidden','true');
  if(!menuPanel?.classList.contains('open')) document.body.style.overflow='';
}
menuBtn?.addEventListener('click',openMenu);
closeMenu?.addEventListener('click',hideMenu);
searchBtn?.addEventListener('click',openSearch);
closeSearch?.addEventListener('click',hideSearch);
menuPanel?.addEventListener('click',e=>{if(e.target===menuPanel) hideMenu();});
searchPanel?.addEventListener('click',e=>{if(e.target===searchPanel) hideSearch();});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){hideMenu();hideSearch();}});

const searchable = $$('.searchable').length ? [...$$('.searchable')].map(a=>({name:a.dataset.name||a.textContent.trim(),type:a.dataset.type||'CATEGORY',href:a.getAttribute('href')})) : [];
searchInput?.addEventListener('input',e=>{
  const q=e.target.value.trim().toLowerCase();
  if(!q){searchResults.innerHTML='';return;}
  const results=searchable.filter(x=>(x.name+' '+x.type).toLowerCase().includes(q));
  searchResults.innerHTML=results.length?results.map(x=>`<a class="searchResult" href="${x.href}"><span>${x.name}</span><small>${x.type}</small></a>`).join(''):'<div class="searchResult"><span>NO RESULT FOUND.</span><small>TRY ANOTHER SEARCH</small></div>';
});

window.addEventListener('scroll',()=>{
  document.querySelector('.header')?.classList.toggle('scrolled',scrollY>30);
});
