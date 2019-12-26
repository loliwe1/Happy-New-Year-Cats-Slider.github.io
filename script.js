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
        newSlide = document.querySelector('.new-slide')
    let slideIndex = 0;

    let sliderNumber = +prompt('Выберите номер анимации слайдера(1- карусель, 2- исчезновение, 3- галерея)', 1);
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
        } else {
            showSlidesCarousel(slideIndex);
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

        slider.style.marginLeft = `${-coords.width * slideIndex - (8 * slideIndex)}px`;

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
        let bgUrl = prompt('Введите адрес картинки для вашего фона в формате - jpeg, jpg, png, WebP', 'http://wallpaperengine.info/wp-content/uploads/2018/03/1318929098_preview_Desktop-03.03.2018-06.14.32.01_1000.jpg');
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

        console.log(JSON.parse(localStorage.getItem('SaveSlide')));
    }

    function createSlide(slideUrl) {
        let li = document.createElement('li');
        let div = document.createElement('div');
        div.classList.add('dot');
        sliderDots.append(div);
        li.classList.add('slider-item');
        li.classList.add('fade');
        li.style.display = 'none';
        li.innerHTML = `<img src="${slideUrl}" alt="slider-img">`;
        sliderUl.append(li);

        saveNewSlide(slideUrl);

    }

    function refreshPage() {
        slider = document.querySelector('.slider');
        slidItem = document.querySelectorAll('.slider-item');
        dotItem = document.querySelectorAll('.dot');
        slideIndex = 0;
        startSlider();
    };

    function addNewSlide() {
        const regExp = /(http[s]*)[:][/][/].+[.]((jpeg)|(jpg)|(png)|(WebP))/i;
        let slideUrl = prompt('Введите адрес картинки для нового слайда - jpeg, jpg, png, WebP', 'https://cdnimg.rg.ru/img/content/169/87/52/Kot_shredingera_d_850.jpg');
        if (regExp.test(slideUrl)) {
            alert('Слайд добавлен!');
            createSlide(slideUrl);
            refreshPage();
            showHideMenu();
        } else {
            alert('Что-то пошло не так! Повторите попытку позже.')
        }
    }
    newSlide.addEventListener('click', addNewSlide);

})();