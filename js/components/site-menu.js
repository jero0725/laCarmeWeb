import { menuContent } from "../data/menu.js";

function normalizeTagLabel(tag) {
  if (!tag) {
    return "";
  }

  if (tag === "sin gluten") {
    return "Sin gluten";
  }

  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

class SiteMenu extends HTMLElement {
  constructor() {
    super();
    this._initialized = false;
    this._activeCategoryId = menuContent.categories[0]?.id || "";
    this._tabsElement = null;
    this._handleCategoryClick = null;
  }

  connectedCallback() {
    if (this._initialized) {
      return;
    }

    this.render();
    this.bindCategoryTabs();
    this._initialized = true;
  }

  disconnectedCallback() {
    if (this._tabsElement && this._handleCategoryClick) {
      this._tabsElement.removeEventListener("click", this._handleCategoryClick);
    }

    this._tabsElement = null;
    this._handleCategoryClick = null;
    this._initialized = false;
  }

  getActiveCategory() {
    const active = menuContent.categories.find((category) => category.id === this._activeCategoryId);

    return active || menuContent.categories[0] || { items: [] };
  }

  renderCard(item) {
    const imageMarkup = item.image
      ? `<img class="menu-item__image" src="${item.image}" alt="${item.title}" loading="lazy" />`
      : '<div class="menu-item__image menu-item__image--placeholder" aria-hidden="true"></div>';

    return `
      <article class="menu-item" data-item-id="${item.id}">
        <div class="menu-item__media">
          ${imageMarkup}
          ${item.tag ? `<span class="menu-item__tag menu-item__tag--${item.tag.replace(/\s+/g, "-")}">${normalizeTagLabel(item.tag)}</span>` : ""}
        </div>
        <h4 class="menu-item__title">${item.title}</h4>
        <p class="menu-item__description">${item.description}</p>
      </article>
    `;
  }

  renderGrid(items) {
    if (!items.length) {
      return '<p class="menu-empty">No hay productos cargados para esta categoría por ahora.</p>';
    }

    return `
      <div class="menu-grid">
        ${items.map((item) => this.renderCard(item)).join("")}
      </div>
    `;
  }

  render() {
    const activeCategory = this.getActiveCategory();

    this.innerHTML = `
      <section id="menu" class="menu-section">
        <div class="container">
          <header class="menu-header">
            <h1>${menuContent.title}</h1>
            <p>${menuContent.subtitle}</p>
          </header>

          <section class="menu-filter" aria-labelledby="menu-filter-heading">
            <div class="menu-filter__top">
              <h2 id="menu-filter-heading">Filtrar por categoría</h2>
              <p>Seleccioná una categoría para ver una grilla enfocada.</p>
            </div>
            <div class="menu-category-tabs" role="group" aria-label="Categorías de menú">
              ${menuContent.categories
                .map(
                  (category) => `
                    <button
                      type="button"
                      class="menu-tab ${category.id === activeCategory.id ? "is-active" : ""}"
                      data-category-id="${category.id}"
                      aria-pressed="${String(category.id === activeCategory.id)}"
                    >
                      ${category.name}
                    </button>
                  `
                )
                .join("")}
            </div>
            <div class="menu-active" aria-live="polite">
              <div class="menu-active__head">
                <h3>${activeCategory.name}</h3>
                <p>${activeCategory.description || ""}</p>
              </div>
              ${this.renderGrid(activeCategory.items || [])}
            </div>
          </section>

          <section class="menu-groups" aria-labelledby="menu-groups-heading">
            <div class="menu-groups__head">
              <h2 id="menu-groups-heading">Todo el menú por categorías</h2>
              <p>Vista completa para explorar todas las secciones a la vez.</p>
            </div>
            ${menuContent.categories
              .map(
                (category) => `
                  <section class="menu-group" id="menu-${category.id}">
                    <header class="menu-group__head">
                      <h3>${category.name}</h3>
                      <p>${category.description || ""}</p>
                    </header>
                    ${this.renderGrid(category.items || [])}
                  </section>
                `
              )
              .join("")}
          </section>
        </div>
      </section>
    `;
  }

  bindCategoryTabs() {
    this._tabsElement = this.querySelector(".menu-category-tabs");

    if (!this._tabsElement) {
      return;
    }

    this._handleCategoryClick = (event) => {
      const tab = event.target.closest(".menu-tab");

      if (!tab) {
        return;
      }

      const categoryId = tab.dataset.categoryId;

      if (!categoryId || categoryId === this._activeCategoryId) {
        return;
      }

      this._activeCategoryId = categoryId;
      this.render();
      this.bindCategoryTabs();
    };

    this._tabsElement.addEventListener("click", this._handleCategoryClick);
  }
}

if (!customElements.get("site-menu")) {
  customElements.define("site-menu", SiteMenu);
}
