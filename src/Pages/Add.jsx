import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {  addprojects } from '../Services/Allapi';
import { addProjectsResponseContext } from '../Context Api/ContextApi';




function Add() {
  const {addProjectsResponse,setaddProjectsResponse}=useContext(addProjectsResponseContext)
  console.log(useContext(addProjectsResponseContext));
    const [show, setShow] = useState(false);
    const [preview,setpreview]=useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
     
    const [projectdata,setprojectdata]=useState({
      title:"",overview:"",language:"",github:"",demo:"",projectImage:""
    })

    const [imageStatus,setimageStatus]=useState(false)
    
    useEffect(()=>{
      console.log(projectdata);
      if(projectdata.projectImage.type=="image/jpg" ||projectdata.projectImage.type=="image/jpeg" ||projectdata.projectImage.type=="image/png"){
        console.log("image is correct Format");
        setimageStatus(false)

        setpreview(URL.createObjectURL(projectdata.projectImage))
      }
      else{
        console.log("image is not correct format!!!  image should be png,jpg,jpeg");
        setimageStatus(true)
        setpreview("")
      }
    },[projectdata.projectImage])


    const handleAddProject= async ()=>{
            const { title,overview,language,github,demo,projectImage}=projectdata
            if(!title || !overview || !language || !github || !demo || !projectImage){
              toast.warning("invaild inputs!!!  Enter vaild input data in every fields")
            }
            else{
              const formData=new FormData()
              formData.append("title",title)
              formData.append("overview",overview)
              formData.append("language",language)
              formData.append("github",github)
              formData.append("demo",demo)
              formData.append("image",projectImage)
                    
               const token=sessionStorage.getItem("token")
               const header={
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
               }
               const result=await addprojects(formData,header)
               if(result.status==200){
                toast.success("project added successfully")
                setprojectdata({
                  title:"",overview:"",language:"",github:"",demo:"",projectImage:""
                })
                handleClose()
                setaddProjectsResponse(result)
               }
                 else{
                  toast.error(result.response.data)
                 }
                 
              
            }
            
    }


    

  return (
    <>
     <div style={{backgroundColor:''}}>
     <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <Row>
                    <Col>
                    <label >
                       <input type="file" onChange={(e)=>{setprojectdata({...projectdata,projectImage:e.target.files[0]})}} style={{display:'none'}} />
                    <img  className='img-fluid' src={preview?preview:"https://th.bing.com/th/id/OIP.MJJpHkk-IEpUmjLwyoA9vgHaHa?rs=1&pid=ImgDetMain"} alt="" />
                    </label>
                    {
                      imageStatus &&
                      <p className='text-danger'>Invalid file format!! iamge shodld be png,jpg,jpeg</p>
                    }
                    </Col>
                    <Col>
                    <FloatingLabel controlId="titleInput" label="title" className="mb-3">
                   <Form.Control type="text" onChange={e=>setprojectdata({...projectdata,title:e.target.value})} placeholder="project title" />
                 </FloatingLabel>
               <FloatingLabel controlId="Overviewinpt" label="Overview">
                   <Form.Control type="text" onChange={e=>setprojectdata({...projectdata,overview:e.target.value})}  placeholder="About project" />
                </FloatingLabel>
                <FloatingLabel controlId="languageinpt" label="Languages">
                   <Form.Control type="text" onChange={e=>setprojectdata({...projectdata,language:e.target.value})}  placeholder="Languages used" />
                </FloatingLabel>
                <FloatingLabel controlId="Githubinpt" label="Github Url">
                   <Form.Control type="text" onChange={e=>setprojectdata({...projectdata,github:e.target.value})}  placeholder="Github Url" />
                </FloatingLabel>
               
                    </Col>

                    <FloatingLabel controlId="Demoinpt" label="Demo Url">
                   <Form.Control type="text"  onChange={e=>setprojectdata({...projectdata,demo:e.target.value})}  placeholder="Demo Url" />
                </FloatingLabel>
                </Row>

            </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddProject}>Save</Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  )
}

export default Add