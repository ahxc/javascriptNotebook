### typeof运算符和instanceof运算符以及isPrototypeOf方法的区别

typeof表示 `number`, `string`, `object`, `boolean`, `function`, `undefined`, `symbol` 这七种类型的查找，但是对于正则表达式、日期、数组这些**引用数据类型**，它会全部识别为object，不会识别到是哪个object。判别原理：根据存储的二进制前三位：

000对象，1整数，010浮点数，100字符串，110布尔，特殊情况：undefined用(-2^30)表示，null全是零。

[instanceof和isPrototypeOf](https://www.jianshu.com/p/31b09a13f212)：

隐式原型默认指向构造函数的显示原型，显示原型默认空object

**instanceof**

```javascript
var b= new B();
b.__proto__ == B.prototype;//是判断条件也是实例化方式，迭代方式是proto = __proto__.__proto__
B.call(b);// new的核心。
```

**isPrototypeOf**

```javascript
B extends A;
B.__proto__ == A;//判断条件，迭代方式是proto = __proto__.__proto__
//继承方式：
B.prototype.__proto__ = A.prototype;
B.__proto__ = A;
```

上述instanceof和isPrototypeOf的赋值过程通过Object.setPrototypeOf实现（obj的原型=对象）：

```javascript
Object.setPrototypeof = function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
```

**综上所述**：instanceof只有静态属性继承查找，在继承方面少了一个实例继承实例，检查的是**构造函数的原型是否在实例的原型上**；isPrototypeOf检测的是**父级对象是否在子级对象的原型链上**。

[源码](https://aaron-bird.github.io/2020/04/17/instanceof%20%E4%B8%8E%20Object.isPrototypeOf%20%E7%9A%84%E5%8C%BA%E5%88%AB/)

题目：

```javascript
class A{};
class B extends A{};// B.__proto__=A和B.prototype.__proto__=A.prototype
let b = new B();// b.__proto__=B.prototype
// 解答
A isPrototypeOf(B);//true因为B.__proto__==A
A isPrototypeOf(b);//false因为b.__proto__==B.prototype而不是A，而在B.prototype这条原型链上没有单纯的A
B isPrototypeOf(b);//fasle因为b.__proto__==B.prototype而不是B，而在B.prototype这条原型链上没有单纯的B
b instanceof B;//true因为b.__proto__==B.prototype
b instanceof A;//true因为b.__proto__==B.prototype，在B.prototype上查找，B.prototype.__proto__=A.prototype
B instanceof A;//false因为B.__proto__==A，而不是A.prototype，B隐式原型链和A的所有原型链上都没有A.prototype
```

### call()和apply()的区别

apply和call的功能是一样，都是传参执行函数，然后this指向参数，只是传入的参数列表形式不同。apply最多只能有两个参数：新this对象和一个数组argArray。call则没限制。

### 全局函数eval()

eval()只有一个参数，接受一个**js代码的字符串形式**。

如果传入的参数不是字符串，它直接返回这个参数。

如果参数是字符串，它会把字符串当成javascript代码进行编译。

1. 如果编译失败则抛出一个语法错误（syntaxError）异常。
2. 如果编译成功，则开始执行这段代码，并返回字符串中的最后一个表达式或语句的值。
3. 如果最后一个表达式或语句没有值，则最终返回undefined。
4. 如果字符串抛出一个异常，这个异常将把该调用传递给eval()。

### null，undefined或undeclared

**null **表示"没有对象"，即该处不应该有值，转为数值时为0。

1. 作为函数的参数，表示该函数的参数不是对象。
2. 作为对象原型链的终点。

**undefined** 表示应该有一个值但还没有定义，转为数值时为 NaN。抽象的说就是缺少字面量。

1. 变量被声明了，但没有赋值时，就等于 undefined。
2. 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
3. 对象没有赋值的属性，该属性的值为 undefined。
4. 函数没有返回值时，默认返回 undefined。

**undeclared** 表示js语法错误，变量没有申明也没有变量提升直接使用，js无法找到对应的上下文。

### ==和===

== equality 等同。两边值类型不同的时候，要先进行类型转换，再比较。

=== identity 恒等。不做类型转换，类型不同的一定不等。

### 同步异步

进程同步：就是在发出一个功能调用时，在没有得到结果之前，该调用就不返回。也就是必须一件一件事做,等前一件做完了才能做下一件事

异步的概念和同步相对。当一个异步过程调用发出后，调用者不能立刻得到结果。实际处理这个调用的部件在完成后，通过状态、通知和回调来通知调用者。

### 事件代理/事件委托

事件代理/事件委托是利用事件冒泡的特性，将本应该绑定在多个元素上的事件代理在他们的祖先元素上，尤其在动态添加子元素的时候，可以非常方便的提高程序性能，减小内存空间。把事件委托给祖先元素。

### 事件冒泡

事件按照从最特定的事件目标到最不特定的事件目标的顺序触发。

1. 只有祖先元素绑定事件，从底往上传递
2. 每个元素都绑定，从上（触发事件的最初元素）往底传递

### 事件捕获

事件捕获与事件冒泡完全相反，重最不确定传递到最确定的顺序触发事件。多个函数响应顺序按照函数定义顺序。

```javascript
addEventListener(event, func, useCapture);// 事件名字，函数，是否使用捕获，默认false即使用冒泡
object.attachEvent(event, func);//IE
```

IE的事件模型默认是按冒泡时执行的，所以用 addEventListener 时设置能实现兼容浏览器的效果。

### 如何阻止冒泡

w3c：`e.stopPropagation()`

IE：`e.cancelBubble = true`。**注意**：window.event IE 基本也已经废弃，不能拿来判断浏览器类型。

`return false`加入事件封装函数的底部可以阻止冒泡。还可以阻止大多的事件默认类型。如：1.滚轴事件onmousewheel（默认滚动body），2.键盘事件onkeydown（默认无法输入数字）等等。

### 如何阻止默认事件

w3c的方法是e.preventDefault()，IE则是使用e.returnValue = false，比如：

```javascript
function (e){
    // 阻止默认浏览器动作(W3C)
    if ( e && e.preventDefault ) 
        e.preventDefault();
    // IE中阻止函数器默认动作的方式 
    else
        window.event.returnValue = false;//废弃
    return false//也可以阻止大部分默认事件类型
}
```

**注意**：阻止默认行为不会阻止事件传递。

### 简述javascript中this的指向

**第一准则是**：this永远指向函数运行时所在的对象，而不是函数被创建时所在的对象。

1. 普通的函数调用，函数**被谁**调用，this就是谁。多是window。
2. 构造函数如果不用new操作符而直接调用，this指向window。用new操作符生成对象实例后，this就指向了新生成的对象（new内部代码机制call()）。
3. 匿名函数或不处于任何对象中的函数指向window 。
4. 如果是call，apply等，括号内传入的是谁就是谁。

### 原生对象（内置对象）和宿主对象

**原生对象**是ECMAScript规定的对象，所有**内置对象**都是原生对象，比如：`Math，String，Number，Boolean，Function，Object，Array、Date、RegExp`等；

**宿主对象**是BOM和DOM，**是ECMAScript的执行环境**。

### 基本数据类型和引用数据类型

**基本数据类型**指的是简单的数据段，有5种，包括 `null、undefined、string、boolean、number`；

**引用数据类型**指的是有多个值构成的对象，包括 `object、array、date、regexp、function`等。

**主要区别：**

1. 声明变量时不同的内存分配：前者由于占据的空间大小固定且较小，会被存储在栈当中，也就是变量访问的位置；后者则存储在堆当中，变量访问的其实是一个指针，它指向存储对象的内存地址。
2. 也正是因为内存分配不同，在复制变量时也不一样。前者复制后2个变量是独立的；后者则是复制了一个指针，引用的同一个内存地址，相互影响。
3. 参数传递不同：虽然函数的参数都是按值传递的，但是引用值传递的值是一个内存地址，实参和形参指向的是同一个对象，所以函数内部**对参数的修改会体现在外部**。原始值只是把变量里的值传递给参数，之后参数和这个变量互不影响。

### 深拷贝和浅拷贝

浅拷贝是创建一个新对象，如果是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以**如果其中一个对象改变了这个地址，就会影响到另一个对象**。

深拷贝是将一个对象完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且**修改新对象不会影响原对象**。

```javascript
var a1 = {b: {c: {}};
var a2 = shallowClone(a1); // 浅拷贝方法
a2.b.c === a1.b.c // true 新旧对象还是共享同一块内存
var a3 = deepClone(a2); // 深拷贝方法
a3.b.c === a1.b.c // false 新对象跟原对象不共享内存
```

### 赋值和深/浅拷贝的区别

比较的前提都是**针对引用类型**：

1. 当我们把一个对象赋值给一个新的变量时，**赋的其实是该对象的在栈中的地址，而不是堆中的数据**。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。
2. 浅拷贝：重新在堆中创建内存，拷贝前后对象的基本数据类型互不影响，但拷贝前后对象的引用类型因共享同一块内存，会相互影响。
3. 深拷贝：重新在堆中创建内存，对对象中的子对象进行递归拷贝，拷贝前后的两个对象互不影响。

```javascript
/* 关于赋值和内存的问题 */
/* 引用传递 */
var obj1 = {"name": "zx"}
var obj2 = obj1;/* 引用变量的共享数据，可互相修改属性 */
obj1.name = "xz";

/* 值传递 */
var obj3 = {"name": "zx"}
var obj4 = obj3;
obj3 = {"name:": "xz"}/* 赋值运算覆盖原对象，对象成为垃圾对象，造成引用变量的断裂 */
obj4.name = "y";
```

### 解释下为什么接下来这段代码不是IIFE（立即调用函数表达式）

```javascript
function foo(){
    // code
}()
```

以function关键字开头的语句会被解析为函数声明，而**函数声明是不允许直接运行的**。 只有当解析器把这句话解析为函数表达式，才能够直接运行，怎么办呢？以运算符开头就可以了。

```javascript
(function foo(){
    // code
})()
```

### get和post有什么区别

其实，GET和POST本质上没有任何区别。他们都是HTTP协议中的请求方法。底层实现都是基于TCP/IP协议。区别是一种约定。[三次握手和四次挥手](https://zhuanlan.zhihu.com/p/53374516)

1. get是通过明文发送数据请求，而post是通过密文。
2. get传输的数据量有限，因为url的长度有限，post则不受限。
3. GET请求的参数只能是ASCII码，所以中文需要URL编码，而POST请求传参没有这个限制。
4. GET产生一个TCP数据包；POST产生两个TCP数据包。对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。
5. 通常post用于发送表单，而get获取资源。

### 变量声明提升

通过var声明的变量会被提升至作用域的顶端。不仅仅是变量，函数声明也一样会被提升。当同一作用域内同时出现变量和函数声明提升时，变量仍然在函数前面。

[预编译的存在](https://juejin.cn/post/6844903607066689550)

### document.onload和document.ready

ready表示文档结构已经加载完成（不包含图片等非文字媒体文件），onload表示页面包含图片等文件在内的所有元素都加载完成。

### window.onload和document.onload

window：默认情况下，加载整个页面（包括：图像，CSS，脚本等）时将触发该页面。

document：当DOM准备就绪时可以调用它。

### 支持onload事件的标签

```html
<body>, <frame>, <frameset>, <iframe>, <img>, <link>, <script>
```

### 如何从浏览器的URL中获取查询字符串参数

[CSDN](https://blog.csdn.net/wqq1018893786/article/details/73895250)

### arguments

Javascrip中国每个函数都会有一个Arguments对象实例arguments，它引用着函数的实参，arguments.length为函数实参个数，arguments.callee引用函数自身。

```javascript
function test() {
        var s = "";
        for (var i = 0; i < arguments.length; i++) {
            alert(arguments[i]);
            s += arguments[i] + ",";
        }
        return s;
    }
    test("name", "age");//name,age
```

arguments虽然有一些数组的性质，但其并非真正的数组，只是一个类数组对象。其并没有数组的很多方法，不能像真正的数组那样调用.jion(),.concat(),.pop()等方法。

### "use strict";使用它的好处和坏处

在代码块头部中出现表达式"use strict"; 意味着代码按照严格模式解析，这种模式使得Javascript在更严格的条件下运行。

**好处：**

1. 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
2. 消除代码运行的一些不安全之处，保证代码运行的安全；
3. 提高编译器效率，增加运行速度；
4. 为未来新版本的Javascript做好铺垫。

**坏处**

1. 同样的代码，在"严格模式"中，可能会有不一样的运行结果；
2. 一些在"正常模式"下可以运行的语句，在"严格模式"下将不能运行。

### JavaScript的同源策略

**协议**（protocol），**端口**（如果指定），**主机**（域名）相同的两个页面是属于同一个源。 IE中没有将**端口**加入同源的条件中。 `<script> <img> <iframe>`中的 `src，href`都可以任意链接网络资源，**不遵循通源策略**。

### JSONP的工作原理以及它为什么不是真正的AJAX

JSONP（JSON with Padding）是一个简单高效的跨域方式，HTML中的 script 标签可以加载并执行其他域的 javascript，于是我们可以通过script标记来动态加载其他域的资源。例如我要从域A的页面pageA加载域B的数据，那么在域B的页面pageB中我以JavaScript的形式声明pageA需要的数据，然后在 pageA中用script标签把pageB加载进来，那么pageB中的脚本就会得以执行。JSONP在此基础上加入了回调函数，pageB加载完之后会执行pageA中定义的函数，所需要的数据会以参数的形式传递给该函数。JSONP易于实现，但是也会存在一些安全隐患，如果第三方的脚本随意地执行，那么它就可以篡改页面内容，截获敏感数据。但是在受信任的双方传递数据，JSONP是非常合适的选择。

### 闭包及其使用场景

简单理解为函数嵌套，防止函数名污染命名空间，内部函数引用了外部函数的数据，闭包就是能够读取其他函数内部变量的函数，它的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中，不会在外部函数调用后被自动清除。

**使用场景**

    立即执行函数(func)(参数)：可用于闭包，防止函数名污染命名空间

    原生JS的模块化，与以往导入js不同，这里引用的js都封装在了moduleA中

```javascript
var moduleA = moduleA();
```

将函数作为另一个函数的参数

### 防抖节流

**防抖**：一般输入框等v-model类型，快速的输入多个字符每个字符都响应，滚动滚动条位置频繁响应等等。

**节流**：下拉刷新、上拉加载和按钮频繁点击造成的多次请求类型等等。

解决原理：把请求封装成函数加入一个延时器，如果再次来了请求，清除前一个延时器，再创建一个新延时器。

```javascript
// 简单用法，立即执行
clearTimeout(this.timer);
this.timer = setTimeout(() => {
	this.getSearch({query: value})
}, 1000);

// 高级封装，返回函数
function debounce(fn, interval = 300) {
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    };
}
```

### 有关this的经典题目

```javascript
// 如果你只想执行一次 setInterval 可以使用 setTimeout() 方法
        function Timer() {
            this.s1 = 0;
            this.s2 = 0;
            setInterval(() => this.s1++, 1000);
            setInterval(function () {
                this.s2++; // window对象，无s2属性
            }, 1000);
        }

        var timer = new Timer(); // +1
        setTimeout(() => console.log('s1: ', timer.s1), 3100); // +1
        setTimeout(() => console.log('s2: ', timer.s2), 3100); // +1

        // s1: 3
        // s2: 0
```
