<template>
  <div
    class="relative w-[350px] h-[250px] bg-white rounded shadow-lg border border-gray-300 flex flex-col items-center pt-4 pb-96 px-4">
    <!-- Clothespin SVG -->
    <svg class="absolute w-12 h-12 transform -translate-x-1/2 z-15 -top-4 left-1/2" viewBox="0 0 64 64" fill="none">
      <rect x="28" y="0" width="8" height="32" rx="2" fill="#6B7280" />
      <rect x="20" y="4" width="24" height="6" rx="1" fill="#4B5563" transform="rotate(45 20 4)" />
      <circle cx="32" cy="16" r="2" fill="white" />
    </svg>
    <img :src="props.image" alt="" class="object-cover w-full aspect-square grow" draggable="false" loading="lazy"
      decoding="async" width="350" height="350" />
    <div class="time">{{ time }}</div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default: "https://picsum.photos/id/101/600/600",
  },
  time: String,
  title: String,
});
</script>
