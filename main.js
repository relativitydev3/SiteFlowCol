// ---- GSAP ScrollTrigger setup ----
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
  const mobile = () => window.innerWidth < 768;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + .3;
      this.vx = (Math.random() - .5) * .3;
      this.vy = (Math.random() - .5) * .3;
      this.a = Math.random() * .5 + .1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129,140,248,${this.a})`;
      ctx.fill();
    }
  }

  const count = mobile() ? 40 : 90;
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    // draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${.12 * (1 - dist/100)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
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
const amounts = document.querySelectorAll('.plan-price .amount');
const curLabels = document.querySelectorAll('.cur-code');
const symEls = document.querySelectorAll('.currency-sym');

const SYMBOLS = { USD: '$', COP: '$', EUR: '€' };

function switchCurrency(cur) {
  curBtns.forEach(b => b.classList.toggle('active', b.dataset.cur === cur));
  amounts.forEach(el => {
    const val = el.dataset[cur.toLowerCase()];
    if (val !== undefined) {
      gsap.fromTo(el, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: .3, ease: 'power2.out',
        onStart: () => { el.textContent = val; }
      });
    }
  });
  curLabels.forEach(el => { el.textContent = cur; });
  symEls.forEach(el => { el.textContent = SYMBOLS[cur]; });
}

curBtns.forEach(btn => {
  btn.addEventListener('click', () => switchCurrency(btn.dataset.cur));
});

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