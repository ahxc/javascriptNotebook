window.onload = function() {
  const span = document.getElementsByClassName("menu-span")

  for(let i=0; i<span.length; i++) {
    span[i].onclick = function() {
      let p = span[i].parentElement;
      if(hasClass(p, "collapsed")) {
        removeClass(p, "collapsed");
        let o = document.getElementsByClassName("open")[0];/* array */
        removeClass(o, "open");
        addClass(o, "collapsed");
        addClass(p, "open")
      }
      else {
        addClass(p, "collapsed");
      }
    }
  }
}

function hasClass(obj, n) {
  let pattern = new RegExp("\\b"+n+"\\b");
  return pattern.test(obj.className);
}

function addClass(obj, n) {
  let pattern = new RegExp("\\b"+n+"\\b");
  obj.className += " "+n;
}

function removeClass(obj, n) {
  let pattern = new RegExp("\\b"+n+"\\b");
  obj.className = obj.className.replace(pattern, '');
  obj.className = obj.className.trim();
}