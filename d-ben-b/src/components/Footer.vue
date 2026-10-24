<template>
  <footer class="w-full px-4 py-4 bg-navBg">
    <div class="space-y-1 text-center text-text">
      <p>{{ t("footer.rights").replace("{year}", year) }}</p>
      <p>
        {{ t("footer.contact") }}
        <a :href="`mailto:${emailData}`" class="text-blue-500">{{
          emailData
        }}</a>
      </p>
      <p>
        {{ t("footer.follow") }}
        <a href="https://vocus.cc/salon/d-ben-b" class="text-blue-500">Vocus</a>
        |
        <a href="https://medium.com/@bend06b" class="text-blue-500">Medium</a>
      </p>
    </div>
  </footer>
</template>

<script setup>
import { data } from "../assets/data";
import { t } from "@/i18n";
const emailData = data.email;
const year = new Date().getFullYear();
</script>
