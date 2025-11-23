// Configuration
const WEDDING_DATE = new Date('2026-02-06T15:00:00'); // Измените на вашу дату

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE.getTime() - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Parallax Effect
let lastScrollTop = 0;
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop < window.innerHeight) {
        const parallaxSpeed = scrollTop * 0.5;
        heroBackground.style.transform = `translateY(${parallaxSpeed}px) scale(1.1)`;
    }
    
    lastScrollTop = scrollTop;
});

// Navigation Scroll Behavior
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Heart Cursor Effect - Mini Hearts on Mouse Move
let lastHeartTime = 0;
const heartDelay = 50; // Минимальная задержка между сердечками (мс)

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'mini-heart';
    heart.innerHTML = '❤️';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.position = 'fixed';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = Math.random() * 10 + 10 + 'px';
    heart.style.zIndex = '9999';
    heart.style.opacity = '0.8';
    
    document.body.appendChild(heart);
    
    // Анимация
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = Math.random() * -50 - 20;
    const rotation = Math.random() * 360;
    
    heart.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotation}deg)`;
    heart.style.transition = 'all 1s ease-out';
    heart.style.opacity = '0';
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Обработка движения мыши
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastHeartTime > heartDelay) {
        createHeart(e.clientX, e.clientY);
        lastHeartTime = now;
    }
});

// Обработка касаний на мобильных устройствах
let lastTouchTime = 0;
document.addEventListener('touchmove', (e) => {
    const now = Date.now();
    if (now - lastTouchTime > heartDelay && e.touches.length > 0) {
        const touch = e.touches[0];
        createHeart(touch.clientX, touch.clientY);
        lastTouchTime = now;
    }
});

// Hearts Animation around element perimeter (облегание по краям)
const heartIntervals = new WeakMap();
const heartPositions = new WeakMap();

function createCircularHearts(element) {
    // Проверяем, не запущен ли уже эффект
    if (heartIntervals.has(element)) return;
    
    const heartCount = 12; // Количество сердечек по периметру
    const offset = 15; // Отступ от края элемента
    let currentPosition = 0; // Текущая позиция на периметре
    
    function updateHearts() {
        const rect = element.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const perimeter = 2 * (width + height); // Периметр прямоугольника
        const step = perimeter / heartCount; // Шаг между сердечками
        
        // Удаляем старые сердечки
        const oldHearts = heartPositions.get(element) || [];
        oldHearts.forEach(heart => {
            if (heart && heart.parentNode) {
                heart.remove();
            }
        });
        
        const hearts = [];
        
        for (let i = 0; i < heartCount; i++) {
            let pos = (currentPosition + step * i) % perimeter;
            let x, y;
            
            // Определяем на какой стороне находится сердечко
            // Верхняя сторона
            if (pos < width) {
                x = rect.left + pos + offset;
                y = rect.top - offset;
            }
            // Правая сторона
            else if (pos < width + height) {
                x = rect.right + offset;
                y = rect.top + (pos - width) + offset;
            }
            // Нижняя сторона
            else if (pos < 2 * width + height) {
                x = rect.right - (pos - width - height) - offset;
                y = rect.bottom + offset;
            }
            // Левая сторона
            else {
                x = rect.left - offset;
                y = rect.bottom - (pos - 2 * width - height) - offset;
            }
            
            const heart = document.createElement('div');
            heart.className = 'circular-heart';
            heart.innerHTML = '❤️';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.position = 'fixed';
            heart.style.pointerEvents = 'none';
            heart.style.fontSize = Math.random() * 4 + 12 + 'px';
            heart.style.zIndex = '9998';
            heart.style.opacity = '0.85';
            heart.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(heart);
            hearts.push(heart);
        }
        
        heartPositions.set(element, hearts);
        currentPosition += 3; // Скорость движения по периметру
    }
    
    // Обновляем позиции сердечек
    const heartInterval = setInterval(updateHearts, 50);
    updateHearts(); // Первый вызов
    
    // Сохраняем interval
    heartIntervals.set(element, heartInterval);
}

function stopCircularHearts(element) {
    const interval = heartIntervals.get(element);
    if (interval) {
        clearInterval(interval);
        heartIntervals.delete(element);
    }
    
    // Удаляем все сердечки
    const hearts = heartPositions.get(element) || [];
    hearts.forEach(heart => {
        if (heart && heart.parentNode) {
            heart.style.transition = 'all 0.3s ease-out';
            heart.style.opacity = '0';
            heart.style.transform = 'translate(-50%, -50%) scale(0)';
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 300);
        }
    });
    heartPositions.delete(element);
}

// Применяем эффект к фотографиям и интерактивным элементам
document.addEventListener('DOMContentLoaded', () => {
    // Фотографии в галерее
    const galleryItems = document.querySelectorAll('.gallery-item, .gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => createCircularHearts(item));
        item.addEventListener('mouseleave', () => stopCircularHearts(item));
        item.addEventListener('touchstart', () => createCircularHearts(item));
        item.addEventListener('touchend', () => stopCircularHearts(item));
    });
    
    // Фотографии в истории
    const storyPhotos = document.querySelectorAll('.story-photo, .story-photo img');
    storyPhotos.forEach(item => {
        item.addEventListener('mouseenter', () => createCircularHearts(item));
        item.addEventListener('mouseleave', () => stopCircularHearts(item));
        item.addEventListener('touchstart', () => createCircularHearts(item));
        item.addEventListener('touchend', () => stopCircularHearts(item));
    });
    
    // Фотографии в секции подробностей
    const detailPhotos = document.querySelectorAll('.detail-photo-container, .detail-photo');
    detailPhotos.forEach(item => {
        item.addEventListener('mouseenter', () => createCircularHearts(item));
        item.addEventListener('mouseleave', () => stopCircularHearts(item));
        item.addEventListener('touchstart', () => createCircularHearts(item));
        item.addEventListener('touchend', () => stopCircularHearts(item));
    });
    
    // Кнопки и ссылки
    const interactiveElements = document.querySelectorAll('.nav-link, .submit-btn, .countdown-item, .detail-card, .guest-detail-card');
    interactiveElements.forEach(item => {
        item.addEventListener('mouseenter', () => createCircularHearts(item));
        item.addEventListener('mouseleave', () => stopCircularHearts(item));
        item.addEventListener('touchstart', () => createCircularHearts(item));
        item.addEventListener('touchend', () => stopCircularHearts(item));
    });
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map(img => img.src);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightboxImg.src = galleryImages[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    }
});


// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section > .container').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});


