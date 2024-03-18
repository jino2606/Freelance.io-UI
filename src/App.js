import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/landingPage/LandingPage';
import Header from './components/header/Header';
import Home from './pages/homePage/Home';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp';
import UserData from './pages/user/UserData';
import { useContext, useEffect, useState } from 'react';
import { isAuthTokenContext } from './context/ContextShare';
import Addjobs from './pages/addJobs/Addjobs';
import JobDetails from './pages/viewJob/JobDetails';
import ChatWindow from './pages/chatapp/ChatWindow';
import { io } from "socket.io-client";
import { BASE_URL } from './services/baseUrl';
import socketConnection from './services/socketConnect';
import Activity from './pages/myActivities/Activity';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const location = useLocation();

  // Define an array of route paths where you want to render the Header
  const headerRoutes = ['/home', '/user/profile', '/jobs/addjobs', '/jobs/view/jobdetail', '/user/activity'];

  // Regular expression to match paths starting with '/user/chats/'
  const chatRouteRegex = /\/user\/chats\/[A-Za-z0-9]+/i;

  // Check if the current path is in the array of headerRoutes
  const renderHeader = headerRoutes.includes(location.pathname) /* || chatRouteRegex.test(location.pathname); */

  /* State to store the navbar height and to useit across the app */
  // const [navHeight, setNavheight] = useState("")


  // const socketConnection = () => {

  //   const getCurrentuser = sessionStorage.getItem("loggedInUser")
  //   console.log("Not Got Current");
  //   if (getCurrentuser){
  //       console.log("Got Current shock");
  //       const currentUser = JSON.parse(getCurrentuser)

  //       // Connect to WebSocket upon successful login
  //       const socket = io('http://localhost:4000'); // Replace 'http://your-backend-url' with your actual backend URL

  //       socket.on('connect', () => {
  //         console.log('Connected to server and isAuthToken', currentUser._id);  
  //         socket.emit("save connectid" , currentUser._id)
  //       });

  //       // Save socket instance to use throughout the app
  //       window.socket = socket;

  //       console.log("socket id From Appjs", socket);
  //     }
  // };

  useEffect(()=>{
    socketConnection() /* WHen page loads the connction disconnects so it is made in the app.js */
  }, [])
  
  console.log("Froom App.js");
  return (
    <>
      {renderHeader && <Header />} {/* setNavheight={setNavheight} */}
      <Routes>
        <Route path='/'element={<LandingPage/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/signup' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/user/profile' element={<UserData/>}/>
        <Route path='/jobs/addjobs' element={<Addjobs/>}/>
        <Route path='/job/view/jobdetail/:jobPostId' element={<JobDetails/>}/>
        <Route path='/user/chats/:selectedReceiverId' element={<ChatWindow/>}/> {/*  navHeight={navHeight} */}
        <Route path='/user/activity' element={<Activity/>}/>
      </Routes>
      <ToastContainer position='top-center' theme='colored'/>
    </>

  );
}

export default App;
