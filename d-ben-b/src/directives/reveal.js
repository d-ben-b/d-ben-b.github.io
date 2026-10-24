// v-reveal：元素捲進畫面時淡入上移（樣式在 tailwind.css 的 .reveal）。取代原本整包的 AOS。
// v-reveal="200" 可以延遲 200ms 再出現。
const observer =
  typeof IntersectionObserver === "undefined"
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

export default {
  mounted(el, binding) {
    el.classList.add("reveal");
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`;
    if (observer) observer.observe(el);
    else el.classList.add("is-visible");
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
