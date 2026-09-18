/* =========================================================
   FUNFINS+ TYPE 3
   BULB / ROUNDED-LOBED
   DIRECT WHATSAPP CHECKOUT
========================================================= */

const PRODUCT_NAME = "FUNFINS+ Bulb / Rounded-Lobed Blade Only";

const WHATSAPP_NUMBER = "6289638142670";

const colors = {
  "Red Ferrari": "funfins-type3-red-ferrari.jpg",
  "Black": "funfins-type3-black.jpg",
  "Ocean Blue": "funfins-type3-ocean-blue.jpg",
  "Forest Green": "funfins-type3-forest-green.jpg",
  "Pearl White": "funfins-type3-pearl-white.jpg",
  "Sun Yellow": "funfins-type3-sun-yellow.jpg"
};

const railPrices = {
  "Water Rails": 1500000,
  "U-List": 1000000
};

let selectedColor = "Red Ferrari";
let selectedRail = "Water Rails";
let selectedStiffness = "Medium";
let quantity = 1;


/* =========================================================
   HELPERS
========================================================= */

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function formatPrice(value) {
  return "RP " + Number(value).toLocaleString("id-ID");
}


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", function () {

  const loader = $(".loader");

  if (loader) {
    setTimeout(function () {
      loader.classList.add("done");
    }, 700);
  }

});


/* =========================================================
   COLOR
========================================================= */

function updateColor() {

  const image = colors[selectedColor];

  const mainImage = $("#mainImage");
  const featureImage = $("#featureImage");

  if (mainImage && image) {
    mainImage.style.opacity = "0";

    setTimeout(function () {
      mainImage.src = image;
      mainImage.alt = PRODUCT_NAME + " - " + selectedColor;
      mainImage.style.opacity = "1";
    }, 120);
  }

  if (featureImage && image) {
    featureImage.style.opacity = "0";

    setTimeout(function () {
      featureImage.src = image;
      featureImage.alt = PRODUCT_NAME + " - " + selectedColor;
      featureImage.style.opacity = "1";
    }, 120);
  }

  $$(".colorOption").forEach(function (button) {

    button.classList.toggle(
      "active",
      button.dataset.color === selectedColor
    );

  });

  updateSummary();

}


/* =========================================================
   RAIL
========================================================= */

function updateRail() {

  $$(".railOption").forEach(function (button) {

    button.classList.toggle(
      "active",
      button.dataset.rail === selectedRail
    );

  });

  updatePrice();
  updateSummary();

}


/* =========================================================
   STIFFNESS
========================================================= */

function updateStiffness() {

  $$(".stiffnessOption").forEach(function (button) {

    button.classList.toggle(
      "active",
      button.dataset.stiffness === selectedStiffness
    );

  });

  updateSummary();

}


/* =========================================================
   PRICE
========================================================= */

function updatePrice() {

  const price = railPrices[selectedRail] || 0;

  const priceElement = $("#price");

  if (priceElement) {
    priceElement.textContent = formatPrice(price);
  }

}


/* =========================================================
   SUMMARY
========================================================= */

function updateSummary() {

  const summaryColor = $("#summaryColor");
  const summaryRail = $("#summaryRail");
  const summaryStiffness = $("#summaryStiffness");
  const quantityElement = $("#quantity");
  const totalPrice = $("#totalPrice");

  if (summaryColor) {
    summaryColor.textContent = selectedColor.toUpperCase();
  }

  if (summaryRail) {
    summaryRail.textContent = selectedRail.toUpperCase();
  }

  if (summaryStiffness) {
    summaryStiffness.textContent = selectedStiffness.toUpperCase();
  }

  if (quantityElement) {
    quantityElement.textContent = quantity;
  }

  if (totalPrice) {

    const price =
      (railPrices[selectedRail] || 0) *
      quantity;

    totalPrice.textContent = formatPrice(price);
  }

}


/* =========================================================
   OPEN ORDER MODAL
========================================================= */

function openOrderModal() {

  const modal = $("#orderModal");

  if (!modal) {
    console.error("FUNFINS ERROR: #orderModal tidak ditemukan.");
    return;
  }

  updateSummary();

  modal.classList.add("open");

  document.body.classList.add("modalOpen");

}


/* =========================================================
   CLOSE ORDER MODAL
========================================================= */

function closeOrderModal() {

  const modal = $("#orderModal");

  if (!modal) {
    return;
  }

  modal.classList.remove("open");

  document.body.classList.remove("modalOpen");

}


/* =========================================================
   COLOR EVENTS
========================================================= */

$$(".colorOption").forEach(function (button) {

  button.addEventListener("click", function () {

    const color = this.dataset.color;

    if (!color || !colors[color]) {
      return;
    }

    selectedColor = color;

    updateColor();

  });

});


/* =========================================================
   RAIL EVENTS
========================================================= */

$$(".railOption").forEach(function (button) {

  button.addEventListener("click", function () {

    const rail = this.dataset.rail;

    if (!rail || railPrices[rail] === undefined) {
      return;
    }

    selectedRail = rail;

    updateRail();

  });

});


/* =========================================================
   STIFFNESS EVENTS
========================================================= */

$$(".stiffnessOption").forEach(function (button) {

  button.addEventListener("click", function () {

    const stiffness = this.dataset.stiffness;

    if (!stiffness) {
      return;
    }

    selectedStiffness = stiffness;

    updateStiffness();

  });

});


/* =========================================================
   BUY BUTTON
========================================================= */

const buyBtn = $("#buyBtn");

if (buyBtn) {

  buyBtn.addEventListener("click", function () {

    openOrderModal();

  });

}


/* =========================================================
   BOTTOM BUY BUTTON
========================================================= */

const bottomBuyBtn = $("#bottomBuyBtn");

if (bottomBuyBtn) {

  bottomBuyBtn.addEventListener("click", function () {

    openOrderModal();

  });

}


/* =========================================================
   CLOSE BUTTON
========================================================= */

const closeModal = $("#closeModal");

if (closeModal) {

  closeModal.addEventListener("click", function () {

    closeOrderModal();

  });

}


/* =========================================================
   CLICK OUTSIDE MODAL
========================================================= */

const orderModal = $("#orderModal");

if (orderModal) {

  orderModal.addEventListener("click", function (event) {

    if (event.target === orderModal) {
      closeOrderModal();
    }

  });

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {

    closeOrderModal();

    const search = $("#search");

    if (search) {
      search.classList.remove("open");
    }

  }

});


/* =========================================================
   QUANTITY MINUS
========================================================= */

const minusQty = $("#minusQty");

if (minusQty) {

  minusQty.addEventListener("click", function () {

    if (quantity > 1) {
      quantity--;
    }

    updateSummary();

  });

}


/* =========================================================
   QUANTITY PLUS
========================================================= */

const plusQty = $("#plusQty");

if (plusQty) {

  plusQty.addEventListener("click", function () {

    quantity++;

    updateSummary();

  });

}


/* =========================================================
   CONFIRM WHATSAPP
========================================================= */

const confirmOrder = $("#confirmOrder");

if (confirmOrder) {

  confirmOrder.addEventListener("click", function () {

    const customerName =
      $("#customerName")?.value.trim() || "";

    const customerAddress =
      $("#customerAddress")?.value.trim() || "";

    const customerNotes =
      $("#customerNotes")?.value.trim() || "";

    if (!customerName) {

      alert("Please enter your name.");

      $("#customerName")?.focus();

      return;

    }

    if (!customerAddress) {

      alert("Please enter your shipping address.");

      $("#customerAddress")?.focus();

      return;

    }

    const unitPrice =
      railPrices[selectedRail] || 0;

    const total =
      unitPrice * quantity;

    const message =

`Halo FUNFINS+,

Saya ingin melakukan pemesanan:

PRODUCT
${PRODUCT_NAME}

COLOR
${selectedColor}

RAIL
${selectedRail}

STIFFNESS
${selectedStiffness}

QUANTITY
${quantity}

UNIT PRICE
${formatPrice(unitPrice)}

TOTAL
${formatPrice(total)}

CUSTOMER
${customerName}

SHIPPING ADDRESS
${customerAddress}

NOTES
${customerNotes || "-"}

Mohon informasi selanjutnya untuk proses pemesanan.

Terima kasih.`;

    const whatsappURL =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

  });

}


/* =========================================================
   SEARCH
========================================================= */

const searchBtn = $("#searchBtn");
const closeSearch = $("#closeSearch");
const search = $("#search");
const searchInput = $("#searchInput");
const results = $("#results");


if (searchBtn && search) {

  searchBtn.addEventListener("click", function () {

    search.classList.add("open");

    if (searchInput) {
      setTimeout(function () {
        searchInput.focus();
      }, 300);
    }

  });

}


if (closeSearch && search) {

  closeSearch.addEventListener("click", function () {

    search.classList.remove("open");

  });

}


if (searchInput && results) {

  searchInput.addEventListener("input", function () {

    const query =
      this.value
        .trim()
        .toLowerCase();

    if (!query) {

      results.innerHTML = "";

      return;

    }

    const searchProducts = [

      {
        name: "FUNFINS+ Wave / Notch Blade Only",
        type: "WAVE / NOTCH",
        url: "../type-1/"
      },

      {
        name: "FUNFINS+ Rounded / Smooth Blade Only",
        type: "ROUNDED / SMOOTH",
        url: "../type-2/"
      },

      {
        name: "FUNFINS+ Bulb / Rounded-Lobed Blade Only",
        type: "BULB / ROUNDED-LOBED",
        url: "./"
      }

    ];

    const filtered =
      searchProducts.filter(function (product) {

        return (
          product.name +
          " " +
          product.type
        )
        .toLowerCase()
        .includes(query);

      });

    results.innerHTML =
      filtered.map(function (product) {

        return `
          <a class="result" href="${product.url}">
            <span>${product.name}</span>
            <span>${product.type}</span>
          </a>
        `;

      }).join("");

  });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

window.addEventListener("scroll", function () {

  const progress = $(".progress");

  if (progress) {

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight > 0) {

      const percentage =
        (window.scrollY / documentHeight) * 100;

      progress.style.width =
        percentage + "%";

    }

  }

  const header = document.querySelector("header");

  if (header) {

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  }

});


/* =========================================================
   INITIAL STATE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  updateColor();

  updateRail();

  updateStiffness();

  updatePrice();

  updateSummary();

});
