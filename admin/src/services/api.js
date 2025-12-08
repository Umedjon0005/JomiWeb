import axios from "axios";
import { getAuthHeader } from "../utils/auth";

// Use VITE_API_URL from environment or default to server IP
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://194.187.122.145:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const authHeader = getAuthHeader();
  if (authHeader.Authorization) {
    config.headers.Authorization = authHeader.Authorization;
  }
  return config;
});

// Auth API
export const login = (credentials) => api.post("/auth/login", credentials);

// Dashboard API
export const getDashboardStats = () => api.get("/dashboard");

// News API
export const getNews = () => api.get("/news");
export const createNews = (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("title_ru", data.title_ru || "");
  formData.append("title_tj", data.title_tj || "");
  formData.append("content", data.content);
  formData.append("content_ru", data.content_ru || "");
  formData.append("content_tj", data.content_tj || "");
  formData.append("publish_date", data.publish_date);
  if (data.image) {
    formData.append("image", data.image);
  }
  return api.post("/news", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateNews = (id, data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("title_ru", data.title_ru || "");
  formData.append("title_tj", data.title_tj || "");
  formData.append("content", data.content);
  formData.append("content_ru", data.content_ru || "");
  formData.append("content_tj", data.content_tj || "");
  formData.append("publish_date", data.publish_date);
  if (data.image) {
    formData.append("image", data.image);
  }
  return api.put(`/news/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteNews = (id) => api.delete(`/news/${id}`);

// Events API
export const getEvents = () => api.get("/events");
export const createEvent = (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("title_ru", data.title_ru || "");
  formData.append("title_tj", data.title_tj || "");
  formData.append("description", data.description);
  formData.append("description_ru", data.description_ru || "");
  formData.append("description_tj", data.description_tj || "");
  formData.append("event_date", data.event_date);
  formData.append("location", data.location || "");
  formData.append("location_ru", data.location_ru || "");
  formData.append("location_tj", data.location_tj || "");
  if (data.image) {
    formData.append("image", data.image);
  }
  return api.post("/events", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateEvent = (id, data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("title_ru", data.title_ru || "");
  formData.append("title_tj", data.title_tj || "");
  formData.append("description", data.description);
  formData.append("description_ru", data.description_ru || "");
  formData.append("description_tj", data.description_tj || "");
  formData.append("event_date", data.event_date);
  formData.append("location", data.location || "");
  formData.append("location_ru", data.location_ru || "");
  formData.append("location_tj", data.location_tj || "");
  if (data.image) {
    formData.append("image", data.image);
  }
  return api.put(`/events/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// Olympiads API
export const getOlympiads = () => api.get("/olympiads");
export const createOlympiad = (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("title_ru", data.title_ru || "");
  formData.append("title_tj", data.title_tj || "");
  formData.append("description", data.description);
  formData.append("description_ru", data.description_ru || "");
  formData.append("description_tj", data.description_tj || "");
  formData.append("olympiad_date", data.olympiad_date);
  formData.append("location", data.location || "");
  formData.append("location_ru", data.location_ru || "");
  formData.append("location_tj", data.location_tj || "");
  if (data.reference_url) {
    formData.append("reference_url", data.reference_url);
  }
  if (data.winner_name) {
    formData.append("winner_name", data.winner_name);
  }
  formData.append("winner_name_ru", data.winner_name_ru || "");
  formData.append("winner_name_tj", data.winner_name_tj || "");
  if (data.project_name) {
    formData.append("project_name", data.project_name);
  }
  formData.append("project_name_ru", data.project_name_ru || "");
  formData.append("project_name_tj", data.project_name_tj || "");
  if (data.image) {
    formData.append("image", data.image);
  }
  if (data.project_image) {
    formData.append("project_image", data.project_image);
  }
  return api.post("/olympiads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateOlympiad = (id, data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("title_ru", data.title_ru || "");
  formData.append("title_tj", data.title_tj || "");
  formData.append("description", data.description);
  formData.append("description_ru", data.description_ru || "");
  formData.append("description_tj", data.description_tj || "");
  formData.append("olympiad_date", data.olympiad_date);
  formData.append("location", data.location || "");
  formData.append("location_ru", data.location_ru || "");
  formData.append("location_tj", data.location_tj || "");
  if (data.reference_url) {
    formData.append("reference_url", data.reference_url);
  }
  if (data.winner_name) {
    formData.append("winner_name", data.winner_name);
  }
  formData.append("winner_name_ru", data.winner_name_ru || "");
  formData.append("winner_name_tj", data.winner_name_tj || "");
  if (data.project_name) {
    formData.append("project_name", data.project_name);
  }
  formData.append("project_name_ru", data.project_name_ru || "");
  formData.append("project_name_tj", data.project_name_tj || "");
  if (data.image) {
    formData.append("image", data.image);
  }
  if (data.project_image) {
    formData.append("project_image", data.project_image);
  }
  return api.put(`/olympiads/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteOlympiad = (id) => api.delete(`/olympiads/${id}`);

// Moments API
export const getMoments = () => api.get("/moments");
export const createMoment = (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("title_ru", data.title_ru || "");
  formData.append("title_tj", data.title_tj || "");
  formData.append("caption", data.caption || "");
  formData.append("caption_ru", data.caption_ru || "");
  formData.append("caption_tj", data.caption_tj || "");
  formData.append("sort_order", data.sort_order || 0);
  if (data.image) {
    formData.append("image", data.image);
  }
  return api.post("/moments", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateMoment = (id, data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("title_ru", data.title_ru || "");
  formData.append("title_tj", data.title_tj || "");
  formData.append("caption", data.caption || "");
  formData.append("caption_ru", data.caption_ru || "");
  formData.append("caption_tj", data.caption_tj || "");
  formData.append("sort_order", data.sort_order || 0);
  if (data.image) {
    formData.append("image", data.image);
  }
  return api.put(`/moments/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteMoment = (id) => api.delete(`/moments/${id}`);

// Teachers API
export const getTeachers = () => api.get("/teachers");
export const createTeacher = (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("name_ru", data.name_ru || "");
  formData.append("name_tj", data.name_tj || "");
  formData.append("bio", data.bio || "");
  formData.append("bio_ru", data.bio_ru || "");
  formData.append("bio_tj", data.bio_tj || "");
  formData.append("qualifications", data.qualifications || "");
  formData.append("qualifications_ru", data.qualifications_ru || "");
  formData.append("qualifications_tj", data.qualifications_tj || "");
  formData.append("subjects", data.subjects || "");
  formData.append("subjects_ru", data.subjects_ru || "");
  formData.append("subjects_tj", data.subjects_tj || "");
  if (data.photo) {
    formData.append("photo", data.photo);
  }
  return api.post("/teachers", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateTeacher = (id, data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("name_ru", data.name_ru || "");
  formData.append("name_tj", data.name_tj || "");
  formData.append("bio", data.bio || "");
  formData.append("bio_ru", data.bio_ru || "");
  formData.append("bio_tj", data.bio_tj || "");
  formData.append("qualifications", data.qualifications || "");
  formData.append("qualifications_ru", data.qualifications_ru || "");
  formData.append("qualifications_tj", data.qualifications_tj || "");
  formData.append("subjects", data.subjects || "");
  formData.append("subjects_ru", data.subjects_ru || "");
  formData.append("subjects_tj", data.subjects_tj || "");
  if (data.photo) {
    formData.append("photo", data.photo);
  }
  return api.put(`/teachers/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteTeacher = (id) => api.delete(`/teachers/${id}`);

// About API
export const getAboutContent = () => api.get("/about");
export const updateAboutContent = (data) => api.put("/about", data);

// Stats API
export const getStats = () => api.get("/stats");
export const updateStat = (data) =>
  api.put("/stats", {
    stat_key: data.stat_key,
    stat_value: data.stat_value,
    label: data.label,
    label_ru: data.label_ru,
    label_tj: data.label_tj,
  });

// Photos API
export const getPhotos = () => api.get("/photos");
export const createPhoto = (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description || "");
  formData.append("sort_order", data.sort_order || 0);
  if (data.image) {
    formData.append("image", data.image);
  }
  return api.post("/photos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updatePhoto = (id, data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description || "");
  formData.append("sort_order", data.sort_order || 0);
  if (data.image) {
    formData.append("image", data.image);
  }
  return api.put(`/photos/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deletePhoto = (id) => api.delete(`/photos/${id}`);

export default api;
