<template>
  <section class="w-full font-sans text-stone-800 bg-content">
    <!-- 首屏：左邊自我介紹，右邊照片（手機上照片在上面） -->
    <!-- 背景墊淡綠漸層和細點底紋，首屏才不會一片空白 -->
    <div class="relative overflow-hidden hero-bg">
      <div
        class="relative flex flex-col-reverse items-center justify-center w-full max-w-6xl gap-10 px-6 py-12 mx-auto md:flex-row md:gap-16 md:px-12 md:min-h-[calc(100vh-4.25rem)]">
        <div v-reveal class="flex flex-col items-center flex-1 text-center md:items-start md:text-left">
          <h1 class="mb-5 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            {{ t("home.greeting") }}<span class="text-primary">{{ t("home.name") }}</span>
          </h1>
          <p class="max-w-xl mb-8 text-lg leading-relaxed text-stone-700 md:text-xl phrase-wrap">
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
        </div>

        <!-- 照片放在 4:5 的相框裡，裁哪一塊由 heroImages.js 的 hero 決定，臉才不會被切掉；
             下一張先在背景下載、解碼好才切換，兩張疊在一起淡入淡出。相框後面墊一塊錯開的深綠色 -->
        <div class="relative w-60 md:w-[360px] lg:w-[420px] aspect-[4/5] shrink-0">
          <div class="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 rounded-3xl bg-[#0f4229]/85"></div>
          <div class="absolute inset-0 overflow-hidden shadow-xl rounded-3xl bg-stone-300">
            <Transition name="hero-fade">
              <div :key="heroIndex" class="absolute inset-0">
                <SmartImg :src="heroImages[heroIndex].src" alt="" :sizes="heroSizes" :eager="heroIndex === 0"
                  class="object-cover w-full h-full" :style="{ objectPosition: heroImages[heroIndex].hero }" />
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <div id="card-section" v-reveal="200"
      class="scroll-mt-[100px] grid grid-cols-1 gap-8 px-6 pt-10 pb-20 md:pt-16 md:px-16 md:grid-cols-3">
      <HomeCard :title="t('home.cards.projects.title')" :subtitle="t('home.cards.projects.subtitle')"
        :image="heroImages[1].src" :position="heroImages[1].card" link="/projects" />
      <HomeCard :title="t('home.cards.journey.title')" :subtitle="t('home.cards.journey.subtitle')"
        :image="heroImages[2].src" :position="heroImages[2].card" link="/journey" />
      <HomeCard :title="t('home.cards.about.title')" :subtitle="t('home.cards.about.subtitle')"
        :image="heroImages[3].src" :position="heroImages[3].card" link="/about" />
    </div>
    <ContactModal :isOpen="isContactModalOpen" @close="isContactModalOpen = false" />
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import HomeCard from "../components/HomeCard.vue";
import ContactModal from "../components/ContactModal.vue";
import SmartImg from "../components/SmartImg.vue";
import { heroImages, heroSizes } from "@/assets/heroImages";
import { preloadImage } from "@/lib/images";
import { t } from "@/i18n";

const heroIndex = ref(0);
const isContactModalOpen = ref(false);

// 輪播：看不到首屏（分頁在背景或已經往下捲）就不換，省流量
let rotateTimer;
let rotating = false;
const rotateHero = async () => {
  if (rotating || document.hidden || window.scrollY > window.innerHeight) return;
  rotating = true;
  const next = (heroIndex.value + 1) % heroImages.length;
  await preloadImage(heroImages[next].src, heroSizes);
  heroIndex.value = next;
  rotating = false;
};

onMounted(() => {
  rotateTimer = setInterval(rotateHero, 6000);
});

onBeforeUnmount(() => {
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
.hero-bg {
  background-image:
    radial-gradient(circle at 12% 18%, rgba(152, 214, 108, 0.28), transparent 42%),
    radial-gradient(circle at 88% 85%, rgba(15, 66, 41, 0.16), transparent 48%),
    radial-gradient(rgba(15, 66, 41, 0.1) 1.2px, transparent 1.2px);
  background-size: auto, auto, 22px 22px;
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

.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1.2s ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}
</style>
