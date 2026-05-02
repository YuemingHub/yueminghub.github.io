/**
 * 月明家庭教育 - 主脚本
 * 包含：汉堡菜单、折叠展开、滚动渐现动画
 */

(function() {
  'use strict';

  /* ==========================================
     Hamburger Menu
     ========================================== */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  const mobileClose = document.querySelector('.nav__mobile-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobile);
    }

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobile);
    });

    function closeMobile() {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ==========================================
     Pyramid layer expand/collapse
     ========================================== */
  document.querySelectorAll('.pyramid__layer').forEach(layer => {
    layer.addEventListener('click', () => {
      const detail = layer.nextElementSibling;
      if (detail && detail.classList.contains('pyramid__detail')) {
        const isOpen = detail.classList.contains('open');
        // Close all
        document.querySelectorAll('.pyramid__detail').forEach(d => d.classList.remove('open'));
        document.querySelectorAll('.pyramid__expand').forEach(icon => {
          icon.textContent = '+';
        });
        // Open clicked if was closed
        if (!isOpen) {
          detail.classList.add('open');
          const icon = layer.querySelector('.pyramid__expand');
          if (icon) icon.textContent = '−';
        }
      }
    });
  });

  /* ==========================================
     Scroll reveal (Intersection Observer)
     ========================================== */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ==========================================
     翻转错误卡片
     ========================================== */
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  /* ==========================================
     交互式价值四圈
     ========================================== */
  const circleData = [
    {
      label: '第一圈 · 自我圈',
      title: '我能管住自己',
      sub: '最核心的一圈，也是所有价值的起点',
      example: '"你今天自己关了手机，这叫自律，你自己管住了自己。"',
      hint: '先从这一圈开始，孩子最容易在这里被看见'
    },
    {
      label: '第二圈 · 父母圈',
      title: '家里因为你好了一点',
      sub: '延伸到父母，让孩子看到自己的行为对家人的影响',
      example: '"你帮妈妈把碗收到了桌上，家里因为你好走了一步。"',
      hint: '帮助孩子连接到"家庭圈"的价值'
    },
    {
      label: '第三圈 · 家庭圈',
      title: '我是家里重要的人',
      sub: '让孩子感受到自己在家庭中的位置和归属',
      example: '"爷爷奶奶来家里，你主动倒茶招待——这说明你是家里很重要的人。"',
      hint: '归属感是安全感的重要来源'
    },
    {
      label: '第四圈 · 社会圈',
      title: '我能帮助别人',
      sub: '最外一圈，价值感最强，孩子开始感受到自己与更广阔世界的连接',
      example: '"你帮同学讲了一道题，他弄懂了——你是一个能帮助别人的人。"',
      hint: '从近到远，层层扩展，不要跳过前面的圈直接到这里'
    }
  ];

  const circleBtns = document.querySelectorAll('.value-circle-btn');
  const detailCard = document.querySelector('.value-detail-card');

  if (circleBtns.length && detailCard) {
    circleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.circle, 10) - 1;
        const data = circleData[idx];

        // Update content
        detailCard.querySelector('.value-detail-card__label').textContent = data.label;
        detailCard.querySelector('.value-detail-card__title').textContent = data.title;
        detailCard.querySelector('.value-detail-card__sub').textContent = data.sub;
        detailCard.querySelector('.value-detail-card__example').textContent = data.example;
        detailCard.querySelector('.value-detail-card__hint').textContent = data.hint;

        // Active state
        circleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show card
        detailCard.classList.add('visible');
        detailCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  /* ==========================================
     Active nav link highlight
     ========================================== */
  const navLinks = document.querySelectorAll('.nav__links a:not(.nav__cta)');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile nav active highlight
  const mobileLinks = document.querySelectorAll('.nav__mobile a');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

})();
