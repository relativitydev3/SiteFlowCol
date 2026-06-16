/* SiteFlowCol — i18n (ES / EN / DE) + detección por país vía /api/geo */
window.SiteFlowI18n = (function () {
  const LANGS = ['es', 'en', 'de'];
  const WA_BASE = 'https://wa.me/573239428161?text=';

  const T = {
    es: {
      meta: {
        title: 'Creación de Páginas Web y Landing Pages | SiteFlowCol Colombia',
        description: 'Creamos páginas web, landing pages y sitios profesionales para tu negocio. Servicio de diseño web, desarrollo, hosting, dominio y mantenimiento. Colombia y Latinoamérica.',
        keywords: 'creación de páginas web, landing page, desarrollo web, diseño web Colombia, página web para negocios, crear sitio web, servicio desarrollo web, hosting y dominio, SiteFlowCol',
        ogTitle: 'SiteFlowCol — Creación de Páginas Web y Landing Pages',
        ogDescription: 'Diseño, desarrollo, hosting y mantenimiento en un solo pago mensual. Cotiza tu página web o landing page hoy.'
      },
      nav: {
        aria: 'Navegación principal',
        services: 'Servicios',
        features: 'Características',
        pricing: 'Planes',
        why: 'Por qué nosotros',
        faq: 'FAQ',
        contact: '✉️ Contacto',
        cta: '💬 Cotizar',
        menu: 'Menú',
        skip: 'Saltar al contenido',
        waMobile: '💬 Cotizar por WhatsApp',
        langAria: 'Seleccionar idioma'
      },
      hero: {
        hfc1: 'SSL Activo — Seguro',
        hfc2: 'Carga en < 2s',
        hfc3: '+47% más clientes',
        hfc4: 'Backup diario',
        badge: 'Diseño Web · Landing Pages · Desarrollo',
        title1: 'Tu página web profesional,',
        title2: 'siempre activa y cuidada.',
        sub: 'Creamos páginas web y landing pages para tu negocio — diseño, desarrollo, hosting, seguridad y mantenimiento — para que tú te enfoques en hacer crecer tu empresa.',
        ctaWa: 'Cotizar por WhatsApp',
        ctaPlans: 'Ver planes →',
        stat1: 'Páginas web',
        stat2: '% satisfacción',
        stat3: '% compromiso',
        stat4: 'Tiempo respuesta'
      },
      benefits: {
        eyebrow: 'El problema',
        title: '¿Tu web trabaja para ti<br>o en tu contra?',
        sub: 'La mayoría de los negocios tienen webs lentas, desactualizadas o inexistentes. Nosotros cambiamos eso.',
        without: 'Sin SiteFlowCol',
        with: 'Con SiteFlowCol',
        bad1t: 'Web desactualizada y lenta',
        bad1p: 'Perdes clientes antes de que puedan contactarte. Una web lenta cuesta más del 7% de conversiones por segundo de demora.',
        good1t: 'Siempre rápida, siempre actualizada',
        good1p: 'Tu web carga en menos de 2 segundos, está siempre al día y genera confianza desde el primer clic.',
        bad2t: 'Tres proveedores distintos',
        bad2p: 'Hostings aquí, dominio allá, diseñador por otro lado. Múltiples facturas, múltiples responsables, múltiples problemas.',
        good2t: 'Todo en un solo pago mensual',
        good2p: 'Diseño, hosting, dominio, seguridad y soporte. Un proveedor, una factura, cero complicaciones.',
        bentoTitle: 'Lo que realmente ofrecemos',
        bentoP: 'No vendemos páginas web. Vendemos <strong style="color:var(--text-primary)">tranquilidad digital</strong>: presencia profesional, continuidad de negocio y un equipo que cuida tu activo más importante en internet.',
        b1t: 'Seguridad incluida',
        b1p: 'SSL, backups automáticos y monitoreo constante.',
        b2t: 'Rendimiento premium',
        b2p: 'Hosting optimizado para velocidad máxima.',
        b3t: 'Soporte real',
        b3p: 'Personas reales que responden rápido.',
        b4t: 'Mantenimiento continuo',
        b4p: 'Tu web no se congela en el tiempo. Actualizaciones regulares, ajustes de contenido y mejoras constantes mantienen tu presencia siempre fresca y relevante.',
        b5t: 'Alcance global',
        b5p: 'Diseñamos para cualquier mercado.'
      },
      features: {
        eyebrow: 'Características',
        title: 'Todo lo que necesitas,<br>nada de lo que no.',
        sub: 'Cada plan incluye una base sólida. Tú eliges hasta dónde llevar tu presencia digital.',
        f1t: 'Diseño web a medida',
        f1p: 'No usamos plantillas genéricas. Cada sitio refleja la identidad real de tu negocio: colores, tipografía, tono y estructura pensados para convertir visitas en clientes.',
        f1tag: 'Responsive 100%',
        f2t: 'Hosting & Dominio incluidos',
        f2p: 'Servidores rápidos, uptime del 99.9% y tu dominio personalizado desde el día uno. Sin cargos ocultos, sin migraciones complicadas.',
        f2tag: '99.9% uptime',
        f3t: 'Seguridad de nivel empresarial',
        f3p: 'Certificado SSL activo, firewall, copias de seguridad automáticas y monitoreo 24/7. Si algo pasa, lo detectamos y resolvemos antes de que tu cliente lo note.',
        f3tag: 'SSL · Firewall · Backups',
        f4t: 'Mantenimiento mensual',
        f4p: 'Actualizaciones, mejoras de contenido y ajustes técnicos sin costo adicional. Tu web evoluciona contigo.',
        f4tag: 'Actualizaciones incluidas',
        f5t: 'SEO & Analytics',
        f5p: 'Estructura optimizada para buscadores y métricas reales de visitantes. Sabe quién visita tu web y desde dónde.',
        f5tag: 'Plan Premium'
      },
      stats: {
        aria: 'Estadísticas',
        s1: 'Páginas entregadas',
        s2: 'Clientes satisfechos',
        s3: 'Tiempo de carga medio',
        s4: 'Compromiso total'
      },
      process: {
        eyebrow: 'Proceso',
        title: 'De idea a online en días,<br>no en meses.',
        sub: 'Un proceso claro, sin sorpresas, diseñado para que estés listo lo antes posible.',
        s1t: 'Nos escribes',
        s1p: 'Cuéntanos tu negocio por WhatsApp. Sin formularios complicados, solo una conversación.',
        s2t: 'Diseñamos tu web',
        s2p: 'Creamos un diseño personalizado alineado con tu marca y objetivos de negocio.',
        s3t: 'Revisas y apruebas',
        s3p: 'Tienes el control total. Ajustamos hasta que estés completamente satisfecho.',
        s4t: 'Publicamos y crecemos',
        s4p: 'Tu web va live y nosotros la cuidamos cada mes para que nunca pare de funcionar.'
      },
      pricing: {
        eyebrow: 'Planes',
        title: 'Precio justo,<br>valor claro.',
        sub: 'Sin contratos anuales obligatorios. Cancela cuando quieras.',
        currencyAria: 'Seleccionar moneda',
        period: '/mes',
        popular: 'Más popular',
        basic: 'Básico',
        pro: 'Profesional',
        premium: 'Premium',
        enterprise: 'Empresarial',
        custom: 'A medida',
        customSub: 'Cotización personalizada',
        hire: 'Contratar →',
        quote: 'Cotizar →',
        b1: 'Página hasta 5 secciones',
        b2: 'Diseño responsive',
        b3: 'Hosting y dominio',
        b4: 'Certificado SSL',
        b5: 'Soporte por email',
        p1: 'Página hasta 10 secciones',
        p2: 'Diseño personalizado',
        p3: 'Hosting y dominio',
        p4: 'SSL + Backups diarios',
        p5: 'Formulario de contacto',
        p6: 'Integración redes sociales',
        p7: 'Soporte WhatsApp prioritario',
        pr1: 'Hasta 15 secciones',
        pr2: 'Diseño premium',
        pr3: 'Hosting y dominio',
        pr4: 'SSL avanzado + Backups real-time',
        pr5: 'Tienda online básica',
        pr6: 'SEO optimizado',
        pr7: 'Analytics integrado',
        pr8: '3 actualizaciones/mes',
        pr9: 'Soporte WhatsApp prioritario',
        e1: 'Solución 100% personalizada',
        e2: 'E-commerce avanzado',
        e3: 'Integraciones a medida',
        e4: 'Sistema de gestión propio',
        e5: 'Hosting y dominio premium',
        e6: 'Backups automáticos',
        e7: 'Soporte dedicado 9am–5pm',
        e8: 'Desarrollo continuo'
      },
      why: {
        eyebrow: 'Ventajas',
        title: '¿Por qué SiteFlowCol<br>y no otro?',
        sub: 'La diferencia está en los detalles, la atención y el modelo de trabajo.',
        w1t: 'Pago mensual, sin sorpresas',
        w1p: 'Un solo cargo al mes que incluye absolutamente todo. Sin facturas inesperadas de hosting, dominio o mantenimiento.',
        w2t: 'Personas reales, no bots',
        w2p: 'Cuando necesites ayuda, hablas con alguien que conoce tu proyecto de principio a fin. No con un ticket de soporte genérico.',
        w3t: 'Soluciones para cualquier mercado',
        w3p: 'Diseñamos para negocios de toda América Latina y el mundo, con precios en USD, COP y EUR.',
        w4t: 'Tu web crece contigo',
        w4p: 'Seguimos contigo cuando tu negocio crece.',
        colFeature: 'Característica',
        colUs: 'SiteFlowCol',
        colThem: 'Freelancer típico',
        r1: 'Todo incluido',
        r1y: '✓ Sí',
        r1n: '✕ No',
        r2: 'Mantenimiento mensual',
        r2y: '✓ Incluido',
        r2n: '✕ Costo extra',
        r3: 'Soporte rápido',
        r3y: '✓ <48h',
        r3m: '~ Variable',
        r4: 'Precio predecible',
        r4y: '✓ Mensual fijo',
        r4n: '✕ Por proyecto',
        r5: 'Sin contratos largos',
        r5y: '✓ Mes a mes',
        r5m: '~ Varía',
        r6: 'Backups automáticos',
        r6y: '✓ Incluido',
        r6n: '✕ Costo extra'
      },
      testi: {
        eyebrow: 'Testimonios',
        title: 'Lo que dicen<br>nuestros clientes.',
        sub: 'Negocios reales que ya están creciendo con SiteFlowCol.',
        t1: '"Antes tenía un sitio viejo que daba más miedo que confianza. En menos de una semana SiteFlowCol me entregó algo que realmente representa mi marca. Mis clientes notan la diferencia."',
        t1role: 'Dueño — Ferretería El Progreso',
        t2: '"Lo que más valoro es la tranquilidad. Antes tenía que preocuparme por el hosting, el dominio, las actualizaciones... Ahora pago un mes y ya. Simple."',
        t2role: 'Directora — Clínica Dental Smile',
        t3: '"Necesitaba algo rápido para lanzar mi consultoría. En días tenía la web funcionando, con mi dominio y todo. El equipo es muy profesional y responde súper rápido."',
        t3role: 'Consultor — JR Estrategia Digital'
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Preguntas<br>frecuentes.',
        sub: '¿No encuentras tu respuesta? Escríbenos por WhatsApp.',
        ask: 'Preguntar →',
        q1: '¿Qué pasa si quiero cancelar?',
        a1: 'Puedes cancelar en cualquier momento sin penalización. Tu web seguirá activa hasta el final del período pagado. No hay contratos anuales ni cláusulas complicadas.',
        q2: '¿Cuánto tiempo tarda en estar lista mi web?',
        a2: 'Normalmente entre 5 y 10 días hábiles para proyectos estándar. Para planes empresariales con funcionalidades especiales, acordamos un timeline claro desde el inicio.',
        q3: '¿Puedo actualizar el contenido yo mismo?',
        a3: 'Sí. Según el plan, incluyes actualizaciones mensuales que nosotros hacemos por ti. Si prefieres un CMS para editarla tú solo, lo podemos configurar también.',
        q4: '¿El dominio me pertenece a mí?',
        a4: 'Absolutamente. El dominio queda registrado a tu nombre. Si algún día decides cambiar de proveedor, el dominio es tuyo y puedes llevártelo sin ningún problema.',
        q5: '¿Pueden hacer tiendas online?',
        a5: 'Sí. El plan Premium incluye una tienda básica. Para e-commerce avanzado con inventario, pasarelas de pago múltiples y gestión de pedidos, tenemos el plan Empresarial.',
        q6: '¿Trabajan con negocios fuera de Colombia?',
        a6: 'Sí, trabajamos con negocios de toda América Latina, España y otros países. Aceptamos pagos en USD, COP y EUR para mayor comodidad.'
      },
      contact: {
        eyebrow: 'Contacto',
        title: 'Escríbenos',
        sub: 'Déjanos tu mensaje y te respondemos pronto a tu correo.',
        metaEmailLbl: 'Correo',
        metaReplyLbl: 'Tiempo de respuesta',
        metaReply: 'Menos de 24 horas',
        metaSecureLbl: 'Privacidad',
        metaSecure: 'Tus datos están protegidos',
        emailLbl: 'Tu correo',
        emailPh: 'tu@email.com',
        phoneLbl: 'Tu número',
        phonePh: '+57 300 000 0000',
        msgLbl: 'Mensaje',
        msgPh: 'Cuéntanos qué necesitas...',
        send: 'Enviar mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado! Te responderemos pronto.',
        error: 'No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.',
        noConfig: 'Formulario sin configurar. Pega tu Access Key de web3forms.com en contact-config.js.',
        fillAll: 'Completa tu correo, número y mensaje.',
        formLink: 'Formulario de contacto'
      },
      cta: {
        title: 'Empieza hoy.<br>Tu web te espera.',
        sub: 'Únete a los negocios que ya confían en SiteFlowCol para su presencia digital.',
        wa: 'Hablar por WhatsApp',
        plans: 'Ver planes'
      },
      footer: {
        tagline: 'Tu página web profesional, siempre activa y cuidada. Partner digital para negocios de todo el mundo.',
        services: 'Servicios',
        company: 'Empresa',
        contact: 'Contacto',
        f1: 'Diseño Web',
        f2: 'Hosting & Dominio',
        f3: 'Mantenimiento',
        f4: 'SEO & Analytics',
        c1: 'Por qué nosotros',
        c2: 'Cómo funciona',
        c3: 'Testimonios',
        c4: 'FAQ',
        copy: '© 2025 SiteFlowCol. Todos los derechos reservados.',
        legal: 'Aviso legal',
        privacy: 'Privacidad'
      },
      wa: {
        quote: 'Hola, quiero cotizar mi página web',
        start: 'Hola, quiero empezar con mi página web profesional',
        question: 'Tengo una pregunta sobre SiteFlowCol',
        basic: 'Hola, quiero el plan Básico',
        pro: 'Hola, quiero el plan Profesional',
        premium: 'Hola, quiero el plan Premium',
        enterprise: 'Hola, quiero cotizar un plan Empresarial'
      }
    },
    en: {
      meta: {
        title: 'Website & Landing Page Creation | SiteFlowCol Colombia',
        description: 'We build professional websites and landing pages for your business. Web design, development, hosting, domain and maintenance. Colombia and Latin America.',
        keywords: 'website creation, landing page design, web development services, professional web design Colombia, business website, create website, web development agency, SiteFlowCol',
        ogTitle: 'SiteFlowCol — Website & Landing Page Creation',
        ogDescription: 'Design, development, hosting and maintenance in one monthly payment. Get your website or landing page quote today.'
      },
      nav: {
        aria: 'Main navigation',
        services: 'Services',
        features: 'Features',
        pricing: 'Plans',
        why: 'Why us',
        faq: 'FAQ',
        contact: '✉️ Contact',
        cta: '💬 Get a quote',
        menu: 'Menu',
        skip: 'Skip to content',
        waMobile: '💬 Quote on WhatsApp',
        langAria: 'Select language'
      },
      hero: {
        hfc1: 'SSL Active — Secure',
        hfc2: 'Loads in < 2s',
        hfc3: '+47% more clients',
        hfc4: 'Daily backup',
        badge: 'Web Design · Landing Pages · Development',
        title1: 'Your professional website,',
        title2: 'always active and cared for.',
        sub: 'We build websites and landing pages for your business — design, development, hosting, security and maintenance — so you can focus on growing your company.',
        ctaWa: 'Quote on WhatsApp',
        ctaPlans: 'View plans →',
        stat1: 'Websites built',
        stat2: '% satisfaction',
        stat3: '% commitment',
        stat4: 'Response time'
      },
      benefits: {
        eyebrow: 'The problem',
        title: 'Is your website working<br>for you or against you?',
        sub: 'Most businesses have slow, outdated or nonexistent websites. We change that.',
        without: 'Without SiteFlowCol',
        with: 'With SiteFlowCol',
        bad1t: 'Outdated, slow website',
        bad1p: 'You lose customers before they can reach you. A slow site costs more than 7% in conversions per second of delay.',
        good1t: 'Always fast, always up to date',
        good1p: 'Your site loads in under 2 seconds, stays current and builds trust from the first click.',
        bad2t: 'Three different providers',
        bad2p: 'Hosting here, domain there, designer elsewhere. Multiple bills, multiple contacts, multiple headaches.',
        good2t: 'Everything in one monthly payment',
        good2p: 'Design, hosting, domain, security and support. One provider, one invoice, zero hassle.',
        bentoTitle: 'What we really offer',
        bentoP: 'We don\'t sell websites. We sell <strong style="color:var(--text-primary)">digital peace of mind</strong>: professional presence, business continuity and a team that protects your most important online asset.',
        b1t: 'Security included',
        b1p: 'SSL, automatic backups and constant monitoring.',
        b2t: 'Premium performance',
        b2p: 'Hosting optimized for maximum speed.',
        b3t: 'Real support',
        b3p: 'Real people who respond quickly.',
        b4t: 'Ongoing maintenance',
        b4p: 'Your site doesn\'t freeze in time. Regular updates, content tweaks and constant improvements keep your presence fresh and relevant.',
        b5t: 'Global reach',
        b5p: 'We design for any market.'
      },
      features: {
        eyebrow: 'Features',
        title: 'Everything you need,<br>nothing you don\'t.',
        sub: 'Every plan includes a solid foundation. You choose how far to take your digital presence.',
        f1t: 'Custom web design',
        f1p: 'No generic templates. Every site reflects your real brand identity: colors, typography, tone and structure built to turn visits into customers.',
        f1tag: '100% responsive',
        f2t: 'Hosting & domain included',
        f2p: 'Fast servers, 99.9% uptime and your custom domain from day one. No hidden fees, no complicated migrations.',
        f2tag: '99.9% uptime',
        f3t: 'Enterprise-grade security',
        f3p: 'Active SSL certificate, firewall, automatic backups and 24/7 monitoring. If something happens, we detect and fix it before your client notices.',
        f3tag: 'SSL · Firewall · Backups',
        f4t: 'Monthly maintenance',
        f4p: 'Updates, content improvements and technical tweaks at no extra cost. Your site evolves with you.',
        f4tag: 'Updates included',
        f5t: 'SEO & Analytics',
        f5p: 'Search-optimized structure and real visitor metrics. Know who visits your site and from where.',
        f5tag: 'Premium plan'
      },
      stats: {
        aria: 'Statistics',
        s1: 'Sites delivered',
        s2: 'Happy clients',
        s3: 'Average load time',
        s4: 'Total commitment'
      },
      process: {
        eyebrow: 'Process',
        title: 'From idea to online in days,<br>not months.',
        sub: 'A clear process, no surprises, designed to get you ready as soon as possible.',
        s1t: 'You reach out',
        s1p: 'Tell us about your business on WhatsApp. No complicated forms, just a conversation.',
        s2t: 'We design your site',
        s2p: 'We create a custom design aligned with your brand and business goals.',
        s3t: 'You review and approve',
        s3p: 'You stay in full control. We adjust until you\'re completely satisfied.',
        s4t: 'We launch and grow',
        s4p: 'Your site goes live and we care for it every month so it never stops working.'
      },
      pricing: {
        eyebrow: 'Plans',
        title: 'Fair price,<br>clear value.',
        sub: 'No mandatory annual contracts. Cancel whenever you want.',
        currencyAria: 'Select currency',
        period: '/mo',
        popular: 'Most popular',
        basic: 'Basic',
        pro: 'Professional',
        premium: 'Premium',
        enterprise: 'Enterprise',
        custom: 'Custom',
        customSub: 'Personalized quote',
        hire: 'Get started →',
        quote: 'Get quote →',
        b1: 'Up to 5 sections',
        b2: 'Responsive design',
        b3: 'Hosting & domain',
        b4: 'SSL certificate',
        b5: 'Email support',
        p1: 'Up to 10 sections',
        p2: 'Custom design',
        p3: 'Hosting & domain',
        p4: 'SSL + daily backups',
        p5: 'Contact form',
        p6: 'Social media integration',
        p7: 'Priority WhatsApp support',
        pr1: 'Up to 15 sections',
        pr2: 'Premium design',
        pr3: 'Hosting & domain',
        pr4: 'Advanced SSL + real-time backups',
        pr5: 'Basic online store',
        pr6: 'SEO optimized',
        pr7: 'Integrated analytics',
        pr8: '3 updates/month',
        pr9: 'Priority WhatsApp support',
        e1: '100% custom solution',
        e2: 'Advanced e-commerce',
        e3: 'Custom integrations',
        e4: 'Custom management system',
        e5: 'Premium hosting & domain',
        e6: 'Automatic backups',
        e7: 'Dedicated support 9am–5pm',
        e8: 'Ongoing development'
      },
      why: {
        eyebrow: 'Advantages',
        title: 'Why SiteFlowCol<br>and not another?',
        sub: 'The difference is in the details, the attention and how we work.',
        w1t: 'Monthly payment, no surprises',
        w1p: 'One monthly charge that includes absolutely everything. No unexpected hosting, domain or maintenance bills.',
        w2t: 'Real people, not bots',
        w2p: 'When you need help, you talk to someone who knows your project inside out. Not a generic support ticket.',
        w3t: 'Solutions for any market',
        w3p: 'We design for businesses across Latin America and worldwide, with prices in USD, COP and EUR.',
        w4t: 'Your site grows with you',
        w4p: 'We stay with you as your business grows.',
        colFeature: 'Feature',
        colUs: 'SiteFlowCol',
        colThem: 'Typical freelancer',
        r1: 'All inclusive',
        r1y: '✓ Yes',
        r1n: '✕ No',
        r2: 'Monthly maintenance',
        r2y: '✓ Included',
        r2n: '✕ Extra cost',
        r3: 'Fast support',
        r3y: '✓ <48h',
        r3m: '~ Varies',
        r4: 'Predictable pricing',
        r4y: '✓ Fixed monthly',
        r4n: '✕ Per project',
        r5: 'No long contracts',
        r5y: '✓ Month to month',
        r5m: '~ Varies',
        r6: 'Automatic backups',
        r6y: '✓ Included',
        r6n: '✕ Extra cost'
      },
      testi: {
        eyebrow: 'Testimonials',
        title: 'What our<br>clients say.',
        sub: 'Real businesses already growing with SiteFlowCol.',
        t1: '"I had an old site that scared customers more than it inspired trust. In less than a week SiteFlowCol delivered something that truly represents my brand. My clients notice the difference."',
        t1role: 'Owner — Ferretería El Progreso',
        t2: '"What I value most is peace of mind. I used to worry about hosting, domain, updates... Now I pay monthly and that\'s it. Simple."',
        t2role: 'Director — Clínica Dental Smile',
        t3: '"I needed something fast to launch my consultancy. In days I had a working site with my domain and everything. The team is very professional and responds super fast."',
        t3role: 'Consultant — JR Estrategia Digital'
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Frequently<br>asked questions.',
        sub: 'Can\'t find your answer? Message us on WhatsApp.',
        ask: 'Ask →',
        q1: 'What if I want to cancel?',
        a1: 'You can cancel anytime without penalty. Your site stays active until the end of the paid period. No annual contracts or complicated clauses.',
        q2: 'How long until my site is ready?',
        a2: 'Usually 5 to 10 business days for standard projects. For enterprise plans with special features, we agree on a clear timeline from the start.',
        q3: 'Can I update content myself?',
        a3: 'Yes. Depending on your plan, monthly updates are included and we handle them for you. If you prefer a CMS to edit yourself, we can set that up too.',
        q4: 'Do I own the domain?',
        a4: 'Absolutely. The domain is registered in your name. If you ever change providers, the domain is yours to take with you.',
        q5: 'Can you build online stores?',
        a5: 'Yes. The Premium plan includes a basic store. For advanced e-commerce with inventory, multiple payment gateways and order management, we have the Enterprise plan.',
        q6: 'Do you work with businesses outside Colombia?',
        a6: 'Yes, we work with businesses across Latin America, Spain and other countries. We accept payments in USD, COP and EUR for your convenience.'
      },
      contact: {
        eyebrow: 'Contact',
        title: 'Write to us',
        sub: 'Leave your message and we\'ll reply to your email soon.',
        metaEmailLbl: 'Email',
        metaReplyLbl: 'Response time',
        metaReply: 'Under 24 hours',
        metaSecureLbl: 'Privacy',
        metaSecure: 'Your data is protected',
        emailLbl: 'Your email',
        emailPh: 'you@email.com',
        phoneLbl: 'Your phone number',
        phonePh: '+1 555 000 0000',
        msgLbl: 'Message',
        msgPh: 'Tell us what you need...',
        send: 'Send message',
        sending: 'Sending...',
        success: 'Message sent! We\'ll get back to you soon.',
        error: 'Could not send. Try again or message us on WhatsApp.',
        noConfig: 'Form not configured. Add your Web3Forms Access Key in contact-config.js.',
        fillAll: 'Please fill in your email, phone number and message.',
        formLink: 'Contact form'
      },
      cta: {
        title: 'Start today.<br>Your site is waiting.',
        sub: 'Join the businesses that already trust SiteFlowCol for their digital presence.',
        wa: 'Chat on WhatsApp',
        plans: 'View plans'
      },
      footer: {
        tagline: 'Your professional website, always active and cared for. Digital partner for businesses worldwide.',
        services: 'Services',
        company: 'Company',
        contact: 'Contact',
        f1: 'Web Design',
        f2: 'Hosting & Domain',
        f3: 'Maintenance',
        f4: 'SEO & Analytics',
        c1: 'Why us',
        c2: 'How it works',
        c3: 'Testimonials',
        c4: 'FAQ',
        copy: '© 2025 SiteFlowCol. All rights reserved.',
        legal: 'Legal notice',
        privacy: 'Privacy'
      },
      wa: {
        quote: 'Hi, I want a quote for my website',
        start: 'Hi, I want to start with my professional website',
        question: 'I have a question about SiteFlowCol',
        basic: 'Hi, I want the Basic plan',
        pro: 'Hi, I want the Professional plan',
        premium: 'Hi, I want the Premium plan',
        enterprise: 'Hi, I want a quote for an Enterprise plan'
      }
    },
    de: {
      meta: {
        title: 'Website- & Landing-Page-Erstellung | SiteFlowCol Kolumbien',
        description: 'Wir erstellen professionelle Websites und Landing Pages für Ihr Unternehmen. Webdesign, Entwicklung, Hosting, Domain und Wartung. Kolumbien und Lateinamerika.',
        keywords: 'Website-Erstellung, Landing Page Design, Webentwicklung, professionelles Webdesign Kolumbien, Unternehmenswebsite, Website erstellen, Webentwicklungsagentur, SiteFlowCol',
        ogTitle: 'SiteFlowCol — Website- & Landing-Page-Erstellung',
        ogDescription: 'Design, Entwicklung, Hosting und Wartung in einer monatlichen Zahlung. Fordern Sie noch heute ein Angebot für Ihre Website oder Landing Page an.'
      },
      nav: {
        aria: 'Hauptnavigation',
        services: 'Leistungen',
        features: 'Funktionen',
        pricing: 'Tarife',
        why: 'Warum wir',
        faq: 'FAQ',
        contact: '✉️ Kontakt',
        cta: '💬 Angebot anfordern',
        menu: 'Menü',
        skip: 'Zum Inhalt springen',
        waMobile: '💬 Angebot per WhatsApp',
        langAria: 'Sprache wählen'
      },
      hero: {
        hfc1: 'SSL aktiv — Sicher',
        hfc2: 'Lädt in < 2s',
        hfc3: '+47 % mehr Kunden',
        hfc4: 'Tägliches Backup',
        badge: 'Webdesign · Landing Pages · Entwicklung',
        title1: 'Ihre professionelle Website,',
        title2: 'immer aktiv und gepflegt.',
        sub: 'Wir erstellen Websites und Landing Pages für Ihr Unternehmen — Design, Entwicklung, Hosting, Sicherheit und Wartung — damit Sie sich auf das Wachstum Ihres Unternehmens konzentrieren können.',
        ctaWa: 'Angebot per WhatsApp',
        ctaPlans: 'Tarife ansehen →',
        stat1: 'Erstellte Websites',
        stat2: '% Zufriedenheit',
        stat3: '% Engagement',
        stat4: 'Antwortzeit'
      },
      benefits: {
        eyebrow: 'Das Problem',
        title: 'Arbeitet Ihre Website<br>für Sie oder gegen Sie?',
        sub: 'Die meisten Unternehmen haben langsame, veraltete oder gar keine Website. Das ändern wir.',
        without: 'Ohne SiteFlowCol',
        with: 'Mit SiteFlowCol',
        bad1t: 'Veraltete, langsame Website',
        bad1p: 'Sie verlieren Kunden, bevor diese Sie erreichen können. Eine langsame Website kostet mehr als 7 % Conversions pro Sekunde Verzögerung.',
        good1t: 'Immer schnell, immer aktuell',
        good1p: 'Ihre Website lädt in unter 2 Sekunden, bleibt aktuell und schafft Vertrauen ab dem ersten Klick.',
        bad2t: 'Drei verschiedene Anbieter',
        bad2p: 'Hosting hier, Domain dort, Designer woanders. Mehrere Rechnungen, mehrere Ansprechpartner, mehrere Probleme.',
        good2t: 'Alles in einer monatlichen Zahlung',
        good2p: 'Design, Hosting, Domain, Sicherheit und Support. Ein Anbieter, eine Rechnung, null Aufwand.',
        bentoTitle: 'Was wir wirklich bieten',
        bentoP: 'Wir verkaufen keine Websites. Wir verkaufen <strong style="color:var(--text-primary)">digitale Ruhe</strong>: professionelle Präsenz, Geschäftskontinuität und ein Team, das Ihr wichtigstes Online-Asset schützt.',
        b1t: 'Sicherheit inklusive',
        b1p: 'SSL, automatische Backups und ständige Überwachung.',
        b2t: 'Premium-Leistung',
        b2p: 'Hosting optimiert für maximale Geschwindigkeit.',
        b3t: 'Echter Support',
        b3p: 'Echte Menschen, die schnell antworten.',
        b4t: 'Laufende Wartung',
        b4p: 'Ihre Website bleibt nicht stehen. Regelmäßige Updates, Inhaltsanpassungen und ständige Verbesserungen halten Ihre Präsenz frisch und relevant.',
        b5t: 'Globale Reichweite',
        b5p: 'Wir gestalten für jeden Markt.'
      },
      features: {
        eyebrow: 'Funktionen',
        title: 'Alles, was Sie brauchen,<br>nichts, was Sie nicht brauchen.',
        sub: 'Jeder Tarif enthält eine solide Basis. Sie entscheiden, wie weit Sie Ihre digitale Präsenz ausbauen.',
        f1t: 'Individuelles Webdesign',
        f1p: 'Keine generischen Vorlagen. Jede Website spiegelt Ihre echte Markenidentität wider: Farben, Typografie, Ton und Struktur, die Besucher in Kunden verwandeln.',
        f1tag: '100 % responsiv',
        f2t: 'Hosting & Domain inklusive',
        f2p: 'Schnelle Server, 99,9 % Verfügbarkeit und Ihre eigene Domain ab Tag eins. Keine versteckten Gebühren, keine komplizierten Migrationen.',
        f2tag: '99,9 % Verfügbarkeit',
        f3t: 'Sicherheit auf Unternehmensniveau',
        f3p: 'Aktives SSL-Zertifikat, Firewall, automatische Backups und 24/7-Monitoring. Wenn etwas passiert, beheben wir es, bevor Ihr Kunde es merkt.',
        f3tag: 'SSL · Firewall · Backups',
        f4t: 'Monatliche Wartung',
        f4p: 'Updates, Inhaltsverbesserungen und technische Anpassungen ohne Zusatzkosten. Ihre Website wächst mit Ihnen.',
        f4tag: 'Updates inklusive',
        f5t: 'SEO & Analytics',
        f5p: 'Suchmaschinenoptimierte Struktur und echte Besuchermetriken. Wissen Sie, wer Ihre Website besucht und von wo.',
        f5tag: 'Premium-Tarif'
      },
      stats: {
        aria: 'Statistiken',
        s1: 'Gelieferte Websites',
        s2: 'Zufriedene Kunden',
        s3: 'Durchschnittliche Ladezeit',
        s4: 'Volles Engagement'
      },
      process: {
        eyebrow: 'Prozess',
        title: 'Von der Idee bis online in Tagen,<br>nicht in Monaten.',
        sub: 'Ein klarer Prozess ohne Überraschungen — damit Sie so schnell wie möglich starten können.',
        s1t: 'Sie schreiben uns',
        s1p: 'Erzählen Sie uns per WhatsApp von Ihrem Unternehmen. Keine komplizierten Formulare, nur ein Gespräch.',
        s2t: 'Wir gestalten Ihre Website',
        s2p: 'Wir erstellen ein individuelles Design, abgestimmt auf Ihre Marke und Geschäftsziele.',
        s3t: 'Sie prüfen und genehmigen',
        s3p: 'Sie behalten die volle Kontrolle. Wir passen an, bis Sie vollständig zufrieden sind.',
        s4t: 'Wir veröffentlichen und wachsen',
        s4p: 'Ihre Website geht live und wir kümmern uns jeden Monat darum, damit sie nie ausfällt.'
      },
      pricing: {
        eyebrow: 'Tarife',
        title: 'Fairer Preis,<br>klarer Mehrwert.',
        sub: 'Keine verpflichtenden Jahresverträge. Jederzeit kündbar.',
        currencyAria: 'Währung wählen',
        period: '/Monat',
        popular: 'Am beliebtesten',
        basic: 'Basis',
        pro: 'Professional',
        premium: 'Premium',
        enterprise: 'Enterprise',
        custom: 'Individuell',
        customSub: 'Persönliches Angebot',
        hire: 'Jetzt starten →',
        quote: 'Angebot anfordern →',
        b1: 'Bis zu 5 Abschnitte',
        b2: 'Responsives Design',
        b3: 'Hosting & Domain',
        b4: 'SSL-Zertifikat',
        b5: 'E-Mail-Support',
        p1: 'Bis zu 10 Abschnitte',
        p2: 'Individuelles Design',
        p3: 'Hosting & Domain',
        p4: 'SSL + tägliche Backups',
        p5: 'Kontaktformular',
        p6: 'Social-Media-Integration',
        p7: 'Prioritäts-Support per WhatsApp',
        pr1: 'Bis zu 15 Abschnitte',
        pr2: 'Premium-Design',
        pr3: 'Hosting & Domain',
        pr4: 'Erweitertes SSL + Echtzeit-Backups',
        pr5: 'Einfacher Online-Shop',
        pr6: 'SEO-optimiert',
        pr7: 'Integrierte Analytics',
        pr8: '3 Updates/Monat',
        pr9: 'Prioritäts-Support per WhatsApp',
        e1: '100 % individuelle Lösung',
        e2: 'Erweiterter E-Commerce',
        e3: 'Individuelle Integrationen',
        e4: 'Eigenes Verwaltungssystem',
        e5: 'Premium-Hosting & Domain',
        e6: 'Automatische Backups',
        e7: 'Dedizierter Support 9–17 Uhr',
        e8: 'Laufende Entwicklung'
      },
      why: {
        eyebrow: 'Vorteile',
        title: 'Warum SiteFlowCol<br>und nicht ein anderer?',
        sub: 'Der Unterschied liegt in den Details, der Betreuung und unserer Arbeitsweise.',
        w1t: 'Monatliche Zahlung, keine Überraschungen',
        w1p: 'Eine monatliche Gebühr, die absolut alles abdeckt. Keine unerwarteten Rechnungen für Hosting, Domain oder Wartung.',
        w2t: 'Echte Menschen, keine Bots',
        w2p: 'Wenn Sie Hilfe brauchen, sprechen Sie mit jemandem, der Ihr Projekt von Anfang bis Ende kennt — nicht mit einem anonymen Support-Ticket.',
        w3t: 'Lösungen für jeden Markt',
        w3p: 'Wir gestalten für Unternehmen in Lateinamerika und weltweit, mit Preisen in USD, COP und EUR.',
        w4t: 'Ihre Website wächst mit Ihnen',
        w4p: 'Wir bleiben an Ihrer Seite, wenn Ihr Unternehmen wächst.',
        colFeature: 'Merkmal',
        colUs: 'SiteFlowCol',
        colThem: 'Typischer Freelancer',
        r1: 'Alles inklusive',
        r1y: '✓ Ja',
        r1n: '✕ Nein',
        r2: 'Monatliche Wartung',
        r2y: '✓ Inklusive',
        r2n: '✕ Zusatzkosten',
        r3: 'Schneller Support',
        r3y: '✓ <48h',
        r3m: '~ Variiert',
        r4: 'Planbare Preise',
        r4y: '✓ Fest monatlich',
        r4n: '✕ Pro Projekt',
        r5: 'Keine langen Verträge',
        r5y: '✓ Monat für Monat',
        r5m: '~ Variiert',
        r6: 'Automatische Backups',
        r6y: '✓ Inklusive',
        r6n: '✕ Zusatzkosten'
      },
      testi: {
        eyebrow: 'Referenzen',
        title: 'Was unsere<br>Kunden sagen.',
        sub: 'Echte Unternehmen, die bereits mit SiteFlowCol wachsen.',
        t1: '„Früher hatte ich eine alte Website, die mehr Angst als Vertrauen schuf. In weniger als einer Woche lieferte SiteFlowCol etwas, das meine Marke wirklich repräsentiert. Meine Kunden merken den Unterschied."',
        t1role: 'Inhaber — Ferretería El Progreso',
        t2: '„Am meisten schätze ich die Ruhe. Früher musste ich mich um Hosting, Domain und Updates kümmern … Jetzt zahle ich monatlich und fertig. Einfach."',
        t2role: 'Direktorin — Clínica Dental Smile',
        t3: '„Ich brauchte schnell etwas, um meine Beratung zu starten. In wenigen Tagen hatte ich eine funktionierende Website mit eigener Domain. Das Team ist sehr professionell und antwortet blitzschnell."',
        t3role: 'Berater — JR Estrategia Digital'
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Häufig gestellte<br>Fragen.',
        sub: 'Keine Antwort gefunden? Schreiben Sie uns per WhatsApp.',
        ask: 'Fragen →',
        q1: 'Was passiert, wenn ich kündigen möchte?',
        a1: 'Sie können jederzeit ohne Strafe kündigen. Ihre Website bleibt bis zum Ende des bezahlten Zeitraums aktiv. Keine Jahresverträge oder komplizierten Klauseln.',
        q2: 'Wie lange dauert es, bis meine Website fertig ist?',
        a2: 'In der Regel 5 bis 10 Werktage für Standardprojekte. Bei Enterprise-Tarifen mit besonderen Funktionen vereinbaren wir von Anfang an einen klaren Zeitplan.',
        q3: 'Kann ich Inhalte selbst aktualisieren?',
        a3: 'Ja. Je nach Tarif sind monatliche Updates inklusive, die wir für Sie übernehmen. Wenn Sie lieber ein CMS zur Selbstbearbeitung möchten, richten wir das ebenfalls ein.',
        q4: 'Gehört die Domain mir?',
        a4: 'Absolut. Die Domain wird auf Ihren Namen registriert. Wenn Sie jemals den Anbieter wechseln, gehört die Domain Ihnen und Sie können sie mitnehmen.',
        q5: 'Können Sie Online-Shops erstellen?',
        a5: 'Ja. Der Premium-Tarif enthält einen einfachen Shop. Für erweiterten E-Commerce mit Inventar, mehreren Zahlungsgateways und Bestellverwaltung bieten wir den Enterprise-Tarif.',
        q6: 'Arbeiten Sie mit Unternehmen außerhalb Kolumbiens?',
        a6: 'Ja, wir arbeiten mit Unternehmen in ganz Lateinamerika, Spanien und anderen Ländern. Wir akzeptieren Zahlungen in USD, COP und EUR.'
      },
      contact: {
        eyebrow: 'Kontakt',
        title: 'Schreiben Sie uns',
        sub: 'Hinterlassen Sie Ihre Nachricht und wir antworten bald per E-Mail.',
        metaEmailLbl: 'E-Mail',
        metaReplyLbl: 'Antwortzeit',
        metaReply: 'Unter 24 Stunden',
        metaSecureLbl: 'Datenschutz',
        metaSecure: 'Ihre Daten sind geschützt',
        emailLbl: 'Ihre E-Mail',
        emailPh: 'ihre@email.com',
        phoneLbl: 'Ihre Telefonnummer',
        phonePh: '+49 170 000 0000',
        msgLbl: 'Nachricht',
        msgPh: 'Erzählen Sie uns, was Sie brauchen …',
        send: 'Nachricht senden',
        sending: 'Wird gesendet …',
        success: 'Nachricht gesendet! Wir melden uns bald bei Ihnen.',
        error: 'Senden fehlgeschlagen. Versuchen Sie es erneut oder schreiben Sie uns per WhatsApp.',
        noConfig: 'Formular nicht konfiguriert. Fügen Sie Ihren Web3Forms Access Key in contact-config.js ein.',
        fillAll: 'Bitte füllen Sie E-Mail, Telefonnummer und Nachricht aus.',
        formLink: 'Kontaktformular'
      },
      cta: {
        title: 'Starten Sie heute.<br>Ihre Website wartet.',
        sub: 'Schließen Sie sich den Unternehmen an, die SiteFlowCol bereits für ihre digitale Präsenz vertrauen.',
        wa: 'Per WhatsApp schreiben',
        plans: 'Tarife ansehen'
      },
      footer: {
        tagline: 'Ihre professionelle Website, immer aktiv und gepflegt. Digitaler Partner für Unternehmen weltweit.',
        services: 'Leistungen',
        company: 'Unternehmen',
        contact: 'Kontakt',
        f1: 'Webdesign',
        f2: 'Hosting & Domain',
        f3: 'Wartung',
        f4: 'SEO & Analytics',
        c1: 'Warum wir',
        c2: 'So funktioniert es',
        c3: 'Referenzen',
        c4: 'FAQ',
        copy: '© 2025 SiteFlowCol. Alle Rechte vorbehalten.',
        legal: 'Impressum',
        privacy: 'Datenschutz'
      },
      wa: {
        quote: 'Hallo, ich möchte ein Angebot für meine Website',
        start: 'Hallo, ich möchte mit meiner professionellen Website starten',
        question: 'Ich habe eine Frage zu SiteFlowCol',
        basic: 'Hallo, ich möchte den Basis-Tarif',
        pro: 'Hallo, ich möchte den Professional-Tarif',
        premium: 'Hallo, ich möchte den Premium-Tarif',
        enterprise: 'Hallo, ich möchte ein Angebot für den Enterprise-Tarif'
      }
    }
  };

  function langFromNavigator() {
    for (const tag of navigator.languages?.length ? navigator.languages : [navigator.language || 'es']) {
      const l = String(tag).toLowerCase();
      if (l.startsWith('de')) return 'de';
      if (l.startsWith('en')) return 'en';
      if (l.startsWith('es')) return 'es';
    }
    return 'es';
  }

  const GEO_SESSION_KEY = 'sf-geo-lang';

  function readSessionGeo() {
    try {
      const v = sessionStorage.getItem(GEO_SESSION_KEY);
      return LANGS.includes(v) ? v : null;
    } catch (_) {
      return null;
    }
  }

  function saveSessionGeo(next) {
    try { sessionStorage.setItem(GEO_SESSION_KEY, next); } catch (_) {}
  }

  async function fetchGeoLang() {
    const cached = readSessionGeo();
    if (cached) return cached;

    const pending = window.__geoP;
    const data = pending
      ? await Promise.race([
          pending,
          new Promise(r => setTimeout(() => r(null), 2000))
        ])
      : null;

    if (data?.lang && LANGS.includes(data.lang)) {
      saveSessionGeo(data.lang);
      return data.lang;
    }

    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 2000);
      const res = await fetch('/api/geo', { cache: 'no-store', credentials: 'same-origin', signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const json = await res.json();
        if (LANGS.includes(json.lang)) {
          saveSessionGeo(json.lang);
          return json.lang;
        }
      }
    } catch (_) {}

    return langFromNavigator();
  }

  function resolve(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : null), obj);
  }

  let lang = langFromNavigator();
  let textEls = [];
  let htmlEls = [];
  let waEls = [];
  let attrEls = [];
  let seoReady = false;

  function t(key) {
    return resolve(T[lang], key) ?? resolve(T.es, key) ?? '';
  }

  function cacheElements() {
    textEls = [...document.querySelectorAll('[data-i18n]')];
    htmlEls = [...document.querySelectorAll('[data-i18n-html]')];
    waEls = [...document.querySelectorAll('[data-wa]')];
    attrEls = [...document.querySelectorAll('[data-i18n-attr]')];
  }

  function applyMeta() {
    document.documentElement.lang = lang;
    if (window.SiteFlowSEO) {
      SiteFlowSEO.apply(lang);
    } else {
      document.title = t('meta.title');
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', t('meta.description'));
    }
  }

  function initSeo() {
    if (seoReady) return;
    seoReady = true;
    const run = () => {
      if (window.SiteFlowSEO) {
        SiteFlowSEO.init();
        return;
      }
      const s = document.createElement('script');
      s.src = 'seo.js';
      s.onload = () => window.SiteFlowSEO?.init();
      document.head.appendChild(s);
    };
    if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 1200 });
    else setTimeout(run, 0);
  }

  function applyContent(animate) {
    const update = () => {
      textEls.forEach(el => {
        const next = t(el.dataset.i18n);
        if (el.textContent !== next) el.textContent = next;
      });
      htmlEls.forEach(el => {
        const next = t(el.dataset.i18nHtml);
        if (el.innerHTML !== next) el.innerHTML = next;
      });
      waEls.forEach(el => {
        const href = WA_BASE + encodeURIComponent(t('wa.' + el.dataset.wa));
        if (el.href !== href) el.href = href;
      });
      attrEls.forEach(el => {
        const [attr, key] = el.dataset.i18nAttr.split(':');
        if (attr && key) {
          const next = t(key);
          if (el.getAttribute(attr) !== next) el.setAttribute(attr, next);
        }
      });
      applyMeta();
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    };

    if (animate && window.gsap) {
      const blocks = document.querySelectorAll('section, footer');
      gsap.to(blocks, {
        opacity: 0,
        y: 8,
        duration: 0.18,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete() {
          update();
          gsap.fromTo(blocks,
            { opacity: 0, y: -6 },
            { opacity: 1, y: 0, duration: 0.28, stagger: 0.03, ease: 'power2.out' }
          );
        }
      });
    } else {
      update();
    }
  }

  function syncLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const on = btn.dataset.lang === lang;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function setLang(next, animate = true) {
    if (!LANGS.includes(next)) return;
    if (next === lang) return;
    lang = next;
    syncLangButtons();
    moveLangIndicators(animate);
    applyContent(animate);
  }

  function moveLangIndicators(animate = true) {
    document.querySelectorAll('.lang-switch').forEach(wrap => {
      const indicator = wrap.querySelector('.lang-indicator');
      const btn = wrap.querySelector('.lang-btn.active');
      if (!indicator || !btn) return;
      const wr = wrap.getBoundingClientRect();
      const br = btn.getBoundingClientRect();
      const props = { x: br.left - wr.left, width: br.width, duration: animate ? 0.35 : 0, ease: 'power3.inOut' };
      if (window.gsap) gsap.to(indicator, props);
      else {
        indicator.style.width = br.width + 'px';
        indicator.style.transform = `translateX(${br.left - wr.left}px)`;
      }
    });
  }

  let initPromise = null;

  async function init() {
    if (initPromise) return initPromise;
    initPromise = (async () => {
      cacheElements();
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang, true));
      });

      const sessionGeo = readSessionGeo();
      if (sessionGeo) lang = sessionGeo;

      syncLangButtons();
      document.querySelectorAll('.lang-switch').forEach(w => w.classList.add('ready'));
      moveLangIndicators(false);
      applyContent(false);
      initSeo();

      const geoLang = await fetchGeoLang();
      if (geoLang !== lang) {
        lang = geoLang;
        syncLangButtons();
        moveLangIndicators(false);
        applyContent(false);
      }

      window.addEventListener('resize', () => moveLangIndicators(false), { passive: true });
    })();
    return initPromise;
  }

  init();

  return { init, setLang, t, getLang: () => lang };
})();
