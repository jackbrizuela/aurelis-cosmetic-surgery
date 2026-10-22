// Play Jack's supplied film once, then land its final frame in the real Home artwork area.
export function setupEntrance() {
  const root = document.documentElement;
  if (root.dataset.entrance !== 'pending') return () => {};
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const app = document.querySelector('.app-window');
  const footer = document.querySelector('.site-footer');
  const hero = document.querySelector('.hero-media img');
  const blocked = [app, footer, document.querySelector('.skip-link')].filter(Boolean);
  const priorInert = blocked.map(element => element.inert);
  const controller = new AbortController();
  const animations = [];
  let finished = false;
  let landing = false;
  let finishTimer;
  let overlay;
  let skip;
  let video;

  function finish() {
    if (finished) return;
    finished = true;
    const restoreFocus = document.activeElement === skip;
    clearTimeout(finishTimer);
    controller.abort();
    animations.forEach(animation => animation.cancel());
    if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
    blocked.forEach((element, index) => { element.inert = priorInert[index]; });
    root.removeAttribute('data-entrance');
    overlay?.remove();
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', finish);
    window.removeEventListener('pagehide', finish);
    motion.removeEventListener('change', onMotion);
    if (restoreFocus) {
      const heading = document.querySelector('.page-view:not([hidden]) h1, .page-view:not([hidden]) h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }
  }
  function onKey(event) { if (event.key === 'Escape') { event.preventDefault(); finish(); } }
  function onMotion() { if (motion.matches) finish(); }
  function animate(element, frames, options) {
    const animation = element.animate(frames, { fill: 'both', ...options });
    animations.push(animation);
    return animation;
  }
  if (motion.matches) { finish(); return finish; }
  finishTimer = setTimeout(finish, 17000);
  window.addEventListener('keydown', onKey);
  window.addEventListener('resize', finish);
  window.addEventListener('pagehide', finish);
  motion.addEventListener('change', onMotion);

  function start() {
    overlay = document.createElement('div');
    overlay.className = 'entrance';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Welcome to Aurelis');
    overlay.innerHTML = '<div class="entrance-backdrop"></div><span class="entrance-brand" aria-hidden="true">Aurelis<span>Clinic</span></span><button class="btn entrance-skip" type="button">Skip introduction <span aria-hidden="true">↗</span></button><div class="entrance-figure" aria-hidden="true"></div>';
    document.body.append(overlay);
    skip = overlay.querySelector('button');
    skip.addEventListener('click', finish);
    blocked.forEach(element => { element.inert = true; });
    skip.focus({ preventScroll: true });
    const stage = overlay.querySelector('.entrance-figure');
    const homeVisible = root.dataset.page === 'home';
    const target = homeVisible ? hero.getBoundingClientRect() : {
      width: Math.min(innerWidth * .7, 540), height: Math.min(innerWidth * .7, 540) * .75,
      left: (innerWidth - Math.min(innerWidth * .7, 540)) / 2,
      top: (innerHeight - Math.min(innerWidth * .7, 540) * .75) / 2,
    };
    if (!target.width || !target.height) { finish(); return; }
    const opening = { left: '0px', top: '0px', width: `${innerWidth}px`, height: `${innerHeight}px`, borderRadius: '0px' };
    Object.assign(stage.style, opening, { background: 'var(--surface)', overflow: 'hidden' });
    const ratio = 16 / 9;
    // Keep the thought cloud and woman together when a tall viewport crops the film.
    const openingWidth = Math.min(Math.max(innerWidth, innerHeight * ratio), innerWidth * 2);
    const openingHeight = openingWidth / ratio;
    const openingTop = Math.max(0, (innerHeight - openingHeight) / 2);
    const rightAligned = innerWidth - openingWidth;
    const settledLeft = -Math.min((openingWidth - innerWidth) / 2, openingWidth * .14);
    const endingWidth = Math.max(target.width, target.height * ratio);
    const endingHeight = endingWidth / ratio;
    video = document.createElement('video');
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('aria-hidden', 'true');
    video.setAttribute('tabindex', '-1');
    Object.assign(video.style, { display: 'block', position: 'absolute', left: `${rightAligned}px`, top: `${openingTop}px`, width: `${openingWidth}px`, height: `${openingHeight}px`, visibility: 'hidden' });
    video.addEventListener('playing', () => {
      video.style.visibility = 'visible';
      animate(overlay.querySelector('.entrance-brand'), [{ opacity: 1 }, { opacity: 0 }], { duration: 250, delay: 500 });
      // Follow her walk while retaining room for the thoughts beside her.
      animate(video, [
        { left: `${rightAligned}px`, offset: 0 }, { left: `${rightAligned}px`, offset: .1 },
        { left: `${settledLeft}px`, offset: .4 }, { left: `${settledLeft}px`, offset: 1 },
      ], { duration: 10000, easing: 'linear' });
    }, { once: true, signal: controller.signal });
    video.addEventListener('error', finish, { once: true, signal: controller.signal });
    video.addEventListener('ended', () => {
      if (finished || landing) return;
      landing = true;
      root.dataset.entrance = 'landing';
      const duration = 1400;
      const easing = 'cubic-bezier(.22,1,.36,1)';
      animate(stage, [opening, { left: `${target.left}px`, top: `${target.top}px`, width: `${target.width}px`, height: `${target.height}px`, borderRadius: '18px' }], { duration, easing });
      animate(video, [
        { left: `${settledLeft}px`, top: `${openingTop}px`, width: `${openingWidth}px`, height: `${openingHeight}px` },
        { left: `${(target.width - endingWidth) / 2}px`, top: `${(target.height - endingHeight) / 2}px`, width: `${endingWidth}px`, height: `${endingHeight}px` },
      ], { duration, easing });
      animate(overlay.querySelector('.entrance-backdrop'), [{ opacity: 1 }, { opacity: 0 }], { duration: 1000, easing });
      animate(app, [{ opacity: 0, transform: 'scale(.985)' }, { opacity: 1, transform: 'none' }], { duration: 1100, easing });
      if (footer) animate(footer, [{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 500 });
      clearTimeout(finishTimer);
      finishTimer = setTimeout(finish, duration + 30);
    }, { once: true, signal: controller.signal });
    video.src = '/assets/living-contour-thoughts-1080p.mp4';
    stage.append(video);
    root.dataset.entrance = 'drawing';
    video.play().catch(finish);
  }
  try { start(); } catch { finish(); }
  return finish;
}
