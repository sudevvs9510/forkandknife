/* eslint-disable @typescript-eslint/no-explicit-any */


import axios, { AxiosError, AxiosResponse } from 'axios';
import userLogout from "../../util/Logout"
import restaurantLogout from '../../util/RestaurantLogout';
import adminLogout from "../../util/AdminLogout";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true;

const authAxios = axios.create({
  baseURL: "http://localhost:4000",
  // baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


// Request interceptor to include the JWT token in headers
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AuthToken');
    const restaurantToken = localStorage.getItem("RestaurantAuthToken")
    const adminToken = localStorage.getItem("AdminAuthToken")

    console.log(token)
    console.log(restaurantToken)
    console.log(adminToken)

    if (config?.url?.split("/")[1] === "restaurant") {
      config.headers.Authorization = `Bearer ${restaurantToken}`;
    } else if (config.url?.startsWith("/admin")) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (config.url?.startsWith("/")) {
      config.headers.Authorization = `Bearer ${token}`
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
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as any;
    const response = error.response as AxiosResponse;
    const { url }: any = originalRequest;
    if (response && response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log('Token expired, attempting to refresh token');
        const res = await axios.post('http://localhost:4000/token/refresh-token', null, {
          withCredentials: true
        });
        console.log(res)
        const newAccessToken = res.data.accessToken
        const name = url.split("/")[1] === "restaurant" ? "RestaurantAuthToken" : url.startsWith("/admin") ? "AdminAuthToken" : "AuthToken"
        localStorage.setItem(name, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authAxios(originalRequest);
      } catch (refreshError) {
        if (refreshError instanceof AxiosError) {
          let goTo = "Sorry, your session expired. Please log in again."
          let refreshCheck = userLogout
          if (url?.split("/")[1] === "restaurant") {
            refreshCheck = restaurantLogout;
          } else if (url.startsWith("/admin")) {
            refreshCheck = adminLogout;
          }
          if (refreshError && refreshError.response && refreshError.response.status === 402) {
            goTo = ""
          }
          handleRefreshTokenError(goTo, refreshCheck)
        }
        if (refreshError)
          return Promise.reject(refreshError);
      }

    } else if (response.status == 403) {
      if (url?.split("/")[1] === "restaurant") {
        restaurantLogout(response.data.message)
      } else if (url.startsWith("/")) {
        userLogout(response.data.message)
      }
    }
    return Promise.reject(error)
  }
);


const handleRefreshTokenError = (message: any, refreshCheck: any) => {
  refreshCheck(message)
};


export default authAxios;
