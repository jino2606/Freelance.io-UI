import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getSkillsData } from './addJobsApis'

function AddJobSkills({formData, setFormData}) {

    const [inputText, setInputText] = useState("")
    
    /* the handle search is incoomplete now the api is not workking so */
    const handleSearch = (e)=>{
        setInputText(e.target.value)

        const result = getSkillsData(inputText)
        

        // if (result.data){
        //     setSkills(prevSkills => [...prevSkills, inputText])
        // }

    }

    /* To add the typed data to the list */
    const handleAdd = (e)=>{

        // Create a new array by spreading the existing jobSkills array and appending the inputText
        const newJobSkills = [...formData.jobSkills, inputText];

        // Update the formData state with the new jobSkills array
        setFormData({...formData, jobSkills: newJobSkills});

        setInputText("")
    }

    /* To remoove from the list if the user clicks remove*/
    const handleRemove = (itemToRemove)=>{
        setFormData({...formData, jobSkills: formData.jobSkills.filter(item => item !== itemToRemove)})
    }

    console.log("fefsg neew", formData.jobSkills);


  return (
    <React.Fragment>

        <Col lg={5} className='p-5'>
            <h1>What are the main skills required for your work?</h1>

            <p>This helps your job post stand out to the right candidates.</p>
        </Col>

        <Col lg={5} className='p-5'>
            <Form.Label><h4>Add Skills</h4></Form.Label>
            <Form.Control type="text" onChange={handleSearch} value={inputText&&inputText}/>

            <div className='mt-4'>
                <p><strong>Example Titles</strong></p>
                <ul>
                    <li>HTML, CSS, JavaScript, ReactJS,...</li>
                    <li>Adobe PhotoShop, Adobe Illustrator, Figma,...</li>
                    <li>Communication Skills, Quick Learner,...</li>
                </ul>
            </div>

            <Row className='mb-3'>
                    {
                        formData.jobSkills?.length>0 &&
                        <Col className='p-3 border border-1 rounded'>
                            <p>Selected skills</p>
                        {
                            formData.jobSkills.map(item =>(
                                <Button key={item} variant="success" className='rounded-pill me-2' onClick={() => handleRemove(item)} >
                                    {item} <span className='ms-2'><i class="fa-solid fa-minus"></i></span>
                                </Button>
                            ))
                        }
                        </Col>

                    }
            </Row>

            <Row>
                {  
                    inputText&&
                    <Col className='p-3 border border-1 rounded'>

                    
                        <Button variant="outline-success" size="lg" className='rounded-pill' onClick={handleAdd}>
                            {inputText} <span className='ms-2'><i class="fa-solid fa-plus"></i></span>
                        </Button>
                    </Col>
                }
                
            </Row>


        </Col>


        
    </React.Fragment>
  )
}

export default AddJobSkills
