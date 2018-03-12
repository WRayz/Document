2016/9/9 

建構式和Prototype、閉包

1. 在JavaScript中，function一旦被建立，範疇就是全域；立即函式範疇不同是為區域。
   那麼建立一個物件，在JavaScript裡做了哪些事

   - 使用 new 關鍵字，JavaScript會先建立一個 '空物件'，接著設定物件的原型 為函式的prototype特性所要參考的物件，然後呼叫建構式並將所建立的空物件設為this。接下來依照建構式設定實例上的特性，最後再由prototype補上未設定的特性。

     > 有個狀況要注意，假設 
     >
     > ```js
     > function A(name) { this.name = name; } 
     > ```
     >
     > 不用new的方式要去建立A物件，然後取name
     >
     > ```js
     > var mA1 = A('Ray'); 
     > mA1.name;
     > // 結果: Uncaught TypeError: Cannot read property 'name' of undefined(…) 
     > ```
     >
     > 原因是 mA1.name 參考建構式 { this.name... } 這個 this 所指的是 window 而不是mA1。
     > 另外，若有個函式 tt() 有回傳值，當直接指派給 mA1，mA1會得到值，但不是物件。
     >
     > ※ 另請參考 犀牛書筆記_第四章 > 物件創建運算式
     >
     > ```js
     > //譬如想這樣
     > function tt(){ 
     >   var global = this; 
     >   global.name2 = 1; 
     >   return 1;
     > }
     > var mA1 = tt();
     > mA1; // 得到值: 1
     > mA1.name2; 
     > //結果:Uncaught TypeError: Cannot read property 'name2' of undefined(…)
     > ```
     >
     > 正確做法應該要用 new 讓JavaScript 先建立一個 '空物件'，好讓建構式被參考進來實體化一個物件。
     >
     > ```js
     > var mA2 = new A('Ray'); //new: 先做{} 再放A('Ray') 變成 物件
     > mA2.name;
     > //結果: "Ray"
     > ```

   - constructor特性
     每個透過 new 建構的物件，都會有個 constructor 特性，是參考到當初建構的函式。如上面舉例
     此外，每個函式實體化時，都會在函式實體上以空物件建立 prototype，然後在空物件上設定 constructor 特性，讓每個 new 建構的物件，都可以找到 constructor 特性。

     ```js
     function some(){}
     console.log(Some.prototype.constructor);  //結果: function Some(){}
     ```

     ​

2. 介紹建構式contructor、原型prototype

   ```js
   function Person(name, age){
     this.name = name;
     this.age = age;
     this.toString = function(){ return '[' + this.name + ', ' + this.age + ']'; };
   }
   var p1 = new Person('Ryan', '35');
   var p2 = new Person('Paul', '55');
   p1.toString(); //結果: [Ryan, 35]
   p2.toString(); //結果: [Paul, 35]
   ```

   上面的寫法，在每一次呼叫建構式Person的時候，裡面 toString = 都會建立一個函式(function)實體。
   由於該函式並沒有綁定特定資源，為了節省記憶體，可改寫如下：

   ```js
   function toString(){return '[' + this.name + ', ' + this.age + ']';}
   function Person(name, age){
     this.name = name;
     this.age = age;
     this.toString = toString;
   }
   var p1 = new Person('Ryan', '35');
   var p2 = new Person('Paul', '55');
   p1.toString(); //結果: [Ryan, 35]
   p2.toString(); //結果: [Paul, 35]
   ```

   上面的改法，解決了重複建立"原toString後面函式"的問題，但是在全域範圍，又多了一個物件叫toString。假設 toString這個名稱又到處會被用，那就會被互相影響（複寫）

   想避免這個問題，就可以利用JavaScript函式在定義的時候都有個prototype特性。對建構式Person做一個prototype。

   ```js
    function Person(name, age){
     this.name = name;
     this.age = age;
   }
   Person.prototype.toString = function(){return '[' + this.name + ', ' + this.age + ']';};
   var p1 = new Person('Ryan', '35');
   var p2 = new Person('Paul', '55');
   p1.toString(); //結果: [Ryan, 35]
   p2.toString(); //結果: [Paul, 35]
   ```

   從以上可看出，p1在原來的建構式中找不到toString，就會使用prototype原型。
   其他像 JavaScript 原生物件上，如

   ```js
   Array.prototype.[很多原型特性];
   var a = [];
   a.[可直接使用Array的原型特性];
   ```

   ​

   - 查找特性只有在查找特性，而物件上不具該特性時才會使用原型，如果你對物件設定某個特性，是直接在物件上設定了特性，而不是對原型設定了特性。

     ```js
     function Some(){}
     Some.prototype.data = 10;

     var s = new Some();
     console.log(s.data); // 10

     s.data = 20;
     console.log(s.data); //20 變

     console.log(Some.prototype.data); // 10 不變
     ```

     ​

   ​

其他參考：

[Javascript核心筆記：建構式與prototype](http://oceansnote.logdown.com/posts/2015/02/27/javascript-core-note-constructor)
[函式 prototype 特性](http://openhome.cc/Gossip/JavaScript/Prototype.html)

麒翰開課
