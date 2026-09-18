const products = [
  {
    id: 1,
    name: "FUNFINS+ Wave / Notch Blade Only",
    description: "Power & response. Fast response, direct power and active-kick control.",
    type: "WAVE / NOTCH",
    image: "products/type-1/funfins-type1-red-ferrari.jpg",
    href: "products/type-1/",
    price: "FROM RP 1.000.000",
    description: "Add Wave / Notch product description here."
  },
  {
    id: 2,
    name: "FUNFINS+ Rounded / Smooth Blade Only",
    description: "Balance & comfort. Smooth flex and versatile kicking.",
    type: "ROUNDED / SMOOTH",
    image: "products/type-2/funfins-type2-red-ferrari.jpg",
    href: "products/type-2/",
    price: "FROM RP 1.000.000",
    description: "Add Rounded / Smooth product description here."
  },
  {
    id: 3,
    name: "FUNFINS+ Bulb / Rounded-Lobed Blade Only",
    description: "Stability & efficiency. Controlled movement and consistent propulsion.",
    type: "BULB / ROUNDED-LOBED",
    image: "products/type-3/funfins-type3-red-ferrari.jpg",
    href: "products/type-3/",
    price: "FROM RP 1.000.000",
    description: "Add Bulb / Rounded-Lobed product description here."
  }
];

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

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

const searchButton = $("#searchBtn");
const searchClose = $("#closeSearch");
const searchInput = $("#searchInput");
const searchOverlay = $("#search");
const searchResults = $("#results");

if (searchButton && searchOverlay) {
  searchButton.onclick = () => {
    searchOverlay.classList.add("open");
    if (searchInput) searchInput.focus();
  };
}

if (searchClose && searchOverlay) {
  searchClose.onclick = () => searchOverlay.classList.remove("open");
}

if (searchInput && searchResults) {
  searchInput.oninput = event => {
    const query = event.target.value.trim().toLowerCase();
    const filteredProducts = products.filter(product =>
      `${product.name} ${product.type}`.toLowerCase().includes(query)
    );

    searchResults.innerHTML = filteredProducts.map(product => `
      <a class="result" href="${product.href}">
        <span>${product.name}</span>
        <span>${product.price}</span>
      </a>
    `).join("");

    if (query && filteredProducts.length === 0) {
      searchResults.innerHTML = `<div class="empty">NO PRODUCT FOUND.</div>`;
    }
  };
}

addEventListener("scroll", () => {
  const documentHeight = document.documentElement.scrollHeight - innerHeight;
  const scrollProgress = documentHeight > 0 ? (scrollY / documentHeight) * 100 : 0;
  const progressBar = $(".progress");
  if (progressBar) progressBar.style.width = `${scrollProgress}%`;

  const header = document.querySelector("header");
  if (header) header.classList.toggle("scrolled", scrollY > 30);
});

addEventListener("load", () => {
  const loader = $(".loader");
  if (!loader) return;
  setTimeout(() => loader.classList.add("done"), 900);
});
