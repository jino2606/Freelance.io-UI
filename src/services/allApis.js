import api from './commonApi';
import { API_URL } from './baseUrl';

// Auth
export const userRegister = (data) => api.post(`${API_URL}/user/register`, data);
export const userLogin = (data) => api.post(`${API_URL}/user/login`, data);
export const userLogout = () => api.put(`${API_URL}/user/logout`);

// User
export const updateProfileAPI = (data) => api.put(`${API_URL}/user/update`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getUser = (id) => api.get(`${API_URL}/user/${id}`);

// Job Posts
export const getJobPostsAPI = (params = {}) => api.get(`${API_URL}/job/post`, { params });
export const getJobPostAPI = (id) => api.get(`${API_URL}/job/post/data/${id}`);
export const createJobPostAPI = (data) => api.post(`${API_URL}/job/post`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getCurrentUserJobPostsAPI = () => api.get(`${API_URL}/job/post/currentuser`);
export const getMyWorksAPI = () => api.get(`${API_URL}/job/post/myworks`);

// Job Requests
export const requestTaskAPI = (data) => api.post(`${API_URL}/job/request-task`, data);
export const updateRequestAPI = (data) => api.put(`${API_URL}/job/post/updaterequest`, data);
export const deleteRequestAPI = (id) => api.delete(`${API_URL}/job/delete-task/${id}`);
export const getRequestedUsersAPI = (jobPostId) => api.get(`${API_URL}/job/post/requesteduser/${jobPostId}`);

// Chat
export const getMessagesAPI = (senderId, receiverId) => api.get(`${API_URL}/chats/${senderId}/${receiverId}`);
export const getChatPreviewAPI = (userId) => api.get(`${API_URL}/user/contacted/${userId}`);