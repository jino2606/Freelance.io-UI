import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import AddJobTitle from './AddJobTitle';
import { Link, useNavigate } from 'react-router-dom';
import AddJobSkills from './AddJobSkills';
import AddJobImage from './AddJobImage';
import AddJobDescription from './AddJobDescription';
import AddJobBudjet from './AddJobBudjet';
import { addPostApi } from './addJobsApis';
import { toast } from 'react-toastify';

function Addjobs() {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({

      jobTitle: "",
      jobSkills: [],
      jobImages: {
                  file: [],
                  prevImgs: []
                  },
      jobDescription: "",
      jobRate: 0
    });
    
    /* Image temporary url saver */
    const [imgURL, setImgURL] = useState([]);

    /* For token */
    const [token, setToken] = useState("")

    const navigate = useNavigate()

    const handleNext = () => {
      // setFormData({ ...formData, ...data });
      if(step<=4){
        setStep(step + 1);
      }
    };
  
    const handleBack = () => {
      if(step>=2){
        setStep(step - 1);
      }
    };

    console.log("this is the form data", formData);
    
    const reqBody = new FormData()

    const postJob = async()=>{
       
      if(token){
        /* create request header */
        var reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}` /* send token back as authorization */
        }
      }

      const result = await addPostApi(reqBody, reqHeader)
      console.log("Update results", result);
      if(result.status === 200){
          // toast.success("Job Succesfully Posted")
          // handleClose()
  
          /* updating the current session */
         

      }
      else{
        toast.error(result.response.data)
      }
    }

    /* DeStructure */
    const {jobTitle, jobSkills, jobImages, jobRate, jobDescription} = formData
    
    const handlePost = ()=>{

      if(!jobTitle || !jobSkills || !jobImages || !jobRate || !jobDescription){
        toast.warning("Complete all 5 Steps")
      }
      else if (formData.jobDescription.length < 270){
        toast.warning('Minimum 300 characters are required for the description.');
        setStep(4)
      }
      else{
        /* removing the preview url from it */
        setFormData(prevFormData => ({
          ...prevFormData,
          jobImages: formData.jobImages.file
        }));

        reqBody.append('jobTitle', formData.jobTitle);
        reqBody.append('jobDescription', formData.jobDescription);
        reqBody.append('jobRate', formData.jobRate);

        formData.jobSkills.map(skill => {
          reqBody.append('jobSkills', skill);
        });
        
        // Append each file in jobImages array to formData
        formData.jobImages.file.map((file, index) => {
            reqBody.append(`jobImages`, file);
        });

        /* Function to post the job */
        postJob()

        toast.success("Job Posted Succesfully")

        navigate('/home')
      }
    }
    console.log("reqBody", reqBody);

    useEffect(()=>{
      setToken(sessionStorage.getItem('token'))
    }, [])

  return (
    <React.Fragment>

        <Container fluid className='position-relative'>
          <Container className='bg-light'>
  
            <h1 className='text-center my-5'>{step}/5 Post a Job</h1>
            <Row className="justify-content-center shadow rounded-5 ">
                {step === 1 && <AddJobTitle formData={formData} setFormData={setFormData}/>}
                {step === 2 && <AddJobSkills formData={formData} setFormData={setFormData}/>}
                {step === 3 && <AddJobImage formData={formData} setFormData={setFormData} imgURL={imgURL} setImgURL={setImgURL}/>}
                {step === 4 && <AddJobDescription formData={formData} setFormData={setFormData}/>}
                {step === 5 && <AddJobBudjet formData={formData} setFormData={setFormData}/>}
            </Row>



          </Container>

          
          
          <Row className='position-fixed w-100 bottom-0 mb-5'>
            <ProgressBar now={step} max={5} style={{height: '5px'}}/>;
            <Col className='mt-3 d-flex justify-content-evenly'>
              <Button disabled={step===1} variant="primary" size="lg" className='rounded-pill' onClick={handleBack}>
                Back
              </Button>

                {
                  step !==5 &&
                  <Button variant="primary" size="lg" className='rounded-pill' onClick={handleNext}>
                   Next
                  </Button>
                }

                {
                  step === 5 &&
                  <Button variant="success" size="lg" className='rounded-pill' onClick={handlePost}>
                    Post
                  </Button>
                }
            </Col>
          </Row>
        </Container>

    </React.Fragment>

  )
}

export default Addjobs
