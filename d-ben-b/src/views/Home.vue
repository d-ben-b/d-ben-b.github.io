<template>
  <section class="relative min-h-screen overflow-hidden font-sans text-gray-800 bg-cream">
    <div class="absolute inset-0 z-0 will-change-transform"
      :style="{ transform: `translateY(${parallaxOffset * 0.5}px)` }">
      <img :src="image(imageIndex)" alt="Hero Background" class="object-cover w-full h-full opacity-30" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
    </div>

    <div
      class="relative z-10 flex flex-col items-center justify-center h-screen px-6 text-center md:items-start md:text-left md:px-16 scroll-fade"
      data-aos="fade-up" data-aos-duration="1000">

      <h1 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Hi, I'm <span class="text-primary">RUAN, SHAO-MING</span>.
      </h1>
      <p class="max-w-2xl mb-6 text-lg text-gray-700 md:text-xl">
        A passionate web developer crafting elegant and interactive solutions.
      </p>

      <div class="flex flex-col w-full gap-4 sm:flex-row sm:w-auto">
        <button @click="scrollToCardSection"
          class="w-full px-6 py-3 text-white transition sm:py-2 sm:w-auto bg-primary rounded-xl hover:bg-primary-dark">
          Explore My Work
        </button>
        <button @click="isContactModalOpen = true"
          class="w-full px-6 py-3 transition border sm:py-2 sm:w-auto border-primary text-primary rounded-xl hover:bg-primary-light">
          Contact
        </button>
      </div>

      <div class="absolute z-20 -translate-x-1/2 bottom-10 left-1/2 animate-bounce">
        <svg class="w-8 h-8 text-gray-600 opacity-70 md:w-6 md:h-6" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <div id="card-section"
      class="scroll-mt-[100px] relative z-10 grid grid-cols-1 gap-8 px-6 pt-20 pb-20 md:pt-32 md:px-16 md:grid-cols-3 bg-cream"
      data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
      <HomeCard title="Projects" subtitle="Explore my latest works and applications." :image="image(1)"
        link="/projects" />
      <HomeCard title="Journey" subtitle="A timeline of growth, learning, and coding adventures." :image="image(2)"
        link="/journey" />
      <HomeCard title="About" subtitle="Learn who I am and what drives my passion." :image="image(3)" link="/about" />
    </div>
    <ContactModal :isOpen="isContactModalOpen" @close="isContactModalOpen = false" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import HomeCard from "../components/HomeCard.vue";
import ContactModal from "../components/ContactModal.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const image_files = [
  "LINE_ALBUM_台東出去玩第三天_241225_1.jpg",
  "HOME.jpg",
  "LINE_ALBUM_2024714高雄出來玩_241225_1.jpg",
  "LINE_ALBUM_20221225大二聖誕節🎄_241225_1.jpg",
];

const imageIndex = ref(0);
const parallaxOffset = ref(0);
const isContactModalOpen = ref(false);

const image = computed(() => {
  return (index) => {
    if (index < 0 || index >= image_files.length) {
      console.error(`Invalid index: ${index}`);
      return null;
    }
    return new URL(`../assets/images/${image_files[index]}`, import.meta.url).href;
  };
});

// 注意：原程式碼中 setInterval 沒被清除，建議在 onBeforeUnmount 裡加上 clearInterval
let intervalId;
onMounted(() => {
  AOS.init({ once: true });
  window.addEventListener("scroll", handleScroll);

  intervalId = setInterval(() => {
    imageIndex.value = (imageIndex.value + 1) % image_files.length;
  }, 5000);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (intervalId) clearInterval(intervalId);
});

const handleScroll = () => {
  // 加上 null 判斷與範圍限制，避免過度計算
  parallaxOffset.value = window.scrollY;
};

const scrollToCardSection = () => {
  const el = document.getElementById("card-section");
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
</script>

<style scoped>
.bg-cream {
  background-color: #f9f9eb;
}

.text-primary {
  color: #0f4229;
}

.bg-primary {
  background-color: #0f4229;
}

.bg-primary-dark {
  background-color: #09311f;
}

.bg-primary-light {
  background-color: #d8f3e1;
}

.border-primary {
  border-color: #0f4229;
}

.text-primary-dark {
  color: #09311f;
}

.font-sans {
  font-family: "Inter", "DM Sans", sans-serif;
}
</style>