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

**Mapa del sitio** en formato XML. Le dice a Google qué URLs existen, en qué idiomas y cuándo se actualizaron.

### Contenido actual

Una sola página (landing):

- `https://siteflowcol.com/`
- Idiomas: `es`, `en`, `x-default`
- Prioridad: 1.0

### URL pública

https://siteflowcol.com/sitemap.xml

### ¿Cuándo editarlo?

Si añades páginas nuevas (blog, aviso legal, privacidad, etc.), agrega un bloque `<url>` por cada una.

### Registro en Google (obligatorio para aprovecharlo)

1. Entra a [Google Search Console](https://search.google.com/search-console)
2. Añade la propiedad `siteflowcol.com` (verifica dominio o DNS)
3. Menú **Sitemaps** → pega: `https://siteflowcol.com/sitemap.xml`
4. Clic en **Enviar**

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
