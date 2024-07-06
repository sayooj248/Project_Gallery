import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context Api/Authcontext';
import { useContext } from 'react';

function Header({status}) {

  const{AuthStatus,setAuthStatus}=useContext(TokenAuthContext)
const navigate=useNavigate()

const handleLogout=()=>{
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('username')
  navigate('/')
  setAuthStatus(false)

}

  return (
  <>

<Navbar className="bg-body-tertiary">
        <Container className='d-flex justfy-content-between'>
          <Navbar.Brand href="#home">
          <i className="fa-solid fa-diagram-project fa-xl" style={{color:"#487cd5"}}></i>
            
          {' '}
         PROJECT GALLERY
          </Navbar.Brand>
          <div>
            {!status &&
         
            <button className='btn btn-outline-danger'onClick={handleLogout} >
            <i className="fa-solid fa-right-from-bracket"></i>
              Logout
            </button>
               }
          </div>
        </Container>
      </Navbar>
  
  </>
  )
}

export default Header