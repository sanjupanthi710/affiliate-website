import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

// Attach the admin token (if present) to every request automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If a token expires/becomes invalid, bounce the admin back to login.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

// ---- Public endpoints ----
export const fetchProducts = (params) => api.get('/products', { params }).then((r) => r.data);
export const fetchProductBySlug = (slug) => api.get(`/products/slug/${slug}`).then((r) => r.data);
export const fetchCategories = () => api.get('/categories').then((r) => r.data);
export const fetchCategoryBySlug = (slug) => api.get(`/categories/${slug}`).then((r) => r.data);
export const recordAffiliateClick = (productId) =>
  api.post(`/products/${productId}/click`, { referrer: window.location.href }).then((r) => r.data);

// ---- Admin endpoints ----
export const adminLogin = (email, password) => api.post('/auth/login', { email, password }).then((r) => r.data);
export const fetchAllProductsAdmin = () => api.get('/products/admin/all').then((r) => r.data);
export const fetchProductByIdAdmin = (id) => api.get(`/products/id/${id}`).then((r) => r.data);
export const createProduct = (data) => api.post('/products', data).then((r) => r.data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data).then((r) => r.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then((r) => r.data);
export const createCategory = (data) => api.post('/categories', data).then((r) => r.data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data).then((r) => r.data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`).then((r) => r.data);
export const fetchAnalyticsOverview = () => api.get('/analytics/overview').then((r) => r.data);
export const fetchClicks = (params) => api.get('/analytics/clicks', { params }).then((r) => r.data);

export default api;
