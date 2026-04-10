/* =========================================================
   HillBeats – assets/js/app.js
   Language switcher · Scroll-reveal · Burger menu · Nav scroll
   ========================================================= */
'use strict';

// ============================================================
// Page-enter animation
// Marks <html> with .js so the CSS animation is opt-in,
// then triggers the slide-in/fade-in on next paint.
// ============================================================
document.documentElement.classList.add('js');
document.body.classList.add('page-enter');
requestAnimationFrame(function () {
  requestAnimationFrame(function () {
    document.body.classList.add('page-enter--ready');
  });
});

// ============================================================
// Translations
// ============================================================
const TRANSLATIONS = {
  de: {
    'nav.home':               'Startseite',
    'nav.releases':           'Releases',
    'nav.about':              'Über uns',
    'nav.media':              'Impressum',
    'nav.tour':               'Tour',
    'nav.contact':            'Kontakt',
    'hero.title':             'Somniatores',
    'hero.slogan':            'A better world',
    'hero.listen':            'Jetzt Hören',
    'hero.booking':           'Booking',
    'release.title':          'Aktueller Release',
    'release.tag':            'Neuerscheinung',
    'release.name':           '„Wake up call" – EP',
    'release.desc':           'Ein Lied über eine bessere Welt.',
    'release.spotify':        'Spotify',
    'release.apple':          'Apple Music',
    'release.youtube':        'YouTube',
    'Amazon Music':           'Amazon Music',
    'releases.title':         'Releases',
    'demo.title':             'Demos',
    'releases.tag':           'Neuerscheinung',
    'releases.name':          '„Wake up Call"',
    'releases.artist':        'Somniatores',
    'releases.date':          'Veröffentlichung: 2026',
    'releases.desc':          'Ein Lied über eine bessere Welt.',
    'releases.spotify':       'Spotify',
    'releases.apple':         'Apple Music',
    'releases.youtube':       'YouTube',
    'about.title':            'Über Somniatores',
    'about.geschichte':       'Geschichte',
    'about.credits':          'Credits',
    'about.p1':               'HillBeats ist ein unabhängiges Musik-Label und eine Live-Band aus den Hügeln. Gegründet mit der Vision, authentischen Sound ohne Kompromisse zu erschaffen.',
    'about.p2':               'Unsere Musik verbindet elektronische Beats mit akustischen Instrumenten – ein Sound, der bewegt.',
    'about.cta':              'Booking anfragen',
    'media.title':            'Media',
    'media.video1':           'Live at Hill Stage',
    'media.video2':           'Studio Session Vol. 1',
    'media.photo1':           'Backstage 2024',
    'tour.title':             'Tour Dates',
    'tour.de':                'Deutschland',
    'tour.at':                'Österreich',
    'tour.tickets':           'Tickets',
    'newsletter.title':       'Newsletter',
    'newsletter.desc':        'Bleib up-to-date mit neuen Releases, Tour-Dates und exklusiven Inhalten.',
    'newsletter.emailLabel':  'E-Mail-Adresse',
    'newsletter.placeholder': 'deine@email.de',
    'newsletter.submit':      'Anmelden',
    'footer.slogan':          'Sound der Hügel',
    'footer.copy':            '© 2026 HillBeats. Alle Rechte vorbehalten.',
    'nav.privacy':            'Datenschutz',
    'nav.burgerLabel':        'Menü öffnen',
    'lang.label':             'Sprache wählen',
    'band.title':             'Die Band',
  },
  en: {
    'nav.home':               'Home',
    'nav.releases':           'Releases',
    'nav.about':              'About',
    'nav.media':              'Impressum',
    'nav.tour':               'Tour',
    'nav.contact':            'Contact',
    'hero.title':             'Somniatores',
    'hero.slogan':            'A better world',
    'hero.listen':            'Listen Now',
    'hero.booking':           'Booking',
    'release.title':          'Latest Release',
    'release.tag':            'New Release',
    'release.name':           '"Wake up call" – EP',
    'release.desc':           'a track for a better world.',
    'release.spotify':        'Spotify',
    'release.apple':          'Apple Music',
    'release.youtube':        'YouTube',
    'releases.amazonmusic':   'Amazon Music',
    'releases.title':         'Releases',
    'demo.title':             'Demos',
    'releases.tag':           'New Release',
    'releases.name':          '"Wake up Call"',
    'releases.artist':        'Somniatores',
    'releases.date':          'Release date: 2026',
    'releases.desc':          'A song about a better world.',
    'releases.spotify':       'Spotify',
    'releases.apple':         'Apple Music',
    'releases.youtube':       'YouTube',
    'about.title':            'About Somniatores',
    'about.geschichte':       'Story',
    'about.credits':          'Credits',
    'about.p1':               'HillBeats is an independent music label and live band from the hills. Founded with the vision of creating authentic sound without compromise.',
    'about.p2':               'Our music blends electronic beats with acoustic instruments – a sound that moves.',
    'about.cta':              'Request Booking',
    'media.title':            'Media',
    'media.video1':           'Live at Hill Stage',
    'media.video2':           'Studio Session Vol. 1',
    'media.photo1':           'Backstage 2024',
    'tour.title':             'Tour Dates',
    'tour.de':                'Germany',
    'tour.at':                'Austria',
    'tour.tickets':           'Tickets',
    'newsletter.title':       'Newsletter',
    'newsletter.desc':        'Stay up-to-date with new releases, tour dates and exclusive content.',
    'newsletter.emailLabel':  'Email address',
    'newsletter.placeholder': 'your@email.com',
    'newsletter.submit':      'Subscribe',
    'footer.slogan':          'Sound of the Hills',
    'footer.copy':            '© 2026 HillBeats. All rights reserved.',
    'nav.privacy':            'Privacy Policy',
    'nav.burgerLabel':        'Open menu',
    'lang.label':             'Select language',
    'band.title':             'The Band',
  },
};

// ============================================================
// Language helpers
// ============================================================
function detectLanguage() {
  const saved = localStorage.getItem('hillbeats-lang');
  if (saved && TRANSLATIONS[saved]) return saved;
  const browser = (navigator.language || 'de').split('-')[0].toLowerCase();
  return TRANSLATIONS[browser] ? browser : 'de';
}

function applyLanguage(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
  });

  const langCurrent = document.getElementById('lang-current');
  if (langCurrent) langCurrent.textContent = lang.toUpperCase();

  document.querySelectorAll('#lang-list [data-lang]').forEach(opt => {
    opt.setAttribute('aria-selected', String(opt.getAttribute('data-lang') === lang));
  });

  // Show/hide bilingual blocks (used on impressum page)
  document.querySelectorAll('[data-lang]').forEach(el => {
    if (el.closest('#lang-list')) return; // skip the language switcher options
    if (el.getAttribute('data-lang') === lang) el.removeAttribute('hidden');
    else el.setAttribute('hidden', '');
  });

  localStorage.setItem('hillbeats-lang', lang);
}

// ============================================================
// Language dropdown
// ============================================================
function initLangDropdown() {
  const btn  = document.getElementById('lang-btn');
  const list = document.getElementById('lang-list');
  if (!btn || !list) return;

  function open()   { list.classList.add('open');    btn.setAttribute('aria-expanded', 'true');  }
  function close()  { list.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  function toggle() { list.classList.contains('open') ? close() : open(); }

  btn.addEventListener('click', e => { e.stopPropagation(); toggle(); });

  list.querySelectorAll('[data-lang]').forEach(opt => {
    opt.setAttribute('tabindex', '0');

    opt.addEventListener('click', () => {
      applyLanguage(opt.getAttribute('data-lang'));
      close();
    });

    opt.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        applyLanguage(opt.getAttribute('data-lang'));
        close();
        btn.focus();
      }
    });
  });

  document.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { close(); btn.focus(); }
  });
}

// ============================================================
// Burger menu
// ============================================================
function initBurger() {
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  if (!burger || !navLinks) return;

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================================
// Sticky navbar shadow
// ============================================================
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============================================================
// Scroll-reveal (IntersectionObserver)
// ============================================================
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// ============================================================
// Newsletter feedback
// ============================================================
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('.nl-input');
    if (!input || !input.value) return;

    const lang = localStorage.getItem('hillbeats-lang') || 'de';
    const msg  = lang === 'de'
      ? 'Danke! Du bist angemeldet.'
      : 'Thank you! You are subscribed.';

    const feedback = document.createElement('p');
    feedback.textContent = msg;
    feedback.style.cssText = 'color:#c9a74d;margin-top:1rem;font-weight:600;';
    feedback.setAttribute('role', 'status');
    form.after(feedback);
    form.reset();
    setTimeout(() => feedback.remove(), 4000);
  });
}

// ============================================================
// Smooth scroll (Safari polyfill)
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ============================================================
// Hero zoom on scroll (requestAnimationFrame-driven)
// ============================================================
function initHeroZoom() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero   = document.getElementById('hero');
  const heroBg = hero ? hero.querySelector('.hero-bg-img') : null;
  if (!hero || !heroBg) return;

  const MAX_SCALE_INCREASE = 0.12;
  let ticking = false;

  function updateZoom() {
    const progress = Math.min(window.scrollY / hero.offsetHeight, 1);
    heroBg.style.transform = 'scale(' + (1 + progress * MAX_SCALE_INCREASE) + ')';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateZoom);
      ticking = true;
    }
  }, { passive: true });
}

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const lang = detectLanguage();
  applyLanguage(lang);
  initLangDropdown();
  initBurger();
  initNavScroll();
  initScrollReveal();
  initNewsletter();
  initSmoothScroll();
  initHeroZoom();
});
