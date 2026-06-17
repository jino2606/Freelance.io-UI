import { io } from 'socket.io-client';
import { BASE_URL } from './baseUrl';

const socketConnection = () => {
  const savedUser = sessionStorage.getItem('loggedInUser');
  if (!savedUser) return;

  const currentUser = JSON.parse(savedUser);
  const socket = io(BASE_URL, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000
  });

  socket.on('connect', () => {
    socket.emit('save connectid', currentUser._id);
  });

  window.socket = socket;
};

export default socketConnection;