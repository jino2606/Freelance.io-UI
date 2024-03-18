import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import UserAvatar from '../../components/avatar/UserAvatar';
import { getRequestedUsers, updateUserJobState } from './activityApis';
import { Link } from 'react-router-dom';

import Payment from '../../components/payment/Payment'


function MyVerticallyCenteredModal(props) {

    const [loading, setLoading] = useState(true);
    const [requestedUsers, setRequestedUsers] = useState([])

    const {jobPostId, jobState, show, onHide} = props
    console.log("this is the jobPostId", jobPostId);

    const handleModalLoad = async()=>{
        console.log("Inside the Modal load");
        try {

            const token = sessionStorage.getItem("token")
            if(token){
                var reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` /* send token back as authorization */
                }
            }

            const response = await getRequestedUsers(jobPostId, reqHeader)
            setRequestedUsers(response.data)
            console.log("Job Requested user", response.data);
 
        } catch (error) {
            console.error('Error fetching other data:', error);
        } finally {
            setLoading(false);
        }

    }


    useEffect(()=>{
        console.log("Thsi si Show", show);
        if(show){ /* Only to load data if modal is open */
            handleModalLoad() 
        }
    }, [show])

    const handleUpdateState = async(id, requestedUserId, jobPostId, state)=>{
        console.log("Inside handleHire");
        try {

            const token = sessionStorage.getItem("token")
            if(token){
                var reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` /* send token back as authorization */
                }
            }

            const payload = {
                requestId: id,
                state,
                requestedUserId,
                jobPostId
            }

            const response = await updateUserJobState(payload, reqHeader)

            onHide()

            // setRequestedUsers(response.data)
            console.log("Updated user", response.data);
 
        } catch (error) {
            console.error('Error Updating state:', error);
        }
    }

    return (
      <Modal
        {...props}
        
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Applicants
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='overflow-y-scroll' style={{maxHeight: '80vh'}}> {/* d-flex align-items-center justify-content-between */}

            {
                requestedUsers?.length>0 ?
                requestedUsers?.map((data, index) =>(
                    <div className='d-flex mb-2'>
                        <div className='jobpost-tile py-4 w-75'>
                            <div className='ms-2 d-flex align-items-center'>
                                <UserAvatar userData={data.user[0]} heightxwidth={5} fontSize={'30px'}/> {/* userData, heightxwidth, fontSize */}
                                <h3 className='ms-3'>{data.user[0].username}</h3>
                            </div>
                
                            <div className='mt-4 ms-2 d-flex w-75 justify-content-start'>
                                <Button variant="primary" size="sm" className='me-4'><i className="fa-solid fa-user me-2"></i> View User </Button>{' '}
                                {/* style={{ pointerEvents: loggedinUser?._id === userData?._id?'none': 'auto'}}  aria-disabled={loggedinUser?._id === userData?._id}*/}
                                <Link to={`/user/chats/${data.user[0]._id}`} >
                                    <Button variant="warning" size="sm"><i className="fa-solid fa-message me-2"></i>Chat</Button>{' '}
                                </Link>
                            </div>
                        </div>
        
                        <div className='w-25  text-light fw-bolder fs-5 text-wrap text-center'
                            style={{cursor: 'pointer'}}>
        
                            {
                                data.state === 0 ? <div className='bg-success w-100 h-100 p-2 align-items-center d-flex justify-content-center task-action'
                                                        onClick={()=>handleUpdateState(data._id, data.user[0]._id, data.jobPostId, 1)}> {/* To update to (1) means to Engaged state */}
                                                        <p className='m-0 align-middle'><i className="fa-brands fa-get-pocket me-2 "></i>Hire</p>
                                                    </div>:

                                data.state === 1 ? <div className='bg-info w-100 h-100 p-2 align-items-center d-flex justify-content-center task-action'
                                                        onClick={()=>handleUpdateState(data._id, data.user[0]._id, data.jobPostId, 2)}> {/* To update to (2) means to Finished state */}
                                                        <Payment />
                                                    </div>:
                                data.state === 2 && <div className='bg-success w-100 h-100 p-2 align-items-center d-flex justify-content-center task-action'>
                                                        <p className='m-0 align-middle'><i className="fa-solid fa-check me-2"></i>Finished</p>
                                                    </div>
                            }
                        </div>
                    </div>
                )): <div>
                        <h2 className='text-center'>No Job Requests</h2>
                    </div>
            }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

function ViewApplicants({jobPostId, jobState}) {

    const [modalShow, setModalShow] = useState(false);

    console.log("this is the jobPostId In First", jobPostId);

    return (
        <>
            {/* <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button> */}

            <Button variant="success" size="sm" onClick={() => setModalShow(true)}>View Applicants</Button>{' '}

            <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            jobPostId={jobPostId}
            jobState={jobState}
            />
        </>
    )
}

export default ViewApplicants
