# Guía SEO — SiteFlowCol

Documentación de los archivos de SEO, optimización y pasos para publicar en **https://siteflowcol.com**.

---

## Resumen rápido

| Archivo | ¿Quién lo usa? | ¿Para qué? |
|---------|----------------|------------|
| `site-config.js` | Tu sitio (scripts) | Datos del negocio y URL en un solo lugar |
| `seo.js` | Navegador + buscadores | Meta tags, Open Graph y datos estructurados |
| `robots.txt` | Google, Bing, etc. | Permisos de rastreo y enlace al sitemap |
| `sitemap.xml` | Google (principalmente) | Lista de páginas para indexar |
| `contact-config.js` | Formulario de contacto | Access Key de Web3Forms (no es SEO) |

---

## ¿Funciona al subir el sitio?

**Sí**, siempre que hagas **commit + push** a GitHub y el deploy se actualice.

Después de subir, comprueba en el navegador:

- https://siteflowcol.com/robots.txt
- https://siteflowcol.com/sitemap.xml

Si ves el contenido de cada archivo, están bien desplegados.

> **Importante:** Aparecer en Google puede tardar **días o semanas**. El sitemap ayuda, pero no es instantáneo. Debes registrar el sitio en [Google Search Console](https://search.google.com/search-console) y enviar el sitemap manualmente.

---

## `site-config.js`

### ¿Para qué sirve?

Es la **configuración central** del sitio. Guarda los datos del negocio para que otros scripts no los repitan.

### Contenido actual

```javascript
window.SITE_CONFIG = {
  url: 'https://siteflowcol.com',
  name: 'SiteFlowCol',
  email: 'siteflowcol@gmail.com',
  phone: '+57 323 942 8161',
  whatsapp: '573239428161',
  locale: 'es_CO',
  twitter: ''
};
```

### ¿Quién lo usa?

- `seo.js` — canonical, Open Graph, JSON-LD (Organization, servicio, etc.)

### ¿Cuándo editarlo?

- Si cambias de dominio → actualiza `url`
- Si cambia el email o teléfono → actualiza esos campos
- Si tienes cuenta de Twitter/X → pon el usuario en `twitter` (ej: `@siteflowcol`)

---

## `seo.js`

### ¿Para qué sirve?

Gestiona el **SEO dinámico** de la página. Se ejecuta en el navegador del visitante.

### ¿Qué hace?

1. **Meta tags:** title, description, keywords, robots, theme-color
2. **Open Graph:** vista previa al compartir en WhatsApp, Facebook, LinkedIn
3. **Twitter Card:** vista previa en X/Twitter
4. **Canonical y hreflang:** idioma ES / EN
5. **JSON-LD (Schema.org):**
   - `Organization` — datos de la empresa
   - `WebSite` — información del sitio
   - `ProfessionalService` — tipo de servicio
   - `FAQPage` — preguntas frecuentes (pueden salir en Google)

### ¿Cuándo se actualiza?

- Al cargar la página
- Al cambiar idioma (ES ↔ EN) con el botón del menú

### Dependencias

- Requiere `site-config.js` e `i18n.js` cargados antes
- Se inicializa desde `main.js` con `SiteFlowSEO.init()`

### Imagen para redes (`og-image.png`)

El SEO referencia: `https://siteflowcol.com/og-image.png`

Debes crear una imagen **1200 × 630 px** (logo + texto) y subirla a la raíz del proyecto como `og-image.png`. Sin ella, al compartir el enlace puede no verse vista previa.

---

## `robots.txt`

### ¿Para qué sirve?

Archivo de texto que leen **robots de buscadores** (Googlebot, Bingbot, etc.).

### Contenido actual

```
User-agent: *
Allow: /

Sitemap: https://siteflowcol.com/sitemap.xml
```

### Significado

- `User-agent: *` → aplica a todos los buscadores
- `Allow: /` → pueden rastrear todo el sitio
- `Sitemap:` → indica dónde está el mapa del sitio

### URL pública

https://siteflowcol.com/robots.txt

No hace falta configurar nada en Google para que exista; Google lo encuentra solo.

---

## `sitemap.xml`

### ¿Para qué sirve?

**Mapa del sitio** en formato XML. Le dice a Google qué páginas tienes, en qué idiomas están y cuándo se actualizaron. Sin enviarlo a Google, el archivo existe pero **Google no lo usa automáticamente** para indexarte más rápido.

### Contenido actual

Una sola página (tu landing principal):

- `https://siteflowcol.com/`
- Idiomas: `es`, `en`, `x-default`
- Prioridad: 1.0

### URL pública

https://siteflowcol.com/sitemap.xml

---

## Qué tienes que hacer con `sitemap.xml` (paso a paso)

### Paso 1 — Subir el archivo a producción

El archivo ya está en tu proyecto. Solo debes **subirlo a GitHub** junto con el resto del sitio:

```bash
git add sitemap.xml
git commit -m "Añadir sitemap para SEO"
git push
```

Espera 1–2 minutos y abre en el navegador:

**https://siteflowcol.com/sitemap.xml**

Si ves código XML (no un error 404), está bien desplegado. **No tienes que editar nada más** mientras solo tengas una página.

---

### Paso 2 — Registrar el sitio en Google Search Console (solo la primera vez)

1. Entra a **[Google Search Console](https://search.google.com/search-console)** con tu cuenta de Google.
2. Clic en **Añadir propiedad**.
3. Elige **Prefijo de URL** y escribe: `https://siteflowcol.com`
4. Google te pedirá **verificar** que el sitio es tuyo. Opciones habituales:
   - **Etiqueta HTML** — copias un código y lo pegas en `index.html` (dentro de `<head>`), subes el cambio y pulsas Verificar.
   - **DNS** — si tienes acceso al dominio, añades un registro TXT que Google te indique.
5. Cuando diga **Propiedad verificada**, ya puedes usar Search Console.

---

### Paso 3 — Enviar el sitemap a Google (lo importante)

1. Dentro de Search Console, selecciona la propiedad **siteflowcol.com**.
2. En el menú lateral izquierdo, entra a **Sitemaps** (o *Mapas del sitio*).
3. En el campo **Añadir un sitemap nuevo**, escribe solo esto:

   ```
   sitemap.xml
   ```

   (No hace falta pegar la URL completa; Google ya conoce tu dominio.)

4. Clic en **Enviar**.
5. En unos minutos el estado debería pasar a **Correcto** o **Éxito**.

**Eso es todo.** Google empezará a usar el mapa para rastrear e indexar tu página. Puede tardar **días o semanas** en aparecer en búsquedas.

---

### Paso 4 — Comprobar que funcionó

En Search Console revisa:

| Sección | Qué buscar |
|---------|------------|
| **Sitemaps** | Estado "Correcto", 1 URL detectada |
| **Páginas** | Tu URL indexada (puede tardar) |
| **Rendimiento** | Impresiones y clics cuando empieces a salir en Google |

También puedes buscar en Google:

```
site:siteflowcol.com
```

Si aparece tu página, Google ya la indexó.

---

### ¿Cuándo editar `sitemap.xml`?

**Ahora mismo: no toques nada.** El archivo ya está bien para una sola landing.

**Edítalo solo si** añades páginas nuevas, por ejemplo:

- `https://siteflowcol.com/blog.html`
- `https://siteflowcol.com/aviso-legal.html`

Copia este bloque por cada página nueva y pégalo dentro de `<urlset>`:

```xml
<url>
  <loc>https://siteflowcol.com/nueva-pagina.html</loc>
  <lastmod>2026-06-10</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

Cambia la fecha en `<lastmod>` y vuelve a hacer **push**. En Search Console, Google detectará el cambio solo (no hace falta reenviar el sitemap cada vez).

---

### Errores frecuentes

| Problema | Solución |
|----------|----------|
| `sitemap.xml` da 404 | No está subido a GitHub o el deploy no terminó |
| Google dice "No se ha podido obtener" | Espera unos minutos y vuelve a enviar |
| Llevo semanas y no aparezco en Google | Normal al inicio; revisa que Search Console no muestre errores |
| Cambié de dominio | Actualiza todas las URLs dentro de `sitemap.xml` y `robots.txt` |

---

## Otros archivos relacionados

### `index.html` (cabecera)

Incluye meta tags iniciales (description, Open Graph, canonical). `seo.js` los actualiza al cargar y al cambiar idioma.

### `i18n.js`

Traducciones ES/EN, incluyendo:

- `meta.title`
- `meta.description`
- `meta.keywords`
- `meta.ogTitle`
- `meta.ogDescription`

### Optimizaciones de rendimiento

- GSAP con `defer` (no bloquea la carga)
- Fuentes Google con carga asíncrona
- `preload` de `style.css`
- Etiqueta `<main>` y enlace “Saltar al contenido”

---

## Flujo completo

```
1. Visitante abre https://siteflowcol.com
        ↓
2. site-config.js carga datos del negocio
        ↓
3. i18n.js define idioma (ES o EN)
        ↓
4. seo.js actualiza meta tags + JSON-LD
        ↓
5. Google (en segundo plano) lee robots.txt
        ↓
6. Google encuentra sitemap.xml y indexa la página
```

---

## Checklist al publicar cambios

- [ ] `git add` de todos los archivos nuevos
- [ ] `git commit` y `git push` a GitHub
- [ ] Esperar 1–2 min al deploy
- [ ] Verificar `https://siteflowcol.com/robots.txt`
- [ ] Verificar `https://siteflowcol.com/sitemap.xml`
- [ ] Subir `og-image.png` (1200×630) si aún no existe
- [ ] Enviar sitemap en Google Search Console
- [ ] Revisar en Search Console que no haya errores de indexación

---

## Preguntas frecuentes

### ¿El SEO funciona solo con subir los archivos?

Casi todo sí. Lo único manual es **registrar el sitemap en Google Search Console** y crear la **imagen og-image.png**.

### ¿Por qué no aparezo en Google todavía?

Indexar lleva tiempo. Asegúrate de haber enviado el sitemap y de que `robots.txt` no bloquee nada.

### ¿Debo cambiar la URL en varios sitios?

Si cambias de dominio, actualiza:

1. `site-config.js` → `url`
2. `robots.txt` → línea `Sitemap:`
3. `sitemap.xml` → todas las `<loc>`
4. `index.html` → canonical y meta `og:url` (o deja que `seo.js` lo haga desde `site-config.js`)

### ¿`contact-config.js` es SEO?

No. Solo guarda la Access Key de Web3Forms para el formulario de contacto.

---

## Contacto del proyecto

- **Web:** https://siteflowcol.com
- **Email:** siteflowcol@gmail.com
- **WhatsApp:** +57 323 942 8161

---

*Última actualización: junio 2026*
