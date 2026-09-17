<template>
  <div @click="navigate"
    class="group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.03]">
    <div class="relative w-full h-64">
      <img :src="image" alt="Card Image" class="object-cover w-full h-full transition group-hover:brightness-75"
        loading="lazy" decoding="async" width="600" height="256" />
      <div class="absolute bottom-0 w-full p-4 text-white bg-black bg-opacity-60">
        <h3 class="text-xl font-bold">{{ title }}</h3>
        <p class="text-sm">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  title: String,
  subtitle: String,
  image: URL,
  link: String,
});
const router = useRouter();
const navigate = () => router.push(props.link);
</script>
