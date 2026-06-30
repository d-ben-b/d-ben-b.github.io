<template>
  <section ref="root" class="relative min-h-screen px-4 py-12 overflow-hidden bg-content md:px-8">
    <h1 class="mb-3 text-3xl font-bold text-center text-gray-800 md:text-4xl">
      {{ t("timeline.heading") }}
    </h1>
    <p class="max-w-2xl mx-auto mb-12 text-sm text-center text-gray-500 md:text-base">
      {{ t("timeline.intro") }}
    </p>

    <div v-if="loading" class="py-20 text-center text-gray-400">…</div>

    <div v-else class="relative max-w-4xl pb-16 mx-auto">
      <!-- central spine -->
      <div class="absolute top-0 bottom-0 w-px left-4 md:left-1/2 md:-translate-x-1/2 bg-emerald-900/15"></div>

      <div v-for="(item, i) in items" :key="i" class="relative mb-5 tl-item md:mb-7"
        :class="i % 2 === 0 ? 'md:pr-[calc(50%+1.75rem)]' : 'md:pl-[calc(50%+1.75rem)]'">
        <!-- big faint year filling the opposite side -->
        <span v-if="year(item)"
          class="absolute z-0 hidden font-extrabold leading-none -translate-y-1/2 pointer-events-none select-none md:block top-12 text-5xl lg:text-6xl text-emerald-900/10"
          :class="i % 2 === 0 ? 'left-[calc(50%+2.5rem)]' : 'right-[calc(50%+2.5rem)] text-right'">
          {{ year(item) }}
        </span>

        <!-- node on the spine -->
        <span
          class="absolute z-10 w-3 h-3 -translate-x-1/2 rounded-full left-4 md:left-1/2 top-6 ring-4 ring-content"
          :class="dot[item.type] || 'bg-gray-400'"></span>

        <!-- card -->
        <div
          class="tl-card ml-10 md:ml-0 p-5 text-left bg-white border rounded-2xl shadow-md border-black/5 will-change-transform">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="px-2 py-0.5 text-xs font-semibold rounded-full" :class="badge[item.type] || 'bg-gray-100 text-gray-600'">
              {{ t("timeline.types." + item.type) }}
            </span>
            <span class="text-xs text-gray-400">
              {{ item.approx ? "~ " : "" }}{{ pick(item.date) }}
            </span>
          </div>

          <h3 class="text-base font-bold leading-snug text-gray-800 md:text-lg">
            {{ pick(item.title) }}
          </h3>
          <p class="mt-0.5 text-sm font-medium text-emerald-800/80">{{ pick(item.org) }}</p>
          <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ pick(item.summary) }}</p>

          <div v-if="item.tech && item.tech.length" class="flex flex-wrap gap-1.5 mt-3">
            <span v-for="tch in item.tech" :key="tch"
              class="px-2 py-0.5 text-[11px] rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
              {{ tch }}
            </span>
          </div>

          <a v-if="item.link" :href="item.link" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-1 mt-3 text-sm font-medium text-blue-600 transition hover:text-blue-800">
            {{ t("timeline.viewLink") }}
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
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
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { t, pick } from "@/i18n";

const root = ref(null);
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
  education: "bg-emerald-100 text-emerald-700",
  research: "bg-violet-100 text-violet-700",
  project: "bg-sky-100 text-sky-700",
  competition: "bg-amber-100 text-amber-700",
  certification: "bg-teal-100 text-teal-700",
  award: "bg-rose-100 text-rose-700",
};

// the calendar year, drawn large + faint on the empty side of each row
const year = (item) => (item.sort || "").slice(0, 4);

let cards = [];
let ticking = false;

// Scale up the card nearest the viewport centre; shrink + fade the ones above/below.
const update = () => {
  ticking = false;
  const mid = window.innerHeight / 2;
  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    const cardMid = rect.top + rect.height / 2;
    const norm = Math.min(Math.abs(cardMid - mid) / mid, 1); // 0 = centre, 1 = far
    const eased = norm * norm; // gentle falloff so the effect isn't too aggressive
    const scale = (1.04 - eased * 0.14).toFixed(3); // ~1.04 centre → ~0.90 edges
    const opacity = (1 - eased * 0.55).toFixed(3); // 1 centre → ~0.45 edges
    card.style.transform = `scale(${scale})`;
    card.style.opacity = opacity;
  }
};

const onScroll = () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
};

const refreshCards = async () => {
  await nextTick();
  cards = root.value ? Array.from(root.value.querySelectorAll(".tl-card")) : [];
  update();
};

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}timeline.json`);
    items.value = await res.json();
  } catch (e) {
    console.error("Failed to load timeline.json", e);
  } finally {
    loading.value = false;
  }
  await refreshCards();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});
</script>

<style scoped>
.tl-card {
  transition: transform 0.25s ease-out, opacity 0.25s ease-out, box-shadow 0.3s;
}

.tl-card:hover {
  box-shadow: 0 12px 24px rgba(15, 66, 41, 0.15);
}
</style>
