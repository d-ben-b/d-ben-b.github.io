<template>
  <section class="min-h-screen p-10 rounded-lg shadow-md about bg-content">
    <h1 class="mb-10 text-4xl font-bold text-gray-800">About Myself</h1>
    <div class="flex items-center gap-6 mb-8">
      <img :src="image(0)" alt="my profile" class="flex-shrink-0 object-cover w-1/4 rounded-lg" />
      <div class="text-left">
        <p class="text-lg text-gray-600">
          My name is RUAN, SHAO-MING , and I am currently a student at National
          Cheng Kung University(NCKU) majoring in Electrical Engineering. I have
          a strong passion for artificial intelligence, programming, and
          technological innovation, particularly in applying these technologies
          to solve real-world problems and enhance quality of life.
          Academically, I specialize in data analysis, software development, and
          artificial intelligence. I am proficient in programming languages such
          as C/C++, Java, and Python and have conducted in-depth studies on
          artificial intelligence and IoT technologies. During my university
          years, I participated in several research projects, including AI model
          development and Website development experiences, achieving outstanding
          results in my core courses.
        </p>
      </div>
    </div>
    <div class="flex items-center gap-6 mb-8">
      <div class="text-left">
        <p class="text-lg text-gray-600">
          Beyond academics, I actively engage in cross-disciplinary practices
          and community services, such as promoting STEM education in rural
          schools by teaching programming courses. I have also participated in
          cultural exchange programs that helped me develop a global
          perspective. These experiences have honed my teamwork, leadership, and
          problem-solving skills
        </p>
      </div>
      <img :src="image(1)" alt="Volunteer picture" class="flex-shrink-0 object-cover w-1/4 rounded-lg" />
    </div>
    <div class="flex items-center gap-6 mb-8">
      <img :src="image(2)" alt="my profile" class="flex-shrink-0 object-cover w-1/4 rounded-lg" />
      <div class="text-left">
        <p class="text-lg text-gray-600">
          My goal is to combine my expertise and innovative thinking to work in
          leading technology companies like Google or NVIDIA, contributing to
          cutting-edge developments in AI and IoT. Additionally, I aspire to
          pursue entrepreneurship, leveraging AI to design games that are both
          educational and entertaining. I am confident that my technical skills,
          hands-on experiences, and continuous learning mindset will bring value
          to your team. I look forward to the opportunity to showcase my
          abilities and passion!
        </p>
      </div>
    </div>
    <h2 class="mt-4 text-xl font-semibold text-gray-700">Skills</h2>
    <div ref="skillsContainer" class="mt-3 skills-container">
      <div v-for="(skill, index) in skills" :key="skill" class="skill-item" :class="{ visible: skillsVisible }"
        :style="{ animationDelay: `${index * 0.1}s` }">
        <div class="skill-icon">
          <img :src="getSkillIcon(skill)" :alt="skill + ' icon'" class="w-6 h-6" />
        </div>
        <span>{{ skill }}</span>
      </div>
    </div>
    <h2 class="mt-4 text-xl font-semibold text-gray-700">Hobbies</h2>
    <div class="flex items-center gap-6 mb-8">
      <p class="pb-20 mt-2 text-lg text-gray-600">
        In my free time, I enjoy cycling, playing the violin, and exploring new
        technologies. One of my most memorable achievements was cycling from
        National Cheng Kung University to Guoshenggang Lighthouse—the
        westernmost point of Taiwan—and back, totaling around 60 kilometers. It
        remains my longest and most rewarding ride to date. As for music, I
        often practice the violin. I’ve performed classical pieces such as
        Zigeunerweisen (Sarasate’s Gypsy Airs) and also enjoy playing popular
        songs like Red Scarf. I’m particularly drawn to pop music because it
        allows me to express my emotions more freely and release stress. On
        weekends, I like to visit a cozy bookstore near NCKU where I can immerse
        myself in the world of books. Recently, I read The Courage to Be
        Disliked, a thought-provoking book based on Adlerian psychology. It
        offered me a fresh perspective and helped me reflect on various aspects
        of my life and personal relationships.
      </p>
      <img :src="image(3)" alt="Volunteer picture" class="flex-shrink-0 object-cover w-1/4 rounded-lg" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

const image_files = [
  "MyProfile.jpg",
  "Volunteer.jpg",
  "Goal1.jpg",
  "Hobby.jpg",
];
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

// Skills data
const skills = [
  "JavaScript",
  "Vue.js",
  "HTML & CSS",
  "Node.js",
  "Python",
  "Machine learning",
];

// Skill icons (you may need to add these icons to your assets folder)
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
  // Setup intersection observer for skills animation
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
.skills-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-left: 1.25rem;
}

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
