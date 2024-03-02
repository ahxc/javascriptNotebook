/* 防抖 */
var timer = null;
function debounce(func, delay = 50) {
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/* 检查是否有指定类 */
function hasClass(obj, n) {
  let pattern = new RegExp('\\b' + n + '\\b');
  return pattern.test(obj.className);
}

/* 添加一个类 */
function addClass(obj, n) {
  let pattern = new RegExp('\\b' + n + '\\b');
  obj.className += ' ' + n;
}

/* 移除一个类 */
function removeClass(obj, n) {
  let pattern = new RegExp('\\b' + n + '\\b');
  obj.className = obj.className.replace(pattern, '');
  obj.className = obj.className.trim();
}

export { hasClass, addClass, removeClass };
