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
          <p><strong>${contactContent.emailLabel}:</strong> <a href="mailto:${contactContent.email}">${contactContent.email}</a></p>
          <p><strong>${contactContent.phoneLabel}:</strong> <a href="tel:${contactContent.phone.replace(/\s+/g, "")}">${contactContent.phone}</a></p>
        </div>
      </section>
    `;
  }
}

if (!customElements.get("site-contact")) {
  customElements.define("site-contact", SiteContact);
}
