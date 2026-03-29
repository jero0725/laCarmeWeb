const contactContent = {
  title: "Contacto",
  intro: "Escríbenos y armamos tu pedido especial.",
  emailLabel: "Correo",
  email: "hola@lacarme.com",
  phoneLabel: "Teléfono",
  phone: "+54 9 11 1234-5678"
};

class SiteContact extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="contacto" class="contact">
        <div class="container">
          <h2>${contactContent.title}</h2>
          <p>${contactContent.intro}</p>
          <p><strong>${contactContent.emailLabel}:</strong> ${contactContent.email}</p>
          <p><strong>${contactContent.phoneLabel}:</strong> ${contactContent.phone}</p>
        </div>
      </section>
    `;
  }
}

if (!customElements.get("site-contact")) {
  customElements.define("site-contact", SiteContact);
}
