Web Workers 的使用可以帮助在浏览器中进行多线程处理，下面以一个计算 Fibonacci 序列的例子来展示如何使用 Web Worker。

首先，创建一个新的 Worker 对象，加载一个独立的 JavaScript 文件：

```javascript
const worker = new Worker('fibonacci.js');
```

在 `fibonacci.js` 文件中，编写如下代码：

```javascript
self.onmessage = function(e) {
    const { n } = e.data;
    const fib = fibonacci(n);
    postMessage(fib);
};

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

在主线程和worker线程之间用postMessage传递消息，通过onmessage接收消息，支持传递一个参数。

```javascript
worker.postMessage({ n: 20 });
worker.onmessage = function(e) {
    console.log('Fibonacci of 20 is:', e.data);
};
```

请注意，Web Worker 是运行在后台的单独线程，它不能直接访问主线程的 DOM 或者其他资源，除非通过主线程来传递数据。因此，如果需要与 DOM 进行交互，或者需要访问其他资源，需要将数据传递给主线程进行处理。
