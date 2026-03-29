const productsContent = {
  title: "Nuestras creaciones destacadas",
  items: [
    {
      title: "Alfajores Bariloche",
      description: "Rellenos la mejor crema de chocolate y dulce de leche y bañados en chocolate."
    },
    {
      title: "Brownie con frutos secos",
      description: "El brownie más húmedo del país con un top de ganache de chocolate y frutos secos."
    },
    {
      title: "Galletas con chips",
      description: "Galletas con chips de chocolate, crujientes por fuera y suaves por dentro."
    }
  ]
};

class SiteProducts extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="productos" class="products-section">
        <div class="container">
          <h2>${productsContent.title}</h2>
          <div class="products-grid">
            ${productsContent.items
              .map(
                (item) => `
                  <article class="product-card">
                    <div class="product-card__image" aria-hidden="true"></div>
                    <h3 class="product-card__title">${item.title}</h3>
                    <p>${item.description}</p>
                  </article>
                `
              )
              .join("")}
          </div>
          <div class="products-more">
            <a href="menu.html" class="btn-secondary products-more-btn">Ver más productos</a>
          </div>
        </div>
      </section>
    `;
  }
}

if (!customElements.get("site-products")) {
  customElements.define("site-products", SiteProducts);
}
