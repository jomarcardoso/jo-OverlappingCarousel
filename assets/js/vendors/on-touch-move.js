/**
 *
 * @description atrela eventos de toque ao elemento enviado e chama as funções de callback correspondentes
 * @param {node} el
 * @param {object} options
 */
export default function(el, {
    safeX = 20,
    safeY = 20,
    onTop,
    onBottom,
    onLeft,
    onRight,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = {}) {
    let breakpointX;
    let breakpointY;

    el.addEventListener('touchstart', (e) => {
      breakpointX = e.changedTouches[0].screenX;
      breakpointY = e.changedTouches[0].screenY;
      onTouchStart && onTouchStart();
    });

    el.addEventListener('touchend', (e) => {
      onTouchEnd && onTouchEnd();
    });

    el.addEventListener('touchmove', (e) => {
      let positionX = e.changedTouches[0].screenX;
      let positionY = e.changedTouches[0].screenY;

      if (safeX < positionX - breakpointX) {
        onRight && onRight();
        breakpointX = positionX;
      }

      if (safeX < breakpointX - positionX) {
        onLeft && onLeft();
        breakpointX = positionX;
      }

      if (safeY < positionY - breakpointY) {
        onTop && onTop();
        breakpointY = positionY;
      }

      if (safeY < breakpointY - positionY) {
        onBottom && onBottom();
        breakpointY = positionY;
      }

      onTouchMove && onTouchMove();
    });
  }
