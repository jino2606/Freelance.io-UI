import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import GigsCard from './GigsCard'
import { getJobPosts } from '../../pages/homePage/getPostsSlice'
import { useDispatch, useSelector } from 'react-redux'

function GigsSection() {

    const dispatch = useDispatch()

    const token = sessionStorage.getItem('token')

    const [projects, setProjects] = useState([])
  
    var reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` /* send token back as authorization */
    }

    const {response, loading, error} = useSelector((state) => state.jobPostReducer)
        // console.log(result);

    // const jobPosts = async()=>{
    //     const result = await getJobPosts(reqHeader)
    //     setProjects(result.data)
    //   }

    useEffect(()=>{
        // jobPosts() /* call jobposts function to load all the posts from the users */
        dispatch(getJobPosts(reqHeader))
    }, [])

if(loading){
    return (
        <div className='d-flex align-items-center justify-content-center' style={{height: '85vh'}}>
        <Spinner animation="border" style={{width: '5em', height: '5em', color: 'white'}}/>
        </div>
    );
}
else{
    return (
        <React.Fragment>
            <Row xs={1} md={3} className='mt-4'>

            {   
                response?.length>0 &&
    
                response?.map((data)=>(
                    <Col className='mb-4'>
                        <GigsCard jobPostData={data}/>
                    </Col>
                ))

            }

            </Row>

        </React.Fragment>
        )
    }
}

export default GigsSection
