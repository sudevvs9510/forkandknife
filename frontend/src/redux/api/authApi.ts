import axios from 'axios'

// import { Contstants } from '../../config'
axios.defaults.withCredentials = true

const authAxios = axios.create({
   baseURL: 'http://localhost:4000',
   headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
   }
})



// Request interceptor to include the JWT token in headers
authAxios.interceptors.request.use(
   (config) => {
     const token = localStorage.getItem('accessToken');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   },
   (error) => {
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
 
     if (error.response.status === 401 && !originalRequest._retry) {
       originalRequest._retry = true;
       try {
         // Assuming you have an endpoint to refresh the token
         const { data } = await axios.post('http://localhost:4000/refresh-token', {}, { withCredentials: true });
         localStorage.setItem('accessToken', data.token);
         axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
         return authAxios(originalRequest);
       } catch (err) {
         console.error('Failed to refresh token', err);
         // Redirect to login if refresh fails
         window.location.href = '/login';
       }
     }
     return Promise.reject(error);
   }
 );
 


export default authAxios