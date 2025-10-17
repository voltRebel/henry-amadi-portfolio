// Portfolio Website JavaScript
// Modern ES6+ features with fallbacks for older browsers

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initTheme();
        this.initCursor();
        this.initTypingAnimation();
        this.initScrollAnimations();
        this.initSkillBars();
        this.initCounters();
        this.initSmoothScrolling();
        this.initMobileMenu();
        this.initFormHandling();
        this.initProjectModals();
        this.initTestimonialCarousel();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // CV Download buttons
        const downloadCvBtn = document.getElementById('download-cv-btn');
        const footerDownloadCvBtn = document.getElementById('footer-download-cv');
        
        if (downloadCvBtn) {
            downloadCvBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadCV();
            });
        }
        
        if (footerDownloadCvBtn) {
            footerDownloadCvBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadCV();
            });
        }

        // Job type toggle
        const jobTypeToggle = document.getElementById('job-type-toggle');
        if (jobTypeToggle) {
            jobTypeToggle.addEventListener('change', () => this.toggleJobType());
        }

        // FAQ dropdowns
        this.initFAQDropdowns();

        // Hero navigation icons
        this.initHeroNavIcons();

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());

        // Scroll handler for navbar
        window.addEventListener('scroll', () => this.handleScroll());
    }

    // Theme Management
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    // Animated Cursor
    initCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (!cursor || !cursorFollower) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor animation
        const animateCursor = () => {
            // Direct cursor follows mouse immediately
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // Follower cursor has delay
            followerX += (mouseX - followerX) * 0.05;
            followerY += (mouseY - followerY) * 0.05;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
    }

    // Typing Animation
    initTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = ['Software Engineer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeText = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next word
            }

            setTimeout(typeText, typeSpeed);
        };

        typeText();
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .project-card, .skill-category, .timeline-item, .stat-item');
        animatedElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // Skill Bars Animation
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    progressBar.style.width = width;
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Counter Animation
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        // Check if this is a percentage or has a suffix
        const parentCard = element.closest('.stat-card');
        const label = parentCard ? parentCard.querySelector('.stat-label').textContent : '';
        const isPercentage = label.includes('Resolution Rate') || label.includes('Satisfaction Score');
        const hasPlus = label.includes('Tickets Resolved');

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                let displayValue = Math.floor(current);
                if (isPercentage) {
                    displayValue += '%';
                } else if (hasPlus) {
                    displayValue += '+';
                }
                element.textContent = displayValue;
                requestAnimationFrame(updateCounter);
            } else {
                let finalValue = target;
                if (isPercentage) {
                    finalValue += '%';
                } else if (hasPlus) {
                    finalValue += '+';
                }
                element.textContent = finalValue;
            }
        };

        updateCounter();
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    this.updateActiveNavLink(targetId);
                }
            });
        });
    }

    updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // Mobile Menu
    initMobileMenu() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
    }

    toggleMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
        }
    }

    toggleJobType() {
        const toggle = document.getElementById('job-type-toggle');
        const toggleLabels = document.querySelectorAll('.job-type-toggle .toggle-label');
        
        if (toggle && toggleLabels.length >= 2) {
            if (toggle.checked) {
                // Entry Level selected
                toggleLabels[0].style.opacity = '0.6';
                toggleLabels[1].style.opacity = '1';
            } else {
                // Graduate Scheme selected
                toggleLabels[0].style.opacity = '1';
                toggleLabels[1].style.opacity = '0.6';
            }
        }
    }

    initFAQDropdowns() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current FAQ item
                    item.classList.toggle('active');
                });
            }
        });
    }

    // Hero Navigation Icons
    initHeroNavIcons() {
        // Scroll down button
        const scrollDownBtn = document.getElementById('scroll-down-btn');
        if (scrollDownBtn) {
            scrollDownBtn.addEventListener('click', () => {
                this.scrollToNextSection();
            });
        }

        // Search button
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.toggleSearchModal();
            });
        }

        // Hero menu button
        const heroMenuBtn = document.getElementById('hero-menu-btn');
        if (heroMenuBtn) {
            heroMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    scrollToNextSection() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    toggleSearchModal() {
        // Create search modal if it doesn't exist
        let searchModal = document.getElementById('search-modal');
        if (!searchModal) {
            searchModal = this.createSearchModal();
            document.body.appendChild(searchModal);
        }
        
        // Toggle modal visibility
        if (searchModal.style.display === 'block') {
            searchModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            searchModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // Focus on search input
            const searchInput = searchModal.querySelector('#search-input');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        }
    }

    createSearchModal() {
        const modal = document.createElement('div');
        modal.id = 'search-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
        `;
        
        modal.innerHTML = `
            <div style="background: var(--bg-secondary); padding: 2rem; border-radius: 1rem; width: 90%; max-width: 500px; position: relative;">
                <button id="close-search" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-primary); font-size: 1.5rem; cursor: pointer;">&times;</button>
                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Search Portfolio</h3>
                <input type="text" id="search-input" placeholder="Search for skills, projects, or content..." style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem; background: var(--bg-primary); color: var(--text-primary); font-size: 1rem;">
                <div id="search-results" style="margin-top: 1rem; color: var(--text-secondary);"></div>
            </div>
        `;
        
        // Add close functionality
        const closeBtn = modal.querySelector('#close-search');
        const searchInput = modal.querySelector('#search-input');
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Add search functionality
        searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value, modal.querySelector('#search-results'));
        });
        
        return modal;
    }

    performSearch(query, resultsContainer) {
        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }
        
        const searchableContent = [
            { text: 'Data Analysis', type: 'Skill', section: 'Services' },
            { text: 'IT Support', type: 'Skill', section: 'Services' },
            { text: 'Python Programming', type: 'Skill', section: 'Tech Stack' },
            { text: 'SQL Database', type: 'Skill', section: 'Tech Stack' },
            { text: 'Flutter Job Getter', type: 'Project', section: 'Selected Work' },
            { text: 'Android Plant Care', type: 'Project', section: 'Selected Work' },
            { text: 'Supermarket Website', type: 'Project', section: 'Selected Work' },
            { text: 'Customer Service', type: 'Experience', section: 'Biography' },
            { text: 'Microsoft 365', type: 'Skill', section: 'Tech Stack' },
            { text: 'JavaScript', type: 'Skill', section: 'Tech Stack' }
        ];
        
        const matches = searchableContent.filter(item => 
            item.text.toLowerCase().includes(query.toLowerCase())
        );
        
        if (matches.length > 0) {
            resultsContainer.innerHTML = matches.map(match => 
                `<div style="padding: 0.5rem; border-bottom: 1px solid var(--border-color);">
                    <strong style="color: var(--primary-color);">${match.text}</strong>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;"> - ${match.type} in ${match.section}</span>
                </div>`
            ).join('');
        } else {
            resultsContainer.innerHTML = '<div style="color: var(--text-secondary);">No results found</div>';
        }
    }

    // Form Handling
    initFormHandling() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
    }

    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const formStatus = document.getElementById('form-status');
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(formData);
            
            // Success
            this.showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
            form.reset();
        } catch (error) {
            // Error
            this.showFormStatus('error', 'Sorry, there was an error sending your message. Please try again.');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.1 ? resolve() : reject();
            }, 2000);
        });
    }

    showFormStatus(type, message) {
        const formStatus = document.getElementById('form-status');
        if (formStatus) {
            formStatus.className = `form-status ${type}`;
            formStatus.textContent = message;
            formStatus.style.display = 'block';
            
            // Hide after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    // Project Modals
    initProjectModals() {
        const projectCards = document.querySelectorAll('.project-card');
        const modal = document.getElementById('project-modal');
        const modalClose = document.getElementById('modal-close');
        const modalBody = document.getElementById('modal-body');

        if (!modal || !modalClose || !modalBody) return;

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectTitle = card.querySelector('h3').textContent;
                const projectDescription = card.querySelector('p').textContent;
                const projectTech = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
                
                this.showProjectModal(projectTitle, projectDescription, projectTech);
            });
        });

        modalClose.addEventListener('click', () => {
            this.closeProjectModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closeProjectModal();
            }
        });
    }

    showProjectModal(title, description, tech) {
        const modal = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = `
            <div class="project-modal-content">
                <h2>${title}</h2>
                <p class="project-modal-description">${description}</p>
                
                <div class="project-modal-tech">
                    <h3>Technologies Used:</h3>
                    <div class="tech-tags">
                        ${tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-modal-features">
                    <h3>Key Features:</h3>
                    <ul>
                        <li>Responsive design for all devices</li>
                        <li>Modern UI/UX with smooth animations</li>
                        <li>Optimized performance and loading times</li>
                        <li>Clean, maintainable code structure</li>
                    </ul>
                </div>
                
                <div class="project-modal-links">
                    <a href="#" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        View Live Demo
                    </a>
                    <a href="#" class="btn btn-secondary">
                        <i class="fab fa-github"></i>
                        View Source Code
                    </a>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeProjectModal() {
        const modal = document.getElementById('project-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Testimonial Carousel
    initTestimonialCarousel() {
        this.currentTestimonial = 0;
        this.testimonialSlides = document.querySelectorAll('.testimonial-slide');
        this.testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
        
        if (this.testimonialSlides.length === 0) return;

        // Add click handlers to dots
        this.testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showTestimonial(index);
            });
        });

        // Auto-rotate testimonials every 5 seconds
        this.startTestimonialAutoRotate();
    }

    showTestimonial(index) {
        // Remove active class from all slides and dots
        this.testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        this.testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Add active class to current slide and dot
        if (this.testimonialSlides[index]) {
            this.testimonialSlides[index].classList.add('active');
        }
        
        if (this.testimonialDots[index]) {
            this.testimonialDots[index].classList.add('active');
        }

        this.currentTestimonial = index;
    }

    startTestimonialAutoRotate() {
        setInterval(() => {
            const nextIndex = (this.currentTestimonial + 1) % this.testimonialSlides.length;
            this.showTestimonial(nextIndex);
        }, 5000); // Change every 5 seconds
    }

    // Scroll Handler
    handleScroll() {
        const navbar = document.getElementById('navbar');
        const scrollY = window.scrollY;
        
        if (navbar) {
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Update active nav link based on scroll position
        this.updateActiveNavOnScroll();
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // CV Download Function
    downloadCV() {
        const cvPath = 'assets/cv/henry-cv.pdf';
        const fileName = 'HENRY AMADI CV.pdf';
        
        // Create a temporary anchor element for download
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = fileName;
        link.style.display = 'none';
        
        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        this.showDownloadMessage('CV downloaded successfully!');
    }

    // Show download success message
    showDownloadMessage(message) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Window Resize Handler
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
        
        // Reinitialize cursor on resize
        if (window.innerWidth > 768) {
            this.initCursor();
        }
    }
}

// Utility Functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
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
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
};

// Initialize Portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('js/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Biography Download CV button functionality
document.addEventListener('DOMContentLoaded', function() {
    const biographyDownloadBtn = document.getElementById('biography-download-cv');
    if (biographyDownloadBtn) {
        biographyDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Create portfolio instance to access downloadCV method
            const portfolio = new Portfolio();
            portfolio.downloadCV();
        });
    }
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, utils };
}
