<template>
  <section class="min-h-screen p-5 rounded-lg shadow-md md:p-10 about bg-content">
    <h1 class="mb-8 text-3xl font-bold text-center text-gray-800 md:mb-10 md:text-4xl">{{ t("about.heading") }}</h1>

    <!-- Quick-fact stat band -->
    <div class="grid max-w-3xl grid-cols-2 gap-3 mx-auto mb-12 md:grid-cols-4 md:gap-4">
      <div v-for="s in stats" :key="s.label"
        class="p-4 text-center transition border shadow-sm bg-white/70 rounded-xl border-black/5 hover:-translate-y-1 hover:shadow-md">
        <p class="text-2xl font-bold text-emerald-800 md:text-3xl">{{ s.value }}</p>
        <p class="mt-1 text-xs text-gray-500 md:text-sm">{{ t(s.label) }}</p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto">
      <div class="flex flex-col items-center gap-6 mb-8 md:flex-row">
        <SmartImg :src="photos.profile" :sizes="photoSizes" alt="my profile"
          class="flex-shrink-0 object-cover w-full rounded-xl shadow-md sm:w-1/2 md:w-1/3" />
        <div class="text-left">
          <p class="text-base leading-relaxed text-gray-600 md:text-lg">
            {{ t("about.p1") }}
          </p>
        </div>
      </div>

      <div class="flex flex-col-reverse items-center gap-6 mb-8 md:flex-row">
        <div class="text-left">
          <p class="text-base leading-relaxed text-gray-600 md:text-lg">
            {{ t("about.p2") }}
          </p>
        </div>
        <SmartImg :src="photos.volunteer" :sizes="photoSizes" alt="Volunteer picture"
          class="flex-shrink-0 object-cover w-full rounded-xl shadow-md sm:w-1/2 md:w-1/3" />
      </div>

      <div class="flex flex-col items-center gap-6 mb-8 md:flex-row">
        <SmartImg :src="photos.goal" :sizes="photoSizes" alt="Giving a talk"
          class="flex-shrink-0 object-cover w-full rounded-xl shadow-md sm:w-1/2 md:w-1/3" />
        <div class="text-left">
          <p class="text-base leading-relaxed text-gray-600 md:text-lg">
            {{ t("about.p3") }}
          </p>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div class="max-w-5xl mx-auto">
      <h2 class="mt-10 mb-4 text-xl font-semibold text-left text-gray-700">{{ t("about.education") }}</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="edu in educationList" :key="edu.degree"
          class="p-5 text-left transition bg-white border shadow-sm rounded-xl border-black/5 hover:-translate-y-1 hover:shadow-md">
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
              {{ t("about.education") }}
            </span>
            <span class="text-xs text-gray-400">{{ edu.date }}</span>
          </div>
          <h3 class="text-base font-bold text-gray-800">{{ edu.degree }}</h3>
          <p class="mt-0.5 text-sm font-medium text-emerald-800/80">{{ t("about.edu.org") }}</p>
          <p class="mt-2 text-sm text-gray-600">{{ edu.note }}</p>
        </div>
      </div>
    </div>

    <!-- Skills：分組和履歷（resume repo 的 data/content.yml）一致，只列有專案或課程佐證的項目 -->
    <div class="max-w-5xl mx-auto">
      <h2 class="mt-10 mb-3 text-xl font-semibold text-left text-gray-700">{{ t("about.skills") }}</h2>
      <div ref="skillsContainer" class="grid gap-3 text-left md:grid-cols-2">
        <div v-for="(group, index) in skillGroups" :key="group.label" class="skill-group"
          :class="{ visible: skillsVisible }" :style="{ animationDelay: `${index * 0.1}s` }">
          <h3 class="mb-2 text-sm font-semibold text-emerald-900">{{ t(group.label) }}</h3>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="item in group.items" :key="item" class="skill-chip">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hobbies -->
    <div class="max-w-5xl mx-auto">
      <h2 class="mt-10 mb-3 text-xl font-semibold text-left text-gray-700">{{ t("about.hobbies") }}</h2>
      <div class="flex flex-col items-center gap-6 mb-8 md:flex-row">
        <p class="pb-6 text-base leading-relaxed text-left text-gray-600 md:pb-10 md:text-lg">
          {{ t("about.hobbiesText") }}
        </p>
        <SmartImg :src="photos.hobby" :sizes="photoSizes" alt="Hobby picture"
          class="flex-shrink-0 object-cover w-full rounded-xl shadow-md sm:w-1/2 md:w-1/3" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import SmartImg from "../components/SmartImg.vue";
import { t } from "@/i18n";

const photos = {
  profile: "images/about-profile.jpg",
  volunteer: "images/about-volunteer.jpg",
  goal: "images/about-goal.jpg",
  hobby: "images/about-hobby.jpg",
};
// 手機全寬、平板半寬、桌機三分之一（內容區最寬 1024px，所以最多約 340px）
const photoSizes = "(min-width: 1024px) 340px, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw";

// Real figures pulled from the timeline / résumé — not invented.
// certs：resume repo 的 resources/certificates 有 20 張 Coursera 證書和 2 張 Google 學程證書
const stats = [
  { value: "4.04 / 4.3", label: "about.stats.gpa" },
  { value: "835", label: "about.stats.toeic" },
  { value: "M.S.", label: "about.stats.degree" },
  { value: "20+", label: "about.stats.certs" },
];

const educationList = computed(() => [
  {
    degree: t("about.edu.msDegree"),
    date: t("about.edu.msDate"),
    note: t("about.edu.msNote"),
  },
  {
    degree: t("about.edu.bsDegree"),
    date: t("about.edu.bsDate"),
    note: t("about.edu.bsNote"),
  },
]);

const skillGroups = [
  { label: "about.skillGroups.languages", items: ["Python", "JavaScript", "SQL", "C / C++"] },
  { label: "about.skillGroups.ml", items: ["PyTorch", "Hugging Face", "timm", "scikit-learn", "LightGBM"] },
  {
    label: "about.skillGroups.compression",
    items: ["Pruning (N:M)", "Quantization (INT8)", "Distillation", "ONNX", "TensorRT", "Jetson"],
  },
  { label: "about.skillGroups.vision", items: ["YOLO", "DeepLabV3", "OpenCV", "GStreamer", "RAG / FAISS", "PPO / DQN"] },
  { label: "about.skillGroups.web", items: ["Vue.js", "Django", "Flask", "Docker", "Git"] },
];

// Animation for skills
const skillsContainer = ref(null);
const skillsVisible = ref(false);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsVisible.value = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  if (skillsContainer.value) {
    observer.observe(skillsContainer.value);
  }
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped>
.skill-group {
  padding: 0.9rem 1rem;
  background-color: rgba(227, 245, 179, 0.8);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease-out;
}

.skill-group.visible {
  transform: translateY(0);
  animation: fadeInUp 0.5s ease forwards;
}

.skill-chip {
  padding: 0.2rem 0.6rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 9999px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
