import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import loginIMG from '../../assets/images/login/laptop-Cofee.jpg'
import { userLogin } from '../../services/allApis'
import { isAuthTokenContext } from '../../context/ContextShare'
import { io } from 'socket.io-client'
import socketConnection from '../../services/socketConnect'
import { toast } from 'react-toastify'

function Login() {

    const [userData, setUserData] = useState({
        email:"",
        password: ""
    })

    /* to set login is made or not */
    const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

    const navigate = useNavigate()

    // const socketConnection = () => {
    //     // Connect to WebSocket upon successful login
    //     const socket = io('http://localhost:4000'); // Replace 'http://your-backend-url' with your actual backend URL
    //     socket.on('connect', () => {
    //       console.log('Connected to server and isAuthToken', isAuthToken);  
    //     });
    
    //     // Save socket instance to use throughout the app
    //     window.socket = socket;
    //   };

    const handleLogin = async(e)=>{
        e.preventDefault()
    
        const {email, password} = userData
        if(!email || !password){
        //   toast.warning("Please Fill the form first")
          toast.warning("Please Fill the form first")
        }
        else{
          const result = await userLogin(userData)
          if(result.status === 200){

           toast.success(`Logged in Successfully`)
            console.log("resultssa", result.data);
            /* saving the session and token in to the session storage. Create a key and value*/
            sessionStorage.setItem("loggedInUser", JSON.stringify(result.data.loggedInUser)) /* covert it to a string format while storing */
            sessionStorage.setItem("token", result.data.token)
    
            /* Empty the form */
            setUserData({
              email:"",
              password:""
            })

            /* set authtoken to true */
            setIsAuthToken(true)

            /* setting the socket connection from the login itself */
            // if(isAuthToken){
            socketConnection()
            // }else{
                // alert(`The Socket Connection Failed. Realtime notifications and messages won't work, Try Login again`)
            // }
            
            /* setting a timeout to show and make work the toast messge to work */
            /*  introducing artificial delays using setTimeout is generally not considered a best practice, as it may lead to unpredictable behavior and is more of a workaround than a solution.
                Using a state management solution, such as passing state through the router, is a cleaner and more maintainable approach */
                
            // setTimeout(()=>{
              /* navigate to home */

              navigate('/home')
            // }, 2000)
            
          }
          else{
            // toast.error(result.response.data)
            console.log(result.response.data);
            toast.error(result.response.data)

          }
        }
      }
    
    /* When the token is present in the session (when user is logged in) the login page will always navigate to home page */
    const isLoggedIn = ()=>{
        if (sessionStorage.getItem("token")){ 
            navigate('/home')
        }
    }

    useEffect(()=>{
        isLoggedIn()
    },[])


  return (
    <Container className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>

        <Row className='shadow'>
            <Col lg={6}>
                <img className='w-100 h-100' style={{objectFit: 'contain'}} src={loginIMG} alt="" />
            </Col>
            <Col lg={6} className='bg-white'>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="">
                            <div className="text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input onChange={(e)=>setUserData({...userData, email:e.target.value})} value={userData.email} type="email" className="form-control" placeholder="Email" autoComplete="email" name='email'/>
                                </div>
                                <div className="input-group mb-4">
                                    <input onChange={(e)=>setUserData({...userData, password:e.target.value})} value={userData.password} type="password" className="form-control" placeholder="password" autoComplete="current-password" name='password'/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                        <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div>
                                <button onClick={handleLogin} type='submit' className="btn btn-primary shadow-2 mb-4">Login</button>
                                <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Don't have an account? <NavLink to="/auth/signup">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>


    </Container>
  )
}

export default Login
