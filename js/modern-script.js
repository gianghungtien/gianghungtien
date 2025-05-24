// Modern JavaScript for Jason Giang's Portfolio Website
// Optimized for performance and mobile responsiveness

'use strict';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeMobileOptimizations();
    initializePerformanceOptimizations();
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect with throttling
    let ticking = false;
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    function requestNavbarUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
    
    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update aria attributes for accessibility
            const isOpen = navMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen);
            
            // Change icon
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbar.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // Close mobile menu when window is resized to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                        const icon = mobileMenuToggle.querySelector('i');
                        if (icon) {
                            icon.className = 'fas fa-bars';
                        }
                    }
                    
                    // Smooth scroll to target
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active class
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll listener for active nav updates
    let navTicking = false;
    function requestNavUpdate() {
        if (!navTicking) {
            requestAnimationFrame(updateActiveNavLink);
            navTicking = true;
            setTimeout(() => { navTicking = false; }, 100);
        }
    }
    
    window.addEventListener('scroll', requestNavUpdate, { passive: true });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .timeline-item, .testimonial-card, .about-content, .contact-form, .contact-info'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced animations
function initializeAnimations() {
    // Stagger animations for grids
    function staggerAnimation(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * delay}ms`;
        });
    }
    
    // Apply stagger animations
    staggerAnimation('.service-card', 150);
    staggerAnimation('.testimonial-card', 200);
    staggerAnimation('.timeline-item', 250);
    
    // Parallax effect for hero section (disabled on mobile for performance)
    if (window.innerWidth > 768) {
        let heroSection = document.querySelector('.hero');
        if (heroSection) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroSection.style.transform = `translateY(${rate}px)`;
            }, { passive: true });
        }
    }
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .service-card, .social-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('form');
    if (!contactForm) return;
    
    // Form validation
    function validateForm(formData) {
        const errors = [];
        
        if (!formData.get('name') || formData.get('name').trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.get('subject') || formData.get('subject').trim().length < 3) {
            errors.push('Subject must be at least 3 characters long');
        }
        
        if (!formData.get('message') || formData.get('message').trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        return errors;
    }
    
    // Show notification
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showNotification(errors[0], 'error');
            return;
        }
        
        // Simulate form submission (replace with actual submission logic)
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
    
    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const formData = new FormData();
            formData.append(this.name, this.value);
            
            // Add other form values for complete validation
            inputs.forEach(inp => {
                if (inp !== this) {
                    formData.append(inp.name, inp.value);
                }
            });
            
            const errors = validateForm(formData);
            const fieldError = errors.find(error => 
                error.toLowerCase().includes(this.name.toLowerCase())
            );
            
            // Remove existing error styling
            this.style.borderColor = '';
            const existingError = this.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Add error styling if needed
            if (fieldError) {
                this.style.borderColor = '#ef4444';
                const errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
                errorDiv.textContent = fieldError;
                this.parentNode.appendChild(errorDiv);
            }
        });
    });
}

// Mobile-specific optimizations
function initializeMobileOptimizations() {
    // Touch-friendly interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Improve touch targets
        const touchTargets = document.querySelectorAll('.btn, .nav-link, .social-link');
        touchTargets.forEach(target => {
            target.style.minHeight = '44px';
            target.style.minWidth = '44px';
        });
        
        // Only prevent zoom on iOS, not general scrolling
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevent zoom but allow scrolling
        document.addEventListener('gesturestart', function(e) {
            e.preventDefault();
        }, { passive: false });
    }
    
    // Responsive image loading
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Viewport meta tag adjustment for iOS - allow scrolling
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=no';
        }
    }
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Preload critical resources
    function preloadResource(href, as, type) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (type) link.type = type;
        document.head.appendChild(link);
    }
    
    // Preload fonts
    preloadResource('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap', 'style');
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle resize events
            window.dispatchEvent(new Event('debouncedResize'));
        }, 250);
    });
    
    // Optimize scroll events with passive listeners
    window.addEventListener('scroll', function() {
        // Custom scroll logic here
    }, { passive: true });
    
    // Reduce reflows and repaints
    const elementsToOptimize = document.querySelectorAll('.service-card, .timeline-content, .testimonial-card');
    elementsToOptimize.forEach(element => {
        element.style.willChange = 'transform';
    });
    
    // Clean up will-change after animations
    setTimeout(() => {
        elementsToOptimize.forEach(element => {
            element.style.willChange = 'auto';
        });
    }, 5000);
}

// Utility functions
const utils = {
    // Throttle function
    throttle: function(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function(...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    },
    
    // Debounce function
    debounce: function(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export utilities for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
} 