import React from 'react'
import './landingPage.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import BannerImage from '../../assets/images/banner-img.png'
import PopularServices from '../../components/landingPageComponents/PopularServices'
import HeaderNav from '../../components/header/HeaderNav'
import FillUps from '../../components/landingPageComponents/FillUps'
import FAQ from '../../components/landingPageComponents/FAQ'
import Header from '../../components/header/Header'

function LandingPage() {
  return (
<>

      <Container fluid className='landing-banner pb-5'>

        <Header />
        {/* <HeaderNav /> */}
        
        <Container className='pt-5 pb-4'>
        {/* #FFC125 */}
  {/*       
          <div className='row'>
            <div className='col-6'>
              <h1 style={{fontSize: '8em', color: ''}}>THIS IS THE BANNER</h1>
              <button className='button-cust'></button>
            </div>
  
            <div className='col-6'>
  
            </div>
  
          </div> */}
  
          <Row className='mt-5'>
  
            <Col lg={6}>
              <p className='banner-text'>Connect, Create, Collaborate! Post or Find Freelance Gigs Today!</p>
  
                <Form className="d-flex mt-5 search-box shadow">
                  <Form.Control type="search" placeholder="Search for any service..." className="main-search" aria-label="Search" />
                  {/* <Button variant="outline-success">Search</Button> */}
                  <button className='search-button'><i class="fa-solid fa-magnifying-glass"></i></button>
                </Form>
            </Col>
  
            <Col lg={6} className='d-flex justify-content-center'>
              <img style={{width:"388px"}} className='' src={BannerImage} alt="" />
            </Col>
  
          </Row>

          {/* <div className="container mx-auto pt-5 pb-4">
            <div class="flex lg:flex-row flex-col">
              <div class="lg:w-1/2">
                <p class="banner-text">Connect, Create, Collaborate! Post or Find Freelance Gigs Today!</p>

                <form class="flex mt-5 shadow">
                  <input type="search" placeholder="Search for any service..." class="flex-grow p-2 border-r-0 rounded-l" />
                  <button type="submit" class="bg-blue-500 text-white p-2 rounded-r"><i class="fas fa-search"></i></button>
                </form>
              </div>

              <div class="lg:w-1/2 flex justify-center">
                <img style={{width: '388px'}} src={BannerImage} alt="" />
              </div>
            </div>
          </div> */}



          
        </Container>
  
  
      </Container>
          
       {/* Popular Services Section Cards*/}   
      <section>
        <PopularServices />
      </section>

      {/*Some Fillup section*/}   
      <section>
        <FillUps />
      </section>

      {/*Section For FAQ*/}   
      <section className='py-5 mb-5'>
        <FAQ />
      </section>
</>
  )
}

export default LandingPage
