
            const hamburger = document.querySelector('.hamburger');
                const mobileMenu = document.querySelector('.mobile-menu');
                const overlay = document.querySelector('.overlay');

                hamburger.addEventListener('click', function () {
                    this.classList.toggle('open');
                    mobileMenu.classList.toggle('active');
                    overlay.classList.toggle('active');

                    if (mobileMenu.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                });

                overlay.addEventListener('click', function () {
                    hamburger.classList.remove('open');
                    mobileMenu.classList.remove('active');
                    this.classList.remove('active');
                    document.body.style.overflow = '';
                });

                const navLinks = document.querySelectorAll('.mobile-menu .nav-link');
                navLinks.forEach(link => {
                    link.addEventListener('click', function () {
                        hamburger.classList.remove('open');
                        mobileMenu.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });

                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();

                        const targetId = this.getAttribute('href');
                        if (targetId === '#') return;

                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    });
                });
                const scrollReveal = ScrollReveal({
                    origin: 'bottom',
                    distance: '50px',
                    duration: 1000,
                    delay: 200,
                    reset: true
                });

                scrollReveal.reveal('.scroll-reveal', { interval: 200 });

                // Enhancement: Function to close mobile menu
                function closeMobileMenu() {
                    hamburger.classList.remove('open');
                    mobileMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            

      