<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black bg-opacity-60 backdrop-blur-sm md:p-6"
    role="dialog" aria-modal="true" :aria-label="pick(project.title)" @click.self="closeModal">

    <div
      class="relative w-full max-w-5xl max-h-[94vh] p-6 overflow-y-auto text-left shadow-2xl bg-paper md:p-10 rounded-3xl custom-scrollbar">

      <button @click="closeModal" :aria-label="t('projects.close')"
        class="absolute p-2 text-4xl leading-none transition duration-300 text-stone-400 top-3 right-4 hover:text-red-500 hover:scale-110">
        &times;
      </button>

      <p class="pr-10 text-sm text-stone-500">{{ pick(project.date) }}</p>
      <h2 class="pr-10 mt-1 text-2xl font-bold tracking-tight text-stone-800 md:text-4xl phrase-wrap">
        {{ pick(project.title) }}
      </h2>
      <p class="mt-2 text-base font-medium text-emerald-800">{{ pick(project.tag) }}</p>

      <!-- 圖框照這張圖自己的長寬比，最高 62% 個螢幕；圖到之前先顯示模糊預覽 -->
      <div class="mx-auto mt-6 overflow-hidden shadow-inner bg-stone-200 rounded-xl" :style="frame.style">
        <SmartImg :key="current" :src="current" :alt="pick(project.title)" eager :sizes="frame.sizes"
          class="object-cover w-full h-full" />
      </div>

      <div v-if="gallery.length > 1" class="flex flex-wrap justify-center gap-2 mt-4">
        <button v-for="(img, i) in gallery" :key="img" type="button" @click="index = i"
          :aria-label="`${i + 1} / ${gallery.length}`"
          class="w-20 overflow-hidden transition border-2 rounded-lg h-14"
          :class="i === index ? 'border-emerald-600' : 'border-transparent opacity-60 hover:opacity-100'">
          <SmartImg :src="img" alt="" sizes="80px" :max-width="160" class="object-cover w-full h-full" />
        </button>
      </div>

      <p class="mt-8 text-base leading-8 whitespace-pre-line text-stone-700 md:text-lg md:leading-9">
        {{ pick(project.description) }}
      </p>

      <div v-if="project.tech?.length" class="flex flex-wrap gap-2 mt-6">
        <span v-for="tech in project.tech" :key="tech"
          class="px-2.5 py-1 text-sm rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
          {{ tech }}
        </span>
      </div>

      <div v-if="project.links?.length" class="flex flex-wrap gap-3 mt-8">
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

// 視窗內容最寬 944px（max-w-5xl 扣掉左右 padding）；手機上外框和 padding 共佔 72px
const frame = computed(() => viewerFrame(current.value, 944, 72, 62));

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
  background-color: #d6d3d1;
  /* stone-300 */
  border-radius: 10px;
}
</style>
