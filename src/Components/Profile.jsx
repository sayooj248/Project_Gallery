import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import server_url from '../Services/Server_url'
import { updateprofile } from '../Services/Allapi';
import { toast } from 'react-toastify';

function Profile() {

  const [open,setopen]=useState(false)
  const [preview,setpreview]=useState('')
  const[user,setuser]=useState({
    id:"",username:"",email:"",password:"",github:"",linkdin:"",profile:""
  })

  const [existingprofile,setExistingProfile]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const userDetails=JSON.parse(sessionStorage.getItem('userDetails'))
      setuser({ id:userDetails._id,username:userDetails.username,email:userDetails.email,password:userDetails.password,
        github:userDetails.github,linkdin:userDetails.linkdin,profile:""})

        setExistingProfile(userDetails.profile)
    }

  },[open])
  console.log(user);

  useEffect(()=>{
    if(user.profile){
      setpreview(URL.createObjectURL(user.profile))
    }
    else{
      setpreview("")
    }
  },[user.profile])
  console.log(user);


   const handleprofileupdate=async()=>{
    console.log(user);
    const { username,password,email,github,linkdin,profile} = user
    if (!username || !password || !email || !github || !linkdin ) {
      toast.warning("invaild inputs!!! ")
    }
    else{
      const formData = new FormData()
      formData.append("username", username)
      formData.append("password", password)
      formData.append("email", email)
      formData.append("github", github)
      formData.append("linkdin", linkdin)
      preview ? formData.append("profile", profile):formData.append("profile",existingprofile)

      const header={
        "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
        "content-Type":preview?"multipart/form-data":"application/json"
      }

      const result =await updateprofile(formData,header)
      if(result.status==200){
        console.log(result.data)
        toast.success(`profile updated successfully!!`)
        sessionStorage.setItem("userDetails",JSON.stringify(result.data))
        setopen(!open)
      }
      else{
        toast.warning(result.response.data)
      }

    }
   }


  return (
    <>
    <div className='p-5 border shadow border-3 m-3'>
        <div className='d-flex justify-content-between'>
          <h4>Profile</h4>
          <button className='btn ' onClick={()=>{setopen(!open)}}>
          <i className="fa-solid fa-arrow-down" style={{color: "#63E6BE",}} />
          </button>
        </div>
        {
          open &&
        <div>
            <label >
                <input type="file" name="" id="in" onChange={(e)=>setuser({...user,profile:e.target.files[0]})} style={{display:'none'}} />
                {

                  existingprofile== ""?
                <img className='img-fluid' width={'100px'} src={ preview?preview:"https://png.pngtree.com/png-vector/20191103/ourmid/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"} alt="" />
                :
                < img className='img-fluid' width={'100px'} src={preview?preview:`${server_url}/uploads/${existingprofile}`} alt="" />
 
                 }
            </label>
            <FloatingLabel controlId="UserNameinpt" label="UserName">
                   <Form.Control type="text" placeholder="UserName" value={user?.username} onChange={(e)=>setuser({...user,username:e.target.value})}  />
                </FloatingLabel>
                <FloatingLabel controlId="LinkdIninpt" label="LinkdIn Url">
                   <Form.Control type="text" placeholder="LinkdIn Url" value={user?.linkdin} onChange={(e)=>setuser({...user,linkdin:e.target.value})}  />
                </FloatingLabel>
                <FloatingLabel controlId="Githubinpt" label="Github Link">
                   <Form.Control type="text" placeholder="Github Account Url" value={user?.github} onChange={(e)=>setuser({...user,github:e.target.value})}  />
                </FloatingLabel>
                <div className='d-grid mt-3'>
                  <button className='btn btn-block btn-warning' onClick={handleprofileupdate}> Update</button>

                </div>
        </div>
}
    </div>
    
    
    </>
  )
}

export default Profile