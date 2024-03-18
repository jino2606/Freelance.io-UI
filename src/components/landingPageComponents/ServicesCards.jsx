import React from 'react'
import Card from 'react-bootstrap/Card';
import './landingPageComponents.css'

function ServicesCards({source, value, data}) {
    console.log("FileNAmAs",source.filename);
  return (
    <Card style={{ width: '18rem', height: '18rem', position: 'relative' }} className='shadow'>
        <div
            style={{
                backgroundImage: `url(${source})`,
                backgroundSize: 'cover',
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1, // Ensure the image is behind the content
            }}
            >
        </div>
        <Card.Body
            className='bg-none'
            style={{
                position: 'relative',
                zIndex: 2, // Ensure the text is above the image
            }}
            >
            <Card.Title className='text-white'>{data}</Card.Title>
            <Card.Text className='text-white'>
                Example Text
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default ServicesCards
