import React, { useEffect, useState } from 'react'
import { Button, Carousel, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Link, useLocation, useParams } from 'react-router-dom';
import UserAvatar from '../../components/avatar/UserAvatar';
import { BASE_URL } from '../../services/baseUrl';
import ImgCarousel from '../../components/commonComponents/ImgCarousel';
import { deleteRequestTask, getPostData, getPostDate, requestTask } from './viewJobsApis';
import Header from '../../components/header/Header';
import { toast } from 'react-toastify';

function JobDetails() {

    const location = useLocation();
    
    // const jobPostData = location.state.jobPostData

    // const userData = jobPostData.user[0]

    const { jobPostId } = useParams();

    const token = sessionStorage.getItem("token")

    const [loggedinUser, setLoggedinUser] = useState([])

    const [jobPostData, setJobPostData] = useState([])
    const [userData, setUserData] = useState([])
    
    const [jobRequestType, setJobRequestType] = useState([])
    const [buttonData, setButtonData] = useState("")
    /* setting loading data manulally */
    const [loadingPageData, setLoadingPageData] = useState(true);
    // const [loadingButtonData, setLoadingButtonData] = useState(true);


    const stateMap = {  /* This is to assign current state names based on the numeric values we get  */
        0: "Open",
        1: "Engaged",
        2: "Closed"
    };

    const getProjectData = async()=>{

        try {

            const token = sessionStorage.getItem("token")
            if(token){
                /* create request header */
                var reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` /* send token back as authorization */
                }
            }

            const response = await getPostData( jobPostId, reqHeader)
            console.log("while single getPostData", response.data);
            const {jobPost, jobPoster, jobPostRequests} = response.data

            setJobPostData(jobPost)
            setUserData(jobPoster)
            setJobRequestType(jobPostRequests)

        } catch (error) {
            console.error('Error fetching other data:', error);
        }  finally {
            setLoadingPageData(false);
        }
    }


    const getCurrentUser = ()=>{
        if (sessionStorage.getItem("loggedInUser")){
            const currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
            setLoggedinUser(currentUser)
            // console.log("Got Current user", currentUser);
        }
        
    }

    const handleRequestTask = async()=>{
        //  
            
        if(token){
            /* create request header */
            var reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` /* send token back as authorization */
            }

        }

        /* [0-Request Task, 1-Cancel Task, 2-Finished] */

        if(jobRequestType == null){
            console.log("INIFFFF");
            const reqBody = {     
                jobPostId: jobPostData._id,
                requestType: 0
            }
    
            const result = await requestTask(reqBody, reqHeader)

            if(result.status === 200){

                const payload = {
                    jobPosterId: userData._id,
                    notification: result.data
                }
                    

                window.socket.emit('Request Notification', payload);

                toast.success("Your request has been received. Expect a response from the job poster soon.")
          
            }
            else{
                console.log(result.response.data);
                toast.error(result.response.data)
            }
            
        } else if(jobRequestType.requestType == 0){
            console.log(" IN ELSE IFFFF");
            const result = await deleteRequestTask(jobRequestType._id, reqHeader)

            if(result.status === 200){

                toast.success("Your request has been Updated.")
    
            }
            else{
                console.log(result.response.data);
                toast.error(result.response.data)
            } 
        }

        getProjectData()

    }

    const handleButtonData = ()=>{
        if(jobRequestType != null){
            console.log("request Button");
            if(jobRequestType.requestType == 0){
                console.log("request Button 0");
                setButtonData("Cancel Request")
            }
            if(jobRequestType.requestType == 2){
                console.log("request Button 2");
                setButtonData("Finished")
            }
        } else{
            console.log("Else request Button");
            setButtonData("Request Task")
        }
    }

    useEffect(()=>{
        getCurrentUser()
        getProjectData()
    }, [])

    useEffect(()=>{
        if(!loadingPageData){
            handleButtonData()
        }
    }, [loadingPageData, jobPostData]) /* This use effect is to get the Buttons data only if the other data are loaded.
                            it is triggered while "loadingPageData" but also checks if it is false(false means other data are loaded) */

    useEffect(() => {
        const createNewElement = (chat) => {
            console.log("iRequest Notification Console log", chat); 
        }
        
        
        window.socket?.on('Request Notification', createNewElement);

        return () => {
            // Cleanup function
            window.socket?.off('Request Notification', createNewElement);
        };
    }, [window.socket]);                        
    
    return (
        <React.Fragment>
            <Header/>
            <Container fluid className='my-5 mx-auto'>
                {/* <Container className='mt-5'> */}
                    {
                        loadingPageData ? (
                            <div className='d-flex justify-content-center align-items-center' style={{height: '60vh'}}> 
                                <div style={{width: '10em', height: '10em'}}>
                                    <Spinner animation="border" variant="primary" className='me-4 w-100 h-100'/>
                                    <p className='fs-1'>Loading...</p>
                                </div>
                            </div>
                        ) : (
                            <Row className='mx-5 justify-content-center w-100 h-100'>
                                <Col lg={3}> 
                                    <div className='p-5 shadow rounded-5 me-4'>
                                        <div className='mt-3 mb-3'>
                                            <h4 className='text-center m-0 fs-1'>Job provider</h4>
                                        </div>
                                        <Row>
                                            <Col className='d-flex justify-content-center'>
                                                <UserAvatar userData={userData} heightxwidth={18} fontSize={'6rem'}/>
                                            </Col>
                                        </Row>
            
                                        <Row>
                                            <Col className='text-center'>
                                                <h5 className='text-center my-3'>
                                                    {`${userData?.firstname.toUpperCase()} ${userData?.lastname.toUpperCase()}`}
                                                </h5>
            
                                                <div className="font-weight-300 d-flex justify-content-center">
                                                    <h6 className={!userData?.city && 'fst-italic'}>{`${userData?.city?userData.city: "City"}, ${userData?.state?userData.state: "state"}`}</h6> 
                                                    <div className='d-flex justify-content-center' style={{width: '2rem'}}>
                                                        <i className="fa-solid fa-location-dot"></i>
                                                    </div>
                                                </div>
            
                                                <div className="mt-2 d-flex justify-content-center">
            
                                                    <h6 className={!userData?.jobTitle && 'fst-italic'}>{userData?.jobTitle? userData.jobTitle: "Current Job Title" }</h6>
            
                                                    <div className='d-flex justify-content-center' style={{width: '2rem'}}>
                                                    <i className="fa-solid fa-briefcase"></i>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-2 d-flex justify-content-center">
                                                    <p className={!userData?.education && 'fst-italic'}>{userData?.education? userData.education: "Add Institution of Study" }</p>
                                                    <div className='d-flex justify-content-center' style={{width: '2rem'}}>
                                                    <i className="fa-solid fa-graduation-cap"></i>
                                                    </div>
                                                </div>
            
                                                <div className='me-2 mt-2 social-handles'>
                                                    <a href={userData?.github} target='_blank' type='button'> <i className="fa-brands fa-square-github fa-2x me-3"></i></a>   
                                                    <a href={userData?.linkedin} target='_blank'> <i className="fa-brands fa-linkedin fa-2x me-3"></i></a>
                                                    <a href={userData?.profile} target='_blank'> <i className="fa-solid fa-image-portrait fa-2x"></i></a>
                                                </div>
            
                                                <div className="mt-4 d-grid gap-2">
                                                    <Link style={{ pointerEvents: loggedinUser?._id === userData?._id?'none': 'auto'}} to={`/user/chats/${userData._id}`} aria-disabled={loggedinUser?._id === userData?._id}>
                                                        <Button variant="primary" size="lg" className='w-100' disabled={loggedinUser?._id === userData?._id}>
                                                            Contact
                                                        </Button>
                                                    </Link>
            
                                                    <Link style={{ pointerEvents: loggedinUser?._id === userData?._id?'none': 'auto'}} to={`/user/chats/${userData._id}`} aria-disabled={loggedinUser?._id === userData?._id}>
                                                        <Button variant="secondary" size="lg" className='w-100'>
                                                            View Profile
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                {/* style={{height: '85vh'}} */}
                                <Col lg={6} className='h-100' >
                                    <div className='p-5 pb-3 shadow rounded-5 position-relative'>
                                        <Row>
                                            <Col lg={9}>
                                                <h1>
                                                    {jobPostData?.jobTitle}
                                                </h1>
                                            </Col>
                                            <Col lg={3} className='d-flex flex-column align-items-end justify-content-center'> {/* d-flex justify-content-end */}
                                                <div className=''>
                                                    <h1 className='m-0'>
                                                        <i class="fa-solid fa-indian-rupee-sign me-2"></i>
                                                        {jobPostData?.jobRate}
                                                    </h1>
                                                    <p className='text-end'>Paid on delivery</p>
                                                </div>
                                                {/* p-2 d-flex rounded-pill justify-content-center align-items-center */}
                                                <div className={`
                                                                p-2 d-flex rounded-pill justify-content-center align-items-center
                                                                ${
                                                                    jobPostData?.state === 0 ? 'bg-success-subtle' : 
                                                                    jobPostData?.state === 1 ? 'bg-primary-subtle' :
                                                                    jobPostData?.state === 2 && 'bg-danger-subtle' 
                                                                }
                                                                `} style={{pointerEvents: 'none'}}>
                                                    <i className="fa-solid fa-tag me-2"></i>
        
                                                    <p className='p-0 m-0'>{
                                                        stateMap[jobPostData?.state]
                                                    }</p>
                                                    
                                                </div>
        
                                            </Col>
                                        </Row>
            
            
                                        <Row className='my-4'>
                                            <Col>
                                                <div>
                                                    <ImgCarousel jobPostData={jobPostData} height={'30rem'}/> {/* Custom Component */}
                                                </div>

                                                <div className='mt-5'>
                                                    <h3>Job Description</h3>
                                                    <div className='mt-4 overflow-y-scroll' style={{maxHeight: '20rem'}}>
                                                        <p style={{lineHeight: '2em'}}>{jobPostData?.jobDescription}</p>
                                                    </div>
                                                </div>

                                                <div className='mt-4'>
                                                    <h3>Skills Required</h3>
                                                    <div className='mt-4 d-flex'>
                                                        
                                                        {   
                                                            jobPostData?.jobSkills.length>0 &&
                                                            jobPostData?.jobSkills.map(item => (
                                                                <div className='px-4 py-2 border rounded me-2'>
                                                                    <p className='m-0'>{item}</p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <div className="mt-4 d-grid gap-2">
                                                        <Button variant={
                                                                `${ 
                                                                    jobRequestType == null ? 'primary':
                                                                    jobRequestType?.requestType == 0 ? 'danger':
                                                                    jobRequestType?.requestType == 2 && 'success'
                                                                }`
                                                            } 
                                                            size="lg" className='w-100' 
                                                            disabled={loggedinUser?._id === userData?._id || jobRequestType?.requestType == 2 } 
                                                            onClick={handleRequestTask}
                                                            >
                                                            {buttonData}
                                                        </Button>
                                                    </div>  
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
        
                                {/* <Col lg={2} className='bg-success-subtle' style={{height: '38em'}}>
                                    
                                </Col> */}
                            </Row>
                        )

                    }
                {/* </Container> */}
            </Container>
        </React.Fragment>
    )
}

export default JobDetails
