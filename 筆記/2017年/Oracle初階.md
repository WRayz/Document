# Oracle

---

## 檔案結構

- Database 服務
- Listener
- TNS

## Table

- PK命名要寫
- TEMP TABLE 不像 MSSQL 會在一次的 Transaction 自動刪除，而是保留

## 指令

- INSERT/UPDATE/DELETE 一定要加 commit，MSSQL只有在TRANSC BEGIN-END 才要commit.
- TEMP TABLE：commit preserve 保留/ commit delete 刪除。