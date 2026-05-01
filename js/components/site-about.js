const aboutContent = {
  title: "Nosotros",
  description:
    "Transformamos ingredientes en sensaciones y momentos en recuerdos. Nuestra misión es acompañar cada uno de tus encuentros con una pastelería de autor que invita a compartir. Porque entendemos que la comida es, ante todo, una excusa para estar juntos y disfrutar de lo extraordinario en cada detalle."
};

class SiteAbout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="nosotros" class="about">
        <div class="container">
          <h2>${aboutContent.title}</h2>
          <p>${aboutContent.description}</p>
        </div>
      </section>
    `;
  }
}

if (!customElements.get("site-about")) {
  customElements.define("site-about", SiteAbout);
}
