import React, { useEffect, useState } from 'react'
import {Row,Col} from'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeprojects } from '../Services/Allapi'

function Landing() {
  
  const [token,settoken] =useState("")
  const[projects,setprojects]=useState([])
  useEffect(()=>{
    settoken(sessionStorage.getItem("token"))
    gethomeprojects()
  },[])

  const gethomeprojects=async()=>{
    const result=await homeprojects()
    if(result.status==200){
      setprojects(result.data)
    }
    else{
      console.log(result.response.data);
    }
  }
         console.log(projects);
     
  return (
<>
<div className='w-100 p-5 align-items-center d-flex' style={{height:'100vh' ,backgroundColor:'rgb(20,137,247)'}}>
    <Row>
        <Col className='align-items-center d-flex'>
            <div>
                <h1 className='display-4 mb-2 text-light'>PROJECT GALLERY</h1>
                <p style={{textAlign:'justify'}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ullam optio voluptatum necessitatibus ut ipsa Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, nemo! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam error blanditiis aut exercitationem voluptate amet.</p>
                  
                  {
                    token?
                    <Link className='btn btn-warning' to={'/dash'}>Manage Your Pojects</Link>
                    :
                    <Link className='btn btn-success' to={'/Auth'}>Start to Explore</Link>
                  }
               
            </div>
        </Col>
        <Col>
        <img className='img-fluid  d-flex' style={{height:'550px'}} src="https://assets-global.website-files.com/5ebd2ee83335b3b50dcf8f08/5f8fea6a4a32a9c98b4265aa_accessibility-anchor-refined-2-6.png" alt="" />
        </Col>
        </Row>
    </div>
      <div className='p-5 w-100'>
        <h2 className='text-center mt-4 mb-3'>Project For You...</h2>

        <marquee behavior="" direction="">
          <div className='d-flex justify-content-evenly mt-2'>
          
          {
            projects.length>0 ?
            projects.map(item=>(
              <ProjectCard project={item}/>
            ))
            :
            <h5>No projects available</h5>

          }
        
          </div>
        </marquee>
      </div>

      <div  className='text-center'>
        <Link to={'/projects'}>click For More..</Link>

      </div>

     
</>
  )
}

export default Landing