const prev = document.getElementById("prev");
const next = document.getElementById("next");
const info = document.getElementById("info");
const container = document.getElementById("container");
const l = container.lastElementChild.cloneNode(true);
const f = container.firstElementChild.cloneNode(true);
const w = 330;
var m = 300;
var index = 1;
var s = false;

function transf(p) {
  container.style.transform = `translate3d(${p}px, 0, 0)`
}

function check() {
  setTimeout(()=>{
    container.style.transition = `${0}ms`;
    if(index>=4) {
      index = 1;
    }
    else if(index<=0) {
      index = 3;
    }
    transf(-w*index);
    info.innerHTML = "当前第"+index+"张图片，"+"共"+3+"张";
  }, m)
}

function scroll() {
  s = true;
  container.style.transition = `${m}ms`;
  transf(container, -w*index);
  check(container);
  s = false;
}

container.insertBefore(l, container.firstElementChild);
container.appendChild(f);
container.style.transition = `${0}ms`;
transf(-w);
info.innerHTML = "当前第"+index+"张图片，"+"共"+3+"张";

prev.onclick = function() {
  if(s) return;
  index--;
  scroll();
}

next.onclick = function() {
  if(s) return;
  index++;
  scroll();
}