import {swiperOpacity} from './swiper'

const outer = document.getElementsByClassName("outer")[0];
const prev = outer.getElementsByClassName("prev")[0];
const next = outer.getElementsByClassName("next")[0];
const list = outer.getElementsByClassName("item");
const indiList = outer.getElementsByClassName("indi-i");

swiperOpacity({prev, next, list, indiList, swipercn:'itemZ', indicn:'indi-i-h', interTime:3000});