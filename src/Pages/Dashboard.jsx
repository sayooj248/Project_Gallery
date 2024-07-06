import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from './Add'
import Edit from './Edit'
import Profile from '../Components/Profile'
import { userprojects } from '../Services/Allapi'
import { addProjectsResponseContext } from '../Context Api/ContextApi'
import { editProjectsResponseContext } from '../Context Api/ContextApi'
import { toast } from 'react-toastify'
import { Deleteproject } from '../Services/Allapi'


function Dashboard() {
  const {addProjectsResponse,setaddProjectsResponse}=useContext(addProjectsResponseContext)
  const {editProjectsResponse,setEditProjectsRespones}=useContext(editProjectsResponseContext)
  const [user, setuser] = useState("")
  const [projects, setprojets] = useState([])

  useEffect(() => {
    setuser(sessionStorage.getItem("username"))
    getData()
  }, [addProjectsResponse,editProjectsResponse])

  console.log(projects);

  const getData = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
    const result = await userprojects(header)
    console.log(result);
    if (result.status == 200) {
      setprojets(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }

  const handledelete=async(id)=>{
    const token=sessionStorage.getItem("token")
    console.log(id);
               const header={
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
               }
               const result=await Deleteproject(id,header)
               if(result.status==200){
                toast.success("project delete successfully")
                getData()
                
               }
                 else{
                  console.log(result);
                  toast.error(result.response.data)
                 }

  }

  return (
    <>
      <Header />
      <div>
        <div className='p-5'>
          <h1>welcome : <span style={{ color: "red" }}>{user} </span></h1>
        </div>
        <Row>
          <Col onSubmit={12} onMouseDown={8} >
            <h3>Your Projects</h3>
            <Add />
            {
              projects.length > 0 ?
                projects.map(item => (
                  <div className='border border-3 p-4'>

                    <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded'>
                      <h4>{item.title}</h4>
                      <div>
                        <a href={item.github} className='btn me-3'>
                          <i className='fa-brands fa-github fa-2xl' />
                        </a>
                        <Edit  project={item}/>
                        <button className='btn me-3' onClick={()=>{handledelete(item?._id)}}>
                          <i className='fa-solid fa-trash fa-xl' style={{ color: 'red' }} />
                        </button>
                      </div>
                    </div>
                    </div>

                    ))
                    :
                    <h3 className=' text-center '> No Projects Available</h3>
                     
                   }

         </Col>
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>


      </div>


    </>
  )
}

export default Dashboard