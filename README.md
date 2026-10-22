# MSS-DATA — Landing Page Corporativa

Landing page institucional para **MSS-DATA**, empresa dedicada a la ingeniería de software, arquitectura de datos y soluciones digitales de alto impacto. Construida en **Vanilla HTML/CSS/JS** sin dependencias de frameworks, con cambio dinámico de idioma (ES/EN) y diseño premium.

---

## Vista Previa

> Despliega localmente con `npm run dev` y abre `http://localhost:3000`.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 semántico |
| Estilos | Vanilla CSS (variables, grid, flexbox, animaciones) |
| Lógica | JavaScript ES Modules (sin frameworks ni build tools) |
| Tipografía | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts |
| Servidor local | [serve](https://www.npmjs.com/package/serve) (via `npx`) |

---

## Estructura del Proyecto

```
frontend-mssdata/
├── index.html              # Punto de entrada principal
├── package.json            # Scripts y metadatos del proyecto
├── .gitignore
├── .editorconfig
├── LICENSE
├── README.md
├── styles/
│   ├── main.css            # Sistema de diseño, componentes, animaciones
│   └── responsive.css      # Reglas adaptativas para tablet y móvil
└── js/
    ├── main.js             # Lógica: i18n, navbar scroll, formulario, scrollspy
    └── translations.js     # Diccionario de textos ES / EN
```

---

## Instalación y Uso Local

Requiere **Node.js >= 18** y **npm**.

```bash
# 1. Clonar el repositorio
git clone https://github.com/mss-data/frontend-mssdata.git

# 2. Acceder al directorio
cd frontend-mssdata

# 3. Iniciar el servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`.

---

## Funcionalidades

### Secciones de la Landing

- **Hero** — Titular de impacto, métricas clave y mockup interactivo de consola de datos con badges flotantes animados.
- **Servicios** — 3 tarjetas de destaque (*Desarrollo a Medida*, *Monitoreo y Métricas*, *Arquitectura Cloud*) superpuestas al Hero.
- **Nosotros** — Visualización de código TypeScript, métricas de proyectos entregados y diferenciadores clave.
- **Capacidades** — Layout flanqueado (3 izq. + consola central + 3 der.) con iconos de servicios.
- **Stack Tecnológico** — Franja de tecnologías utilizadas (React, TypeScript, Node.js, PostgreSQL, Docker, AWS, etc.).
- **Proyectos** — Tarjetas de casos de éxito (Fintech, Logística, Healthcare) con métricas técnicas reales.
- **Contacto** — Formulario de cotización con selección de alcance, presupuesto y mensaje. Feedback de éxito integrado.
- **Footer** — Navegación, especialidades, legal y selector de idioma.

### Selector de Idioma (i18n)

- Soporte completo en **Español (ES)** e **Inglés (EN)**.
- Panel modal accesible desde la barra de navegación y el footer.
- Persistencia automática de la preferencia en `localStorage`.
- Sin recarga de página: la traducción es instantánea.
- Sin dependencias externas de internacionalización.

### Diseño

- Paleta cromática violeta/púrpura eléctrico sobre fondos oscuros y claros.
- Navbar transparente que transiciona a frosted glass al hacer scroll.
- Hover effects, micro-animaciones y float bouncing en los badges del Hero.
- Responsive: escritorio, tablet (1024px) y móvil (768px).
- Sin emojis en ningún elemento de la interfaz.

---

## Despliegue

El proyecto es un sitio estático puro, compatible con cualquier CDN o plataforma:

**Netlify / Vercel:**
- Apunta la raíz del repositorio al directorio `/` (publish directory: `.`).
- Sin comando de build requerido.

**GitHub Pages:**
```bash
# Desde la raíz del repositorio
git checkout -b gh-pages
git push origin gh-pages
```
Activa GitHub Pages desde `Settings > Pages > Branch: gh-pages / root`.

---

## Personalización

### Cambiar textos o agregar un idioma

Edita el archivo [`js/translations.js`](js/translations.js). El objeto sigue la estructura:

```js
export const translations = {
  es: { /* clave: "texto en español" */ },
  en: { /* clave: "text in English"  */ }
};
```

Para agregar un idioma nuevo (ej. Portugués), agrega una clave `pt` al objeto, crea su opción en el modal dentro de `index.html` y agrega `data-lang="pt"` al elemento.

### Cambiar paleta de colores

Todas las variables de color están centralizadas en el bloque `:root` de [`styles/main.css`](styles/main.css):

```css
:root {
  --color-primary: #5c1fe6;
  --color-hero-bg: linear-gradient(...);
  ...
}
```

---

## Licencia

Distribuido bajo la licencia [MIT](LICENSE).

---

## Contacto

**MSS-DATA Engineering**
- Correo: contacto@mssdata.tech
- Web: [mssdata.tech](https://mssdata.tech)
