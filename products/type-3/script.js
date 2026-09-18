const WHATSAPP = "6289638142670";

const state = {
  color: "Red Ferrari",
  image: "funfins-type3-red-ferrari.jpg",
  rail: "Water Rails",
  price: 1500000,
  stiffness: "Medium",
  quantity: 1
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


// ==============================
// FORMAT PRICE
// ==============================

function formatPrice(value) {
  return "Rp " + Number(value).toLocaleString("id-ID");
}


// ==============================
// UPDATE PRODUCT IMAGES
// ==============================

function updateImages() {

  const mainImage = $("#mainImage");

  if (mainImage) {
    mainImage.src = state.image;
  }

  $$(".productPhoto img").forEach((img) => {
    img.src = state.image;
  });

  const summaryImage = $("#summaryImage");

  if (summaryImage) {
    summaryImage.src = state.image;
  }
}


// ==============================
// UPDATE PRODUCT UI
// ==============================

function updateUI() {

  // Product values

  if ($("#colorValue")) {
    $("#colorValue").textContent =
      state.color.toUpperCase();
  }

  if ($("#railValue")) {
    $("#railValue").textContent =
      state.rail.toUpperCase();
  }

  if ($("#stiffnessValue")) {
    $("#stiffnessValue").textContent =
      state.stiffness.toUpperCase();
  }

  // Price

  if ($("#price")) {
    $("#price").textContent =
      formatPrice(state.price);
  }

  // Specification color

  if ($("#specColor")) {
    $("#specColor").textContent =
      state.color.toUpperCase();
  }


  // ==========================
  // ORDER SUMMARY
  // ==========================

  if ($("#summaryColor")) {
    $("#summaryColor").textContent =
      state.color;
  }

  if ($("#summaryRail")) {
    $("#summaryRail").textContent =
      state.rail;
  }

  if ($("#summaryStiffness")) {
    $("#summaryStiffness").textContent =
      state.stiffness;
  }

  if ($("#summaryQty")) {
    $("#summaryQty").textContent =
      state.quantity;
  }

  if ($("#summaryTotal")) {
    $("#summaryTotal").textContent =
      formatPrice(
        state.price * state.quantity
      );
  }


  // ==========================
  // ACTIVE COLOR
  // ==========================

  $$(".colorOption").forEach((button) => {

    button.classList.toggle(
      "active",
      button.dataset.color === state.color
    );

  });


  // ==========================
  // ACTIVE RAIL
  // ==========================

  $$(".variantOption[data-rail]").forEach((button) => {

    button.classList.toggle(
      "active",
      button.dataset.rail === state.rail
    );

  });


  // ==========================
  // ACTIVE STIFFNESS
  // ==========================

  $$(".stiffnessOption").forEach((button) => {

    button.classList.toggle(
      "active",
      button.dataset.stiffness === state.stiffness
    );

  });


  updateImages();
}


// ==============================
// COLOR SELECTION
// ==============================

$$(".colorOption").forEach((button) => {

  button.addEventListener("click", () => {

    state.color =
      button.dataset.color;

    state.image =
      button.dataset.image;

    updateUI();

  });

});


// ==============================
// RAIL SELECTION
// ==============================

$$(".variantOption[data-rail]").forEach((button) => {

  button.addEventListener("click", () => {

    state.rail =
      button.dataset.rail;

    state.price =
      Number(button.dataset.price);

    updateUI();

  });

});


// ==============================
// STIFFNESS SELECTION
// ==============================

$$(".stiffnessOption").forEach((button) => {

  button.addEventListener("click", () => {

    state.stiffness =
      button.dataset.stiffness;

    updateUI();

  });

});


// ==============================
// OPEN ORDER MODAL
// ==============================

function openOrder() {

  updateUI();

  const modal = $("#orderModal");

  if (!modal) return;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modalOpen"
  );

}


// ==============================
// CLOSE ORDER MODAL
// ==============================

function closeOrder() {

  const modal = $("#orderModal");

  if (!modal) return;

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modalOpen"
  );

}


// ==============================
// CHECKOUT BUTTONS
// ==============================

if ($("#checkoutBtn")) {

  $("#checkoutBtn").addEventListener(
    "click",
    openOrder
  );

}

if ($("#bottomBuyBtn")) {

  $("#bottomBuyBtn").addEventListener(
    "click",
    openOrder
  );

}

if ($("#headerOrder")) {

  $("#headerOrder").addEventListener(
    "click",
    openOrder
  );

}


// ==============================
// CLOSE MODAL
// ==============================

if ($("#orderClose")) {

  $("#orderClose").addEventListener(
    "click",
    closeOrder
  );

}


if ($("#orderModal")) {

  $("#orderModal").addEventListener(
    "click",
    (event) => {

      if (
        event.target === $("#orderModal")
      ) {

        closeOrder();

      }

    }
  );

}


// ==============================
// ESC KEY
// ==============================

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeOrder();

    }

  }
);


// ==============================
// QUANTITY - MINUS
// ==============================

if ($("#qtyMinus")) {

  $("#qtyMinus").addEventListener(
    "click",
    () => {

      state.quantity =
        Math.max(
          1,
          state.quantity - 1
        );

      updateUI();

    }
  );

}


// ==============================
// QUANTITY - PLUS
// ==============================

if ($("#qtyPlus")) {

  $("#qtyPlus").addEventListener(
    "click",
    () => {

      state.quantity += 1;

      updateUI();

    }
  );

}


// ==============================
// CONFIRM ORDER
// ==============================

if ($("#confirmOrder")) {

  $("#confirmOrder").addEventListener(
    "click",
    () => {

      const name =
        $("#customerName")?.value.trim() || "-";

      const address =
        $("#customerAddress")?.value.trim() || "-";

      const notes =
        $("#customerNotes")?.value.trim() || "-";


      const message = [

        "Halo FUNFINS+, saya ingin melakukan pemesanan:",

        "",

        "Product: FUNFINS+ Bulb / Rounded-Lobed Blade Only",

        `Color: ${state.color}`,

        `Rail: ${state.rail}`,

        `Stiffness: ${state.stiffness}`,

        `Quantity: ${state.quantity}`,

        `Total: ${formatPrice(
          state.price * state.quantity
        )}`,

        "",

        `Name: ${name}`,

        `Address: ${address}`,

        `Notes: ${notes}`

      ].join("\n");


      window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

    }
  );

}


// ==============================
// SCROLL PROGRESS
// ==============================

window.addEventListener(
  "scroll",
  () => {

    const max =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      max > 0
        ? (window.scrollY / max) * 100
        : 0;


    const progressBar =
      $(".progress");

    if (progressBar) {

      progressBar.style.width =
        `${progress}%`;

    }


    const header =
      $("header");

    if (header) {

      header.classList.toggle(
        "scrolled",
        window.scrollY > 30
      );

    }

  }
);


// ==============================
// LOADER
// ==============================

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        const loader =
          $(".loader");

        if (loader) {

          loader.classList.add(
            "done"
          );

        }

      },
      700
    );

  }
);


// ==============================
// INITIAL STATE
// ==============================

updateUI();
