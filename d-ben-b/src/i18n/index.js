import { ref } from "vue";
import en from "./locales/en";
import zh from "./locales/zh";

const messages = { en, zh };
const STORAGE_KEY = "locale";

function detectInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "zh") return saved;
  } catch (e) {
    /* localStorage may be unavailable */
  }
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("zh") ? "zh" : "en";
}

// Shared reactive locale — single source of truth across the whole app.
export const locale = ref(detectInitial());

function applyHtmlLang(l) {
  document.documentElement.lang = l === "zh" ? "zh-Hant" : "en";
}
applyHtmlLang(locale.value);

export function setLocale(l) {
  if (l !== "en" && l !== "zh") return;
  locale.value = l;
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch (e) {
    /* ignore */
  }
  applyHtmlLang(l);
}

export function toggleLocale() {
  setLocale(locale.value === "en" ? "zh" : "en");
}

function resolve(obj, path) {
  return path
    .split(".")
    .reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
}

/**
 * Translate a dot-path key, e.g. t("nav.home").
 * Reads locale.value so it is reactive inside templates / computed.
 * Falls back to English, then to the provided fallback, then the key itself.
 */
export function t(key, fallback) {
  const val = resolve(messages[locale.value], key);
  if (val != null) return val;
  const fallbackEn = resolve(messages.en, key);
  if (fallbackEn != null) return fallbackEn;
  return fallback != null ? fallback : key;
}

/**
 * Pick the right side of a bilingual { en, zh } object.
 * Handy for data files (timeline, projects) that carry both languages inline.
 */
export function pick(obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  return obj[locale.value] ?? obj.en ?? "";
}

export function useI18n() {
  return { locale, t, pick, setLocale, toggleLocale };
}
