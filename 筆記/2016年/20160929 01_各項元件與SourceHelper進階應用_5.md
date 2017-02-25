

1. 當 Case 完全獨立

   當一個自定義的方法參數跟原 GetList 相同，可以透過 CustomList 去呼叫自定義的方法，不用做 _BLL、Service。但自定義的方法超出這個範圍，就要考慮 DAO、BLL、Service 一層層往上做上去。

| 方法           | 用途       | 參數                                       |
| ------------ | -------- | ---------------------------------------- |
| Custom       | 自訂實體取得   | T condition                              |
| CustomList   | 自訂實體集合取得 | T condition, int size, int index, string userCondition, string userOrder |
| CustomeCount | 自訂個數取得   | T condition, string userCondition        |

2. 處理資料還會再考慮，BLL 擴充方式會有 Before 和 After、DAO 只有 After。

   - 在 _BLL 裡，命名為 '方法+Before' (舉例：ReplyBefore)，在新增資料庫之前做一些處理；
     方法 'InsertAfter' 會長得如下 (再參考方法 Modify 定義)

     ```c#
     public void InsertAfter(ProductLine data, Dictionary<string, string> output)
     {
       // 參數 Dictionary<string, string> output，新增之後要再做甚麼？最常做的是寄信
     }
     ```

   - 在 _DAO 裡，方法 'InsertAfter'：新增之後要再做甚麼事情 (寄信或回傳的值要再處理)。

     ```c#
     public void InsertAfter(ProductLine data, Dictionary<string, string> output)
     {
       // 參數 Dictionary<string, string> output，用來接 SPC 回傳的值(機率不高, 可能會發生, 譬如在兩個不同的資料庫)
     }
     ```

     ​