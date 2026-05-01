import "./components/site-header.js";
import "./components/site-hero.js";
import "./components/site-products.js";
import "./components/site-menu.js";
import "./components/site-about.js";
import "./components/site-contact.js";
import "./components/site-footer.js";

function markFadeTargets() {
  const targets = document.querySelectorAll(
    "site-products > section, site-about > section, site-contact > section, site-footer .site-footer"
  );

  targets.forEach((target) => {
    target.classList.add("fade-in");
  });
}

function initRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -120px 0px"
    }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

requestAnimationFrame(() => {
  markFadeTargets();
  initRevealObserver();
});
