import React, { useContext, useEffect, useRef, useState } from 'react'
import './header.css'
import '../../index.css'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../../context/ContextShare';
import { userLogout } from '../../services/allApis';
import UserAvatar from '../avatar/UserAvatar';
import { toast } from 'react-toastify';

function Header({setNavheight, isFromChats}) {

    const navigate = useNavigate()
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState([])

    // Create a ref to store the reference to the div element
    const navBar = useRef(null);

    const token = sessionStorage.getItem("token")

    const currentPage = location.pathname

    console.log('Current page:', currentPage);


    const handleLogout = async()=>{

        if(token){
            /* create request header */
            var reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` /* send token back as authorization */
            }
    
        }
        // const currentUserId = JSON.parse(sessionStorage.getItem("loggedInUser"))._id
        const result = await userLogout(reqHeader)

        console.log("Update results", result.data);
        if(result.status === 200){
            toast.success("Logged out Succesfully")
        }

        /* to disconnect from the socket also */
        window.socket.disconnect(() => {
            console.log('Disconnected from server');
          });

        sessionStorage.removeItem("token")
        sessionStorage.removeItem("loggedInUser")

        setIsLoggedIn(false)

        /* to Navigate to page while clicking on logout */
        navigate('/')
    }

    const checkLogin = ()=>{
        if(token){
            setIsLoggedIn(true)
        }
    }

    console.log("this is from header is auth", isLoggedIn);



    // Function to get the height of the div
    const getDivHeight = () => {

        if (navBar.current) {
        // Access the offsetHeight property of the div element
        const height = navBar.current.offsetHeight;
        // Update the state with the height value
        setNavheight(height);
        }
    };

    const getCurrentUser = ()=>{
        if (sessionStorage.getItem("loggedInUser")){
          const currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
          setCurrentUser(currentUser)
        }
      }
    

    useEffect(()=>{
        checkLogin()
        getCurrentUser()
    }, [])

    useEffect(()=>{
        if(setNavheight){
            getDivHeight()
        }
    })

  return (
    <>
        {/* <div className={currentPage !== '/'? 'shadow bg-dark':''} > */}
        <div className={`${
        currentPage !== '/' ? 'bg-dark' : ''
        } ${
        isFromChats ? 'position-fixed w-100 z-3' : ''
        }`}
        >
            <Navbar ref={navBar} expand="lg" className="navigation_bar bg-none position-relative p-3">
                <Container>
                    <Navbar.Brand className='nav-brand' href="#">Freelance.io</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    {
                        isLoggedIn?
                        <Navbar.Collapse id="navbarScroll">
                        <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >

                        {/* <Nav.Link href="#action1" className='textNav'>Explore</Nav.Link> */}
                        <Link style={{textDecoration: 'none'}} to={'/jobs/addjobs'} ><Nav.Item className='textNav p-2'>Post a Job</Nav.Item></Link>
                        <Link style={{textDecoration: 'none'}} to={'/user/activity'} ><Nav.Item className='textNav me-3 p-2'>My Actiivity</Nav.Item></Link>


                        {/* <NavDropdown title="Link" id="navbarScrollingDropdown" className='textNav'>
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                            Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                            Something else here
                            </NavDropdown.Item>
                        </NavDropdown> */}

                        </Nav>

                        <Nav className='mt-2 mt-lg-0 header-loggedin'>
                            
                            <button className='me-2' href="#action1">
                                <i class="fa-regular fa-bell text-light"></i>
                            </button>

                            <button className='me-2' href="#action1">
                                <i class="fa-regular fa-envelope text-light"></i>
                            </button>

                            <div class="dropdown">
                                <button className='' type="button" data-bs-toggle="dropdown" aria-expanded="false" >

                                   <UserAvatar userData={currentUser} heightxwidth={2.8} fontSize={'20px'}/> {/* userData, heightxwidth, fontSize */}

                                </button>

                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={'/user/profile'}>Profile</Link> </li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    <Dropdown.Divider />
                                    <li><a className="dropdown-item" type='button' onClick={handleLogout}>Logout</a></li>                              
                                </ul>
                            </div>
                        </Nav>
                    </Navbar.Collapse>:

                    <Navbar.Collapse>
                        <Nav className='ms-auto my-2 my-lg-0'>
                            <Link to={'/auth/signup'}>
                                <Button className='black_button mx-2 px-3 py-2' href="#action1">Sign up</Button>
                            </Link>

                            <Link to={'/auth/login'}>
                                <Button className='white_button px-3 py-2' href="#action1">Login </Button>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                    }
                </Container>

            </Navbar>
            {   
                /* this Empty White space is only for chats page */
                isFromChats &&
                <div style={{height: '30px'}} className='bg-light w-100'>
                            
                </div>
            }
        </div>

    </>
  )
}

export default Header
