const rentalSearchItems = [
  { name: "Fins + Foot Pocket", type: "RENTAL GEAR", href: "#rental-inquiry" },
  { name: "Snorkel", type: "RENTAL GEAR", href: "#rental-inquiry" },
  { name: "Low Volume Mask", type: "RENTAL GEAR", href: "#rental-inquiry" },
  { name: "Dive Package", type: "RENTAL PACKAGE", href: "#package" }
];
const $r = (s) => document.querySelector(s);
if ($r("#searchBtn")) $r("#searchBtn").onclick = () => $r("#search").classList.add("open");
if ($r("#closeSearch")) $r("#closeSearch").onclick = () => $r("#search").classList.remove("open");
if ($r("#searchInput")) $r("#searchInput").oninput = (e) => {
  const q = e.target.value.toLowerCase().trim();
  $r("#results").innerHTML = rentalSearchItems.filter(x => (x.name + x.type).toLowerCase().includes(q)).map(x => `<a class="result" href="${x.href}"><span>${x.name}</span><span>${x.type}</span></a>`).join("");
};
window.addEventListener("load", () => setTimeout(() => $r(".loader")?.classList.add("done"), 700));
