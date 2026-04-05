<template>
  <!-- 右側固定於畫面中間 -->
  <div class="fixed right-0 z-50 hidden transform -translate-y-1/2 top-1/2 group md:block">
    <!-- 預設寬度 w-12，hover 時展開到 w-40 -->
    <div class="flex flex-col w-12 overflow-hidden transition-all duration-300 rounded-l-lg bg-navBg group-hover:w-40">
      <!-- GitHub -->
      <a :href="`${github}`" target="_blank" rel="noopener noreferrer" class="flex items-center h-12 px-2">
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub"
          class="w-6 h-6" />
        <!-- 預設 opacity-0，hover 時才顯示 -->
        <span
          class="ml-3 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">
          <p class="duration-300 hover:text-text">GitHub</p>
        </span>
      </a>

      <!-- LinkedIn -->
      <a :href="`${linkedin}`" target="_blank" rel="noopener noreferrer" class="flex items-center h-12 px-2">
        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" class="w-6 h-6" />
        <span
          class="ml-3 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">
          <p class="duration-300 hover:text-text">LinkedIn</p>
        </span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { data } from "../assets/data";
const linkedin = data.linkedin;
const github = data.github;
</script>
