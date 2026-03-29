const heroContent = {
  title: "Pasteles artesanales que enamoran",
  description: "Sabores tradicionales, ingredientes frescos y el toque dulce de la familia carme.",
  ctaLabel: "Ver nuestro catálogo",
  ctaHref: "#productos",
  logoSrc: "Recursos/Vectores/logoCompleto.svg",
  logoAlt: "La Carme logo"
};

class SiteHero extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero">
        <div class="container hero-content">
          <div class="hero-left">
            <h1>${heroContent.title}</h1>
            <p>${heroContent.description}</p>
            <a href="${heroContent.ctaHref}" class="btn-primary">${heroContent.ctaLabel}</a>
          </div>
          <div class="hero-right">
            <img src="${heroContent.logoSrc}" alt="${heroContent.logoAlt}" class="logo-hero" />
          </div>
        </div>
      </section>
    `;
  }
}

if (!customElements.get("site-hero")) {
  customElements.define("site-hero", SiteHero);
}
