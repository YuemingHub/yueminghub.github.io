(() => {
  const navToggle = document.querySelector("[data-nav-toggle]");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
    });
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (!target.closest(".site-header") && document.body.classList.contains("nav-open")) {
      document.body.classList.remove("nav-open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
      document.body.classList.remove("nav-open");
      navToggle?.setAttribute("aria-expanded", "false");
      navToggle?.focus();
    }
  });
})();
