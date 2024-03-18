import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import { getReqHeader } from '../../services/updateSession';
import { getChatPreview } from './chatApi';
import UserAvatar from '../../components/avatar/UserAvatar';

function ChatSidebar({userId, isContacted, isOpen, setReceiverId}) {

    const [chatPreviews, setChatPreviews] = useState([]) /* to store the chat previews fro the initial api call */

    const getContactedUserData = async()=>{
        
        const reqHeader = getReqHeader()

        console.log("yhe req headers", reqHeader);
        
        try {
            const response = await getChatPreview(userId, reqHeader);

            console.log("the response", response);
    
            if (response.status === 200) {
                const contactedUsersData = response.data;
                setChatPreviews(response.data)
                console.log("userGrids updated userGrids:", contactedUsersData);
            } else {
                console.error("Failed to update session:", response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while updating session:", error);
        }
    }

    useEffect(()=>{
        getContactedUserData()
    },[isContacted])

    return (
        <>
            <Collapse in={isOpen} dimension="width">
                <div className='position-fixed mt-4' style={{width: '400px', height:'100%'}}>
                    <div className='p-2 d-flex justify-content-between align-items-center'>
                        <h5>All Chats</h5>
        


                        <i class="fa-solid fa-magnifying-glass"></i>
                        
                    </div>
                    <hr />
                    <div style={{ width: '400px' }} className='overflow-y-scroll'>
                        {
                            chatPreviews?.map((item) => (

                                <div id="chatpreview" className='d-flex align-items-center py-2' onClick={() => setReceiverId(item._id)}>
                                    <UserAvatar userData={item} heightxwidth={3.5} fontSize={'1rem'}/>
                                    <p className='m-0 ms-2 fs-3 fw-bold' >{item.username}</p>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </Collapse>

        </>
    )
}

export default ChatSidebar
