// ---- i18n arranca solo en i18n.js ----
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof window.gsap !== 'undefined';
const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
const hasScrollToPlugin = hasGSAP && typeof window.ScrollToPlugin !== 'undefined';

// ---- GSAP ScrollTrigger setup ----
if (hasGSAP) {
  const plugins = [hasScrollTrigger && ScrollTrigger, hasScrollToPlugin && ScrollToPlugin].filter(Boolean);
  if (plugins.length) gsap.registerPlugin(...plugins);
}

// ---- Scroll Progress ----
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ---- Navbar scroll ----
const nav = document.getElementById('nav');
const heroSection = document.getElementById('hero');

function updateNavVisibility() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  if (!heroSection) return;
  const heroEnd = heroSection.offsetTop + heroSection.offsetHeight - window.innerHeight;
  nav.classList.toggle('nav-hidden', window.scrollY < heroEnd - window.innerHeight * .15);
}

updateNavVisibility();
window.addEventListener('scroll', updateNavVisibility, { passive: true });
window.addEventListener('resize', updateNavVisibility, { passive: true });

// ---- Hamburger ----
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
function closeMobileMenu({ restoreFocus = false } = {}) {
  navMobile.classList.remove('open');
  navMobile.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  if (restoreFocus) hamburger.focus();
}
hamburger.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  navMobile.setAttribute('aria-hidden', !isOpen);
});
document.querySelectorAll('.mobile-link').forEach(l => {
  l.addEventListener('click', () => closeMobileMenu());
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navMobile.classList.contains('open')) {
    closeMobileMenu({ restoreFocus: true });
  }
});

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        if (hasScrollToPlugin) {
          gsap.to(window, { duration: .8, scrollTo: { y: target, offsetY: 68 }, ease: 'power2.inOut' });
        } else {
          target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      }
    }
  });
});

// ---- Particles ----
(function() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas || prefersReducedMotion) return;
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
if (hasScrollTrigger && !prefersReducedMotion) {
  gsap.utils.toArray('.reveal:not([hidden]):not(.process-step)')
    .filter(el => !el.closest('[hidden]'))
    .forEach((el, i) => {
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
} else {
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

// ---- Hero entrance (la progresión posterior vive en scroll-sequence.js) ----
if (hasGSAP && !prefersReducedMotion) {
  gsap.from('.sequence-copy--intro > *', {
    opacity: 0,
    y: 28,
    duration: .8,
    stagger: .08,
    ease: 'power3.out',
    delay: .15
  });
}

// ---- Stat counters in #stats section ----
document.querySelectorAll('#stats .stat-block .big').forEach(el => {
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
  if (!btn || !hasGSAP || prefersReducedMotion) return;
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
  if (hasGSAP) {
    gsap.to(curIndicator, props);
  } else {
    curIndicator.style.width = `${btnRect.width}px`;
    curIndicator.style.transform = `translateX(${x}px)`;
  }
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
    b.setAttribute('aria-pressed', b.dataset.cur === cur ? 'true' : 'false');
    b.classList.add('switching');
  });
  moveCurIndicator(activeBtn);

  if (!hasGSAP || prefersReducedMotion) {
    amounts.forEach(el => {
      const val = el.dataset[cur.toLowerCase()];
      if (val !== undefined) el.textContent = val;
    });
    curLabels.forEach(el => { el.textContent = cur; });
    symEls.forEach(el => { el.textContent = SYMBOLS[cur]; });
    activeCurrency = cur;
    currencyAnimating = false;
    curBtns.forEach(b => b.classList.remove('switching'));
    return;
  }

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
  btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
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
    if (!contactForm.email.validity.valid) {
      e.preventDefault();
      contactForm.email.setAttribute('aria-invalid', 'true');
      contactForm.email.focus();
      contactStatus.className = 'form-status error';
      contactStatus.textContent = t('contact.invalidEmail');
      return;
    }
    if (phone.replace(/\D/g, '').length < 7) {
      e.preventDefault();
      contactForm.phone.setAttribute('aria-invalid', 'true');
      contactForm.phone.focus();
      contactStatus.className = 'form-status error';
      contactStatus.textContent = t('contact.invalidPhone');
      return;
    }

    contactForm.email.removeAttribute('aria-invalid');
    contactForm.phone.removeAttribute('aria-invalid');

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
document.querySelectorAll('.faq-item').forEach((item, index) => {
  const button = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');
  if (!button || !answer) return;

  const buttonId = `faq-question-${index + 1}`;
  const answerId = `faq-answer-${index + 1}`;
  button.id = buttonId;
  button.type = 'button';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', answerId);
  answer.id = answerId;
  answer.setAttribute('role', 'region');
  answer.setAttribute('aria-labelledby', buttonId);
  answer.setAttribute('aria-hidden', 'true');

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      openItem.querySelector('.faq-a')?.setAttribute('aria-hidden', 'true');
    });
    if (!isOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      answer.setAttribute('aria-hidden', 'false');
    }
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
if (hasScrollTrigger && !prefersReducedMotion) {
  gsap.utils.toArray('.plan-card').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: .6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
      }
    );
  });
}

// ---- Cinematic scene choreography ----
if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  const cinematic = gsap.matchMedia();

  gsap.utils.toArray('.display-title:not(.core-head .display-title)').forEach(title => {
    gsap.from(title, {
      yPercent: 24,
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: title, start: 'top 86%', once: true }
    });
  });

  cinematic.add('(min-width: 769px)', () => {
    const transformTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#transformation',
        start: 'top top',
        end: 'bottom bottom',
        scrub: .8,
        pin: '.transformation-stage',
        anticipatePin: 1
      }
    });
    transformTimeline
      .to('.chaos-piece--1', { x: '-35vw', y: '20vh', z: 350, rotate: -35, opacity: 0 }, .1)
      .to('.chaos-piece--2', { x: '30vw', y: '-25vh', z: 450, rotate: 28, opacity: 0 }, .1)
      .to('.chaos-piece--3', { y: '45vh', z: 600, rotate: -20, opacity: 0 }, .12)
      .to('.chaos-piece--4', { x: '35vw', y: '25vh', z: 420, rotate: 40, opacity: 0 }, .1)
      .to('.chaos-piece--5', { x: '-25vw', y: '-30vh', z: 500, rotate: -24, opacity: 0 }, .1)
      .to('.chaos-label', { opacity: 0, y: -50 }, .18)
      .to('.resolved-interface', { opacity: 1, scale: 1, rotateX: 0, duration: .75, ease: 'power3.inOut' }, .35)
      .from('.resolved-row', { y: 18, opacity: 0, stagger: .06, duration: .35 }, .6)
      .from('.resolved-grid span', { yPercent: 100, opacity: 0, stagger: .08, duration: .4 }, .82);

    const portfolio = document.querySelector('#portfolio');
    const track = document.querySelector('.portfolio-track');
    if (portfolio && track) {
      const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -travel(),
        ease: 'none',
        scrollTrigger: {
          trigger: portfolio,
          start: 'top top',
          end: () => `+=${Math.max(travel(), window.innerWidth)}`,
          scrub: .8,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });
    }

    const processSteps = gsap.utils.toArray('.process-step');
    gsap.set(processSteps, { opacity: .18 });
    const processTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#process',
        start: 'top top',
        end: `+=${window.innerHeight * 2.2}`,
        scrub: .8,
        pin: true,
        anticipatePin: 1
      }
    });
    processSteps.forEach((step, index) => {
      processTimeline
        .to(processSteps, { opacity: .18, duration: .15 }, index)
        .to(step, { opacity: 1, duration: .35 }, index)
        .to('.process-progress span', { scaleX: (index + 1) / processSteps.length, duration: .35 }, index);
    });
  });

  cinematic.add('(max-width: 768px)', () => {
    gsap.utils.toArray('.process-step, .project-panel').forEach(element => {
      gsap.from(element, {
        opacity: 0,
        y: 35,
        duration: .7,
        scrollTrigger: { trigger: element, start: 'top 88%', once: true }
      });
    });
    gsap.to('.portfolio-track', {
      x: () => -Math.max(0, document.querySelector('.portfolio-track').scrollWidth - window.innerWidth + 20),
      ease: 'none',
      scrollTrigger: {
        trigger: '#portfolio',
        start: 'top top',
        end: '+=2200',
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true
      }
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: '#transformation',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: '.transformation-stage'
      }
    })
      .to('.chaos-piece, .chaos-label', { opacity: 0, scale: .6, stagger: .03 }, 0)
      .to('.resolved-interface', { opacity: 1, scale: 1, rotateX: 0 }, .35);
  });

  gsap.to('.metal-sphere', {
    yPercent: -12,
    rotate: 18,
    ease: 'none',
    scrollTrigger: { trigger: '#infrastructure', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });

  window.addEventListener('pagehide', () => cinematic.revert(), { once: true });
}