// Theme Management Module
class ThemeManager {
    constructor() {
        this.body = document.body;
        this.themeToggle = document.getElementById("theme-toggle");
        this.sunIcon = document.querySelector('.fa-sun');
        this.moonIcon = document.querySelector('.fa-moon');
        
        console.log('ThemeManager initialized:', {
            themeToggle: this.themeToggle,
            sunIcon: this.sunIcon,
            moonIcon: this.moonIcon
        });
    }

    init() {
        // First ensure elements exist
        if (!this.themeToggle) {
            console.warn('Theme toggle button not found');
            return;
        }

        // Check local storage for theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.setDarkMode();
        } else {
            this.setLightMode();
        }

        // Attach event listener to toggle button
        this.themeToggle.addEventListener("click", () => this.toggleTheme());
        
        // Make sure the theme toggle is visible
        this.themeToggle.style.display = 'block';
    }

    setDarkMode() {
        document.body.classList.add("has-background-dark");
        document.body.classList.remove("has-background-light");
        document.body.classList.add("dark-mode");
        
        if (this.sunIcon) this.sunIcon.style.display = "none";
        if (this.moonIcon) this.moonIcon.style.display = "block";
        localStorage.setItem("theme", "dark");
    }

    setLightMode() {
        document.body.classList.remove("has-background-dark");
        document.body.classList.add("has-background-light");
        document.body.classList.remove("dark-mode");
        
        if (this.sunIcon) this.sunIcon.style.display = "block";
        if (this.moonIcon) this.moonIcon.style.display = "none";
        localStorage.setItem("theme", "light");
    }

    toggleTheme() {
        if (document.body.classList.contains("has-background-dark")) {
            this.setLightMode();
        } else {
            this.setDarkMode();
        }
    }
}

// Scroll Management Module
class ScrollManager {
    constructor() {
        this.scrollToTopBtn = document.createElement('button');
        this.scrollToTopBtn.className = 'scroll-to-top';
        this.scrollToTopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
        this.scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(this.scrollToTopBtn);

        this.header = document.querySelector('header');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('a[href^="#"]');
        this.lastScrollTop = 0;
        this.scrollThreshold = 300;
        this.init();
    }

    init() {
        this.setupScrollHandling();
        this.setupSmoothScroll();
        this.setupIntersectionObserver();
    }

    setupScrollHandling() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        if (this.scrollToTopBtn) {
            this.scrollToTopBtn.addEventListener('click', this.scrollToTop.bind(this));
        }
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                const targetSection = document.querySelector(targetId);
                if (!targetSection) return;

                // Close mobile menu if open
                if (this.mobileMenu && this.mobileMenu.classList.contains('open')) {
                    document.querySelector('.hamburger')?.click();
                }

                const headerOffset = this.header ? this.header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without triggering scroll
                history.pushState(null, '', targetId);
            });
        });
    }

    setupIntersectionObserver() {
        const options = {
            rootMargin: '-20% 0px -80% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(id);
                }
            });
        }, options);

        this.sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Handle scroll button visibility
        if (this.scrollToTopBtn) {
            if (scrollTop > this.scrollThreshold) {
                this.scrollToTopBtn.classList.add('show');
            } else {
                this.scrollToTopBtn.classList.remove('show');
            }
        }

        // Handle sticky header
        if (this.header) {
            if (scrollTop > 0) {
                this.header.classList.add('sticky');
            } else {
                this.header.classList.remove('sticky');
            }

            // Hide/show header based on scroll direction
            if (scrollTop > this.lastScrollTop && scrollTop > this.header.offsetHeight) {
                this.header.classList.add('header-hidden');
            } else {
                this.header.classList.remove('header-hidden');
            }
        }

        this.lastScrollTop = scrollTop;
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Form Management Module
const FormManager = {
    init() {
        this.form = document.querySelector('.contact-form');
        this.formGroups = this.form.querySelectorAll('.form-group');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        
        this.setupEventListeners();
    },

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) return;

        try {
            await this.submitForm();
        } catch (error) {
            this.handleError(error);
        }
    },

    validateForm() {
        let isValid = true;
        this.clearErrors();

        this.formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (!input.value.trim()) {
                isValid = false;
                this.showError(input, 'This field is required');
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                isValid = false;
                this.showError(input, 'Please enter a valid email address');
            }
        });

        return isValid;
    },

    async submitForm() {
        this.setLoadingState(true);

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        const response = await fetch('https://formspree.io/f/your-formspree-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        this.showSuccess('Message sent successfully!');
        this.form.reset();
    },

    setLoadingState(isLoading) {
        this.submitButton.disabled = isLoading;
        this.submitButton.textContent = isLoading ? 'Sending...' : 'Send Message';
        this.submitButton.classList.toggle('loading', isLoading);
    },

    showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorId = `${input.id}-error`;
        const error = document.getElementById(errorId) || document.createElement('div');
        
        error.id = errorId;
        error.className = 'error';
        error.textContent = message;
        error.setAttribute('role', 'alert');
        
        if (!document.getElementById(errorId)) {
            formGroup.appendChild(error);
        }
    },

    showSuccess(message) {
        const success = document.createElement('div');
        success.className = 'success';
        success.textContent = message;
        success.setAttribute('role', 'alert');
        this.form.insertBefore(success, this.submitButton);
        
        setTimeout(() => success.remove(), 3000);
    },

    clearErrors() {
        this.formGroups.forEach(group => {
            const error = group.querySelector('.error');
            if (error) error.remove();
        });
    },

    handleError(error) {
        console.error('Form submission error:', error);
        this.showError(this.submitButton, 'Failed to send message. Please try again.');
    },

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// Image Loading Module
class ImageLoader {
    constructor() {
        this.observer = null;
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
        }
    }

    observeImage(img) {
        if (this.observer) {
            this.observer.observe(img);
        }
    }
}

// Blog Management Module
const BlogManager = {
    init() {
        this.blogGrid = document.querySelector('.blog-grid');
        this.loadMoreButton = document.getElementById('load-more-posts');
        this.currentPage = 1;
        this.postsPerPage = 4;
        this.allPosts = [];
        
        this.setupEventListeners();
        this.loadInitialPosts();
    },

    setupEventListeners() {
        this.loadMoreButton.addEventListener('click', () => this.loadMorePosts());
        
        // Intersection Observer for fade-in animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        document.querySelectorAll('.blog-card').forEach(card => {
            observer.observe(card);
        });
    },

    async loadInitialPosts() {
        try {
            // In a real application, this would fetch from an API
            this.allPosts = this.getMockPosts();
            this.renderPosts(this.allPosts.slice(0, this.postsPerPage));
            this.updateLoadMoreButton();
        } catch (error) {
            console.error('Error loading initial posts:', error);
            this.showError('Failed to load blog posts. Please try again later.');
        }
    },

    async loadMorePosts() {
        try {
            this.currentPage++;
            const startIndex = (this.currentPage - 1) * this.postsPerPage;
            const endIndex = startIndex + this.postsPerPage;
            const newPosts = this.allPosts.slice(startIndex, endIndex);
            
            if (newPosts.length > 0) {
                this.renderPosts(newPosts, true);
                this.updateLoadMoreButton();
            } else {
                this.loadMoreButton.style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading more posts:', error);
            this.showError('Failed to load more posts. Please try again later.');
        }
    },

    renderPosts(posts, append = false) {
        if (!append) {
            this.blogGrid.innerHTML = '';
        }

        posts.forEach(post => {
            const card = this.createBlogCard(post);
            this.blogGrid.appendChild(card);
        });
    },

    createBlogCard(post) {
        const article = document.createElement('article');
        article.className = 'blog-card';
        
        article.innerHTML = `
            <div class="blog-card-content">
                <h3>${post.title}</h3>
                <p class="blog-date">${post.date}</p>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${post.url}" class="btn btn-primary" aria-label="Read ${post.title}">
                    Read More
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </a>
            </div>
        `;

        return article;
    },

    updateLoadMoreButton() {
        const remainingPosts = this.allPosts.length - (this.currentPage * this.postsPerPage);
        this.loadMoreButton.style.display = remainingPosts > 0 ? 'inline-flex' : 'none';
    },

    showError(message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.setAttribute('role', 'alert');
        this.blogGrid.insertBefore(error, this.loadMoreButton);
        
        setTimeout(() => error.remove(), 5000);
    },

    getMockPosts() {
        return [
            {
                title: "Mastering API Security: A Beginner's Guide",
                date: "March 28, 2024",
                excerpt: "Learn the fundamentals of API security, from authentication to rate limiting, and discover best practices for protecting your endpoints.",
                tags: ["Security", "API", "Web Development"],
                url: "#"
            },
            {
                title: "The Role of AI in Cybersecurity",
                date: "March 25, 2024",
                excerpt: "Explore how artificial intelligence is revolutionizing cybersecurity, from threat detection to automated response systems.",
                tags: ["AI", "Cybersecurity", "Technology"],
                url: "#"
            },
            {
                title: "From Poetry to Programming: My Journey into Tech",
                date: "March 20, 2024",
                excerpt: "A personal story about how my passion for creative writing led me to discover the intersection of art and technology.",
                tags: ["Personal", "Career", "Writing"],
                url: "#"
            },
            {
                title: "Scaling Web Apps: Performance & Security",
                date: "March 18, 2024",
                excerpt: "Discover strategies for building scalable web applications while maintaining robust security measures.",
                tags: ["Performance", "Security", "Web Development"],
                url: "#"
            },
            {
                title: "The Future of Cloud Security",
                date: "March 15, 2024",
                excerpt: "An exploration of emerging trends in cloud security and how they're shaping the future of digital infrastructure.",
                tags: ["Cloud", "Security", "Future Tech"],
                url: "#"
            },
            {
                title: "Building Resilient Systems",
                date: "March 12, 2024",
                excerpt: "Learn about the principles of system resilience and how to implement them in your applications.",
                tags: ["Architecture", "Resilience", "Best Practices"],
                url: "#"
            }
        ];
    }
};

// Project Management Module
class ProjectManager {
    constructor() {
        this.projects = [
            {
                id: 'poetry-network',
                title: 'Poetry Network',
                category: 'web',
                icon: 'fas fa-pen-fancy',
                description: 'A modern web application for poets to share and collaborate on their work.',
                features: [
                    'Real-time collaboration',
                    'AI-powered suggestions',
                    'Mood tracking',
                    'Community features'
                ],
                tech: [
                    { name: 'React', tooltip: 'Frontend Framework' },
                    { name: 'Node.js', tooltip: 'Backend Runtime' },
                    { name: 'MongoDB', tooltip: 'Database' },
                    { name: 'Socket.io', tooltip: 'Real-time Communication' }
                ],
                links: [
                    { text: 'View Demo', url: 'https://poetry-network-demo.com', icon: 'fas fa-external-link-alt' },
                    { text: 'Source Code', url: 'https://github.com/yourusername/poetry-network', icon: 'fab fa-github' }
                ],
                image: 'assets/images/poetry-network.jpg',
                caseStudy: {
                    challenge: 'Creating an engaging platform that combines traditional poetry with modern technology while maintaining a user-friendly experience.',
                    approach: 'Implemented AI-powered suggestions, designed a clean interface, built real-time collaboration features, and integrated mood tracking.',
                    outcome: 'Successfully launched a platform that helps poets connect and create, leveraging AI to enhance the creative process.',
                    metrics: {
                        engagement: '60% increase in user engagement',
                        satisfaction: '95% user satisfaction rate',
                        collaboration: '40% reduction in writer\'s block'
                    }
                }
            },
            {
                id: 'ride-hailing',
                title: 'Ride-Hailing App',
                category: 'mobile',
                icon: 'fas fa-car',
                description: 'A comprehensive mobile application for ride-hailing services with real-time tracking.',
                features: [
                    'Real-time location tracking',
                    'In-app payments',
                    'Route optimization',
                    'Safety features'
                ],
                tech: [
                    { name: 'Flutter', tooltip: 'Cross-platform Framework' },
                    { name: 'Firebase', tooltip: 'Backend Services' },
                    { name: 'Google Maps', tooltip: 'Location Services' },
                    { name: 'Stripe', tooltip: 'Payment Processing' }
                ],
                links: [
                    { text: 'View Demo', url: 'https://ride-hailing-demo.com', icon: 'fas fa-external-link-alt' },
                    { text: 'Source Code', url: 'https://github.com/yourusername/ride-hailing', icon: 'fab fa-github' }
                ],
                image: 'assets/images/ride-hailing.jpg',
                caseStudy: {
                    challenge: 'Developing a reliable ride-hailing system with real-time accuracy and user safety.',
                    approach: 'Implemented real-time tracking, created a unified payment system, built a route optimization algorithm, and integrated safety features.',
                    outcome: 'Delivered a scalable solution that improved user experience and operational efficiency.',
                    metrics: {
                        waitTime: '25% reduction in average wait time',
                        uptime: '99.9% tracking system uptime',
                        earnings: '30% increase in driver earnings'
                    }
                }
            }
        ];
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.renderProjects();
        this.setupEventListeners();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.loadProjectImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );
    }

    loadProjectImage(projectCard) {
        const imageContainer = projectCard.querySelector('.project-image');
        const img = projectCard.querySelector('img');
        
        if (!img) return;

        // Add loading state
        imageContainer.classList.add('loading');
        
        // Load image
        img.onload = () => {
            imageContainer.classList.remove('loading');
            img.classList.add('loaded');
        };

        img.src = img.dataset.src;
    }

    renderProjects() {
        const container = document.querySelector('.projects-grid');
        if (!container) return;

        container.innerHTML = '';
        
        this.projects.forEach(project => {
            const card = this.createProjectCard(project);
            container.appendChild(card);
            this.observer.observe(card);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category);
        card.setAttribute('role', 'article');
        card.setAttribute('aria-labelledby', `project-title-${project.id}`);

        card.innerHTML = `
            <div class="project-image">
                <img data-src="${project.image}" alt="${project.title} project screenshot" loading="lazy">
                <div class="project-badge">${project.category}</div>
            </div>
            <div class="project-content">
                <div class="project-icon">
                    <i class="${project.icon}" aria-hidden="true"></i>
                </div>
                <h3 id="project-title-${project.id}" class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <ul class="project-features">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="project-tech">
                    ${project.tech.map(tech => `
                        <span class="tech-tag" data-tooltip="${tech.tooltip}">${tech.name}</span>
                    `).join('')}
                </div>
                <div class="project-links">
                    ${project.links.map(link => `
                        <a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="${link.icon}" aria-hidden="true"></i>
                            ${link.text}
                        </a>
                    `).join('')}
                </div>
                <div class="project-case-study">
                    <h4>Case Study</h4>
                    <div class="case-study-content">
                        <p><strong>Challenge:</strong> ${project.caseStudy.challenge}</p>
                        <p><strong>Approach:</strong> ${project.caseStudy.approach}</p>
                        <p><strong>Outcome:</strong> ${project.caseStudy.outcome}</p>
                        <div class="case-study-metrics">
                            <h5>Key Metrics</h5>
                            <ul>
                                ${Object.entries(project.caseStudy.metrics).map(([key, value]) => 
                                    `<li>${value}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    setupEventListeners() {
        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                this.filterProjects(category);
                this.updateFilterButtons(button);
            });
        });
    }

    filterProjects(category) {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    updateFilterButtons(activeButton) {
        const buttons = document.querySelectorAll('.filter-button');
        buttons.forEach(button => {
            button.classList.remove('active');
            if (button === activeButton) {
                button.classList.add('active');
            }
        });
    }
}

// Mobile Menu Management
class MobileMenuManager {
    constructor() {
        this.hamburger = document.querySelector('.navbar-burger');
        this.navWrapper = document.querySelector('.navbar-menu');
        this.isOpen = false;
        
        if (!this.hamburger || !this.navWrapper) {
            console.warn('Mobile menu elements not found');
            return;
        }

        this.init();
    }

    init() {
        // Set initial ARIA states
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.navWrapper.setAttribute('aria-hidden', 'true');

        // Add event listeners
        this.hamburger.addEventListener('click', this.toggleMenu.bind(this));
        document.addEventListener('click', this.handleClickOutside.bind(this));
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));

        // Handle navigation link clicks
        const navLinks = this.navWrapper.querySelectorAll('.navbar-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.hamburger.setAttribute('aria-expanded', 'true');
        this.navWrapper.setAttribute('aria-hidden', 'false');
        this.navWrapper.classList.add('open');
        document.body.classList.add('menu-open');
    }

    closeMenu() {
        this.isOpen = false;
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.navWrapper.setAttribute('aria-hidden', 'true');
        this.navWrapper.classList.remove('open');
        document.body.classList.remove('menu-open');
    }

    handleClickOutside(event) {
        if (this.isOpen && 
            !this.navWrapper.contains(event.target) && 
            !this.hamburger.contains(event.target)) {
            this.closeMenu();
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Escape' && this.isOpen) {
            this.closeMenu();
        }
    }

    handleResize() {
        if (window.innerWidth > 768 && this.isOpen) {
            this.closeMenu();
        }
    }
}

// Skills Management Module
const SkillsManager = {
    init() {
        this.setupSkillAnimations();
    },

    setupSkillAnimations() {
        const observerOptions = {
            root: null,
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.width = `${progress}%`;
                    observer.unobserve(progressBar);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-progress').forEach(bar => {
            observer.observe(bar);
        });
    }
};

// Timeline Management Module
const TimelineManager = {
    init() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.setupTimelineAnimations();
    },

    setupTimelineAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
            });
        }, {
            threshold: 0.1
        });

        this.timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(item);
        });
    }
};

// Section Managers
const SectionManager = {
    init() {
        this.sections = document.querySelectorAll('.section');
        this.setupIntersectionObserver();
    },

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        this.sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(section);
        });
    }
};

// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitButton = this.form?.querySelector('button[type="submit"]');
        this.spinner = this.form?.querySelector('.loading-spinner');
        this.feedback = this.form?.querySelector('.form-feedback');
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        // Show loading state
        this.submitButton.disabled = true;
        this.spinner.style.display = 'inline-block';
        this.feedback.style.display = 'none';

        try {
            // Get form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());

            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            this.showFeedback('Message sent successfully!', 'success');
            this.form.reset();
        } catch (error) {
            // Show error message
            this.showFeedback('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            this.submitButton.disabled = false;
            this.spinner.style.display = 'none';
        }
    }

    showFeedback(message, type) {
        this.feedback.textContent = message;
        this.feedback.className = `form-feedback ${type}`;
        this.feedback.style.display = 'block';

        // Hide feedback after 5 seconds
        setTimeout(() => {
            this.feedback.style.display = 'none';
        }, 5000);
    }
}

// Enhanced Form Validation
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.submitButton = this.form?.querySelector('button[type="submit"]');
        this.spinner = this.form?.querySelector('.loading-spinner');
        this.feedback = this.form?.querySelector('.form-feedback');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.setAttribute('novalidate', true);
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.form.addEventListener('input', this.handleInput.bind(this));
        this.form.addEventListener('blur', this.handleBlur.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm();
        }
    }

    handleInput(event) {
        const field = event.target;
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
            this.validateField(field);
        }
    }

    handleBlur(event) {
        const field = event.target;
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
            this.validateField(field);
        }
    }

    validateField(field) {
        const parent = field.parentElement;
        const validationMessage = parent.querySelector('.validation-message');

        // Reset previous validation
        parent.classList.remove('error', 'success');
        if (validationMessage) {
            validationMessage.textContent = '';
            validationMessage.className = 'validation-message';
        }

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Message length validation
        if (field.id === 'message' && field.value.trim().length < 10) {
            this.showError(field, 'Message must be at least 10 characters long');
            return false;
        }

        // Success state
        parent.classList.add('success');
        return true;
    }

    showError(field, message) {
        const parent = field.parentElement;
        const validationMessage = parent.querySelector('.validation-message');
        
        parent.classList.add('error');
        if (validationMessage) {
            validationMessage.textContent = message;
            validationMessage.classList.add('error');
        }
    }

    validateForm() {
        let isValid = true;
        const fields = this.form.querySelectorAll('input, textarea');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // reCAPTCHA validation
        if (typeof grecaptcha !== 'undefined') {
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                this.showFormError('Please complete the reCAPTCHA');
                isValid = false;
            }
        }

        return isValid;
    }

    async submitForm() {
        try {
            // Show loading state
            this.submitButton.disabled = true;
            this.spinner.style.display = 'inline-block';
            this.feedback.style.display = 'none';
            
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());

            // Add reCAPTCHA response if present
            if (typeof grecaptcha !== 'undefined') {
                data.recaptchaResponse = grecaptcha.getResponse();
            }

            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            this.showFormSuccess('Message sent successfully!');
            this.form.reset();

            // Reset reCAPTCHA if present
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
            }
        } catch (error) {
            this.showFormError('Failed to send message. Please try again.');
        } finally {
            this.submitButton.disabled = false;
            this.spinner.style.display = 'none';
        }
    }

    showFormSuccess(message) {
        this.feedback.textContent = message;
        this.feedback.className = 'form-feedback success';
        this.feedback.style.display = 'block';
    }

    showFormError(message) {
        this.feedback.textContent = message;
        this.feedback.className = 'form-feedback error';
        this.feedback.style.display = 'block';
    }
}

class ResumeManager {
    constructor() {
        this.downloadBtn = document.querySelector('.download-resume .btn');
        this.fileSizeSpan = document.querySelector('.download-resume .file-size');
        this.resumePath = 'assets/resume.pdf';
        this.init();
    }

    async init() {
        if (this.downloadBtn && this.fileSizeSpan) {
            try {
                const response = await fetch(this.resumePath, { method: 'HEAD' });
                if (response.ok) {
                    const size = response.headers.get('content-length');
                    this.displayFileSize(size);
                }
            } catch (error) {
                console.warn('Could not fetch resume file size:', error);
            }

            this.downloadBtn.addEventListener('click', this.handleDownload.bind(this));
        }
    }

    displayFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        const size = Math.round(bytes / Math.pow(1024, i), 2);
        this.fileSizeSpan.textContent = `(${size} ${sizes[i]})`;
    }

    handleDownload(e) {
        // Add any analytics tracking here if needed
        console.log('Resume download initiated');
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize ThemeManager
    const themeManager = new ThemeManager();
    themeManager.init();

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Initialize Swiper for testimonials if it exists
    if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-container')) {
        const testimonialSwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }

    // Initialize Mobile Menu if elements exist
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');
    const body = document.body;

    if (navbarBurger && navbarMenu) {
        navbarBurger.addEventListener('click', () => {
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            navbarBurger.classList.toggle('is-active');
            navbarMenu.classList.toggle('is-active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.navbar-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarBurger.classList.remove('is-active');
                navbarMenu.classList.remove('is-active');
                body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbarMenu.contains(e.target) && !navbarBurger.contains(e.target)) {
                navbarBurger.classList.remove('is-active');
                navbarMenu.classList.remove('is-active');
                body.classList.remove('menu-open');
            }
        });
    }

    // Initialize Smooth Scroll if navigation links exist
    const navLinksSmoothScroll = document.querySelectorAll('a[href^="#"]');
    if (navLinksSmoothScroll.length > 0) {
        navLinksSmoothScroll.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu after clicking
                    if (navbarBurger && navbarMenu) {
                        navbarBurger.classList.remove('is-active');
                        navbarMenu.classList.remove('is-active');
                    }
                }
            });
        });
    }

    // Initialize Navbar Scroll Behavior if navbar exists
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    }

    // Initialize Lazy Loading for Images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImages.length > 0) {
        if ('loading' in HTMLImageElement.prototype) {
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Initialize Project Card Hover Effects
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });
    }

    // Initialize Fade-in Animations
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length > 0) {
        const appearOnScroll = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        faders.forEach(fader => appearOnScroll.observe(fader));
    }

    // Initialize Contact Form if it exists
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        new FormValidator('contact-form');
    }

    // Initialize Resume Manager if elements exist
    const downloadBtn = document.querySelector('.download-resume .btn');
    const fileSizeSpan = document.querySelector('.download-resume .file-size');
    if (downloadBtn && fileSizeSpan) {
        new ResumeManager();
    }

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                }
            });
        }, {
            threshold: 0.2
        });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Fade-in animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            document.querySelector('.navbar-menu').classList.toggle('is-active');
        });
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.navbar-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.navbar-burger').classList.remove('is-active');
            document.querySelector('.navbar-menu').classList.remove('is-active');
        });
    });
}); 