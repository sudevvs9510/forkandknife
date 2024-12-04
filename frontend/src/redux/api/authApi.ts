import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import userLogout from "../../util/Logout";
import restaurantLogout from '../../util/RestaurantLogout';
import adminLogout from "../../util/AdminLogout";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// Define types for better type safety
type TokenType = 'AuthToken' | 'RestaurantAuthToken' | 'AdminAuthToken';
type LogoutFunction = (message: string) => void;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Create the axios instance
const authAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true,
});

// Helper function to determine token type based on URL
const getTokenType = (url: string): TokenType => {
  if (url.startsWith('/restaurant')) return 'RestaurantAuthToken';
  if (url.startsWith('/admin')) return 'AdminAuthToken';
  return 'AuthToken';
};

// Helper function to get the appropriate logout function
const getLogoutFunction = (url: string): LogoutFunction => {
  if (url.startsWith('/restaurant')) return restaurantLogout;
  if (url.startsWith('/admin')) return adminLogout;
  return userLogout;
};

// Request interceptor
authAxios.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const tokenType = getTokenType(config.url || '');
    const token = localStorage.getItem(tokenType);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('Request Interceptor:', config);
    return config;
  },
  (error: AxiosError) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
authAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const response = error.response as AxiosResponse;

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log('Token expired, attempting to refresh token');
        const res = await axios.post(`${API_BASE_URL}/token/refresh-token`, null, {
          withCredentials: true
        });

        const newAccessToken = res.data.accessToken;
        const tokenType = getTokenType(originalRequest.url || '');
        localStorage.setItem(tokenType, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authAxios(originalRequest);
      } catch (refreshError) {
        const logoutFn = getLogoutFunction(originalRequest.url || '');
        const message = (refreshError as AxiosError)?.response?.status === 402
          ? ''
          : 'Sorry, your session expired. Please log in again.';
        logoutFn(message);
        return Promise.reject(refreshError);
      }
    } else if (response?.status === 403) {
      const logoutFn = getLogoutFunction(originalRequest.url || '');
      logoutFn(response.data.message);
    }

    return Promise.reject(error);
  }
);

export default authAxios;
