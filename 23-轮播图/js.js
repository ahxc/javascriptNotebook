const prev = document.getElementById("prev");
const next = document.getElementById("next");
const info = document.getElementById("info");
const container = document.getElementById("container");
const l = container.lastElementChild.cloneNode(true);
const f = container.firstElementChild.cloneNode(true);
const w = 330;
const i = 2000;
var m = 300;
var index = 1;
var s = false;

container.insertBefore(l, container.firstElementChild);
container.appendChild(f);
container.style.transition = `${0}ms`;
transf(container, -w);
info.innerHTML = "当前第"+index+"张图片，"+"共"+"3张";
timer(container);

/* 把计时器绑定到相应的对象上，这样清除时好找到 */
function timer(c) {
  c.timer = setInterval(() => {
    index++;
    scroll(c);
  }, i);
}

function transf(c, p) {
  c.style.transform = `translate3d(${p}px, 0, 0)`;
  c.style['-webkit-transform'] = `translate3d(${p}px), 0, 0`;
  c.style['-ms-transform'] = `translate3d(${p}px), 0, 0`;
}

function check(c) {
  setTimeout(()=>{
    c.style.transition = `${0}ms`;
    if(index>=4) {
      index = 1;
    }
    else if(index<=0) {
      index = 3;
    }
    transf(container, -w*index);
    info.innerHTML = "当前第"+index+"张图片，"+"共"+"3张";
  }, m)
}

function scroll(c) {
  s = true;
  c.style.transition = `transform ${m}ms`;
  transf(container, -w*index);
  check(c);
  s = false;
}

prev.onclick = function() {
  if(s) return;
  clearInterval(container.timer);
  index--;
  scroll(container);
  timer(container);
}

next.onclick = function() {
  if(s) return;
  clearInterval(container.timer);
  index++;
  scroll(container);
  timer(container);
}