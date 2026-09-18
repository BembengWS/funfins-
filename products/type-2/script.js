const product={
  name:"FUNFINS+ Rounded / Smooth Blade Only",
  image:"funfins-type2-red-ferrari.jpg",
  colors:[
    {name:"Red Ferrari",image:"funfins-type2-red-ferrari.jpg"},
    {name:"Black",image:"funfins-type2-black.jpg"},
    {name:"Ocean Blue",image:"funfins-type2-ocean-blue.jpg"},
    {name:"Forest Green",image:"funfins-type2-forest-green.jpg"},
    {name:"Pearl White",image:"funfins-type2-pearl-white.jpg"},
    {name:"Sun Yellow",image:"funfins-type2-sun-yellow.jpg"}
  ],
  rails:{
    "Water Rails":1500000,
    "U-List":1000000
  }
};

let selected={
  rail:"Water Rails",
  stiffness:"Medium",
  color:"Red Ferrari",
  colorImage:"funfins-type2-red-ferrari.jpg",
  qty:1
};

const $=s=>document.querySelector(s);

const money=n=>"Rp "+n.toLocaleString("id-ID");

function selectedPrice(){
  return product.rails[selected.rail];
}

function updateProductPrice(){
  $(".price").textContent=money(selectedPrice());
}

function updateRail(button){
  document.querySelectorAll(".variantOption").forEach(item=>{
    item.classList.remove("active");
  });

  button.classList.add("active");
  selected.rail=button.dataset.rail;

  $("#railValue").textContent=selected.rail.toUpperCase();

  updateProductPrice();
}

function updateStiffness(button){
  document.querySelectorAll(".stiffnessOption").forEach(item=>{
    item.classList.remove("active");
  });

  button.classList.add("active");
  selected.stiffness=button.dataset.stiffness;

  $("#stiffnessValue").textContent=selected.stiffness.toUpperCase();
}

function updateSummary(){
  $("#summaryColor").textContent=selected.color;
  $("#summaryRail").textContent=selected.rail;
  $("#summaryStiffness").textContent=selected.stiffness;
  $("#summaryQty").textContent=selected.qty;
  $("#summaryTotal").textContent=money(selectedPrice()*selected.qty);
}

function openOrder(){
  updateSummary();
  $("#orderModal").classList.add("open");
  document.body.classList.add("modalOpen");
}

function closeOrder(){
  $("#orderModal").classList.remove("open");
  document.body.classList.remove("modalOpen");
}

function changeQty(amount){
  selected.qty=Math.max(1,selected.qty+amount);
  updateSummary();
}

function confirmOrder(){
  const total=selectedPrice()*selected.qty;

  const message=
    "Halo FUNFINS,%0A%0A"+
    "*Saya ingin melakukan konfirmasi pesanan:*%0A%0A"+
    "Produk: "+encodeURIComponent(product.name)+"%0A"+
    "Rail: "+encodeURIComponent(selected.rail)+"%0A"+
    "Stiffness: "+encodeURIComponent(selected.stiffness)+"%0A"+
    "Color: "+encodeURIComponent(selected.color)+"%0A"+
    "Quantity: "+selected.qty+"%0A"+
    "Harga/unit: "+encodeURIComponent(money(selectedPrice()))+"%0A"+
    "Total: "+encodeURIComponent(money(total))+"%0A%0A"+
    "Mohon konfirmasi ketersediaan dan proses pesanannya.%0A%0A"+
    "Nama:%0AAlamat:%0ACatatan:";

  window.open(
    "https://wa.me/6289638142670?text="+message,
    "_blank"
  );
}


document.querySelectorAll(".colorOption").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".colorOption").forEach(item=>item.classList.remove("active"));
    button.classList.add("active");

    selected.color=button.dataset.color;
    selected.colorImage=button.dataset.image;

    const image=document.querySelector(".productPhoto img");
    const summaryImage=document.querySelector(".summaryImage img");
    if(image){
      image.style.opacity="0.35";
      setTimeout(()=>{
        image.src=selected.colorImage;
        image.alt="FUNFINS+ Rounded / Smooth Blade Only — "+selected.color;
        image.style.opacity="1";
      },120);
    }
    if(summaryImage){
      summaryImage.src=selected.colorImage;
      summaryImage.alt="FUNFINS+ Rounded / Smooth Blade Only — "+selected.color;
    }

    $("#colorValue").textContent=selected.color.toUpperCase();
    const specColor=$("#specColor");
    if(specColor) specColor.textContent=selected.color.toUpperCase();

    updateSummary();
  });
});

document.querySelectorAll(".variantOption").forEach(button=>{
  button.addEventListener("click",()=>updateRail(button));
});

document.querySelectorAll(".stiffnessOption").forEach(button=>{
  button.addEventListener("click",()=>updateStiffness(button));
});

$("#checkoutBtn").addEventListener("click",openOrder);
$("#headerOrder").addEventListener("click",openOrder);
$("#orderClose").addEventListener("click",closeOrder);
$("#qtyMinus").addEventListener("click",()=>changeQty(-1));
$("#qtyPlus").addEventListener("click",()=>changeQty(1));
$("#confirmOrder").addEventListener("click",confirmOrder);

$("#orderModal").addEventListener("click",event=>{
  if(event.target===$("#orderModal")){
    closeOrder();
  }
});

addEventListener("keydown",event=>{
  if(event.key==="Escape"){
    closeOrder();
  }
});

addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-innerHeight;

  $(".progress").style.width=
    (max>0 ? scrollY/max*100 : 0)+"%";

  document.querySelector("header")
    .classList.toggle("scrolled",scrollY>30);
});

addEventListener("load",()=>{
  setTimeout(()=>{
    $(".loader").classList.add("done");
  },900);
});

$("#railValue").textContent=selected.rail.toUpperCase();
$("#stiffnessValue").textContent=selected.stiffness.toUpperCase();
updateProductPrice();
