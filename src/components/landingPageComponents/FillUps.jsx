import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

import Filler from '../../assets/images/userExperience.jpg'

function FillUps() {
  return (

    <Container style={{marginTop: '6em', marginBottom: '6em'}} className='rounded-4 shadow-lg p-5'>
        <Row>
            <Col md={6} className=''>
                <Image src={Filler} className='w-100 h-100'/>
            </Col>
    
            <Col md={6} className=''>
                <p className='headLine' style={{fontWeight: '700', fontSize: '45px'}}>Join the Movement - Your <span>Freelancing Revolution</span></p>
    
                <p className='subtext' style={{fontWeight: '400', fontSize: '15px'}}>Much like Macron's En Marche! movement defied traditional politics, [Your Freelancing Platform] challenges the norm in the freelancing industry.</p>

                <p className='subtext' style={{fontWeight: '400', fontSize: '18px'}}><strong>Essentials:</strong>Lay the foundation for your freelancing success with all the basics tailored for businesses just getting started.</p>

                <p className='subtext' style={{fontWeight: '400', fontSize: '18px'}}><strong>Premium:</strong>Elevate your freelancing experience with premium features designed to boost your visibility and enhance your project outcomes.</p>

                <p className='subtext' style={{fontWeight: '400', fontSize: '18px'}}><strong>Standard:</strong>Strike the perfect balance with standard offerings that cater to the essentials while providing a comprehensive freelancing experience.</p>
            </Col>
        </Row>
    </Container>
  )
}

export default FillUps
