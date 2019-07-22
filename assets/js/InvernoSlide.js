import { Slide } from './OverlappingCarousel.js';

export default class InvernoSlide extends Slide {
  constructor(args) {
    super(args);
    this.elSlideBanner = args.elSlideBanner;
    this.elSlideDetail = args.elSlideDetail;
    this.time = args.time;

    this.goIn = this.goIn.bind(this);
    this.goOut = this.goOut.bind(this);
  }

  /**
   * @override
   */
  goIn(time = 1000) {
    const transitioning = (time, type) => {
      this[type].classList.add('hs-slide-in');

      function toEndAnimation() {
        this[type].classList.remove('hs-slide-in');
        this[type].classList.add('hs-slide-active');
      }

      setTimeout(toEndAnimation.bind(this), time);
    }

    transitioning(time, 'elSlideDetail');
    transitioning(time, 'elSlideBanner');
  }

  /**
   * @override
   */
  goOut(time = 1000) {
    const transitioning = (time, type) => {
      this[type].classList.add('hs-slide-out');

      function toEndAnimation() {
        this[type].classList.remove('hs-slide-out', 'hs-slide-active');
      }

      setTimeout(toEndAnimation.bind(this), time);
    }

    transitioning(time, 'elSlideDetail');
    transitioning(time, 'elSlideBanner');
  }
}
