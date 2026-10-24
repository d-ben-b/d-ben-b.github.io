<template>
  <div @click="navigate"
    class="group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.03]">
    <div class="relative w-full h-64">
      <SmartImg :src="image" :alt="title" sizes="(min-width: 768px) 33vw, 100vw" :max-width="640"
        class="object-cover w-full h-full transition group-hover:brightness-75" />
      <div class="absolute bottom-0 w-full p-4 text-white bg-black bg-opacity-60">
        <h3 class="text-xl font-bold">{{ title }}</h3>
        <p class="text-sm">{{ subtitle }}</p>
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
  link: String,
});
const router = useRouter();
const navigate = () => router.push(props.link);
</script>
