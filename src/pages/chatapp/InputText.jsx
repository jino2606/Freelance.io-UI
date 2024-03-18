import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const styles={
    button: {
      width:'10%' ,
      height:50 ,
      fontWeight:'bold', 
      borderRadius:10 ,
      fontSize:18 ,
      backgroundColor:'#34b7f1',
      borderWidth:0,
      color:'#fff'
    },
    textarea:{ 
       width:'100%' ,
       height:50 ,
       borderRadius:10, 
       borderWidth:0 , 
       padding:10 , 
       fontSize:18
      },
    textContainer:{
      display:"flex", 
      justifyContent:'space-between', 
      alignItems:'center',
      width: 'calc(100% - 430px)',
      transition: 'all 0.35s ease-in-out'
    }
  }

export default function InputText({addMessage, open}) {

    const [message , setMessage] = useState('')

    function addAMessage(){
        addMessage({message})
        setMessage('')
    }

  return (
    <div style={styles.textContainer } className={open?'position-fixed z-3 bottom-0 bg-light':'w-100 position-fixed z-3 bottom-0 bg-light'} >
      <Form.Control minLength={270} as="textarea" placeholder="Write something..." style={styles.textarea} className='me-3 w-100 bg-primary-subtle' value={message} onChange={e => setMessage(e.target.value)}/>
      <button onClick={()=> addAMessage()} style = {styles.button} >
        ENTER
      </button>
    </div>
  )
}
