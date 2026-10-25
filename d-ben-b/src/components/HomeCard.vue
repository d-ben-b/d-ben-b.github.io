<template>
  <div @click="navigate"
    class="group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.03]">
    <div class="relative w-full aspect-[4/3]">
      <SmartImg :src="image" :alt="title" sizes="(min-width: 768px) 33vw, 100vw" :max-width="640"
        class="object-cover w-full h-full transition group-hover:brightness-75" :style="{ objectPosition: position }" />
      <div class="absolute bottom-0 w-full p-4 text-white bg-black bg-opacity-60">
        <h3 class="text-xl font-bold">{{ title }}</h3>
        <p class="text-sm phrase-wrap">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import SmartImg from "./SmartImg.vue";

const props = defineProps({
  title: String,
  subtitle: String,
  // 相對 public 的圖片路徑
  image: String,
  // 照片裁成 4:3 時保留哪一塊（CSS object-position），讓臉留在框裡
  position: { type: String, default: "50% 50%" },
  link: String,
});
const router = useRouter();
const navigate = () => router.push(props.link);
</script>
