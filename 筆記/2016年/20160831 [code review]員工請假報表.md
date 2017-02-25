2016/08/31

## 修改

1. Store Procedure：

   - 拿掉中文姓名的組合顯示(那屬於view)
   - 將日期條件篩選資料的WHERE拉出來做在合併資料表之前(效率問題) 
   - 用ISNULL()將NULL請假時數改為數字0 

2. Service：

   - 拿掉DAO的logic(DataAccess=DB，只做資料存取)　

   - 中文姓名組合在員工entity已經有做，使用relation關聯進來取用即可。

     > 實作遇上Stack Overflow Exception，目前先在class組合中文姓名給view用，推上Bitbucket
     > 問過 Sean 但未解，後來問 Elaine．確認的部分
     >
     > 1. 看employee的階層也沒有太多，所以開始確認資料
     > 2. Employee entity 資料來源來自 hr.VW_EMPLOYEE_INFO
     > 3. SELECT hr.VW_EMPLOYEE_INFO 沒有資料
     > 4. 新增 
     >    hr.TB_ORG_INFO 資料 (YEZZ00004 技術二部 YEZZ00006 YZ035 3) 
     >    hr.EMP_ORG_INFO 資料 加入現有的員工編號
     > 5. SELECT hr.VW_EMPLOYEE_INFO 有資料
     > 6. Postman測試，一樣是 StackOverflowException 
     > 7. 把entity Employ跟ORG的relation註解掉再重新測試 => 有結果
     > 8. Elaine確定是StackOverflowException問題，暫時不推這版本。

   - class應該多出34個屬性(17種假別的Day、17種假別的Hour) 

   - 天/時屬於view就做在呈現的xml裡 

   - 沒用到EXCEL就刪掉EXCEL

3. AP：刪掉EXCEL

## 觀念

1. Service架構有三層，各自又再扮演MVC的腳色，同樣的限制也是套用在這三層上

2. DataAccess = Database的腳色，單純做資料存取。
   不要在DataAccess做資料更改的事情，以後若有人使用同一份DAO，出來結果卻會與原資料不同，造成更多工作。

3. 資料的OUTER JOIN應該多考慮筆數問題，思考步驟應為 先篩選資料(減少筆數)再OUTERJOIN。

4. 資料有Logic的判斷，就做在BLL層。

5. foreach loop應該少用，一樣考慮筆數問題。

6. 資料處理 (重組或組合) 也可做在ModelLibrary底下類別，類別屬性若只有做 get，那Entity.config不必特地做一個欄位來對應，只有要 set 屬性，才需要在Entity.config做欄位來mapping。

7. View的定義，只要是顯示在user眼前的東西就是View，以此次報表為例，[天]、[時]就是View。

8. 延伸上點有一個觀念修正，一開始我會認為把時數格式化成 X天X時，不就是一個欄位？
   但阿壹/Elaine 卻一值強調那是兩個欄位，因為 [天]、[時] 是兩個不同的東西。

9. 延伸4. Sql指令裡面會用到的欄位組合重新呈現成一個欄位，這樣也算是View，都盡量不要寫在Database裡。

   ​


### 忘了問..

問：為什麼資料庫用編號做了order by ，到Service變成姓名排序?
