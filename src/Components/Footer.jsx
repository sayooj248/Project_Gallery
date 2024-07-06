import React from 'react'
import {Row,Col}from'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
 <>
 <div className='p-5 w-100 bg-dark'>
  <Row>
    <Col>
    <h3 className='text-light '>Project Fair 2024</h3>
    <p style={{textAlign:'justify'}} className='text-light'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint facere odit deserunt explicabo id quae, doloremque vero veritatis ipsa non laudantium et saepe aperiam aliquid. </p>
    </Col>

    <Col className='d-flex flex-column align-items-center'>
     <h3 className='text-light'>Links</h3>
      <Link to={'/'}>Landing</Link>
      <Link to={'/login'}>Login</Link>
      <Link to={'/Auth'}>Auth</Link>
    </Col>

    <Col className='d-flex flex-column align-items-center'>
      <h3 className='text-light'>Referances</h3>
      <a href=" ">React</a>
      <a href="">React Bootstrap</a>
    </Col>
  </Row>

  <div className='text-light mt-3'>
        <h6 className='text-center'>Project Fair 2024 &copy; All rights reserved</h6>
      </div>
    
 </div>



 </>
  )
}

export default Footer