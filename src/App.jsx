import { useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import {Routes,Route} from "react-router-dom"
import Landing from './Pages/Landing'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import Projects from './Pages/Projects'
import Footer from './Components/Footer'
import Auth from './Pages/Auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { TokenAuthContext } from './Context Api/Authcontext'



function App() {
  const {AuthStatus,setAuthStatus}=useContext(TokenAuthContext)
  console.log(AuthStatus);
  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/dash' element={AuthStatus ?<Dashboard/>:<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Auth' element={<Auth/>}/>
      <Route path='/projects' element={AuthStatus ?<Projects/>:<Landing/>}/>

    </Routes>
    <Footer/>
    <ToastContainer/>

  
    </>
  )
}

export default App
