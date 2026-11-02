# MSS-DATA — Landing Page Corporativa (Astro)

Landing page institucional para **MSS-DATA**, empresa especializada en desarrollo de software a medida, arquitectura de datos y soluciones cloud de alto impacto. Desarrollada con **[Astro](https://astro.build/)**, estructura modular por componentes, panel bilingüe instantáneo (ES/EN) y diseño moderno y responsivo sin emojis.

---

## Vista Previa y Desarrollo Local

> Inicia el entorno local con `npm run dev` y accede a `http://localhost:4321`.

---

## Tecnologías Utilizadas

| Capa | Tecnología |
|---|---|
| **Framework** | [Astro](https://astro.build/) (v5.x) |
| **Componentes** | Componentes `.astro` modulares y reactividad pura |
| **Estilos** | CSS moderno con variables, flexbox, CSS grid y animaciones fluidas |
| **Lógica e i18n** | JavaScript modular con diccionario de traducción en `src/data/` |
| **Tipografía** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |
| **Assets** | SVG vectoriales optimizados en `public/` |

---

## Estructura del Proyecto

El repositorio sigue la arquitectura oficial recomendada para proyectos Astro:

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
│   │   └── index.astro         # Página principal (Single Page Application)
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

## Scripts Disponibles

En la raíz del proyecto puedes ejecutar:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en http://localhost:4321
npm run dev

# Compilar para producción (genera la carpeta dist/)
npm run build

# Previsualizar la versión de producción localmente
npm run preview
```

---

## Funcionalidades Destacadas

### 1. Panel de Cambio de Idioma (i18n)
- Soporte nativo para **Español (ES)** e **Inglés (EN)**.
- Modal accesible desde la barra de navegación y el pie de página.
- Persistencia automática de la preferencia del usuario en `localStorage`.
- Cambio de textos dinámico e instantáneo en tiempo real.

### 2. Secciones Modulares
- **Hero:** Propuesta de valor, métricas operativas y mockup 3D de dashboard con badges flotantes.
- **Highlights:** 3 pilares clave superpuestos con elevación y sombras suaves.
- **Nosotros:** Filosofía técnica, arquitectura de código y trayectoria.
- **Capacidades:** Distribución flanqueada de servicios de ingeniería de datos y software.
- **Tech Stack:** Ecosistema tecnológico moderno clasificado.
- **Proyectos:** Casos de estudio en sectores críticos (Fintech, Logística y Salud).
- **Contacto:** Formulario estructurado para cotizaciones con feedback visual integrado.

### 3. Principios de Diseño
- Estética cuidada con paleta en tonos oscuros y púrpuras de contraste.
- Cero emojis para mantener un perfil 100% corporativo e ingenieril.
- Efectos de blur / frosted glass al hacer scroll en la barra de navegación.
- Totalmente responsivo para pantallas ultra-wide, laptops, tablets y móviles.

---

## Despliegue en Producción

Al ejecutar:

```bash
npm run build
```

Astro compila el proyecto en el directorio `dist/`. Este directorio puede desplegarse en cualquier servicio de hosting moderno:
- **Vercel** (`npx vercel`)
- **Netlify** (`npx netlify deploy --prod --dir=dist`)
- **Cloudflare Pages**
- **GitHub Pages** (usando GitHub Actions o publicando la carpeta `dist`)

---

## Licencia

Distribuido bajo la Licencia [MIT](LICENSE).

---

## Contacto

**MSS-DATA**  
Sitio Web: [https://www.mssdataperu.com/](https://www.mssdataperu.com/)  
Email: `contacto@mssdataperu.com`

