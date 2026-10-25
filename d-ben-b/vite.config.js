import { fileURLToPath, URL } from "node:url";
import { existsSync, readFileSync } from "node:fs";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { heroImages, heroSizes } from "./src/assets/heroImages.js";

// 首頁第一張照片是首屏最大的元素。照原本的流程，要等 JS 下載、執行完才知道要載它；
// 這裡在 index.html 放一小段 script，解析 HTML 時就開始下載（只在首頁，其他頁不浪費流量）。
// 圖片清單和 WebP 由 scripts/build-images.mjs 在 dev / build 之前產生。
function preloadHeroImage() {
  let base = "/";
  return {
    name: "preload-hero-image",
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml() {
      const manifestFile = "src/generated/images.json";
      if (!existsSync(manifestFile)) return;
      const src = heroImages[0].src;
      const meta = JSON.parse(readFileSync(manifestFile, "utf8"))[src];
      if (!meta) return;
      const stem = src.replace(/\.[^.]+$/, "");
      const srcset = meta.widths.map((w) => `${encodeURI(`${base}_img/${stem}-${w}.webp`)} ${w}w`).join(", ");
      return [
        {
          tag: "script",
          injectTo: "head",
          children:
            `if (location.pathname === ${JSON.stringify(base)}) {` +
            `var l = document.createElement("link");` +
            `l.rel = "preload"; l.as = "image"; l.type = "image/webp";` +
            `l.setAttribute("imagesrcset", ${JSON.stringify(srcset)});` +
            `l.setAttribute("imagesizes", ${JSON.stringify(heroSizes)});` +
            `l.setAttribute("fetchpriority", "high");` +
            `document.head.appendChild(l); }`,
        },
      ];
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), preloadHeroImage()],
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
