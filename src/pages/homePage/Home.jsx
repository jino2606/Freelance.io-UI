import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import GigsCard from '../../components/homePageComponents/GigsCard'
import { Link } from 'react-router-dom'
import GigsSection from '../../components/homePageComponents/GigsSection'


function Home() {

    const [userName, setUserName] = useState("")

    const getCurrentUser = ()=>{
        if (sessionStorage.getItem("loggedInUser")){
            const currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
            setUserName(currentUser.username)
        }
    }

    useEffect(()=>{
        getCurrentUser()
    })

    return (
        <React.Fragment>

            {/* Top section Cards */}
            <Container className='mt-5'>

                <h1>Hello <span className='text-danger'> {userName}</span> </h1>

                {/* Searcch */}
                <InputGroup className="my-4">
                    <Form.Control
                    placeholder="Seacrh Any Job, User, Posts,..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        Search
                    </Button>
                </InputGroup>

                <Row className='my-5'>
                    {/* <Col lg={6} className='d-flex justify-content-end'>
                        <Card style={{ width: '20rem', cursor: 'pointer' }} className='border-0 shadow p-3'>
                            <Card.Body>
                                <Row>
                                    <Col sm={10}>
                                        <Card.Title>Search Jobs <span className='ms-2'><i class="fa-solid fa-magnifying-glass"></i></span></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                        <Card.Text>
                                            Discover opportunities! Click to explore job listings matching your skills and interests.
                                        </Card.Text>
                                    </Col>
                                    <Col className='p-0 d-flex justify-content-end align-items-center'>
                                        <i class="fa-solid fa-angle-right fa-2x"></i>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col> */}

                    <Col >
                        <Link to={'/jobs/addjobs'} style={{ textDecoration: 'none' }}>
                            <Card style={{ cursor: 'pointer' }} className='rounded border-4 shadow p-3'>
                                <Card.Body>
                                    <Row>
                                        <Col sm={10}>
                                            <Card.Title>Post Jobs <span className='ms-2'><i class="fa-solid fa-arrow-up-from-bracket"></i></span></Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Post any job</Card.Subtitle>
                                            <Card.Text>
                                                Ready to hire? Share your job opening with our community. Post your job in just a few clicks!
                                            </Card.Text>
                                            {/* <Card.Link href="#">Card Link</Card.Link>
                                            <Card.Link href="#">Another Link</Card.Link> */}
                                        </Col>
    
                                        <Col className='p-0 d-flex justify-content-end align-items-center'>
                                            <i class="fa-solid fa-angle-right fa-2x"></i>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>

                <h2>Most Popular Gigs Today</h2>
                {/* This the gigigs section */}
                <GigsSection/>

                
            </Container>

            

        </React.Fragment>
    )
}

export default Home
