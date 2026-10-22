import { translations } from './translations.js';

// Application State
const state = {
  currentLang: localStorage.getItem('mss_data_lang') || 'es'
};

// DOM Elements
const navbarWrapper = document.getElementById('navbarWrapper');
const langModal = document.getElementById('langModal');
const langOpenBtns = document.querySelectorAll('.btn-lang-trigger');
const langCloseBtn = document.getElementById('closeLangModal');
const langOptions = document.querySelectorAll('.lang-option-card');
const currentLangLabel = document.getElementById('currentLangLabel');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(state.currentLang);
  initNavbarScroll();
  initLanguagePanel();
  initMobileMenu();
  initContactForm();
  initScrollSpy();
});

// Update all translated elements
function applyLanguage(lang) {
  if (!translations[lang]) return;
  state.currentLang = lang;
  localStorage.setItem('mss_data_lang', lang);
  document.documentElement.lang = lang;

  const dict = translations[lang];

  // Document Title & Meta Description
  if (dict.metaTitle) document.title = dict.metaTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && dict.metaDescription) {
    metaDesc.setAttribute('content', dict.metaDescription);
  }

  // Text Nodes
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Placeholder Attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Update Language UI Labels
  if (currentLangLabel) {
    currentLangLabel.textContent = lang === 'es' ? 'ES' : 'EN';
  }

  // Update Active Option in Panel
  langOptions.forEach((card) => {
    const cardLang = card.getAttribute('data-lang');
    if (cardLang === lang) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

// Language Modal Controls
function initLanguagePanel() {
  langOpenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      langModal.classList.add('open');
    });
  });

  if (langCloseBtn) {
    langCloseBtn.addEventListener('click', () => {
      langModal.classList.remove('open');
    });
  }

  // Click outside to close
  if (langModal) {
    langModal.addEventListener('click', (e) => {
      if (e.target === langModal) {
        langModal.classList.remove('open');
      }
    });
  }

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && langModal.classList.contains('open')) {
      langModal.classList.remove('open');
    }
  });

  // Option selection
  langOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const selected = option.getAttribute('data-lang');
      applyLanguage(selected);
      setTimeout(() => {
        langModal.classList.remove('open');
      }, 150);
    });
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}

// Mobile Menu
function initMobileMenu() {
  if (!mobileMenuBtn || !navMenu) return;

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-open');
  });

  // Close when clicking any nav link
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-open');
    });
  });
}

// Contact Form Handler
function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.innerHTML = originalText;

      if (formAlert) {
        formAlert.classList.add('success');
        formAlert.style.display = 'flex';
        setTimeout(() => {
          formAlert.style.display = 'none';
        }, 5000);
      }
    }, 700);
  });
}

// Scrollspy for active nav link
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
