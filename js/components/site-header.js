const headerContent = {
  brandName: "La Carme",
  brandLogo: "Recursos/Vectores/logoCompleto.svg",
  navLinks: [
    { href: "#", label: "Inicio" },
    { href: "#productos", label: "Productos" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" }
  ]
};

class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this._initialized = false;
    this._handleMenuClick = null;
    this._handleResize = null;
  }

  connectedCallback() {
    if (this._initialized) {
      return;
    }

    this.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a href="#" class="brand" aria-label="La Carme">
            <img src="${headerContent.brandLogo}" alt="La Carme logo" class="logo" />
            <span>${headerContent.brandName}</span>
          </a>
          <nav class="main-nav" aria-label="Menú principal">
            ${headerContent.navLinks
              .map((link) => `<a href="${link.href}" class="nav-link">${link.label}</a>`)
              .join("")}
          </nav>
          <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false">☰</button>
        </div>
      </header>
    `;

    this.initNavToggle();
    this._initialized = true;
  }

  disconnectedCallback() {
    const menuToggle = this.querySelector(".menu-toggle");

    if (menuToggle && this._handleMenuClick) {
      menuToggle.removeEventListener("click", this._handleMenuClick);
    }

    if (this._handleResize) {
      window.removeEventListener("resize", this._handleResize);
    }

    this._handleMenuClick = null;
    this._handleResize = null;
    this._initialized = false;
  }

  initNavToggle() {
    const menuToggle = this.querySelector(".menu-toggle");
    const nav = this.querySelector(".main-nav");

    if (!menuToggle || !nav) {
      return;
    }

    this._handleMenuClick = () => {
      nav.classList.toggle("open");
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
    };

    this._handleResize = () => {
      if (window.innerWidth >= 680 && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    };

    menuToggle.addEventListener("click", this._handleMenuClick);
    window.addEventListener("resize", this._handleResize);
  }
}

if (!customElements.get("site-header")) {
  customElements.define("site-header", SiteHeader);
}
