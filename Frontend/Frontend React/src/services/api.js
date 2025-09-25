import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (data) => api.post('/api/auth/register', data);
export const loginUser = async (data) => api.post('/api/auth/login', data);

export const createProduct = async (data) => api.post('/api/products', data);
export const getProducts = async () => api.get('/api/products');
export const getProductById = async (id) => api.get(`/api/products/${id}`);
export const updateProduct = async (id, data) => api.put(`/api/products/${id}`, data);
export const deleteProduct = async (id) => api.delete(`/api/products/${id}`);

export const createOrder = async (data) => api.post('/api/orders', data);  // data: { details: [{productoId, cantidad}] }
export const getOrders = async () => api.get('/api/orders');
export const getOrderById = async (id) => api.get(`/api/orders/${id}`);
export const cancelOrder = async (id) => api.put(`/api/orders/${id}/cancel`);