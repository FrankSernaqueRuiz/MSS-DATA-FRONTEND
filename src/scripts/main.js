import { translations } from '../data/translations.js';

// Application State
const state = {
  currentLang: localStorage.getItem('mss_data_lang') || 'es'
};

// DOM Elements (queried lazily after DOM load)
let navbarWrapper, langModal, langOpenBtns, langCloseBtn;
let langOptions, currentLangLabel, mobileMenuBtn, navMenu;
let contactForm, formAlert;

function queryElements() {
  navbarWrapper = document.getElementById('navbarWrapper');
  langModal = document.getElementById('langModal');
  langOpenBtns = document.querySelectorAll('.btn-lang-trigger');
  langCloseBtn = document.getElementById('closeLangModal');
  langOptions = document.querySelectorAll('.lang-option-card');
  currentLangLabel = document.getElementById('currentLangLabel');
  mobileMenuBtn = document.getElementById('mobileMenuBtn');
  navMenu = document.getElementById('navMenu');
  contactForm = document.getElementById('contactForm');
  formAlert = document.getElementById('formAlert');
}

// Update all translated elements
function applyLanguage(lang) {
  if (!translations[lang]) return;
  state.currentLang = lang;
  localStorage.setItem('mss_data_lang', lang);
  document.documentElement.lang = lang;

  const dict = translations[lang];

  if (dict.metaTitle) document.title = dict.metaTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && dict.metaDescription) {
    metaDesc.setAttribute('content', dict.metaDescription);
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  if (currentLangLabel) {
    currentLangLabel.textContent = lang === 'es' ? 'ES' : 'EN';
  }

  langOptions.forEach((card) => {
    const cardLang = card.getAttribute('data-lang');
    card.classList.toggle('active', cardLang === lang);
  });
}

function initLanguagePanel() {
  langOpenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      langModal.classList.add('open');
    });
  });

  langCloseBtn?.addEventListener('click', () => {
    langModal.classList.remove('open');
  });

  langModal?.addEventListener('click', (e) => {
    if (e.target === langModal) langModal.classList.remove('open');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && langModal?.classList.contains('open')) {
      langModal.classList.remove('open');
    }
  });

  langOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const selected = option.getAttribute('data-lang');
      applyLanguage(selected);
      setTimeout(() => langModal.classList.remove('open'), 150);
    });
  });
}

function initNavbarScroll() {
  const onScroll = () => {
    navbarWrapper?.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}

function initMobileMenu() {
  mobileMenuBtn?.addEventListener('click', () => {
    navMenu?.classList.toggle('mobile-open');
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('mobile-open');
    });
  });
}

function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.innerHTML = originalHTML;

      if (formAlert) {
        formAlert.classList.add('success');
        formAlert.style.display = 'flex';
        setTimeout(() => { formAlert.style.display = 'none'; }, 5000);
      }
    }, 700);
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  queryElements();
  applyLanguage(state.currentLang);
  initNavbarScroll();
  initLanguagePanel();
  initMobileMenu();
  initContactForm();
  initScrollSpy();
});
