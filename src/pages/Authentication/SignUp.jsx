import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import loginIMG from '../../assets/images/login/laptop-Cofee.jpg'
import { userRegister } from '../../services/allApis'
import { toast } from 'react-toastify'

function SignUp() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email:"",
        password: ""
    })
    const [error, setError] = useState(null);

    console.log(userData);

    const handleRegister = async(e)=>{
        e.preventDefault()

        const {username, email, password, firstname, lastname} = userData
        if(!username || !email || !password || !firstname || !lastname){
            toast.warning("Please Fill the form first")
        }
        else{
          const result = await userRegister(userData)
          if(result.status === 200){
            // ${response.data.caption}
            toast.success(`User Registered Successfully`)
    
            /* Empty the form */
            setUserData({
              username:"",
              firstname: "",
              lastname: "",
              email:"",
              password:""
            })
    
            // Navigate to the login page after successful registration
            navigate('/auth/login')
          }

          else{
            // toast.error
            toast.error(result.response.data)
          }
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
            <Row>
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
                                        <i className="feather icon-user-plus auth-icon"/>
                                    </div>
                                    <h3 className="mb-4">Sign up</h3>
                                    <div className="input-group mb-3">
                                        <input onChange={(e)=>setUserData({...userData, username:e.target.value})} value={userData.username} type="text" className="form-control" placeholder="Username"/>
                                    </div>
                                    
                                    {/* First And Last Name */}
                                    <div className='row mb-3'>
                                        <div className="input-group col">
                                            <input onChange={(e)=>setUserData({...userData, firstname:e.target.value})} value={userData.firstname} type="text" className="form-control" placeholder="FirstName"/>
                                        </div>
                                        <div className="input-group col">
                                            <input onChange={(e)=>setUserData({...userData, lastname:e.target.value})} value={userData.lastname} type="text" className="form-control" placeholder="Last Name"/>
                                        </div>
                                    </div>

                                    {/* Email And Password */}
                                    <div className='row mb-3'>
                                        <div className="input-group col">
                                            <input onChange={(e)=>setUserData({...userData, email:e.target.value})} value={userData.email} type="email" className="form-control" placeholder="Email"/>
                                        </div>
                                        <div className="input-group col">
                                            <input onChange={(e)=>setUserData({...userData, password:e.target.value})} value={userData.password} type="password" className="form-control" placeholder="Password"/>
                                        </div>
                                    </div>            

                                     {/* Display error message if there's an error */}
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                    <div className="form-group text-left">
                                        <div className="checkbox checkbox-fill d-inline">
                                            <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                                                                                                {/* DEMO.BLANK_LINK */}
                                                <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href=""> Newsletter</a> weekly.</label>
                                        </div>
                                    </div>
                                    <button onClick={handleRegister} className="btn btn-primary shadow-2 mb-4">Sign up</button>
                                    <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/login">Login</NavLink></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        )
    }

export default SignUp
