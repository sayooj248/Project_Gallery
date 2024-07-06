import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { allprojects } from '../Services/Allapi'

function Projects() {
  
 
  const [projects, setprojets] = useState([])
  const [logstatus, setlogstatus] = useState([])
  const [search,setsearch]=useState("")

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getData()
      setlogstatus(true)
    }
    else {
      console.log("login first");
      setlogstatus(false)
    }

  }, [search])
  console.log(projects);

  const getData = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
    const result = await allprojects(header,search)
    console.log(result);
    if (result.status == 200) {
      setprojets(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }

  return (
    <>
      <Header status={true} />

      <div className='p-5'>
        <div  className='d-flex justify-content-between my-4'>
        <h1>All Projects</h1>
        <input className='form-control w-25' type="text" name='' onChange={(e)=>{setsearch(e.target.value)}}  placeholder='Enter Language For Project Search' id=''/>
        </div>
        {
          logstatus ?
            <Row>
              {
                projects.length > 0 ?
                  projects.map(item => (
                    <Col>
                      <ProjectCard project={item} />
                    </Col>
                  ))
                  :
                  <h2 className='text-danger text-center'> No Projects </h2>
              }

            </Row>
            :
            <h1 className='text-center text-warning'> Please Login First</h1>
        
      }
      </div>

    </>
  )
}

export default Projects