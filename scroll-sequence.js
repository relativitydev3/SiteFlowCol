(function () {
  'use strict';

  const section = document.getElementById('hero');
  const canvas = document.getElementById('hero-sequence');
  const fallback = document.querySelector('.sequence-fallback');
  if (!section || !canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  const manifest = window.SITEFLOW_FRAME_SEQUENCE || { basePath: '', files: [] };
  const files = Array.isArray(manifest.files) ? manifest.files : [];
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  const images = new Array(files.length);
  const states = new Uint8Array(files.length);
  const copies = [...document.querySelectorAll('[data-sequence-step]')];
  const progressLine = document.querySelector('.sequence-progress span');
  const chromeCore = document.querySelector('.chrome-core');
  const INITIAL_PRIORITY_COUNT = Math.min(16, files.length);
  const MAX_DPR = 2;
  const FRAME_SCALE = 0.8;
  const FRAME_END = 0.55;

  let targetFrame = 0;
  let renderedFrame = -1;
  let lastValidFrame = -1;
  let resizeRaf = 0;
  let drawRaf = 0;
  let sequenceTrigger = null;
  let destroyed = false;

  const ranges = [
    [0.00, 0.20],
    [0.57, 0.66],
    [0.65, 0.74],
    [0.73, 0.83],
    [0.82, 0.90],
    [0.89, 0.96],
    [0.95, 1.00]
  ];

  function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }

  function smoothstep(value) {
    const x = clamp(value);
    return x * x * (3 - 2 * x);
  }

  function stepVisibility(progress, start, end) {
    const edge = Math.min(0.035, (end - start) * .25);
    const enter = smoothstep((progress - start) / edge);
    const leave = 1 - smoothstep((progress - (end - edge)) / edge);
    return clamp(Math.min(enter, leave));
  }

  function renderNarrative(progress) {
    copies.forEach((element, index) => {
      const range = ranges[index] || [0, 0];
      const edge = Math.min(0.035, (range[1] - range[0]) * .25);
      const visibility = index === 0
        ? 1 - smoothstep((progress - (range[1] - edge)) / edge)
        : stepVisibility(progress, range[0], range[1]);
      const offset = (1 - visibility) * 34;
      gsap.set(element, {
        autoAlpha: visibility,
        y: index === 0 ? offset * .35 : offset,
        scale: index === 6 ? .92 + visibility * .08 : 1
      });
    });

    if (progressLine) {
      progressLine.style.setProperty('--progress', `${Math.round(progress * 100)}%`);
    }

    const transition = clamp((progress - .94) / .06);
    gsap.set(canvas, {
      scale: 1 + transition * .16,
      opacity: 1 - transition * .72,
      clipPath: `inset(${transition * 7}% ${transition * 5}% ${transition * 7}% ${transition * 5}%)`
    });
    if (fallback) {
      gsap.set(fallback, {
        scale: 1 + transition * .16,
        opacity: 1 - transition * .72
      });
    }
    if (chromeCore) {
      gsap.set(chromeCore, { rotate: progress * 24, rotateX: progress * 12 });
    }
  }

  function sizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const width = Math.max(1, Math.round(window.innerWidth * dpr));
    const height = Math.max(1, Math.round(window.innerHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      renderedFrame = -1;
      requestDraw();
    }
  }

  function drawCover(image) {
    if (!image?.naturalWidth || !image?.naturalHeight) return false;
    const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight) * FRAME_SCALE;
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const x = (canvas.width - width) * .5;
    const y = (canvas.height - height) * .5;
    ctx.fillStyle = '#030303';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, width, height);
    return true;
  }

  function closestLoadedFrame(index) {
    if (states[index] === 2) return index;
    for (let distance = 1; distance < files.length; distance += 1) {
      const previous = index - distance;
      const next = index + distance;
      if (previous >= 0 && states[previous] === 2) return previous;
      if (next < files.length && states[next] === 2) return next;
    }
    return lastValidFrame;
  }

  function draw() {
    drawRaf = 0;
    if (destroyed || !files.length) return;
    const availableFrame = closestLoadedFrame(targetFrame);
    if (availableFrame < 0 || availableFrame === renderedFrame) return;
    if (drawCover(images[availableFrame])) {
      renderedFrame = availableFrame;
      lastValidFrame = availableFrame;
      fallback?.classList.remove('is-visible');
    }
  }

  function requestDraw() {
    if (!drawRaf) drawRaf = requestAnimationFrame(draw);
  }

  function loadFrame(index) {
    if (index < 0 || index >= files.length || states[index] !== 0) return Promise.resolve();
    states[index] = 1;

    return new Promise(resolve => {
      const image = new Image();
      images[index] = image;
      image.decoding = 'async';
      image.onload = async () => {
        try { await image.decode?.(); } catch (_) {}
        states[index] = 2;
        if (lastValidFrame < 0 || index === targetFrame) requestDraw();
        resolve();
      };
      image.onerror = () => {
        states[index] = 3;
        resolve();
      };
      image.src = manifest.basePath + files[index];
    });
  }

  async function preloadSequence() {
    if (!files.length) {
      fallback?.classList.add('is-visible');
      canvas.hidden = true;
      return;
    }

    if (reduceMotion.matches || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      targetFrame = files.length - 1;
      await loadFrame(targetFrame);
      requestDraw();
      return;
    }

    await loadFrame(0);
    requestDraw();

    const firstBatch = [];
    for (let index = 1; index < INITIAL_PRIORITY_COUNT; index += 1) {
      firstBatch.push(loadFrame(index));
    }
    await Promise.all(firstBatch);

    let next = INITIAL_PRIORITY_COUNT;
    const loadChunk = deadline => {
      if (destroyed) return;
      let loaded = 0;
      while (next < files.length && (deadline?.timeRemaining?.() > 4 || loaded < 3)) {
        loadFrame(next);
        next += 1;
        loaded += 1;
      }
      if (next < files.length) {
        if ('requestIdleCallback' in window) requestIdleCallback(loadChunk, { timeout: 600 });
        else setTimeout(() => loadChunk(null), 40);
      }
    };

    if ('requestIdleCallback' in window) requestIdleCallback(loadChunk, { timeout: 500 });
    else setTimeout(() => loadChunk(null), 40);
  }

  function onResize() {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      sizeCanvas();
      sequenceTrigger?.refresh();
    });
  }

  function setupScroll() {
    if (reduceMotion.matches || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      fallback?.classList.add('is-visible');
      canvas.hidden = files.length === 0;
      copies.forEach((element, index) => {
        element.style.opacity = index === 0 ? '1' : '0';
        element.style.visibility = index === 0 ? 'visible' : 'hidden';
      });
      return;
    }

    sequenceTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate(self) {
        const progress = clamp(self.progress);
        if (files.length) {
          const framePhase = clamp(progress / FRAME_END);
          targetFrame = Math.min(files.length - 1, Math.floor(framePhase * files.length));
          requestDraw();
        }
        renderNarrative(progress);
      }
    });
    renderNarrative(0);
  }

  function destroy() {
    destroyed = true;
    stopAutoplay();
    sequenceTrigger?.kill();
    cancelAnimationFrame(drawRaf);
    cancelAnimationFrame(resizeRaf);
    window.removeEventListener('resize', onResize);
    images.forEach(image => {
      if (image) image.onload = image.onerror = null;
    });
  }

  const playButton = document.getElementById('sequence-play');
  const playLabel = playButton?.querySelector('.sequence-play-label');
  // const AUTOPLAY_FRAME_MS = 11000;
  const AUTOPLAY_FRAME_MS = 9000;
  const AUTOPLAY_TEXT_MS = 16000;

  let autoplayRaf = 0;
  let autoplayLast = 0;
  let autoplayProgress = 0;

  function label(key, fallback) {
    return window.SiteFlowI18n?.t(key) || fallback;
  }

  function syncPlayButton() {
    if (!playButton) return;
    const playing = autoplayRaf !== 0;
    playButton.classList.toggle('is-playing', playing);
    playButton.setAttribute('aria-pressed', playing ? 'true' : 'false');
    if (playLabel) {
      playLabel.textContent = playing
        ? label('sequence.stop', 'Detener')
        : label('sequence.play', 'Ver animación');
    }
  }

  function heroRange() {
    return {
      start: section.offsetTop,
      distance: Math.max(1, section.offsetHeight - window.innerHeight)
    };
  }

  function stopAutoplay() {
    if (!autoplayRaf) return;
    cancelAnimationFrame(autoplayRaf);
    autoplayRaf = 0;
    syncPlayButton();
  }

  function autoplayStep(now) {
    const { start, distance } = heroRange();
    const delta = Math.min(64, now - autoplayLast);
    autoplayLast = now;
    const rate = autoplayProgress < FRAME_END
      ? FRAME_END / AUTOPLAY_FRAME_MS
      : (1 - FRAME_END) / AUTOPLAY_TEXT_MS;

    autoplayProgress = clamp(autoplayProgress + rate * delta);
    window.scrollTo({ top: Math.round(start + autoplayProgress * distance), behavior: 'instant' });

    if (autoplayProgress >= 1) {
      autoplayRaf = 0;
      syncPlayButton();
      return;
    }
    autoplayRaf = requestAnimationFrame(autoplayStep);
  }

  function startAutoplay() {
    const { start, distance } = heroRange();
    autoplayProgress = clamp((window.scrollY - start) / distance);
    if (autoplayProgress > .98) {
      autoplayProgress = 0;
      window.scrollTo({ top: start, behavior: 'instant' });
    }
    autoplayLast = performance.now();
    autoplayRaf = requestAnimationFrame(autoplayStep);
    syncPlayButton();
  }

  function setupAutoplay() {
    if (!playButton) return;
    if (reduceMotion.matches || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    playButton.hidden = false;
    syncPlayButton();
    playButton.addEventListener('click', () => {
      if (autoplayRaf) stopAutoplay();
      else startAutoplay();
    });

    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(type => {
      window.addEventListener(type, event => {
        if (event.target === playButton || playButton.contains(event.target)) return;
        stopAutoplay();
      }, { passive: true });
    });

    document.addEventListener('langchange', syncPlayButton);
  }

  sizeCanvas();
  fallback?.classList.add('is-visible');
  setupScroll();
  setupAutoplay();
  preloadSequence();
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('pagehide', destroy, { once: true });
})();
