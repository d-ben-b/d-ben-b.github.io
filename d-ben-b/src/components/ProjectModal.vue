<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
    v-show="isVisible" @click.self="closeModal">

    <div
      class="relative flex flex-col items-center w-full max-w-2xl p-8 overflow-hidden text-center bg-white shadow-2xl rounded-3xl">

      <button @click="closeModal"
        class="absolute p-2 text-4xl text-gray-400 transition duration-300 top-4 right-5 hover:text-red-500 hover:scale-110">
        &times;
      </button>

      <h2 class="mb-6 text-3xl font-bold tracking-tight text-gray-900">
        {{ project.title }}
      </h2>

      <div class="w-full max-w-sm aspect-[4/3] mb-6 relative overflow-hidden rounded-xl bg-gray-100 shadow-inner">

        <div v-if="!isImgLoaded"
          class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 bg-gray-200 animate-pulse rounded-xl">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-sm font-medium">Loading image...</span>
        </div>

        <img :src="project.inner_img" alt="Project Detail Image"
          class="object-cover w-full h-full transition-opacity duration-500 rounded-xl"
          :class="{ 'opacity-100': isImgLoaded, 'opacity-0': !isImgLoaded }" @load="onImageLoad" loading="lazy"
          decoding="async" />
      </div>

      <p class="px-2 overflow-y-auto leading-relaxed text-left text-gray-700 max-h-60 custom-scrollbar">
        {{ project.description }}
      </p>

      <a v-if="project.link" :href="project.link" target="_blank"
        class="inline-block px-8 py-3 mt-8 font-semibold text-white transition duration-300 bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5">
        View Project Demo
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  project: Object,
});

const emit = defineEmits(["close"]);

const isImgLoaded = ref(false);

watch(() => props.project, (newProject) => {
  if (newProject) {
    isImgLoaded.value = false;
  }
});

const onImageLoad = () => {
  // 為了讓 Modal 打開動畫能流暢執行完，
  // 我們稍微微延遲一下才切換圖片顯示，這對 Lag 很有幫助。
  setTimeout(() => {
    isImgLoaded.value = true;
  }, 100); // 100ms 的緩衝，給 CPU 喘息時間
};

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
/* 隱藏原生捲軸，配合你的米色主題優化 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  /* gray-300 */
  border-radius: 10px;
}
</style>