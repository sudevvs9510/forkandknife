
// import axios from 'axios';
// import Cookies from 'js-cookie';

// axios.defaults.withCredentials = true;

// const authAxios = axios.create({
//   baseURL: 'http://localhost:4000',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   }
// });


// // Function to get cookie by name
// const getCookie = (name: string) => {
//   console.log(name , document.cookie)
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   console.log(value , parts)
//   if (parts.length === 2) return parts.pop()?.split(';').shift();
//   return null;
// }

// // Request interceptor to include the JWT token in headers
// authAxios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('AuthToken');
//     console.log(token)
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log('Request Interceptor:', config); 
//     return config;
//   },
//   (error) => {
//     console.error('Request Interceptor Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle token refresh logic
// authAxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         console.log('Token expired, attempting to refresh token');
//         const refreshToken = getCookie('refreshToken');
//         console.log(refreshToken)
//         if (!refreshToken) {
//           console.log('No refresh token available');
//           // Handle no refresh token scenario, possibly redirect to login
//           window.location.href = '/login';
//           return Promise.reject(error);
//         } 

//         const { data } = await axios.post('http://localhost:4000/refresh-token', {
//           refreshToken
//         }, { withCredentials: true });

//         console.log("Token refreshed:", data.accessToken);

//         localStorage.setItem('AuthToken', data.accessToken);
//         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         return authAxios(originalRequest);
//       } catch (err) {
//         console.error('Failed to refresh token', err);
//         // Clear tokens and redirect to login page
//         localStorage.removeItem('AuthToken');
//         Cookies.remove('refreshToken');
//         window.location.href = '/login';
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default authAxios;




import axios from 'axios';
import userLogout from "../../util/Logout"
import restaurantLogout from '../../util/RestaurantLogout';
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
    
    console.log(token)
    console.log(restaurantToken)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (restaurantToken){
      config.headers.Authorization = `Bearer ${restaurantToken}`;
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
       
        const response = await axios.post('http://localhost:4000/token/refresh-token');
        console.log(response)
        const newAccessToken = response.data.accessToken
        localStorage.setItem('AuthToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authAxios(originalRequest);
      } catch (refreshError) {
        handleRefreshTokenError(refreshError)
        // localStorage.removeItem('AuthToken')
        // userLogout("This user has been blocked")
        userLogout("")
        return Promise.reject(refreshError)
      }

    } else if (error.response.status == 403) {
      // localStorage.removeItem('AuthToken')
      userLogout("")
    }
    return Promise.reject(error)
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRefreshTokenError = (error : any) => {
  console.error('Failed to refresh token:', error);
  
  userLogout("Sorry, your session expired. Please log in again.");
  restaurantLogout("Sorry, your session expired. Please log in again.")
};


export default authAxios;

