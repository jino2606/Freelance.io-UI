import React, {createContext, useState } from 'react'

/* to create context api we use - createContext() */
export const isAuthTokenContext = createContext()

function ContextShare({children}){
    /* chindren is a predefinedprops used to share data between all components */

    /* create data that need to be shared */
    const [isAuthToken, setIsAuthToken] = useState(false)

  return (
    <>
      <isAuthTokenContext.Provider value={{isAuthToken, setIsAuthToken}}>
        {children}
      </isAuthTokenContext.Provider>
    </>
  )
}

export default ContextShare
