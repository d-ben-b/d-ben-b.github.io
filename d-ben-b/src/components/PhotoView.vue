<template>
  <div v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center transition-opacity bg-black bg-opacity-75"
    @click="closeModal">
    <div class="relative max-w-4xl p-6 mx-auto overflow-hidden bg-white rounded-lg shadow-xl" @click.stop>

      <!-- Close button -->
      <button @click="closeModal" class="absolute text-gray-500 transition-colors top-4 right-4 hover:text-gray-800">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Photo content -->
      <div class="flex flex-col items-center mt-4">
        <img v-if="selectedPhoto" :src="currentImage" alt="" class="max-h-[50vh] object-contain" />

        <!-- Thumbnails section -->
        <div v-if="hasMultipleImages" class="flex flex-wrap justify-center gap-2 mt-4">
          <div v-for="(img, idx) in allImages" :key="idx" @click="currentImageIndex = idx"
            class="w-16 h-16 transition-all border-2 cursor-pointer"
            :class="currentImageIndex === idx ? 'border-blue-500 opacity-100' : 'border-gray-200 opacity-70 hover:opacity-100'">
            <img :src="img" alt="" class="object-cover w-full h-full" />
          </div>
        </div>

        <div class="mt-4 text-xl font-semibold text-center">{{ selectedPhoto?.title }}</div>
        <div class="mt-4 text-xl text-center">{{ selectedPhoto?.desc }}</div>
        <div class="mt-2 text-gray-600">{{ selectedPhoto?.date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  selectedPhoto: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close']);
const currentImageIndex = ref(0);

// Reset the current image index when photo changes
const resetImageIndex = () => {
  currentImageIndex.value = 0;
};

// Watch for changes in selectedPhoto
const closeModal = () => {
  emit('close');
  resetImageIndex();
};

// Compute if the selected photo has multiple images
const hasMultipleImages = computed(() => {
  return props.selectedPhoto &&
    props.selectedPhoto.image_files &&
    props.selectedPhoto.image_files.length > 0;
});

// Create an array of all images (main image + additional images)
const allImages = computed(() => {
  if (!props.selectedPhoto) return [];

  const images = [props.selectedPhoto.image];

  if (hasMultipleImages.value) {
    images.push(...props.selectedPhoto.image_files);
  }

  return images;
});

// Get the current image to display
const currentImage = computed(() => {
  if (!props.selectedPhoto) return '';

  if (currentImageIndex.value === 0 || !hasMultipleImages.value) {
    return props.selectedPhoto.image;
  }

  return allImages.value[currentImageIndex.value];
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>