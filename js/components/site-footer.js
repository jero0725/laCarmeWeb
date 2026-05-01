const footerContent = {
  copyright: "© 2026 La Carme Pastelería. Todos los derechos reservados."
};

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <p>${footerContent.copyright}</p>
        </div>
      </footer>
    `;
  }
}

if (!customElements.get("site-footer")) {
  customElements.define("site-footer", SiteFooter);
}
