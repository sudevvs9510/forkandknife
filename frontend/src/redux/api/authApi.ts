
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

const authAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


// Function to get cookie by name
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
}

// Request interceptor to include the JWT token in headers
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AuthToken');
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Interceptor:', config);
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh logic
authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log('Token expired, attempting to refresh token');
        const refreshToken = getCookie('refreshToken');
        if (!refreshToken) {
          console.error('No refresh token available');
          // Handle no refresh token scenario, possibly redirect to login
          window.location.href = '/login';
          return Promise.reject(error);
        }

        const { data } = await axios.post('http://localhost:4000/refresh-token', {
          refreshToken
        }, { withCredentials: true });

        console.log("Token refreshed:", data);

        localStorage.setItem('AuthToken', data.accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return authAxios(originalRequest);
      } catch (err) {
        console.error('Failed to refresh token', err);
        // Clear tokens and redirect to login page
        localStorage.removeItem('AuthToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default authAxios;
