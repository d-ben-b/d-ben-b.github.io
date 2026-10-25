/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      navBg: "#1B3409",
      text: "#C9C926",
      white: "#FFFFFF",
      // 頁面底色。原本的 #F7F7D4（淡黃）整頁太亮，改成暗一點、不偏黃的沙色
      content: "#E6E3D4",
      // 卡片、視窗的底色：比頁面亮一階，但不用純白
      paper: "#F2EFE6",
      theme: "#66B032",
    },
    fontFamily: {
      // 英數字用 Inter；中文不載入網路字型（Noto Sans TC 一頁要 0.7–1MB），
      // 直接用系統字型：Mac / iOS 蘋方、Windows 微軟正黑體、Android 思源黑體
      sans: [
        "Inter Variable",
        "PingFang TC",
        "Microsoft JhengHei",
        "Noto Sans TC",
        "Noto Sans CJK TC",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
      ],
      serif: ["Noto Serif TC", "Merriweather", "serif"],
    },
    animation: {
      fade: "fadeOut 5s ease-in-out",
    },
    // that is actual animation
    keyframes: (theme) => ({
      fadeOut: {
        "0%": { backgroundColor: theme("colors.red.300") },
        "100%": { backgroundColor: theme("colors.transparent") },
      },
    }),
  },
};
export const plugins = [];
