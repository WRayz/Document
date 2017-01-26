using ConsoleApplication1.Moduels;
using System;
using System.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        class MyObject
        {
            public string name { get; set; }
        }


        static void Main(string[] args)
        {
            // 利用Entity FramWork 準備好資料來源
            var db = new FabricsEntities();
            // 利用 LINQ 基本寫法, 結果自動變成一個物件, 透過型別推導, a 從等號右邊自動得到型別
            var a = from p in db.Client
                    select p;

            // var query2 = (from p in db.Client orderby p.FirstName select p); // 用LinQ語法, 型別就是 IOrderedQueryable<Client>            
            // query2 = query2.Take(10);// 錯誤結果Take結果型別是IQueryable<Client>, 無法給型別 IOrderedQueryable<Client>
            // 解法:
            var query2 = (from p in db.Client orderby p.FirstName select p).AsQueryable(); // 用LinQ語法, 型別就是 IOrderedQueryable<Client>            
            query2 = query2.Take(10);

            var query3 = db.Client.OrderBy(p => p.FirstName).Select(p => p); // 用Lambda, 型別就是 IQueryable<Client>
            query3 = query3.Take(10);

            
            //var query = (from p in db.Client orderby p.FirstName select p).AsQueryable(); // 校能不好, 用追蹤器會發現是全部資料都選
            var query = (from p in db.Client
                         orderby p.FirstName
                         select new         // 利用匿名物件調教, 只選出要顯示的部分即可
                            {
                                p.FirstName,
                                p.LastName
                            }).AsQueryable();

            query = query.Take(10);
            Console.WriteLine("第一種:");
            foreach (var item in query)
            {
                Console.WriteLine(item.FirstName + item.LastName);
            }

            // 或者另一種用 Lambda 寫法
            var query4 = db.Client.OrderBy(p => p.FirstName).Select(p => new
            {
                p.FirstName,
                p.LastName
            });

            query4 = query4.Take(10);
            Console.WriteLine("\n第二種: ");
            foreach (var item in query4)
            {
                Console.WriteLine(item.FirstName + item.LastName);
            }



            //int[] source = new int[] { 0, -5, 12, -54, 5, -67, 3, 6 };
            string[] names = { "Tom", "Dick", "Harry", "Mary", "Jay" };

            var a2 = from p in names
                     where p.Length > 3
                     select new   // 利用匿名物件, 讓 a3 型別就是此匿名物件, 裡面的 name 透過型別推導自動得到 string
                     {
                         name = p
                     };

            var a3 = from p in names
                    where p.Length > 3
                    select new MyObject // 利用具名物件, 讓 a3 型別就是 MyObject
                    {
                        name = p
                    };

            //var b = names.Where(p => p.Length > 3).Select(p => new MyObject { name = p });

            //foreach (var item in b)
            //{
            //    Console.WriteLine(item.name);
            //}
        }
    }
}
