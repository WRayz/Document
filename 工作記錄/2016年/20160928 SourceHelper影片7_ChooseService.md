## 元件：ChooseService

ChooseService 透過一個 json 和 method 就可以進行查詢 (也可以在彈跳視窗裡)，

1. 【單選】
   下面範例為 EmployeeList，先用 ChooseService.open() 呼叫彈跳視窗，可查詢和顯示資料。

   ![彈跳視窗](Images\2016-09-28_175432.png)

   ```javascript
   //彈跳視窗
   function dialog(){
    ChooseService.open('EmployeeList', go);
   }
   ```

   第一個參數，是放一個 json 檔檔名，檔案定義在 Choose 資料夾底下的 EmployeeList.json 裡 (內容如下)。

   ```js
   //示範為 EmployeeList.json, 為了方便註解, 文件暫時用 js 格式
   {
     "DIALOG_TITLE": "員工資料選擇",
     "CONFIG_PATH": "EmployeeListOption",	// 查詢的點, '查詢'有一個定義的json, 
       									// 在Search資料夾底下的EmployeeListOption.json檔
     "CHOOSE_WIDTH": "col-md-3",
     "COLUMN_INFO": [ //呈現的欄位資訊
       { "COLUMN_NAME": "EMP_NO", "COLUMN_DESC": "員工編號", "WIDTH_CLASS":"col-md-4", "DATA_CENTER":true},
       { "COLUMN_NAME": "CHINAME", "COLUMN_DESC": "員工姓名", "WIDTH_CLASS":"col-md-5"}
     ],
     "GET_METHOD": // 查詢取資料
     {
       "NAME": "GetList",
       "PARAMETER": ["Employee", { "condition": { "IS_LEAVE": "N"}, "system": "HRMS"}]
     },
     "COUNT_METHOD": // 查詢資料的筆數
     {
       "NAME": "GetCount",
       "PARAMETER": ["Employee", { "condition": { "IS_LEAVE": "N"}, "system": "HRMS"}]
     }
   }
   ```

   > 如果有遇到不同地方做查詢也有跟 EmployeeList.json 一樣的東西，那就下一個 "CONFIG_NAME": "EmployeeList" 納入即可。

   下面為定義查詢的 EmployeeListOption.json 檔，反應在彈跳視窗的查詢元件。

   ```json
   {
     "SEARCH_OPTION": {
       "ENTITY_NAME": "Employee",
       "SEARCH_COLUMNS": ["EMP_NO", "CHI_LAST_NAME", "CHI_FIRST_NAME"],
       "TEXT_DESC": "員工編號或姓名"
     }
   }
   ```

2. 【多選】

   ```js
   function dialog(){
     ChooseService.open('EmployeeList', go, { mutli: true, data: vm.data, condition:{'可再放其他的系統做查詢'} });
   }
   ```

   在 Employee.json 就要多下一個 key，value 用一個陣列，放的是條件必須相等的欄位名稱。欄位可以多個

   ```json
   "KEY_COLUMNS": ["EMP_NO", ""]
   ```

   ​

​	



