import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Student API functions
export const studentAPI = {
  // Get all students
  getAll: async () => {
    const response = await api.get('/students');
    return response.data;
  },

  // Get single student by ID
  getById: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  // Create new student
  create: async (studentData) => {
    const response = await api.post('/students', studentData);
    return response.data;
  },

  // Update student
  update: async (id, studentData) => {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  },

  // Delete student
  delete: async (id) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  },
};

export default api;
