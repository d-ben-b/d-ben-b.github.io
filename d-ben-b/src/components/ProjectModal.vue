<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
    role="dialog" aria-modal="true" :aria-label="pick(project.title)" @click.self="closeModal">

    <div
      class="relative w-full max-w-2xl max-h-[92vh] p-6 overflow-y-auto text-left bg-white shadow-2xl md:p-8 rounded-3xl custom-scrollbar">

      <button @click="closeModal" :aria-label="t('projects.close')"
        class="absolute p-2 text-4xl leading-none text-gray-400 transition duration-300 top-3 right-4 hover:text-red-500 hover:scale-110">
        &times;
      </button>

      <p class="pr-10 text-xs text-gray-400">{{ pick(project.date) }}</p>
      <h2 class="pr-10 mt-1 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
        {{ pick(project.title) }}
      </h2>
      <p class="mt-1 text-sm font-medium text-emerald-800/80">{{ pick(project.tag) }}</p>

      <!-- 圖框照這張圖自己的長寬比，最高半個螢幕；圖到之前先顯示模糊預覽 -->
      <div class="mx-auto mt-5 overflow-hidden bg-gray-100 shadow-inner rounded-xl" :style="frame.style">
        <SmartImg :key="current" :src="current" :alt="pick(project.title)" eager :sizes="frame.sizes"
          class="object-cover w-full h-full" />
      </div>

      <div v-if="gallery.length > 1" class="flex flex-wrap justify-center gap-2 mt-3">
        <button v-for="(img, i) in gallery" :key="img" type="button" @click="index = i"
          :aria-label="`${i + 1} / ${gallery.length}`"
          class="w-16 h-12 overflow-hidden transition border-2 rounded-md"
          :class="i === index ? 'border-emerald-600' : 'border-transparent opacity-60 hover:opacity-100'">
          <SmartImg :src="img" alt="" sizes="64px" :max-width="160" class="object-cover w-full h-full" />
        </button>
      </div>

      <p class="mt-6 leading-relaxed text-gray-700 whitespace-pre-line">{{ pick(project.description) }}</p>

      <div v-if="project.tech?.length" class="flex flex-wrap gap-1.5 mt-5">
        <span v-for="tech in project.tech" :key="tech"
          class="px-2 py-0.5 text-xs rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
          {{ tech }}
        </span>
      </div>

      <div v-if="project.links?.length" class="flex flex-wrap gap-3 mt-6">
        <a v-for="link in project.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer"
          class="inline-block px-5 py-2.5 font-semibold text-white transition duration-300 bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5">
          {{ link.label ? pick(link.label) : t(`projects.links.${link.type}`) }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import SmartImg from "./SmartImg.vue";
import { viewerFrame } from "@/lib/images";
import { t, pick } from "@/i18n";

const props = defineProps({
  project: { type: Object, required: true },
});

const emit = defineEmits(["close"]);

const gallery = computed(() => props.project.gallery ?? [props.project.cover]);
const index = ref(0);
const current = computed(() => gallery.value[index.value]);

// 視窗內容最寬 608px（max-w-2xl 扣掉左右 padding）；手機上外框和 padding 共佔 80px
const frame = computed(() => viewerFrame(current.value, 608, 80));

const closeModal = () => emit("close");

const onKeydown = (e) => {
  if (e.key === "Escape") closeModal();
  else if (e.key === "ArrowRight") index.value = (index.value + 1) % gallery.value.length;
  else if (e.key === "ArrowLeft") index.value = (index.value - 1 + gallery.value.length) % gallery.value.length;
};

// 視窗打開時背景不跟著捲動
let previousOverflow = "";
onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = previousOverflow;
});
</script>

<style scoped>
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
