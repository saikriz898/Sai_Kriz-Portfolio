// Portfolio Website - Sai Krishnan S
// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form inputs
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Simple validation
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                removeError(name);
            }

            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(email);
            }

            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                removeError(message);
            }

            // If form is valid, you would typically submit it to a server
            if (isValid) {
                // For demo purposes, just show a success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Your message has been sent successfully!';

                contactForm.innerHTML = '';
                contactForm.appendChild(successMsg);
            }
        });
    }

    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-message') || document.createElement('div');

        errorMsg.className = 'error-message';
        errorMsg.textContent = message;

        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorMsg);
        }

        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-message');

        if (errorMsg) {
            formGroup.removeChild(errorMsg);
        }

        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Active link highlighting and header scroll effect
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('header');

    function handleScroll() {
        const scrollY = window.pageYOffset;

        // Header scroll effect
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    // Back to Top Button
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Skills Tabs Functionality
    const skillsTabs = document.querySelectorAll('.skills-tab');
    const skillCategories = document.querySelectorAll('.skill-category');

    if (skillsTabs.length > 0 && skillCategories.length > 0) {
        skillsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                skillsTabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                const tabCategory = this.getAttribute('data-tab');

                // Show/hide skill categories based on selected tab
                if (tabCategory === 'all') {
                    skillCategories.forEach(category => {
                        category.style.display = 'block';
                    });
                } else {
                    skillCategories.forEach(category => {
                        const categoryType = category.getAttribute('data-category');
                        if (categoryType === tabCategory) {
                            category.style.display = 'block';
                        } else {
                            category.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
});
