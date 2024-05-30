import React, { createContext } from 'react'


export const VideoContext = createContext()


const ConfrenceContext  = ({children}) => {
    return (
     <VideoContext.Provider>{children}</VideoContext.Provider>
    )
  }
  

export default ConfrenceContext