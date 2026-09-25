const menuButton = document.querySelector('.mobile-menu-button');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.querySelector('i').className = 'fa-solid fa-bars';
}));
const filters = [...document.querySelectorAll('.filter-button')];
const cards = [...document.querySelectorAll('.menu-card')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));


const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  themeIcon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}
let savedTheme;
try { savedTheme = localStorage.getItem('cozy-castle-theme'); } catch (_) { /* Storage may be blocked. */ }
setTheme(savedTheme === 'light' ? 'light' : 'dark');
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('cozy-castle-theme', next); } catch (_) { /* Keep the current theme for this visit. */ }
});

// Reveal content once it enters the viewport, without hiding it when JS is unavailable.
const revealTargets = document.querySelectorAll(
  '.intro-grid > *, .menu .section-head > *, .filter-list, .menu-card, .feature-image, .feature-content > *, .story-photos, .story-copy > *, .gallery .section-head > *, .gallery-grid figure, .visit-banner .wrap > *, .contact-details > *, .map-frame, .footer-top > *'
);
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach(target => target.classList.add('reveal-on-scroll'));
  document.documentElement.classList.add('js-reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
  revealTargets.forEach(target => revealObserver.observe(target));
}
