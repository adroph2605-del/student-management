import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('edutrack_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Optional: force logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('edutrack_token');
      localStorage.removeItem('edutrack_user');
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register: async (body) => {
    const { data } = await api.post('/auth/register', body);
    return data;
  },
  login: async (body) => {
    const { data } = await api.post('/auth/login', body);
    return data;
  },
  me: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};

export const studentAPI = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/students', { params });
    return data; // { success, total, page, pages, data: [] }
  },
  getById: async (id) => {
    const { data } = await api.get(`/students/${id}`);
    return data; // { success, data: student }
  },
  create: async (body) => {
    const { data } = await api.post('/students', body);
    return data;
  },
  update: async (id, body) => {
    const { data } = await api.put(`/students/${id}`, body);
    return data;
  },
  delete: async (id) => {
    const { data } = await api.delete(`/students/${id}`);
    return data;
  },
};

export const attendanceAPI = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/attendance', { params });
    return data;
  },
  mark: async (body) => {
    const { data } = await api.post('/attendance', body);
    return data;
  },
  bulk: async (body) => {
    const { data } = await api.post('/attendance/bulk', body);
    return data;
  },
  summary: async (studentId) => {
    const { data } = await api.get(`/attendance/student/${studentId}/summary`);
    return data;
  },
};

export const gradesAPI = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/grades', { params });
    return data;
  },
  create: async (body) => {
    const { data } = await api.post('/grades', body);
    return data;
  },
};

export const feesAPI = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/fees', { params });
    return data;
  },
  summary: async () => {
    const { data } = await api.get('/fees/summary');
    return data;
  },
  create: async (body) => {
    const { data } = await api.post('/fees', body);
    return data;
  },
  pay: async (id, body) => {
    const { data } = await api.post(`/fees/${id}/pay`, body);
    return data;
  },
};

export const dashboardAPI = {
  stats: async () => {
    const { data } = await api.get('/dashboard/stats');
    return data;
  },
  admin: async () => {
    const { data } = await api.get('/dashboard/admin');
    return data;
  },
};

export default api;