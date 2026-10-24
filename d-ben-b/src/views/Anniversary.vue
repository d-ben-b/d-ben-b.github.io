<template>
  <div class="container flex flex-col items-center justify-center w-full min-h-screen p-4">
    <transition name="modal" enter-active-class="transition-opacity duration-500 ease-out "
      enter-from-class="opacity-0 " enter-to-class="opacity-100 "
      leave-active-class="transition-opacity duration-200 ease-in " leave-from-class="opacity-100 "
      leave-to-class="opacity-0">
      <PhotoView :isOpen="isModalOpen" :selectedPhoto="selectedPhoto" @close="closeModal" />
    </transition>
    <div ref="scrollContainer1"
      class="flex flex-col w-full overflow-x-auto select-none scroll-container h-fit active:cursor-grabbing"
      @mousedown="startDrag($event, 1)" @mousemove="onDrag($event, 1)" @mouseleave="stopDrag" @mouseup="stopDrag">
      <!-- Rope SVG（延伸進來用 dashed 線條） -->
      <svg class=" left-0 w-[120%] h-8 z-0" viewBox="0 0 600 50" preserveAspectRatio="none">
        <path d="M0,25 C100,5 200,45 300,25 C400,5 500,45 600,25" stroke="#8B5E3C" stroke-width="6" fill="none"
          stroke-linecap="round" stroke-dasharray="6,6" />
      </svg>
      <div class="flex w-[120%] gap-4 px-4 py-2 flex-nowrap">
        <PhotoCard class="card" v-for="(photo, index) in photos" :image="photo.image" :time="photo.date"
          :title="photo.title" :key="index" @click="openModal(index, 1)" />
      </div>
    </div>
    <div ref="scrollContainer2"
      class="flex flex-col w-full h-full overflow-x-auto select-none scroll-container active:cursor-grabbing"
      @mousedown="startDrag($event, 2)" @mousemove="onDrag($event, 2)" @mouseleave="stopDrag" @mouseup="stopDrag">
      <svg class="left-0 w-[120%] h-8 z-0 flex-shrink" viewBox="0 0 600 50" preserveAspectRatio="none">
        <path d="M0,25 C100,5 200,45 300,25 C400,5 500,45 600,25" stroke="#8B5E3C" stroke-width="6" fill="none"
          stroke-linecap="round" stroke-dasharray="6,6" />
      </svg>
      <div class="flex w-[120%] gap-4 px-4 py-2 flex-nowrap ">
        <PhotoCard class="card" v-for="(photo2, index) in photos2" :image="photo2.image" :time="photo2.date"
          :title="photo2.title" :key="index" @click="openModal(index, 2)" />
      </div>
    </div>
    <p class="final-message">
      很高興你夠看到這邊，可能前面想為了配合以前這個網頁的設計有用一些英文，不過後來我覺得除了很多用詞以及地名翻譯起來真的太難了，後來都改用中文了，在這裡我選了最早的十個我覺得我還蠻喜歡而且比較有內容可以寫的相簿來做每個字都是我一個個打出來的包括這整個頁面，(原先是想要準備更多照片的不過排版真的花太多時間了QQ)，我覺得這不會是結束，我希望能夠繼續能夠把這個做完甚至是未來之後的照片我們都能放在這，這次的準備有點像剛開始我對於這個網站一部份的想像，也很高興我真的做出來了，也祝我家寶寶有一個開心的紀念日。
    </p>
  </div>

</template>

<script setup>
import { ref, computed } from "vue";
import PhotoCard from "@/components/PhotoCard.vue";
import PhotoView from "@/components/PhotoView.vue"
import { registerImages } from "@/lib/images";

// 這頁照片的尺寸清單只在這頁需要，跟著這頁的程式一起載入（由 scripts/build-images.mjs 產生）
const manifests = import.meta.glob("/src/generated/images-anniversary.json", { eager: true, import: "default" });
Object.values(manifests).forEach(registerImages);
const scrollContainer1 = ref(null);
const scrollContainer2 = ref(null);
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

const containerMap = {
  1: scrollContainer1,
  2: scrollContainer2
};

const isModalOpen = ref(false);
const selectedPhotoIndex = ref(null);
const selectedPhoto = computed(() => {
  if (selectedPhotoIndex.value !== null && selectedPhotoIndex.value >= 0 && selectedPhotoIndex.value < photos.length) {
    return photos[selectedPhotoIndex.value];
  }
  else if (selectedPhotoIndex.value !== null && selectedPhotoIndex.value < 0 && Math.abs(selectedPhotoIndex.value) <= photos2.length) {
    return photos2[Math.abs(selectedPhotoIndex.value) - 1];
  }
  return null;
});

const photos = [
  {
    image: "anniversary/first/1-0.jpg",
    date: "2022-08-30",
    title: "Dating for the first time",
    desc: "this is the first time we met, and it was a very special day for us. we went to many places, and we had a lot of fun together. we also took a lot of photos to remember this day.",
    image_files: [
      "anniversary/first/1-1.jpg",
      "anniversary/first/1-2.jpg",
      "anniversary/first/1-3.jpg",
      "anniversary/first/1-4.jpg",
      "anniversary/first/1-5.jpg",
      "anniversary/first/1-6.jpg",
      "anniversary/first/1-7.jpg",
      "anniversary/first/1-8.jpg",
    ],
  },
  {
    image: "anniversary/Anping/2-0.jpg",
    date: "2022-09-11",
    title: "Anping",
    desc: "Anping is a place we visited together, the most memorable part was we go to Anping Tree House, and we took a lot of photos there. we also went to the Anping Port to see TSUM TSUM. I am very happy to be with you on this day, and I hope we can go to more places together in the future.",
    image_files: [
      "anniversary/Anping/2-1.jpg",
      "anniversary/Anping/2-2.jpg",
      "anniversary/Anping/2-3.jpg",
      "anniversary/Anping/2-4.jpg",
    ],
  },
  {
    image: "anniversary/Helloween/3-0.jpg",
    date: "2022-10-28",
    title: "Helloween",
    desc: "At first, I was a bit nervous about joining this event because I didn’t really know everyone that well, and I was afraid I might get tricked. But once I arrived, we had so much fun together — we painted, made soap, and played some small games. I’m really glad I went to this Halloween party with you.",
    image_files: [
      "anniversary/Helloween/3-1.jpg",
      "anniversary/Helloween/3-2.jpg",
      "anniversary/Helloween/3-3.jpg",
      "anniversary/Helloween/3-4.jpg",
    ],
  },
  {
    image: "anniversary/Chrismas/4-0.jpg",
    date: "2022-12-25",
    title: "Chrismas",
    desc: "我記得這次聖誕節我收到一個非常令我印象深刻的禮物，那是你給我藏起來偷偷裝上蓋子的安全帽，這道我現在我還是清晰德記的尤其是我那時候還帶著搭手扶梯，想想真是太呆了，不過我也很開心當下有這麼做，畢竟這真的是很難得的經驗呢！(放棄翻譯成英文了＼（〇_ｏ）／)",
    image_files: [
      "anniversary/Chrismas/4-1.jpg",
      "anniversary/Chrismas/4-2.jpg",
      "anniversary/Chrismas/4-3.jpg",
      "anniversary/Chrismas/4-4.jpg",
    ],
  },
  {
    image: "anniversary/Taichang/5-0.jpg",
    date: "2023-01-29",
    title: "Taichang Trip",
    desc: "我們這次去台中玩，我們買了泡芙以及去逛了審計新村，那時候我印象最深刻的就是我們買了一個很可愛的小電鍋，雖然已經找不到他在那裡了，也許這就是叫我們之後再去逛一次(*/ω＼*)，逢甲夜市我也很開心我們吃了很多之前沒有吃過的。",
    image_files: [
      "anniversary/Taichang/5-1.jpg",
      "anniversary/Taichang/5-2.jpg",
      "anniversary/Taichang/5-3.jpg",
      "anniversary/Taichang/5-4.jpg",
    ],
  },
];

const photos2 = [
  {
    image: "anniversary/Mango/6-0.jpg",
    date: "2023-03-24",
    title: "成大芒果節",
    desc: "一開始打開相簿的時候還覺得我不會拿個當作紀錄，怕照片太少，不果出乎意料的是我們拍得真的太多張了，而且這的確是需要拿來紀念遺下的，我還記的你在用網子抓芒果的時候可愛的樣子☆*: .｡. o(≧▽≦)o .｡.:*☆。也還記的那時候我們做的芒果青有多好吃，最後做的真的太多了沒有吃完QQ",
    image_files: [
      "anniversary/Mango/6-1.jpg",
      "anniversary/Mango/6-2.jpg",
      "anniversary/Mango/6-3.jpg",
      "anniversary/Mango/6-4.jpg",
    ],
  },
  {
    image: "anniversary/PigBirth/7-0.jpg",
    date: "2023-04-17",
    title: "My Piggy's Birthday",
    desc: "這次生日哩，我想了蠻久該怎麼做才能讓你印想深刻，後來做了一個禮物包，外面我那時候覺得用用紙袋蠻有質感的加上我那時候覺得很可愛的植物大戰殭屍，裡面附上我寫給你的卡片以及解謎卡，還吃了火鍋，跟你在一起真的很幸福(｡♥‿♥｡)。",
    image_files: [
      "anniversary/PigBirth/7-1.jpg",
      "anniversary/PigBirth/7-2.jpg",

    ],
  },
  {
    image: "anniversary/FishIsland/8-0.jpg",
    date: "2023-07-10",
    title: "Yuguang Island",
    desc: "你不是常說如果沒有你我不會怎麼樣怎麼樣的，這個的確是，如果沒有遇到妳我的確不會去漁光島，第一真的太遠了，而且漁光島都是情侶如果沒有遇到妳我也不次想去:P，你一直有一個很可愛的習慣都喜歡拍影子，我在這是整理的時候有發現，很好奇為什麼，等你讀到這裡在回答我吧(๑´ڡ`๑)。",
    image_files: [
      "anniversary/FishIsland/8-1.jpg",
      "anniversary/FishIsland/8-2.jpg",
      "anniversary/FishIsland/8-3.jpg",
      "anniversary/FishIsland/8-4.jpg",
    ],
  },
  {
    image: "anniversary/Kaohsiung/9-0.jpg",
    date: "2024-07-14",
    title: "Kaohsiung",
    desc: "我喜歡去高雄，除了那是你熟悉的地方我們可以逛得更加開心之外，我也很想能夠藉由多了解你，我們在這之中吃了很多好吃的野趣很多有名的地方逛，真的想你說的，跟著蘋蘋(ㄅㄨ一 ˊㄅㄨ一 ˊ)吃好喝好ヾ(≧▽≦*)o",
    image_files: [
      "anniversary/Kaohsiung/9-1.jpg",
      "anniversary/Kaohsiung/9-2.jpg",
      "anniversary/Kaohsiung/9-3.jpg",
      "anniversary/Kaohsiung/9-4.jpg",
    ],
  },
  {
    image: "anniversary/Penghu/10-0.jpg",
    date: "2024-07-16",
    title: "Penghu",
    desc: "我發現我們我真的去了很多地方，澎湖對於我來說是真的跑得很遠，再找照片的時候還看到那時候你出發時搭船的可怕照片，到了當地我們看了奇怪的牡蠣雕像以及吃了牛肉麵以及仙人掌冰，還拍了很多很多照片，這次的旅程我真的很開心，遇到你真的很幸運(｡♥‿♥｡)。",
    image_files: [
      "anniversary/Penghu/10-1.jpg",
      "anniversary/Penghu/10-2.jpg",
      "anniversary/Penghu/10-3.jpg",
      "anniversary/Penghu/10-4.jpg",
    ],
  },
]

const openModal = (index, photo_number) => {
  if (photo_number === 1) {
    selectedPhotoIndex.value = index;
  }
  else if (photo_number === 2) {
    selectedPhotoIndex.value = -index - 1; // Use negative index for photos2
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const startDrag = (e, id) => {
  isDragging = true;
  const container = containerMap[id].value;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
};

const onDrag = (e, id) => {
  if (!isDragging) return;
  e.preventDefault();
  const container = containerMap[id].value;
  const x = e.pageX - container.offsetLeft;
  const walk = x - startX;
  container.scrollLeft = scrollLeft - walk;
};

const stopDrag = () => {
  isDragging = false;
};
</script>

<style scoped>
.card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.scroll-container {
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  /* IE & Edge */
  scrollbar-width: none;
  /* Firefox */
}

.scroll-container::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

.final-message {
  max-width: 768px;
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fef9f5;
  border-left: 6px solid #f59e0b;
  /* 橘黃色強調 */
  border-radius: 0.75rem;
  font-size: 1rem;
  line-height: 1.75rem;
  color: #444;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: justify;
  white-space: pre-line;
}
</style>
