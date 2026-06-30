<template>
  <nav class="sticky top-0 z-50 w-full p-4 select-none h-18 bg-navBg">
    <div class="flex items-center justify-between">
      <button @click="isMenuOpen = !isMenuOpen" class="z-50 block p-2 md:hidden text-text focus:outline-none">
        <div class="relative w-6 h-5">
          <span :class="isMenuOpen ? 'rotate-45 translate-y-2' : ''"
            class="absolute block w-full h-0.5 bg-current transition-transform duration-300 ease-in-out top-0"></span>
          <span :class="isMenuOpen ? 'opacity-0' : ''"
            class="absolute block w-full h-0.5 bg-current transition-opacity duration-300 ease-in-out top-2"></span>
          <span :class="isMenuOpen ? '-rotate-45 -translate-y-2' : ''"
            class="absolute block w-full h-0.5 bg-current transition-transform duration-300 ease-in-out top-4"></span>
        </div>
      </button>
      <ul class="hidden md:flex md:space-x-4 md:items-center">
        <li><router-link to="/" class="mx-2 text-2xl text-text hover-effect">{{ t("nav.home") }}</router-link></li>
        <li><router-link to="/about" class="mx-2 text-2xl text-text hover-effect">{{ t("nav.about") }}</router-link></li>
        <li><router-link to="/projects" class="mx-2 text-2xl text-text hover-effect">{{ t("nav.projects") }}</router-link>
        </li>
        <li :class="{ grow: !growFlex }"><router-link to="/journey"
            class="mx-2 text-2xl text-text hover-effect">{{ t("nav.journey") }}</router-link></li>
        <transition>
          <li v-show="showSecretPage" :class="{ grow: growFlex }">
            <router-link to="/anniversary" class="mx-2 text-2xl text-text hover-effect">{{ t("nav.anniversary")
            }}</router-link>
          </li>
        </transition>
      </ul>

      <!-- Language toggle -->
      <button @click="toggleLocale"
        class="flex items-center gap-1 px-3 py-1 text-sm transition border rounded-full text-text border-text/40 hover:bg-text/10"
        :aria-label="t('nav.switchTo')" :title="t('nav.switchTo')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span class="font-semibold">{{ locale === "en" ? "中" : "EN" }}</span>
      </button>
    </div>

    <transition name="menu-fade">
      <div v-if="isMenuOpen"
        class="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 bg-navBg md:hidden">
        <router-link @click="isMenuOpen = false" to="/" class="text-3xl text-text hover-effect">{{ t("nav.home")
        }}</router-link>
        <router-link @click="isMenuOpen = false" to="/about" class="text-3xl text-text hover-effect">{{ t("nav.about")
        }}</router-link>
        <router-link @click="isMenuOpen = false" to="/projects"
          class="text-3xl text-text hover-effect">{{ t("nav.projects") }}</router-link>
        <router-link @click="isMenuOpen = false" to="/journey"
          class="text-3xl text-text hover-effect">{{ t("nav.journey") }}</router-link>
        <router-link v-if="showSecretPage" @click="isMenuOpen = false" to="/anniversary"
          class="text-3xl text-text hover-effect">{{ t("nav.anniversary") }}</router-link>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { t, locale, toggleLocale } from "@/i18n";
const secretCode = ref("");
const isMenuOpen = ref(false);
const showSecretPage = ref(false);
const growFlex = ref(false);

const submitCode = () => {
  if (secretCode.value === "3344520") {
    growFlex.value = true;
    showSecretPage.value = true;
  } else {
    showSecretPage.value = false;
    setTimeout(() => {
      growFlex.value = false;
    }, 500);
  }
};
</script>

<style scoped>
.hover-effect {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
  z-index: 2;
}

.hover-effect::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: 0;
  left: 0;
  background: #98d66c;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-in-out;
}

.hover-effect:hover::before {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
