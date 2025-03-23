import axios from 'axios';
import * as authHelper from '@/auth/_helpers';

// Create an Axios instance
const apiFetcher = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL, // Set your API base URL
    headers: {
        "Content-Type": "application/ld+json", // Default for API Platform
    },
});

// Interceptor to modify headers based on request type
apiFetcher.interceptors.request.use(
    (config) => {

        config.headers['Authorization'] = `Bearer ${authHelper.getAuth()?.token}`;

        // Modify headers based on request type
        if (config.method === 'post') {
            config.headers['Content-Type'] = 'application/json'; // Default
        } else if (config.method === 'patch') {
            config.headers['Content-Type'] = 'application/merge-patch+json';
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle responses and errors globally
apiFetcher.interceptors.response.use(
    (response) => response.data, // Extract the data directly
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiFetcher;
