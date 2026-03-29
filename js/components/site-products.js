const productsContent = {
  title: "Nuestras creaciones",
  items: [
    {
      title: "Torta de Chocolate",
      description: "Chocolate oscuro, ganache suave y decoraciones con frutos rojos."
    },
    {
      title: "Red Velvet",
      description: "Clásica con crema de queso y un toque de avellana."
    },
    {
      title: "Cheesecake Caramelizado",
      description: "Textura cremosa con salsa de caramelo salado."
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
        </div>
      </section>
    `;
  }
}

if (!customElements.get("site-products")) {
  customElements.define("site-products", SiteProducts);
}
