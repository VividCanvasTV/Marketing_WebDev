import { prepare } from './lib/layout.js';

// ===========================
// PRELOADER
// Tracks every video (first frame), every background image, and the
// fonts. Updates the gold ring's progress arc and the % counter.
// When everything is in (or after a short safety timeout), fades the
// loader out and lets the intro's animation run.
// ===========================
function vcInitLoader() {
  const loader = document.getElementById('vc-loader');
  if (!loader) return;

  const progressEl = loader.querySelector('.vc-loader-progress');
  const percentEl = document.getElementById('vc-loader-percent');
  const CIRC = 2 * Math.PI * 52; // matches r=52 in the SVG

  const images = ['assets/bg.png', 'assets/bg_bottom.png'];
  // Keep video files non-blocking. The gallery uses very large public MP4s,
  // so the loader only waits on lightweight visual shell assets and fonts.
  const totalAssets = images.length + 1;
  let loaded = 0;
  let displayed = 0;
  let finished = false;

  function render() {
    // Smoothly tween the displayed count toward the actual count so the
    // % counter doesn't snap when several assets land in the same tick.
    displayed += (loaded - displayed) * 0.25;
    const pct = Math.min(displayed / totalAssets, 1);
    progressEl.style.strokeDashoffset = String(CIRC * (1 - pct));
    percentEl.textContent = Math.round(pct * 100) + '%';

    if (loaded >= totalAssets && Math.abs(displayed - loaded) < 0.05) {
      finish();
    } else {
      requestAnimationFrame(render);
    }
  }

  function finish() {
    if (finished) return;
    finished = true;
    progressEl.style.strokeDashoffset = '0';
    percentEl.textContent = '100%';
    // Hold the full ring for a beat, then fade
    setTimeout(() => {
      document.body.classList.remove('vc-loading');
      document.body.classList.add('vc-loaded');
      const hashTarget = window.location.hash ? document.querySelector(window.location.hash) : null;
      if (hashTarget) {
        setTimeout(() => {
          const targetTop = hashTarget.getBoundingClientRect().top + window.scrollY;
          const introEl = document.getElementById('vc-intro');
          if (introEl) {
            introEl.style.opacity = '0';
            introEl.style.visibility = 'hidden';
          }
          const offset = window.innerWidth > 768 ? 110 : 0;
          window.scrollTo({ top: Math.max(targetTop - offset, 0), behavior: 'auto' });
        }, 120);
      }
      // Remove from DOM after the fade so it doesn't capture taps
      setTimeout(() => { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 1100);
    }, 450);
  }

  function tick() { loaded++; }

  // Safety net — never trap the user behind the loader.
  setTimeout(() => { if (!finished) finish(); }, 3200);

  // Background images
  images.forEach(src => {
    const img = new Image();
    const done = () => { tick(); };
    img.onload = done;
    img.onerror = done;
    img.src = src;
  });

  // Fonts
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => tick(), () => tick());
  } else {
    tick();
  }

  requestAnimationFrame(render);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', vcInitLoader);
} else {
  vcInitLoader();
}

document.addEventListener('DOMContentLoaded', () => {

  const intro = document.getElementById('vc-intro');
  const videoItems = document.querySelectorAll('.vc-video-item');
  const scrollTexts = document.querySelectorAll('.vc-scroll-text[data-reveal]');
  const scrollInEls = document.querySelectorAll('.vc-scroll-in[data-reveal]');

  let currentPlayingItem = null;
  let hoveredItem = null;
  let expandedItem = null;
  let savedRect = null;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const previewOnScroll = !isTouch && !reduceMotion;

  // ===========================
  // 1. INTRO ZOOM/FADE ON SCROLL
  // As user scrolls the first 100vh, the intro
  // scales up and fades out, revealing the gallery.
  // ===========================

  function updateIntro() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const progress = Math.min(scrollY / vh, 1); // 0 at top, 1 at 100vh

    if (window.location.hash === '#vc-work' && scrollY > vh * 0.75) {
      intro.style.opacity = '0';
      intro.style.visibility = 'hidden';
      return;
    }

    // Scale from 1 → 2.5, opacity from 1 → 0
    const scale = 1 + progress * 1.5;
    const opacity = 1 - progress;

    intro.style.transform = `scale(${scale})`;
    intro.style.opacity = opacity;

    // Hide completely when scrolled past to free up pointer events
    if (progress >= 1) {
      intro.style.visibility = 'hidden';
    } else {
      intro.style.visibility = 'visible';
    }
  }

  window.addEventListener('scroll', updateIntro, { passive: true });
  updateIntro();

  document.querySelectorAll('a[href="#vc-work"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const target = document.getElementById('vc-work');
      if (!target) return;
      event.preventDefault();
      intro.style.opacity = '0';
      intro.style.visibility = 'hidden';
      const offset = window.innerWidth > 768 ? 110 : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.history.pushState(null, '', '#vc-work');
      window.scrollTo({ top: Math.max(targetTop - offset, 0), behavior: 'smooth' });
    });
  });

  // ===========================
  // 2. INTERACTIVE GRID BACKGROUND
  // ===========================

  const canvas = document.getElementById('vc-bg-canvas');
  const useAnimatedCanvas = canvas && !reduceMotion && window.innerWidth > 768;
  const ctx = useAnimatedCanvas ? canvas.getContext('2d') : null;
  let mouseX = 0.5, mouseY = 0.5, smoothX = 0.5, smoothY = 0.5;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  if (useAnimatedCanvas) {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    });
  } else if (canvas) {
    canvas.style.display = 'none';
  }

  function drawGrid() {
    smoothX += (mouseX - smoothX) * 0.05;
    smoothY += (mouseY - smoothY) * 0.05;

    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#f7f3eb';
    ctx.fillRect(0, 0, w, h);

    const gridSize = 120;
    const offsetX = (smoothX - 0.5) * 60;
    const offsetY = (smoothY - 0.5) * 60;

    // Primary grid
    ctx.strokeStyle = 'rgba(180, 165, 140, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = (offsetX % gridSize) - gridSize; x < w + gridSize; x += gridSize) {
      ctx.moveTo(x, 0); ctx.lineTo(x, h);
    }
    for (let y = (offsetY % gridSize) - gridSize; y < h + gridSize; y += gridSize) {
      ctx.moveTo(0, y); ctx.lineTo(w, y);
    }
    ctx.stroke();

    // Fine grid
    const fine = gridSize / 2;
    const fX = (offsetX * 0.6 % fine) - fine;
    const fY = (offsetY * 0.6 % fine) - fine;
    ctx.strokeStyle = 'rgba(180, 165, 140, 0.05)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = fX; x < w + fine; x += fine) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    for (let y = fY; y < h + fine; y += fine) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
    ctx.stroke();

    // Golden glow at nearest intersection
    const aX = Math.round((mouseX * w - offsetX) / gridSize) * gridSize + offsetX;
    const aY = Math.round((mouseY * h - offsetY) / gridSize) * gridSize + offsetY;
    const grad = ctx.createRadialGradient(aX, aY, 0, aX, aY, 80);
    grad.addColorStop(0, 'rgba(199, 170, 97, 0.08)');
    grad.addColorStop(1, 'rgba(199, 170, 97, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(aX - 80, aY - 80, 160, 160);

    ctx.fillStyle = 'rgba(199, 170, 97, 0.15)';
    ctx.beginPath();
    ctx.arc(aX, aY, 3, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(drawGrid);
  }
  if (useAnimatedCanvas) drawGrid();

  // ===========================
  // 3. SCROLL-IN ANIMATIONS
  // Videos pop in with stagger per row.
  // Text fades in on scroll.
  // ===========================

  if ('IntersectionObserver' in window) {
    const scrollInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const row = entry.target.closest('.vc-row');
          if (row) {
            const siblings = row.querySelectorAll('.vc-scroll-in');
            const index = Array.from(siblings).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.15}s`;
          }
          entry.target.classList.add('vc-visible');
          scrollInObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    scrollInEls.forEach(el => scrollInObserver.observe(el));

    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('vc-revealed', entry.isIntersecting);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });

    scrollTexts.forEach(el => textObserver.observe(el));
  } else {
    scrollInEls.forEach(el => el.classList.add('vc-visible'));
    scrollTexts.forEach(el => el.classList.add('vc-revealed'));
  }

  // ===========================
  // 4. PRETEXT
  // ===========================
  scrollTexts.forEach(el => {
    try { prepare(el.textContent.trim(), '40px "Cormorant Garamond"'); } catch (e) {}
  });

  // ===========================
  // 5. VIDEO PLAYBACK + REAL AUDIO
  // ===========================

  function setPlayingVideo(item, withAudio = false) {
    if (currentPlayingItem === item && !withAudio) return;
    if (currentPlayingItem && currentPlayingItem !== item) {
      currentPlayingItem.classList.remove('vc-active');
      const oldVid = currentPlayingItem.querySelector('video');
      if (oldVid) { oldVid.muted = true; oldVid.pause(); }
    }
    currentPlayingItem = item;
    if (currentPlayingItem) {
      currentPlayingItem.classList.add('vc-active');
      const newVid = currentPlayingItem.querySelector('video');
      if (newVid) { newVid.muted = !withAudio; newVid.play().catch(() => {}); }
    }
  }

  function checkCenterVideo() {
    if (hoveredItem || expandedItem) return;
    const vc = window.innerHeight / 2;
    let closest = null, minDist = Infinity;
    videoItems.forEach(item => {
      const r = item.getBoundingClientRect();
      const d = Math.abs(vc - (r.top + r.height / 2));
      if (d < minDist && r.bottom > 0 && r.top < window.innerHeight) { minDist = d; closest = item; }
    });
    setPlayingVideo(closest && minDist < window.innerHeight * 0.4 ? closest : null, false);
  }

  if (previewOnScroll) {
    window.addEventListener('scroll', checkCenterVideo, { passive: true });
    checkCenterVideo();
  }

  // ===========================
  // 6. EXPAND VIDEO ON HOVER/TAP
  // Desktop: click to expand, click backdrop/X to close.
  // Mobile: tap to expand, tap backdrop/X to close.
  // Smoothly animates from grid position to fullscreen.
  // ===========================

  const backdrop = document.getElementById('vc-expand-backdrop');
  const closeBtn = document.getElementById('vc-expand-close');

  /*
    Simple & bulletproof:
      - Add .vc-expanded → CSS pins the item to the viewport (100dvw × 100dvh)
        and runs a quick fade+scale-in keyframe.
      - Video uses object-fit: cover so it fills the screen for any source ratio.
      - Remove the class → it returns to its grid cell, and a quick CSS
        transition on the cell handles the fade-back.
    No JS-driven inline transforms, no FLIP timing fragility, no stale
    transform leaving the video stuck behind the backdrop.
  */
  /*
    CRITICAL: An ancestor (.vc-scroll-in.vc-visible) has `transform: scale(1)`
    on it for the scroll-in animation. A non-`none` transform on any ancestor
    makes that ancestor the containing block for `position: fixed` descendants
    — so the expanded item would stay glued to its grid cell instead of
    filling the viewport. Solution: move the item to <body> while expanded,
    where no transformed ancestor exists, then put it back on collapse.
  */
  /*
    Pick `object-fit: cover` only when the video's aspect ratio is in the
    same orientation as the viewport (and reasonably close). Otherwise use
    `contain` so vertical videos aren't zoomed in on a wide screen, and
    landscape videos aren't zoomed in on a portrait phone.
  */
  function applyVideoFit(item) {
    const vid = item.querySelector('video');
    if (!vid) return;
    const apply = () => {
      const vw = vid.videoWidth;
      const vh = vid.videoHeight;
      if (!vw || !vh) return; // metadata not ready yet
      const videoRatio = vw / vh;
      const viewRatio = window.innerWidth / window.innerHeight;
      const videoLandscape = videoRatio >= 1;
      const viewLandscape = viewRatio >= 1;
      // Same orientation AND within ~30% of each other → cover looks right.
      // Otherwise letterbox so the whole frame is visible.
      const close = Math.abs(videoRatio - viewRatio) / Math.max(videoRatio, viewRatio) < 0.3;
      if (videoLandscape === viewLandscape && close) {
        item.classList.add('vc-fit-cover');
      } else {
        item.classList.remove('vc-fit-cover');
      }
    };
    if (vid.videoWidth && vid.videoHeight) {
      apply();
    } else {
      vid.addEventListener('loadedmetadata', apply, { once: true });
    }
  }

  function expandVideo(item) {
    if (expandedItem) return;
    expandedItem = item;

    // Remember where to put it back. Use a placeholder so the grid cell
    // keeps the same reflow behavior while the item is detached.
    const placeholder = document.createComment('vc-expand-placeholder');
    item.parentNode.insertBefore(placeholder, item);
    item._vcPlaceholder = placeholder;

    document.body.appendChild(item);

    item.classList.add('vc-expanded');
    applyVideoFit(item);
    backdrop.classList.add('vc-active');
    closeBtn.classList.add('vc-active');
    document.body.classList.add('vc-locked');

    const vid = item.querySelector('video');
    if (vid) {
      vid.muted = false;
      const p = vid.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => { vid.muted = true; vid.play().catch(() => {}); });
      }
    }
  }

  function collapseVideo() {
    if (!expandedItem) return;
    const item = expandedItem;
    const vid = item.querySelector('video');
    if (vid) {
      vid.muted = true;
      if (!previewOnScroll) vid.pause();
    }

    item.classList.remove('vc-expanded');
    item.classList.remove('vc-fit-cover');
    backdrop.classList.remove('vc-active');
    closeBtn.classList.remove('vc-active');
    document.body.classList.remove('vc-locked');

    // Put the item back where it was in the grid
    const placeholder = item._vcPlaceholder;
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.replaceChild(item, placeholder);
    }
    delete item._vcPlaceholder;

    expandedItem = null;
    savedRect = null;
    if (previewOnScroll) checkCenterVideo();
  }

  // Re-pick fit on viewport changes (rotation, resize) while expanded
  window.addEventListener('resize', () => {
    if (expandedItem) applyVideoFit(expandedItem);
  });

  // Tap / click toggles expand. Same handler for mobile and desktop —
  // the browser's synthetic click on tap fires here.
  videoItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Don't let a click bubble to backdrop and immediately collapse
      e.stopPropagation();
      if (expandedItem === item) {
        collapseVideo();
      } else if (!expandedItem) {
        expandVideo(item);
      }
    });

    // Desktop hover — preview with audio (but don't expand on hover;
    // expanding on hover would be jarring and accidental).
    if (!isTouch) {
      item.addEventListener('mouseenter', () => {
        if (expandedItem) return;
        hoveredItem = item;
        setPlayingVideo(item, true);
      });
      item.addEventListener('mouseleave', () => {
        if (expandedItem) return;
        const vid = item.querySelector('video');
        if (vid) vid.muted = true;
        hoveredItem = null;
        if (previewOnScroll) checkCenterVideo();
      });
    }
  });

  // Close on backdrop click or X button
  backdrop.addEventListener('click', collapseVideo);
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); collapseVideo(); });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && expandedItem) collapseVideo();
  });
});
