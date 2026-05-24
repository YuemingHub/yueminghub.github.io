(function () {
  "use strict";

  var page = document.body.dataset.page || "";
  var brandName = "月明·向未来家庭教育";
  var brandMark = "月";
  var brandTagline = "我先看你家在哪一层，再决定现在不能先做什么；背后那一半负责把容易散掉的事接住。";

  var navItems = [
    { key: "home", href: "index.html", label: "首页" },
    { key: "about", href: "about.html", label: "我怎么走到这里" },
    { key: "system", href: "system.html", label: "我怎么判断" },
    { key: "cases", href: "cases.html", label: "真实的家" },
    { key: "value", href: "value.html", label: "为什么走向未来" },
    { key: "engine", href: "engine.html", label: "背后托住的" },
    { key: "contact", href: "contact.html", label: "带着问题来", cta: true }
  ];

  function renderHeader() {
    var links = navItems.map(function (item) {
      var active = item.key === page ? " is-active" : "";
      var extra = item.cta ? " nav-link--cta" : "";
      var current = item.key === page ? ' aria-current="page"' : "";
      return '<a class="nav-link' + active + extra + '"' + current + ' href="' + item.href + '">' + item.label + "</a>";
    }).join("");

    var mobileLinks = navItems.map(function (item) {
      var active = item.key === page ? " is-active" : "";
      var current = item.key === page ? ' aria-current="page"' : "";
      return '<a class="mobile-nav__link' + active + '"' + current + ' href="' + item.href + '">' + item.label + "</a>";
    }).join("");

    var brandCurrent = page === "home" ? ' aria-current="page"' : "";

    return [
      '<header class="site-header">',
      '  <div class="container site-header__inner">',
      '    <a class="brand-lockup" href="index.html" aria-label="' + brandName + '"' + brandCurrent + ">",
      '      <span class="brand-lockup__mark">' + brandMark + "</span>",
      '      <span class="brand-lockup__text">',
      '        <strong>' + brandName + "</strong>",
      '        <span>' + brandTagline + "</span>",
      "      </span>",
      "    </a>",
      '    <nav class="desktop-nav" aria-label="主导航">' + links + "</nav>",
      '    <button class="nav-toggle js-nav-toggle" type="button" aria-label="打开菜单" aria-expanded="false">',
      "      <span></span><span></span><span></span>",
      "    </button>",
      "  </div>",
      '  <div class="mobile-nav js-nav-mobile" aria-hidden="true">',
      '    <div class="mobile-nav__panel">',
      '      <div class="mobile-nav__top">',
      '        <span class="mobile-nav__brand">' + brandName + "</span>",
      '        <button class="mobile-nav__close js-nav-close" type="button" aria-label="关闭菜单"><span aria-hidden="true">&times;</span></button>',
      "      </div>",
      '      <p class="mobile-nav__note">先看这套做法是怎么一点点长出来的，再决定你家现在最该从哪里开始。</p>',
      '      <nav class="mobile-nav__links" aria-label="移动端导航">' + mobileLinks + "</nav>",
      "    </div>",
      "  </div>",
      "</header>"
    ].join("");
  }

  function renderFooter() {
    var year = new Date().getFullYear();

    return [
      '<footer class="site-footer">',
      '  <div class="container site-footer__grid">',
      '    <div class="site-footer__brand">',
      '      <div class="brand-lockup brand-lockup--footer">',
      '        <span class="brand-lockup__mark">' + brandMark + "</span>",
      '        <span class="brand-lockup__text">',
      '          <strong>' + brandName + "</strong>",
      '          <span>' + brandTagline + "</span>",
      "        </span>",
      "      </div>",
      '      <p>我站在前面看一个真实的家，背后那一半负责把边界、回访和修正这些容易散掉的部分接住。</p>',
      '      <a class="text-link" href="engine.html">继续看背后托住的那一半</a>',
      "    </div>",
      '    <div class="site-footer__col">',
      '      <span class="eyebrow">阅读路径</span>',
      '      <a href="about.html">我怎么走到这里</a>',
      '      <a href="system.html">我怎么判断</a>',
      '      <a href="cases.html">它怎样在真实的家里成立</a>',
      '      <a href="value.html">为什么走向未来</a>',
      '      <a href="engine.html">背后托住的那一半</a>',
      "    </div>",
      '    <div class="site-footer__col">',
      '      <span class="eyebrow">当前重点</span>',
      '      <p>先稳住家庭，再谈未来；先给孩子低压力入口，不把 AI 写成答案。</p>',
      '      <a href="contact.html#group-entry">带着眼前最卡的一件事来</a>',
      '      <a href="contact.html#future-entry">如果孩子整个人都在往回退</a>',
      "    </div>",
      '    <div class="site-footer__col">',
      '      <span class="eyebrow">外部连接</span>',
      '      <a href="https://mp.weixin.qq.com/" target="_blank" rel="noreferrer">公众号：青春期家庭指南</a>',
      '      <a href="https://www.douyin.com/user/YMHomelink" target="_blank" rel="noreferrer">抖音：YMHomelink</a>',
      '      <a href="mailto:ymhomelink@163.com">邮箱：ymhomelink@163.com</a>',
      "    </div>",
      "  </div>",
      '  <div class="site-footer__bottom">',
      '    <div class="container site-footer__bottom-inner">',
      '      <span>&copy; ' + year + " " + brandName + "</span>",
      '      <span>不是先给方法，是先看清在哪一层、再决定先停什么。</span>',
      "    </div>",
      "  </div>",
      "</footer>"
    ].join("");
  }

  document.querySelectorAll("[data-site-header]").forEach(function (node) {
    node.innerHTML = renderHeader();
  });

  document.querySelectorAll("[data-site-footer]").forEach(function (node) {
    node.innerHTML = renderFooter();
  });
})();
