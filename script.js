'use strict';

(function () {

    const sliderWrapper = document.querySelector('.slider_wrapper'),
        slider = document.querySelector('.slider'),
        bigPhoto = document.querySelector('.big-photo'),
        slidItem = document.querySelectorAll('.slider-item'),
        sliderDots = document.querySelector('.slider_dots'),
        dotItem = document.querySelectorAll('.dot'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next');
    let slideIndex = 0;

    let sliderNumber = +prompt('Выберите номер анимации слайдера(1- карусель, 2- исчезновение)', 1);

    if (sliderNumber === 1) {
        showSlidesCarousel(slideIndex);
    } else if (sliderNumber === 2) {
        showSlides(slideIndex);
    } else {
        showSliderGalery();
    }

    //  // first slider option -----------------------------------------------------   

    // setInterval(nextSlide, 5000);

    function togglesDot() {
        sliderDots.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('dot')) {
                for (let i = 0; i < dotItem.length; i++) {
                    if (target === dotItem[i]) {
                        slideIndex = i;
                        showSlides(slideIndex);
                    }
                }
            }
        });
    }

    function nextSlide() {
        if (slideIndex === slidItem.length - 1) {
            slideIndex = 0;
            showSlides(slideIndex)
        } else {
            slideIndex += 1
            showSlides(slideIndex)
        }

    };

    function prevSlide() {
        if (slideIndex === 0) {
            slideIndex = slidItem.length;
        }
        slideIndex -= 1;
        showSlides(slideIndex)

    }

    function showSlides(slideIndex) {
        slidItem.forEach(slide => slide.style.display = 'none');
        dotItem.forEach(dot => dot.classList.remove('dot-active'));

        slidItem[slideIndex].style.display = 'block';
        dotItem[slideIndex].classList.add('dot-active');

        prev.addEventListener('click', prevSlide);
        next.addEventListener('click', nextSlide);
        document.documentElement.onmousedown = () => {
            return false
        };
        togglesDot();

    };

    // // second slider option -----------------------------------------------------   

    function togglesDotCarousel() {
        sliderDots.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('dot')) {
                for (let i = 0; i < dotItem.length; i++) {
                    if (target === dotItem[i]) {
                        slideIndex = i;
                        showSlidesCarousel(slideIndex);
                    }
                }
            }
        });
    }


    function nextSlideCarousel() {
        if (slideIndex === slidItem.length - 1) {
            slideIndex = 0;
            showSlidesCarousel(slideIndex)
        } else {
            slideIndex += 1
            showSlidesCarousel(slideIndex)
        }

    };

    function prevSlideCarousel() {
        if (slideIndex === 0) {
            slideIndex = slidItem.length;
        }
        slideIndex -= 1;
        showSlidesCarousel(slideIndex)

    }

    function showSlidesCarousel(slideIndex) {
        let coords = slidItem[0].getBoundingClientRect();
        slider.style.width = '12000px';
        sliderWrapper.style.overflow = 'hidden';

        slidItem.forEach(slide => slide.style.display = 'inline-block');
        dotItem.forEach(dot => dot.classList.remove('dot-active'));
        dotItem[slideIndex].classList.add('dot-active');

        slider.style.marginLeft = `${-coords.width * slideIndex - (4 * slideIndex)}px`;

        prev.addEventListener('click', prevSlideCarousel);
        next.addEventListener('click', nextSlideCarousel);
        document.documentElement.onmousedown = () => {
            return false
        };
        togglesDotCarousel();

    }

    // third slider option -----------------------------------------------------  
    function galeryStyle() {
        bigPhoto.style.display = 'block';
        slider.style.width = '12000px';
        slider.style.paddingTop = '10px';
        sliderWrapper.style.overflow = 'hidden';
        prev.style.display = 'none';
        next.style.display = 'none';

        slidItem.forEach(slide => {
            slide.style.display = 'inline-block';
            slide.style.width = '175px';
            slide.style.height = '120px';
            slide.style.cursor = 'pointer';

        });
    }

    function activeGaleryItem() {
        slider.addEventListener('click', event => {
            let target = event.target;

            if (target.closest('.slider-item')) {
                bigPhoto.innerHTML = `<img src="${target.src}" alt="slider-img">`;
            }

        });
    }

    function showSliderGalery() {
        galeryStyle();
        activeGaleryItem();
    }
})()