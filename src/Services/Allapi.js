import { commonApi } from "./CommonApi";
import base_url from "./Server_url";

//register

export const userRegister=async(data)=>{
    return await commonApi("POST",`${base_url}/register`,data,"")
}

//login

export const userlogin=async(data)=>{
    return await commonApi("POST",`${base_url}/login`,data,"")
}

//addprojects
export const addprojects=async(data,header)=>{
    return await commonApi("POST",`${base_url}/addproject`,data,header)
}
// home projects
export const homeprojects=async()=>{
    return await commonApi('GET',`${base_url}/homeprojects`,"","")
}

// all projects
export const allprojects=async(header,search)=>{
    return await commonApi('GET',`${base_url}/allprojects?search=${search}`,"",header)
}

//user projects
export const userprojects=async(header)=>{
    return await commonApi('GET',`${base_url}/userprojects`,"",header)
}

// edit projects
export const editprojects=async(id,data,header)=>{
    return await commonApi('PUT',`${base_url}/editprojects/${id}`,data,header)
}

//delete projects
export const Deleteproject=async(id,header)=>{
    return await commonApi('DELETE',`${base_url}/Deleteproject/${id}`,{},header)
}


//update profile
export const updateprofile =async(data,header)=>{
    return await commonApi('PUT',`${base_url}/profileupdate`,data,header)
}


