import axios from 'axios'
import { getAuthHeader } from '../utils/auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use((config) => {
  const authHeader = getAuthHeader()
  if (authHeader.Authorization) {
    config.headers.Authorization = authHeader.Authorization
  }
  return config
})

// Auth API
export const login = (credentials) => api.post('/auth/login', credentials)

// Dashboard API
export const getDashboardStats = () => api.get('/dashboard')

// News API
export const getNews = () => api.get('/news')
export const createNews = (data) => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('content', data.content)
  formData.append('publish_date', data.publish_date)
  if (data.image) {
    formData.append('image', data.image)
  }
  return api.post('/news', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const updateNews = (id, data) => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('content', data.content)
  formData.append('publish_date', data.publish_date)
  if (data.image) {
    formData.append('image', data.image)
  }
  return api.put(`/news/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const deleteNews = (id) => api.delete(`/news/${id}`)

// Events API
export const getEvents = () => api.get('/events')
export const createEvent = (data) => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('event_date', data.event_date)
  formData.append('location', data.location || '')
  if (data.image) {
    formData.append('image', data.image)
  }
  return api.post('/events', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const updateEvent = (id, data) => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('event_date', data.event_date)
  formData.append('location', data.location || '')
  if (data.image) {
    formData.append('image', data.image)
  }
  return api.put(`/events/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const deleteEvent = (id) => api.delete(`/events/${id}`)

// Teachers API
export const getTeachers = () => api.get('/teachers')
export const createTeacher = (data) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('bio', data.bio || '')
  formData.append('qualifications', data.qualifications || '')
  formData.append('subjects', data.subjects || '')
  if (data.photo) {
    formData.append('photo', data.photo)
  }
  return api.post('/teachers', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const updateTeacher = (id, data) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('bio', data.bio || '')
  formData.append('qualifications', data.qualifications || '')
  formData.append('subjects', data.subjects || '')
  if (data.photo) {
    formData.append('photo', data.photo)
  }
  return api.put(`/teachers/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const deleteTeacher = (id) => api.delete(`/teachers/${id}`)

// About API
export const getAboutContent = () => api.get('/about')
export const updateAboutContent = (data) => api.put('/about', data)

// Stats API
export const getStats = () => api.get('/stats')
export const updateStat = (data) => api.put('/stats', data)

export default api

