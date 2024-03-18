import React from 'react'
import { Carousel } from 'react-bootstrap'
import { BASE_URL } from '../../services/baseUrl'
import './imgCaraousel.css'

function ImgCarousel({jobPostData, height}) {
  return (
    <Carousel className='mb-3 rounded overflow-hidden shadow'>
        {
        jobPostData.jobImages &&
        jobPostData.jobImages.map(item =>(
            <Carousel.Item className='w-100'>
                <img style={{height:`${height}`}} src={`${BASE_URL}/uploads/job/posts/${item.filename}`} alt="" className='w-100 carousel-img' />
            </Carousel.Item>
        ))
        }
    </Carousel>
  )
}

export default ImgCarousel
