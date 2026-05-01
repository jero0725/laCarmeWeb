import { menuContent } from "../data/menu.js";

const productsTitle = "Nuestras creaciones destacadas";

class SiteProducts extends HTMLElement {
  connectedCallback() {
    const items = menuContent.categories.flatMap((cat) => cat.items).filter((item) => item.tag === "popular");

    this.innerHTML = `
      <section id="productos" class="products-section">
        <div class="container">
          <h2>${productsTitle}</h2>
          <div class="products-grid">
            ${items
              .map(
                (item) => `
                  <article class="product-card">
                    <div class="product-card__image" aria-hidden="true"><img src="${item.image}" alt="${item.title}"></div>
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
