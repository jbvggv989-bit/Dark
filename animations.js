document.addEventListener('DOMContentLoaded', function () {
    const scrollBtn = document.querySelector('.scroll-top');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('active');
            } else {
                scrollBtn.classList.remove('active');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    const contentElements = document.querySelectorAll(
        'section h1, section h2, section h3, section p, section .btn, ' +
        '.hero-content > *, .intro-stat-col, ' +
        '.project-card, .feature-box, .service-box, .developer-box, .agent-card, .stat-item'
    );

    contentElements.forEach(el => {
        if (!el.classList.contains('animate-on-scroll')) {
            if (el.matches('.project-card, .feature-box, .service-box, .developer-box, .agent-card, .stat-item, .intro-stat-col')) {
                el.classList.add('animate-on-scroll', 'scale-in');
            } else {
                el.classList.add('animate-on-scroll', 'fade-in-up');
            }
            observer.observe(el);
        }
    });

    function animateCounter(element) {
        const originalText = element.textContent.trim();
        const numberMatch = originalText.match(/(\d+)/);

        if (!numberMatch) return;

        const target = parseInt(numberMatch[0]);
        const hasPlus = originalText.includes('+');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (hasPlus ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
            }
        }, 16);
    }

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statNumbers = document.querySelectorAll(
        '.stat-number, .insight-number, .intro-stat-col .stat-number'
    );
    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

    function initHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        const numbers = document.querySelectorAll('.control-number');
        const progressBar = document.querySelector('.progress');
        const prevBtn = document.querySelector('.control-arrows .prev');
        const nextBtn = document.querySelector('.control-arrows .next');

        if (slides.length === 0) return;

        let currentIndex = 0;
        const totalSlides = slides.length;
        const intervalTime = 5000;
        let slideInterval;

        function updateSlider(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            numbers.forEach(num => num.classList.remove('active'));

            slides[index].classList.add('active');
            numbers[index].classList.add('active');

            const progressPercentage = ((index + 1) / totalSlides) * 100;
            if (progressBar) {
                progressBar.style.width = `${progressPercentage}%`;
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider(currentIndex);
        }

        function startAutoSlide() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide();
            });
        }

        numbers.forEach((num, index) => {
            num.addEventListener('click', () => {
                currentIndex = index;
                updateSlider(currentIndex);
                startAutoSlide();
            });
        });

        updateSlider(0);
        startAutoSlide();
    }

    initHeroSlider();

    console.log('✨ Animations initialized successfully!');
});
