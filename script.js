'use strict';

(function(){

let slidItem = document.querySelectorAll('.slider-item'),
    sliderDots = document.querySelector('.slider_dots'),
    dotItem = document.querySelectorAll('.dot'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    slideIndex = 0;
 
 // first slider option -----------------------------------------------------   

setInterval(nextSlide, 5000);

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

showSlides(slideIndex);


// second slider option -----------------------------------------------------   


})()