import {swiperTransform} from './swiper'

const container = document.getElementsByClassName("ms-sw")[0];
const swiper = container.getElementsByClassName("ms-sw-c")[0];
const prev = container.getElementsByClassName("prev")[0];
const next = container.getElementsByClassName("next")[0];
const l = swiper.lastElementChild.cloneNode(true);
const f = swiper.firstElementChild.cloneNode(true);
swiper.insertBefore(l, swiper.firstElementChild);
swiper.appendChild(f);

swiperTransform({prev, next, obj:swiper, tranTime:500});