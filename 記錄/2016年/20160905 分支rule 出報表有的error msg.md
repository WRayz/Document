2016/9/5

**分支rule**
hotfix是正式區上的bug，緊急開的分支。
現在開給我的需求都會叫做是feature/XXXX。

**偵錯訊息**

1. The document has no pages.
   新增「採購單」欄位時，出現同「員工請假報表」一樣的問題，同Jerry反應在下載採購表單出現的訊息。

   - 一開始誤以為是DB沒有撈到值，實際上DB沒有值的錯誤訊息會更明確說撈不到資料，跟此訊息不同。


   - [ 問題原因 ]：The application must be able to read embedded resources from the itextsharp assembly. 在目前的專案，往往是在產生報表.xml裡，使用的標籤錯誤 或 標籤所指定的地方沒有值。

   ![](Images\2016-08-26_084715.png)

   ​