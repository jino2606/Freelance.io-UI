import React from 'react'
import UserAvatar from '../../components/avatar/UserAvatar'

export default function ChatBoxReciever({userData, message}) {
    
  return (
    <div style={{display:'flex', justifyContent:'flex-start' , flexDirection:'row'}} >
        <UserAvatar userData={userData} heightxwidth={2.5} fontSize={'1rem'}/>
        <p style={{padding:10 , backgroundColor:'rgb(202, 220, 243)', borderRadius: 10 , maxWidth: "60%" }} >
            <strong style={{fontSize:13}} >
                    {userData?.username} 
            </strong> <br></br>
            {message}
        </p>
    </div>
  )
}

export function ChatBoxSender({userData, message}) {
    return (
      <div style={{display:'flex', paddingRight:10  ,justifyContent:'flex-end' , flexDirection:'row'}} >
          <p style={{padding:10 , backgroundColor:'rgb(240, 240, 240)', borderRadius: 10 , maxWidth: "60%" }} >
              <strong style={{fontSize:13}} >
                      {userData?.username} 
              </strong> <br></br>
              {message}
          </p>
          <UserAvatar userData={userData} heightxwidth={2.5} fontSize={'1rem'}/>
      </div>
    )
  }