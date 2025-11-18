import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";
export const MEDIA_BASE_URL =
  import.meta.env.VITE_MEDIA_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const buildMediaUrl = (path) => {
  if (!path) return null;
  return `${MEDIA_BASE_URL}${path}`;
};

// News API
export const getNews = () => api.get("/news");
export const getNewsById = (id) => api.get(`/news/${id}`);

// Events API
export const getEvents = () => api.get("/events");
export const getEventById = (id) => api.get(`/events/${id}`);

// Olympiads API
export const getOlympiads = () => api.get("/olympiads");
export const getOlympiadById = (id) => api.get(`/olympiads/${id}`);

// Moments API
export const getMoments = () => api.get("/moments");

// Teachers API
export const getTeachers = () => api.get("/teachers");
export const getTeacherById = (id) => api.get(`/teachers/${id}`);

// About API
export const getAboutContent = () => api.get("/about");

// Stats API
export const getStats = () => api.get("/stats");

// Contact form submission (you can implement this in backend)
export const submitContact = (data) => api.post("/contact", data);

export default api;
