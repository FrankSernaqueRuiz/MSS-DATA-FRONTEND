import { translations } from '../data/translations.js';

// Application State
const state = {
  currentLang: localStorage.getItem('mss_data_lang') || 'es'
};

// DOM Elements (queried lazily after DOM load)
let navbarWrapper, langModal, langOpenBtns, langCloseBtn;
let langOptions, currentLangLabel, mobileMenuBtn, navMenu;
let contactForm, formAlert, formError, formWhatsappBtn;
let waFabBtn, waPanel, waPanelClose, waContactRows;

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
  formError = document.getElementById('formError');
  formWhatsappBtn = document.getElementById('formWhatsappBtn');
  waFabBtn = document.getElementById('waFabBtn');
  waPanel = document.getElementById('waPanel');
  waPanelClose = document.getElementById('waPanelClose');
  waContactRows = document.querySelectorAll('.wa-contact-row');
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

/* ------------------------------------------------------------------ *
 *  Contacto: envío real por correo (Web3Forms) + salida por WhatsApp
 * ------------------------------------------------------------------ */

const ROTATION_KEY = 'mss_data_wa_rotation';

/** Lee los contactos de WhatsApp que el componente dejó en el dataset. */
function getWhatsappContacts() {
  if (!contactForm?.dataset.whatsapp) return [];
  try {
    return JSON.parse(contactForm.dataset.whatsapp);
  } catch {
    return [];
  }
}

/**
 * Reparte los leads entre los socios de forma pareja.
 * El contador vive en localStorage del visitante, así que no es un
 * balanceo perfecto entre visitantes distintos — pero evita que un
 * mismo usuario escriba siempre a la misma persona, y no necesita servidor.
 */
function pickNextContact() {
  const contacts = getWhatsappContacts();
  if (!contacts.length) return null;
  const previous = parseInt(localStorage.getItem(ROTATION_KEY) ?? '-1', 10);
  const index = (Number.isNaN(previous) ? -1 : previous + 1) % contacts.length;
  localStorage.setItem(ROTATION_KEY, String(index));
  return contacts[index];
}

/** Arma el texto del mensaje de WhatsApp a partir de lo que llenó el usuario. */
function buildWhatsappMessage() {
  const dict = translations[state.currentLang] ?? translations.es;
  const value = (name) => contactForm?.elements[name]?.value?.trim() ?? '';

  const lines = [
    state.currentLang === 'en'
      ? 'Hi MSS-DATA, I would like a quote.'
      : 'Hola MSS-DATA, quisiera una cotización.',
    '',
  ];

  const fields = [
    [dict.formNameLabel, value('nombre')],
    [dict.formCompanyLabel, value('empresa')],
    [dict.formEmailLabel, value('email')],
    [dict.formPhoneLabel, value('telefono')],
    [dict.formServiceLabel, value('tipo_proyecto')],
    [dict.formBudgetLabel, value('presupuesto')],
    [dict.formMessageLabel, value('mensaje')],
  ];

  fields.forEach(([label, fieldValue]) => {
    if (fieldValue) lines.push(`*${label}:* ${fieldValue}`);
  });

  return lines.join('\n');
}

function showFormState(kind) {
  [formAlert, formError].forEach((el) => {
    if (el) el.style.display = 'none';
  });
  const target = kind === 'success' ? formAlert : formError;
  if (!target) return;
  target.classList.add(kind === 'success' ? 'success' : 'visible');
  target.style.display = 'flex';
  if (kind === 'success') {
    setTimeout(() => { target.style.display = 'none'; }, 8000);
  }
}

/** Último recurso: abre el cliente de correo del visitante con todo prellenado. */
function fallbackToMailto() {
  const to = contactForm?.dataset.fallbackEmail || 'contacto@mssdataperu.com';
  const subject = encodeURIComponent('Solicitud de cotización — MSS-DATA');
  const body = encodeURIComponent(buildWhatsappMessage().replace(/\*/g, ''));
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}

function initContactForm() {
  if (!contactForm) return;

  // Botón "Enviarlo por WhatsApp": no envía correo, abre el chat con el texto listo.
  formWhatsappBtn?.addEventListener('click', () => {
    if (!contactForm.reportValidity()) return;
    const contact = pickNextContact();
    if (!contact) return;
    const url = `https://wa.me/${contact.phone}?text=${encodeURIComponent(buildWhatsappMessage())}`;
    window.open(url, '_blank', 'noopener');
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const accessKey = contactForm.dataset.web3formsKey;

    // Sin Access Key configurada no hay a dónde enviar: usamos mailto.
    if (!accessKey) {
      fallbackToMailto();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');

    // Web3Forms espera JSON. Si se envía el FormData tal cual, el navegador
    // lo manda como multipart/form-data (el formato de subida de archivos,
    // exclusivo del plan Pro) y la API responde 400 Bad Request.
    const payload = Object.fromEntries(new FormData(contactForm).entries());
    payload.idioma = state.currentLang;
    payload.pagina = window.location.href;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        contactForm.reset();
        showFormState('success');
      } else {
        // El motivo exacto queda en consola: sin esto, un fallo de Web3Forms
        // (clave sin verificar, cuota agotada, spam) es indistinguible.
        console.error('[MSS-DATA] Web3Forms rechazó el envío:', {
          status: response.status,
          message: result.message ?? '(sin mensaje)',
          respuesta: result,
        });
        showFormState('error');
      }
    } catch (err) {
      console.error('[MSS-DATA] No se pudo contactar a Web3Forms:', err);
      showFormState('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
    }
  });
}

/* ------------------------------------------------------------------ *
 *  Botón flotante de WhatsApp
 * ------------------------------------------------------------------ */

function initWhatsappFab() {
  if (!waFabBtn || !waPanel) return;

  const setOpen = (open) => {
    waPanel.classList.toggle('open', open);
    waFabBtn.classList.toggle('active', open);
    waFabBtn.setAttribute('aria-expanded', String(open));
  };

  waFabBtn.addEventListener('click', () => {
    setOpen(!waPanel.classList.contains('open'));
  });

  waPanelClose?.addEventListener('click', () => setOpen(false));

  document.addEventListener('click', (e) => {
    if (!waPanel.classList.contains('open')) return;
    if (!e.target.closest('#waFabRoot')) setOpen(false);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  // Prellena el saludo según el idioma activo en el momento del clic.
  waContactRows.forEach((row) => {
    row.addEventListener('click', () => {
      const phone = row.dataset.waPhone;
      const greeting = state.currentLang === 'en'
        ? 'Hi MSS-DATA, I would like to know more about your services.'
        : 'Hola MSS-DATA, quisiera saber más sobre sus servicios.';
      row.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(greeting)}`);
      setOpen(false);
    });
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
  initWhatsappFab();
  initScrollSpy();
});
