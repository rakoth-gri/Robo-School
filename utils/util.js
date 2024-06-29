// Using throughout Project ----------------------
const slidesCount = (slider) => Math.ceil(slider.list.length / slider.imagesPerSlide);
const currSlideWidth = (slider) => `${(slider.width / slider.imagesPerSlide) - slider.imageMargin}px`
const isSearched = (l, cb) => l.find(cb)

export {slidesCount, currSlideWidth, isSearched}