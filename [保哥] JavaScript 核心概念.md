***JavaScript 可以指向一個變數並會在執行時期擁有型別***

[TOC]

## JavaScript 是個物件導向程式語言

- 所有東西都是物件型別，除了原始型別 

  number、string、book、null、undefined


- Run Time：一個瀏覽器被打開到關閉，即 JavaScript 執行的時間

## JavaScript 物件是個容器

- 每個JavaScript 物件僅包含
  - 屬性
    - 物件 (原始型別、物件型別)
    - 函式

> JavaScript 陣列也是物件

## JavaScript 物件式個雜湊陣列 (HashMap)

- JavaScript 取得物件內容的方法

  ```javascript
  var car = {
    'name': 'BMW',
    'start': function(){ return "OK"; },
     '001': 5
  };
  ```

> JavaScript 是 call by value reference (兩者兼併)



## 物件、變數與型別之間的關係

- 物件
  - 記憶體中的資料
  - 僅存在於執行時期
- 變數
  - 用來儲存物件的記憶體位址 (指標)
  - 在開發時期進行宣告 (使用 var 關鍵字)
- 型別
  - 用來表示物件的種類
  - 不同型別可能會有不同的預設屬性與方法

> 原始型別不能擴增屬性，就算到 prototype 去硬增加屬性，還是不能改該屬性的值。要再透過物件型別的特性．．．重點是這很少人用。

```tex
重要：
JavaScript 只有 原始型別 and 物件型別。
有加 var 的叫變數, 沒加 var 的都叫屬性。
變數沒有值，只有記憶體位置。
存取不存在的屬性，預設回傳就是 undefined。
```




## 變數與屬性之間的關係

- 屬性

  - 物件的屬性可以是任意物件 (含原始型別)

  - 兩種指派方法

    ```javascript
    window.myKey = 1;
    window['myKey'] = 1;
    ```

  - 問題：

    ```javascript
    // 網路上會找到下面方式判斷屬性是否存在, how does it work?
    // 假設 obj 是物件
    obj.c = 3;
    delete obj.c;
    typeof (obj.c) == 'undefined';

    // A: 實際上這述句無法判斷屬性是否存在, 純粹誤打誤撞
    //    由於存取不存在的屬性，預設回傳就是 undefined
    //    真正做法如下
    if ('c' in obj) { /*CODE*/ }
    ```

    ​

- 變數

  - 用來儲存物件的記憶體位址 (指標)

  - 在開發時期進行宣告 ( 使用 var 關鍵字 )

  - 預設會變成物件容器的屬性 (但無法刪除) 

    > 預設的物件容器就是當下的瀏覽器範疇，window 全域物件

    ```javascript
    "w" = 1;
    // 請問 "w" 是甚麼?
    // A: 屬性，是全域物件 window 的屬性
    ```

> JavaScript 處理數字是用浮點數，精確度到小數點21位，要馬轉成 10進位整數值來算，不然數字大容易有誤差。建議金錢不要在 JavaScript 處理。



##Boolean

- 任何兩個物件相比，永遠 false。

  ```javascript
  // 陷阱題
  var a = {};
  var b = a;
  a == b;
  // A: true. 因為這裡只有一個物件, a 跟 b 都指向 {}
  ```




## Truthy 與 Falsy

- 除了 false, 0, "", null, undefined, NaN 六個是 false，其它為 true。



## null

- 有點雷，保哥建議，永遠不要用。JavaScript 的 bug..

  ```javascript
  // 假設我們要回收 1
  var a = 1;
  a = null; 		// 回收方法 1
  typeof a; 		// 期待 "undefined" 卻是 "object"
  				// => 這是 JavaScript 的原生 bug 

  var a = 1;
  a = undefined; 	// 回收方法 2
  typeof a;		// "undefined"
  ```

- null 不是物件，但型別卻是物件 ("object")

- 是 JavaScript 所有物件的最上層祖先....才能解釋為何物件能夠等於 null 




## RegExp

- 學一次，終身受用。



## JavaScript 物件資料結構

- 所有物件資料都從 根物件 開始 連結 (chain)
- JavaScript 的 GC 自動回收機制是隨時，一沒有連結跟根物件連結就會被回收。




## Scope

在 ES5 以前，var 宣告出的變數 scope 都是按 function 框定，ES 6 多一個 let，宣告出的變數 scope 會以 { } 決定



## Hoisting (提升)

"變數宣告" 跟 "函式宣告式" 往上提。

```javascript
var bn = "PHP";
(function (){
  console.log(bn);
  var bn = "MVC";
  console.log(bn);
})();

// 題目 console.log 結果為何?
// A: undefined , "MVC"

// 原因: 受到 hoisting 影響, 所以程式碼應改為
var bn = "PHP";
(function (){
  var bn;			//所有的 var 都要提到第一行
  console.log(bn);
  bn = "MVC";
  console.log(bn);
})();
```

**對付 hoisting 的雷，就是養成 hoisting 的習慣，將所有 var 宣告提到 function 第一行做宣告。**

```javascript
(function(){
  return test();
  var test = function() { return 1; }
  function test(){ return 2; }
})();

// 請針對 hoisting 方式改寫
(function(){
  var test;							// 此為 var 宣告: 先提
  function test(){ return 2; }		// 此為函式宣告式: 先提
  return test();
  test = function() { return 1; }	// 此為函式表達式
})(); // A: 2
```



## 閉包 (Closure)

兩個特性：

- 要有兩個 function
- **在外層function宣告的變數，可以在內層function取用。**

> 重點觀念：作用域鏈結 (Scope Chain)

練習 5：請利用閉包特性實作計數器功能

```tex
function MyFunc() {
    // YOUR CODE HERE
}
撰寫完成後，必須可以正常執行以下程式碼：
var o = MyFunc();
o.GetCount();  // 輸出 1
o.GetCount();  // 輸出 2
o.GetCount();  // 輸出 3 ( 依此類推 )
...
```

```javascript
function MyFunc(){
  var i = 1;
  return {
   'GetCount': function() {return i++;},
  };
}
```

練習 6：請利用閉包特性實作私有變數的 get 與 set 存取子

```tex
請依據以下範本撰寫一個 MyFunc 函式：
function MyFunc() {
    var obj = {
       a: undefined,
       b: 0
    };

    // YOUR CODE HERE
}

撰寫完成後，必須可以正常執行以下程式碼：
var o = MyFunc();

o.get_a() // 回傳 undefined
o.set_a(3);
o.get_a();  // 回傳 9
o.set_a(4);
o.get_a();  // 回傳 16

o.get_b() // 回傳 0
o.set_b(99);
o.get_b();  // 回傳 99
```

```javascript
function MyFunc() {
    var obj = {
       a: undefined,
       b: 0
    };

    return 
    {
    'get_a': function (){ return obj.a; },
    'set_a': function (p){ 
      if (typeof p === "number") obj.a = p*p; 
      else console.log("Eat number");
    },
    'get_b': function (){ return obj.b; },
    'set_b': function (q){ 
      if (typeof p === "number") obj.b = q; 
      else throw Error("Eat Number"); 
    }
    };
}
```



## 建構式

JavaScript 透過「建構式」建立物件藍圖

- 建構式就是函式，又稱建構式函式

  ```javascript
  var Car = function(name) {
    this.name = name;
    this.slogan = function() {
      return 'Driven by passion. ' + this.name + '.';
    }
  }
  ```

- 透過建構式建立物件，用 new

  ```javascript
  var myCar = new Car('BMW');

  // 解說建構式函式在建立物件時的執行過程
  var Car = function(name) {
    // 此 this 等於本次要被建立的物件實體 (obj)
    // var this = {}; // new 的時候就準備一個空物件
    this.name = name;
    this.slogan = function() {
      return 'Driven by passion. ' + this.name + '.';
    }
    // return this;	// 回傳此物件, ex: myCar 就指向此物件
  }
  ```

- 不用 new 建立物件，則函式裡的 this 代表「根物件」(window)，會汙染根物件

  ```javascript
  var obj = Car('BMW'); 
  window.name; 		// "BMW", 被汙染了
  ```

- 防止豬隊友...建構函式加 this 的判斷

  ```javascript
  var Car = function(name) {
    if(!this === window)
    	this.name = name;
    else 
      this = new Car(name);
    this.slogan = function() {
      return 'Driven by passion. ' + this.name + '.';
    }
  }
  ```

- 問題：上面的例子 myCar 的上一層物件是誰？Car or Car.prototype？

  A: Car.prototype，myCar 是 "繼承" Car.prototype，不是Car喔...Car是建構函式

  ```javascript
  function Car(name) { this.name = name; }
  var o = new Car();
  Object.getPrototypeOf(o) === Car.prototype;	// true
  ```

  ​

## 原型鏈結

- 鏈結順序
  - 0：物件本身擁有的屬性
  - 1：物件內部 \_proto\_ 物件的屬性
    - 繼承自 prototype 的屬性
    - 接著會一直不斷的透過 \_proto\_ 物件找下去，直到最後遇到 Object 物件為止
- 根物件 != Object
  - scope chain 與 prototype chain 是完全不同的東西



## this

- 一定要搭配 new，不然會呼叫到全域this，汙染全域物件。
- apply() 跟 call() 可以讓你決定 this 是誰，把「傳入物件」當成建構式的 this。
  - apply - 建構式.apply(物件, [參數1, 參數2]);
  - call - 建構式.call(物件, 參數1, 參數2...);



## 建議

- 多看 Library，如 AngularJS、jQuery，用今天教的 call by value reference + 畫圖 和 變數、屬性 的辨識方式...解讀 Library。



\1. 我要成為前端工程師！給 JavaScript 新手的建議與學習資源整理

[http://blog.miniasp.com/post/2016/02/02/JavaScript-novice-advice-and-learning-resources.aspx](https://www.google.com/url?q=http://blog.miniasp.com/post/2016/02/02/JavaScript-novice-advice-and-learning-resources.aspx&sa=D&ust=1480182338250000&usg=AFQjCNEFgvRfoxqSb0E1GIsHKhYqDz5wdw)

\2. JavaScript Garden 繁體中文版
[http://bonsaiden.github.io/JavaScript-Garden/zhtw/](https://www.google.com/url?q=http://bonsaiden.github.io/JavaScript-Garden/zhtw/&sa=D&ust=1480182338250000&usg=AFQjCNGBzCIK7uc23eWlfRni3YjgOXlsgg)

\3. Mozilla 開發者網站擁有最棒的 JavaScript 相關教學文件 (中英文都有)
[https://developer.mozilla.org/zh-TW/docs/Web/JavaScript](https://www.google.com/url?q=https://developer.mozilla.org/zh-TW/docs/Web/JavaScript&sa=D&ust=1480182338250000&usg=AFQjCNF2yV-vE08a12HG1MhHOstSHklA1A)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://www.google.com/url?q=https://developer.mozilla.org/en-US/docs/Web/JavaScript&sa=D&ust=1480182338250000&usg=AFQjCNFVFRyTLZUpLpfTCyMHsZC9qN82uQ)

\4. 一道常被人轻视的前端JS面试题
[http://www.cnblogs.com/xxcanghai/archive/2016/02/14/5189353.html](https://www.google.com/url?q=http://www.cnblogs.com/xxcanghai/archive/2016/02/14/5189353.html&sa=D&ust=1480182338251000&usg=AFQjCNFH9JD7FxsO1Ub7s0HQloqGSm9CxA)

---

## 測驗題

練習 1：物件、變數與型別之間的關係

```javascript
// 請問在以下程式碼片段執行的過程中，出現過幾個物件？幾個變數？幾種型別？
var a;
a = 1;
a = "a";
a = "a" + a;
```

![](.\Images\2016-11-26_220217.png)

```javascript
var a = {'a1':1, 'a2':2};
var b = [];
b.push(a);
b.push(a);
b[0]['a1'] = 2;
// 題目: 下面值為多少?
b[1]['a1']

// A: 2
```

這裡栽了一個坑，JavaScript 是 call by value reference 值參考，上面的例子，從頭到尾，**b[0] 跟 b[1] 都同樣指向變數 a，並不是各自產生一個新物件**，a 又指向一個物件 { a1, a2 }，所以當 a1 被重新指派值，那就變了。

```javascript
var a = {'a1':1, 'a2':2};
function test(p){	// p 是此 function scope 的區域變數，用過就會被自動回收
  p.a1 = 2;
}
test(a);
// 題目: 下面值為多少?　
a.a1;

// A: 2，搞懂 JavaScript 是值參考就可以理解.
```

> 一個值參考，也把範疇鏈的觀念帶進來了。

```javascript
var a = 1;
function test(p) {
  p = 2;
}
test(a);
// 題目
a;

// A: 1，注意改的是 p, p 是另一個區域變數, 所以改不到 a
```

```javascript
var a = {x:1};		// 步驟1
var b = a;			// 步驟2
a.x = a = {x:2};	// 步驟3, 關鍵,物件 {x:2} "同時"複製 a 跟 a.x , 步驟1的連線全部消失
					// 觀念在, 這段述句結束以前，a 都還是指向原來的 {x:1} 位址
					// a 指向 {x:2} 要等此述句結束後才會執行
					// 等到述句結束執行後, a 指向 {x:2}, {x:1} 的 x 位址仍是 b.x 指過去
// 題目
b.x;	// {x:2}
a.x;	// 2
```

![](.\Images\2016-11-26_130058.png)

