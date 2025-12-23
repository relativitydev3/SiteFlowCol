// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// ============================================
// SMOOTH SCROLL PARA ENLACES DE NAVEGACIÓN
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Solo aplicar smooth scroll si no es un enlace vacío
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para el navbar fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar el menú móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        }
    });
});

// ============================================
// ANIMACIONES AL HACER SCROLL (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos con animación
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .why-card, .step-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
});

// ============================================
// CONTADOR ANIMADO PARA PRECIOS (OPCIONAL)
// ============================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue.toLocaleString('es-CO');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observar cuando los precios entran en vista
const priceObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const priceElement = entry.target.querySelector('.amount');
            if (priceElement) {
                const finalValue = parseInt(priceElement.textContent.replace(/\./g, ''));
                priceElement.textContent = '0';
                animateValue(priceElement, 0, finalValue, 2000);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        priceObserver.observe(card);
    });
});

// ============================================
// EFECTO PARALLAX SUAVE EN HERO
// ============================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && scrolled < heroSection.offsetHeight) {
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroImage.style.opacity = 1 - (scrolled / heroSection.offsetHeight) * 0.5;
        }
    }
});

// ============================================
// VALIDACIÓN Y ENVÍO DE FORMULARIO (SI SE AGREGA)
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// EFECTO DE HOVER MEJORADO EN TARJETAS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .pricing-card, .why-card, .step-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// ============================================
// LAZY LOADING PARA IMÁGENES (SI SE AGREGAN)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// MENSAJE PERSONALIZADO PARA WHATSAPP
// ============================================
function openWhatsApp(message) {
    const phoneNumber = '573001234567'; // Reemplazar con número real
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ============================================
// CONTADOR DE ESTADÍSTICAS (OPCIONAL - PARA FUTURAS MEJORAS)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ============================================
// DETECCIÓN DE DISPOSITIVO MÓVIL
// ============================================
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar animaciones según dispositivo
window.addEventListener('resize', function() {
    if (isMobile()) {
        // Desactivar efectos pesados en móvil para mejor rendimiento
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.remove('mobile-device');
    }
});

// Verificar al cargar
if (isMobile()) {
    document.body.classList.add('mobile-device');
}

// ============================================
// PREVENIR FLASH DE CONTENIDO SIN ESTILOS (FOUT)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// ============================================
// SCROLL TO TOP BUTTON (OPCIONAL - SE PUEDE AGREGAR)
// ============================================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="bi bi-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #06b6d4 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Crear el botón de scroll to top
createScrollToTopButton();

// ============================================
// CONSOLE LOG PARA DESARROLLO
// ============================================
console.log('%cSiteFlowCol', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cPágina web cargada correctamente', 'color: #06b6d4;');

