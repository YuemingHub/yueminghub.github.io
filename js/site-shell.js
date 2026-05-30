(() => {
  const isSubPath = location.pathname.includes("/resources/");
  const prefix = isSubPath ? "../" : "";

  const navItems = [
    ["index.html#why", "为什么做"],
    ["index.html#different", "不同之处"],
    ["index.html#method", "方法资产"],
    ["index.html#works", "我的项目"],
    ["index.html#future", "长期方向"]
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
              <span>月明的小宇宙 · 方法与项目</span>
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
          <p>© ${new Date().getFullYear()} YuemingHub。这里整理月明的家庭教育方法、真实一线经验、个人工具、AI 实验和正在搭建的向未来。</p>
          <div class="footer-links">
            <a href="https://github.com/YuemingHub">GitHub</a>
            <a href="https://yueminghub.github.io/yueming/">向未来家庭教育</a>
            <a href="https://gui-flax-tau.vercel.app/">Gui</a>
          </div>
        </div>
      </footer>
    `;
  }
})();
