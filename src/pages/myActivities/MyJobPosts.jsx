import React, { useEffect, useState } from 'react'
import UserAvatar from '../../components/avatar/UserAvatar'
import { Button, Spinner } from 'react-bootstrap'
import './activity.css'
import { Link } from 'react-router-dom'
import ViewApplicants from './ViewApplicants'
import { getCurrentUserProject } from './activityApis'

function MyJobPosts() {

    const [loadingJobPosts, setLoadingJobPosts] = useState(true);
    const [myJobPosts, setMyjobPosts] = useState([])

    const handlePageLoadData = async()=>{
        try {

            const token = sessionStorage.getItem("token")
            if(token){
                /* create request header */
                var reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` /* send token back as authorization */
                }
            }

            //   console.log(" token", token, userId);

            const response = await getCurrentUserProject(reqHeader)
            setMyjobPosts(response.data)
            console.log("uSers Jpob Posts", response.data);
 
        } catch (error) {
            console.error('Error fetching other data:', error);
        } finally {
            setLoadingJobPosts(false);
        }

    }

    useEffect(()=>{
        handlePageLoadData()
    }, [])

  return (
    <React.Fragment>

      {/* <UserAvatar/> userData, heightxwidth, fontSize */}
        {
            loadingJobPosts ?(
                <div className='d-flex justify-content-center align-items-center' style={{height: '60vh'}}> 
                    <div style={{width: '10em', height: '10em'}}>
                        <Spinner animation="border" variant="primary" className='me-4 w-100 h-100'/>
                        <p className='fs-1'>Loading...</p>
                    </div>
                </div>
            ):(

            // {
                myJobPosts.map((data, index) =>(
                    <div className='d-flex mb-3 border rounded'>
                        <div className='bg-success-subtle p-2' style={{width: '100px'}}>
                            <p className='fs-5 fw-bold text-center'>Job No</p>
                            <p className='m-0 fs-5 fw-bold text-center'>{index + 1}</p>
                        </div>
                        <div className='w-100'>
                            <Link to={`/job/view/jobdetail/${data._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                <div className='p-2 jobpost-tile'>
                                    <p style={{fontSize: '28px', fontWeight: '500'}} className='m-0'>{data.jobTitle}</p>
                                </div>
                            </Link>
                
                            <div className='d-flex justify-content-start align-items-center p-2'>
                                <Link to={`/job/view/jobdetail/${data._id}`}>
                                    <Button variant="primary" className='me-2' size="sm">View Job</Button>{' '}
                                </Link>

                                <ViewApplicants jobPostId={data._id} jobState={data.state}/>
                            </div>
                        </div>
                    </div>
                ))
                
            // }

            )
            
}
      {/* <div className='d-flex border align-items-center justify-content-center w-100'>
        <h2>No Job Posts Yet</h2>
      </div> */}
    </React.Fragment>
  )
}

export default MyJobPosts
