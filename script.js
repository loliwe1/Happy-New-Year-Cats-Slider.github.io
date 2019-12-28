'use strict';

(function () {

    let sliderWrapper = document.querySelector('.slider_wrapper'),
        slider = document.querySelector('.slider'),
        sliderUl = slider.querySelector('ul'),
        bigPhoto = document.querySelector('.big-photo'),
        slidItem = document.querySelectorAll('.slider-item'),
        sliderDots = document.querySelector('.slider_dots'),
        dotItem = document.querySelectorAll('.dot'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        settingsButton = document.querySelector('.settings-button'),
        settingsMenu = document.querySelector('.settings'),
        changeBg = document.querySelector('.change-bg'),
        resetSettings = document.querySelector('.reset-settings'),
        newSlide = document.querySelector('.new-slide'),
        deleteSlide = document.querySelector('.delete-slide');
    let slideIndex = 0;

    let sliderNumber = +prompt('Выберите номер анимации слайдера(1- карусель, 2- исчезновение, 3- галерея, 4 - бесконечная карусель)', 4);
    updateSlider();
    startSlider();
    autoSlide();

    function startSlider() {
        if (sliderNumber === 1) {
            showSlidesCarousel(slideIndex);
        } else if (sliderNumber === 2) {
            showSlides(slideIndex);
        } else if (sliderNumber === 3) {
            showSliderGalery();
        } else if (sliderNumber === 4) {
            showEndlessCarouselSlider(slideIndex);
        }
    }

    function autoSlide() {
        if (sliderNumber === 1) {
            setInterval(nextSlideCarousel, 5000);
        } else if (sliderNumber === 2) {
            setInterval(nextSlide, 5000);
        }
    }

    function updateSlider() {
        if (localStorage.getItem('SaveSlide')) {
            let arr = JSON.parse(localStorage.getItem('SaveSlide'));
            arr.forEach((value) => {
                let li = document.createElement('li');
                let div = document.createElement('div');
                div.classList.add('dot');
                sliderDots.append(div);
                li.classList.add('slider-item');
                li.classList.add('fade');
                li.style.display = 'none';
                li.innerHTML = `<img src="${value}" alt="slider-img">`;
                sliderUl.append(li);
            });
            refreshPage();
        } else return;
    }


    function refreshPage() {
        slider = document.querySelector('.slider');
        slidItem = document.querySelectorAll('.slider-item');
        dotItem = document.querySelectorAll('.dot');
        slideIndex = 0;
        startSlider();
    };


    // first slider option -----------------------------------------------------   

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
        slidItem.forEach(slide => {
            slide.style.display = 'none';
        })
        dotItem.forEach(dot => dot.classList.remove('dot-active'));

        slidItem[slideIndex].style.display = 'block';
        dotItem[slideIndex].classList.add('dot-active');

        prev.addEventListener('click', prevSlide);
        next.addEventListener('click', nextSlide);
        document.documentElement.onmousedown = () => {
            return false;
        };
        togglesDot();


    };

    // second slider option -----------------------------------------------------   

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

        slider.style.marginLeft = `${-coords.width * slideIndex }px`;

        prev.addEventListener('click', prevSlideCarousel);
        next.addEventListener('click', nextSlideCarousel);
        document.documentElement.onmousedown = () => {
            return false
        };
        togglesDotCarousel();


    }

    // third slider option -----------------------------------------------------  
    function createStyleBigSlid() {
        bigPhoto.style.display = 'block';


    };

    function createStyleSlider() {
        slider.style.width = '12000px';
        slider.style.paddingTop = '10px';
        sliderWrapper.style.overflow = 'hidden';
        sliderWrapper.style.width = '540px';
        sliderWrapper.style.paddingTop = '10px';
    }

    function sliderArrowsStyle() {
        prev.classList.add('min-prev');
        next.classList.add('min-next');
        prev.querySelector('.arrow_left').classList.add('arrow_left-min');
        next.querySelector('.arrow_right').classList.add('arrow_right-min');
    }

    function galeryStyle() {
        createStyleSlider();
        createStyleBigSlid();
        sliderArrowsStyle();

        slidItem.forEach(slide => {
            slide.style.display = 'inline-block';
            slide.style.marginRight = '5px';
            slide.style.width = '175px';
            slide.style.height = '120px';
            slide.style.cursor = 'pointer';

        });
    }

    function activeGaleryItem(slideIndex) {
        let coords = slidItem[0].getBoundingClientRect();
        slideIndex = 1;

        next.addEventListener('click', () => {
            if (slideIndex > slidItem.length - 3) {
                slider.style.marginLeft = '0';
                slideIndex = 1;
            } else {
                slider.style.marginLeft = `-${coords.width * slideIndex + slideIndex*5}px`
                slideIndex++;
            };

        });

        prev.addEventListener('click', () => {
            slideIndex--;
            if (slideIndex === 0) {
                slideIndex = slidItem.length - 3;
                slider.style.marginLeft = `-${coords.width * slideIndex + slideIndex*5}px`;

            } else {

                slider.style.marginLeft = `-${coords.width * slideIndex + slideIndex*5}px`
                slideIndex--;
            }

        });
    }

    function showSliderGalery() {
        galeryStyle();
        activeGaleryItem();
    }

    //endless carousel slider(4)-------------------------------------------------------------------
    function updateSliderFour() {
        slidItem.forEach(value => {

            if (value.classList.contains('first-slide') || value.classList.contains('last-slide')) {
                value.remove();
            }
        });
        rewriteDOM();
    }

    function switchSlide(slideIndex) {
        slider.style.transform = `translateX(-${(slidItem[0].clientWidth * slideIndex)}px)`;
    }

    function startSliderStyle(slideIndex) {
        slider.style.transition = 'none';
        switchSlide(slideIndex);

        slider.style.width = '12000px';
        sliderWrapper.style.overflow = 'hidden';
    }

    function createFirstSlide() {

        let firstSlide = document.createElement('li');
        firstSlide.innerHTML = slidItem[0].innerHTML;
        firstSlide.style.display = 'inline-block';
        firstSlide.classList.add('slider-item');
        firstSlide.classList.add('first-slide');
        sliderUl.append(firstSlide);
    }

    function createLastSlide() {

        let lastSlider = document.createElement('li');
        lastSlider.innerHTML = slidItem[slidItem.length - 1].innerHTML;
        lastSlider.style.display = 'inline-block';
        lastSlider.classList.add('slider-item');
        lastSlider.classList.add('last-slide');
        sliderUl.prepend(lastSlider);
    }

    function rewriteDOM() {
        slider = document.querySelector('.slider');
        sliderUl = slider.querySelector('ul');
        slidItem = document.querySelectorAll('.slider-item');
        slidItem.forEach(slide => slide.style.display = 'inline-block');
    }

    function slideTransition() {
        slider.style.transition = '0.5s all';
    }

    function activeDot(slideIndex) {
        dotItem.forEach(dot => {
            dot.classList.remove('dot-active');
        });

        if (slideIndex <= 1) {
            dotItem[0].classList.add('dot-active');
        } else if (slideIndex >= dotItem.length) {
            dotItem[dotItem.length - 1].classList.add('dot-active');
        } else {
            dotItem[slideIndex - 1].classList.add('dot-active');
        }

    }

    function togglesDotSliderFour(slideIndex) {

    }

    function showEndlessCarouselSlider(slideIndex) {
        updateSliderFour();
        slideIndex = 1;
        startSliderStyle(slideIndex);
        createFirstSlide();
        createLastSlide();
        rewriteDOM();
        activeDot(slideIndex);
        // togglesDotSliderFour();

        next.addEventListener('click', () => {
            if (slideIndex >= slidItem.length - 1) return;
            slideIndex++;
            slideTransition();
            switchSlide(slideIndex);
            activeDot(slideIndex);

        });

        prev.addEventListener('click', () => {
            if (slideIndex <= 0) return;
            slideIndex--;
            slideTransition();
            switchSlide(slideIndex);
            activeDot(slideIndex);

        });

        slider.addEventListener('transitionend', () => {
            if (slidItem[slideIndex].classList.contains('first-slide')) {
                slider.style.transition = 'none';
                slideIndex = 1;
                activeDot(slideIndex);
                switchSlide(slideIndex);
            }

            if (slidItem[slideIndex].classList.contains('last-slide')) {
                slider.style.transition = 'none';
                slideIndex = slidItem.length - 2;
                activeDot(slideIndex);
                switchSlide(slideIndex);

            }
        });

        sliderDots.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('dot')) {
                for (let i = 0; i < dotItem.length; i++) {
                    if (target === dotItem[i]) {
                        slideIndex = i + 1;
                        slideTransition();
                        switchSlide(slideIndex);
                        activeDot(slideIndex);
                    }
                }
            }
        });

        newSlide.addEventListener('click', updateSliderFour);

    }

    //general menu settings ------------------------------------------------------------

    settingsButton.addEventListener('click', showHideMenu);

    function showHideMenu() {
        settingsMenu.classList.toggle('settings-display');
    }

    // change background --------------------------------------------------------------
    function bgSettings() {
        document.body.style.background = `url(${localStorage.getItem('bg')})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
    }

    function changedBG() {
        const regExp = /(http[s]*)[:][/][/].+[.]((jpeg)|(jpg)|(png)|(WebP))/i;
        let bgUrl = prompt('Введите адрес картинки для вашего фона в формате - jpeg, jpg, png, WebP', 'http://wallpapers-image.ru/1920x1080/new-year-wallpaper/wallpapers/new-year-wallpapers-1920x1080-00019.jpg');
        if (regExp.test(bgUrl)) {
            localStorage.setItem('bg', bgUrl);
            bgSettings();
            showHideMenu();

        } else {
            alert('Введен неверный адрес картинки, попробуйте еще раз');
        }
    }

    function getBG() {
        if (localStorage.getItem('bg')) {
            bgSettings();
        }

    }

    getBG();
    changeBg.addEventListener('click', changedBG);

    //reset Settings ----------------------------------------------------------------------

    function resetAllSettings() {
        let answer = confirm('Вы уверены, что хотите сбросить настройки?');

        if (answer) {
            localStorage.clear();
            alert('Настройки сброшены, пожалуйста перезагрузите страницу');
            showHideMenu();
        }
    }

    resetSettings.addEventListener('click', resetAllSettings);


    // new Slide -----------------------------------------------------------------------------

    function saveNewSlide(slideUrl) {
        let newSlide = [];

        if (localStorage.getItem('SaveSlide')) {
            newSlide = JSON.parse(localStorage.getItem('SaveSlide'));
            newSlide.push(slideUrl)
            localStorage.setItem('SaveSlide', JSON.stringify(newSlide));

        } else {
            newSlide.push(slideUrl)
            localStorage.setItem('SaveSlide', JSON.stringify(newSlide));
        }

    }

    function createSlide(slideUrl) {
        let li = document.createElement('li');
        let div = document.createElement('div');
        div.classList.add('dot');
        sliderDots.append(div);
        li.classList.add('slider-item');
        li.classList.add('fade');
        li.style.display = 'none';
        li.style.marginRight = '5px';
        li.innerHTML = `<img src="${slideUrl}" alt="slider-img">`;
        sliderUl.append(li);

        saveNewSlide(slideUrl);
    }


    function addNewSlide() {
        const regExp = /(http[s]*)[:][/][/].+[.]((jpeg)|(jpg)|(png)|(WebP))/i;
        let slideUrl = prompt('Введите адрес картинки для нового слайда - jpeg, jpg, png, WebP', 'https://cdnimg.rg.ru/img/content/169/87/52/Kot_shredingera_d_850.jpg');
        if (regExp.test(slideUrl)) {
            alert('Слайд добавлен!');
            createSlide(slideUrl);
            refreshPage();
            showHideMenu();

            if (sliderNumber === 4) {
                showEndlessCarouselSlider(slideIndex);
            }

        } else {
            alert('Что-то пошло не так! Повторите попытку позже.')
        }
    }
    newSlide.addEventListener('click', addNewSlide);


    // delete slide -------------------------------------------------------------------------------

    function deletSlide() {

        let slideNumber = +prompt('Введите номер слайда', 1);
        if (sliderNumber === 4) {
            if (typeof slideNumber === 'number' && slideNumber >= 1 && slideNumber <= slidItem.length - 2) {
                slidItem[slideNumber].remove();
                dotItem[slideNumber - 1].remove();
                refreshPage();
                showEndlessCarouselSlider(slideIndex);
                alert(`Слайд № ${slideNumber} удален!`);
            } else {
                alert('Введено некорректное значение!');
            }

        } else if (sliderNumber >= 1 && sliderNumber < 4) {

            slideNumber -= 1;

            if (typeof slideNumber === 'number' && slideNumber >= 0 && slideNumber < slidItem.length) {
                slidItem[slideNumber].remove();
                dotItem[slideNumber].remove();
                refreshPage();
                alert(`Слайд № ${slideNumber + 1} удален!`);
            } else {
                alert('Введено некорректное значение!');
            }

        } else {
            alert('Введено некорректное значение!');
        }



    };

    deleteSlide.addEventListener('click', deletSlide);

})();