<template>
  <nav class="sticky top-0 z-50 w-full p-4 font-mono select-none h-18 bg-navBg">
    <ul class="flex space-x-4">
      <li>
        <router-link to="/" class="mx-2 text-2xl text-text hover-effect">Home</router-link>
      </li>
      <li>
        <router-link to="/about" class="mx-2 text-2xl text-text hover-effect">About</router-link>
      </li>
      <li>
        <router-link to="/projects" class="mx-2 text-2xl text-text hover-effect">Projects</router-link>
      </li>
      <li class="text-left" :class="{ grow: !growFlex }">
        <router-link to="/journey" class="mx-2 text-2xl text-text hover-effect">Journey</router-link>
      </li>
      <transition>
        <li class="text-left" :class="{ grow: growFlex }" v-show="showSecretPage">
          <router-link to="/anniversary" class="mx-2 text-2xl text-text hover-effect">Anniversary</router-link>
        </li>
      </transition>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue";
const secretCode = ref("");
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
