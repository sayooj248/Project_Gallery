import {createContext,useState} from "react";

export const addProjectsResponseContext = createContext()
export const editProjectsResponseContext =createContext()

function Contextapi({children}){
    const [addProjectsResponse,setaddProjectsResponse]=useState("")
    const [editProjectsResponse,setEditProjectsRespones]=useState("")
    return(
        <>
        <addProjectsResponseContext.Provider value={{addProjectsResponse,setaddProjectsResponse}}>
        <editProjectsResponseContext.Provider value={{editProjectsResponse,setEditProjectsRespones}}>
             {children}
             </editProjectsResponseContext.Provider>
        </addProjectsResponseContext.Provider>
        
        </>
    )
}

export default Contextapi