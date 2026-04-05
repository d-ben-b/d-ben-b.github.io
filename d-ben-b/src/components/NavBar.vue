<template>
  <nav class="sticky top-0 z-50 w-full p-4 font-mono select-none h-18 bg-navBg">
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
      <ul class="hidden md:flex md:space-x-4">
        <li><router-link to="/" class="mx-2 text-2xl text-text hover-effect">Home</router-link></li>
        <li><router-link to="/about" class="mx-2 text-2xl text-text hover-effect">About</router-link></li>
        <li><router-link to="/projects" class="mx-2 text-2xl text-text hover-effect">Projects</router-link></li>
        <li :class="{ grow: !growFlex }"><router-link to="/journey"
            class="mx-2 text-2xl text-text hover-effect">Journey</router-link></li>
        <transition>
          <li v-show="showSecretPage" :class="{ grow: growFlex }">
            <router-link to="/anniversary" class="mx-2 text-2xl text-text hover-effect">Anniversary</router-link>
          </li>
        </transition>
      </ul>
    </div>

    <transition name="menu-fade">
      <div v-if="isMenuOpen"
        class="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 bg-navBg md:hidden">
        <router-link @click="isMenuOpen = false" to="/" class="text-3xl text-text hover-effect">Home</router-link>
        <router-link @click="isMenuOpen = false" to="/about" class="text-3xl text-text hover-effect">About</router-link>
        <router-link @click="isMenuOpen = false" to="/projects"
          class="text-3xl text-text hover-effect">Projects</router-link>
        <router-link @click="isMenuOpen = false" to="/journey"
          class="text-3xl text-text hover-effect">Journey</router-link>
        <router-link v-if="showSecretPage" @click="isMenuOpen = false" to="/anniversary"
          class="text-3xl text-text hover-effect">Anniversary</router-link>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
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
