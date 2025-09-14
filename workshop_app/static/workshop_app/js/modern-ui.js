    /**
     * Modern Interactions and Animations for Workshop Booking System
     * Enhanced UX with smooth transitions and interactive elements
     */

    document.addEventListener('DOMContentLoaded', function() {
        'use strict';

        // Initialize all modern interactions
        initScrollAnimations();
        initParallaxEffects();
        initFormEnhancements();
        initTableInteractions();
        initButtonAnimations();
        initLoadingStates();
        initMobileOptimizations();
        initAccessibilityFeatures();
    });

    /**
     * Scroll-triggered animations
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe cards, tables, and other content elements
        document.querySelectorAll('.card, .table, .alert, .btn').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Parallax effects for background elements
     */
    function initParallaxEffects() {
        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-bg');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
    }

    /**
     * Enhanced form interactions
     */
    function initFormEnhancements() {
        // Floating labels effect
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('.form-control');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Add floating label class
                label.classList.add('floating-label');
                
                // Handle focus events
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                    input.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        group.classList.remove('focused');
                        input.classList.remove('focused');
                    }
                });
                
                // Check if input has value on load
                if (input.value) {
                    group.classList.add('focused');
                    input.classList.add('focused');
                }
            }
        });

        // Form validation with real-time feedback
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('.form-control');
            
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    validateField(input);
                });
                
                input.addEventListener('blur', () => {
                    validateField(input);
                });
            });
        });
    }

    /**
     * Validate individual form field
     */
    function validateField(input) {
        const value = input.value.trim();
        const fieldGroup = input.closest('.form-group');
        
        // Remove existing validation classes
        fieldGroup.classList.remove('has-success', 'has-error');
        input.classList.remove('is-valid', 'is-invalid');
        
        // Remove existing feedback
        const existingFeedback = fieldGroup.querySelector('.validation-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        if (value) {
            // Basic validation
            let isValid = true;
            let message = '';
            
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                message = isValid ? 'Valid email address' : 'Please enter a valid email address';
            } else if (input.required && value.length < 3) {
                isValid = false;
                message = 'This field must be at least 3 characters long';
            } else if (input.required) {
                message = 'Looks good!';
            }
            
            // Apply validation styling
            if (isValid) {
                fieldGroup.classList.add('has-success');
                input.classList.add('is-valid');
            } else {
                fieldGroup.classList.add('has-error');
                input.classList.add('is-invalid');
            }
            
            // Add feedback message
            if (message) {
                const feedback = document.createElement('div');
                feedback.className = `validation-feedback ${isValid ? 'valid-feedback' : 'invalid-feedback'}`;
                feedback.textContent = message;
                fieldGroup.appendChild(feedback);
            }
        }
    }

    /**
     * Enhanced table interactions
     */
    function initTableInteractions() {
        const tables = document.querySelectorAll('.table');
        
        tables.forEach(table => {
            // Add hover effects to rows
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.addEventListener('mouseenter', () => {
                    row.style.transform = 'scale(1.02)';
                    row.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                });
                
                row.addEventListener('mouseleave', () => {
                    row.style.transform = 'scale(1)';
                    row.style.boxShadow = 'none';
                });
            });
            
            // Add click effects to buttons in table
            const buttons = table.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    // Create ripple effect
                    createRippleEffect(e, button);
                });
            });
        });
    }

    /**
     * Enhanced button animations
     */
    function initButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add click animation
            button.addEventListener('click', (e) => {
                createRippleEffect(e, button);
            });
            
            // Add loading state for form submissions
            if (button.type === 'submit') {
                button.addEventListener('click', () => {
                    if (button.closest('form').checkValidity()) {
                        showButtonLoading(button);
                    }
                });
            }
        });
    }

    /**
     * Create ripple effect on button click
     */
    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * Show loading state on button
     */
    function showButtonLoading(button) {
        const originalText = button.textContent;
        button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Loading...';
        button.disabled = true;
        
        // Re-enable after 3 seconds (adjust based on your needs)
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);
    }

    /**
     * Loading states for async operations
     */
    function initLoadingStates() {
        // Add loading overlay for AJAX requests
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        
        // Show/hide loading overlay
        window.showLoading = () => {
            loadingOverlay.style.display = 'flex';
        };
        
        window.hideLoading = () => {
            loadingOverlay.style.display = 'none';
        };
    }

    /**
     * Mobile-specific optimizations
     */
    function initMobileOptimizations() {
        // Touch-friendly interactions
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Add touch feedback to interactive elements
            const touchElements = document.querySelectorAll('.btn, .nav-link, .dropdown-item');
            touchElements.forEach(element => {
                element.addEventListener('touchstart', () => {
                    element.classList.add('touch-active');
                });
                
                element.addEventListener('touchend', () => {
                    setTimeout(() => {
                        element.classList.remove('touch-active');
                    }, 150);
                });
            });
        }
        
        // Optimize viewport for mobile
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
    }

    /**
     * Accessibility enhancements
     */
    function initAccessibilityFeatures() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Add focus indicators
        const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focus-visible');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('focus-visible');
            });
        });
        
        // Announce dynamic content changes
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        
        window.announce = (message) => {
            announcer.textContent = message;
        };
    }

    /**
     * Utility functions
     */

    // Debounce function for performance optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Smooth scroll to element
    function smoothScrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add CSS for ripple effect and other dynamic styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            backdrop-filter: blur(5px);
        }
        
        .loading-spinner {
            text-align: center;
            color: white;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .touch-active {
            transform: scale(0.95);
            opacity: 0.8;
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid #4facfe;
            outline-offset: 2px;
        }
        
        .focus-visible {
            outline: 2px solid #4facfe;
            outline-offset: 2px;
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        .floating-label {
            position: relative;
            transition: all 0.3s ease;
        }
        
        .form-group.focused .floating-label {
            transform: translateY(-20px) scale(0.85);
            color: #4facfe;
        }
        
        .validation-feedback {
            display: block;
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875rem;
            animation: fadeInUp 0.3s ease;
        }
        
        .valid-feedback {
            color: #43e97b;
        }
        
        .invalid-feedback {
            color: #ff6b6b;
        }
        
        .has-success .form-control {
            border-color: #43e97b;
            box-shadow: 0 0 0 0.2rem rgba(67, 233, 123, 0.25);
        }
        
        .has-error .form-control {
            border-color: #ff6b6b;
            box-shadow: 0 0 0 0.2rem rgba(255, 107, 107, 0.25);
        }
    `;
    document.head.appendChild(style);
