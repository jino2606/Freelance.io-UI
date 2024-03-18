import { io } from "socket.io-client";
import { BASE_URL } from "./baseUrl";

const socketConnection = () => {

    const getCurrentuser = sessionStorage.getItem("loggedInUser")
    console.log("Not Got Current");
    if (getCurrentuser){
        console.log("Got Current shock");
        const currentUser = JSON.parse(getCurrentuser)

        // Connect to WebSocket upon successful login
        const socket = io(BASE_URL); // Replace 'http://your-backend-url' with your actual backend URL

        socket.on('connect', () => {
          console.log('Connected to server and isAuthToken', currentUser._id);  
          socket.emit("save connectid" , currentUser._id)
        });

        // Save socket instance to use throughout the app
        window.socket = socket;

        // Event handler for socket disconnection
        window.socket.on('disconnect', () => {
          // Send some data or perform other actions here
        });

        console.log("socket id From Appjs", socket);
      }
  };

  export default socketConnection