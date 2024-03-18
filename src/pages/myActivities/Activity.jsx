import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import MyJobPosts from './MyJobPosts'
import MyWorks from './MyWorks'
import './activity.css'

function Activity() {

    const [currentComponent, setCurrentComponent] = useState(0) /* Assume 0 for job posts, and 1 for works */

    const handleComponent = ()=>{

    }

  return (
    <React.Fragment>
      <Container>

        <div className='d-flex shadow tab-header border mt-5'>
            <div className= {`tab-option
                                ${
                                    currentComponent === 0 ? 'text-dark bg-light': 'text-light '
                                }`}  
                onClick={()=> setCurrentComponent(0)}
            >
                <p className='m-0 px-3 py-2'>My Job Posts</p>
            </div>
            
            <div className= {`tab-option
                                ${
                                    currentComponent === 1 ? 'text-dark bg-light': 'text-light '
                                }`}  
                onClick={()=> setCurrentComponent(1)}
            >
                <p className='m-0 px-3 py-2'>My Works</p>
            </div>

        </div>

        <div className='mt-5'>
            
            {
                currentComponent === 0 ?
                <>
                    <h1>My Job Posts</h1>
                    {/* My Job Posts */}
                    <div className=''>
                        <MyJobPosts/>
                    </div>
                </>:
            
                <>
                    <h1>My Works</h1>
                    {/* My Works */}
                    <div>
                        <MyWorks/>
                    </div>
                </>
            }
            
        </div>


      </Container>
    </React.Fragment>
  )
}

export default Activity
