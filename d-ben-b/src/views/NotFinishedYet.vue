<template>
  <div class="min-h-screen not-finished-container">
    <div class="content-box">
      <h1 class="text-rose-900">{{ title || t("notFound.title") }}</h1>
      <div class="divider"></div>
      <div class="construction-icon">
        <!-- 原本用 Font Awesome 的 fa-tools，但網站沒有載入 Font Awesome，圖示一直是空的 -->
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
          aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
        </svg>
      </div>
      <h2>{{ t("notFound.comingSoon") }}</h2>
      <p>{{ t("notFound.underDev") }}</p>
      <p class="details">{{ description || t("notFound.details") }}</p>
      <router-link to="/" class="home-button">{{ t("notFound.returnHome") }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { t } from "@/i18n";

defineProps({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
});
</script>

<style scoped>
.not-finished-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

.content-box {
  max-width: 600px;
  padding: 2.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #555;
}

.divider {
  width: 60px;
  height: 4px;
  background-color: #007bff;
  margin: 1rem auto 2rem;
  border-radius: 2px;
}

.construction-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #007bff;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;
}

.details {
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-style: italic;
}

.home-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #0056b3;
}
</style>
