<template>
  <section id="projects" class="min-h-screen p-10 bg-content">
    <h1 class="mb-6 text-3xl font-bold text-gray-800">Innovation in Action</h1>
    <div class="grid grid-cols-1 gap-6 pb-20 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="project in projects" :key="project.id" class="p-6 bg-white rounded-lg shadow-md card"
        v-show="project.id != -1">
        <h2 class="text-xl font-semibold text-gray-800">{{ project.title }}</h2>
        <img loading="lazy" decoding="async" :src="project.img" alt="" class="w-auto p-6" />
        <p class="mt-2 text-gray-600">{{ project.short_description }}</p>
        <button @click="
          selectedProject = project;
        showModal = true;
        "
          class="inline-block px-4 py-2 mt-4 text-blue-500 transition duration-500 rounded-md hover:bg-emerald-900 hover:text-emerald-100">
          Discover More
        </button>
      </div>
    </div>
    <transition name="modal" enter-active-class="transition-opacity duration-500 ease-out "
      enter-from-class="opacity-0 " enter-to-class="opacity-100 "
      leave-active-class="transition-opacity duration-500 ease-in " leave-from-class="opacity-100 "
      leave-to-class="opacity-0">
      <ProjectModal v-if="showModal" :isVisible="showModal" :project="selectedProject" @close="showModal = false" />
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProjectModal from "../components/ProjectModal.vue";

const showModal = ref(false);
const selectedProject = ref([
  {
    id: 1,
    title: "元太eNote電子紙專案",
    img: "Project/_MG_4683.jpg",
    description: "",
    link: "https://link-to-project-one.com",
  },
]);

const projects = ref([
  {
    id: 1,
    title: "NCKU vs E Ink: Future Dynamic Program",
    img: "Project/_MG_4683.jpg",
    inner_img: "Project/_MG_4994.jpg",
    short_description:
      "I explored electronic paper as a green technology to improve information access and reduce waste. This project at NCKU deepened my commitment to sustainability and inspired me to apply design and development skills toward social and environmental impact.",
    description: `This project marked my first step into web development. Built solely with HTML, CSS, and JavaScript, it may not be the most advanced among my works, but it played a significant role in paving the way for my growth and success.
      I deeply resonate with the United Nations Sustainable Development Goals (SDGs), especially in promoting environmentally friendly technologies . Among them, electronic paper stands out for its reusability and low energy consumption—qualities that make it both innovative and sustainable. Inspired by the animated newspapers in Harry Potter, I envision its potential to revolutionize how we interact with digital content.
      At National Cheng Kung University (NCKU), I have had the opportunity to apply my skills in app design and web development to explore this technology further. This hands-on experience has enriched my understanding of both system-level design and user experience challenges. While current limitations—such as slow refresh rates and screen ghosting—still hinder widespread adoption, I remain optimistic about the future of e-paper and its potential to contribute meaningfully to sustainable innovation.`,
    link: "https://eink-demo-etvn.vercel.app",
  },
  {
    id: 2,
    title: "AI++ Tainan: Innovating Tomorrow's Digital City 2024 AI Governance Tainan Hackathon",
    img: "Project/IMG_0959.png",
    inner_img: "Project/IMG_5126.png",
    short_description:
      "2024 AI Tainan Digital Governance Hackathon – Best Popularity Award Developed a web-based form management platform to replace Excel-based workflows for the Tainan Health Bureau. Led frontend development with Vue.js and integrated a Flask backend. Implemented role-based access control, input validation, version control, and task tracking to enhance cross-departmental collaboration and prevent data overwrites.",
    description: `In 2024, we participated in the AI Tainan Digital City Governance Hackathon and developed a platform to help the Health Bureau improve the efficiency of information dissemination. Through interviews with staff and volunteers, we discovered that their original communication workflow heavily relied on Excel files. This often led to errors, accidental data overwrites, and difficulty tracking changes—especially when multiple people edited the same sheet.
        To address these issues, we designed a role-based web platform where each user could log in with defined permissions. Instead of editing shared Excel files, users submitted or updated data through structured forms that automatically validated inputs and logged every change. All records were stored in a centralized database with version control and timestamps, ensuring traceability and preventing accidental overwrites. We also added a task-tracking and commenting system to replace scattered email communication, enabling more efficient collaboration across departments.
        I was responsible for building the frontend using Vue.js, while also integrating it with a Flask backend. This was my first full-stack web development project, and it taught me how to apply technology to streamline real-world government workflows. Our project was well-received by public sector stakeholders and earned us the Best Popularity Award in the competition.`,
    link: "",
  },
  {
    id: 3,
    title: "Sparkful Hack to the Top AI Hackathon",
    img: "Project/LINE_ALBUM_SPARKFUL AI金融黑客松_250430_1.jpg",
    inner_img: "Project/LINE_ALBUM_SPARKFUL AI金融黑客松_250430_2.jpg",
    short_description:
      "In 2025, our team was selected as a finalist among 200+ teams in the Sparkful Hackathon. I built the frontend with Vue.js and implemented the backend using Django. We retrained YOLOv11n on the UECFOOD256 dataset for food recognition, integrating AI, health scoring, and financial incentives into a full-stack web platform.",
    description: `In 2025, our team was selected as a finalist from over 200 teams to compete in the Sparkful Hackathon. Although we did not place in the final rankings, the experience was immensely rewarding—we gained hands-on experience with new technologies and had the opportunity to connect with other talented participants from diverse backgrounds.
        In this project, my teammate led the financial mechanism and UI design, while I was responsible for the technical implementation. I built the frontend using Vue.js, and for the backend, I took on the challenge of learning Django, becoming familiar with its MVT architecture and successfully completing full-stack integration.
        For the AI component, we used YOLOv11n as our core food recognition model. Recognizing the limitations of standard pre-trained models, we retrained it using the UECFOOD256 dataset to improve food classification performance. The final product was a web platform built with Django + Vue + YOLOv11n + UECFOOD256, integrating food recognition, health analysis, and financial incentives via RESTful APIs.
        This project provided a valuable opportunity to explore full-stack development and real-world AI deployment in a collaborative, interdisciplinary setting.
        `,
    link: "https://sparkful-frontend.vercel.app",
  },
  {
    id: 4,
    title: "Yu Jan Shin Employee Training Platform",
    img: "Project/YJS.png",
    inner_img: "Project/YJS2.png",
    short_description:
      "Contributed to a collaborative backend development project using Flask at NCKU, focusing on Modules 2 and 6. Although the project was not fully completed due to academic schedules, it provided hands-on experience in coordinating frontend-backend integration and communicating effectively with teammates and the project manager to ensure technical and design alignment.",
    description:
      "This was my first experience participating in a real-world backend system development in collaboration with a company (Yu Jan Shin). I was responsible for two key modules—Module 2 and Module 6—within a Flask-based microservice architecture using Blueprints. Although I stepped away from the later stages due to academic responsibilities, I contributed significantly in the early design and implementation phases. I worked with Amazon RDS (MySQL) and dealt with schema planning, foreign key constraint handling, and naming consistency across multiple modules. The experience also introduced me to basic web security practices such as token management, access control, and role-based permissions. Most importantly, I learned how to communicate effectively with enterprise stakeholders, synchronize with other developers through Git, and align backend logic with frontend requirements.",
    link: "",
  },
  {
    id: 5,
    title: "Structured Pruning and Fine-tuning on DeiT Models",
    img: "Project/deit_prune_summary.png", // Suggested: pruning accuracy chart
    inner_img: "Project/deit_pointwise_diff.png", // Suggested: per-model arrow chart
    short_description:
      "Conducted structured N:M pruning on DeiT models and compared full and LoRA fine-tuning strategies in terms of accuracy and resource trade-offs.",
    description: `
  This project investigates structured N:M pruning on six DeiT variants (Tiny / Small / Base × Distilled / Non-distilled) and evaluates two fine-tuning strategies: Full Finetuning and LoRA (Low-Rank Adaptation).

  Using PyTorch's WeightNormSparsifier, we applied 2:4 and 4:8 sparsity to linear layers and measured accuracy drop post-pruning. We then fine-tuned models using both full and LoRA methods, recording training time and accuracy recovery.

  Key findings include:
  - Tiny models are highly sensitive to pruning, especially under 2:4 sparsity.
  - Base models retain strong performance under 4:8 sparsity, ideal for deployment.
  - LoRA achieves competitive accuracy with significantly fewer trainable parameters, offering an efficient solution for constrained environments.

  This project lays the foundation for further work in model compression pipelines and deployable vision transformer optimization.`,
    link: "https://hackmd.io/@Z1Pajuk0RT2TQl-NwDQzDw/rk7yFLlWlg",
  },
  {
    id: 6,
    title: "2025 Hualien Hackathon",
    img: "Project/hualien_hackathon.jpg", // 請替換為實際圖片路徑
    inner_img: "Project/hualien_hackathon_inner.png", // 請替換為實際圖片路徑
    short_description:
      "2025 Hualien Hackathon – Finalist. Acted as a Data Analyst to tackle uneven tourist distribution. Analyzed open data to identify spatial imbalances and translated these insights into an Alternative Reality Game (ARG) board game, 'Wandering in Yuguang.' Designed mechanics to guide players to lesser-known spots and successfully conducted field testing with local sponsors.",
    description: `In the 2025 Hualien Hackathon, our team advanced to the finals by addressing the local issue of uneven tourist distribution. As the Data Analyst, I utilized government Open Data to analyze tourist flow trends and attraction distribution. I identified the imbalance between overcrowded hotspots and underexposed areas, translating these data insights into actionable design strategies to determine which areas needed traffic redirection and how to guide user movement through game mechanics.
      
      Moving beyond pure analysis, I collaborated with the team to turn these insights into a tangible product: an Alternative Reality Game (ARG) board game titled "Wandering in Yuguang" (〈洄遊漁光中〉). I co-designed the story scripts, mission pacing, and puzzle mechanics, ensuring each stage directly aligned with our traffic redirection goals and local consumption scenarios. This allowed players to naturally visit different attractions and local shops while completing tasks, forming a verifiable behavioral path.
      
      Finally, we successfully executed field validation. With the support of our sponsor, Lin Ji Fishball, we conducted real-world testing. We also gathered feedback through interviews with local residents and players, validating the game's story, playability, and potential to drive local tourism. This project demonstrated my ability to transform data analysis into product strategy and execute real-world validation.`,
    link: "https://hsh-mu.vercel.app/",
  },
  {
    id: 7,
    title: "Google Cloud Certificate Program",
    img: "Project/google_cloud_cert.jpg", // 建議替換為證書的實際圖檔名稱
    inner_img: "Project/google_cloud_cert.jpg",
    short_description:
      "Completed the Google Cloud Certificate Program, bridging the gap between machine learning theory and practical cloud deployment. Gained expertise in GCP infrastructure, LLMs, Prompt Engineering, and Responsible AI to design end-to-end AI applications.",
    description: `Participating in the Google Cloud Certificate Program marked a significant turning point for me, extending my AI technical skills toward practical, real-world applications. While I previously had a solid foundation in machine learning and deep learning—capable of training and fine-tuning models locally—I lacked a comprehensive understanding of how AI is deployed, maintained, and served to users in a cloud environment.
    
      Through this program, I learned the core architecture of cloud computing, including infrastructure, networking, and security design. I also mastered the integration of data analytics, machine learning, and AI services on Google Cloud. In the Generative AI courses, I gained hands-on experience with Large Language Models (LLMs), learning how to guide model behavior through Prompt Engineering and how to implement Generative AI into actual systems while strictly adhering to ethical and Responsible AI principles.
      
      This experience transformed my perspective from simply "building models" to becoming an engineer capable of "designing AI applications and cloud architectures." For my future endeavors in AI application development, automated systems, and cross-disciplinary projects, this program not only strengthened my technical expertise but also equipped me with a holistic view—spanning from cloud infrastructure and model training to the final product application. It serves as a crucial cornerstone for my continued growth in the AI field.`,
    link: "",
  },
  {
    id: 0,
    title: "Coming Soon",
    img: "Project/coming_soon.png",
    inner_img: "Project/coming_soon.png",
    description:
      "A fresh project is on the horizon, promising creativity, sustainability, and groundbreaking tech insights. Check back soon for updates!",
    short_description:
      "A fresh project is on the horizon, promising creativity, sustainability, and groundbreaking tech insights. Check back soon for updates!",
    link: "",
  },
]);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".card")
    .forEach((card) => observer.observe(card));
});
</script>

<style scoped>
.card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>
