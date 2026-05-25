(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = [
    ".path-section",
    ".closing-breath",
    ".path-card",
    ".layer-card",
    ".case-card",
    ".soft-note",
    ".contact-form",
    ".contact-aside",
    ".page-hero .section-shell.narrow",
    ".quiet-content .section-shell.text-flow",
    ".quiet-content > .section-shell:not(.contact-shell)"
  ];

  const revealItems = [...document.querySelectorAll(revealTargets.join(","))];
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
  });

  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else if (revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    });

    revealItems.forEach((item) => observer.observe(item));
  }

  const home = document.body.classList.contains("calm-home");
  if (!home) return;

  const awakeButton = document.querySelector("[data-awake-home]");
  const checkSection = document.querySelector("#quiet-check");
  const feelingButtons = [...document.querySelectorAll("[data-feeling]")];
  const response = document.querySelector("[data-feeling-response]");
  const responseTitle = document.querySelector("[data-response-title]");
  const responseText = document.querySelector("[data-response-text]");

  const copyMap = {
    "一说就炸": ["先别急着把话说完。", "也许现在最需要的，是让每一次开口不再像点火。"],
    "谁也不想再说": ["沉默不一定是不在乎。", "有时候，是这个家已经太累，需要先恢复一个安全的入口。"],
    "孩子退回房间": ["退回去，常常是在自保。", "先不急着把孩子推出门，先找回最低压力的连接。"],
    "我越管越乱": ["也许不是你不够努力。", "只是这个家的顺序已经乱了，先别继续加方法。"],
    "我也快撑不住了": ["你也需要被放下来一点。", "一个家要往前走，父母不能一直靠硬撑。"]
  };

  awakeButton?.addEventListener("click", () => {
    document.body.classList.add("is-awake");
    checkSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  feelingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      feelingButtons.forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");

      const value = button.dataset.feeling || "";
      const [title, text] = copyMap[value] || ["你不用一次讲完整个故事。", "先从眼前最卡的地方开始。"];

      if (responseTitle) responseTitle.textContent = title;
      if (responseText) responseText.textContent = text;

      if (response) {
        response.hidden = false;
        response.animate(
          [
            { opacity: 0, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 420, easing: "ease", fill: "both" }
        );
      }
    });
  });
})();
