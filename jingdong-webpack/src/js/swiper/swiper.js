import { hasClass, addClass, removeClass } from '../utils';

/* 轮播图指示器激活操作
params：指示器数组对象，当前索引，最大索引，正方向，要添加的样式名 */
function swiperHandle(list, index, length, direction = true, cn) {
  addClass(list[index], cn);
  let prev;
  if (direction) {
    prev = index - 1 < 0 ? length : index - 1;
  } else {
    prev = index + 1 > length ? 0 : index + 1;
  }
  removeClass(list[prev], cn);
}

/* 透明度渐变的轮播图 */
function swiperOpacity({
  prev,
  next,
  list,
  indiList = null,
  swipercn = null,
  indicn = null,
  tranTime = 0.5,
  interTime = 3000,
}) {
  let index = 0;
  let length = list.length - 1;
  addClass(list[0], swipercn);
  if (indiList) {
    addClass(indiList[0], indicn);
  }

  for (let i = 0; i <= length; i++) {
    list[i].style.transition = `opacity ${tranTime}s`;
  }

  let timer = setInterval(() => {
    next.onclick();
  }, interTime);
  if (!interTime) {
    clearInterval(timer);
  }

  next.onclick = function () {
    index = index >= length ? 0 : index + 1;
    swiperHandle(list, index, length, true, swipercn);
    if (indiList) {
      swiperHandle(indiList, index, length, true, indicn);
    }
    return false;
  };

  prev.onclick = function () {
    index = index <= 0 ? length : index - 1;
    swiperHandle(list, index, length, false, swipercn);
    if (indiList) {
      swiperHandle(indiList, index, length, false, indicn);
    }

    return false;
  };
}

function swiperTransform({ prev, next, obj, tranTime }) {
  let index = 1;
  let length = obj.childElementCount - 2;
  let s = false;

  function transf(c, index) {
    let p = obj.parentElement.offsetWidth;
    c.style.transform = `translate3d(${index * p}px, 0, 0)`;
    c.style['-webkit-transform'] = `translate3d(${index * p}px), 0, 0`;
    c.style['-ms-transform'] = `translate3d(${index * p}px), 0, 0`;
  }
  transf(obj, -index);

  function check(c) {
    setTimeout(() => {
      c.style.transition = `${0}ms`;
      if (index >= length + 1) {
        index = 1;
      } else if (index <= 0) {
        index = length;
      }
      transf(c, -index);
    }, tranTime);
  }

  function scroll(c) {
    s = true;
    c.style.transition = `transform ${tranTime}ms`;
    transf(c, -index);
    check(c);
    setTimeout(() => {
      s = false;
    }, tranTime);
  }

  prev.onclick = function () {
    if (s) return;
    index--;
    scroll(obj);
  };

  next.onclick = function () {
    if (s) return;
    index++;
    scroll(obj);
  };
}

export { swiperOpacity, swiperTransform };
