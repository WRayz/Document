來源：[JavaScript 物件導向介紹](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)

1. 在**物件導向的架構**中，每個物件都具有收取訊息，處理資料以及發送訊息給其他物件的能力。

2. **相關名詞**

   | 英文            | 中文描述                                     |
   | ------------- | ---------------------------------------- |
   | Class         | 定義了物件的特性                                 |
   | Object        | 相對於描述性的 class，object 可以視為一個真實存在的個體。      |
   | Property      | Object 具有的屬性                             |
   | Method        | Object 具有的能力                             |
   | Constructor   | 以一個 method 的狀態存在於 class 中，用來初始化物件的 method |
   | Inheritance   | 繼承；指的是一個 class 可以承繼在其他 class 中規範的屬性及能力   |
   | Encapsulation | 封裝；Class 規範了其相關物件該有哪些屬性，而method則律定了該如何執行 |
   | Abstaction    | 抽象化；藉由模擬方式以物件等機制來描述現實世界                  |
   | Polymorphism  | 多型；不同的class可以具有一樣的method及property        |

3. **JavaScript 的物件導向程式設計**

   - 核心物件：有預先定義了一些如 Math, Object, Array 以及 String

     ```js
     alert(Math.random());
     ```

   - **關於 Class** 

     - JavaScript 是基於 protoype-based language 而設計的。
     - Prototype-based programming 是一種特殊的物件導向模型。它並**沒有 class 的設計**，取而代之的，reuse 的概念是藉由將現有 object 做為 prototype 的方式來達成 ( 與其說是繼承，或許更近於複製 )。
     - 某個程度上可以把 function 看作 class。
     - 建立物件一樣使用 new。

     ```js
     function Person(){}
     var p1 = new Person();
     ```

   - **關於 Constructor**

     - JavaScript 中，function 也取代了 Constructor 這個設計，因此我們並不需要刻意標示出 constructor method，它always 在物件被創建的那一刻被執行。

     ```js
     function Person(){
       alert('Person 物件被實體化');
     }
     var person1 = new Person(); //結果: 彈出警告視窗 'Person 物件被實體化'
     ```

   - **關於 Property**
     同 Java、C# 設計，當物件在執行時，可以使用 this 來代表「自己」；
     在物件外部可使用 Instance.Property 的方式。

     ```js
     function Person(gender){
       this.gender = gender;
       alert('Person 被實體化');
     }
     var p1 = new Person('Male'); //結果同上, 一實體化立即彈跳警告視窗 'Person被實體化'
     alert('p1 is a ' + person1.gender); //結果: p1 is a Male
     ```

   - **關於 Method** 

     - 邏輯上來說，method 有著類似 property 的概念，不同的是 method 是可執行的函式，在物件外部使用一樣有 Instance.Method() 的方式。在 JavaScript 定義 method 的時候，要把他們連接在 prototype property 上。（prototype 可再參考另一篇 [20160909 prototype](C:\Users\RayWu\Documents\YezzLearningLog\20160909 prototype.md)）

     ```js
     //承上程式碼，新增一個method
     Person.prototype.sayHello = function(){ alert('Hello'); };
     p1.sayHello(); //結果: 跳出彈跳視窗'Hello'
     ```

     - method 其實是以 function object 的形式存在 (但他們只能透過物件被使用)。

     ```js
     //承上程式碼
     Person.prototype.sayGender = function(){ alert(this.gender); };
     var p2 = new Person('Female');
     var genderTeller = p2.sayGender;
     p2.sayGender(); // alerts 'Female'
     genderTeller(); //alerts undefined
     alert(genderTeller === p2.sayGender); //alerts true
     alert(genderTeller === Person.prototype.sayGender); //alerts true
     ```

     - 結果得出將method指向給另一個var變數，直接把該變數當作方法呼叫會得到 undefined，跟原來方法比較又為true？true的原因是他們都指向同一個位置，放在prototype那份。想用該變數，在 JavaScript 則會將目前的 物件內容 ( 例如 p2.sayGender()結果 ) 連結到 this 特殊變數上，結果可呼叫一個特殊方法: call 得到。

     ```js
     genderTeller.call(p2); //alerts 'Female'
     ```

   - **關於繼承**

     概念相同，作法
     a. 建立子函式建構式，讓父函式用call叫用自己建構式 ( this )。
     b. new父函式並指派給子函式.prototype（注意子函式的constructor也被指向父函式）。
     c. 調整自己的constructor，重新指派自己給自己的prototype.constructor。
     d. override父函式的方法。

     ```js
     //建立父函式
     function Person(){};
     Person.prototype.walk = function(){ alert('I am walking'); };
     Person.prototype.sayHello = function(){ alert('Hello'); };

     // 1. 建立子函式建構式: "複製"父函式建構式 
     function Student(){ Person.call(this); } 
     // 2. 繼承父函式: new父函式並指派給子函式, 就"複製"整份父函式的prototype給子函式
     Student.prototype = new Person();
     // 3. 調整子函式prototype.constructor指標給自己
     Student.prototype.constructor = Student;
     // 4. override 父方法sayHello()
     Student.prototype.sayHello = function(){ alert('Hello, I am a student.'); };
     // 5. 子函式新增一個方法 sayGoodBye()
     Student.prototype.sayGoodBye = function(){ alert('Bye~'); };

     var s1 = new Student();
     s1.sayHello(); // 得到 override 後的 alerts "Hello, I am a student."
     s1.walk(); // 得到 父函式的walk方法結果 alerts "I am walking"
     s1.sayGoodBye(); //得到 alerts "Bye~"

     //確認繼承
     alert(s1 instanceof Person); // true
     alert(s1 instanceof Student); //true
     ```

     > [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
     >
     > 用來測試一個對象在其原型鏈建構函式上使否具有prototype屬性。
     >
     > sync : object ( 要檢測的對象 )  instanceof constructor (某個建構函式)

   - **關於封裝**

     在繼承範例，Studenet不知道Person的walk方法怎麼實作，但仍然可以使用，這情況即為 JavaScript 的封裝。

   - **抽象化**
     仍然很抽象，目的是用來解決現有問題的重要機制。可藉由 inheritance (特殊化 specialization) 或 composition (物件合作)來達成。

     JavaScript Function class 繼承 Object class。而 Function.prototype property 也是來自 Object (composition 的概念)：


   ​

4. **整理要點**

   a. function 代表 class 也代表 constructor 也代表 method。

   b. 透過 prototype，建構式的 constructor 可在外部新增函式。

   c. 繼承概念跟 Java 相同，作法 Java 用 super() 叫用父建構子，JavaScript 使用 父.call(this) 叫用。
   　但 method 的繼承不同於 Java 繼承後可直接叫用，在 JavaScript 需另外用 new 將父函式 給 子函式，
   　接著子函式再修正自己 constructor 的指標給自己。

   d. 封裝不同於Java使用 get/set 針對屬性封裝，JavaScript 使用繼承達到封裝。

   ​