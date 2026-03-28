// Smooth scroll function
        function smoothScroll(target, duration = 800) {
            const start = window.pageYOffset;
            const distance = target.offsetTop - start;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, start, distance, duration);
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

        // DOM elements
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navLinksAll = document.querySelectorAll('.nav-link');
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        const sections = document.querySelectorAll('section, footer');

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            hamburger.classList.toggle('open');
        });

        // Nav smooth scroll
        navLinksAll.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    smoothScroll(targetSection);
                    navLinks.classList.remove('mobile-open');
                    hamburger.classList.remove('open');
                }
            });
        });

        // Active nav on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}` || (current === '' && link.getAttribute('href') === '#hero')) {
                    link.classList.add('active');
                }
            });

            // Scroll top button
            if (window.scrollY > 100) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            smoothScroll(document.documentElement, 800);
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
                hamburger.classList.remove('open');
            }
        });

        // Typing animation for hero
        const typingText = document.querySelector('.typing-text');
        const typingWords = ['Me.', 'Enrique', 'Developer', 'Musician'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentWord = typingWords[wordIndex];
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 150;
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % typingWords.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Hero CTA smooth scroll
        const heroCta = document.getElementById('heroCta');
        if (heroCta) {
            heroCta.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector('#contact');
                if (target) smoothScroll(target);
            });
        }

        // Skills progress bars
        const observerOptions = {
            threshold: 0.7,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-bar');
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });

        // Project modals
        const projectBtns = document.querySelectorAll('[data-modal]');
        const modals = document.querySelectorAll('.project-modal');
        const closeBtns = document.querySelectorAll('.close-modal');

        projectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = btn.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modals.forEach(modal => modal.style.display = 'none');
                document.body.style.overflow = 'auto';
            });
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('project-modal')) {
                modals.forEach(modal => modal.style.display = 'none');
                document.body.style.overflow = 'auto';
            }
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modals.forEach(modal => modal.style.display = 'none');
                document.body.style.overflow = 'auto';
            }
        });

        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (name && email && message) {
                // Simulate form submission
                formMessage.textContent = 'Thank you! Your message has been sent. I\\'ll get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                contactForm.reset();
            } else {
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
        });

// Clear message after 5 seconds
        const showFormMessage = () => {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        };

        // Preloader hide
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });

        // Start typing animation after DOM loads
        document.addEventListener('DOMContentLoaded', () => {
            typeWriter();
            showFormMessage();
        });
