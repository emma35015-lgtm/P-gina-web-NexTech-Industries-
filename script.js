// ============================================
// NexTech Industries - JavaScript
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Funcionalidad del Acordeón
    // ============================================
    
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const wasActive = accordionItem.classList.contains('active');
            
            // Cerrar todos los acordeones en la misma categoría
            const parentAccordion = this.closest('.accordion');
            const allItems = parentAccordion.querySelectorAll('.accordion-item');
            allItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Si el item no estaba activo, abrirlo
            if (!wasActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    
    // ============================================
    // Animación de entrada para elementos al hacer scroll
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar tarjetas de simuladores
    const simulatorCards = document.querySelectorAll('.simulator-card');
    simulatorCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 500ms ease ${index * 100}ms, transform 500ms ease ${index * 100}ms`;
        observer.observe(card);
    });
    
    // Observar tarjetas de términos
    const termCards = document.querySelectorAll('.term-card');
    termCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 400ms ease ${index * 50}ms, transform 400ms ease ${index * 50}ms`;
        observer.observe(card);
    });
    
    // ============================================
    // Smooth Scroll para navegación (si se añaden enlaces)
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ============================================
    // Efecto parallax sutil en el hero (opcional)
    // ============================================
    
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.3;
            }
        });
    }
    
    // ============================================
    // Contador de scroll para mostrar progreso (opcional)
    // ============================================
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        // Se puede añadir una barra de progreso si se desea
        // document.querySelector('.scroll-progress').style.width = scrollProgress + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // ============================================
    // Efecto de hover mejorado para tarjetas de simulador
    // ============================================
    
    simulatorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 300ms cubic-bezier(0.25, 0.1, 0.25, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 300ms cubic-bezier(0.25, 0.1, 0.25, 1)';
        });
    });
    
    // ============================================
    // Animación para los iconos SVG (opcional)
    // ============================================
    
    const animatedIcons = document.querySelectorAll('.simulator-visual svg');
    
    animatedIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Pequeña animación de escala
            this.style.transition = 'transform 300ms ease';
            this.style.transform = 'scale(1.05)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ============================================
    // Log de bienvenida en consola (marca de agua)
    // ============================================
    
    console.log('%c NexTech Industries ', 'background: #007AFF; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Simulador de Procesos Industriales v2.0 ', 'background: #1D1D1F; color: white; font-size: 14px; padding: 5px;');
    console.log('%c Desarrollado con ❤️ en León, Guanajuato ', 'color: #424245; font-size: 12px;');
    
    // ============================================
    // Performance: Lazy loading de imágenes (si se añaden)
    // ============================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ============================================
    // Accesibilidad: Navegación por teclado mejorada
    // ============================================
    
    accordionHeaders.forEach(header => {
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ============================================
    // Detección de modo oscuro del sistema (para futuras implementaciones)
    // ============================================
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // El usuario prefiere modo oscuro
        // Se puede implementar un switch de tema aquí
        console.log('Modo oscuro detectado');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? 'dark' : 'light';
        console.log('Esquema de color cambiado a:', newColorScheme);
        // Implementar cambio de tema aquí
    });
    
});

// ============================================
// Utilidades adicionales
// ============================================

// Función para detectar si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce para optimizar eventos de scroll/resize
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Ejemplo de uso de debounce en scroll
const optimizedScroll = debounce(function() {
    // Acciones optimizadas en scroll
}, 20);

window.addEventListener('scroll', optimizedScroll);
