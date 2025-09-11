// lib/api/api.ts


import axios from 'axios';


const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


export const nextServer = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});

export type ApiError = {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
    status?: number;
  };
  message?: string;
};

// Додайте логування для діагностики
nextServer.interceptors.request.use((config) => {
  console.log('Making API request to:', config.url);
  return config;
});

nextServer.interceptors.response.use(
  (response) => {
    console.log('API response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
      }
    }
    return Promise.reject(error);
  }
);

export default nextServer;