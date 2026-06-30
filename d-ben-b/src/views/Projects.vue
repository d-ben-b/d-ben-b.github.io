<template>
  <section id="projects" class="min-h-screen p-10 bg-content">
    <h1 class="w-full mb-6 text-3xl font-bold text-center text-gray-800">{{ t("projects.heading") }}</h1>
    <div class="grid grid-cols-1 gap-6 pb-20 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="project in projects" :key="project.id" class="p-6 bg-white rounded-lg shadow-md card"
        v-show="project.id != -1">
        <h2 class="text-xl font-semibold text-gray-800">{{ pick(project.title) }}</h2>
        <img loading="lazy" decoding="async" :src="project.img" alt="" class="w-auto p-6" />
        <p class="mt-2 text-gray-600">{{ pick(project.short_description) }}</p>
        <button @click="
          selectedProject = project;
        showModal = true;
        "
          class="inline-block px-4 py-2 mt-4 text-blue-500 transition duration-500 rounded-md hover:bg-emerald-900 hover:text-emerald-100">
          {{ t("projects.discoverMore") }}
        </button>
      </div>
    </div>
    <transition name="modal" enter-active-class="transition-opacity duration-500 ease-out "
      enter-from-class="opacity-0 " enter-to-class="opacity-100 "
      leave-active-class="transition-opacity duration-500 ease-in " leave-from-class="opacity-100 "
      leave-to-class="opacity-0">
      <ProjectModal v-if="showModal" :isVisible="showModal" :project="selectedProject" @close="showModal = false" />
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProjectModal from "../components/ProjectModal.vue";
import { projects as projectData } from "../assets/projects";
import { t, pick } from "@/i18n";

const showModal = ref(false);
const selectedProject = ref({});

const projects = ref(projectData);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".card")
    .forEach((card) => observer.observe(card));
});
</script>

<style scoped>
.card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>
