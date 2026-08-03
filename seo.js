/* SiteFlowCol — SEO, meta tags y datos estructurados */
window.SiteFlowSEO = (function () {
  const FAQ_KEYS = [
    ['faq.q1', 'faq.a1'], ['faq.q2', 'faq.a2'], ['faq.q3', 'faq.a3'],
    ['faq.q4', 'faq.a4'], ['faq.q5', 'faq.a5'], ['faq.q6', 'faq.a6']
  ];

  function cfg() { return window.SITE_CONFIG || {}; }
  function siteUrl() { return (cfg().url || '').replace(/\/$/, '') || window.location.origin; }
  function t(key) { return window.SiteFlowI18n?.t(key) ?? ''; }

  function langPick(lang, es, en, de) {
    if (lang === 'en') return en;
    if (lang === 'de') return de;
    return es;
  }

  function ogLocale(lang) {
    if (lang === 'en') return 'en_US';
    if (lang === 'de') return 'de_DE';
    return 'es_CO';
  }

  function setMeta(attr, key, value) {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  }

  function setLink(rel, href, extra = {}) {
    const sel = extra.hreflang
      ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
      : `link[rel="${rel}"]:not([hreflang])`;
    let el = document.querySelector(sel);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
  }

  function buildSchemas(lang) {
    const url = siteUrl();
    const name = cfg().name || 'SiteFlowCol';
    const desc = t('meta.description');
    const ogImage = `${url}/og-image.png`;

    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${url}/#organization`,
      name,
      url,
      email: cfg().email,
      telephone: cfg().phone,
      logo: ogImage,
      image: ogImage,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CO',
        addressRegion: cfg().country || 'Colombia'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: cfg().phone,
        email: cfg().email,
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'English', 'German']
      },
      sameAs: [
        `https://wa.me/${cfg().whatsapp || '573239428161'}`
      ]
    };

    const website = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${url}/#website`,
      name,
      url,
      description: desc,
      inLanguage: ['es', 'en', 'de'],
      publisher: { '@id': `${url}/#organization` }
    };

    const serviceName = langPick(
      lang,
      'Creación de páginas web y landing pages',
      'Website and landing page creation',
      'Website- und Landing-Page-Erstellung'
    );

    const service = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${url}/#service`,
      name: `${name} — ${serviceName}`,
      url,
      description: desc,
      email: cfg().email,
      telephone: cfg().phone,
      image: ogImage,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CO',
        addressRegion: cfg().country || 'Colombia'
      },
      areaServed: [
        { '@type': 'Country', name: 'Colombia' },
        { '@type': 'Country', name: 'Mexico' },
        { '@type': 'Country', name: 'Argentina' },
        { '@type': 'Country', name: 'Spain' },
        { '@type': 'Place', name: 'Latin America' }
      ],
      priceRange: '$$',
      knowsAbout: cfg().services || [
        'Creación de páginas web',
        'Landing pages',
        'Desarrollo web',
        'Diseño web'
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: langPick(lang, 'Planes de páginas web', 'Web development plans', 'Website-Entwicklungstarife'),
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: langPick(lang, 'Página web para negocios', 'Business website', 'Unternehmenswebsite') } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: langPick(lang, 'Landing page profesional', 'Professional landing page', 'Professionelle Landing Page') } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: langPick(lang, 'Diseño y desarrollo web', 'Web design and development', 'Webdesign und Entwicklung') } }
        ]
      },
      serviceType: langPick(
        lang,
        'Creación de páginas web, diseño de landing pages, desarrollo web, hosting y mantenimiento',
        'Website creation, landing page design, web development, hosting and maintenance',
        'Website-Erstellung, Landing-Page-Design, Webentwicklung, Hosting und Wartung'
      )
    };

    const webPage = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}/#webpage`,
      url,
      name: t('meta.title'),
      description: desc,
      inLanguage: lang,
      isPartOf: { '@id': `${url}/#website` },
      about: cfg().services || ['Creación de páginas web', 'Landing pages', 'Desarrollo web'],
      primaryImageOfPage: ogImage
    };

    const faqPage = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}/#faq`,
      mainEntity: FAQ_KEYS.map(([qk, ak]) => ({
        '@type': 'Question',
        name: t(qk),
        acceptedAnswer: { '@type': 'Answer', text: t(ak) }
      }))
    };

    return [organization, website, webPage, service, faqPage];
  }

  function injectSchemas(schemas) {
    document.querySelectorAll('script[data-seo-schema]').forEach(n => n.remove());
    schemas.forEach((data, i) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo-schema', String(i));
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    });
  }

  function apply(lang) {
    if (lastSchemaLang === lang && document.querySelector('script[data-seo-schema]')) return;
    lastSchemaLang = lang;
    const url = siteUrl();
    const title = t('meta.title');
    const desc = t('meta.description');
    const ogTitle = t('meta.ogTitle') || title;
    const ogDesc = t('meta.ogDescription') || desc;
    const keywords = t('meta.keywords');
    const ogImage = `${url}/og-image.png`;

    document.title = title;
    setMeta('name', 'description', desc);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large');
    setMeta('name', 'author', cfg().name || 'SiteFlowCol');
    setMeta('name', 'theme-color', '#050505');
    setMeta('name', 'geo.region', 'CO');
    setMeta('name', 'geo.placename', cfg().country || 'Colombia');

    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', cfg().name || 'SiteFlowCol');
    setMeta('property', 'og:title', ogTitle);
    setMeta('property', 'og:description', ogDesc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:locale', ogLocale(lang));
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', ogTitle);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', ogTitle);
    setMeta('name', 'twitter:description', ogDesc);
    setMeta('name', 'twitter:image', ogImage);
    if (cfg().twitter) setMeta('name', 'twitter:site', cfg().twitter);

    setLink('canonical', url);
    setLink('alternate', `${url}/`, { hreflang: 'es' });
    setLink('alternate', `${url}/`, { hreflang: 'en' });
    setLink('alternate', `${url}/`, { hreflang: 'de' });
    setLink('alternate', `${url}/`, { hreflang: 'x-default' });

    injectSchemas(buildSchemas(lang));
  }

  let seoInitialized = false;
  let lastSchemaLang = null;

  function init() {
    if (seoInitialized) return;
    seoInitialized = true;
    const lang = window.SiteFlowI18n?.getLang?.() || 'es';
    apply(lang);
    document.addEventListener('langchange', e => apply(e.detail?.lang || 'es'));
  }

  return { init, apply };
})();
