2016/08/29

## 問答

問：路由設定分 [虛擬]、[一般]，呈現樣子? 甚麼時候使用? 
答：路由會在routeReslover設定；
​	[虛擬]設定完的位址並不會開view，[一般]設定後才會開view
​	a. 呈現在網址上 [虛擬別名] / [一般別名]
​	　看起來跟工作目錄的上下分層很像，Report為[虛擬]，LeaveReport.html為[一般]
​	　![](Images\2016-08-29_120720.png)
​	　在網址呈現：/hrms/report
​	　但 [虛擬] 並非為必要設定，不設 [虛擬] 只設 [一般]，路徑是 [Report+LeaveReport.html] 也可以。
​	b. 通常一個目錄底下會有很多個頁面要開，那再開 [虛擬] ，分層也較清楚。

問：limit.TB_FUNCTION_TREE欄位FUNCTION_STATE對應到誰?
答：limit.TB_ROUTE_CONFIG 欄位 ROUTE_NAME

## 學習

1. 早會完後得到指示，PDF若元件重新安裝還是出不來，就先做Excel。
   製作完.xml測試得到error訊息![](Images\2016-08-29_145625.png)

   解決：Excel報表產生，Nuget需安裝

   ````cs
   Install-Package EPPlus -Project BusinessLogic -Version 4.0.3.0
   ````

2. 產生Excel所需要設定的.xml標籤，紀錄如下。

   ````xml
   <file>
    <sheet name="報表名稱">
     	<!--橫式用Landscape-->
       <page orientation="Landscape"></page>
       <margin top="1.5"></margin>
       <setting>
         <column id="欄位號碼" width="寬度"></column>
       </setting>
       <report>
         <!--不同列就不同row-->
         <row index="列數號碼"> 
           <column index="欄位號碼">欄位名稱</column>
         </row>
         <!--要撈的資料都放在<data>裡面-->
         <data>
           <data-column>#[資料表欄位]#</data-column>
         </data>
       </report>
    </sheet>
   </file>
   ````

3. 上周的PDF Export的錯誤，data有值但傳到FileHelper.PDF的Export方法卻沒值，Sean找出**真因是xml錯誤**。
   ![](Images\2016-08-26_113400.png)
   ![](Images\2016-08-26_113434.png)

   產生PDF所需設定的.xml標籤，紀錄如下

   ````xml
   <file>
     <page orientation="Landscape" size="A4"></page>
     <margin top="公分" bottom="公分"></margin>
     <report>
        <paragraph>PDF標題</paragraph>
        <data font-size="公分">
          <data-header>
            <table-row font-size="公分">
              <table-cell align="">欄位名稱1</table-cell>
              <table-cell align="">欄位名稱2</table-cell>
            </table-row>
          </data-header>
          <data-body>
            <!--下面寬度一定要設,有別於Excel是用百分比-->
            <data-column header="欄位名稱1" width="欄位寬度%" >#[資料表欄位]#</data-column>
          </data-body>
          <data-footer>
            <table-row font-size="公分">
              <!--
   			若是呈現單行，合併欄位數要等於上面欄位數目
   			若要在同一行，則合併欄位數"總和"要等於上面欄位數目	-->
              <table-cell colspan="合併欄位數1"></table-cell>
              <table-cell colspan="合併欄位數2"></table-cell>
            </table-row>
          </data-footer>
        </data>
     </report>
   </file>
   ````

4. Elaine建議將FileHelper裝回beta版；

   ````cs
   Install-Package FileHelper -Project BusinessLogic -Version 2.3.0.0-beta
   Install-Package FileHelper -Project ModelLibrary -Version 2.3.0.0-beta
   ````

   重新測試後，錯誤。

   > System.IO.FileNotFoundException: 無法載入檔案或組件 'TSAHelper.Infrastructure, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null

   ​