import onTouch from './vendors/on-touch-move.js';

/**
 * @description Carrossel de sobreposição
 * @version 1.0.0
 */


/**
 * Esta classe deve ser estendida e seus métodos implementados
 */
export class Slide {
  constructor({ className }) {
    this.className = className;
  }

  goIn(time) {
    console.warn('Método Slide.goIn não implementado');
  }

  goOut(time) {
    console.warn('Método Slide.goOut não implementado');
  }
}

/**
 * @param {[Slide]} list
 * @requires onTouch
 */
export default class Carousel {
  constructor({ timeTransition, list, indexCurrentActive = 0, el, dots = true, autoplay, autoplayTime = 0, autoplayType } = {}) {
    this.timeTransition = timeTransition || 2000;
    this.list = list || [];
    this.transitioning = false;
    this.el = el;

    if (dots) {
      this.dots = this.createDots();
    }

    this.transitionTo.call(this, indexCurrentActive);
    this.indexCurrentActive = indexCurrentActive;
    this.bindEvents();

    this.createAutoPlay = this.createAutoPlay.bind(this);
    autoplay && this.createAutoPlay({ tipe: autoplayTime, type: autoplayType });
  }

  createAutoPlay({ time = 3000, type } = {}) {
    if (this.autoPlayCreated) return;
    this.autoPlayCreated = true;

    let direction = this.goFoward;

    function changeDirection() {
      if (direction === this.goFoward) {
        direction = this.goBack;
        return;
      }

      direction = this.goFoward;
    }

    const timeout = setInterval(() => {
      if (type === 'yoyo') {
        if (!direction.call(this)) {
          changeDirection.call(this);
          direction.call(this);
        }

        return;
      }

      if (type === 'once') {
        const done = !this.goFoward();
        done && clearInterval(timeout);

        return;
      }

      // if loop
      this.goFoward.call(this, true);
    }, time);
  }

  createDots() {
    const { list, el, transitionTo } = this;

    const dots = el.querySelector('[data-js="dots"]');

    return list.map((slide, index) => {
      const dot = document.createElement('li');
      dot.setAttribute('data-js', 'dot');
      dot.setAttribute('id', `${slide.className}-dot`);
      dot.setAttribute('class', 'hs-dot');
      dot.addEventListener('click', () => {
        transitionTo.call(this, index);
      });

      dots.appendChild(dot);


      return dot;
    });
  }

  bindEvents() {
    onTouch(this.el, { onLeft: this.goFoward.bind(this), onRight: this.goBack.bind(this)  });
  }

  goBack(loop) {
    if (this.indexCurrentActive === 0) {
      if (!loop) {
        return false;
      }

      transitionTo(this.list.length - 1);
    }

    return this.transitionTo(this.indexCurrentActive - 1);
  }

  goFoward(loop) {
    if (this.indexCurrentActive === this.list.length - 1) {
      if (!loop) {
        return false;
      }

      return this.transitionTo(0);
    }

    return this.transitionTo(this.indexCurrentActive + 1);
  }

  transitionTo(indexIn) {
    const { list, indexCurrentActive, timeTransition, transitioning } = this;

    if (transitioning || indexIn < 0 || indexIn > list.length - 1 || indexIn === indexCurrentActive) return false;
    this.transitioning = true;

    list[indexIn].goIn(timeTransition);
    typeof indexCurrentActive !== 'undefined' && list[indexCurrentActive].goOut(timeTransition);
    this.activate({ index: indexIn });

    setTimeout(() => {
      this.transitioning = false;
    }, timeTransition);

    return true;
  }

  activate({ index }) {
    const { el, list, dots } = this;

    typeof this.indexCurrentActive !== 'undefined' && el.classList.remove(list[this.indexCurrentActive].className);
    el.classList.add(list[index].className);

    typeof this.indexCurrentActive !== 'undefined' && dots[this.indexCurrentActive].classList.remove('hs-slide-active');
    dots[index].classList.add('hs-slide-active');

    this.indexCurrentActive = index;
  }
}
