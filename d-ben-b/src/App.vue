<template>
  <div class="flex flex-col items-center content bg-content">
    <NavBar />
    <outerLink />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </router-view>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import outerLink from "./components/OuterLink.vue";
</script>

<style scoped>
.content {
  text-align: center;
  color: #2c3e50;
}

/* 淡入淡出過渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
