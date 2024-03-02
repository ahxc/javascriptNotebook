import { swiperOpacity } from './swiper'

const col3 = document.getElementsByClassName("col-3")[0];
const prev = col3.getElementsByClassName("prev")[0];
const next = col3.getElementsByClassName("next")[0];
const list = col3.getElementsByClassName("sw-3");

swiperOpacity({ prev, next, list, indiList: null, swipercn: 'itemZ', interTime: 6000 });