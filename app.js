const state = {
  clients: []
};

const views = {

  inicio: () => `
    <section class="content">
      <h1>ARGO</h1>
      <p class="muted">Aplicación comercial para mediación de sistemas de seguridad.</p>

      <div class="cards">
        <div class="card">
          <h3>Clientes</h3>
          <strong>${state.clients.length}</strong>
          <p class="muted">CRM central</p>
        </div>

        <div class="card">
          <h3>Catálogos</h3>
          <strong>0</strong>
          <p class="muted">Por compañía</p>
        </div>

        <div class="card">
          <h3>Presupuestos</h3>
          <strong>0</strong>
          <p class="muted">Pendientes</p>
        </div>

        <div class="card">
          <h3>Agente Quique</h3>
          <strong>Activo</strong>
          <p class="muted">Asistente comercial</p>
        </div>
      </div>

      <div class="panel">
        <h2>ARGO — Agente Quique</h2>
        <p>
          Sistema comercial centralizado para clientes, catálogos,
          presupuestos y comparativas.
        </p>
      </div>
    </section>
  `,

  clientes: () => `
    <section class="content">
      <h1>CRM de clientes</h1>

      <div class="panel">
        <h2>Nuevo cliente</h2>

        <div class="row">
          <input
            id="clientName"
            class="input"
            placeholder="Nombre del cliente"
          >

          <input
            id="clientPhone"
            class="input"
            placeholder="Teléfono"
          >

          <button id="addClient" class="btn">
            Añadir cliente
          </button>
        </div>
      </div>

      <div class="panel">
        <h2>Clientes registrados</h2>

        <ul class="list">
          ${
            state.clients.length === 0
              ? `<li>No hay clientes registrados.</li>`
              : state.clients.map((client, index) => `
                  <li>
                    <strong>${escapeHtml(client.name)}</strong>
                    — ${escapeHtml(client.phone)}
                  </li>
                `).join("")
          }
        </ul>
      </div>
    </section>
  `,

  catalogos: () => `
    <section class="content">
      <h1>Catálogos</h1>

      <div class="panel">
        <h2>Catálogos por compañía</h2>
        <p>
          Aquí incorporaremos los catálogos de Verisure,
          Prosegur, ADT, Segurma y Vodafone.
        </p>

        <button class="btn" onclick="alert('Módulo de catálogos en construcción')">
          Ver catálogos
        </button>
      </div>
    </section>
  `,

  presupuestos: () => `
    <section class="content">
      <h1>Presupuestos</h1>

      <div class="panel">
        <h2>Crear presupuesto</h2>
        <p>
          Aquí construiremos los presupuestos utilizando
          precios y cuotas vigentes.
        </p>

        <button class="btn" onclick="alert('Módulo de presupuestos en construcción')">
          Nuevo presupuesto
        </button>
      </div>
    </section>
  `,

  comparativas: () => `
    <section class="content">
      <h1>Comparativas</h1>

      <div class="panel">
        <h2>Comparativa comercial</h2>
        <p>
          Comparación entre la oferta nueva y el sistema
          actual del cliente.
        </p>

        <button class="btn" onclick="alert('Módulo de comparativas en construcción')">
          Nueva comparativa
        </button>
      </div>
    </section>
  `,

  quique: () => `
    <section class="content">
      <h1>Agente Quique</h1>

      <div class="panel chat">
        <div id="messages" class="messages">
          <div class="msg bot">
            <strong>Agente Quique:</strong>
            Estoy preparado para ayudarte.
          </div>
        </div>

        <div class="chatbar">
          <input
            id="chatInput"
            class="input"
            placeholder="Escribe una petición..."
          >

          <button id="sendChat" class="btn">
            Enviar
          </button>
        </div>
      </div>
    </section>
  `
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function render(view = "inicio") {

  document.querySelectorAll(".nav").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.view === view
    );
  });

  const app = document.getElementById("app");

  if (app && views[view]) {
    app.innerHTML = views[view]();
  }

  activarFunciones(view);
}

function activarFunciones(view) {

  if (view === "clientes") {

    const addClient = document.getElementById("addClient");

    if (addClient) {
      addClient.onclick = () => {

        const name = document
          .getElementById("clientName")
          .value
          .trim();

        const phone = document
          .getElementById("clientPhone")
          .value
          .trim();

        if (!name) {
          alert("Introduce el nombre del cliente.");
          return;
        }

        state.clients.push({
          name: name,
          phone: phone
        });

        render("clientes");
      };
    }
  }

  if (view === "quique") {

    const send = () => {

      const input = document.getElementById("chatInput");
      const box = document.getElementById("messages");

      if (!input || !box) return;

      const text = input.value.trim();

      if (!text) return;

      box.insertAdjacentHTML(
        "beforeend",
        `<div class="msg user">${escapeHtml(text)}</div>`
      );

      const answer = responder(text);

      box.insertAdjacentHTML(
        "beforeend",
        `<div class="msg bot">
          <strong>Agente Quique:</strong>
          ${escapeHtml(answer)}
        </div>`
      );

      input.value = "";
      box.scrollTop = box.scrollHeight;
    };

    const sendButton = document.getElementById("sendChat");
    const input = document.getElementById("chatInput");

    if (sendButton) {
      sendButton.onclick = send;
    }

    if (input) {
      input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
          send();
        }
      });
    }
  }
}

function responder(text) {

  const x = text.toLowerCase();

  if (x.includes("presupuesto")) {
    return "Para preparar un presupuesto necesito los datos del cliente, tipo de instalación y compañía u oferta.";
  }

  if (x.includes("cliente")) {
    return "Puedes gestionar los clientes desde el módulo CRM.";
  }

  if (x.includes("precio") || x.includes("cuota")) {
    return "Los precios y cuotas deberán proceder del catálogo vigente.";
  }

  if (x.includes("comparativa")) {
    return "Podemos preparar una comparativa entre el sistema actual del cliente y la nueva oferta.";
  }

  return "Indícame qué necesitas y te ayudaré dentro de ARGO.";
}

document.querySelectorAll(".nav").forEach(button => {

  button.addEventListener("click", () => {
    render(button.dataset.view);
  });

});

render("inicio");
