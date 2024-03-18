import React, { useState } from 'react';
import { Container } from 'react-bootstrap'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Thumbs, EffectCoverflow  } from 'swiper/modules';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import ServicesCards from './ServicesCards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow'

function PopularServices() {

  // store swiper instances
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);    

    // store thumbs swiper instance
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // Create a context for all images in the 'images' folder
    const importImages = require.context('../../assets/images/cards', false, /\.(png|jpg|svg)$/);

    // Get an array of all image filenames in the 'images' folder
    const imageFileNames = importImages.keys();

    // Import images and store them in an array
    const images = imageFileNames.map(importImages);

    /* Images Data */
    const imageData = ["AI Artist", "AI Designs", "Video Explainer", "Book Covers", "Data Entry", "Illustration", "Logo Designer", "Product Photography", "SEO", "Social Media Manager", "Translators", "Voice Artists", "WordPress"]

  return (
    <Container className='' style={{marginTop: '6em', marginBottom: '6em'}}>

        <p className='section-heading'>Popular services</p>

        <Swiper
        modules={[Navigation, EffectCoverflow ]}
        spaceBetween={50}
        slidesPerView={5}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        effect='coverflow'
        loop={true}
        navigation={{
            nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev"
        }}
        coverflowEffect={
            {
                rotate: 0,
                stretch: 0,
                depth: 75,
                modifier: 2,
                slideShadows: false
            }
        }
        >
                
            {images.map((image, index) => (
                // <img key={index} src={image.default} alt={`Image ${index}`} />
                <SwiperSlide> <ServicesCards source={image} value={index} data={imageData[index]}/> </SwiperSlide> 
            ))}    


            <div className='slider-controler'>
                <div className='swiper-button-prev slider-arrow'>
                </div>

                <div className='swiper-button-next slider-arrow'>
                </div>
            </div>
        </Swiper>
    </Container>
  )
}

export default PopularServices
