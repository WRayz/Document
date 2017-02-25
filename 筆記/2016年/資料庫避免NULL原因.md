2016/9/5

專案範例教學時，Oliver提到資料表的值盡量不要有NULL，因為資料庫能處理NULL的方式很少。

幾個找到的狀況：

1. https://www.ptt.cc/bbs/Database/M.1369235271.A.6B0.html
   如果沒有值，有可能是 NULL 或是 ' ' ...這樣判斷是否有值時都要加 TRIM ...
   在CASE裡面，跟NULL比較的欄位回傳值是 NULL，不是 true、false。

   ```sql
   --錯誤
   case TRIM(ROWDATA.sex)
         when '1' then dbms_output.put_line('男人');
         when '2' then dbms_output.put_line('女人');
         when NULL then dbms_output.put_line('無值'); --永遠到不了這一行
         else dbms_output.put_line('錯誤');
     end case;
   ```

   ```sql
   --正確
   case NVL(TRIM(ROWDATA.sex),'NULL') --NULL需放到這裡判斷
         when '1' then dbms_output.put_line('男人');
         when '2' then dbms_output.put_line('女人');
         when 'NULL' then dbms_output.put_line('無值');
         else dbms_output.put_line('錯誤');
     end case;
   ```

2. http://www.wired.com/2015/11/null/
   之前外國有個新聞，有人名字為NULL，結果資料庫會視為'IS NULL'，以致每次買機票都會有問題。

3. http://blog.kejyun.com/2012/12/Tips-For-Use-MySQL-With-High-Performance.html#datatype_notnull
   若非必要儲存NULL的資料，否則要盡可能的把資料欄位設定為NOT NULL，資料庫很難最佳化有NULL資料欄位的查詢，可以NULL的資料欄位需要更多的儲存空間，資料庫還需要對其進行特殊處理，而當有NULL資料欄位使用 '索引（INDEX）' 的時候，每一條的索引紀錄必需要額外紀錄資料，導致查詢時索引的效率降低。

   ```tex
   若真的要儲存NULL，在不影響原有的資料的情況下，可以考慮用0、特殊值...等等之類的值去代替，可以用來區別是否為NULL。
   ```

   ​