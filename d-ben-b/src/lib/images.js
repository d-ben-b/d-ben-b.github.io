// 圖片清單（原圖尺寸、可用的 WebP 寬度、模糊預覽）由 scripts/build-images.mjs 產生。
// 用 glob 載入：清單還沒產生時拿到空物件，SmartImg 會退回一般的 <img>，網站不會整個壞掉。
const generated = import.meta.glob("/src/generated/images.json", { eager: true, import: "default" });
const registry = Object.assign({}, ...Object.values(generated));

// 只有某一頁用到的清單（例如紀念日頁）由那一頁自己載入後登記，其他頁就不必下載
export function registerImages(manifest) {
  Object.assign(registry, manifest);
}

const BASE = import.meta.env.BASE_URL;
const key = (src) => src.replace(/^\//, "");

export function imageMeta(src) {
  return registry[key(src)];
}

// 原圖網址：給不支援 WebP 的瀏覽器，也是清單缺項時的退路
export function imageUrl(src) {
  return encodeURI(BASE + key(src));
}

// srcset 用空白分隔網址和寬度，檔名有空白或中文時一定要編碼
export function imageSrcset(src, meta, maxWidth = Infinity) {
  const stem = key(src).replace(/\.[^.]+$/, "");
  const fit = meta.widths.filter((w) => w <= maxWidth);
  const widths = fit.length ? fit : meta.widths.slice(0, 1);
  return widths.map((w) => `${encodeURI(`${BASE}_img/${stem}-${w}.webp`)} ${w}w`).join(", ");
}

// 詳細視窗、相簿檢視器裡的大圖：圖框照圖片自己的長寬比，寬度不超過 maxWidth、高度不超過半個螢幕，
// 直式、橫式都不會被裁掉。同時算出實際顯示的寬度給 sizes，直式照片才不會照整個視窗寬去挑大檔。
// gutter：視窗左右留白加起來的寬度
export function viewerFrame(src, maxWidth, gutter) {
  const meta = imageMeta(src);
  const ratio = meta ? meta.w / meta.h : 4 / 3;
  const shown = Math.min(maxWidth, window.innerWidth - gutter, (window.innerHeight / 2) * ratio);
  return {
    style: { aspectRatio: String(ratio), width: `min(100%, calc(50vh * ${ratio.toFixed(4)}))` },
    sizes: `${Math.round(shown)}px`,
  };
}

// 在背景先下載並解碼，之後真的顯示時直接從快取拿，不會閃一下空白
export function preloadImage(src, sizes = "100vw") {
  const meta = imageMeta(src);
  const img = new Image();
  if (meta) {
    img.sizes = sizes;
    img.srcset = imageSrcset(src, meta);
  } else {
    img.src = imageUrl(src);
  }
  return img.decode().catch(() => {});
}
