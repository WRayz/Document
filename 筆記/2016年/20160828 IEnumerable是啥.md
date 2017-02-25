2016/08/28  

### IEnumerable 是啥 ?

參考 
[[C#\][筆記] IEnumerable、IEnumerator 與 IEnumerable、IEnumerator](http://xingulin.tumblr.com/post/48831985749/ienumerable-ienumerator)
[Comparison between List, IList and IEnumerable](http://stackoverflow.com/questions/20160943/comparison-between-list-ilist-and-ienumerable)
[IList vs IEnumerable for Collections on Entities](http://stackoverflow.com/questions/376708/ilist-vs-ienumerable-for-collections-on-entities)

**Objective**：

1. ​
2. 首先我們先檢視 IEnumerable 與 IEnumerable<T> 界面，中文語義上，我們可以理解 IEnumerable 為「資料結構中的資料，是否可被列舉」。
3. 大致上我看懂IEnumerable是甚麼了~但是隨之而來的問題，IEnumerable跟List的差異?
   IEnumerable 主要用來被

結論：

1. 阿壹在 FileHelper 的 ExportList 會用 IEnumerable 不用 IList 單純是依當時所使用，並非IList就不能用。