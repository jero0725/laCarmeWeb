const headerContent = {
  brandName: "La Carme",
  brandLogo: "Recursos/logoSimpleDorado.png"
};

function isMenuPage() {
  const path = window.location.pathname.toLowerCase();
  return path.endsWith("/menu.html") || path.endsWith("menu.html");
}

function getNavLinks() {
  const inMenuPage = isMenuPage();
  const homePrefix = inMenuPage ? "index.html" : "";

  return [
    { href: inMenuPage ? "index.html" : "#", label: "Inicio" },
    { href: `${homePrefix}#productos`, label: "Productos" },
    { href: `${homePrefix}#nosotros`, label: "Nosotros" },
    { href: `${homePrefix}#contacto`, label: "Contacto" },
    { href: inMenuPage ? "#menu" : "menu.html", label: "Menú" }
  ];
}

class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this._initialized = false;
    this._handleMenuClick = null;
    this._handleResize = null;
    this._handleNavLinkClick = null;
  }

  connectedCallback() {
    if (this._initialized) {
      return;
    }

    const navLinks = getNavLinks();

    this.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a href="${isMenuPage() ? "index.html" : "#"}" class="brand" aria-label="La Carme">
            <img src="${headerContent.brandLogo}" alt="La Carme logo" class="logo" />
            <span>${headerContent.brandName}</span>
          </a>
          <nav class="main-nav" aria-label="Menú principal">
            ${navLinks
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

    if (this._handleNavLinkClick) {
      this.querySelectorAll(".nav-link").forEach((link) => {
        link.removeEventListener("click", this._handleNavLinkClick);
      });
    }

    this._handleMenuClick = null;
    this._handleResize = null;
    this._handleNavLinkClick = null;
    this._initialized = false;
  }

  initNavToggle() {
    const menuToggle = this.querySelector(".menu-toggle");
    const nav = this.querySelector(".main-nav");

    if (!menuToggle || !nav) {
      return;
    }

    const setMenuState = (isOpen) => {
      nav.classList.toggle("open", isOpen);
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    };

    this._handleMenuClick = () => {
      setMenuState(!nav.classList.contains("open"));
    };

    this._handleResize = () => {
      if (window.innerWidth >= 680) {
        setMenuState(false);
      }
    };

    this._handleNavLinkClick = () => {
      if (window.innerWidth < 680) {
        setMenuState(false);
      }
    };

    menuToggle.addEventListener("click", this._handleMenuClick);
    window.addEventListener("resize", this._handleResize);
    this.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", this._handleNavLinkClick);
    });
    setMenuState(false);
  }
}

if (!customElements.get("site-header")) {
  customElements.define("site-header", SiteHeader);
}
