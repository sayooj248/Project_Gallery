import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; 
import {Row,Col} from'react-bootstrap'
import server_url from '../Services/Server_url'

function ProjectCard({project}) {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    
    <Card style={{ width: '18rem',  }}>
      <Card.Img  style={{height:"180px"}} onClick={handleShow}  variant="top" src={project.image?`${server_url}/Uploads/${project.image}`:"https://th.bing.com/th/id/OIP.KoKk_vYZW-dFP-YSdRSOZwHaEo?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}/>
      <Card.Body>
        <Card.Title className=' justify-content-center d-flex ' >{project.title}</Card.Title>
      </Card.Body>
    </Card>


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row>
            <Col>
              <img className='img-fluid' src={project.image?`${server_url}/Uploads/${project.image}`:"https://th.bing.com/th/id/OIP.KoKk_vYZW-dFP-YSdRSOZwHaEo?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}  alt="" />
            </Col>
            <Col>
              <h4>{project.title} </h4>
              <p>{project.overview}</p>
              <h6>{project.languages}</h6>
              <div className='mt-3 p-3 d-flex justify-content-between'>
                <a href={project.github}>
                <i className="fa-brands fa-github fa-xl"></i>
                </a>
                <a href={project.demo}>
                <i className="fa-solid fa-link fa-xl"></i>
                </a>

              </div>
            </Col>
         </Row>
        </Modal.Body>
      </Modal>
    
    </>
  )
}

export default ProjectCard