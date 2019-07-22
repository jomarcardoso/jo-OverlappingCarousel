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
    className = className;
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
export default function Carousel(el, {
  timeTransition = 1000,
  list = [],
  indexCurrentActive = 1,
  dots = true,
  autoplay = false,
  autoplayTime = 0,
  autoplayType
} = {}) {
  let transitioning = false;
  let elDots = null;
  let autoPlayCreated = false;

  function createAutoPlay({ time = 3000, type } = {}) {
    if (autoPlayCreated) return;
    autoPlayCreated = true;

    let direction = goFoward;

    function changeDirection() {
      if (direction === goFoward) {
        direction = goBack;
        return;
      }

      direction = goFoward;
    }

    const timeout = setInterval(() => {
      if (type === 'yoyo') {
        if (!direction()) {
          changeDirection();
          direction();
        }

        return;
      }

      if (type === 'once') {
        const done = !goFoward();
        done && clearInterval(timeout);

        return;
      }

      // if loop
      goFoward(true);
    }, time);
  }

  function createDots() {
    const dotsWrapper = el.querySelector('[data-js="dots"]');

    return list.map((slide, index) => {
      const dot = document.createElement('li');
      dot.setAttribute('data-js', 'dot');
      dot.setAttribute('id', `${slide.className}-dot`);
      dot.setAttribute('class', 'hs-dot');
      dot.addEventListener('click', () => {
        transitionTo(index);
      });

      dotsWrapper.appendChild(dot);
      return dot;
    });
  }

  function bindEvents() {
    onTouch(el, { onLeft: goFoward, onRight: goBack  });
  }

  function goBack(loop) {
    if (indexCurrentActive === 0) {
      if (!loop) {
        return false;
      }

      transitionTo(list.length - 1);
    }

    return transitionTo(indexCurrentActive - 1);
  }

  function goFoward(loop) {
    if (indexCurrentActive === list.length - 1) {
      if (!loop) {
        return false;
      }

      return transitionTo(0);
    }

    return transitionTo(indexCurrentActive + 1);
  }

  function transitionTo(indexIn) {
    console.log(transitioning, indexIn < 0, indexIn > list.length - 1, indexIn === indexCurrentActive)
    if (transitioning || indexIn < 0 || indexIn > list.length - 1 || indexIn === indexCurrentActive) return false;
    transitioning = true;

    list[indexIn].goIn(timeTransition);
    typeof indexCurrentActive !== 'undefined' && list[indexCurrentActive].goOut(timeTransition);
    activate({ index: indexIn });

    setTimeout(() => {
      transitioning = false;
    }, timeTransition);

    return true;
  }

  function activate({ index }) {
    typeof indexCurrentActive !== 'undefined' && el.classList.remove(list[indexCurrentActive].className);
    el.classList.add(list[index].className);

    typeof indexCurrentActive !== 'undefined' && elDots[indexCurrentActive].classList.remove('hs-slide-active');
    elDots[index].classList.add('hs-slide-active');

    indexCurrentActive = index;
  }

  if (dots) {
    elDots = createDots();
  }

  transitionTo(0);
  autoplay && createAutoPlay({ tipe: autoplayTime, type: autoplayType });
  bindEvents();
}
