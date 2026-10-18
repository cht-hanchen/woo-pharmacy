# Presentation

教學簡報與互動學習頁面。

| 資料夾 | 內容 | 開啟方式 |
|---|---|---|
| `pharmacy-study/` | 藥學常識：7 科導論、核心觀念、口訣、閃卡與測驗 | 直接開啟 `pharmacy-study/index.html` |
| `security-training-game/` | 資安訓練遊戲（新進同仁資安須知、電子郵件社交工程） | `python3 build.py` 後開啟 `dist/*.html`，詳見該資料夾的 `HANDOFF.md` |
| `_local/` | 原始 zip 與參考檔，**不進 git** | — |

## 參考檔（給 Claude 參考風格用）

- `Strapi Editor Training.html`：先前由 Claude 製作的 artifact，是互動教材的風格範本（版本庫中的副本在 `security-training-game/reference/`）。
- `inkwave-menu-reference.mp4`：遊戲選單的導覽參考影片（只留在本機：`_local/references/` 與 `security-training-game/reference/`）。

做新教材時，先看這些參考檔，沿用同樣的品質與互動方式。

## 不進 git 的檔案

照片、截圖（png/jpg 等）、影片、zip 都只留在本機（OneDrive），見 `.gitignore`。
因此 `security-training-game/assets/` 的圖片不在版本庫裡；在別台電腦重建前，要先把 `assets/` 複製過去。

## 檢查

```bash
node pharmacy-study/tools/check.js pharmacy-study/subjects/*.html
```
