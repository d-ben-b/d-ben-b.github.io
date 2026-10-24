import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import reveal from "./directives/reveal";
// Inter 自己架在網站上（只下載用得到的拉丁字集，約 48KB）；中文用各系統內建字型
import "@fontsource-variable/inter";
import "@/assets/tailwind.css";

const app = createApp(App);

app.use(router);
app.directive("reveal", reveal);

app.mount("#app");
