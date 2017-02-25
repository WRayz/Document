2016/09/08

### 今日問答

ps：有缺漏、不對的地方還請協助指正。Thanks

1. DB

   - form有一張 form.TB_COST_ANALYSIS_FORM 放紀錄申請的表單，屬於非正式（動作可退回、刪除），資料特性未必為真，過程中會有不同狀態
   - sms有一張 sms.TB_COST_ANALYSIS_INFO 放已核准的表單，屬於正式（動作可撤銷、駁回），資料特性為真，結果只有一種狀態。

   問：兩張表格重複欄位有26個，為何不在form表單多一個欄位判斷是否核准？

   答：設計這兩張表格主要以流程性來分，如上所述；再看非正式的表單，多一個核准欄位Y/N，假設被退來回10多次，不只該欄位要修改10多次，還有其他資料狀態的 '成立/不成立' 需要邏輯判斷做修改，這樣的作法過於複雜；以流程性這點出發，兩條平行線兩個世界不互相干擾，就可以單純許多。－［時間←→空間］


2. Services

   問：entity 'CostAnalysis'(簽核) 要做的計算跟 'CostForm'(申請) 大致相同，資料部分若以4個欄位做判斷，得到資料為相同，為何不用關聯讓 'CostAnalysis' 取用 'CostForm' 的計算，避免程式碼重複？

   答：a. 兩份entity的流程性定義不同如DB裡所述
   　　b. 兩份entity做關聯，出來的資料有26筆再重複且變得龐大，拖垮效率。
   　　c. 避免程式碼重複，要拉出Code應考慮到三層（DB、Service、AP）再加上Excel/PDF表單。

3. Git OverFlow：

   補充左邊藍線，Develop 完後進 SIT 測試，UAT 為使用者驗收，Production 為產品正式上線
   ![](Images\IMG_4025.JPG)
   ​

4. 其他
   之前課程有說的，寫Code避免 'if'、'迴圈'、'DB Cursor' 的原因，這會造成發散增加程式複雜度。



補充：
[Git 版本控制 branch model 分支模組基本介紹](https://blog.wu-boy.com/2011/03/git-%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6-branch-model-%E5%88%86%E6%94%AF%E6%A8%A1%E7%B5%84%E5%9F%BA%E6%9C%AC%E4%BB%8B%E7%B4%B9/)