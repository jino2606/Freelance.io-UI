import React from 'react'
import Avatar from './Avatar'
import { BASE_URL } from '../../services/baseUrl'

function UserAvatar({userData, heightxwidth, fontSize}) {
  return (
    <div className='position-relative rounded-circle bg-primary border border-light-4 border-4 d-flex justify-content-center align-items-center overflow-hidden' style={{height: `${heightxwidth}rem`, width: `${heightxwidth}rem`}}>
        {   
            userData?.profileImg?.length>0?
            <img src={`${BASE_URL}/uploads/${userData.profileImg[0].filename}`} alt="" className='w-100 object-fit-cover position-center' />:

            /* If no User Image then just initials */
            <Avatar fontWeight={'200'} fontSize={fontSize} userData={userData}/>
        }
    </div >
  )
}

export default UserAvatar
