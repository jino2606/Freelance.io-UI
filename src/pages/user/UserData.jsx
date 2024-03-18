import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Avatar from '../../components/avatar/Avatar';
import './userData.css'
import CoverImg from './CoverImg';
import { setCurrentUser } from '../../redux/slices/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImg from './ProfileImg';
import { updateProfileAPI } from '../../services/allApis';
import { BASE_URL } from '../../services/baseUrl';
import { toast } from 'react-toastify';

/* This is the Profile page */

function UserData() {

  const [isProfileEdit, setIsProfileEdit] = useState(false)
  const [token, setToken] = useState("")

  /* for the preview Url */
  const [imgURL, setImgURL] = useState("");

  /* for the profileImage File */
  const [profileImg, setProfileImg] = useState();

  const dispatch = useDispatch()

  const userData = useSelector((state)=> state.sessionReducer)

  const getSession = ()=>{
    if (sessionStorage.getItem("loggedInUser")){
      const currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
      dispatch(setCurrentUser(currentUser))
    }
  }

  const handleUserProfile = ()=>{
    setIsProfileEdit(true)
  }

  const handleCancel = ()=>{
    /* To again fetch new data while clearing the form which the user typed */
    getSession()

    /* to set the for non editable type (disabled) */
    setIsProfileEdit(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCurrentUser({ ...userData, [name]: value }));
  };

  const handleSave = async(e)=>{
    e.preventDefault()

    if (!profileImg){
      setProfileImg(userData.profileImg[0])
    }


    // const {username,firstname,lastname,email,password,github,linkedin,profile,address1,address2,city,state,zipcode,profileImg} = userData

    /* if there is any uploading comtents from the system we should send the body in the for of form data */
    /* create object for form data */
    const reqBody = new FormData()

    /* add data to the form data */
    // Append userData directly to reqBody
    Object.entries(userData).forEach(([key, value]) => {
      reqBody.append(key, value);
    });
    
    reqBody.append("profileImg", profileImg)

    if(token){
        /* create request header */
        var reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}` /* send token back as authorization */
        }

    }

    const result = await updateProfileAPI(reqBody, reqHeader)
    console.log("Update results", result.data);
    if(result.status === 200){
        toast.success("User Updated Successfully")
        // handleClose()

        /* updating the current session */
        sessionStorage.setItem("loggedInUser", JSON.stringify(result.data))
        getSession()
        setIsProfileEdit(false)
    }
    else{
      toast.success(result.response.data)
    }
}

  console.log("arra tester", userData);
  useEffect(()=>{
    getSession()/* To store user data to redux */
    setToken(sessionStorage.getItem('token'))
  }, [])


  return (
    <Container fluid className='position-relative'>
      <div className='position-relative' style={{height: '320px'}}> 
        <CoverImg /> {/* Component for Cover Image */}
      </div>

      {/* More Data */}
      <Container className='position-absolute top-100 start-50 translate-middle'>
        <Row className='bg-light rounded p-3 shadow'>
          <Col lg={6} className=''>
              <div lg={6} className='position-relative rounded-circle bg-primary border border-light-4 border-4 d-flex justify-content-center align-items-center overflow-hidden profile-avatar' style={{height: '15rem', width: '15rem'}}>
                <div className='h-100 w-100'>
                  {
                    imgURL || userData?.profileImg.length>0?
                    <img src={imgURL?imgURL:`${BASE_URL}/uploads/${userData.profileImg[0].filename}`} alt="" className='w-100 object-fit-cover position-center' />:
                    <Avatar fontWeight={'400'} fontSize={'6rem'} userData={userData}/>
                  }
                  
                </div>

                <div className='image-icon h-100 w-100 d-flex justify-content-center align-items-center'>
                  <ProfileImg setImgURL={setImgURL} imgURL={imgURL} setProfileImg={setProfileImg} setIsProfileEdit={setIsProfileEdit}/>
                </div>
                
              </div >
          </Col>

          <Col lg={6} className='text-end pt-4'>
              <h5 className='me-2'>
                {`${userData?.firstname} ${userData?.lastname}`}
                {/* <span className="font-weight-light">, 35</span> */}
              </h5>

              <div className="font-weight-300 d-flex justify-content-end">
                <h6 className={!userData?.city && 'fst-italic'}>{`${userData?.city?userData.city: "City"}, ${userData?.state?userData.state: "state"}`}</h6> 
                <div className='d-flex justify-content-center' style={{width: '2rem'}}>
                  <i className="fa-solid fa-location-dot"></i>
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-end">

                <h6 className={!userData?.jobTitle && 'fst-italic'}>{userData?.jobTitle? userData.jobTitle: "Current Job Title" }</h6>

                <div className='d-flex justify-content-center' style={{width: '2rem'}}>
                  <i className="fa-solid fa-briefcase"></i>
                </div>
              </div>
              
              <div className="mt-4 d-flex justify-content-end">
                <p className={!userData?.education && 'fst-italic'}>{userData?.education? userData.education: "Add Institution of Study" }</p>
                <div className='d-flex justify-content-center' style={{width: '2rem'}}>
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
              </div>

            <div className='me-2 mt-4 social-handles'>
              <a href={userData?.github} target='_blank' type='button'> <i className="fa-brands fa-square-github fa-2x me-3"></i></a>   
              <a href={userData?.linkedin} target='_blank'> <i className="fa-brands fa-linkedin fa-2x me-3"></i></a>
              <a href={userData?.profile} target='_blank'> <i className="fa-solid fa-image-portrait fa-2x"></i></a>
            </div>
            
          </Col> 
        </Row>

        <Container className='p-5 shadow rounded position-absolute top-100 start-50 translate-middle-x forms-container'>
          <Form>
            {/* <div className='d-flex justify-content-between align-items-center mb-3'> */}
              <p className='form-heading'>USER PROFILE</p>
            {/* </div> */}

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUserName">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control disabled={!isProfileEdit} type="text" placeholder="Enter username" name='username' value={userData?.username} onChange={handleInputChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>FirstName</Form.Label>
                  <Form.Control disabled={!isProfileEdit} type="text" placeholder="Enter firstname" name='firstname' value={userData?.firstname} onChange={handleInputChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>LastName</Form.Label>
                  <Form.Control disabled={!isProfileEdit} type="text" placeholder="Enter lastname" name='lastname' value={userData?.lastname} onChange={handleInputChange}/>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control disabled={!isProfileEdit} type="email" placeholder="Enter email" name='email' value={userData?.email} onChange={handleInputChange}/>
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control disabled={!isProfileEdit} type="password" placeholder="Password" name='password' value={userData?.password} onChange={handleInputChange}/>
                </Form.Group>
              </Row>
          </Form>

          
          <Form className='mt-5'>
            <p className='form-heading'>Professional Information</p>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridJobTitle">
                <Form.Label>Current Job Title</Form.Label>
                <Form.Control disabled={!isProfileEdit} type="text" placeholder="What is your profession?" name='jobTitle' value={userData?.jobTitle} onChange={handleInputChange}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEducation">
                <Form.Label>Institution of Study</Form.Label>
                <Form.Control disabled={!isProfileEdit} type='text' placeholder='College/University' name='education' value={userData?.education} onChange={handleInputChange}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Tell Us About You</Form.Label>
                <Form.Control disabled={!isProfileEdit} as='textarea' placeholder='Tell us about any hobbies, additional expertise, or anything else you’d like to add.' name='userDescription' value={userData?.userDescription} onChange={handleInputChange}/>
              </Form.Group>
            </Row>
          </Form>

          <Form className='mt-5'>
            {/* <div className='d-flex justify-content-start align-items-end mb-3'>
              <p className='form-heading m-0'>Connect with Me</p>
              <Button variant='' className='h-100 pt-0' onClick={{}}>
                <i className='w-100 text-primary fa-regular fa-pen-to-square'></i>
              </Button>
            </div> */}
            <p className='form-heading'>Connect with Me</p>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridGithub">
                <Form.Label><i className="fa-brands fa-square-github me-2"></i>Github</Form.Label>
                <Form.Control disabled={!isProfileEdit} type="link" placeholder="Paste Github Link" name='github' value={userData?.github} onChange={handleInputChange}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLinkedin">
                <Form.Label><i className="fa-brands fa-linkedin me-2"></i>Linkedin</Form.Label>
                <Form.Control disabled={!isProfileEdit} type="link" placeholder="Paste Linkedin Link" name='linkedin' value={userData?.linkedin} onChange={handleInputChange}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPortfolio">
                <Form.Label><i className="fa-solid fa-image-portrait me-2"></i>Portfolio</Form.Label>
                <Form.Control disabled={!isProfileEdit} type="link" placeholder="Paste Portfolio Link" name='profile' value={userData?.profile} onChange={handleInputChange}/>
              </Form.Group>
            </Row>
          </Form>


          <Form className='mt-5'>
              <p className='form-heading '>CONTACT INFORMATION</p>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control disabled={!isProfileEdit} value={userData?.address1} placeholder="1234 Main St" type="text" name='address1' onChange={handleInputChange}/>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control disabled={!isProfileEdit} placeholder="Apartment, studio, or floor" type="text" name='address2' value={userData?.address2} onChange={handleInputChange}/>
              </Form.Group>
  
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control disabled={!isProfileEdit} placeholder='City Name' type="text" name='city' value={userData?.city} onChange={handleInputChange}/>
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  {/* <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select> */}
                  <Form.Control disabled={!isProfileEdit} placeholder='State Name' type="text" name='state' value={userData?.state} onChange={handleInputChange}/>
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control disabled={!isProfileEdit} placeholder='zip code' type="number" name='zipcode' value={userData?.zipcode} onChange={handleInputChange}/>
                </Form.Group>
              </Row>

              {/* Checkbox Not Needed right Now */}
              {/* <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
    */}       
              <div className='d-flex justify-content-end align-items-center'>
                <Button disabled={isProfileEdit} variant='primary' className='me-2' onClick={handleUserProfile}>
                  {/* <i className='w-100 text-light fa-regular fa-pen-to-square'></i> */}
                  Edit
                </Button>

                {/* <div> */}
                  <Button disabled={!isProfileEdit} variant='success' className='me-2' type="submit" onClick={handleSave}>    
                    {/* <i className='w-100 text-light fa-regular fa-pen-to-square'></i> */}
                    Save Changes
                  </Button>
                  
                  <Button disabled={!isProfileEdit} variant="danger" className='me-2' onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              {/* </div> */}
          </Form>
        </Container>
      </Container>
    </Container>
  )
}

export default UserData
