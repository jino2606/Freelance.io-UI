import React from 'react'
import { Col, Form } from 'react-bootstrap'

function AddJobTitle({formData, setFormData}) {

    console.log("formData", formData);

  return (
    <React.Fragment>

        <Col lg={5} className='p-5'>
            <h1>Add a captivating title to your Project</h1>

            <p>This helps your job post stand out to the right candidates. It’s the first thing they’ll see, so make it count!</p>
        </Col>

        <Col lg={5} className='p-5'>
            <Form.Label><h4>Write a title for your job post</h4></Form.Label>
            <Form.Control type="text" onChange={(e)=>setFormData({...formData, jobTitle:e.target.value})} value={formData?.jobTitle}/>

            <div className='mt-4'>
                <p><strong>Example Titles</strong></p>
                <ul>
                    <li>Build responsive WordPress site with booking/payment functionality</li>
                    <li>Graphic designer needed to design ad creative for multiple campaigns</li>
                    <li>Facebook ad specialist needed for product launch</li>
                </ul>
            </div>
        </Col>
        
    </React.Fragment>
    //     <React.Fragment>
    //     <Col lg={6}>
          
    //     </Col>
        
    //     <Col lg={6}>
          
    //       </Col>
    //   </React.Fragment>
  )
}

export default AddJobTitle
