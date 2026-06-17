import { getUser } from './allApis';

export const getReqHeader = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return null;
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

async function updateSession(userId) {
  try {
    const response = await getUser(userId);
    const userData = response.data?.user || response.data;
    if (userData) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
    }
  } catch (error) {
    // Silent fail - session update is non-critical
  }
}

export default updateSession;
