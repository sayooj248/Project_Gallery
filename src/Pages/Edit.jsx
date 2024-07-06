import React, { useEffect,useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_url from '../Services/Server_url';
import { editprojects } from '../Services/Allapi';
import { toast } from 'react-toastify';
import { editProjectsResponseContext } from '../Context Api/ContextApi';

function Edit({ project }) {
  const {editProjectsResponse,setEditProjectsRespones}=useContext(editProjectsResponseContext)
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setpreview("")
    setprojectsData({
      id: project._id, title: project.title, overview: project.overview, language: project.languages, github: project.github, demo: project.demo, projectimage: ""
    })
  };
  const handleShow = () => setShow(true);

  const [imageStatus, setimageStatus] = useState(false)
  const [preview, setpreview] = useState("")

  const [projectsData, setprojectsData] = useState({
    id: project._id, title: project.title, overview: project.overview, language: project.languages, github: project.github, demo: project.demo, projectimage: ""
  })

  useEffect(() => {
    console.log(projectsData);
    if (projectsData.projectimage.type == "image/jpg" || projectsData.projectimage.type == "image/jpeg" || projectsData.projectimage.type == "image/png") {
      console.log("image is correct Format");
      setimageStatus(false)

      setpreview(URL.createObjectURL(projectsData.projectimage))

    }
    else {
      console.log("image is not correct format!!!  image should be png,jpg,jpeg");
      setimageStatus(true)
      setpreview("")

    }
  }, [projectsData.projectimage])

  const handleupdate = async () => {
    console.log(projectsData);
    const { title, overview, language, github, demo, projectImage } = projectsData
    if (!title || !overview || !language || !github || !demo) {
      toast.warning("invaild inputs!!!  Enter vaild input data in every fields")
    }
    else {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("overview", overview)
      formData.append("language", language)
      formData.append("github", github)
      formData.append("demo", demo)
      preview ? formData.append("image", projectsData.projectimage) : formData.append("image", project.image)

      const token = sessionStorage.getItem("token")
      if (preview) {
        const header = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result =await editprojects(projectsData.id,formData,header)
        if(result.status==200){
          toast.success(`project ${projectsData.title} updated successfully!!`)
          handleClose()
          setEditProjectsRespones(result)
        }
        else{
          toast.warning(result.response.data)
        }
      }

      else {
        const header = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result =await editprojects(projectsData.id,formData,header)
        if(result.status==200){
          toast.success(`project ${projectsData.title} updated successfully!!`)
          handleClose()
          setEditProjectsRespones(result)
        }
        else{
          toast.warning(result.response.data)
        }
      }
    }
  }





  return (
    <>
      <button className='btn me-3' onClick={handleShow}>
        <i className='fa-solid fa-pen-to-square fa-xl' />
      </button>

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
                  <input type="file" name="" onChange={(e) => { setprojectsData({ ...projectsData, projectimage: e.target.files[0] }) }} id="in" style={{ display: 'none' }} />
                  <img className='img-fluid' src={preview ? preview : `${base_url}/uploads/${project.image}`} alt="" />
                </label>
                {
                  imageStatus &&
                  <p className='text-danger'> Invalid file format!! iamge shodld be png,jpg,jpeg</p>
                }
              </Col>
              <Col>
                <FloatingLabel controlId="titleInput" label="title" className="mb-3">
                  <Form.Control type="text" onChange={(e) => { setprojectsData({ ...projectsData, title: e.target.value }) }} value={projectsData.title} placeholder="project title" />
                </FloatingLabel>
                <FloatingLabel controlId="Overviewinpt" label="Overview">
                  <Form.Control type="text" onChange={(e) => { setprojectsData({ ...projectsData, overview: e.target.value }) }} value={projectsData.overview} placeholder="About project" />
                </FloatingLabel>
                <FloatingLabel controlId="languageinpt" label="Languages">
                  <Form.Control type="text" onChange={(e) => { setprojectsData({ ...projectsData, language: e.target.value }) }} value={projectsData.language} placeholder="Languages used" />
                </FloatingLabel>
                <FloatingLabel controlId="Githubinpt" label="Github Url">
                  <Form.Control type="text" onChange={(e) => { setprojectsData({ ...projectsData, github: e.target.value }) }} value={projectsData.github} placeholder="Github Url" />
                </FloatingLabel>

              </Col>

              <FloatingLabel controlId="Demoinpt" label="Demo Url">
                <Form.Control type="text" onChange={(e) => { setprojectsData({ ...projectsData, demo: e.target.value }) }} value={projectsData.demo} placeholder="Demo Url" />
              </FloatingLabel>
            </Row>

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleupdate} variant="success">Update</Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}

export default Edit