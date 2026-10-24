/**
 * 響應式圖片產生器：`npm run dev`、`npm run build` 之前自動執行（package.json 的 predev / prebuild）。
 *
 * 為什麼需要它：同一張照片，在手機的作品卡片上只佔 350px 寬，在桌機首頁要撐滿 1920px。
 * 只放一個尺寸，手機就得下載桌機用的大圖；loading="lazy" 只能延後下載，不會讓檔案變小。
 * 這支腳本為每張照片產生多個寬度的 WebP，<img srcset> 會依「顯示寬度 × 螢幕密度」挑最小夠用的那張；
 * 另外附一張 16px 寬的模糊預覽（直接寫在清單裡），照片還沒下載完，位置上就先有輪廓和顏色。
 *
 * 輸入（原始檔，進 git）：public/images、public/Project、public/anniversary 底下的 jpg / png
 * 輸出（不進 git，每次建置重產）：
 *   public/_img/<原路徑去掉副檔名>-<寬>.webp
 *   src/generated/images.json              首頁、關於我的清單（打包進主程式）
 *   src/generated/images-projects.json     作品頁的清單 ┐ 各自跟著那一頁的程式載入，
 *   src/generated/images-anniversary.json  紀念日頁的清單 ┘ 其他頁不必下載
 *   src/generated/.cache.json              每張原圖的雜湊；內容沒變就跳過，第二次之後幾乎不花時間
 *
 * 新增照片：放進上面三個資料夾之一，在 projects.js 等資料檔用「相對 public 的路徑」引用，例如 "Project/foo.jpg"。
 * 原圖太大（長邊超過 2000px）先用 scripts/optimize-images.mjs 縮過再 commit，repo 才不會越來越肥。
 */
import sharp from "sharp";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

const PUBLIC_DIR = "public";
const OUT_DIR = join(PUBLIC_DIR, "_img");
const GENERATED_DIR = join("src", "generated");
const CACHE_FILE = join(GENERATED_DIR, ".cache.json");

// 哪些資料夾要處理、最大寬度（依實際最大顯示尺寸）、寫進哪份清單
const GROUPS = [
  { dir: "images", maxWidth: 1920, manifest: "images.json" }, // 首頁全螢幕背景、關於我
  { dir: "Project", maxWidth: 1600, manifest: "images-projects.json" }, // 作品卡片與詳細視窗
  { dir: "anniversary", maxWidth: 1280, manifest: "images-anniversary.json" },
];

// 候選寬度。160 給 64px 的縮圖（2 倍密度螢幕），其餘涵蓋手機到桌機
const WIDTHS = [160, 320, 640, 960, 1280, 1600, 1920];
const WEBP = { quality: 75 };
const LQIP_WIDTH = 16;

// 改了上面任何設定，舊的輸出就不能用：設定不同時全部重產
const CONFIG_HASH = hash(JSON.stringify({ GROUPS, WIDTHS, WEBP, LQIP_WIDTH }));

function hash(data) {
  return createHash("sha1").update(data).digest("hex");
}

const toPosix = (p) => p.split(sep).join("/");

function listImages(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listImages(p));
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(p);
  }
  return out.sort();
}

function listFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(p));
    else out.push(p);
  }
  return out;
}

// "Project/foo.jpg" 的 640px 版本 → public/_img/Project/foo-640.webp（網址 /_img/Project/foo-640.webp）
const variantFile = (key, width) => join(OUT_DIR, `${key.replace(/\.[^.]+$/, "")}-${width}.webp`);

function loadCache() {
  try {
    const cache = JSON.parse(readFileSync(CACHE_FILE, "utf8"));
    if (cache.config === CONFIG_HASH) return cache.entries;
  } catch {
    /* 第一次執行，或快取壞掉：全部重產 */
  }
  rmSync(OUT_DIR, { recursive: true, force: true });
  return {};
}

async function processImage(file, key, maxWidth) {
  const input = readFileSync(file);
  const digest = hash(input);
  const cached = cache[key];
  if (cached && cached.digest === digest && cached.widths.every((w) => existsSync(variantFile(key, w)))) {
    reused++;
    return cached;
  }

  const meta = await sharp(input).metadata();
  // EXIF 方向 5–8 代表照片要轉 90 度，寬高互換
  const rotated = (meta.orientation ?? 1) >= 5;
  const w = rotated ? meta.height : meta.width;
  const h = rotated ? meta.width : meta.height;
  const top = Math.min(w, maxWidth);
  const widths = [...WIDTHS.filter((x) => x < top), top];

  mkdirSync(dirname(variantFile(key, top)), { recursive: true });
  await Promise.all(
    widths.map((width) =>
      sharp(input).rotate().resize({ width }).webp(WEBP).toFile(variantFile(key, width))
    )
  );
  const lqip = await sharp(input).rotate().resize({ width: LQIP_WIDTH }).webp({ quality: 40 }).toBuffer();

  generated++;
  return { digest, w, h, widths, lqip: `data:image/webp;base64,${lqip.toString("base64")}` };
}

const started = Date.now();
mkdirSync(GENERATED_DIR, { recursive: true });
const cache = loadCache();
const nextCache = {};
const manifests = Object.fromEntries(GROUPS.map((g) => [g.manifest, {}]));
const expected = new Set();
let generated = 0;
let reused = 0;

for (const group of GROUPS) {
  for (const file of listImages(join(PUBLIC_DIR, group.dir))) {
    const key = toPosix(relative(PUBLIC_DIR, file));
    const entry = await processImage(file, key, group.maxWidth);
    nextCache[key] = entry;
    const { w, h, widths, lqip } = entry;
    manifests[group.manifest][key] = { w, h, widths, lqip };
    for (const width of widths) expected.add(variantFile(key, width));
  }
}

// 原圖刪掉或改名後，對應的舊 WebP 一起清掉，不然會一直被部署出去
let removed = 0;
for (const file of listFiles(OUT_DIR)) {
  if (!expected.has(file)) {
    rmSync(file);
    removed++;
  }
}

for (const [name, entries] of Object.entries(manifests)) {
  writeFileSync(join(GENERATED_DIR, name), JSON.stringify(entries, null, 1) + "\n");
}
writeFileSync(CACHE_FILE, JSON.stringify({ config: CONFIG_HASH, entries: nextCache }));

const seconds = ((Date.now() - started) / 1000).toFixed(1);
console.log(
  `[images] ${generated} 張重產、${reused} 張沒變跳過、清掉 ${removed} 個舊檔，共 ${expected.size} 個 WebP（${seconds}s）`
);
