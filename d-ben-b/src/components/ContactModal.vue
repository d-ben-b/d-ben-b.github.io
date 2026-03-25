<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click.self="closeModal">
      <Transition name="bounce" appear>
        <div v-if="isOpen" class="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">

          <div class="h-24 bg-gradient-to-r from-[#0f4229] to-[#1b5e3f]"></div>

          <button @click="closeModal"
            class="absolute p-2 text-gray-500 transition bg-white rounded-full top-3 right-3 hover:text-gray-900 hover:bg-gray-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="px-8 pb-8 -mt-12 text-center">
            <div
              class="inline-flex items-center justify-center w-24 h-24 mb-4 bg-white border-4 border-white rounded-full shadow-lg">
              <span class="text-4xl font-bold text-[#0f4229]">B</span>
            </div>

            <h2 class="text-2xl font-bold text-gray-900">Let's Build Something!</h2>
            <p class="mt-2 mb-6 text-sm text-gray-500">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>

            <div class="flex flex-col gap-3">
              <div class="relative group">
                <a :href="`mailto:${contactData.email}`"
                  class="flex items-center p-3 transition border border-gray-200 rounded-xl hover:border-[#0f4229] hover:bg-gray-50">
                  <div class="flex items-center justify-center w-10 h-10 mr-4 rounded-lg bg-[#d8f3e1] text-[#0f4229]">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="text-left">
                    <p class="text-xs font-semibold tracking-wider text-gray-400 uppercase">Email</p>
                    <p class="font-medium text-gray-800">{{ contactData.email }}</p>
                  </div>
                </a>
                <button @click.prevent="copyEmail"
                  class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 transition opacity-0 group-hover:opacity-100 hover:text-[#0f4229]"
                  title="Copy Email">
                  <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012-2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span v-else class="text-xs font-bold text-[#0f4229]">Copied!</span>
                </button>
              </div>

              <a :href="contactData.linkedin" target="_blank"
                class="flex items-center p-3 transition border border-gray-200 rounded-xl hover:border-[#0f4229] hover:bg-gray-50">
                <div class="flex items-center justify-center w-10 h-10 mr-4 rounded-lg bg-[#e1f0fe] text-[#0a66c2]">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div class="text-left">
                  <p class="text-xs font-semibold tracking-wider text-gray-400 uppercase">LinkedIn</p>
                  <p class="font-medium text-gray-800">Connect with me</p>
                </div>
              </a>

              <a :href="contactData.github" target="_blank"
                class="flex items-center p-3 transition border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50">
                <div class="flex items-center justify-center w-10 h-10 mr-4 text-gray-800 bg-gray-100 rounded-lg">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="text-left">
                  <p class="text-xs font-semibold tracking-wider text-gray-400 uppercase">GitHub</p>
                  <p class="font-medium text-gray-800">Explore my code</p>
                </div>
              </a>
              <a href="/Resume.pdf" target="_blank"
                class="flex items-center justify-center p-3 mt-2 text-white transition shadow-md rounded-xl bg-[#0f4229] hover:bg-[#1b5e3f] hover:shadow-lg group">
                <svg class="w-5 h-5 mr-2 transition-transform group-hover:-translate-y-1" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span class="font-semibold tracking-wide">Download CV</span>
              </a>

            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';
// 確保路徑對應你的資料夾結構
import { data as contactData } from '../assets/data.js';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);
const copied = ref(false);

const closeModal = () => {
  emit('close');
  copied.value = false;
};

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(contactData.email);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
</script>

<style scoped>
/* 外層：只控制背景淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 內層：控制 Modal 本體的縮放與淡出 */
.bounce-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.bounce-leave-active {
  transition: all 0.2s ease-in;
}

.bounce-enter-from,
.bounce-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>