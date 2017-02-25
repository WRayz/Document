1. Error msg：無法辨認的屬性 'schema' 請注意，屬性名稱必須區分大小寫。
   ![](Images\2016-09-20_104525.png)

   原因：重點在 "無法辨認的屬性" => deleteTable改標籤模式了。
   ![](Images\DeleteTable.png)
   資料表刪資料要刪連動資料的時候，就指定連刪的entity，條件有：相同條件、附加條件。

   ```c#
   <deleteTable>
   	<add type="連刪的entity名稱">
   		<keyMapping>
     			<add source="本身entity的欄位" target="連刪entity的欄位">
     		</keyMapping>
     		<conditions>
     			<add key="連刪entity的欄位1" value="條件值">
     			<add key="連刪entity的欄位2" value="條件值">
     		</conditions>
   	</add>
   </deleteTable>
   ```

2. 跨網域的問題 XMLHttpRequest cannot load
   ![](Images\XMLHttpRequest cannot load.png)
   原因：不同 port 就要設定跨網域允許
   解決：到該 Service 的 Web.config 加入 permission

   ```c#
   <system.webServer>
     <httpProtocol>
       <customHeaders>
         <add name="Access-Control-Allow-Origin" value="*" />
         <add name="Access-Control-Allow-Headers" value="x-session-token, x-function" />
       </customHeaders>
     </httpProtocol>
   </system.webServer>
   ```

3. 使用 Postman 測試 GetList 得到 error msg 如下：

   ```tex
   System.Reflection.TargetInvocationException: 引動過程的目標傳回例外狀況。 ---> System.NullReferenceException: 並未將物件參考設定為物件的執行個體。
      於 Service.GenericService.GetList[T](GenericOption option, UserLogin user) 於 e:\Project\Yezz\SCMS\APPSCMSService\APPSCMSService\GenericService.cs: 行 184
   ```

   原因：有條件沒有放值
   解決：比如 export 條件補上 {Type:"", Name:""} 

4. Virtual 虛擬的概念：
   當一張資料表紀錄的資料對 Service 可以是多個不同的實體 ex: 性別、國籍；該實體即可作為虛擬實體。

5. 升級測試

   - 目前的專案都從分支 upgrade 拉下檔案，有改變到的是 SourceHelper，主要影響到的是 Service，有兩點：
     a. Entity.Config 的 deleteTable 標籤有變動如上

     > 使用 postman 測試，目的最主要是可以很快就知道 entity.config 有沒有問題。

     b. 檔案是 _BLL 或 _DAO 的也有修正，要測試一下。

     > 剩下來回到介面去測，有BLL / DAO的，用介面需要注意

   - 前端環境的部分，也有做些更新，影響到的 Core，要切分支到 upload，沒有即 develop；
     LMSService 要還原到更新環境為 YEZZ 之前。
     PWPService 跟簽核有關，但目前沒動，測試時有碰到可能會遇到問題。




