<template>
  <!-- display: contents 讓 <picture> 不產生外框，class 直接作用在 <img> 上，用法和一般 <img> 一樣 -->
  <picture v-if="meta" class="contents">
    <source type="image/webp" :srcset="srcset" :sizes="sizes" />
    <img v-bind="$attrs" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : undefined"
      decoding="async" :width="meta.w" :height="meta.h" :alt="alt" :src="fallback"
      :style="loaded ? undefined : placeholder" @load="loaded = true" />
  </picture>
  <img v-else v-bind="$attrs" :loading="eager ? 'eager' : 'lazy'" decoding="async" :alt="alt" :src="fallback" />
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { imageMeta, imageSrcset, imageUrl } from "@/lib/images";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  // 相對 public 的路徑，例如 "Project/foo.jpg"
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  // 這張圖實際顯示多寬，瀏覽器靠它從 srcset 挑檔案；寫錯只會挑到偏大或偏小的圖
  sizes: { type: String, default: "100vw" },
  // 首屏主圖：不延後、優先下載
  eager: Boolean,
  // 小縮圖用：高密度手機螢幕會照 3 倍挑圖，限制上限避免縮圖下載到大圖
  maxWidth: { type: Number, default: Infinity },
});

const meta = computed(() => imageMeta(props.src));
const srcset = computed(() => meta.value && imageSrcset(props.src, meta.value, props.maxWidth));
const fallback = computed(() => imageUrl(props.src));

// 圖還沒到之前，先用清單裡 16px 的模糊縮圖墊底；載入後拿掉，透明 PNG 才不會透出底圖
const loaded = ref(false);
watch(() => props.src, () => (loaded.value = false));
const placeholder = computed(() => ({
  backgroundImage: `url("${meta.value.lqip}")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));
</script>
