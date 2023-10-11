var p = new Promise((resolve) => { // promise实例化立即执行语句，遇到定义语句不用看
    console.log(4);
    resolve(5); // 传给实例化后调用的微任务。
});

function func1(params) {
    console.log(1);
}

function func2(params) {
    setTimeout(() => {
        console.log(2);
    }, 0);

    func1();

    console.log(3);

    p.then((resolve) => {
        console.log(resolve);
    }).then(() => {
        console.log(6);
    });
}

func2();
// 4, 1, 3, 5, 6, 2

// evetLoop可分为三大块，调用栈，消息队列，任务队列。前者先进后出，后两者先进先出。

// ! 调用栈 先进后出，为的是满足函数调用的先调用最后执行完毕的规则。
// 如，func1，压入栈中，func2，压入栈中，console.log微任务立即执行压入压出。然后func2压入等待执行完毕，压出。
// 最后func1压出。
function func1() {
    console.log(1);
    func2();
}

// 1.主进程调用栈立即执行语句。先进后出。
// 2.微任务加入 任务队列。
//    开发中主要promise的三个方法，then，catch，finally。mutationObserver。
// 3.宏任务加入 消息队列。开发中主要一些定时函数.
//    settimeout，setinterval，requestAnimationFrame，异步I/O。setImmediate 非 js 内置函数，为 nodejs 的微任务。

// 总结，遇到执行语句调入调出，立即执行，遇到微任务加入任务队列等候执行，
// 遇到宏任务加入消息队列等候执行，然后清空当前代码块的剩余执行语句，
// 然后清空任务队列加入调用栈，清空消息队列加入任务队列，然后加入调用栈，形成一个循环。
// 这个期间再次遇到微任务宏任务，都按照这个规则再次加入队列。

export default function _setIntervl(fn, time) {

}