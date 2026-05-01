const contactContent = {
  title: "Contacto",
  intro: "Escríbenos y armamos tu pedido especial.",
  instagramLabel: "Instagram",
  instagram: "lacarme.pasteleria",
};

class SiteContact extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="contacto" class="contact">
      <div class="container">
        <h2>${contactContent.title}</h2>
        <p>${contactContent.intro}</p>
        <p><strong>${contactContent.instagramLabel}:</strong> <a href="https://www.instagram.com/${contactContent.instagram}" target="_blank">${contactContent.instagram}</a></p>
      </div>
      </section>
    `;
  }
}

if (!customElements.get("site-contact")) {
  customElements.define("site-contact", SiteContact);
}
