<template>
  <footer class="bottom-0 w-full py-2 bg-navBg h-[10vh]">
    <div class="text-center text-text">
      <p>{{ t("footer.rights") }}</p>
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
        <a href="https://medium.com/@bend06b" class="text-blue-500">medium</a>
      </p>
    </div>
  </footer>
</template>

<script setup>
import { data } from "../assets/data";
import { t } from "@/i18n";
const emailData = data.email;
</script>
