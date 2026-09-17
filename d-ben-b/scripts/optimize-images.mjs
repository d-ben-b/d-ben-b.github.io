/**
 * 一次性圖片瘦身腳本（可重複執行，已達標的檔案會自動跳過）
 *
 * 為什麼需要它：vite-plugin-image-optimizer 只會「重新壓縮」，不會縮小像素尺寸，
 * 所以 4000~6000px 的原圖會原尺寸送到瀏覽器。這支腳本在原始檔就先做好 resize。
 *
 * 用法：
 *   node scripts/optimize-images.mjs --dry   # 只報告，不改檔
 *   node scripts/optimize-images.mjs         # 實際覆寫
 */
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, renameSync, unlinkSync } from "fs";
import { join, extname, relative, sep } from "path";

const DRY = process.argv.includes("--dry");

// 每個目錄的「最長邊上限」，依實際顯示尺寸決定
const RULES = [
  { dir: "src/assets/images/icons", max: 128 },   // 技能圖示，顯示 24px
  { dir: "src/assets/images/HomeSvg", max: 1600 },
  { dir: "src/assets/images", max: 1920 },        // 首頁 hero 全螢幕
  { dir: "public/Project", max: 1600 },           // 專案卡片 + Modal
  { dir: "public/anniversary", max: 1280 },       // 相簿縮圖 + 檢視器
];

const SKIP = [/favicon/i, /apple-touch-icon/i];

const JPEG_OPTS = { quality: 80, progressive: true, mozjpeg: true };
const PNG_OPTS = { quality: 80, compressionLevel: 9, palette: true };

// 不透明且偏大的 PNG 其實是照片，轉成 JPG 才有意義（PNG 存照片省不下來）
const PNG_TO_JPG_MIN_BYTES = 300 * 1024;

const norm = (p) => p.split(sep).join("/");

function collect(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...collect(p));
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

function maxFor(file) {
  const p = norm(relative(process.cwd(), file));
  // RULES 由深到淺排列，第一個命中的就是最貼近的規則
  for (const r of RULES) if (p.startsWith(r.dir + "/")) return r.max;
  return 1600;
}

const files = [...collect("src/assets"), ...collect("public")].filter(
  (f) => !SKIP.some((re) => re.test(f))
);

let before = 0;
let after = 0;
const renames = [];
const rows = [];

for (const file of files) {
  const origSize = statSync(file).size;
  before += origSize;

  const img = sharp(file).rotate(); // 先把 EXIF 方向烘進像素，避免去除 metadata 後照片轉向
  const meta = await img.metadata();
  const max = maxFor(file);
  const longest = Math.max(meta.width, meta.height);
  const resize = longest > max ? { width: meta.width >= meta.height ? max : null, height: meta.height > meta.width ? max : null, withoutEnlargement: true } : null;

  let pipeline = sharp(file).rotate();
  if (resize) pipeline = pipeline.resize(resize);

  const isPng = extname(file).toLowerCase() === ".png";
  let target = file;

  if (isPng) {
    const stats = await sharp(file).stats();
    const opaque = stats.isOpaque;
    if (opaque && origSize >= PNG_TO_JPG_MIN_BYTES) {
      target = file.replace(/\.png$/i, ".jpg");
      pipeline = pipeline.flatten({ background: "#ffffff" }).jpeg(JPEG_OPTS);
      renames.push([norm(relative(process.cwd(), file)), norm(relative(process.cwd(), target))]);
    } else {
      pipeline = pipeline.png(PNG_OPTS);
    }
  } else {
    pipeline = pipeline.jpeg(JPEG_OPTS);
  }

  const buf = await pipeline.toBuffer();

  // 只有真的變小才覆寫，避免把已經壓好的檔案越壓越大
  const keep = buf.length < origSize || target !== file;
  const finalSize = keep ? buf.length : origSize;
  after += finalSize;

  rows.push({
    file: norm(relative(process.cwd(), file)),
    from: `${meta.width}x${meta.height}`,
    to: resize ? (meta.width >= meta.height ? `${max}x?` : `?x${max}`) : "—",
    kb: (origSize / 1024).toFixed(0),
    newKb: (finalSize / 1024).toFixed(0),
    changed: keep,
    renamedTo: target !== file ? norm(relative(process.cwd(), target)) : null,
  });

  if (!DRY && keep) {
    const tmp = target + ".tmp";
    writeFileSync(tmp, buf);
    if (target !== file) unlinkSync(file);
    renameSync(tmp, target);
  }
}

for (const r of rows) {
  if (!r.changed) continue;
  const mark = r.renamedTo ? ` → ${r.renamedTo}` : "";
  console.log(
    `${r.kb.padStart(7)}KB → ${r.newKb.padStart(6)}KB  ${r.from.padEnd(11)}→ ${r.to.padEnd(8)} ${r.file}${mark}`
  );
}

console.log("\n=== summary ===");
console.log(`files:  ${rows.length}`);
console.log(`before: ${(before / 1024 / 1024).toFixed(1)} MB`);
console.log(`after:  ${(after / 1024 / 1024).toFixed(1)} MB`);
console.log(`saved:  ${((1 - after / before) * 100).toFixed(1)}%`);
if (renames.length) {
  console.log("\n=== PNG → JPG（需同步更新引用）===");
  for (const [a, b] of renames) console.log(`  ${a}  →  ${b}`);
}
if (DRY) console.log("\n(dry run — 沒有任何檔案被修改)");
