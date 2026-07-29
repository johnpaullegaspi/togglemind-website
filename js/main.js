(function() {
    'use strict';

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const nav = document.getElementById('nav');
    const scrollTopBtn = document.getElementById('scrollTop');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.toggle('is-open');
            navToggle.classList.toggle('is-active');
            navToggle.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('is-open');
                navToggle.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }

    // Sticky nav background on scroll
    function handleScroll() {
        const scrollY = window.scrollY;
        if (nav) {
            nav.classList.toggle('is-scrolled', scrollY > 20);
        }
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('is-visible', scrollY > 500);
        }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Scroll to top
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Intersection Observer for fade-in animations.
    // Elements are visible by default (see .animate-on-scroll in main.css);
    // we only add .reveal-armed (the hidden starting state) right before
    // observing, and force-reveal everything after a short safety timeout
    // in case an element is never intersected (bot, broken observer, very
    // short/tall page). This keeps the exact same fade-in effect for a
    // normal scrolling visitor while guaranteeing content can't get stuck
    // invisible for anyone/anything else.
    const revealEls = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window && revealEls.length) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealEls.forEach(function(el) {
            el.classList.add('reveal-armed');
            observer.observe(el);
        });

        window.setTimeout(function() {
            revealEls.forEach(function(el) {
                el.classList.add('is-visible');
            });
            observer.disconnect();
        }, 2500);
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(function(button) {
        button.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            const isOpen = item.classList.contains('is-open');

            // Close all others
            document.querySelectorAll('.faq-item.is-open').forEach(function(openItem) {
                if (openItem !== item) {
                    openItem.classList.remove('is-open');
                    openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            item.classList.toggle('is-open');
            this.setAttribute('aria-expanded', !isOpen);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollPos = window.scrollY + (nav ? nav.offsetHeight + 100 : 100);
        sections.forEach(function(section) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(function(link) {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = 'var(--color-accent)';
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNav, { passive: true });

})();