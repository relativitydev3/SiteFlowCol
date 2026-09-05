/* SiteFlow Core — escena scroll-driven de la sección "Todo incluido". */
(function () {
  'use strict';

  const scene = document.getElementById('core-scene');
  const field = document.getElementById('core-field');
  const linkGroup = document.getElementById('core-links');
  const sphere = document.getElementById('core-sphere');
  const ringGroup = document.querySelector('.core-rings');
  const shield = document.querySelector('.core-shield');
  const outro = document.getElementById('core-outro');
  const services = [...document.querySelectorAll('[data-core-node]')];
  const words = [...document.querySelectorAll('[data-core-word]')];
  if (!scene || !field || !linkGroup || !sphere || services.length !== 6) return;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const CENTER = { x: 50, y: 50 };
  const SWEEP = 26 * Math.PI / 180;
  const STEP_START = 0.08;
  const STEP_SPAN = 0.12;
  const OUTRO_START = STEP_START + STEP_SPAN * 6;

  const LAYOUTS = {
    wide: [[50, 7], [88, 26], [12, 26], [90, 68], [10, 68], [50, 93]],
    narrow: [[50, 8], [73, 27], [27, 27], [75, 61], [25, 61], [50, 90]]
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrowScreen = window.matchMedia('(max-width: 768px)');

  const WEB_PAIRS = [[0, 1], [1, 3], [3, 5], [5, 4], [4, 2], [2, 0]];

  const links = [];
  const web = [];
  const pulses = [];
  let trigger = null;
  let resizeRaf = 0;
  let lastProgress = 0;
  let destroyed = false;

  function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }

  function smoothstep(value) {
    const x = clamp(value);
    return x * x * (3 - 2 * x);
  }

  function bell(value, width) {
    const x = value / width;
    return Math.exp(-x * x);
  }

  function controlPoint(target) {
    const vx = (target[0] - CENTER.x) * .5;
    const vy = (target[1] - CENTER.y) * .5;
    return {
      x: CENTER.x + vx * Math.cos(SWEEP) - vy * Math.sin(SWEEP),
      y: CENTER.y + vx * Math.sin(SWEEP) + vy * Math.cos(SWEEP)
    };
  }

  function buildLinks() {
    linkGroup.textContent = '';
    links.length = 0;
    web.length = 0;
    pulses.length = 0;

    const layout = narrowScreen.matches ? LAYOUTS.narrow : LAYOUTS.wide;

    WEB_PAIRS.forEach(([from, to]) => {
      const line = document.createElementNS(SVG_NS, 'path');
      line.setAttribute('class', 'core-web');
      line.setAttribute('d', `M${layout[from][0]} ${layout[from][1]} L${layout[to][0]} ${layout[to][1]}`);
      linkGroup.appendChild(line);
      web.push(line);
    });

    for (let index = 0; index < 2; index += 1) {
      const ripple = document.createElementNS(SVG_NS, 'circle');
      ripple.setAttribute('class', 'core-pulse');
      ripple.setAttribute('cx', CENTER.x);
      ripple.setAttribute('cy', CENTER.y);
      linkGroup.appendChild(ripple);
      pulses.push(ripple);
    }

    layout.forEach((target, index) => {
      const control = controlPoint(target);
      const geometry =
        `M${CENTER.x} ${CENTER.y} Q${control.x.toFixed(2)} ${control.y.toFixed(2)} ${target[0]} ${target[1]}`;

      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('class', 'core-link');
      path.setAttribute('d', geometry);
      linkGroup.appendChild(path);

      const trace = document.createElementNS(SVG_NS, 'path');
      trace.setAttribute('class', 'core-trace');
      trace.setAttribute('d', geometry);
      linkGroup.appendChild(trace);

      const particle = document.createElementNS(SVG_NS, 'circle');
      particle.setAttribute('class', 'core-particle');
      particle.setAttribute('r', '0.75');
      linkGroup.appendChild(particle);

      const length = path.getTotalLength();
      links.push({ path, trace, particle, length, trail: length * .18 });

      const node = services[index];
      node.style.left = `${target[0]}%`;
      node.style.top = `${target[1]}%`;
      node.classList.toggle('is-right', target[0] > 55);
    });
  }

  function renderService(index, local) {
    const link = links[index];
    const node = services[index];
    const travel = clamp(local / .6);
    const activation = smoothstep(clamp((local - .52) / .4));

    node.style.setProperty('--on', activation.toFixed(3));

    if (!link) return activation;

    const point = link.path.getPointAtLength(link.length * travel);
    link.particle.setAttribute('cx', point.x.toFixed(2));
    link.particle.setAttribute('cy', point.y.toFixed(2));

    const arrival = bell(travel - 1, .12);
    const visible = local > 0 && local < 1
      ? smoothstep(travel / .08) * (1 - smoothstep((local - .62) / .22))
      : 0;

    link.particle.style.opacity = visible.toFixed(3);
    link.particle.setAttribute('r', (0.75 + arrival * 0.75).toFixed(2));

    link.trace.style.opacity = (visible * .55).toFixed(3);
    link.trace.style.strokeDasharray = `${link.trail.toFixed(2)} ${link.length.toFixed(2)}`;
    link.trace.style.strokeDashoffset = (link.trail - travel * link.length).toFixed(2);

    link.path.style.opacity = (activation * .26).toFixed(3);
    link.path.style.strokeDasharray = `${link.length.toFixed(2)}`;
    link.path.style.strokeDashoffset = (link.length * (1 - activation)).toFixed(2);

    return activation;
  }

  function renderWord(index, local) {
    const word = words[index];
    if (!word) return;

    const enter = smoothstep(clamp((local - .42) / .16));
    const leave = 1 - smoothstep(clamp((local - .86) / .14));
    const opacity = Math.min(enter, leave);
    const scale = .82 + enter * .18 - (1 - leave) * .06;
    const stretch = word.classList.contains('core-word--stretch') ? 1 + enter * .05 : 1;
    const blur = (1 - leave) * 2.5;

    word.style.opacity = local > 0 && local < 1 ? opacity.toFixed(3) : '0';
    word.style.transform =
      `translate3d(-50%, -50%, 0) scale(${(scale * stretch).toFixed(3)}, ${scale.toFixed(3)})`;
    word.style.filter = blur > .05 ? `blur(${blur.toFixed(2)}px)` : 'none';
  }

  function render(progress) {
    lastProgress = progress;

    let pulse = 0;
    let sslActive = 0;
    let emission = -1;
    let networkFlash = 0;

    for (let index = 0; index < 6; index += 1) {
      const start = STEP_START + STEP_SPAN * index;
      const local = clamp((progress - start) / STEP_SPAN);
      const activation = renderService(index, local);
      renderWord(index, local);

      if (local > 0 && local < 1) {
        pulse = Math.max(pulse, bell(local - .58, .09));
        if (local < .45) emission = local;
      }
      if (index === 3) sslActive = activation;
      if (index === 5) networkFlash = bell(local - .68, .12);
    }

    const intro = smoothstep(clamp(progress / STEP_START));
    const outroP = clamp((progress - OUTRO_START) / (1 - OUTRO_START));
    const finalPulse = bell(outroP - .12, .1);
    const energy = Math.max(pulse, finalPulse);

    pulses.forEach((ripple, index) => {
      const local = emission - index * .06;
      const expand = clamp(local / .32);
      const alive = local > 0 && local < .38 ? 1 : 0;
      ripple.setAttribute('r', (15 + expand * 15).toFixed(2));
      ripple.style.opacity = (alive * smoothstep(expand / .1) * (1 - expand) * .55).toFixed(3);
    });

    web.forEach(line => {
      line.style.opacity = (outroP * .16 + networkFlash * .3).toFixed(3);
    });

    if (ringGroup) {
      ringGroup.style.opacity = (.55 + intro * .45).toFixed(3);
      ringGroup.style.transform = `scale(${(1 + outroP * .07).toFixed(3)})`;
    }
    document.querySelectorAll('.core-ring').forEach((ring, index) => {
      ring.style.opacity = (.08 + intro * .05 + outroP * .14 + index * .01).toFixed(3);
    });

    if (shield) {
      shield.style.opacity = (sslActive * .18 + bell(sslActive - .6, .25) * sslActive * .5).toFixed(3);
      shield.style.transform = `scale(${(1 + sslActive * .12).toFixed(3)})`;
    }

    sphere.style.transform =
      `translate(-50%, -50%) scale(${(1 + energy * .035 - outroP * .09).toFixed(3)}) rotate(${(progress * 14).toFixed(2)}deg)`;
    sphere.style.setProperty('--core-glow', `${(26 + energy * 70).toFixed(0)}px`);

    const tag = sphere.querySelector('.core-tag');
    if (tag) tag.style.opacity = (1 - smoothstep(clamp((outroP - .2) / .25))).toFixed(3);

    if (outro) {
      const appear = smoothstep(clamp((outroP - .18) / .32));
      outro.style.opacity = appear.toFixed(3);
      outro.style.transform = `translateY(${((1 - appear) * 26).toFixed(2)}px)`;
      const sub = outro.querySelector('.core-outro-sub');
      const brand = outro.querySelector('.core-outro-brand');
      if (sub) sub.style.opacity = smoothstep(clamp((outroP - .42) / .22)).toFixed(3);
      if (brand) brand.style.opacity = smoothstep(clamp((outroP - .6) / .22)).toFixed(3);
    }
  }

  function renderStatic() {
    services.forEach(node => node.style.setProperty('--on', '1'));
    links.forEach(link => {
      link.particle.style.opacity = '0';
      link.trace.style.opacity = '0';
      link.path.style.opacity = '.16';
      link.path.style.strokeDashoffset = '0';
    });
    web.forEach(line => { line.style.opacity = '.12'; });
    pulses.forEach(ripple => { ripple.style.opacity = '0'; });
    words.forEach(word => { word.style.opacity = '0'; });
    if (outro) outro.style.opacity = '1';
  }

  function onResize() {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      if (destroyed) return;
      buildLinks();
      if (reduceMotion.matches || !trigger) renderStatic();
      else render(lastProgress);
      trigger?.refresh();
    });
  }

  function destroy() {
    destroyed = true;
    trigger?.kill();
    cancelAnimationFrame(resizeRaf);
    window.removeEventListener('resize', onResize);
  }

  buildLinks();

  if (reduceMotion.matches || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    renderStatic();
  } else {
    gsap.registerPlugin(ScrollTrigger);
    trigger = ScrollTrigger.create({
      trigger: scene,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate(self) { render(clamp(self.progress)); }
    });
    render(0);
  }

  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('pagehide', destroy, { once: true });
})();
