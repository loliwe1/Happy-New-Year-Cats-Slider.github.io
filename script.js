'use strict';

(function(){




let slider = document.querySelector('.slider'),
    slidItem = document.querySelectorAll('.slider-item'),
    sliderDots = document.querySelector('.slider_dots'),
    dotItem = document.querySelectorAll('.dot'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    slideIndex = 0;


    let sliderNumber = + prompt('Выберите номер анимации слайдера(1- карусель, 2- исчезновение)', 1);

    if(sliderNumber === 1) {
        showSlidesCarousel (slideIndex);
    }else {
        showSlides(slideIndex);
    }
 
 // first slider option -----------------------------------------------------   

// setInterval(nextSlide, 5000);

function togglesDot() {
    sliderDots.addEventListener('click', event => {
        let target = event.target;
    
        if(target.classList.contains('dot')) {
            for(let i = 0; i< dotItem.length; i++) {
                if(target === dotItem[i]) {
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
    }else {
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
    document.documentElement.onmousedown = ()=> {return false};
    togglesDot();

};




// second slider option -----------------------------------------------------   


function togglesDotCarousel() {
        sliderDots.addEventListener('click', event => {
            let target = event.target;
        
            if(target.classList.contains('dot')) {
                for(let i = 0; i< dotItem.length; i++) {
                    if(target === dotItem[i]) {
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
    }else {
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


function showSlidesCarousel (slideIndex) {
    let coords = slidItem[0].getBoundingClientRect();
    slider.style.width = '12000px';
    slider.style.overflow = 'hidden';

    slidItem.forEach(slide => slide.style.display = 'inline-block');
    dotItem.forEach(dot => dot.classList.remove('dot-active'));
    dotItem[slideIndex].classList.add('dot-active');

    slider.style.marginLeft = `${-coords.width * slideIndex - (4 * slideIndex)}px`;

    prev.addEventListener('click', prevSlideCarousel);
    next.addEventListener('click', nextSlideCarousel);
    document.documentElement.onmousedown = ()=> {return false};
    togglesDotCarousel();

}



})()