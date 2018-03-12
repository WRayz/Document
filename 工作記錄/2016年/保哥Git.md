續 2016/9/1 Git 學習

### [30 天精通 Git 版本控管 (19)：設定 .gitignore 忽略清單](http://ithelp.ithome.com.tw/question/10138831)

- 在 Git 裡面，是透過 .gitignore 檔案來進行定義「忽略清單」，不過，這僅限於 Untracked file而已，那些已經列入版控的檔案 (Staged file)，不受 .gitignore 檔案控制。


- 這樣的忽略清單，可以透過 GitHub 建立預設的忽略清單。

### [30 天精通 Git 版本控管 (18)：修正 commit 過的版本歷史紀錄 Part 1](http://ithelp.ithome.com.tw/question/10138791) ( reset, amend )

1. 版本紀錄的控管原則：

   - 做一個小功能修改就建立版本，這樣才容易追蹤變更
   - 千萬不要累積一大堆修改後才建立一個「大版本」
   - 有邏輯、有順序的修正功能，確保相關的版本修正可以按順序提交(commit)，這樣才便於追蹤

2. 修改commit需注意的事

   - 只要同一份儲存庫有多人共用的情況下，若有人任意串改版本，那麼 Git 版本控管一樣會無法正常運作。
   - 你可以任意修改某個支線上的版本，只要你還沒「分享」給其他人
   - 當你「分享」特定分支給其他人之後，這些「已分享」的版本歷史紀錄就別再改了！

3. 指令介紹

   |             狀況              |             指令             |
   | :-------------------------: | :------------------------: |
   |        想把最後(最新)的版本刪除        |  git reset --hard "HEAD^"  |
   |    不管做過甚麼事(包含上面的刪除)，就是還原    | git reset --hard ORIG_HEAD |
   |   刪除最新的commit，但留下有變更過的內容    |  git reset --soft "HEAD^"  |
   | 不小心commit，想再改commit訊息或補檔案進去 |     git commit --amend     |

### [30 天精通 Git 版本控管 (20)：修正 commit 過的版本歷史紀錄 Part 2](http://ithelp.ithome.com.tw/question/10139129) ( revert )

1. ​