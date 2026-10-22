export const routes = {
  '/': { page: 'home', title: 'Your options, clearly explained' },
  '/treatments': { page: 'treatments', title: 'Your treatment guide' },
  '/your-visit': { page: 'visit', title: 'Your consultation, step by step' },
  '/doctors': { page: 'doctors', title: 'Meet the doctors' },
  '/clinics': { page: 'clinics', title: 'Find your clinic' },
  '/articles': { page: 'articles', nav: '/articles', title: 'Consultation guides and articles', description: 'Read practical guides to aesthetic consultations, questions to ask and planning your next step. Explore in-clinic and video consultation information.' },
  '/articles/first-aesthetic-consultation': { page: 'article', nav: '/articles', title: 'Your first aesthetic consultation: what to expect', description: 'Prepare for your first aesthetic consultation: what to bring, questions to ask, and what to expect from a video call or an in-clinic appointment.' },
  '/questions': { page: 'questions', title: 'Before your consultation' },
};

const legacy = { '#main': '/', '#top': '/', '#menu': '/treatments', '#visits': '/your-visit', '#doctors': '/doctors', '#clinics': '/clinics', '#questions': '/questions' };

export function routeFor(pathname, hash = '') {
  if (legacy[hash]) return legacy[hash];
  const path = pathname.replace(/\/+$/, '') || '/';
  return Object.hasOwn(routes, path) ? path : null;
}

export function setupNavigation(beforeChange) {
  const root = document.documentElement;
  const main = document.querySelector('main');
  const views = [...main.querySelectorAll(':scope > .page-view')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let animation;
  const description = document.querySelector('meta[name="description"]');
  const shareTitle = document.querySelector('meta[property="og:title"]');
  const shareDescription = document.querySelector('meta[property="og:description"]');
  const shareType = document.querySelector('meta[property="og:type"]');
  const defaults = { description: description.content, title: shareTitle.content, share: shareDescription.content };


  history.scrollRestoration = 'manual';

  function show(path, focus) {
    const route = routes[path];
    root.dataset.page = route.page;
    for (const view of views) view.hidden = view.dataset.page !== route.page;
    for (const link of document.querySelectorAll('[data-page-link]')) {
      if (new URL(link.href).pathname === (route.nav || path)) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    document.title = route.title + ' | Aurelis Clinic';
    description.content = route.description || defaults.description;
    shareTitle.content = route.description ? document.title : defaults.title;
    shareDescription.content = route.description || defaults.share;
    shareType.content = route.page === 'article' ? 'article' : 'website';
    main.scrollTo({ top: 0, behavior: 'instant' });
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (focus) {
      const heading = views.find(view => !view.hidden).querySelector('h1, h2');
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }

  function navigate(path, { write = true, replace = false, animate = true, focus = true } = {}) {
    if (!routes[path]) return;
    const unchanged = root.dataset.page === routes[path].page;
    beforeChange?.();
    for (const dialog of document.querySelectorAll('dialog[open]')) dialog.close();
    if (write && (path !== location.pathname || location.hash)) history[replace ? 'replaceState' : 'pushState']({ page: path }, '', path);
    animation?.cancel();
    show(path, focus);
    if (!animate || motion.matches || unchanged) return;
    // Keep every frame opaque; fading the only page to zero creates a visible blink.
    animation = views.find(view => !view.hidden).animate([{ transform: 'translateY(5px)' }, { transform: 'none' }], { duration: 220, easing: 'cubic-bezier(.22,1,.36,1)' });
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
    if (link.getAttribute('href') === '#main') {
      event.preventDefault();
      main.focus({ preventScroll: true });
      main.scrollTo({ top: 0, behavior: 'instant' });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const url = new URL(link.href);
    if (url.origin !== location.origin) return;
    const path = routeFor(url.pathname, url.hash);
    if (!path) return;
    event.preventDefault();
    navigate(path);
  });

  window.addEventListener('popstate', () => navigate(routeFor(location.pathname, location.hash) || '/', { write: false }));
  window.addEventListener('hashchange', () => {
    if (legacy[location.hash]) navigate(legacy[location.hash], { replace: true });
  });
  motion.addEventListener('change', () => { if (motion.matches) animation?.cancel(); });

  const initial = routeFor(location.pathname, location.hash) || '/';
  if (initial !== location.pathname || location.hash) history.replaceState({ page: initial }, '', initial + location.search);
  navigate(initial, { write: false, animate: false, focus: false });
}
