<template>
  <section class="min-h-screen p-5 rounded-lg md:p-10 about bg-content">
    <h1 class="mb-8 text-3xl font-bold text-center text-stone-800 md:mb-10 md:text-4xl">{{ t("about.heading") }}</h1>

    <!-- Quick-fact stat band -->
    <div class="grid max-w-3xl grid-cols-2 gap-3 mx-auto mb-12 md:grid-cols-4 md:gap-4">
      <div v-for="s in stats" :key="s.label"
        class="p-4 text-center transition border shadow-sm bg-paper rounded-xl border-stone-900/10 hover:-translate-y-1 hover:shadow-md">
        <p class="text-2xl font-bold text-emerald-800 md:text-3xl">{{ s.value }}</p>
        <p class="mt-1 text-sm text-stone-600">{{ t(s.label) }}</p>
      </div>
    </div>

    <!-- 自己、社團、志工、青藤學程、課外活動：每段配一張講同一件事的照片，桌機上照片左右交錯 -->
    <div class="max-w-5xl mx-auto space-y-12">
      <div v-for="(block, i) in blocks" :key="block.key" class="flex flex-col items-center gap-6 md:gap-10"
        :class="i % 2 ? 'md:flex-row-reverse' : 'md:flex-row'">
        <SmartImg :src="block.photo" :sizes="photoSizes" :alt="t(`about.${block.key}.alt`)"
          class="flex-shrink-0 object-cover w-full shadow-md aspect-[4/3] rounded-xl sm:w-2/3 md:w-2/5"
          :style="{ objectPosition: block.position }" />
        <div class="text-left">
          <h2 v-if="block.titled" class="mb-3 text-xl font-semibold text-stone-800 md:text-2xl">
            {{ t(`about.${block.key}.title`) }}
          </h2>
          <p class="text-base leading-8 text-stone-700 md:text-lg md:leading-9">{{ t(`about.${block.key}.text`) }}</p>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div class="max-w-5xl mx-auto">
      <h2 class="mt-14 mb-4 text-xl font-semibold text-left text-stone-800 md:text-2xl">{{ t("about.education") }}</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="edu in educationList" :key="edu.degree"
          class="p-5 text-left transition border shadow-sm bg-paper rounded-xl border-stone-900/10 hover:-translate-y-1 hover:shadow-md">
          <div class="flex items-center justify-end gap-2 mb-1">
            <span class="text-sm text-stone-500">{{ edu.date }}</span>
          </div>
          <h3 class="text-lg font-bold text-stone-800">{{ edu.degree }}</h3>
          <p class="mt-0.5 text-base font-medium text-emerald-800">{{ t("about.edu.org") }}</p>
          <p class="mt-2 text-base text-stone-700">{{ edu.note }}</p>
        </div>
      </div>
    </div>

    <!-- Skills：分組和履歷（resume repo 的 data/content.yml）一致，只列有專案或課程佐證的項目 -->
    <div class="max-w-5xl pb-10 mx-auto">
      <h2 class="mt-12 mb-3 text-xl font-semibold text-left text-stone-800 md:text-2xl">{{ t("about.skills") }}</h2>
      <div ref="skillsContainer" class="grid gap-3 text-left md:grid-cols-2">
        <div v-for="(group, index) in skillGroups" :key="group.label" class="skill-group"
          :class="{ visible: skillsVisible }" :style="{ animationDelay: `${index * 0.1}s` }">
          <h3 class="mb-2 text-base font-semibold text-emerald-900">{{ t(group.label) }}</h3>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="item in group.items" :key="item" class="skill-chip">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import SmartImg from "../components/SmartImg.vue";
import { t } from "@/i18n";

// 每段文字配的照片；position 是照片裁成 4:3 時保留哪一塊（CSS object-position）
const blocks = [
  { key: "intro", photo: "images/about-profile.jpg", position: "50% 40%" },
  { key: "clubs", photo: "images/hero-kaohsiung.jpg", position: "50% 18%", titled: true },
  { key: "volunteer", photo: "images/about-volunteer.jpg", position: "50% 40%", titled: true },
  { key: "scholarship", photo: "images/about-goal.jpg", position: "55% 30%", titled: true },
  { key: "activities", photo: "images/about-hobby.jpg", position: "50% 50%", titled: true },
];
// 手機約三分之二寬、桌機五分之二（內容區最寬 1024px，所以最多約 410px）
const photoSizes = "(min-width: 1024px) 410px, (min-width: 768px) 40vw, (min-width: 640px) 67vw, 100vw";

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
  background-color: #d9dfc8;
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
  font-size: 0.9375rem;
  font-weight: 500;
  color: #44403c;
  background-color: rgba(246, 243, 234, 0.9);
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
