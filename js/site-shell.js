(() => {
  const isSubPath = location.pathname.includes("/resources/");
  const prefix = isSubPath ? "../" : "";

  const navItems = [
    ["index.html#compass", "站点职责"],
    ["index.html#system", "系统档案"],
    ["index.html#case-lab", "研究边界"],
    ["index.html#works", "作品地图"],
    ["index.html#portal", "入口"]
  ];

  const current = location.pathname.split("/").pop() || "index.html";

  const header = document.querySelector("[data-site-header]");
  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#main">跳到正文</a>
      <header class="site-header">
        <div class="site-header-inner">
          <a class="brand" href="${prefix}index.html" aria-label="回到首页">
            <span class="brand-mark" aria-hidden="true"></span>
            <span class="brand-text">
              <strong>YuemingHub</strong>
              <span>产出索引 · 作品地图</span>
            </span>
          </a>

          <button class="nav-toggle" type="button" aria-label="打开导航" aria-expanded="false" data-nav-toggle>
            <span aria-hidden="true"></span>
          </button>

          <nav class="site-nav" aria-label="主导航">
            ${navItems.map(([href, label]) => {
              const active = current === "index.html" && href.startsWith("index.html") ? "" : "";
              return `<a class="${active}" href="${prefix}${href}">${label}</a>`;
            }).join("")}
          </nav>
        </div>
      </header>
    `;
  }

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer-inner">
          <p>© ${new Date().getFullYear()} YuemingHub。把长期产出整理成清楚、克制、可进入的作品索引。</p>
          <div class="footer-links">
            <a href="https://github.com/YuemingHub">GitHub</a>
            <a href="https://yueminghub.github.io/yueming/">向未来家庭教育</a>
            <a href="https://github.com/YuemingHub/Gui">Gui</a>
          </div>
        </div>
      </footer>
    `;
  }
})();
