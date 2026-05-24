(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initHomeGrowth();
    initLayerStack();
    initTimelineProgress();
    initValueRings();
  });

  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initHomeGrowth() {
    var root = document.querySelector("[data-home-growth]");
    if (!root) return;

    var tooltip = root.querySelector("[data-growth-tooltip]");
    var nodes = Array.prototype.slice.call(root.querySelectorAll("[data-growth-node]"));
    var phases = ["field", "judge", "support", "engine", "future", "full"];
    var defaultCopy = nodes.length ? nodes[0].getAttribute("data-growth-copy") : "";
    var manualHold = false;
    var manualReleaseTimer = null;

    function applyPhase(phase, copyOverride) {
      root.setAttribute("data-home-phase", phase);
      nodes.forEach(function (node) {
        var nodePhase = node.getAttribute("data-node-phase");
        var isActive = phase === "full" ? nodePhase === "full" : nodePhase === phase;
        node.classList.toggle("is-active", isActive);
      });

      if (tooltip) {
        tooltip.textContent = copyOverride || getCopyForPhase(phase) || defaultCopy;
      }
    }

    function getCopyForPhase(phase) {
      var phaseNode = root.querySelector('[data-node-phase="' + phase + '"]');
      return phaseNode ? phaseNode.getAttribute("data-growth-copy") : defaultCopy;
    }

    if (reducedMotion()) {
      applyPhase("full");
      return;
    }

    applyPhase(phases[0]);

    var scrollAnchors = Array.prototype.slice.call(
      document.querySelectorAll(".home-story > .section")
    );
    var phaseForSectionIndex = ["field", "judge", "support", "engine", "future", "full", "full"];

    function syncPhaseToScroll() {
      if (manualHold) return;
      if (!scrollAnchors.length) return;

      var midpoint = window.innerHeight * 0.45;
      var currentIdx = 0;
      for (var i = 0; i < scrollAnchors.length; i++) {
        var rect = scrollAnchors[i].getBoundingClientRect();
        if (rect.top < midpoint) currentIdx = i;
      }
      var nextPhase = phaseForSectionIndex[Math.min(currentIdx, phaseForSectionIndex.length - 1)];
      if (root.getAttribute("data-home-phase") !== nextPhase) {
        applyPhase(nextPhase);
      }
    }

    var scrollTicking = false;
    function onScroll() {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(function () {
        syncPhaseToScroll();
        scrollTicking = false;
      });
    }

    if (scrollAnchors.length) {
      window.addEventListener("scroll", onScroll, { passive: true });
      syncPhaseToScroll();
    }

    function releaseManualSoon() {
      if (manualReleaseTimer) window.clearTimeout(manualReleaseTimer);
      manualReleaseTimer = window.setTimeout(function () {
        manualHold = false;
        syncPhaseToScroll();
      }, 4000);
    }

    nodes.forEach(function (node) {
      function highlightNode() {
        manualHold = true;
        applyPhase(node.getAttribute("data-node-phase"), node.getAttribute("data-growth-copy"));
        releaseManualSoon();
      }

      node.addEventListener("mouseenter", highlightNode);
      node.addEventListener("focus", highlightNode);
      node.addEventListener("click", highlightNode);
    });

    root.addEventListener("mouseleave", function () {
      manualHold = false;
      syncPhaseToScroll();
    });
  }

  function initLayerStack() {
    var stacks = document.querySelectorAll("[data-layer-stack]");
    if (!stacks.length) return;

    if (reducedMotion() || !("IntersectionObserver" in window)) {
      stacks.forEach(function (stack) {
        stack.querySelectorAll(".layer-stack__row").forEach(function (row) {
          row.classList.add("is-lit");
        });
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var stack = entry.target;
        var rows = Array.prototype.slice.call(stack.querySelectorAll(".layer-stack__row"));
        rows.reverse().forEach(function (row, idx) {
          window.setTimeout(function () {
            row.classList.add("is-lit");
          }, idx * 280);
        });
        observer.unobserve(stack);
      });
    }, { threshold: 0.32 });

    stacks.forEach(function (stack) { observer.observe(stack); });
  }

  function initTimelineProgress() {
    var timelines = document.querySelectorAll(".timeline.is-progressive");
    if (!timelines.length) return;

    if (reducedMotion() || !("IntersectionObserver" in window)) {
      timelines.forEach(function (timeline) {
        timeline.querySelectorAll(".timeline-item").forEach(function (item) {
          item.classList.add("is-lit");
        });
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-lit");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4, rootMargin: "0px 0px -40px 0px" });

    timelines.forEach(function (timeline) {
      timeline.querySelectorAll(".timeline-item").forEach(function (item) {
        observer.observe(item);
      });
    });
  }

  function initValueRings() {
    var root = document.querySelector("[data-value-rings]");
    if (!root) return;

    var rings = Array.prototype.slice.call(root.querySelectorAll("[data-ring]"));
    var copies = Array.prototype.slice.call(document.querySelectorAll("[data-ring-copy]"));
    if (!rings.length) return;

    function applyRing(key) {
      rings.forEach(function (ring) {
        ring.classList.toggle("is-active", ring.getAttribute("data-ring") === key);
        ring.setAttribute("aria-pressed", ring.getAttribute("data-ring") === key ? "true" : "false");
      });
      copies.forEach(function (copy) {
        copy.classList.toggle("is-active", copy.getAttribute("data-ring-copy") === key);
      });
    }

    var defaultKey = rings[0].getAttribute("data-ring");
    applyRing(defaultKey);

    rings.forEach(function (ring) {
      var key = ring.getAttribute("data-ring");
      ring.addEventListener("mouseenter", function () { applyRing(key); });
      ring.addEventListener("focus", function () { applyRing(key); });
      ring.addEventListener("click", function () { applyRing(key); });
    });
  }
})();
