import Carousel from './OverlappingCarousel.js';
import InvernoSlide from './InvernoSlide.js';

Carousel(
  document.querySelector('[data-js="hs-overcarousel"]'), {
  autoplay: true,
  list: [
    new InvernoSlide({
      className: 'hs-slide-1',
      elSlideBanner: document.querySelector('[data-js="hs-slide-banner-1"]'),
      elSlideDetail: document.querySelector('[data-js="hs-slide-detail-1"]')
    }),
    new InvernoSlide({
      className: 'hs-slide-2',
      elSlideBanner: document.querySelector('[data-js="hs-slide-banner-2"]'),
      elSlideDetail: document.querySelector('[data-js="hs-slide-detail-2"]')
    }),
    new InvernoSlide({
      className: 'hs-slide-3',
      elSlideBanner: document.querySelector('[data-js="hs-slide-banner-3"]'),
      elSlideDetail: document.querySelector('[data-js="hs-slide-detail-3"]')
    })
  ]
});
