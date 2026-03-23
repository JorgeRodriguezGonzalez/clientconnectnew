# Auditoría SEO — Client Connect (repositorio `clientconnectnew`)

**Fecha de revisión:** 23 de marzo de 2025  
**Alcance:** lectura del código fuente, `index.html`, `public/`, `App.tsx`, páginas y layout, y build de producción (`npm run build`).

**Nota sobre el número de páginas:** En `src/App.tsx` solo existen **10 rutas de contenido** más la ruta comodín `*` que renderiza `NotFound` (**11 vistas en total**). No hay 23 rutas declaradas en el enrutador; esta auditoría cubre **todas las rutas reales del proyecto**.

**Nota sobre “Nanotise” vs marca en código:** La briefing pedía comprobar la marca “Nanotise” en títulos. En este repositorio la marca dominante en metadatos, cabecera y pie es **Client Connect Australia**. “Nanotise” aparece como **cliente/caso** (p. ej. carruseles, `HowWeWork`), no como nombre legal del sitio en `<title>`.

---

## 1. Meta tags por página

La aplicación es una **SPA (React + `react-router-dom`)** sin `react-helmet-async`, `vite-plugin-html` por ruta ni SSR. El documento HTML cargado es siempre el de **`index.html`**: **no hay actualización de `<title>`, `<meta name="description">`, canonical ni OG/Twitter al cambiar de ruta.** Lo que ve el bot en el HTML inicial es lo mismo para **todas** las URLs.

**Fuente única de metadatos:** `index.html` (líneas 6–17 aprox.).

| Path | Title (exacto en HTML inicial) | Description (exacta) | Canonical URL | OG Tags | Twitter Tags | Schema JSON-LD |
|------|-------------------------------|----------------------|---------------|---------|--------------|----------------|
| `/` | `Client Connect Australia \| Sydney Digital Marketing Agency` | `Connecting Sydney businesses with their ideal clients through expert SEO, Google Ads, web design, and social media marketing. Get results-driven digital marketing strategies.` | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `/about` | *(idéntico al de `/`)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `/contact` | *(idéntico)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `/case-studies` | *(idéntico)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `/services/seo` | *(idéntico)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `/services/google-ads` | *(idéntico)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `/services/web-design` | *(idéntico)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `/services/social-media-management` | *(idéntico)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `/services/social-media-ads` | *(idéntico)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `/services/content-creation` | *(idéntico)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `/services/brand-identity` | *(idéntico)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |
| `*` (NotFound, p. ej. `/foo`) | *(idéntico)* | *(idéntico)* | **FALTA** | ⚠️ parciales | ⚠️ parciales | **NINGUNO** |

**Detalle OG (presente en `index.html`):** `og:title`, `og:description`, `og:type` (`website`), `og:image`.  
**Faltan para OG “completo” habitual:** `og:url`, `og:site_name`, `og:locale` (recomendable `en_AU`), dimensiones opcionales, imagen propia del dominio.

**Detalle Twitter (presente):** `twitter:card` (`summary_large_image`), `twitter:site`, `twitter:image`.  
**Faltan:** `twitter:title`, `twitter:description` (duplicar título/descripción o confiar en OG; muchas plataformas esperan explícitos).

---

## 2. Análisis de titles

**Title único en el proyecto (HTML):**

`Client Connect Australia | Sydney Digital Marketing Agency`

| Texto | Longitud (caracteres) | > 60 | < 30 |
|-------|------------------------|------|------|
| `Client Connect Australia \| Sydney Digital Marketing Agency` | **58** | No | No |

- **Duplicados:** Un solo `<title>` en el origen → **todas las URLs comparten el mismo título** (duplicación masiva a nivel de indexación si el crawler solo usa el HTML estático).
- **Marca “Nanotise”:** **No** aparece en el `<title>`; la marca en título es **Client Connect Australia**.
- **Keyword principal por página:** **No** hay variación por ruta (p. ej. la página `/services/seo` no tiene título específico “SEO Sydney…” en el documento).

---

## 3. Análisis de descriptions

**`meta name="description"` (única en `index.html`):**

`Connecting Sydney businesses with their ideal clients through expert SEO, Google Ads, web design, and social media marketing. Get results-driven digital marketing strategies.`

| Variante | Longitud | > 160 | < 70 |
|----------|----------|-------|------|
| `meta name="description"` (completa arriba) | **174** | **Sí** (riesgo de truncado en SERP) | No |
| `og:description` (más corta en HTML) | **125** | No | No |

- **Duplicadas:** Una sola descripción en origen → **misma descripción para todas las rutas** en la SPA sin Helmet.
- **CTA o teléfono:** La meta description **no** incluye llamada explícita (“Llama…”, “Reserva…”) ni teléfono; el sitio sí muestra contacto en UI (`/contact`, pie).

---

## 4. Canonical URLs

- **Lista:** **Ninguna** — no existe `<link rel="canonical">` en `index.html` ni en el código React revisado.
- **Dominio `https://nanotise.com.au`:** **No** hay canonical ni referencias consistentes a ese dominio en metadatos; el sitio se presenta como **Client Connect Australia** (emails `clientconnectaustralia.com.au` en formularios/contacto).
- **Trailing slash:** no aplica normalización en código; **sin canonical no hay política explícita**.

**Páginas sin canonical:** **todas** (incl. NotFound).

---

## 5. Schema markup (JSON-LD)

**Búsqueda en el repositorio:** no hay `<script type="application/ld+json">` ni generación equivalente.

| Página | Tipo JSON-LD | Campos | Faltantes (schema.org) | Rich Results Test (estimación) |
|--------|--------------|--------|-------------------------|----------------------------------|
| Todas | **NINGUNO** | — | N/A | No aplica / **no hay datos estructurados** |

**Recomendaciones por tipo de página (al implementar):**

| Ruta | Schema sugerido |
|------|-----------------|
| `/` | `Organization` + `WebSite` (+ `SearchAction` si hay buscador real) |
| `/contact` | `ContactPage` + `LocalBusiness` o `ProfessionalService` (con `telephone`, `address`, `areaServed`: AU/Sydney) |
| `/about` | `AboutPage` + `Organization` |
| `/case-studies` | `CollectionPage` + ítems `Article` o `CreativeWork` por caso (si hay URLs dedicadas en el futuro) |
| `/services/*` | `Service` (o `Offer` dentro de `ProfessionalService`) alineado al servicio |
| NotFound | Opcional: **no** indexar; prioridad es HTTP 404 + `noindex` (ver sección 10) |

---

## 6. Open Graph y Twitter Cards

| Comprobación | Resultado |
|--------------|-----------|
| `og:image` existe | **Sí** — URL absoluta: `https://lovable.dev/opengraph-image-p98pqg.png` |
| URL accesible | Dominio **tercero** (Lovable), no alojada en el dominio del negocio; **no** refleja marca propia ni control editorial |
| `og:url` vs canonical | **Falta `og:url`**; no puede coincidir con canonical |
| `og:type` | `website` — aceptable para home; para artículos/servicios concretos a menudo se usa `article` o se mantiene `website` según estrategia |
| Páginas sin OG “completos” | **Todas** en la práctica comparten el mismo bloque estático; faltan `og:url`, `og:site_name`, imagen propia |

**Twitter:** imagen y card presentes; faltan título y descripción dedicados.

---

## 7. Estructura de headings

En **cada página con `Header` + `Footer`**, el pie incluye un **segundo `<h1>` decorativo** (“CLIENT CONNECT”), lo que rompe la recomendación de **un solo H1 por documento**.

**Referencia:** `src/components/layout/Footer.tsx` (aprox. líneas 213–216): `<h1 className="...">CLIENT CONNECT</h1>`.

| Ruta | H1 principal (contenido) | ¿Un solo H1? | H1 y keyword | Jerarquía H2/H3 (notas) |
|------|---------------------------|--------------|--------------|-------------------------|
| `/` | `SuperHero`: “We Bring [Light/Leads/Clients/Sales] to Your Business Growth” (`motion.h1`) | **No** — Footer añade otro H1 | Parcial (crecimiento/leads; no “SEO” específico) | Secciones lazy: p. ej. `Services` usa `h2` + `h3` en tarjetas; revisar saltos dentro de cada componente |
| `/about` | “About Us.” | **No** (Footer) | Incluye tema “about” / partner; no “Nanotise” como marca sitio | ClientCarousel `h2`; FAQ `h2`; acordeones usan botones, no H3 en preguntas |
| `/contact` | “Let's Grow Your Business.” | **No** (Footer) | Genérico; no “contact” en H1 | `h1` → `h2` “Send Us a Message” → `h3` “Contact Information” — orden coherente |
| `/case-studies` | “Case Studies.” | **No** (Footer) | OK temáticamente | Página: `h1` → componente `case-studies`: `h2` luego `h3` en tarjeta — coherente |
| `/services/seo` | “Rank Higher. Get More Customers.” | **No** (Footer) | Temática SEO/leads | Secciones con `h2` (“Our SEO Process”, FAQs, etc.) |
| `/services/google-ads` | “Instant Visibility. Qualified Traffic.” | **No** (Footer) | Temática ads/tráfico | Similar: `h2` en proceso |
| `/services/web-design` | “Websites That Turn Visitors Into Customers.” | **No** (Footer) | Temática web/conversión | Carrusel `ImageCard` usa **`alt=""`** (imagen decorativa sin texto) |
| `/services/social-media-management` | “Your Socials, Sorted.” | **No** (Footer) | Social; keyword “management” débil en H1 | `h2` en proceso |
| `/services/social-media-ads` | “Your Best Lead Source.” | **No** (Footer) | Paid social implícito | `h2` en proceso |
| `/services/content-creation` | “Content That Converts.” | **No** (Footer) | Contenido/conversión | `h2` en bloques |
| `/services/brand-identity` | “Brands That Stand Out.” | **No** (Footer) | Marca/identidad | `h2` en proceso |
| NotFound | “404” (`h1`) | **Sí** (sin Footer/Header) | N/A | Solo `h1` + párrafo |

**Problemas globales:** **H1 duplicado** (hero + footer) en casi todas las páginas; **ningún H1** incluye la marca “Nanotise” (criterio de briefing); el sitio usa **Client Connect** en marca.

---

## 8. Internal linking

**Metodología:** enlaces declarados como `<Link to="…">` o `<a href="/…">` en el árbol de componentes. Los `navigate("/…")` de React Router **no** cuentan como elemento ancla (p. ej. botones en `SuperHero`).

**Problema de ruta rota:** En `Header` y `Footer`, el ítem **“Services”** del pie enlaza a **`/services`** (`Footer.tsx`, `navigation.main`). **No existe** `<Route path="/services" …>` en `App.tsx` → esa URL cae en **NotFound** (`path="*"`).

**Enlaces entrantes (resumen):**

- **Home, About, Contact, Case Studies:** enlazados desde navegación principal y pie en (casi) todas las páginas con layout estándar.
- **Páginas de servicio:** enlazadas desde el mega menú del `Header` y desde las tarjetas `<Link>` en `Services.tsx` en la home (7 servicios).
- **NotFound:** solo `<a href="/">` en `NotFound.tsx`; **no** recibe enlaces intencionados desde el menú.

**Páginas huérfanas (sin enlaces internos desde otras páginas):** ninguna entre las rutas válidas **si** se considera Header+Footer+Home; **sí** hay riesgo SEO de **enlace interno roto** hacia `/services`.

**Páginas con pocos enlaces internos en el cuerpo (sin contar layout):** las páginas de servicio tienen **poco cross-linking** entre sí en el cuerpo (imports de `Link` en varios archivos de servicio **sin uso** de `<Link>` detectado); el grueso del enlazado viene del **Header/Footer**. **NotFound:** **1** enlace interno (`/`).

**Cuenta orientativa de `<Link>` en layout (por archivo fuente, no por instancias de map en runtime):** `Header.tsx` define varios `<Link>` (logo, ítems de menú, CTAs a `/contact`); `Footer.tsx` define varios `<Link>` (CTA, logo, “Explore”). En la **home**, `Services.tsx` añade **7** `<Link>` a rutas `/services/...`.

---

## 9. Imágenes

### 9.1 Uso general

- **WebP en código:** no se encontraron referencias a `.webp` en `src/` (búsqueda por extensión); predominan **PNG/JPG/JPEG** bajo `/public/images/` y URLs externas (Unsplash, Framer, etc.).
- **`loading="lazy"`:** aparece de forma **puntual** (p. ej. `ZoomParallax.tsx`, `FounderSection.tsx`, `ProductShowcase.tsx`). La mayoría de `<img>` en héroes y carruseles **no** especifican `loading="lazy"` (LCP prioritario en hero suele ser intencional, pero conviene auditoría caso por caso).

### 9.2 Alts problemáticos (ejemplos verificados)

| Ubicación | Problema |
|-----------|----------|
| `WebDesign.tsx` — `ImageCard` | `alt=""` en capturas del carrusel (contenido informativo debería describir el proyecto) |
| `ZoomParallax.tsx` | `alt=""` con `loading="lazy"` |
| `UseCasesShowcase-backup.tsx` | Varios `alt=""` (archivo *backup*; si no se sirve en producción, impacto menor) |

Muchas imágenes de cliente/hero usan **alt descriptivo** (nombre de cliente o escena). Algunos alts de galería son **genéricos** (“Digital marketing”, “Presentation”) en `About.tsx` / héroes.

### 9.3 `public/images/` — archivos **> 500 KB** (tamaño en bytes del disco)

| Tamaño (aprox.) | Archivo |
|-----------------|---------|
| 5 492 084 | `LCDwebsite.png` |
| 4 486 231 | `LCLwebsite.png` |
| 4 283 207 | `YLRwebsite.png` |
| 4 170 954 | `assetwebsite.png` |
| 3 863 928 | `premierwebsite.png` |
| 3 410 981 | `pioneerwebsite.png` |
| 3 272 522 | `turnbullwebsite.png` |
| 3 195 187 | `prolexwebsite.png` |
| 2 886 050 | `proleximage.png` |
| 2 406 865 | `brisbane.png` |
| 1 945 470 | `image1.jpg` |
| 1 684 577 | `nanotisewebsite.png` |
| 1 624 696 | `commercialstratawebsite.png` |
| 1 039 949 | `3.png` |
| 969 424 | `assetplumbing-vertical.png` |
| 699 301 | `paidads3.png` |
| 672 369 | `brandidentity1.jpg` |
| 633 281 | `brandidentity4.jpg` |
| 614 163 | `brandidentity.jpg` |
| 535 095 | `4.png` |

**Impacto:** LCP y ancho de banda; conviene compresión, tamaños responsivos o WebP/AVIF.

### 9.4 Lista de imágenes

Hay **decenas** de archivos en `public/images/` y muchas referencias dinámicas en componentes (carruseles, casos, Unsplash). La sección 9.3 lista los activos pesados; el grep de `/images/` en `src` confirma rutas como `logoCCA2.png`, carruseles de `WebDesign`, fotos de servicios, etc. Para un inventario CSV único habría que concatenar `public/images/*` + extracción de URLs en TSX (fuera del alcance de un solo paso manual).

---

## 10. Performance y técnico

| Tema | Hallazgo |
|------|----------|
| Preload de fuentes | **Sí** — `index.html` precarga `satoshi-400/500/700.woff2` |
| Code splitting / lazy | **Parcial** — `Index.tsx` usa `lazy()` + `Suspense` y `LazySection` para secciones home; **`App.tsx` importa todas las páginas de forma estática** → no hay lazy por ruta |
| Bundle principal (último build) | `dist/assets/index-eSgTGXXc.js` ≈ **847.6 kB** (gzip ≈ **237.9 kB**); CSS `index-*.css` ≈ **157.2 kB** (gzip ≈ **24.7 kB**); chunks lazy adicionales para secciones home (FounderSection, Services, ZoomParallax, etc.) |
| `console.log` / `console.error` en código | **Sí** — `NotFound.tsx` (`console.error` en `useEffect`); `InteractivePath.tsx` (`console.log` en catch de `play()`); `google-gemini-effect.tsx` (`console.log` en envío de formulario) |
| NotFound y bots | **No** hay `meta name="robots" content="noindex"`; la respuesta HTTP **404** depende del **hosting** (Netlify/Vite preview). El componente solo renderiza UI 404; **sin SSR, el crawler puede seguir viendo 200 + mismo HTML** si el servidor no configura 404 para SPA |

**Advertencia de build:** el build reportó avisos de JSX duplicado `style` en `ZoomParallax.tsx` (esbuild); conviene corregir para evitar comportamiento impredecible.

---

## 11. Sitemap y robots

| Comprobación | Resultado |
|--------------|-----------|
| `public/sitemap.xml` | **No existe** en el repositorio (búsqueda por archivo: 0) |
| Rutas del proyecto en sitemap | **No aplicable** hasta generar sitemap |
| `robots.txt` | Existe en `public/robots.txt`: permite user-agents comunes; **no** incluye directiva `Sitemap:` |
| Formato lastmod/changefreq/priority | **N/A** (sin sitemap) |

**Recomendación:** generar `sitemap.xml` con las **10 URLs canónicas** (y opcionalmente prioridades); **excluir** URLs de error; **no** incluir rutas dinámicas con `:param` (no hay en el router actual). Añadir en `robots.txt`: `Sitemap: https://<dominio-canónico>/sitemap.xml`.

---

## 12. Resumen ejecutivo

### Puntuación estimada (0–100)

**32 / 100** — Base sólida de contenido y UI, pero **SEO técnico de SPA muy débil**: metadatos únicos, canonical, datos estructurados, sitemap y señal 404/noindex no están resueltos; además hay **H1 duplicado** y **meta description larga**.

### Top 5 problemas críticos

1. **Un solo HTML para todas las rutas** — mismo title/description/OG para `/`, `/services/seo`, etc.; riesgo alto de **contenido duplicado** y snippets irrelevantes en SERP.  
2. **Sin canonical** y **sin `og:url`** — no se consolida URL canónica ni se alinea con `https://nanotise.com.au` (si ese es el dominio objetivo).  
3. **Dos H1 por página** (hero + pie “CLIENT CONNECT”) — confusión semántica para buscadores y accesibilidad.  
4. **Sin JSON-LD** — pérdida de oportunidades Rich Results (negocio local, servicios, organización).  
5. **Sin sitemap** y **robots sin `Sitemap:`** — descubrimiento e indexación menos eficientes.

### Top 5 quick wins

1. Integrar **`react-helmet-async`** (o meta por ruta en SSR si migra) con **title + description + canonical + og:url** por página.  
2. Cambiar el **`<h1>` del footer** a `<p>` o `div` con clase visual (mantiene diseño, arregla semántica).  
3. Acortar **`meta name="description"`** a **≤ 160** caracteres y alinearla con `og:description`.  
4. Sustituir **`og:image`** de Lovable por imagen **alojada en el dominio** (1200×630).  
5. Añadir **`sitemap.xml`** + línea **`Sitemap:`** en `robots.txt`.

### Tabla resumen

| Métrica | Valor |
|---------|--------|
| Total de rutas relevantes (contenido + 404) | **11** |
| Páginas con SEO “completo” (meta único + canonical + OG completo + schema) | **0** |
| Páginas con SEO “parcial” (al menos algo alineado en home vía `index.html`) | **1** (solo a nivel documento inicial; no por ruta) |
| Páginas sin SEO propio (comparten defaults incorrectos para su intención) | **10** rutas de contenido + **NotFound** |

---

*Documento generado exclusivamente a partir del estado del repositorio en la fecha indicada; el comportamiento en CDN/hosting (códigos HTTP, redirects, `X-Robots-Tag`) debe verificarse en el entorno de producción.*
