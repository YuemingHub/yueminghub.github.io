(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initReveal();
    initAccordions();
  });

  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initMobileNav() {
    var toggle = document.querySelector(".js-nav-toggle");
    var panel = document.querySelector(".js-nav-mobile");
    var close = document.querySelector(".js-nav-close");
    var previousFocus = null;

    if (!toggle || !panel) return;

    function getFocusable() {
      return Array.prototype.slice.call(
        panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter(function (node) {
        return !node.hasAttribute("hidden");
      });
    }

    function openNav() {
      previousFocus = document.activeElement;
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
      if (close) close.focus();
    }

    function closeNav() {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    }

    toggle.addEventListener("click", function () {
      if (panel.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (close) close.addEventListener("click", closeNav);

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    panel.addEventListener("click", function (event) {
      if (event.target === panel) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (!panel.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        closeNav();
        return;
      }

      if (event.key !== "Tab") return;

      var focusable = getFocusable();
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (reducedMotion()) {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    document.body.classList.add("motion-enabled");

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: "0px 0px -56px 0px"
    });

    nodes.forEach(function (node) {
      var rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        node.classList.add("is-visible");
      }
      observer.observe(node);
    });
  }

  function initAccordions() {
    document.querySelectorAll(".accordion-item").forEach(function (item, index) {
      var button = item.querySelector(".js-accordion-toggle");
      var panel = item.querySelector(".accordion-panel");

      if (!button || !panel) return;

      var panelId = panel.id || "accordion-panel-" + index;
      panel.id = panelId;
      button.setAttribute("aria-controls", panelId);

      function setState(open) {
        item.classList.toggle("is-open", open);
        button.setAttribute("aria-expanded", open ? "true" : "false");
        panel.hidden = !open;
      }

      setState(item.classList.contains("is-open"));

      button.addEventListener("click", function () {
        var group = item.closest("[data-accordion-group]");
        var isOpen = item.classList.contains("is-open");

        if (group) {
          group.querySelectorAll(".accordion-item").forEach(function (node) {
            var nodeButton = node.querySelector(".js-accordion-toggle");
            var nodePanel = node.querySelector(".accordion-panel");
            if (!nodeButton || !nodePanel) return;
            node.classList.remove("is-open");
            nodeButton.setAttribute("aria-expanded", "false");
            nodePanel.hidden = true;
          });
        }

        if (!isOpen) {
          setState(true);
        }
      });
    });
  }

})();
