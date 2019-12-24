'use strict';

export default class Slider {
    constructor(sliderItem, sliderDot, prevSlide, nextSlide) {
        this.sliderItem = sliderItem;
        this.sliderDot = sliderDot;
        this.prevSlide = prevSlide;
        this.nextSlide = nextSlide;
    }


}

const mySlider = new Slider();