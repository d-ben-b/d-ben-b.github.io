# d-ben-b.github.io

阮紹銘的個人網站：<https://d-ben-b.github.io/>。Vue 3 + Vite + Tailwind CSS，中英雙語。
push 到 `main` 後由 GitHub Actions（`.github/workflows/deploy.yml`）建置並部署到 GitHub Pages。

## 開發

需要 Node.js 22。

```bash
npm ci           # 照 package-lock.json 安裝
npm run dev      # 本機預覽 http://localhost:5173
npm run build    # 產出 dist/
npm run preview  # 預覽 dist/
```

`dev` 和 `build` 之前會自動執行 `npm run images`（見下面「圖片」）。

## 內容在哪裡改

| 頁面 | 檔案 |
| --- | --- |
| 作品 | `src/assets/projects.js`（欄位說明寫在檔案開頭） |
| 歷程 | `public/timeline.json`（頁面會依 `sort` 新到舊排，不用手動排順序） |
| 首頁、關於我的文字 | `src/i18n/locales/zh.js`、`en.js` |
| 關於我的數字與技能 | `src/views/About.vue` 的 `stats`、`skillGroups` |
| 首頁輪播照片 | `src/assets/heroImages.js` |
| Email、GitHub、LinkedIn | `src/assets/data.js` |
| 下載履歷 | `public/resume_zh_full.pdf`、`public/resume_en_full.pdf`（由 resume repo 產生） |

內容的出處和但書在 resume repo（`../resume/resources/`）；網站上放了哪些、還缺哪些，記在 `resources/website/personal-website.md`。

## 圖片

照片原檔放在 `public/images/`、`public/Project/`、`public/anniversary/`，程式裡用相對 `public/` 的路徑引用（例如 `"Project/foo.jpg"`），
並用 `src/components/SmartImg.vue` 顯示，不要直接寫 `<img>`。

`scripts/build-images.mjs` 會為每張照片產生 160～1920px 多種寬度的 WebP（`public/_img/`）和尺寸清單（`src/generated/`），
瀏覽器依螢幕大小只下載夠用的那張；圖片下載完之前先顯示清單裡 16px 的模糊預覽。這兩個資料夾不進 git，每次建置重產，內容沒變的照片會跳過。

新增照片的步驟：

1. 原圖長邊超過 2000px 的，先跑 `node scripts/optimize-images.mjs` 縮小（會直接覆寫原檔）。
2. 放進上面三個資料夾之一，在資料檔裡引用。
3. `npm run dev`，照片會自動處理。

作品卡片的圖固定 16:10，照片會裁邊；圖表這類不能裁的，在 `projects.js` 那一項加 `coverFit: "contain"`。
