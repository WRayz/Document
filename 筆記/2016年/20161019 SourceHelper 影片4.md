

Modify 引數講解：

- plan：影片 26 末，使用時機在 ModifyBySql 而且要 Insert 一對多的資料進去。以往是要寫一份 SPC，如今版本，如果不用轉陣，就可以用這引數。不指定的話會自己去 run store procedure。
- user 代表建檔人員，Service裡就必須有對應的 [User]
- 在 PWP 裡面的Modify 方法，有一個 option 引數，當加入 multi: true，就會跑多筆；若加入 sql: true，就會自動將 Modify 改為 ModifyBySql



聽不懂的地方：

1. 影片25分，講解 Modify 使用 parameter 的時機，在於 Modify 調用的 Entity 本身沒有其 property 所以使用。
2. 影片 26 末，講解 Modify 使用 plan 的時機，需要實作練習。