const products = [
  { id:1, name:"FUNFINS+ Wave / Notch Blade Only", description:"Power & response. Fast response, direct power and active-kick control.", type:"WAVE / NOTCH", image:"products/type-1/funfins-type1-red-ferrari.jpg", href:"products/type-1/", price:"FROM RP 1.000.000" },
  { id:2, name:"FUNFINS+ Rounded / Smooth Blade Only", description:"Balance & comfort. Smooth flex and versatile kicking.", type:"ROUNDED / SMOOTH", image:"products/type-2/funfins-type2-red-ferrari.jpg", href:"products/type-2/", price:"FROM RP 1.000.000" },
  { id:3, name:"FUNFINS+ Bulb / Rounded-Lobed Blade Only", description:"Stability & efficiency. Controlled movement and consistent propulsion.", type:"BULB / ROUNDED-LOBED", image:"products/type-3/funfins-type3-red-ferrari.jpg", href:"products/type-3/", price:"FROM RP 1.000.000" }
];

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Products
const productsContainer = $("#products");
if (productsContainer) {
  productsContainer.innerHTML = products.map(product => `
    <article class="product">
      <a class="productMedia" href="${product.href}">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <div class="productInfo">
        <div>
          <div class="productName">${product.name}</div>
          <div class="productCat">${product.type} / BLADE ONLY</div>
          <div class="productDescription">${product.description}</div>
          <a class="quick" href="${product.href}">VIEW PRODUCT ↗</a>
        </div>
        <div class="price">${product.price}</div>
      </div>
    </article>
  `).join("");
}

// Search
const searchButton = $("#searchBtn");
const searchClose = $("#closeSearch");
const searchInput = $("#searchInput");
const searchOverlay = $("#search");
const searchResults = $("#results");

function openSearch() {
  if (!searchOverlay) return;
  searchOverlay.classList.add("open");
  searchOverlay.setAttribute("aria-hidden", "false");
  if (searchInput) searchInput.focus();
}
function closeSearch() {
  if (!searchOverlay) return;
  searchOverlay.classList.remove("open");
  searchOverlay.setAttribute("aria-hidden", "true");
}
if (searchButton) searchButton.addEventListener("click", openSearch);
if (searchClose) searchClose.addEventListener("click", closeSearch);
if (searchInput && searchResults) {
  searchInput.addEventListener("input", event => {
    const query = event.target.value.trim().toLowerCase();
    const filtered = products.filter(product => `${product.name} ${product.type}`.toLowerCase().includes(query));
    searchResults.innerHTML = filtered.map(product => `
      <a class="result" href="${product.href}"><span>${product.name}</span><span>${product.price}</span></a>
    `).join("");
    if (query && !filtered.length) searchResults.innerHTML = `<div class="empty">NO PRODUCT FOUND.</div>`;
  });
}

// Right-side menu
const menuButton = $("#menuBtn");
const menuPanel = $("#menuPanel");
const menuClose = $("#closeMenu");

function openMenu() {
  if (!menuPanel) return;
  menuPanel.classList.add("open");
  menuPanel.setAttribute("aria-hidden", "false");
  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");
  }
  document.body.classList.add("menuOpen");
}
function closeMenu() {
  if (!menuPanel) return;
  menuPanel.classList.remove("open");
  menuPanel.setAttribute("aria-hidden", "true");
  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  }
  document.body.classList.remove("menuOpen");
}
if (menuButton) menuButton.addEventListener("click", openMenu);
if (menuClose) menuClose.addEventListener("click", closeMenu);
if (menuPanel) {
  menuPanel.addEventListener("click", event => {
    if (event.target === menuPanel) closeMenu();
  });
}
$$('[data-menu-link]').forEach(link => link.addEventListener('click', closeMenu));

// Keyboard / scroll / loader
window.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
    closeSearch();
  }
});
window.addEventListener("scroll", () => {
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;
  const progressBar = $(".progress");
  if (progressBar) progressBar.style.width = `${scrollProgress}%`;
  const header = $("header");
  if (header) header.classList.toggle("scrolled", window.scrollY > 30);
});
window.addEventListener("load", () => {
  const loader = $(".loader");
  if (loader) setTimeout(() => loader.classList.add("done"), 900);
});
