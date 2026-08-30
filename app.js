const state={clients:[]};

const views={
inicio:()=>`<section class="content"><h1>ARGO</h1><p class="muted">Aplicación comercial para mediación de sistemas de seguridad.</p>
<div class="cards">
<div class="card"><h3>Clientes</h3><strong>${state.clients.length}</strong><p class="muted">CRM central</p></div>
<div class="card"><h3>Catálogos</h3><strong>0</strong><p class="muted">Preparado por compañía</p></div>
<div class="card"><h3>Presupuestos</h3><strong>0</strong><p class="muted">Pendientes</p></div>
<div class="card"><h3>Agente Quique</h3><strong>Activo</strong><p class="muted">Asistente comercial</p></div>
</div>
<div class="panel"><h2>Próximos módulos</h2><p>Catálogos y tarifas vigentes, ofertas, packs, extras, presupuestos, comparativas, RGPD, trazabilidad y firma.</p></div></section>`,

clientes:()=>`<section class="content"><h1>CRM de clientes</h1>
<div class="panel"><div class="row"><input id="clientName" class="input" placeholder="Nombre del cliente"><input id="clientPhone" class="input" placeholder="Teléfono"><button class="btn" id="addClient">Añadir cliente</button></div></div>
<div class="panel"><h2>Clientes</h2><ul class="list">${state.clients.length?state.clients.map((c,i)=>`<li><strong>${esc(c.name)}</strong> · ${esc(c.phone)} <span class="muted">· ID ${i+1}</span></li>`).join(""):"<li class='muted'>Todavía no hay clientes.</li>"}</ul></div></section>`,

catalogos:()=>module("Catálogos","Catálogos independientes por compañía y control de versiones. Aquí se incorporarán Verisure, Prosegur, ADT, Segurma y Vodafone."),

presupuestos:()=>module("Presupuestos","Creación de presupuestos con precios y cuotas vigentes, extras, aceptación, fecha/hora y trazabilidad."),

comparativas:()=>module("Comparativas","Comparativa entre la oferta nueva y la compañía/sistema actual del cliente."),

quique:()=>`<section class="content"><h1>Agente Quique</h1><p class="muted">Asistente comercial integrado dentro de ARGO.</p>
<div class="panel chat"><div id="messages" class="messages"><div class="msg bot"><strong>Agente Quique:</strong> Estoy preparado. Puedo ayudarte a preparar un presupuesto, revisar un cliente o explicar qué información falta antes de ofertar.</div></div>
<div class="chatbar"><input id="chatInput" class="input" placeholder="Escribe una petición..."><button class="btn" id="sendChat">Enviar</button></div></div></section>`
};

function module(title,text){return `<section class="content"><h1>${title}</h1><div class="panel"><p>${text}</p><p class="muted">Módulo preparado para la siguiente fase de desarrollo.</p></div></section>`}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}

function render(view="inicio"){
 document.querySelectorAll(".nav").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 document.getElementById("app").innerHTML=views[view]();
 if(view==="clientes"){
  document.getElementById("addClient").onclick=()=>{
   const name=document.getElementById("clientName").value.trim(), phone=document.getElementById("clientPhone").value.trim();
   if(!name)return;
   state.clients.push({name,phone}); render("clientes");
  };
 }
 if(view==="quique"){
  const send=()=>{
   const input=document.getElementById("chatInput"), text=input.value.trim(); if(!text)return;
   const box=document.getElementById("messages");
   box.insertAdjacentHTML("beforeend",`<div class="msg user">${esc(text)}</div>`);
   const answer=reply(text);
   box.insertAdjacentHTML("beforeend",`<div class="msg bot"><strong>Agente Quique:</strong> ${esc(answer)}</div>`);
   input.value=""; box.scrollTop=box.scrollHeight;
  };
  document.getElementById("sendChat").onclick=send;
  document.getElementById("chatInput").addEventListener("keydown",e=>{if(e.key==="Enter")send()});
 }
}
function reply(t){
 const x=t.toLowerCase();
 if(x.includes("presupuesto")) return "Para preparar un presupuesto necesito cliente, tipo de instalación, compañía/oferta aplicable y los equipos adicionales. Usaré las condiciones vigentes disponibles en ARGO.";
 if(x.includes("cliente")) return "Puedo trabajar con la ficha del cliente y registrar la situación actual para después comparar la nueva propuesta.";
 if(x.includes("precio")||x.includes("cuota")) return "El precio y la cuota deben salir del catálogo vigente, no de un histórico.";
 return "Indícame si quieres trabajar con un cliente, preparar un presupuesto, revisar una oferta o hacer una comparativa.";
}
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>render(b.dataset.view));
render();
