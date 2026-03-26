<template>
  <footer class="bottom-0 w-full py-2 bg-navBg h-[10vh]">
    <div class="text-center text-text">
      <p>&copy; 2024 SHAO-MING, RUAN. All rights reserved.</p>
      <p>
        Contact me at:
        <a :href="`mailto:${emailData}`" class="text-blue-500">{{
          emailData
        }}</a>
      </p>
      <p>
        Follow my social media:
        <a href="https://vocus.cc/salon/d-ben-b" class="text-blue-500">Vocus</a>
        |
        <a href="https://medium.com/@bend06b" class="text-blue-500">medium</a>
      </p>
    </div>
  </footer>
</template>

<script setup>
import { data } from "../assets/data";
const emailData = data.email;
</script>
