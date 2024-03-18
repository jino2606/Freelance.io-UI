import React, { useEffect, useState } from 'react'
import './avatar.css'
import { useSelector } from 'react-redux'

function Avatar({fontWeight, fontSize, userData}) {

    const [initials, setInitials] = useState()
    // const userData = useSelector((state)=> state.sessionReducer)

    const getUserInitials = () => {

      if (userData) {
          const firstLetter = userData.firstname ? userData.firstname[0] : '';
          const lastLetter = userData.lastname ? userData.lastname[0] : '';
          setInitials((firstLetter + lastLetter).toUpperCase());
      }
    };

    useEffect(()=>{
        getUserInitials();
    }, [userData])

  return (
    <>
      <div className='avatar text-white' style={{fontWeight: fontWeight, fontSize: fontSize}}>
        {initials}
      </div>
    </>
  )
}

export default Avatar
