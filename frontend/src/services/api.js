import axios from "axios";

// Use VITE_API_URL from environment or default to server IP
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://194.187.122.145:5000/api";

// Use VITE_MEDIA_URL from environment or default to server IP
export const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_URL || "http://194.187.122.145:5000";
const LANGUAGE_STORAGE_KEY = "siteLanguage";

const normalizeLang = (value) => {
  if (!value) return "en";
  const normalized = value.toLowerCase();
  return ["en", "ru", "tj"].includes(normalized) ? normalized : "en";
};

const localizePayload = (payload, lang) => {
  if (!payload || typeof payload !== "object") {
    return payload;
  }

  if (Array.isArray(payload)) {
    return payload.map((item) => localizePayload(item, lang));
  }

  const localized = {};
  Object.entries(payload).forEach(([key, value]) => {
    localized[key] = localizePayload(value, lang);
  });

  const suffix = `_${lang}`;
  Object.keys(payload).forEach((key) => {
    if (key.endsWith(suffix) && payload[key] != null) {
      const baseKey = key.slice(0, -suffix.length);
      if (baseKey && baseKey.length > 0) {
        localized[baseKey] = payload[key];
      }
    }
  });

  return localized;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }
  const storedLang = normalizeLang(localStorage.getItem(LANGUAGE_STORAGE_KEY));
  config.params.lang = config.params.lang || storedLang;
  config.__lang = config.params.lang;
  return config;
});

api.interceptors.response.use(
  (response) => {
    const lang = normalizeLang(response.config.__lang);
    if (lang !== "en" && response.data) {
      response.data = localizePayload(response.data, lang);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const buildParamsWithLang = (lang, params = {}) => {
  const nextParams = { ...params };
  if (lang) {
    nextParams.lang = lang;
  }
  return Object.keys(nextParams).length > 0 ? nextParams : undefined;
};

export const buildMediaUrl = (path) => {
  if (!path) return null;
  // If already a full URL, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Ensure path starts with / if it doesn't already
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  // If MEDIA_BASE_URL is empty (relative), return the path as-is (nginx will handle it)
  if (!MEDIA_BASE_URL) {
    return normalizedPath;
  }
  
  return `${MEDIA_BASE_URL}${normalizedPath}`;
};

// News API
export const getNews = (lang) => api.get("/news", { params: buildParamsWithLang(lang) });
export const getNewsById = (id, lang) =>
  api.get(`/news/${id}`, { params: buildParamsWithLang(lang) });

// Events API
export const getEvents = (lang) => api.get("/events", { params: buildParamsWithLang(lang) });
export const getEventById = (id, lang) =>
  api.get(`/events/${id}`, { params: buildParamsWithLang(lang) });

// Olympiads API
export const getOlympiads = (lang) => api.get("/olympiads", { params: buildParamsWithLang(lang) });
export const getOlympiadById = (id, lang) =>
  api.get(`/olympiads/${id}`, { params: buildParamsWithLang(lang) });

// Moments API
export const getMoments = (lang) => api.get("/moments", { params: buildParamsWithLang(lang) });

// Photos API
export const getPhotos = (lang) => api.get("/photos", { params: buildParamsWithLang(lang) });

// Teachers API
export const getTeachers = (lang) => api.get("/teachers", { params: buildParamsWithLang(lang) });
export const getTeacherById = (id, lang) =>
  api.get(`/teachers/${id}`, { params: buildParamsWithLang(lang) });

// About API
export const getAboutContent = (lang) => api.get("/about", { params: buildParamsWithLang(lang) });

// Stats API
export const getStats = (lang) => api.get("/stats", { params: buildParamsWithLang(lang) });

// Contact form submission (you can implement this in backend)
export const submitContact = (data) => api.post("/contact", data);

export default api;
