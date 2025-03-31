// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Load saved theme from localStorage or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Update theme icon based on current theme
function updateThemeIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeToggle.innerHTML = currentTheme === 'light' 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Scroll Animation
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
const formGroups = contactForm.querySelectorAll('.form-group');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    formGroups.forEach(group => {
        const error = group.querySelector('.error');
        if (error) error.remove();
    });

    // Validate each field
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            showError(input, 'Please enter a valid email address');
        }
    });

    if (isValid) {
        try {
            // Add loading state
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Submit form to Formspree
            const response = await fetch('https://formspree.io/f/your-formspree-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                })
            });

            if (response.ok) {
                showSuccess('Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showError(submitButton, 'Failed to send message. Please try again.');
        } finally {
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    }
});

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    formGroup.appendChild(error);
}

function showSuccess(message) {
    const success = document.createElement('div');
    success.className = 'success';
    success.textContent = message;
    contactForm.insertBefore(success, submitButton);
    setTimeout(() => success.remove(), 3000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add loading animation to project images
document.querySelectorAll('.project-image img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
}); 