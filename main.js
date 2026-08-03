// ---- i18n arranca solo en i18n.js ----

// ---- GSAP ScrollTrigger setup ----
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// ---- Scroll Progress ----
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ---- Navbar scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- Hamburger ----
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
hamburger.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  navMobile.setAttribute('aria-hidden', !isOpen);
});
document.querySelectorAll('.mobile-link').forEach(l => {
  l.addEventListener('click', () => {
    navMobile.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, { duration: .8, scrollTo: { y: target, offsetY: 68 }, ease: 'power2.inOut' });
      }
    }
  });
});

// ---- Particles ----
(function() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const mqMobile = window.matchMedia('(max-width: 767px)');
    const isMobile = () => mqMobile.matches;
    const PARTICLE_CFG = {
      desktop: { count: 190, link: 220, alpha: 0.42, width: 1.3 },
      mobile:  { count: 35,  link: 150, alpha: 0.28, width: 1   }
    };
    let cfg = isMobile() ? PARTICLE_CFG.mobile : PARTICLE_CFG.desktop;
    let mouse = { x: null, y: null };
    const MOUSE_RADIUS = 180;
    const MOUSE_LINE   = 0.55;
  
    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();
  
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.ox = this.x = Math.random() * W;
        this.oy = this.y = Math.random() * H;
        this.r  = Math.random() * 3.2 + 1.2;
        this.vx = (Math.random() - .5) * .3;
        this.vy = (Math.random() - .5) * .3;
        this.a  = Math.random() * .45 + .35;
      }
      update() {
        // posición base (movimiento natural)
        this.ox += this.vx;
        this.oy += this.vy;
        if (this.ox < 0 || this.ox > W || this.oy < 0 || this.oy > H) this.reset();
      
        // atracción al cursor
        if (mouse.x !== null) {
          const dx   = mouse.x - this.ox;   // invertido: cursor - partícula
          const dy   = mouse.y - this.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            const angle = Math.atan2(dy, dx);
            const pull  = force * MOUSE_RADIUS * 0.4;
            this.x += (this.ox + Math.cos(angle) * pull - this.x) * 0.15;
            this.y += (this.oy + Math.sin(angle) * pull - this.y) * 0.15;
          } else {
            this.x += (this.ox - this.x) * 0.1;
            this.y += (this.oy - this.y) * 0.1;
          }
        } else {
          this.x = this.ox;
          this.y = this.oy;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129,140,248,${this.a})`;
        ctx.fill();
      }
    }

    function rebuildParticles() {
      cfg = isMobile() ? PARTICLE_CFG.mobile : PARTICLE_CFG.desktop;
      particles = [];
      for (let i = 0; i < cfg.count; i++) particles.push(new Particle());
    }

    rebuildParticles();
    mqMobile.addEventListener('change', rebuildParticles);

    function drawLink(x1, y1, x2, y2, maxDist, maxAlpha, width) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= maxDist) return;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(129,140,248,${maxAlpha * (1 - dist / maxDist)})`;
      ctx.lineWidth = width;
      ctx.stroke();
    }
  
    // Seguimiento del cursor
    const hero = document.getElementById('hero');
    if (hero) {
      const setPointer = (cx, cy) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = cx - rect.left;
        mouse.y = cy - rect.top;
      };
      hero.addEventListener('mousemove', e => setPointer(e.clientX, e.clientY), { passive: true });
      hero.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
      hero.addEventListener('touchmove', e => {
        if (e.touches[0]) setPointer(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      hero.addEventListener('touchend', () => { mouse.x = null; mouse.y = null; });
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          drawLink(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y,
            cfg.link, cfg.alpha, cfg.width
          );
        }
      }

      if (mouse.x !== null) {
        particles.forEach(p => {
          drawLink(p.x, p.y, mouse.x, mouse.y, MOUSE_RADIUS + 40, MOUSE_LINE, 1.5);
        });
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 36);
        glow.addColorStop(0, 'rgba(167,139,250,0.45)');
        glow.addColorStop(1, 'rgba(129,140,248,0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 36, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      requestAnimationFrame(loop);
    }
    loop();
  })();

// ---- Hero stat counters ----
function animateCounter(el, target, isStatic) {
  if (isStatic) return;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target, duration: 2, ease: 'power2.out',
    delay: .5,
    onUpdate: () => { el.textContent = Math.round(obj.val); }
  });
}
document.querySelectorAll('.hero-stat .num').forEach(el => {
  if (el.dataset.static) return;
  animateCounter(el, parseInt(el.dataset.target), false);
});

// ---- GSAP Reveal animations ----
gsap.utils.toArray('.reveal').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: .8, ease: 'power2.out',
      scrollTrigger: {
        trigger: el, start: 'top 88%', toggleActions: 'play none none none'
      },
      delay: (i % 4) * .05
    }
  );
});

// ---- GSAP Hero entrance ----
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.from('.hero-badge', { opacity: 0, y: -20, duration: .6 })
  .from('.hero-title .line-1', { opacity: 0, y: 30, duration: .7 }, '-=.2')
  .from('.hero-title .line-2', { opacity: 0, y: 30, duration: .7 }, '-=.4')
  .from('.hero-sub', { opacity: 0, y: 20, duration: .6 }, '-=.3')
  .from('.hero-actions', { opacity: 0, y: 20, duration: .6 }, '-=.3')
  .from('.hero-stats', { opacity: 0, y: 20, duration: .5 }, '-=.2')
  .from('.hfc-1', { opacity: 0, x: -30, duration: .8 }, '-=.5')
  .from('.hfc-2', { opacity: 0, x: 30, duration: .8 }, '-=.6')
  .from('.hfc-3', { opacity: 0, x: -20, duration: .8 }, '-=.5')
  .from('.hfc-4', { opacity: 0, x: 20, duration: .8 }, '-=.6');

// ---- Stat counters in #stats section ----
document.querySelectorAll('.stat-block .big').forEach(el => {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.count == 2 ? '<' : '';
  const obj = { val: 0 };
  ScrollTrigger.create({
    trigger: el, start: 'top 80%', once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: target, duration: 1.5, ease: 'power2.out',
        onUpdate: () => { el.textContent = prefix + Math.round(obj.val) + suffix; }
      });
    }
  });
});

// ---- Bento card mouse glow ----
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

// ---- Magnetic buttons ----
document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
  const btn = wrap.querySelector('a, button');
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) * .2;
    const dy = (e.clientY - cy) * .2;
    gsap.to(btn, { x: dx, y: dy, duration: .3, ease: 'power2.out' });
  });
  wrap.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.5)' });
  });
});

// ---- Currency switcher ----
const curBtns = document.querySelectorAll('.cur-btn');
const curIndicator = document.querySelector('.cur-indicator');
const currencyTabs = document.querySelector('.currency-tabs');
const amounts = document.querySelectorAll('.plan-card .amount');
const curLabels = document.querySelectorAll('.plan-card .cur-code');
const symEls = document.querySelectorAll('.plan-card .currency-sym');
const priceValues = document.querySelectorAll('.plan-price .price-value');
const plansGrid = document.querySelector('.plans-grid');

const SYMBOLS = { USD: '$', COP: '$', EUR: '€' };
let activeCurrency = 'USD';
let currencyAnimating = false;

function moveCurIndicator(btn, animate = true) {
  if (!curIndicator || !btn || !currencyTabs) return;
  const tabsRect = currencyTabs.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const x = btnRect.left - tabsRect.left;
  const props = { x, width: btnRect.width, duration: animate ? 0.45 : 0, ease: 'power3.inOut' };
  gsap.to(curIndicator, props);
}

function initCurIndicator() {
  const activeBtn = document.querySelector('.cur-btn.active');
  if (activeBtn) {
    moveCurIndicator(activeBtn, false);
    if (currencyTabs) currencyTabs.classList.add('ready');
  }
}

function switchCurrency(cur) {
  if (cur === activeCurrency || currencyAnimating) return;
  currencyAnimating = true;

  const activeBtn = [...curBtns].find(b => b.dataset.cur === cur);
  curBtns.forEach(b => {
    b.classList.toggle('active', b.dataset.cur === cur);
    b.classList.add('switching');
  });
  moveCurIndicator(activeBtn);

  document.querySelectorAll('.plan-price').forEach(el => el.classList.add('is-switching'));
  if (plansGrid) plansGrid.classList.add('is-switching');

  const tl = gsap.timeline({
    onComplete() {
      activeCurrency = cur;
      currencyAnimating = false;
      curBtns.forEach(b => b.classList.remove('switching'));
      document.querySelectorAll('.plan-price').forEach(el => el.classList.remove('is-switching'));
      if (plansGrid) plansGrid.classList.remove('is-switching');
    }
  });

  tl.to(priceValues, {
    opacity: 0,
    y: -16,
    scale: 0.88,
    rotateX: -25,
    duration: 0.22,
    stagger: 0.05,
    ease: 'power2.in',
    transformPerspective: 600
  });

  tl.add(() => {
    amounts.forEach(el => {
      const val = el.dataset[cur.toLowerCase()];
      if (val !== undefined) el.textContent = val;
    });
    curLabels.forEach(el => { el.textContent = cur; });
    symEls.forEach(el => { el.textContent = SYMBOLS[cur]; });
  });

  tl.fromTo(priceValues,
    { opacity: 0, y: 20, scale: 0.88, rotateX: 25 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 0.4,
      stagger: 0.07,
      ease: 'back.out(1.6)',
      transformPerspective: 600
    }
  );

  tl.to('.plan-card:not(:has(.custom-lbl))', {
    y: -4,
    duration: 0.18,
    stagger: 0.04,
    ease: 'power2.out'
  }, '-=0.25');

  tl.to('.plan-card:not(:has(.custom-lbl))', {
    y: 0,
    duration: 0.35,
    stagger: 0.04,
    ease: 'elastic.out(1, 0.6)'
  });
}

curBtns.forEach(btn => {
  btn.addEventListener('click', () => switchCurrency(btn.dataset.cur));
});

initCurIndicator();
window.addEventListener('load', initCurIndicator);
window.addEventListener('resize', () => {
  const activeBtn = document.querySelector('.cur-btn.active');
  if (activeBtn) moveCurIndicator(activeBtn, false);
}, { passive: true });

// ---- Formulario de contacto (Web3Forms — POST nativo) ----
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
  const redirectInput = document.getElementById('contact-redirect');
  const nameInput = document.getElementById('contact-name');
  const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
  const configKey = window.CONTACT_CONFIG?.accessKey?.trim();

  if (configKey && accessKeyInput) accessKeyInput.value = configKey;

  function contactReturnUrl() {
    const base = window.location.href.split(/[?#]/)[0];
    return `${base}?sent=1#contact`;
  }

  if (redirectInput) {
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      redirectInput.value = contactReturnUrl();
    } else {
      redirectInput.removeAttribute('name');
    }
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('sent') === '1' && contactStatus) {
    const t = window.SiteFlowI18n ? SiteFlowI18n.t.bind(SiteFlowI18n) : k => k;
    contactStatus.className = 'form-status success';
    contactStatus.textContent = t('contact.success');
    history.replaceState(null, '', window.location.pathname + '#contact');
  }

  contactForm.addEventListener('submit', e => {
    const email = contactForm.email.value.trim();
    const phone = contactForm.phone.value.trim();
    const message = contactForm.message.value.trim();
    const t = window.SiteFlowI18n ? SiteFlowI18n.t.bind(SiteFlowI18n) : k => k;

    if (!email || !phone || !message) {
      e.preventDefault();
      contactStatus.className = 'form-status error';
      contactStatus.textContent = t('contact.fillAll');
      return;
    }

    if (nameInput) nameInput.value = email;
    if (redirectInput?.name === 'redirect') redirectInput.value = contactReturnUrl();

    const btn = document.getElementById('contact-submit');
    if (btn) btn.disabled = true;
    if (contactStatus) {
      contactStatus.className = 'form-status';
      contactStatus.textContent = t('contact.sending');
    }
  });
}

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---- Parallax hero orbs ----
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (sy < window.innerHeight) {
    const o1 = document.querySelector('.orb-1');
    const o2 = document.querySelector('.orb-2');
    if (o1) o1.style.transform = `translateY(${sy * .15}px)`;
    if (o2) o2.style.transform = `translateY(${-sy * .1}px)`;
  }
}, { passive: true });

// ---- Section fade transitions ----
gsap.utils.toArray('.bento-card, .feature-card, .plan-card, .testi-card, .process-step').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0, duration: .6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    }
  );
});