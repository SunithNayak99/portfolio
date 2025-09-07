document.addEventListener('DOMContentLoaded', function() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = document.querySelector('.top-nav');
    const navHeight = () => (nav ? nav.offsetHeight : 0);
    const root = document.body;

    // Smooth scrolling with offset for sticky nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight() - 8;
                window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
                history.pushState(null, '', href);
            }
        });
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for skill items
                if (entry.target.classList.contains('section')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    // Animate competency items
                    const competencyItems = entry.target.querySelectorAll('.competency-item');
                    competencyItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = Array.from(document.querySelectorAll('.section'));
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
        
        // Initially hide skill and competency items
        section.querySelectorAll('.skill-item, .competency-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    });

    // Add typing effect to name
    const nameTitle = document.querySelector('.name-title');
    if (nameTitle) {
        const originalText = nameTitle.textContent;
        nameTitle.textContent = '';
        nameTitle.style.borderRight = '3px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, prefersReduced ? 0 : 150);
            } else {
                setTimeout(() => {
                    nameTitle.style.borderRight = 'none';
                }, 600);
            }
        };
        
        setTimeout(typeWriter, prefersReduced ? 0 : 400);
    }

    // Add parallax effect to background
    const parallax = document.querySelector('.vintage-bg');
    if (parallax) {
        parallax.style.willChange = 'transform';
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            const speed = prefersReduced ? 0 : scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }, { passive: true });
    }

    // Add hover effects to sections
    document.querySelectorAll('.section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
        });
    });

    // Add click animation to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = prefersReduced ? 'none' : 'skillFloat 4s ease-in-out infinite';
            }, 10);
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Download to PDF (print) button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Scrollspy for nav links
    const linkMap = new Map();
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        const id = link.getAttribute('href');
        const section = document.querySelector(id);
        if (section) linkMap.set(section, link);
    });

    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = linkMap.get(entry.target);
            if (!link) return;
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-link.active').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, { rootMargin: `-${navHeight()}px 0px -70% 0px`, threshold: 0.2 });

    sections.forEach(sec => spy.observe(sec));

    // Dark mode toggle with persistence
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') root.classList.add('dark');
    const setThemeIcon = () => {
        if (!themeToggle) return;
        const i = themeToggle.querySelector('i');
        if (!i) return;
        if (root.classList.contains('dark')) {
            i.classList.remove('fa-moon');
            i.classList.add('fa-sun');
            themeToggle.setAttribute('aria-pressed', 'true');
        } else {
            i.classList.remove('fa-sun');
            i.classList.add('fa-moon');
            themeToggle.setAttribute('aria-pressed', 'false');
        }
    };
    setThemeIcon();
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            root.classList.toggle('dark');
            localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
            setThemeIcon();
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    const toggleBackToTop = () => {
        if (!backToTop) return;
        const show = window.scrollY > 400;
        backToTop.classList.toggle('show', show);
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
});

// Animated counters (Highlights)
document.addEventListener('DOMContentLoaded', function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;
    const countObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count') || '0', 10);
            const duration = prefersReduced ? 0 : 1200;
            const start = performance.now();
            const from = 0;
            const step = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                const val = Math.round(from + (target - from) * (prefersReduced ? 1 : ease));
                el.textContent = String(val);
                if (t < 1 && !prefersReduced) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            obs.unobserve(el);
        });
    }, { threshold: 0.4 });
    counters.forEach(c => countObserver.observe(c));
});
