// สไลด์เกียรติบัตร

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideCount = 10; 
    
    function updateSlider   () {
        slides.style.transform = `translateX(-${currentSlide * 10}%)`;
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    prev.addEventListener('click', function() {
        currentSlide = (currentSlide === 0) ? slideCount - 1 : currentSlide - 1;
        updateSlider();
    });
    next.addEventListener('click', function() {
        currentSlide = (currentSlide === slideCount - 1) ? 0 : currentSlide + 1;
        updateSlider();
    });
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    let interval = setInterval(function() {
        currentSlide = (currentSlide === slideCount - 1) ? 0 : currentSlide + 1;
        updateSlider();
    }, 5000);
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', function() {
        clearInterval(interval);
    });
    slider.addEventListener('mouseleave', function() {
        interval = setInterval(function() {
            currentSlide = (currentSlide === slideCount - 1) ? 0 : currentSlide + 1;
            updateSlider();
        }, 5000);
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide === 0) ? slideCount - 1 : currentSlide - 1;
            updateSlider();
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide === slideCount - 1) ? 0 : currentSlide + 1;
            updateSlider();
        }
    });
    let touchStartX = 0;
    let touchEndX = 0;
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            currentSlide = (currentSlide === slideCount - 1) ? 0 : currentSlide + 1;
        } else if (touchEndX > touchStartX) {
            currentSlide = (currentSlide === 0) ? slideCount - 1 : currentSlide - 1;
        }
        updateSlider();
    }
});