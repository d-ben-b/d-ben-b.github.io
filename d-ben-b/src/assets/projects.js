// Bilingual project data. Each text field is { en, zh }; pick() in components
// selects the right language at render time. Draft zh translations — feel free
// to refine the wording.
const projects = [
  {
    id: 1,
    title: {
      en: "NCKU vs E Ink: Future Dynamic Program",
      zh: "成大 × 元太 E Ink：未來動態學程",
    },
    img: "Project/_MG_4683.jpg",
    inner_img: "Project/_MG_4994.jpg",
    short_description: {
      en: "I explored electronic paper as a green technology to improve information access and reduce waste. This project at NCKU deepened my commitment to sustainability and inspired me to apply design and development skills toward social and environmental impact.",
      zh: "我探索電子紙作為一種綠色科技，藉以提升資訊取得便利性並減少浪費。這個在成大進行的專案深化了我對永續的投入，也啟發我把設計與開發能力運用在社會與環境影響上。",
    },
    description: {
      en: `This project marked my first step into web development. Built solely with HTML, CSS, and JavaScript, it may not be the most advanced among my works, but it played a significant role in paving the way for my growth and success.
      I deeply resonate with the United Nations Sustainable Development Goals (SDGs), especially in promoting environmentally friendly technologies . Among them, electronic paper stands out for its reusability and low energy consumption—qualities that make it both innovative and sustainable. Inspired by the animated newspapers in Harry Potter, I envision its potential to revolutionize how we interact with digital content.
      At National Cheng Kung University (NCKU), I have had the opportunity to apply my skills in app design and web development to explore this technology further. This hands-on experience has enriched my understanding of both system-level design and user experience challenges. While current limitations—such as slow refresh rates and screen ghosting—still hinder widespread adoption, I remain optimistic about the future of e-paper and its potential to contribute meaningfully to sustainable innovation.`,
      zh: `這個專案是我踏入網頁開發的第一步。它僅以 HTML、CSS 與 JavaScript 打造，或許不是我作品中最進階的，但對於鋪平我後續的成長與成就扮演了重要角色。
      我深深認同聯合國永續發展目標（SDGs），尤其是推廣對環境友善的技術。其中，電子紙以其可重複使用與低耗能的特性脫穎而出——這讓它兼具創新與永續。受《哈利波特》中會動的報紙啟發，我看見它徹底改變我們與數位內容互動方式的潛力。
      在國立成功大學（NCKU），我有機會運用 App 設計與網頁開發的能力，更深入地探索這項技術。這段實作經驗豐富了我對系統層級設計與使用者體驗挑戰的理解。雖然目前的限制——例如更新速度慢與殘影——仍阻礙普及，但我對電子紙的未來，以及它為永續創新做出實質貢獻的潛力，始終樂觀。`,
    },
    link: "https://eink-demo-etvn.vercel.app",
  },
  {
    id: 2,
    title: {
      en: "AI++ Tainan: Innovating Tomorrow's Digital City — 2024 AI Governance Tainan Hackathon",
      zh: "AI++ 台南：打造明日數位城市 — 2024 台南數位城市治理黑客松",
    },
    img: "Project/IMG_0959.png",
    inner_img: "Project/IMG_5126.png",
    short_description: {
      en: "2024 AI Tainan Digital Governance Hackathon – Best Popularity Award. Developed a web-based form management platform to replace Excel-based workflows for the Tainan Health Bureau. Led frontend development with Vue.js and integrated a Flask backend. Implemented role-based access control, input validation, version control, and task tracking to enhance cross-departmental collaboration and prevent data overwrites.",
      zh: "2024 台南數位城市治理黑客松 — 最佳人氣獎。為台南市衛生局開發以網頁為基礎的表單管理平台，取代原本仰賴 Excel 的流程。主導以 Vue.js 進行前端開發並串接 Flask 後端，實作權限控管（RBAC）、輸入驗證、版本控制與任務追蹤，強化跨部門協作並避免資料被覆寫。",
    },
    description: {
      en: `In 2024, we participated in the AI Tainan Digital City Governance Hackathon and developed a platform to help the Health Bureau improve the efficiency of information dissemination. Through interviews with staff and volunteers, we discovered that their original communication workflow heavily relied on Excel files. This often led to errors, accidental data overwrites, and difficulty tracking changes—especially when multiple people edited the same sheet.
        To address these issues, we designed a role-based web platform where each user could log in with defined permissions. Instead of editing shared Excel files, users submitted or updated data through structured forms that automatically validated inputs and logged every change. All records were stored in a centralized database with version control and timestamps, ensuring traceability and preventing accidental overwrites. We also added a task-tracking and commenting system to replace scattered email communication, enabling more efficient collaboration across departments.
        I was responsible for building the frontend using Vue.js, while also integrating it with a Flask backend. This was my first full-stack web development project, and it taught me how to apply technology to streamline real-world government workflows. Our project was well-received by public sector stakeholders and earned us the Best Popularity Award in the competition.`,
      zh: `2024 年，我們參加台南數位城市治理黑客松，開發了一個平台協助衛生局提升資訊傳遞的效率。透過訪談承辦人員與志工，我們發現他們原本的溝通流程高度仰賴 Excel 檔案，常導致錯誤、資料被誤覆寫，以及難以追蹤異動——尤其是多人同時編輯同一張表時。
        為解決這些問題，我們設計了一個具權限控管的網頁平台，每位使用者以各自的權限登入。使用者不再編輯共用的 Excel，而是透過結構化表單提交或更新資料，系統會自動驗證輸入並記錄每一筆異動。所有紀錄都儲存於集中式資料庫，搭配版本控制與時間戳記，確保可追溯並避免誤覆寫。我們也加入任務追蹤與留言系統，取代散落各處的電子郵件溝通，讓跨部門協作更有效率。
        我負責以 Vue.js 建構前端，並與 Flask 後端整合。這是我第一個全端網頁開發專案，讓我學會如何運用技術簡化真實世界的政府作業流程。我們的作品深獲公部門利害關係人好評，並在競賽中拿下最佳人氣獎。`,
    },
    link: "",
  },
  {
    id: 3,
    title: {
      en: "Sparkful Hack to the Top AI Hackathon",
      zh: "Sparkful「Hack to the Top」AI 黑客松",
    },
    img: "Project/LINE_ALBUM_SPARKFUL AI金融黑客松_250430_1.jpg",
    inner_img: "Project/LINE_ALBUM_SPARKFUL AI金融黑客松_250430_2.jpg",
    short_description: {
      en: "In 2025, our team was selected as a finalist among 200+ teams in the Sparkful Hackathon. I built the frontend with Vue.js and implemented the backend using Django. We retrained YOLOv11n on the UECFOOD256 dataset for food recognition, integrating AI, health scoring, and financial incentives into a full-stack web platform.",
      zh: "2025 年，我們的團隊從 200 多隊中脫穎而出，入圍 Sparkful 黑客松決賽。我以 Vue.js 建構前端、以 Django 實作後端，並在 UECFOOD256 資料集上重新訓練 YOLOv11n 進行食物辨識，將 AI、健康評分與理財誘因整合成一個全端網頁平台。",
    },
    description: {
      en: `In 2025, our team was selected as a finalist from over 200 teams to compete in the Sparkful Hackathon. Although we did not place in the final rankings, the experience was immensely rewarding—we gained hands-on experience with new technologies and had the opportunity to connect with other talented participants from diverse backgrounds.
        In this project, my teammate led the financial mechanism and UI design, while I was responsible for the technical implementation. I built the frontend using Vue.js, and for the backend, I took on the challenge of learning Django, becoming familiar with its MVT architecture and successfully completing full-stack integration.
        For the AI component, we used YOLOv11n as our core food recognition model. Recognizing the limitations of standard pre-trained models, we retrained it using the UECFOOD256 dataset to improve food classification performance. The final product was a web platform built with Django + Vue + YOLOv11n + UECFOOD256, integrating food recognition, health analysis, and financial incentives via RESTful APIs.
        This project provided a valuable opportunity to explore full-stack development and real-world AI deployment in a collaborative, interdisciplinary setting.`,
      zh: `2025 年，我們的團隊從 200 多隊中獲選為決賽隊伍，參加 Sparkful 黑客松。雖然最終未進入名次，但這段經驗收穫極為豐富——我們不僅實際操作了新技術，也有機會結識來自不同背景的優秀夥伴。
        在這個專案中，隊友主導理財機制與 UI 設計，我則負責技術實作。我以 Vue.js 建構前端，後端則挑戰學習 Django，熟悉其 MVT 架構並成功完成全端整合。
        在 AI 部分，我們以 YOLOv11n 作為核心食物辨識模型。考量到一般預訓練模型的限制，我們以 UECFOOD256 資料集重新訓練，提升食物分類的表現。最終成品是一個以 Django + Vue + YOLOv11n + UECFOOD256 打造的網頁平台，透過 RESTful API 整合食物辨識、健康分析與理財誘因。
        這個專案是一次寶貴的機會，讓我在跨領域協作的情境中探索全端開發與真實世界的 AI 部署。`,
    },
    link: "https://sparkful-frontend.vercel.app",
  },
  {
    id: 4,
    title: {
      en: "Yu Jan Shin Employee Training Platform",
      zh: "玉珍馨 企業教育訓練平台",
    },
    img: "Project/YJS.png",
    inner_img: "Project/YJS2.png",
    short_description: {
      en: "Contributed to a collaborative backend development project using Flask at NCKU, focusing on Modules 2 and 6. Although the project was not fully completed due to academic schedules, it provided hands-on experience in coordinating frontend-backend integration and communicating effectively with teammates and the project manager to ensure technical and design alignment.",
      zh: "於成大參與一項以 Flask 進行的協作後端開發專案，主要負責第 2 與第 6 模組。雖然因課業時程未能全程參與，但這段經驗讓我實際練習了前後端整合的協調，以及與隊友、專案經理有效溝通，確保技術與設計方向一致。",
    },
    description: {
      en: "This was my first experience participating in a real-world backend system development in collaboration with a company (Yu Jan Shin). I was responsible for two key modules—Module 2 and Module 6—within a Flask-based microservice architecture using Blueprints. Although I stepped away from the later stages due to academic responsibilities, I contributed significantly in the early design and implementation phases. I worked with Amazon RDS (MySQL) and dealt with schema planning, foreign key constraint handling, and naming consistency across multiple modules. The experience also introduced me to basic web security practices such as token management, access control, and role-based permissions. Most importantly, I learned how to communicate effectively with enterprise stakeholders, synchronize with other developers through Git, and align backend logic with frontend requirements.",
      zh: "這是我第一次與企業（玉珍馨）合作、參與真實世界的後端系統開發。我在以 Flask Blueprint 建構的微服務架構中負責兩個關鍵模組——第 2 與第 6 模組。雖然後期因課業而退出，但我在早期的設計與實作階段貢獻良多。我使用 Amazon RDS（MySQL），處理資料表設計、外鍵約束，以及跨多個模組的命名一致性。這段經驗也讓我接觸到基本的網站安全實務，如 token 管理、存取控管與角色權限。最重要的是，我學會如何與企業利害關係人有效溝通、透過 Git 與其他開發者協作，並讓後端邏輯對齊前端需求。",
    },
    link: "",
  },
  {
    id: 5,
    title: {
      en: "Structured Pruning and Fine-tuning on DeiT Models",
      zh: "DeiT 模型的結構化剪枝與微調",
    },
    img: "Project/deit_prune_summary.png",
    inner_img: "Project/deit_pointwise_diff.png",
    short_description: {
      en: "Conducted structured N:M pruning on DeiT models and compared full and LoRA fine-tuning strategies in terms of accuracy and resource trade-offs.",
      zh: "對 DeiT 模型進行結構化 N:M 剪枝，並從精度與資源取捨的角度比較完整微調與 LoRA 兩種微調策略。",
    },
    description: {
      en: `This project investigates structured N:M pruning on six DeiT variants (Tiny / Small / Base × Distilled / Non-distilled) and evaluates two fine-tuning strategies: Full Finetuning and LoRA (Low-Rank Adaptation).

  Using PyTorch's WeightNormSparsifier, we applied 2:4 and 4:8 sparsity to linear layers and measured accuracy drop post-pruning. We then fine-tuned models using both full and LoRA methods, recording training time and accuracy recovery.

  Key findings include:
  - Tiny models are highly sensitive to pruning, especially under 2:4 sparsity.
  - Base models retain strong performance under 4:8 sparsity, ideal for deployment.
  - LoRA achieves competitive accuracy with significantly fewer trainable parameters, offering an efficient solution for constrained environments.

  This project lays the foundation for further work in model compression pipelines and deployable vision transformer optimization.`,
      zh: `本專案研究六種 DeiT 變體（Tiny / Small / Base × 蒸餾 / 非蒸餾）的結構化 N:M 剪枝，並評估兩種微調策略：完整微調（Full Finetuning）與 LoRA（低秩適配）。

  我們使用 PyTorch 的 WeightNormSparsifier，對線性層套用 2:4 與 4:8 稀疏度，並量測剪枝後的精度下降。接著以完整微調與 LoRA 兩種方式進行微調，記錄訓練時間與精度回復。

  主要發現包括：
  - Tiny 模型對剪枝極為敏感，尤其在 2:4 稀疏度下。
  - Base 模型在 4:8 稀疏度下仍維持優異表現，非常適合部署。
  - LoRA 以遠少的可訓練參數達到具競爭力的精度，為資源受限環境提供高效解法。

  本專案為後續模型壓縮流程與可部署的視覺 Transformer 最佳化奠定了基礎。`,
    },
    link: "https://hackmd.io/@Z1Pajuk0RT2TQl-NwDQzDw/rk7yFLlWlg",
  },
  {
    id: 6,
    title: {
      en: "2025 Hualien Hackathon",
      zh: "2025 花蓮黑客松",
    },
    img: "Project/hualien_hackathon.jpg",
    inner_img: "Project/hualien_hackathon_inner.png",
    short_description: {
      en: "2025 Hualien Hackathon – Finalist. Acted as a Data Analyst to tackle uneven tourist distribution. Analyzed open data to identify spatial imbalances and translated these insights into an Alternative Reality Game (ARG) board game, 'Wandering in Yuguang.' Designed mechanics to guide players to lesser-known spots and successfully conducted field testing with local sponsors.",
      zh: "2025 花蓮黑客松 — 決賽入圍。擔任資料分析師，處理觀光人流分布不均的問題。透過分析開放資料找出空間上的失衡，並把這些洞察轉化為一款 ARG 實境遊戲桌遊〈洄遊漁光中〉。設計遊戲機制引導玩家走訪較冷門的景點，並與在地贊助商合作完成實地測試。",
    },
    description: {
      en: `In the 2025 Hualien Hackathon, our team advanced to the finals by addressing the local issue of uneven tourist distribution. As the Data Analyst, I utilized government Open Data to analyze tourist flow trends and attraction distribution. I identified the imbalance between overcrowded hotspots and underexposed areas, translating these data insights into actionable design strategies to determine which areas needed traffic redirection and how to guide user movement through game mechanics.

      Moving beyond pure analysis, I collaborated with the team to turn these insights into a tangible product: an Alternative Reality Game (ARG) board game titled "Wandering in Yuguang" (〈洄遊漁光中〉). I co-designed the story scripts, mission pacing, and puzzle mechanics, ensuring each stage directly aligned with our traffic redirection goals and local consumption scenarios. This allowed players to naturally visit different attractions and local shops while completing tasks, forming a verifiable behavioral path.

      Finally, we successfully executed field validation. With the support of our sponsor, Lin Ji Fishball, we conducted real-world testing. We also gathered feedback through interviews with local residents and players, validating the game's story, playability, and potential to drive local tourism. This project demonstrated my ability to transform data analysis into product strategy and execute real-world validation.`,
      zh: `在 2025 花蓮黑客松中，我們的團隊以解決在地「觀光人流分布不均」的問題進入決賽。身為資料分析師，我運用政府開放資料分析觀光人流趨勢與景點分布，找出熱門景點過度擁擠、冷門地區曝光不足之間的失衡，並把這些資料洞察轉化為可執行的設計策略——決定哪些地區需要分流，以及如何透過遊戲機制引導人流。

      除了純粹的分析，我也與團隊合作把洞察化為實際產品：一款名為〈洄遊漁光中〉的 ARG 實境遊戲桌遊。我共同設計故事腳本、任務節奏與解謎機制，確保每個關卡都直接對應我們的人流分流目標與在地消費情境，讓玩家在完成任務的同時自然走訪不同景點與在地店家，形成可驗證的行為路徑。

      最後，我們成功完成實地驗證。在贊助商林記魚丸的支持下，我們進行了真實場域測試，並透過訪談在地居民與玩家蒐集回饋，驗證遊戲的故事性、可玩性以及帶動在地觀光的潛力。這個專案展現了我把資料分析轉化為產品策略、並落地驗證的能力。`,
    },
    link: "https://hsh-mu.vercel.app/",
  },
  {
    id: 7,
    title: {
      en: "Google Cloud Certificate Program",
      zh: "Google Cloud 學程證書",
    },
    img: "Project/google_cloud_cert.jpg",
    inner_img: "Project/google_cloud_cert.jpg",
    short_description: {
      en: "Completed the Google Cloud Certificate Program, bridging the gap between machine learning theory and practical cloud deployment. Gained expertise in GCP infrastructure, LLMs, Prompt Engineering, and Responsible AI to design end-to-end AI applications.",
      zh: "完成 Google Cloud 學程證書，銜接機器學習理論與實際的雲端部署。在 GCP 基礎架構、LLM、Prompt Engineering 與 Responsible AI 等領域累積專業，得以設計端到端的 AI 應用。",
    },
    description: {
      en: `Participating in the Google Cloud Certificate Program marked a significant turning point for me, extending my AI technical skills toward practical, real-world applications. While I previously had a solid foundation in machine learning and deep learning—capable of training and fine-tuning models locally—I lacked a comprehensive understanding of how AI is deployed, maintained, and served to users in a cloud environment.

      Through this program, I learned the core architecture of cloud computing, including infrastructure, networking, and security design. I also mastered the integration of data analytics, machine learning, and AI services on Google Cloud. In the Generative AI courses, I gained hands-on experience with Large Language Models (LLMs), learning how to guide model behavior through Prompt Engineering and how to implement Generative AI into actual systems while strictly adhering to ethical and Responsible AI principles.

      This experience transformed my perspective from simply "building models" to becoming an engineer capable of "designing AI applications and cloud architectures." For my future endeavors in AI application development, automated systems, and cross-disciplinary projects, this program not only strengthened my technical expertise but also equipped me with a holistic view—spanning from cloud infrastructure and model training to the final product application. It serves as a crucial cornerstone for my continued growth in the AI field.`,
      zh: `參與 Google Cloud 學程證書是我重要的轉捩點，把我的 AI 技術能力延伸到實際、真實世界的應用。在此之前，我在機器學習與深度學習已有扎實基礎，能在本地訓練與微調模型，卻缺乏對「AI 如何在雲端環境中部署、維運並提供給使用者」的全面理解。

      透過這個學程，我學到雲端運算的核心架構，包括基礎設施、網路與安全設計，也掌握了在 Google Cloud 上整合資料分析、機器學習與 AI 服務的方法。在生成式 AI 課程中，我實際操作大型語言模型（LLM），學會如何透過 Prompt Engineering 引導模型行為，以及如何在嚴格遵循倫理與 Responsible AI 原則下，把生成式 AI 導入實際系統。

      這段經驗讓我的視角從單純「建立模型」轉變為能夠「設計 AI 應用與雲端架構」的工程師。對於我未來在 AI 應用開發、自動化系統與跨領域專案的發展，這個學程不僅強化了我的技術專業，也讓我具備從雲端基礎架構、模型訓練到最終產品應用的整體視野，成為我在 AI 領域持續成長的重要基石。`,
    },
    link: "",
  },
  {
    id: 0,
    title: { en: "Coming Soon", zh: "敬請期待" },
    img: "Project/coming_soon.png",
    inner_img: "Project/coming_soon.png",
    short_description: {
      en: "A fresh project is on the horizon, promising creativity, sustainability, and groundbreaking tech insights. Check back soon for updates!",
      zh: "一個全新的專案即將登場，充滿創意、永續理念與突破性的技術洞察。敬請持續關注更新！",
    },
    description: {
      en: "A fresh project is on the horizon, promising creativity, sustainability, and groundbreaking tech insights. Check back soon for updates!",
      zh: "一個全新的專案即將登場，充滿創意、永續理念與突破性的技術洞察。敬請持續關注更新！",
    },
    link: "",
  },
];

export { projects };
