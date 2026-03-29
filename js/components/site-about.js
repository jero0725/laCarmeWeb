const aboutContent = {
  title: "Quiénes somos",
  description:
    "En La Carme transformamos recetas heredadas en dulces momentos. Desde 2024 elaboramos postres con amor para familias y empresas."
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
