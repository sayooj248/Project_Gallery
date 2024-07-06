import React, { createContext, useEffect, useState } from 'react'


export const TokenAuthContext=createContext()

function Authcontext({children}) {
 
    const [AuthStatus,setAuthStatus]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setAuthStatus(true)
        }
        else{
            setAuthStatus(false)
        }
    },[])

  return (
    <>
    <TokenAuthContext.Provider value={{AuthStatus,setAuthStatus}}>
     {children}
    </TokenAuthContext.Provider>
    </>
  )
}

export default Authcontext