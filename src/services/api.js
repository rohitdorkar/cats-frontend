import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        try {
          const res = await axios.post(`${API_BASE}/auth/refresh/`, { refresh });
          localStorage.setItem('access_token', res.data.access);
          original.headers.Authorization = `Bearer ${res.data.access}`;
          return api(original);
        } catch {
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth ─────────────────────────────────────────────
export const authAPI = {
  login: (email, password) => api.post('/auth/login/', { email, password }),
  register: (data) => api.post('/auth/register/', data),
  me: () => api.get('/auth/me/'),
  getOfficers: () => api.get('/auth/officers/'),
  getSeniorOfficers: () => api.get('/auth/senior-officers/'),
  getAllStaff: () => api.get('/auth/staff/'),
  createStaff: (data) => api.post('/auth/staff/create/', data),
  updateStaff: (id, data) => api.patch(`/auth/staff/${id}/update/`, data),   // ← new
  deleteStaff: (id) => api.delete(`/auth/staff/${id}/delete/`),   // ← new
}; 

// ── Complaints ────────────────────────────────────────
export const complaintsAPI = {
  list: (params) => api.get('/complaints/', { params }),
  get: (id) => api.get(`/complaints/${id}/`),
  create: (data) => api.post('/complaints/', data),
  track: (complaint_number, phone) =>
    api.get('/complaints/track/', { params: { complaint_number, phone } }),
  assign: (id, data) => api.post(`/complaints/${id}/assign/`, data),
  updateStatus: (id, data) => api.post(`/complaints/${id}/status/`, data),
  escalate: (id, data) => api.post(`/complaints/${id}/escalate/`, data),
  reassign: (id, data) => api.post(`/complaints/${id}/reassign/`, data),
  dashboardStats: () => api.get('/dashboard/stats/'),
  analytics: (params) => api.get('/analytics/', { params }),  
};

export default api;