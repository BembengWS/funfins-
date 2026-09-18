const product = {
  name: "FUNFINS+ Bulb / Rounded-Lobed Blade Only",

  image: "funfins-type3-red-ferrari.jpg",

  colors: [
    {
      name: "Red Ferrari",
      image: "funfins-type3-red-ferrari.jpg"
    },
    {
      name: "Black",
      image: "funfins-type3-black.jpg"
    },
    {
      name: "Ocean Blue",
      image: "funfins-type3-ocean-blue.jpg"
    },
    {
      name: "Forest Green",
      image: "funfins-type3-forest-green.jpg"
    },
    {
      name: "Pearl White",
      image: "funfins-type3-pearl-white.jpg"
    },
    {
      name: "Sun Yellow",
      image: "funfins-type3-sun-yellow.jpg"
    }
  ],

  rails: {
    "Water Rails": 1500000,
    "U-List": 1000000
  }
};


let selected = {
  rail: "Water Rails",
  stiffness: "Medium",
  color: "Red Ferrari",
  colorImage: "funfins-type3-red-ferrari.jpg",
  qty: 1
};


const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);


function money(number) {
  return "Rp " + number.toLocaleString("id-ID");
}


function selectedPrice() {
  return product.rails[selected.rail];
}


/* =====================================================
   UPDATE PRICE
===================================================== */

function updateProductPrice() {

  const price = money(selectedPrice());

  const priceElement = $("#price");

  if (priceElement) {
    priceElement.textContent = price;
  }

  const totalPrice = $("#totalPrice");

  if (totalPrice) {
    totalPrice.textContent =
      money(selectedPrice() * selected.qty);
  }
}


/* =====================================================
   COLOR
===================================================== */

function updateColor(button) {

  $$(".colorOption").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");

  selected.color = button.dataset.color;
  selected.colorImage = button.dataset.image;


  const mainImage = $("#mainImage");

  const featureImage = $("#featureImage");


  if (mainImage) {

    mainImage.style.opacity = "0.35";

    setTimeout(() => {

      mainImage.src = selected.colorImage;

      mainImage.alt =
        "FUNFINS+ Bulb / Rounded-Lobed Blade Only — " +
        selected.color;

      mainImage.style.opacity = "1";

    }, 120);

  }


  if (featureImage) {

    featureImage.style.opacity = "0.35";

    setTimeout(() => {

      featureImage.src = selected.colorImage;

      featureImage.alt =
        "FUNFINS+ Bulb / Rounded-Lobed Blade Only — " +
        selected.color;

      featureImage.style.opacity = "1";

    }, 120);

  }


  updateSummary();
}


/* =====================================================
   RAIL
===================================================== */

function updateRail(button) {

  $$(".railOption").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");

  selected.rail = button.dataset.rail;

  updateProductPrice();

  updateSummary();
}


/* =====================================================
   STIFFNESS
===================================================== */

function updateStiffness(button) {

  $$(".stiffnessOption").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");

  selected.stiffness =
    button.dataset.stiffness;

  updateSummary();
}


/* =====================================================
   SUMMARY
===================================================== */

function updateSummary() {

  const summaryColor = $("#summaryColor");

  const summaryRail = $("#summaryRail");

  const summaryStiffness =
    $("#summaryStiffness");

  const quantity = $("#quantity");

  const totalPrice = $("#totalPrice");


  if (summaryColor) {
    summaryColor.textContent =
      selected.color.toUpperCase();
  }


  if (summaryRail) {
    summaryRail.textContent =
      selected.rail.toUpperCase();
  }


  if (summaryStiffness) {
    summaryStiffness.textContent =
      selected.stiffness.toUpperCase();
  }


  if (quantity) {
    quantity.textContent =
      selected.qty;
  }


  if (totalPrice) {
    totalPrice.textContent =
      money(
        selectedPrice() *
        selected.qty
      );
  }


  updateProductPrice();
}


/* =====================================================
   OPEN ORDER
===================================================== */

function openOrder() {

  updateSummary();

  const modal = $("#orderModal");

  if (!modal) return;

  modal.classList.add("open");

  document.body.classList.add("modalOpen");
}


/* =====================================================
   CLOSE ORDER
===================================================== */

function closeOrder() {

  const modal = $("#orderModal");

  if (!modal) return;

  modal.classList.remove("open");

  document.body.classList.remove("modalOpen");
}


/* =====================================================
   QUANTITY
===================================================== */

function changeQty(amount) {

  selected.qty =
    Math.max(
      1,
      selected.qty + amount
    );

  updateSummary();
}


/* =====================================================
   CONFIRM ORDER
===================================================== */

function confirmOrder() {

  const total =
    selectedPrice() *
    selected.qty;


  const customerName =
    $("#customerName")?.value.trim() || "-";


  const customerAddress =
    $("#customerAddress")?.value.trim() || "-";


  const customerNotes =
    $("#customerNotes")?.value.trim() || "-";


  const message =

    "Halo FUNFINS,%0A%0A" +

    "*Saya ingin melakukan pemesanan:*%0A%0A" +

    "Produk: " +
    encodeURIComponent(product.name) +
    "%0A" +

    "Color: " +
    encodeURIComponent(selected.color) +
    "%0A" +

    "Rail: " +
    encodeURIComponent(selected.rail) +
    "%0A" +

    "Stiffness: " +
    encodeURIComponent(selected.stiffness) +
    "%0A" +

    "Quantity: " +
    selected.qty +
    "%0A" +

    "Harga/unit: " +
    encodeURIComponent(
      money(selectedPrice())
    ) +
    "%0A" +

    "Total: " +
    encodeURIComponent(
      money(total)
    ) +

    "%0A%0A" +

    "*Data Pemesan*%0A%0A" +

    "Nama: " +
    encodeURIComponent(customerName) +
    "%0A" +

    "Alamat: " +
    encodeURIComponent(customerAddress) +
    "%0A" +

    "Catatan: " +
    encodeURIComponent(customerNotes);


  window.open(
    "https://wa.me/6289638142670?text=" +
    message,
    "_blank"
  );
}


/* =====================================================
   COLOR EVENTS
===================================================== */

$$(".colorOption").forEach(button => {

  button.addEventListener(
    "click",
    () => updateColor(button)
  );

});


/* =====================================================
   RAIL EVENTS
===================================================== */

$$(".railOption").forEach(button => {

  button.addEventListener(
    "click",
    () => updateRail(button)
  );

});


/* =====================================================
   STIFFNESS EVENTS
===================================================== */

$$(".stiffnessOption").forEach(button => {

  button.addEventListener(
    "click",
    () => updateStiffness(button)
  );

});


/* =====================================================
   CHECKOUT BUTTON
===================================================== */

const buyBtn = $("#buyBtn");

if (buyBtn) {

  buyBtn.addEventListener(
    "click",
    openOrder
  );

}


const bottomBuyBtn =
  $("#bottomBuyBtn");

if (bottomBuyBtn) {

  bottomBuyBtn.addEventListener(
    "click",
    openOrder
  );

}


/* =====================================================
   MODAL CLOSE
===================================================== */

const closeModal =
  $("#closeModal");

if (closeModal) {

  closeModal.addEventListener(
    "click",
    closeOrder
  );

}


/* =====================================================
   QUANTITY BUTTONS
===================================================== */

const minusQty =
  $("#minusQty");

if (minusQty) {

  minusQty.addEventListener(
    "click",
    () => changeQty(-1)
  );

}


const plusQty =
  $("#plusQty");

if (plusQty) {

  plusQty.addEventListener(
    "click",
    () => changeQty(1)
  );

}


/* =====================================================
   CONFIRM
===================================================== */

const confirmButton =
  $("#confirmOrder");

if (confirmButton) {

  confirmButton.addEventListener(
    "click",
    confirmOrder
  );

}


/* =====================================================
   CLICK OUTSIDE MODAL
===================================================== */

const orderModal =
  $("#orderModal");

if (orderModal) {

  orderModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        orderModal
      ) {

        closeOrder();

      }

    }
  );

}


/* =====================================================
   ESC KEY
===================================================== */

addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeOrder();

    }

  }
);


/* =====================================================
   SCROLL PROGRESS
===================================================== */

addEventListener(
  "scroll",
  () => {

    const max =
      document.documentElement
        .scrollHeight -
      innerHeight;


    const progress =
      max > 0
        ? scrollY / max * 100
        : 0;


    const progressBar =
      $(".progress");


    if (progressBar) {

      progressBar.style.width =
        progress + "%";

    }


    const header =
      document.querySelector("header");


    if (header) {

      header.classList.toggle(
        "scrolled",
        scrollY > 30
      );

    }

  }
);


/* =====================================================
   LOADER
===================================================== */

addEventListener(
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
      900
    );

  }
);


/* =====================================================
   INITIAL STATE
===================================================== */

updateSummary();
updateProductPrice();
