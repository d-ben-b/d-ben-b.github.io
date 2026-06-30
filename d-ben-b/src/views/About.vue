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
        <img loading="lazy" decoding="async" :src="image(0)" alt="my profile"
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
        <img loading="lazy" decoding="async" :src="image(1)" alt="Volunteer picture"
          class="flex-shrink-0 object-cover w-full rounded-xl shadow-md sm:w-1/2 md:w-1/3" />
      </div>

      <div class="flex flex-col items-center gap-6 mb-8 md:flex-row">
        <img loading="lazy" decoding="async" :src="image(2)" alt="my profile"
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

    <!-- Skills -->
    <div class="max-w-5xl mx-auto">
      <h2 class="mt-10 mb-3 text-xl font-semibold text-left text-gray-700">{{ t("about.skills") }}</h2>
      <div ref="skillsContainer" class="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div v-for="(skill, index) in skills" :key="skill" class="skill-item" :class="{ visible: skillsVisible }"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="skill-icon">
            <img loading="lazy" decoding="async" :src="getSkillIcon(skill)" :alt="skill + ' icon'" class="w-6 h-6" />
          </div>
          <span>{{ skill }}</span>
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
        <img loading="lazy" decoding="async" :src="image(3)" alt="Hobby picture"
          class="flex-shrink-0 object-cover w-full rounded-xl shadow-md sm:w-1/2 md:w-1/3" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { t } from "@/i18n";

const image_files = ["MyProfile.jpg", "Volunteer.jpg", "Goal1.jpg", "Hobby.jpg"];
const image = computed(() => {
  return (index) => {
    if (index < 0 || index >= image_files.length) {
      console.error(`Invalid index: ${index}`);
      return null;
    }
    return new URL(`../assets/images/${image_files[index]}`, import.meta.url)
      .href;
  };
});

// Real figures pulled from the timeline / résumé — not invented.
const stats = [
  { value: "4.04 / 4.3", label: "about.stats.gpa" },
  { value: "835", label: "about.stats.toeic" },
  { value: "M.S.", label: "about.stats.degree" },
  { value: "60 km", label: "about.stats.ride" },
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

// Skills data
const skills = [
  "JavaScript",
  "Vue.js",
  "HTML & CSS",
  "Node.js",
  "Python",
  "Machine learning",
];

const getSkillIcon = (skill) => {
  const iconMap = {
    JavaScript: "js.png",
    "Vue.js": "vue.png",
    "HTML & CSS": "html.png",
    "Node.js": "node.png",
    Python: "python.png",
    "Machine learning": "ml.png",
  };
  const fileName = iconMap[skill] || "default-skill.png";
  return new URL(`../assets/images/icons/${fileName}`, import.meta.url).href;
};

// Animation for skills
const skillsContainer = ref(null);
const skillsVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
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
</script>

<style scoped>
.skill-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: rgba(227, 245, 179, 0.8);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease-out;
}

.skill-item.visible {
  transform: translateY(0);
  animation: fadeInUp 0.5s ease forwards;
}

.skill-icon {
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: rgba(229, 231, 235, 0.5);
}

.skill-item span {
  font-weight: 500;
  color: #4b5563;
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
