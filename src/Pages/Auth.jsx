import React, { useContext } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row,Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import  { toast,ToastContainer } from 'react-toastify';
import { userRegister, userlogin } from '../Services/Allapi';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context Api/Authcontext';


function Auth() {
    
  const {AuthStatus,setAuthStatus}=useContext(TokenAuthContext)
    const [status ,setstatus]=useState(true)
    const[data, setdata]=useState({
      username:"",password:"",email:""
    })
    // console.log(data);
    const navigate=useNavigate()

    const changeStatus=()=>{
        setstatus(!status)
    }

    const handleRegister=async()=>{
      console.log(data);
      const {username,password,email}=data
      if ( !username || !password || !email){
        toast.warning("invalid .....enter correct")
      }
      else{
        const result=await userRegister(data)
        console.log(result);
        if(result.status==201){
          toast.success("user regiser is successfull")
          setdata({username:"",password:"",email:""})
          setstatus(true)
        }
        else{
          toast.error(result.response.data)
        }
        

    }
  }

  const handleLogin=async()=>{
    const {email,password}=data
    if(!email || !password){
      toast.warning("invaild Detaills!!!!")
    }
    else{
      const result=await userlogin({email,password})
      console.log(result);
      if(result.status==200){
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("username",result.data.user)
      sessionStorage.setItem("userDetails",JSON.stringify(result.data.userDetails))
      toast.success("Login successfull!!!")
      navigate('/')
      setAuthStatus(true)
    }
    else{
      toast.error(result.response.data)
    }
  }
  }


  return (
    <>
      <div className='d-flex w-100 justify-content-center align-items-center ' style={{height:'100vh'}}> 
    <div className='shadow border w-50 p-4'>
        <Row>
            <Col sm={12} md={6} >
                <img src="https://www.sehat.com/sht-new-img/new/login-new.png"  className='img-fluid' alt="" />
            </Col>
            <Col  sm={12} md={6}>
                 {
                    status ?
                    <h3>Login</h3>
                    :
                    <h3>Register</h3>
                 }
            
                <div className='mt-4'>
                    {
                        !status&&

                        <FloatingLabel controlId="floatingInput" label="User Name" className="mb-3">
                   <Form.Control type="email" placeholder="User Name" onChange={(e)=>{setdata({...data,username:e.target.value})}} />
                 </FloatingLabel>
                    }
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                   <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>{setdata({...data,email:e.target.value})}} />
                 </FloatingLabel>
               <FloatingLabel controlId="floatingPassword" label="Password">
                   <Form.Control type="password" placeholder="Password" onChange={(e)=>{setdata({...data,password:e.target.value})}} />
                </FloatingLabel>
                </div>
                <div className='d-flex justfy-content-between mt-3'>
                    {
                    status ?
                  <button className='btn btn-info' onClick={handleLogin}>
                  <span>Login</span>
                  </button>
                    :
                   <button className='btn btn-info' onClick={handleRegister}>
                 <span> Register</span>
                 </button>
                 }
                    <button className='btn btn-link' onClick={changeStatus}>
                    {
                    status ?
                    
                  <span>Are you new</span>
                    :
                 <span> Alreday a user</span>
                 }
                    </button>
                </div>
           

         </Col>
        </Row>


    </div>

    </div>
    <ToastContainer/>
    </>
  )
}

export default Auth