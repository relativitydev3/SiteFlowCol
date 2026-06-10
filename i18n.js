/* SiteFlowCol — i18n ligero (ES / EN) */
window.SiteFlowI18n = (function () {
  const STORAGE_KEY = 'siteflow-lang';
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
    }
  };

  function getStoredLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
    const nav = (navigator.language || 'es').toLowerCase();
    return nav.startsWith('en') ? 'en' : 'es';
  }

  function resolve(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : null), obj);
  }

  let lang = getStoredLang();
  let textEls = [];
  let htmlEls = [];
  let waEls = [];
  let attrEls = [];

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

  function applyContent(animate) {
    const update = () => {
      textEls.forEach(el => { el.textContent = t(el.dataset.i18n); });
      htmlEls.forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
      waEls.forEach(el => {
        el.href = WA_BASE + encodeURIComponent(t('wa.' + el.dataset.wa));
      });
      attrEls.forEach(el => {
        const [attr, key] = el.dataset.i18nAttr.split(':');
        if (attr && key) el.setAttribute(attr, t(key));
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

  function setLang(next, animate = true) {
    if (next !== 'es' && next !== 'en') return;
    if (next === lang) return;
    lang = next;
    localStorage.setItem(STORAGE_KEY, lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
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

  function init() {
    cacheElements();
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang, true));
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
    document.querySelectorAll('.lang-switch').forEach(w => w.classList.add('ready'));
    moveLangIndicators(false);
    applyContent(false);
    window.addEventListener('resize', () => moveLangIndicators(false), { passive: true });
    window.addEventListener('load', () => moveLangIndicators(false));
  }

  return { init, setLang, t, getLang: () => lang };
})();
