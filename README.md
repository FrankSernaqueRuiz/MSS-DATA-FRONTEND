# MSS-DATA Perú — Landing Page (Astro)

Landing page para **MSS DATA Perú**, emprendimiento enfocado en el desarrollo de aplicaciones web personalizadas que se adaptan a las necesidades de cada cliente y modernización de sistemas en Piura. Desarrollada con **[Astro](https://astro.build/)**, estructura modular por componentes, panel bilingüe (ES/EN) y diseño moderno y responsivo.

---

## Vista Previa y Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo en http://localhost:4321
npm run dev

# 3. Compilar proyecto
npm run build
```

---

## Tecnologías Utilizadas

| Capa | Tecnología |
|---|---|
| **Framework** | [Astro](https://astro.build/) (v5.x) |
| **Componentes** | Componentes `.astro` modulares |
| **Estilos** | CSS moderno con variables, flexbox, CSS grid y animaciones fluidas |
| **Lógica e i18n** | JavaScript modular con diccionario de traducción en `src/data/` |
| **Tipografía** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |
| **Assets** | SVG vectoriales optimizados en `public/` |

---

## Estructura del Proyecto

```text
frontend-mssdata/
├── .astro/                     # Tipos y cache autogenerados por Astro
├── node_modules/               # Dependencias instaladas
├── public/                     # Archivos estáticos servidos directamente
│   └── favicon.svg             # Favicon SVG corporativo
├── src/
│   ├── components/             # Componentes de la interfaz
│   │   ├── About.astro         # Sección Sobre Nosotros y métricas
│   │   ├── Contact.astro       # Formulario y canales de contacto
│   │   ├── Features.astro      # Capacidades y servicios detallados
│   │   ├── Footer.astro        # Pie de página y enlaces
│   │   ├── Hero.astro          # Hero con console mockup y métricas flotantes
│   │   ├── Highlights.astro    # Tarjetas de servicio destacadas
│   │   ├── LangModal.astro     # Modal para el cambio de idioma
│   │   ├── Navbar.astro        # Barra de navegación con glassmorphism
│   │   ├── Projects.astro      # Casos de éxito y proyectos implementados
│   │   └── TechStack.astro     # Ecosistema tecnológico y herramientas
│   ├── data/
│   │   └── translations.js     # Diccionario bilingüe (ES / EN)
│   ├── layouts/
│   │   └── BaseLayout.astro    # Plantilla HTML base, SEO e importación de assets
│   ├── pages/
│   │   └── index.astro         # Página principal
│   ├── scripts/
│   │   └── main.js             # Lógica cliente: i18n, modal, navbar y formularios
│   └── styles/
│       ├── main.css            # Variables globales, tipografía y estilos base
│       └── responsive.css      # Reglas adaptativas para tablet y móviles
├── astro.config.mjs            # Configuración de Astro
├── package.json                # Scripts npm y dependencias del proyecto
├── tsconfig.json               # Configuración TypeScript y alias de rutas
├── .gitignore                  # Reglas de exclusión para Git (.astro, node_modules, dist)
├── .editorconfig               # Configuración de indentación y formato de código
├── LICENSE                     # Licencia MIT
└── README.md                   # Documentación del proyecto
```

---

## Funcionalidades Destacadas

### 1. Panel de Cambio de Idioma (i18n)
- Soporte nativo para **Español (ES)** e **Inglés (EN)**.
- Modal accesible desde la barra de navegación y el pie de página.
- Persistencia automática de la preferencia del usuario en `localStorage`.

### 2. Secciones Modulares
- **Hero:** Propuesta de valor, métricas y mockup de dashboard.
- **Highlights:** Pilares y enfoques de servicio.
- **Nosotros:** Historia, visión local en Piura y metodología.
- **Capacidades:** Servicios de ingeniería y modernización.
- **Tech Stack:** Ecosistema tecnológico y herramientas.
- **Proyectos:** Casos de estudio implementados.
- **Contacto:** Formulario de cotización e información de contacto.

---

## Contacto

**MSS DATA Perú**  
Sitio Web: [https://www.mssdataperu.com/](https://www.mssdataperu.com/)  
Email: `contacto@mssdataperu.com`
Piura, Perú

