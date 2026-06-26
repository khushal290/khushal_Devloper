 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        function scrollToContact() {
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Initialize EmailJS
        (function(){
            // Note: Add your actual EmailJS public key here
            // emailjs.init("YOUR_PUBLIC_KEY");
        })();

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Skip EmailJS if keys are not configured, use mailto directly
            const hasEmailJSKeys = 'YOUR_PUBLIC_KEY' !== 'YOUR_PUBLIC_KEY' && 'YOUR_SERVICE_ID' !== 'YOUR_SERVICE_ID';
            
            if (hasEmailJSKeys && window.emailjs) {
                emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                    .then(function() {
                        alert('Thank you for your message! I\'ll get back to you soon.');
                        const formEl = document.getElementById('contactForm');
                        formEl.classList.add('send-animate');
                        setTimeout(() => formEl.classList.remove('send-animate'), 600);
                        button.textContent = originalText;
                        button.disabled = false;
                        document.getElementById('contactForm').reset();
                    }, function(error) {
                        fallbackMailto();
                    });
            } else {
                fallbackMailto();
            }
            
            function fallbackMailto() {
                const frm = document.getElementById('contactForm');
                const name = frm.querySelector('input[name="name"]').value;
                const email = frm.querySelector('input[name="email"]').value;
                const subject = frm.querySelector('input[name="subject"]').value;
                const message = frm.querySelector('textarea[name="message"]').value;
                const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                const mailtoUrl = `mailto:khushalyadav211@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailtoUrl;
                alert('Opening your email client...');
                button.textContent = originalText;
                button.disabled = false;
            }
        });

        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'about') {
                        animateSkillBars();
                    }
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }
        });
        
        // Resume download buttons: the <a download> attribute handles the
        // actual download, this just gives the recruiter visual confirmation.
        document.querySelectorAll('.download-btn').forEach((btn) => {
            btn.addEventListener('click', function () {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check dl-icon"></i><span>Downloaded!</span>';
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            });
        });

        // Dark Mode Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        const themeIcon = themeToggle.querySelector('i');

        // Check for saved theme preference or default to dark mode
        const currentTheme = localStorage.getItem('theme') || 'dark';
        if (currentTheme === 'light') {
            body.classList.add('light-mode');
            themeIcon.className = 'fas fa-sun text-xl';
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');

            // Update icon
            themeIcon.className = isLight ? 'fas fa-sun text-xl' : 'fas fa-moon text-xl';

            // Save preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        // Scroll Progress Bar
        const scrollProgress = document.getElementById('scroll-progress');
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
        });

        // Back to Top Button
        const backToTopBtn = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0', 'translate-y-4');
                backToTopBtn.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
                backToTopBtn.classList.add('opacity-0', 'translate-y-4');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Active Navigation Link
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Testimonials Animation
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const testimonialObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });

        testimonialCards.forEach(card => {
            testimonialObserver.observe(card);
        });

        // Enhanced Scroll Animations
        const fadeElements = document.querySelectorAll('.fade-in-up');
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
        
        // Page load loader handling
        window.addEventListener('load', () => {
            const loader = document.getElementById('loading-screen');
            if (loader) {
                // keep it visible a tiny bit longer for smoothness
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.addEventListener('transitionend', () => loader.remove());
                }, 200);
            }
        });

        // update footer year automatically
        document.getElementById('year').textContent = new Date().getFullYear();

        // initialize tsParticles for subtle background (disabled on mobile for performance)
        const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (window.tsParticles && !isMobile) {
            tsParticles.load('tsparticles', {
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: { enable: false, mode: 'repulse' },
                        onClick: { enable: true, mode: 'push' }
                    },
                    modes: {
                        push: { quantity: 4 }
                    }
                },
                particles: {
                    color: { value: ['#ffffff', '#a855f7', '#667eea'] },
                    links: { enable: false },
                    move: { enable: true, speed: 0.5, random: true, straight: false, outModes: { default: 'out' } },
                    number: { value: 60 },
                    opacity: { value: 0.3 },
                    shape: { type: 'circle' },
                    size: { value: { min: 1, max: 3 } }
                },
                detectRetina: true
            });
        }

        // typing effect in hero
        const phrases = [
            "Future Software & Web Developer",
            "Transforming ideas into solutions",
            "Tackling real-world challenges"
        ];
        let currentPhrase = 0;
        let typingElement = document.getElementById('typed-text');
        let typingSpeed = 80;
        let deleteSpeed = 40;
        let pauseBetween = 1500;

        function typePhrase() {
            let phrase = phrases[currentPhrase];
            let i = 0;
            function type() {
                if (i < phrase.length) {
                    typingElement.textContent += phrase.charAt(i);
                    i++;
                    setTimeout(type, typingSpeed);
                } else {
                    setTimeout(deletePhrase, pauseBetween);
                }
            }
            type();
        }
        function deletePhrase() {
            let phrase = phrases[currentPhrase];
            let i = phrase.length;
            function erase() {
                if (i > 0) {
                    typingElement.textContent = phrase.substring(0, i-1);
                    i--;
                    setTimeout(erase, deleteSpeed);
                } else {
                    currentPhrase = (currentPhrase + 1) % phrases.length;
                    typePhrase();
                }
            }
            erase();
        }
        if (typingElement) {
            typePhrase();
        }

        // custom cursor behavior (disabled on touch devices)
        const cursor = document.getElementById('cursor');
        if (!('ontouchstart' in window)) {
            document.addEventListener('mousemove', e => {
                cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            });

            // enlarge cursor over interactive elements
            document.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.width = '40px';
                    cursor.style.height = '40px';
                    cursor.style.background = 'rgba(118,75,162,0.3)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.width = '20px';
                    cursor.style.height = '20px';
                    cursor.style.background = 'rgba(118,75,162,0.6)';
                });
            });
        } else {
            // hide custom cursor on touch devices
            if (cursor) cursor.style.display = 'none';
        }