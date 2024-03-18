import React, { useState } from 'react'
import { Card, Col, Form } from 'react-bootstrap'

function AddJobBudjet({formData, setFormData}) {

    const [activeCard, setActiveCard] = useState()

    const [isCard1Seclected, setIsCard1Seclected] = useState(false)
    const [isCard2Seclected, setIsCard2Seclected] = useState(true)

    return (
        <React.Fragment>

            <Col lg={5} className='p-5'>
                <h1>Tell us about your budget.</h1>

                <p>This will help us match you to talent within your range.</p>
            </Col>

            <Col lg={5} className='p-5 '>
                <div className='d-flex justify-content-between'>
                    <Card style={{pointerEvents: 'none', opacity: '0.7', width: '14rem' }} onClick={()=>{setIsCard1Seclected(true); setIsCard2Seclected(false)}} className={`me-2 ${isCard1Seclected?'border-success': ''}`}>
                        <Card.Body >
                            <Card.Title>Hourly Rate</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                <i class="fa-solid fa-indian-rupee-sign me-2"></i>
                                <span>/hr</span>
                            </Card.Subtitle>
                            <div className='d-flex justify-content-between mt-2'>
                                <div className='p-2'>
                                    <i class="fa-regular fa-clock fs-3"></i>
                                </div>

                                <div className={`p-2 rounded-circle d-flex justify-content-center align-items-center ${ isCard1Seclected?'bg-success': ''}`} style={{height: '30px', width: '30px'}}>
                                    <i class="fa-regular fa-circle" ></i>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>

                    {/* second Card */}            
                    <Card style={{ width: '14rem' }} onClick={()=>{setIsCard2Seclected(true); setIsCard1Seclected(false)}} className={isCard2Seclected?'border-success': ''}>
                        <Card.Body>
                            <Card.Title>Fixed Rate</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                <i class="fa-solid fa-indian-rupee-sign me-2"></i>
                                {/* <span>/hr</span> */}
                            </Card.Subtitle>
                            <div className='d-flex justify-content-between mt-2'>
                                <div className='p-2'>
                                    <i class="fa-solid fa-tag fs-3"></i>
                                </div>

                                <div className={`p-2 rounded-circle d-flex justify-content-center align-items-center ${ isCard2Seclected?'bg-success': ''}`} style={{height: '30px', width: '30px'}}>
                                    <i class="fa-regular fa-circle" ></i>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </div>

                <div className='mt-4'>
                    <p>
                        Set a price for the project and pay at the end, or you can divide the project into milestones and pay as each milestone is completed.
                    </p>
                    

                    <p style={{fontWeight: '700'}} className='mb-2'>
                        What is the best cost estimate for your project?             
                    </p>

                    <p>You can negotiate this cost and create milestones when you chat with your freelancer.</p>

                    
                    <div className='d-flex align-items-center'>
                        <Form.Control className='me-2 text-end' type="number" defaultValue={0} min={0} onChange={(e)=>setFormData({...formData, jobRate:e.target.value})} value={formData?.jobRate} style={{minWidth: '25%', maxWidth: '100%'}}/>
                        <div>
                            <i class="fa-solid fa-indian-rupee-sign me-2"></i>
                            {/* <span>/hr</span> */}
                        </div>
                    </div>
                    <Form.Label className='text-end'>Enter Job Rate</Form.Label>


                </div>          
            </Col>
            
        </React.Fragment>
    )
}

export default AddJobBudjet
