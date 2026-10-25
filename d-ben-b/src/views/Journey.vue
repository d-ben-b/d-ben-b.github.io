<template>
  <section class="relative min-h-screen px-4 py-12 overflow-hidden bg-content md:px-8">
    <h1 class="mb-3 text-3xl font-bold text-center text-stone-800 md:text-4xl">
      {{ t("timeline.heading") }}
    </h1>
    <p class="max-w-2xl mx-auto mb-12 text-base text-center text-stone-600 md:text-lg phrase-wrap">
      {{ t("timeline.intro") }}
    </p>

    <div v-if="loading" class="py-20 text-center text-stone-400">…</div>

    <div v-else class="relative max-w-5xl pb-16 mx-auto">
      <!-- central spine -->
      <div class="absolute top-0 bottom-0 w-px left-4 md:left-1/2 md:-translate-x-1/2 bg-emerald-900/15"></div>

      <div v-for="(item, i) in items" :key="i" class="relative mb-6 md:mb-8"
        :class="i % 2 === 0 ? 'md:pr-[calc(50%+1.75rem)]' : 'md:pl-[calc(50%+1.75rem)]'">
        <!-- big faint year filling the opposite side -->
        <span v-if="year(item)"
          class="absolute z-0 hidden font-extrabold leading-none -translate-y-1/2 pointer-events-none select-none md:block top-12 text-5xl lg:text-6xl text-emerald-900/10"
          :class="i % 2 === 0 ? 'left-[calc(50%+2.5rem)]' : 'right-[calc(50%+2.5rem)] text-right'">
          {{ year(item) }}
        </span>

        <!-- node on the spine -->
        <span
          class="absolute z-10 w-3 h-3 -translate-x-1/2 rounded-full left-4 md:left-1/2 top-7 ring-4 ring-content"
          :class="dot[item.type] || 'bg-gray-400'"></span>

        <!-- card -->
        <div class="p-5 ml-10 text-left border shadow-sm tl-card md:ml-0 md:p-6 bg-paper rounded-2xl border-stone-900/10">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 text-sm font-semibold rounded-full" :class="badge[item.type] || 'bg-gray-100 text-gray-600'">
              {{ t("timeline.types." + item.type) }}
            </span>
            <span class="text-sm text-stone-500">
              {{ item.approx ? "~ " : "" }}{{ pick(item.date) }}
            </span>
          </div>

          <h3 class="text-lg font-bold leading-snug text-stone-800 md:text-xl">
            {{ pick(item.title) }}
          </h3>
          <p class="mt-1 text-base font-medium text-emerald-800">{{ pick(item.org) }}</p>
          <p class="mt-2 text-base leading-relaxed text-stone-700 md:text-[17px] md:leading-8">{{ pick(item.summary) }}</p>

          <div v-if="item.tech && item.tech.length" class="flex flex-wrap gap-1.5 mt-3">
            <span v-for="tch in item.tech" :key="tch"
              class="px-2 py-0.5 text-sm rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
              {{ tch }}
            </span>
          </div>

          <a v-if="item.link" :href="item.link" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-1 mt-3 text-base font-medium text-blue-700 transition hover:text-blue-900">
            {{ t("timeline.viewLink") }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14 5h5m0 0v5m0-5L10 14M5 9v10a1 1 0 001 1h10" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { t, pick } from "@/i18n";

const items = ref([]);
const loading = ref(true);

// subtle accent colours per milestone type
const dot = {
  education: "bg-emerald-500",
  research: "bg-violet-500",
  project: "bg-sky-500",
  competition: "bg-amber-500",
  certification: "bg-teal-500",
  award: "bg-rose-500",
};
const badge = {
  education: "bg-emerald-100 text-emerald-800",
  research: "bg-violet-100 text-violet-800",
  project: "bg-sky-100 text-sky-800",
  competition: "bg-amber-100 text-amber-800",
  certification: "bg-teal-100 text-teal-800",
  award: "bg-rose-100 text-rose-800",
};

// the calendar year, drawn large + faint on the empty side of each row
const year = (item) => (item.sort || "").slice(0, 4);

// 卡片原本會隨捲動縮小、變淡（離畫面中央越遠越小），字也跟著變小不好讀，所以拿掉
onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}timeline.json`);
    // 依 sort（YYYY-MM）新到舊排；同一個月的照 timeline.json 裡的順序
    items.value = (await res.json()).sort((a, b) => (b.sort || "").localeCompare(a.sort || ""));
  } catch (e) {
    console.error("Failed to load timeline.json", e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.tl-card {
  transition: box-shadow 0.3s;
}

.tl-card:hover {
  box-shadow: 0 12px 24px rgba(15, 66, 41, 0.12);
}
</style>
