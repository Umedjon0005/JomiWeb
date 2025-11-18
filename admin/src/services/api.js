import axios from "axios";
import { getAuthHeader } from "../utils/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

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
  formData.append("content", data.content);
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
  formData.append("content", data.content);
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
  formData.append("description", data.description);
  formData.append("event_date", data.event_date);
  formData.append("location", data.location || "");
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
  formData.append("description", data.description);
  formData.append("event_date", data.event_date);
  formData.append("location", data.location || "");
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
  formData.append("description", data.description);
  formData.append("olympiad_date", data.olympiad_date);
  formData.append("location", data.location || "");
  if (data.reference_url) {
    formData.append("reference_url", data.reference_url);
  }
  if (data.winner_name) {
    formData.append("winner_name", data.winner_name);
  }
  if (data.project_name) {
    formData.append("project_name", data.project_name);
  }
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
  formData.append("description", data.description);
  formData.append("olympiad_date", data.olympiad_date);
  formData.append("location", data.location || "");
  if (data.reference_url) {
    formData.append("reference_url", data.reference_url);
  }
  if (data.winner_name) {
    formData.append("winner_name", data.winner_name);
  }
  if (data.project_name) {
    formData.append("project_name", data.project_name);
  }
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
  formData.append("caption", data.caption || "");
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
  formData.append("caption", data.caption || "");
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
  formData.append("bio", data.bio || "");
  formData.append("qualifications", data.qualifications || "");
  formData.append("subjects", data.subjects || "");
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
  formData.append("bio", data.bio || "");
  formData.append("qualifications", data.qualifications || "");
  formData.append("subjects", data.subjects || "");
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
export const updateStat = (data) => api.put("/stats", data);

export default api;
