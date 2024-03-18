import React, { useEffect, useState } from 'react'
import UserAvatar from '../../components/avatar/UserAvatar'
import { Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getMyWorks } from './activityApis';

function MyWorks() {

    const [loading, setLoading] = useState(true);
    const [myWorks, setMyWorks] = useState([])

    const stateMap = {  /* This is to assign current state names based on the numeric values we get  */
        0: "Requested",
        1: "OnProgress",
        2: "Finished"
    };

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

            const response = await getMyWorks(reqHeader)
            setMyWorks(response.data)
            console.log("getMyWorks b Posts", response.data);
 
        } catch (error) {
            console.error('Error fetching other data:', error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(()=>{
        handlePageLoadData()
    }, [])

  return (
    <React.Fragment>
        {
            loading?(
                <div className='d-flex justify-content-center align-items-center' style={{height: '60vh'}}> 
                    <div style={{width: '10em', height: '10em'}}>
                        <Spinner animation="border" variant="primary" className='me-4 w-100 h-100'/>
                        <p className='fs-1'>Loading...</p>
                    </div>
                </div>
            ):(
                myWorks.length>0 ?
                myWorks.map((data, index) =>(
                    <div className='d-flex mb-3 border rounded'>
                        <div className='bg-success-subtle p-2' style={{width: '100px'}}>
                            <p className='fs-5 fw-bold text-center'>Work No</p>
                            <p className='m-0 fs-5 fw-bold text-center'>{index+1}</p>
                        </div>
                        <div className='w-100'>
                            <Link to={`/job/view/jobdetail/${data.jobPostId._id}`} style={{textDecoration: 'none', color: 'inherit'}}> 
                                <div className='p-2 jobpost-tile'>
                                    <p style={{fontSize: '28px', fontWeight: '500'}} className='m-0'>{data.jobPostId.jobTitle}</p>
                                </div>
                            </Link>
                
                            <div className='d-flex justify-content-start align-items-center p-2'>
            
                                <div className={`
                                                p-2 me-3 d-flex rounded justify-content-center align-items-center
                                                ${
                                                    data.requestType === 0 ? 'bg-primary-subtle' : 
                                                    data.requestType === 1 ? 'bg-warning-subtle' :
                                                    data.requestType === 2 && 'bg-success-subtle' 
                                                }
                                                `} style={{pointerEvents: 'none'}}>
                                                    
                                    <i className="fa-solid fa-tag me-2"></i>
            
                                    <p className='p-0 m-0'>{
                                        stateMap[data.requestType]
                                    }</p>
                                </div>
            
                                <Link to={`/job/view/jobdetail/${data.jobPostId._id}`}>
                                    <Button variant="primary" className='me-2' size="sm">View Job</Button>{' '}
                                </Link>
                            </div>
                        </div>
                    </div>
                )) :
                <div className='d-flex border align-items-center justify-content-center w-100'>
                    <h2>No Job Posts Yet</h2>
                </div> 
            )
        }
      
    </React.Fragment>
  )
}

export default MyWorks
