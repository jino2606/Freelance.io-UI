import React from 'react'
import { Col, FloatingLabel, Form } from 'react-bootstrap'

function AddJobDescription({formData, setFormData}) {
  return (
    <React.Fragment>

        <Col lg={5} className='p-5'>
            <h1>Unveil your project's story</h1>

            <div className='mt-4'>
                <p><strong>Seeking individuals with:</strong></p>
                <ul>
                    <li>Clear expectations about your task or deliverables</li>
                    <li>The competencies needed for your project</li>
                    <li>Effective communication</li>
                    <li>Insights into your or your team's preferred workflow</li>
                </ul>
            </div>

        </Col>

        <Col lg={5} className='p-5'>
            <Form.Label><h4>Describe what you need</h4></Form.Label>

            <FloatingLabel controlId="floatingTextarea2" label="Provide a Description of at least 270 characters">
                <Form.Control minLength={270} onChange={(e)=>setFormData({...formData, jobDescription:e.target.value})} value={formData?.jobDescription} as="textarea" placeholder="Leave a comment here" className='overflow-y-scroll' style={{ minHeight: '15rem', maxHeight: '20rem' }}/>
            </FloatingLabel>
        </Col>
        
    </React.Fragment>
  )
}

export default AddJobDescription
