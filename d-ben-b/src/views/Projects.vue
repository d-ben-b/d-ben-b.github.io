<template>
  <section id="projects" class="w-full min-h-screen px-4 py-10 md:p-10 bg-content">
    <h1 class="w-full mb-8 text-3xl font-bold text-center text-gray-800">{{ t("projects.heading") }}</h1>
    <div class="grid max-w-6xl grid-cols-1 gap-6 pb-20 mx-auto md:grid-cols-2 lg:grid-cols-3">
      <article v-for="(project, i) in projects" :key="project.id" v-reveal
        class="flex flex-col overflow-hidden text-left bg-white rounded-lg shadow-md card">
        <button type="button" class="block w-full overflow-hidden bg-gray-100 aspect-[16/10]"
          :aria-label="pick(project.title)" @click="open(project)">
          <SmartImg :src="project.cover" :alt="pick(project.title)" :eager="i === 0"
            sizes="(min-width: 1024px) 368px, (min-width: 768px) 45vw, 92vw" :max-width="960"
            class="w-full h-full transition duration-500 hover:scale-105"
            :class="project.coverFit === 'contain' ? 'object-contain bg-white' : 'object-cover'" />
        </button>
        <div class="flex flex-col flex-1 p-5">
          <p class="text-xs text-gray-400">{{ pick(project.date) }}</p>
          <h2 class="mt-1 text-lg font-semibold leading-snug text-gray-800">{{ pick(project.title) }}</h2>
          <p class="mt-1 text-sm font-medium text-emerald-800/80">{{ pick(project.tag) }}</p>
          <p class="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-4">{{ pick(project.short_description) }}</p>
          <div v-if="project.tech?.length" class="flex flex-wrap gap-1.5 mt-3">
            <span v-for="tech in project.tech" :key="tech"
              class="px-2 py-0.5 text-[11px] rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
              {{ tech }}
            </span>
          </div>
          <div class="pt-3 mt-auto">
            <button type="button" @click="open(project)"
              class="px-4 py-2 -ml-4 text-blue-500 transition duration-500 rounded-md hover:bg-emerald-900 hover:text-emerald-100">
              {{ t("projects.discoverMore") }}
            </button>
          </div>
        </div>
      </article>
    </div>
    <transition name="modal" enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <ProjectModal v-if="selectedProject" :project="selectedProject" @close="selectedProject = null" />
    </transition>
  </section>
</template>

<script setup>
import { ref } from "vue";
import ProjectModal from "../components/ProjectModal.vue";
import SmartImg from "../components/SmartImg.vue";
import { projects } from "../assets/projects";
import { registerImages } from "@/lib/images";
import { t, pick } from "@/i18n";

// 作品圖的尺寸清單只在這頁需要，跟著這頁的程式一起載入（由 scripts/build-images.mjs 產生）
const manifests = import.meta.glob("/src/generated/images-projects.json", { eager: true, import: "default" });
Object.values(manifests).forEach(registerImages);

const selectedProject = ref(null);
const open = (project) => (selectedProject.value = project);
</script>

<style scoped>
.card {
  transition: transform 0.3s, box-shadow 0.3s, opacity 0.8s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>
