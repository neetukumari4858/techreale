import axios from "axios";
const BASE_URL = 'https://dev.api.theforgeapp.io/api/v1/admin/auth/login'
const API_URL = 'http://localhost:3001'
const getToken = () => localStorage.getItem('token')

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const productApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const fetchProducts = async () => {
  const response = await productApi.get("/products");
  return response.data;
};

export const createProduct = async (product) => {
  const response = await productApi.post('/products', product);
  return response.data;
};

export const updateProductById = async (id, product) => {
  const response = await productApi.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProductById = async (id) => {
  await productApi.delete(`/products/${id}`);
  return id;
};

export { authApi, productApi, API_URL };