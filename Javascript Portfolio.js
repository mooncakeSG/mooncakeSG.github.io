// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize theme based on user preference
    initTheme();
    
    // Initialize animations on scroll
    initScrollAnimations();
    
    // Initialize navbar functionality
    initNavbar();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize skills animation
    initSkillBars();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize calculator
    initCalculator();
    
    // Initialize portfolio modal
    initPortfolioModal();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize typing effect
    initTypingEffect();
});

// Theme Toggle Functionality
function initTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use OS preference
    const currentTheme = localStorage.getItem('theme') || 
                       (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // Add toggle functionality
    themeSwitch.addEventListener('click', () => {
        let theme = 'light';
        
        // Toggle theme
        if (document.body.getAttribute('data-theme') !== 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            theme = 'dark';
        } else {
            document.body.removeAttribute('data-theme');
        }
        
        // Save preference
        localStorage.setItem('theme', theme);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If skill bar, animate width
                if (entry.target.classList.contains('skill-bar')) {
                    const percent = entry.target.getAttribute('data-percent');
                    entry.target.querySelector('.skill-progress span').style.width = `${percent}%`;
                } 
                // Otherwise add reveal class
                else {
                    entry.target.classList.add('reveal');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        observer.observe(bar);
    });
    
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Navbar Functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        updateActiveNavLink();
    });
    
    // Smooth scroll to section when clicking nav links
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.querySelector('.skill-percent').textContent = `${percent}%`;
    });
}

// Project Filtering
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Form Validation
function initFormValidation() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            if (!validateField(nameInput, value => value.trim().length >= 2)) {
                showError(nameInput, 'Name must be at least 2 characters');
                isValid = false;
            } else {
                clearError(nameInput);
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!validateField(emailInput, value => emailRegex.test(value))) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput);
            }
            
            // Validate subject
            const subjectInput = document.getElementById('subject');
            if (!validateField(subjectInput, value => value.trim().length >= 2)) {
                showError(subjectInput, 'Subject must be at least 2 characters');
                isValid = false;
            } else {
                clearError(subjectInput);
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            if (!validateField(messageInput, value => value.trim().length >= 10)) {
                showError(messageInput, 'Message must be at least 10 characters');
                isValid = false;
            } else {
                clearError(messageInput);
            }
            
            // If valid, show success message
            if (isValid) {
                const submitBtn = form.querySelector('.submit-btn');
                const originalContent = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.disabled = true;
                submitBtn.style.backgroundColor = 'var(--success-color)';
                
                // Reset form
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
    }
}

// Validate a single input
function validateInput(input) {
    let isValid = true;
    
    switch(input.id) {
        case 'name':
        case 'subject':
            isValid = input.value.trim().length >= 2;
            if (!isValid) {
                showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must be at least 2 characters`);
            } else {
                clearError(input);
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(input.value);
            if (!isValid) {
                showError(input, 'Please enter a valid email address');
            } else {
                clearError(input);
            }
            break;
            
        case 'message':
            isValid = input.value.trim().length >= 10;
            if (!isValid) {
                showError(input, 'Message must be at least 10 characters');
            } else {
                clearError(input);
            }
            break;
    }
    
    return isValid;
}

// Helper function to validate a field
function validateField(field, validationFn) {
    return validationFn(field.value);
}

// Show error message
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    input.style.borderColor = 'var(--error-color)';
}

// Clear error message
function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    input.style.borderColor = '';
}

// Calculator Functionality
function initCalculator() {
    const calculator = document.querySelector('.calculator');
    
    if (calculator) {
        const display = {
            previous: calculator.querySelector('.previous-operand'),
            current: calculator.querySelector('.current-operand')
        };
        
        let firstOperand = null;
        let secondOperand = null;
        let currentOperation = null;
        let resetScreen = false;
        
        // Add event listeners to buttons
        calculator.querySelectorAll('.calc-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Number buttons
                if (button.hasAttribute('data-number')) {
                    appendNumber(button.getAttribute('data-number'));
                }
                
                // Operation buttons
                if (button.hasAttribute('data-operation')) {
                    const operation = button.getAttribute('data-operation');
                    
                    switch (operation) {
                        case 'clear':
                            clear();
                            break;
                        case 'delete':
                            deleteNumber();
                            break;
                        case '=':
                            calculate();
                            break;
                        default:
                            handleOperation(operation);
                            break;
                    }
                }
            });
        });
        
        // Functions
        function appendNumber(number) {
            if (display.current.textContent === '0' || resetScreen) {
                display.current.textContent = '';
                resetScreen = false;
            }
            
            // Prevent multiple decimal points
            if (number === '.' && display.current.textContent.includes('.')) return;
            
            display.current.textContent += number;
        }
        
        function clear() {
            display.current.textContent = '0';
            display.previous.textContent = '';
            firstOperand = null;
            secondOperand = null;
            currentOperation = null;
        }
        
        function deleteNumber() {
            display.current.textContent = display.current.textContent.slice(0, -1);
            if (display.current.textContent === '') {
                display.current.textContent = '0';
            }
        }
        
        function handleOperation(operation) {
            if (currentOperation !== null) calculate();
            
            firstOperand = parseFloat(display.current.textContent);
            currentOperation = operation;
            
            display.previous.textContent = `${display.current.textContent} ${operation}`;
            resetScreen = true;
        }
        
        function calculate() {
            if (currentOperation === null || resetScreen) return;
            
            secondOperand = parseFloat(display.current.textContent);
            let computation;
            
            switch (currentOperation) {
                case '+':
                    computation = firstOperand + secondOperand;
                    break;
                case '-':
                    computation = firstOperand - secondOperand;
                    break;
                case '×':
                    computation = firstOperand * secondOperand;
                    break;
                case '÷':
                    computation = firstOperand / secondOperand;
                    break;
                case '%':
                    computation = firstOperand % secondOperand;
                    break;
                default:
                    return;
            }
            
            display.current.textContent = Math.round(computation * 1000000) / 1000000;
            display.previous.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
            
            currentOperation = null;
        }
    }
}

// Portfolio Modal Functionality
function initPortfolioModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('portfolio-modal');
    
    if (!modal) return;
    
    const modalTitle = modal.querySelector('.modal-title');
    const modalImage = modal.querySelector('.modal-image');
    const modalDescription = modal.querySelector('.modal-description');
    const modalTech = modal.querySelector('.modal-tech');
    const modalLinks = modal.querySelector('.modal-links');
    const closeBtn = modal.querySelector('.close-modal');
    
    // Open modal when project card is clicked
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Get project data
            const title = card.querySelector('h3').textContent;
            const imgSrc = card.querySelector('img').src;
            const description = card.getAttribute('data-description');
            const technologies = card.getAttribute('data-technologies').split(',');
            const demoLink = card.getAttribute('data-demo');
            const codeLink = card.getAttribute('data-code');
            
            // Populate modal
            modalTitle.textContent = title;
            modalImage.src = imgSrc;
            modalDescription.textContent = description;
            
            // Create tech tags
            modalTech.innerHTML = '';
            technologies.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech.trim();
                modalTech.appendChild(tag);
            });
            
            // Create links
            modalLinks.innerHTML = '';
            
            if (demoLink) {
                const demo = document.createElement('a');
                demo.href = demoLink;
                demo.className = 'btn btn-primary';
                demo.target = '_blank';
                demo.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
                modalLinks.appendChild(demo);
            }
            
            if (codeLink) {
                const code = document.createElement('a');
                code.href = codeLink;
                code.className = 'btn btn-secondary';
                code.target = '_blank';
                code.innerHTML = '<i class="fab fa-github"></i> View Code';
                modalLinks.appendChild(code);
            }
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal when ESC key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial');
    const prevBtn = slider.querySelector('.prev-slide');
    const nextBtn = slider.querySelector('.next-slide');
    const dots = slider.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Create dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        
        dots.appendChild(dot);
    }
    
    // Initialize slider
    updateSlider();
    
    // Add event listeners to buttons
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    });
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }, 5000);
    
    // Pause auto slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 5000);
    });
    
    // Update slider display
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        });
        
        // Update dots
        dots.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
}

// Typing Effect for hero section
function initTypingEffect() {
    const element = document.querySelector('.typing-text');
    
    if (!element) return;
    
    const phrases = element.getAttribute('data-phrases').split(',');
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = phrases[currentPhrase];
        
        if (isDeleting) {
            // Deleting text
            element.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;
            typingSpeed = 50;
        } else {
            // Typing text
            element.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;
            typingSpeed = 100;
        }
        
        // If word is complete, wait and then delete
        if (!isDeleting && currentChar === currentText.length) {
            isDeleting = true;
            typingSpeed = 1000; // Wait before deleting
        }
        
        // If deletion is complete, move to next word
        if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typingSpeed = 500; // Wait before typing new word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}