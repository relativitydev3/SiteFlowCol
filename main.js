// ============================================
// NAVBAR SCROLL EFFECT (OPTIMIZADO)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
});

// ============================================
// SMOOTH SCROLL PARA ENLACES DE NAVEGACIÓN (MEJORADO)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Solo aplicar smooth scroll si no es un enlace vacío
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Calcular el offset considerando el navbar
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;
                
                // Usar scrollTo con smooth behavior
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar el menú móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
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
function animateValue(element, start, end, duration, currency = 'USD') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        // Formatear diferente según la moneda
        if (currency === 'COP') {
            element.textContent = currentValue.toLocaleString('es-CO');
        } else {
            element.textContent = currentValue.toString();
        }
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
                const currentCurrency = localStorage.getItem('preferredCurrency') || 'USD';
                let priceValue = '';
                if (currentCurrency === 'USD') {
                    priceValue = priceElement.getAttribute('data-usd');
                } else if (currentCurrency === 'COP') {
                    priceValue = priceElement.getAttribute('data-cop');
                } else if (currentCurrency === 'EUR') {
                    priceValue = priceElement.getAttribute('data-eur');
                }
                const finalValue = parseInt(priceValue);
                if (!isNaN(finalValue)) {
                    priceElement.textContent = '0';
                    animateValue(priceElement, 0, finalValue, 2000, currentCurrency);
                }
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
// EFECTO PARALLAX SUAVE EN HERO (OPTIMIZADO)
// ============================================
let ticking = false;
let lastScrollY = 0;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && scrolled < heroSection.offsetHeight) {
        if (heroImage) {
            // Usar transform3d para mejor rendimiento
            const translateY = scrolled * 0.3; // Reducido para menos movimiento
            const opacity = Math.max(0.5, 1 - (scrolled / heroSection.offsetHeight) * 0.3);
            
            heroImage.style.transform = `translate3d(0, ${translateY}px, 0)`;
            heroImage.style.opacity = opacity;
            heroImage.style.willChange = 'transform, opacity';
        }
    } else if (heroImage) {
        heroImage.style.willChange = 'auto';
    }
    
    lastScrollY = scrolled;
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

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
// SELECTOR DE DIVISA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const currencyToggle = document.getElementById('currencyToggle');
    const currencyLabel = document.getElementById('currencyLabel');
    const priceAmounts = document.querySelectorAll('.price .amount');
    const currencyCodes = document.querySelectorAll('.price .currency-code');
    const currencyOptions = document.querySelectorAll('.currency-option');
    const currencyModal = document.getElementById('currencyModal');
    
    // Obtener la divisa guardada o usar USD por defecto
    let currentCurrency = localStorage.getItem('preferredCurrency') || 'USD';
    
    // Inicializar el modal de Bootstrap
    let currencyModalInstance = null;
    if (currencyModal && typeof bootstrap !== 'undefined') {
        currencyModalInstance = new bootstrap.Modal(currencyModal, {
            backdrop: true,
            keyboard: true
        });
    }
    
    // Event listener para abrir el modal desde el botón
    if (currencyToggle) {
        currencyToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Asegurar que la opción activa esté marcada
            currencyOptions.forEach(option => {
                if (option.getAttribute('data-currency') === currentCurrency) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
            
            // Abrir el modal
            if (currencyModalInstance) {
                currencyModalInstance.show();
            } else if (currencyModal) {
                // Fallback si Bootstrap no está disponible
                currencyModal.style.display = 'block';
                currencyModal.classList.add('show');
                document.body.classList.add('modal-open');
            }
        });
    }
    
    // Función para obtener el símbolo de moneda
    function getCurrencySymbol(currency) {
        switch(currency) {
            case 'USD': return '$';
            case 'COP': return '$';
            case 'EUR': return '€';
            default: return '$';
        }
    }
    
    // Función para cambiar la divisa
    function changeCurrency(currency) {
        currentCurrency = currency;
        localStorage.setItem('preferredCurrency', currency);
        
        const currencySymbol = getCurrencySymbol(currency);
        
        priceAmounts.forEach(amountEl => {
            const usdValue = amountEl.getAttribute('data-usd');
            const copValue = amountEl.getAttribute('data-cop');
            const eurValue = amountEl.getAttribute('data-eur');
            
            let displayValue = '';
            if (currency === 'USD') {
                displayValue = usdValue;
            } else if (currency === 'COP') {
                // Formatear COP con puntos de miles
                displayValue = parseInt(copValue).toLocaleString('es-CO');
            } else if (currency === 'EUR') {
                displayValue = eurValue;
            }
            
            amountEl.textContent = displayValue;
        });
        
        // Actualizar símbolos de moneda
        document.querySelectorAll('.price .currency').forEach(currencyEl => {
            currencyEl.textContent = currencySymbol;
        });
        
        currencyCodes.forEach(codeEl => {
            codeEl.textContent = currency;
        });
        
        // Actualizar opciones activas en el modal
        currencyOptions.forEach(option => {
            if (option.getAttribute('data-currency') === currency) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // Cerrar el modal
        if (currencyModalInstance) {
            currencyModalInstance.hide();
        } else if (currencyModal) {
            // Fallback si Bootstrap no está disponible
            currencyModal.style.display = 'none';
            currencyModal.classList.remove('show');
            document.body.classList.remove('modal-open');
        }
    }
    
    // Aplicar la divisa guardada al cargar
    changeCurrency(currentCurrency);
    
    // Event listeners para las opciones de moneda en el modal
    currencyOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const selectedCurrency = this.getAttribute('data-currency');
            if (selectedCurrency) {
                changeCurrency(selectedCurrency);
            }
        });
        
        // Mejorar la experiencia táctil en móviles
        option.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        option.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Mostrar la opción activa cuando se abre el modal
    if (currencyModal) {
        currencyModal.addEventListener('show.bs.modal', function() {
            currencyOptions.forEach(option => {
                if (option.getAttribute('data-currency') === currentCurrency) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
        });
        
        // También actualizar cuando el modal está visible (para móviles)
        currencyModal.addEventListener('shown.bs.modal', function() {
            currencyOptions.forEach(option => {
                if (option.getAttribute('data-currency') === currentCurrency) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
        });
    }
});

// ============================================
// CONSOLE LOG PARA DESARROLLO
// ============================================
console.log('%cSiteFlowCol', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cPágina web cargada correctamente', 'color: #06b6d4;');

