// Royal Dreams Inc. - Premium Video Production Company
// JavaScript for Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initPortfolioFilters();
    initBackToTop();
    initFormValidation();
    initLightbox();
    initRevealAnimations();
    initPreloader();
    initCustomCursor();
    initSmoothScroll();
    initVideoBackgrounds();
    initTestimonialSlider();
    initAccordion();
    initCookieConsent();
    initCounterAnimation();
    initProjectOverlays();
});

// --------------------------
// NAVIGATION & HEADER
// --------------------------

function initNavigation() {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    // Handle mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
    
    // Add active class to current nav item
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu after clicking a link
            navMenu.classList.remove('show');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // Change header style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Set active nav item based on scroll position
    window.addEventListener('scroll', debounce(highlightNavOnScroll));
    highlightNavOnScroll(); // Call once on load
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 100;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
}

// --------------------------
// SCROLL EFFECTS
// --------------------------

function initScrollEffects() {
    // Parallax effect for background images
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', debounce(function() {
            parallaxElements.forEach(element => {
                const scrollPosition = window.pageYOffset;
                const speed = element.dataset.speed || 0.5;
                element.style.backgroundPositionY = `${scrollPosition * speed}px`;
            });
        }));
    }
    
    // Add shimmer effect to headers that don't have it yet
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach(heading => {
        if (heading.closest('#hero, #call-to-action, #testimonial, #process')) {
            if (!heading.classList.contains('shimmer-text')) {
                heading.classList.add('shimmer-text');
            }
        }
    });
}

// --------------------------
// PORTFOLIO FILTERING
// --------------------------

function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        // Add click event to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Click first filter button to initialize the view
        if (filterButtons.length > 0) {
            filterButtons[0].click();
        }
    }
}

// --------------------------
// PROJECT OVERLAYS
// --------------------------

function initProjectOverlays() {
    const projects = document.querySelectorAll('.project');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add hover effects to projects in featured work section
    if (projects.length > 0) {
        projects.forEach(project => {
            // Check if project image has proper container
            const img = project.querySelector('img');
            if (img && !img.closest('.project-image')) {
                // Create project image container
                const projectImage = document.createElement('div');
                projectImage.className = 'project-image';
                
                // Create project overlay
                const projectOverlay = document.createElement('div');
                projectOverlay.className = 'project-overlay';
                
                // Create play button
                const playBtn = document.createElement('a');
                playBtn.className = 'play-btn';
                playBtn.href = '#';
                playBtn.textContent = 'Play Video';
                
                // Add play button to overlay
                projectOverlay.appendChild(playBtn);
                
                // Wrap image in container and add overlay
                img.parentNode.insertBefore(projectImage, img);
                projectImage.appendChild(img);
                projectImage.appendChild(projectOverlay);
                
                // Add click event to play button
                playBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Here you would typically trigger a video modal
                    alert('Video would play here in production');
                });
            }
        });
    }
    
    // Add hover effects to portfolio items
    if (portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            const img = item.querySelector('img');
            if (img && !img.closest('.portfolio-image')) {
                // Create portfolio image container
                const portfolioImage = document.createElement('div');
                portfolioImage.className = 'portfolio-image';
                
                // Create portfolio overlay
                const portfolioOverlay = document.createElement('div');
                portfolioOverlay.className = 'portfolio-overlay';
                
                // Create view video button
                const viewVideo = document.createElement('a');
                viewVideo.className = 'view-video';
                viewVideo.href = '#';
                viewVideo.textContent = 'Watch Video';
                
                // Add view video button to overlay
                portfolioOverlay.appendChild(viewVideo);
                
                // Wrap image in container and add overlay
                img.parentNode.insertBefore(portfolioImage, img);
                portfolioImage.appendChild(img);
                portfolioImage.appendChild(portfolioOverlay);
                
                // Add click event to view video button
                viewVideo.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Here you would typically trigger a video modal
                    alert('Video would play here in production');
                });
            }
        });
    }
}

// --------------------------
// TESTIMONIAL SLIDER
// --------------------------

function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        
        // Initialize first slide
        if (slides.length > 0) {
            slides[0].classList.add('active');
        }
        
        // Add functionality to prev button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                showSlide(currentSlide - 1);
            });
        }
        
        // Add functionality to next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                showSlide(currentSlide + 1);
            });
        }
        
        // Add functionality to dots
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    showSlide(index);
                });
            });
        }
        
        // Show specific slide
        function showSlide(n) {
            // Handle loop around
            if (n >= slides.length) {
                currentSlide = 0;
            } else if (n < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = n;
            }
            
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show current slide and activate dot
            slides[currentSlide].classList.add('active');
            if (dots.length > 0) {
                dots[currentSlide].classList.add('active');
            }
        }
        
        // Auto-advance every 5 seconds
        if (slides.length > 1) {
            setInterval(function() {
                showSlide(currentSlide + 1);
            }, 5000);
        }
    }
}

// --------------------------
// ACCORDION
// --------------------------

function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            header.addEventListener('click', function() {
                // Toggle active class
                this.classList.toggle('active');
                
                // Toggle content visibility
                content.classList.toggle('active');
                
                // Close other accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.accordion-header').classList.remove('active');
                        otherItem.querySelector('.accordion-content').classList.remove('active');
                    }
                });
            });
        });
    }
}

// --------------------------
// COUNTER ANIMATION
// --------------------------

function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                rect.bottom >= 0
            );
        }
        
        // Animate counter
        function animateCounter(counter, target) {
            let count = 0;
            const speed = 2000 / target; // Adjust for smoother animation
            
            const updateCount = () => {
                if (count < target) {
                    count++;
                    counter.textContent = count;
                    setTimeout(updateCount, speed);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCount();
        }
        
        // Check if counters are in viewport and animate
        function checkCounters() {
            stats.forEach(stat => {
                if (isInViewport(stat) && !stat.classList.contains('counted')) {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                    stat.classList.add('counted');
                }
            });
        }
        
        // Check on scroll
        window.addEventListener('scroll', debounce(checkCounters));
        
        // Check once on load
        checkCounters();
    }
}

// --------------------------
// BACK TO TOP BUTTON
// --------------------------

function initBackToTop() {
    const backToTopButton = document.querySelector('#back-to-top');
    
    if (!backToTopButton) {
        return;
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --------------------------
// FORM VALIDATION
// --------------------------

function initFormValidation() {
    const contactForm = document.querySelector('#contact-form form');
    
    if (contactForm) {
        // Add form success message div if it doesn't exist
        if (!document.querySelector('.form-success')) {
            const formSuccess = document.createElement('div');
            formSuccess.className = 'form-success';
            formSuccess.innerHTML = '<p>Thank you! Your message has been sent successfully. We will contact you shortly.</p>';
            contactForm.appendChild(formSuccess);
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form fields
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea, select');
            
            formInputs.forEach(input => {
                if (input.required && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMessage = input.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'This field is required';
                        input.parentNode.insertBefore(errorMessage, input.nextSibling);
                    }
                    errorMessage.classList.add('show');
                    
                } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMessage = input.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Please enter a valid email address';
                        input.parentNode.insertBefore(errorMessage, input.nextSibling);
                    }
                    errorMessage.classList.add('show');
                    
                } else {
                    input.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMessage = input.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.classList.remove('show');
                    }
                }
            });
            
            // If form is valid, show success message
            if (isValid) {
                // In a real site, you would submit the form data to a server here
                
                // Show success message
                const formSuccess = document.querySelector('.form-success');
                formSuccess.classList.add('show');
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    formSuccess.classList.remove('show');
                }, 3000);
            }
        });
        
        // Validate email format
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // Live validation on input fields
        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', function() {
                if (this.required && !this.value.trim()) {
                    this.classList.add('error');
                    
                    // Add error message
                    let errorMessage = this.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'This field is required';
                        this.parentNode.insertBefore(errorMessage, this.nextSibling);
                    }
                    errorMessage.classList.add('show');
                    
                } else if (this.type === 'email' && this.value && !validateEmail(this.value)) {
                    this.classList.add('error');
                    
                    // Add error message
                    let errorMessage = this.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Please enter a valid email address';
                        this.parentNode.insertBefore(errorMessage, this.nextSibling);
                    }
                    errorMessage.classList.add('show');
                    
                } else {
                    this.classList.remove('error');
                    
                    // Remove error message
                    const errorMessage = this.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.classList.remove('show');
                    }
                }
            });
            
            // Clear error on focus
            field.addEventListener('focus', function() {
                this.classList.remove('error');
                
                // Remove error message
                const errorMessage = this.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.classList.remove('show');
                }
            });
        });
    }
}

// --------------------------
// LIGHTBOX FOR PORTFOLIO
// --------------------------

function initLightbox() {
    // Create lightbox elements if they don't exist
    if (!document.querySelector('.lightbox-overlay')) {
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';
        
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        
        const lightboxImage = document.createElement('img');
        lightboxContent.appendChild(lightboxImage);
        
        const lightboxClose = document.createElement('div');
        lightboxClose.className = 'lightbox-close';
        lightboxClose.innerHTML = '&times;';
        
        lightboxOverlay.appendChild(lightboxContent);
        lightboxOverlay.appendChild(lightboxClose);
        document.body.appendChild(lightboxOverlay);
    }
    
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxImage = lightboxContent.querySelector('img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Add click event to project and portfolio images
    const projectImages = document.querySelectorAll('.project img, .portfolio-item img');
    
    projectImages.forEach(image => {
        image.addEventListener('click', function(e) {
            // Don't trigger lightbox if clicking on an image inside a link
            if (e.target.closest('a') && !e.target.closest('a').classList.contains('view-project')) {
                return;
            }
            
            e.preventDefault();
            lightboxImage.src = this.src;
            lightboxOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox when clicking the close button or outside the image
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
    
    // Close with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// --------------------------
// SCROLL REVEAL ANIMATIONS
// --------------------------

function initRevealAnimations() {
    // Add reveal class to elements that should animate on scroll
    const revealElements = document.querySelectorAll(
        'section > h2, .project, .service-item, .process-step, ' + 
        '#contact-info, #contact-form, .portfolio-item, .blog-post, ' + 
        '.team-member, .award, .client-logo, .stat-item'
    );
    
    revealElements.forEach(element => {
        if (!element.classList.contains('reveal')) {
            element.classList.add('reveal');
        }
    });
    
    // Add dramatic reveal for special elements
    const dramaticElements = document.querySelectorAll(
        '#hero h1, #hero p, #hero .cta-buttons, ' + 
        '#testimonial blockquote, #call-to-action h2, #call-to-action p'
    );
    
    dramaticElements.forEach(element => {
        if (!element.classList.contains('reveal-dramatic')) {
            element.classList.add('reveal-dramatic');
        }
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Reveal elements in viewport
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal, .reveal-dramatic');
        reveals.forEach(reveal => {
            if (isInViewport(reveal)) {
                reveal.classList.add('active');
            }
        });
    }
    
    // Call once on load and then on scroll
    revealOnScroll();
    window.addEventListener('scroll', debounce(revealOnScroll, 15));
}

// --------------------------
// PRELOADER
// --------------------------

function initPreloader() {
    // Create preloader if it doesn't exist
    if (!document.querySelector('.preloader')) {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        
        const loader = document.createElement('div');
        loader.className = 'loader';
        
        preloader.appendChild(loader);
        document.body.appendChild(preloader);
    }
    
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            document.body.style.overflow = '';
        }, 800);
    });
    
    // Hide preloader after 3 seconds (fallback)
    setTimeout(function() {
        preloader.classList.add('fade-out');
        document.body.style.overflow = '';
    }, 3000);
}

// --------------------------
// CUSTOM CURSOR
// --------------------------

function initCustomCursor() {
    // Check if we're on a touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return; // Skip on touch devices
    }
    
    // Create custom cursor if it doesn't exist
    if (!document.querySelector('.custom-cursor')) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        // Add CSS if not already in stylesheet
        if (!document.querySelector('style.custom-cursor-style')) {
            const style = document.createElement('style');
            style.className = 'custom-cursor-style';
            style.textContent = `
                .custom-cursor {
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    border: 2px solid var(--accent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    transition: width 0.3s, height 0.3s, background-color 0.3s;
                }
                .custom-cursor.expand {
                    width: 40px;
                    height: 40px;
                    background-color: rgba(217, 165, 92, 0.2);
                }
                body:hover .custom-cursor {
                    opacity: 1;
                }
                body .custom-cursor {
                    opacity: 0;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    const cursor = document.querySelector('.custom-cursor');
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .project, .portfolio-item, .process-step, input, textarea, ' +
        'select, .service-item, .team-member, .blog-post, .accordion-header'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('expand');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('expand');
        });
    });
    
    // Show cursor only when mouse is over the document
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
}

// --------------------------
// SMOOTH SCROLL
// --------------------------

function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// --------------------------
// VIDEO BACKGROUNDS
// --------------------------

function initVideoBackgrounds() {
    // Check if hero section has a video background element but no video
    const videoBackground = document.querySelector('.video-background');
    
    if (videoBackground && !videoBackground.querySelector('video')) {
        // Create video element
        const video = document.createElement('video');
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Add source (in production, replace with actual video path)
        const source = document.createElement('source');
        source.src = 'videos/showreel-background.mp4';
        source.type = 'video/mp4';
        
        // Add to DOM
        video.appendChild(source);
        videoBackground.appendChild(video);
    }
}

// --------------------------
// COOKIE CONSENT
// --------------------------

function initCookieConsent() {
    // Check if cookie consent already exists
    if (!document.querySelector('.cookie-banner')) {
        // Create cookie consent banner
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.</p>
                <div class="cookie-buttons">
                    <button id="cookie-accept" class="cookie-btn accept">Accept</button>
                    <button id="cookie-settings" class="cookie-btn settings">Cookie Settings</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(cookieBanner);
    }
    
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const settingsBtn = document.getElementById('cookie-settings');
    
    // Check if cookie consent has been accepted
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Accept button click
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            // Set consent in localStorage
            localStorage.setItem('cookieConsent', 'accepted');
            
            // Hide banner
            cookieBanner.classList.remove('show');
        });
    }
    
    // Settings button click
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            // In a real site, this would open cookie settings modal
            alert('Cookie settings would open here in production');
        });
    }
}

// --------------------------
// UTILITY FUNCTIONS
// --------------------------

// Debounce function for scroll events
function debounce(func, wait = 15, immediate = true) {
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

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get all siblings of an element
function getSiblings(element) {
    return Array.from(element.parentNode.children).filter(sibling => sibling !== element);
}

// Detect when animations end
function whichAnimationEvent() {
    const el = document.createElement('div');
    const animations = {
        'animation': 'animationend',
        'OAnimation': 'oAnimationEnd',
        'MozAnimation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd'
    };

    for (let a in animations) {
        if (el.style[a] !== undefined) {
            return animations[a];
        }
    }
    
    return 'animationend'; // Default
}

// Generate unique ID
function generateUniqueId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Check if an element has a specific class
function hasClass(element, className) {
    return element.classList.contains(className);
}

// Add class to element
function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.classList.add(className);
    }
}

// Remove class from element
function removeClass(element, className) {
    if (hasClass(element, className)) {
        element.classList.remove(className);
    }
}

// Toggle class on element
function toggleClass(element, className) {
    element.classList.toggle(className);
}

// Get browser info for better compatibility
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName;
    let browserVersion;
    
    // Extract browser name and version
    if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
        browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
        browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
        browserName = "edge";
    } else {
        browserName = "unknown";
    }
    
    // Add specific browser class to body
    document.body.classList.add(`browser-${browserName}`);
    
    return {
        name: browserName,
        userAgent: userAgent
    };
}

// Set cookies with expiration
function setCookie(name, value, days) {
    let expires = "";
    
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    
    return null;
}

// Erase cookie
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Lazy load images (modern browsers)
function lazyLoadImages() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Target elements with the class 'lazy'
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        const lazyImages = document.querySelectorAll('img.lazy');
        
        const lazyLoad = function() {
            let active = false;
            
            if (active === false) {
                active = true;
                
                setTimeout(function() {
                    lazyImages.forEach(img => {
                        if ((img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) && getComputedStyle(img).display !== "none") {
                            const src = img.getAttribute('data-src');
                            
                            if (src) {
                                img.src = src;
                                img.removeAttribute('data-src');
                            }
                            
                            img.classList.remove('lazy');
                            
                            if (lazyImages.length === 0) {
                                document.removeEventListener('scroll', lazyLoad);
                                window.removeEventListener('resize', lazyLoad);
                                window.removeEventListener('orientationchange', lazyLoad);
                            }
                        }
                    });
                    
                    active = false;
                }, 200);
            }
        };
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
        lazyLoad();
    }
}

// Initialize browser detection
getBrowserInfo();