import axios from 'axios';

const api = axios.create({
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth token to every request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiry globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const message = error.response?.data?.message || '';
      if (message.includes('expired') || message.includes('Invalid token')) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('loggedInUser');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Legacy compat
export const commomAPI = async (httpRequest, url, reqBody, reqHeaders) => {
  const config = {
    method: httpRequest,
    url,
    data: reqBody,
    headers: reqHeaders || { 'Content-Type': 'application/json' }
  };

  try {
    return await axios(config);
  } catch (error) {
    return error;
  }
};