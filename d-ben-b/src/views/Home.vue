<template>
  <section class="relative w-full min-h-screen overflow-hidden font-sans text-gray-800 bg-cream">
    <div ref="heroBg" class="absolute inset-0 z-0 will-change-transform">
      <!-- 下一張先在背景下載、解碼好才切換，兩張疊在一起淡入淡出 -->
      <Transition name="hero-fade">
        <div :key="heroIndex" class="absolute inset-0 opacity-30">
          <SmartImg :src="heroImages[heroIndex]" alt="" sizes="100vw" :eager="heroIndex === 0"
            class="object-cover w-full h-full" />
        </div>
      </Transition>
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
    </div>

    <div v-reveal
      class="relative z-10 flex flex-col items-center justify-center h-screen px-6 text-center md:items-start md:text-left md:px-16">

      <h1 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        {{ t("home.greeting") }}<span class="text-primary">{{ t("home.name") }}</span>{{ t("home.greetingEnd") }}
      </h1>
      <p class="max-w-2xl mb-6 text-lg text-gray-700 md:text-xl">
        {{ t("home.tagline") }}
      </p>

      <div class="flex flex-col w-full gap-4 sm:flex-row sm:w-auto">
        <button @click="scrollToCardSection"
          class="w-full px-6 py-3 text-white transition sm:py-2 sm:w-auto bg-primary rounded-xl hover:bg-primary-dark">
          {{ t("home.explore") }}
        </button>
        <button @click="isContactModalOpen = true"
          class="w-full px-6 py-3 transition border sm:py-2 sm:w-auto border-primary text-primary rounded-xl hover:bg-primary-light">
          {{ t("home.contact") }}
        </button>
      </div>

      <div class="absolute z-20 -translate-x-1/2 bottom-10 left-1/2 animate-bounce">
        <svg class="w-8 h-8 text-gray-600 opacity-70 md:w-6 md:h-6" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <div id="card-section" v-reveal="200"
      class="scroll-mt-[100px] relative z-10 grid grid-cols-1 gap-8 px-6 pt-20 pb-20 md:pt-32 md:px-16 md:grid-cols-3 bg-cream">
      <HomeCard :title="t('home.cards.projects.title')" :subtitle="t('home.cards.projects.subtitle')"
        :image="heroImages[1]" link="/projects" />
      <HomeCard :title="t('home.cards.journey.title')" :subtitle="t('home.cards.journey.subtitle')"
        :image="heroImages[2]" link="/journey" />
      <HomeCard :title="t('home.cards.about.title')" :subtitle="t('home.cards.about.subtitle')"
        :image="heroImages[3]" link="/about" />
    </div>
    <ContactModal :isOpen="isContactModalOpen" @close="isContactModalOpen = false" />
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import HomeCard from "../components/HomeCard.vue";
import ContactModal from "../components/ContactModal.vue";
import SmartImg from "../components/SmartImg.vue";
import { heroImages } from "@/assets/heroImages";
import { preloadImage } from "@/lib/images";
import { t } from "@/i18n";

const heroIndex = ref(0);
const heroBg = ref(null);
const isContactModalOpen = ref(false);

// 輪播：看不到首屏（分頁在背景或已經往下捲）就不換，省流量
let rotateTimer;
let rotating = false;
const rotateHero = async () => {
  if (rotating || document.hidden || window.scrollY > window.innerHeight) return;
  rotating = true;
  const next = (heroIndex.value + 1) % heroImages.length;
  await preloadImage(heroImages[next], "100vw");
  heroIndex.value = next;
  rotating = false;
};

// 視差：每個畫面更新最多算一次，直接改 transform，不經過 Vue 重新渲染
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let ticking = false;
const handleScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const y = window.scrollY;
    if (heroBg.value && y <= window.innerHeight * 1.5) {
      heroBg.value.style.transform = `translate3d(0, ${y * 0.5}px, 0)`;
    }
  });
};

onMounted(() => {
  if (!reduceMotion) window.addEventListener("scroll", handleScroll, { passive: true });
  rotateTimer = setInterval(rotateHero, 6000);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  clearInterval(rotateTimer);
});

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

.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1.2s ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}
</style>
