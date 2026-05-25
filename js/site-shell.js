(function () {
  "use strict";

  var page = document.body.dataset.page || "";
  var brandName = "月明·向未来家庭教育";
  var brandMark = "月";
  var brandTagline = "先把一个家现在真正卡住的地方看清，再决定先停什么、先稳什么。";

  var navItems = [
    { key: "about", href: "about.html", label: "我为什么做这件事" },
    { key: "system", href: "system.html", label: "我怎么判断一个家" },
    { key: "cases", href: "cases.html", label: "真实家庭怎么走过来" },
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
      '      <p class="mobile-nav__note">先看看我为什么会这样看一个家，再决定你现在更想先看判断、案例，还是直接把问题带来。</p>',
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
      '      <p>我做的不是先给方法，而是先陪家长把眼前这个家看清，再决定先停什么、先稳什么、往哪里走。</p>',
      '      <a class="text-link" href="about.html">先看我为什么做这件事</a>',
      "    </div>",
      '    <div class="site-footer__col">',
      '      <span class="eyebrow">阅读路径</span>',
      '      <a href="about.html">我为什么做这件事</a>',
      '      <a href="system.html">我怎么判断一个家</a>',
      '      <a href="cases.html">真实家庭怎么走过来</a>',
      '      <a href="contact.html">如果你想带着问题来</a>',
      "    </div>",
      '    <div class="site-footer__col">',
      '      <span class="eyebrow">当前重点</span>',
      '      <p>先看清，再开口；先减伤，再推进。不是把家长推得更用力，而是先把顺序理出来。</p>',
      '      <a href="contact.html#group-entry">带着眼前最卡的一件事来</a>',
      '      <a href="cases.html">先看几个真实家庭怎么走过来</a>',
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
      '      <span>不是先给方法，是先把这个家现在真正卡住的地方看清。</span>',
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
