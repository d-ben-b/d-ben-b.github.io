// 首頁的照片（src 相對 public）。第一張是首屏最大的圖，vite.config.js 會讓瀏覽器在解析 HTML 時就先下載它。
//
// hero  首頁右側 4:5 相框裡的 object-position，card 首頁下方 4:3 卡片裡的；
//       照片長寬比和框不同時會裁邊，這兩個值決定保留哪一塊，讓臉不被切掉。
export const heroImages = [
  { src: "images/hero-taitung.jpg", hero: "45% 50%" },
  { src: "images/hero-rocks.jpg", hero: "55% 50%", card: "50% 30%" },
  { src: "images/hero-kaohsiung.jpg", hero: "50% 30%", card: "50% 18%" },
  { src: "images/hero-christmas.jpg", hero: "50% 75%", card: "50% 79%" },
];

// 相框在各種螢幕上的寬度，Home.vue 的相框 class 改了這裡要一起改
export const heroSizes = "(min-width: 1024px) 420px, (min-width: 768px) 360px, 240px";
