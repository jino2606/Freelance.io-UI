import React from 'react'
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap'
import Avatar from '../avatar/Avatar'
import UserAvatar from '../avatar/UserAvatar'
import { Link, useNavigate } from 'react-router-dom'
import './gigsCards.css'
import { BASE_URL } from '../../services/baseUrl'
import ImgCarousel from '../commonComponents/ImgCarousel'

function GigsCard({jobPostData}) {

  const user = jobPostData.user[0]

  console.log("got post data", jobPostData);
  const navigate = useNavigate()

  const handleViewMore = ()=>{
    
    // using the navigate function to go to the '/addstudent' route with data as state
    navigate('/jobs/view/jobdetail', { state: { jobPostData } });

  }

  return (
    <Card style={{ width: '100%', minWidth: '25rem', height: '47rem'}} className='border-0 shadow'>
        <Card.Body>
            <Row className='px-2 py-2'>
              <Col sm={3}>
                {/* <Avatar fontWeight={'400'} fontSize={'6rem'}/> */}
                <UserAvatar userData={user} heightxwidth={4} fontSize={'1rem'}/>
              </Col>

              <Col sm={7}>
                <p className='mb-0 fs-4 fw-bold'>{user?.username.substring(0, 9)}<span>{user?.username.length>9 && '...'}</span></p>
                <p className='mb-0'>Place</p>
              </Col>

              <Col sm={2}>
                <div>
                  <i className="fa-regular fa-heart fs-4 mt-2"></i>
                </div>
              </Col>
            </Row>

            <Row className='px-2 py-2'>
              <Col className='card-skills'>
                <ImgCarousel jobPostData={jobPostData} height={'12rem'}/>
                <div className=''>
                  <div className='border p-3 pb-0 rounded' style={{height: '22em'}}>
                    <div style={{height: '6rem'}}>
                      <h4>{jobPostData.jobTitle.substring(0, 70)}<span>{jobPostData.jobTitle.length>70 && '...'}</span></h4>
                    </div> {/* Titile */}
                    <p>{jobPostData.jobDescription.substring(0, 270)}<span>{jobPostData.jobDescription.length>270 && '...'}</span></p>
                    
                    <div className='skill-sec' >
                      {
                        jobPostData.jobSkills.length>0 &&
                        jobPostData.jobSkills.map(item =>(
                          <Link to={`https://www.google.com/search?q=${encodeURIComponent(item)}`} className='me-2 skill' target="_blank">
                            {item.toUpperCase()}
                          </Link>
                        ))
                      }
                    </div>
                  </div>


                  <div className='d-flex justify-content-between align-items-center mt-4'>
                    {/* style={{ pointerEvents:'none'}} */}
                  <Link to={`/job/view/jobdetail/${jobPostData._id}`} > {/* aria-disabled={loggedinUser?._id === userData?._id} */}
                    <Button variant="success" className='rounded-pill'>View More</Button>
                  </Link>
                    

                    <div className='rounded-pill bg-secondary-subtle p-2 '>
                        <span className='fw-bold text-muted'>Budjet</span> <i class="fa-solid fa-indian-rupee-sign text-muted"></i><span className='text-muted me-2'>:</span>
                        <p className='text-muted p-o m-0 d-inline'> {jobPostData.jobRate}</p>
                    </div>
                  </div>
                </div>

              </Col>
            </Row>
            
        </Card.Body>
    </Card>
  )
}

export default GigsCard
