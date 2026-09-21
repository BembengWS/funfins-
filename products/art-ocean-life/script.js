const shapes=[
{n:1,name:'Wave / Notch',purpose:'POWER + RESPONSE',desc:'A dynamic profile built around a pronounced wave/notch finish, emphasizing a responsive and energetic blade character.'},
{n:2,name:'Rounded / Smooth',purpose:'BALANCE + COMFORT',desc:'A clean rounded profile with a smooth transition and balanced character, suited to divers who prefer a softer and more approachable silhouette.'},
{n:3,name:'Bulb / Rounded-Lobed',purpose:'STABILITY + EFFICIENCY',desc:'A fuller rounded-lobed silhouette with a stable, composed character and a distinctive visual identity.'},
{n:4,name:'Crescent / Twin-Notch',purpose:'PRECISION + RESPONSE',desc:'A sculpted crescent profile defined by a pronounced twin-notch finish, combining a distinctive silhouette with a responsive character.'},
{n:5,name:'Wave-S',purpose:'FLOW + RESPONSE',desc:'A refined S-like wave transition that gives the blade a flowing silhouette and a progressive visual character.'},
{n:6,name:'V-Cut',purpose:'DIRECT + CONTROLLED',desc:'A defined central V-cut creates a sharper, more technical silhouette with a direct and controlled character.'},
{n:7,name:'Wing / Up-Sweep',purpose:'LIFT + FLOW',desc:'An up-swept winged silhouette with raised outer shoulders, designed for an expressive profile and flowing visual character.'}
];
document.querySelector('#shapes').innerHTML=shapes.map(s=>`<article class="shapeCard"><img src="images/ocean-life-shape-${s.n}.png" alt="FUNFINS+ Ocean Life — ${s.name}"><div class="shapeBody"><div class="shapeNo">SHAPE 0${s.n}</div><h3>${s.name}<span>OCEAN LIFE ART COLLECTION</span></h3><p>${s.desc}</p><div class="purpose">${s.purpose}</div></div></article>`).join('');
