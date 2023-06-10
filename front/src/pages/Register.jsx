import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import '../styles/Register.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../../utils/ApiRoutes'

const Register = () => {
  
  const [values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault()
    if(handleValidation()){
      console.log("in validation", registerRoute)
      const {username, email, password, confirmPassword} = values
      const { data } = await axios.post(registerRoute,{
        username, email, password
      })
      if(data.status === false){
        toast(data.msg, toastOptions)
      }
      if(data.status === true){
        localStorage.setItem("chat-app-user", JSON.stringify(data.user))       
      }
      navigate("/")
    }
  }

  useEffect(() => {
    if(localStorage.getItem("chat-app-user")) navigate("/")
    
  
  }, [])

  const toastOptions = {
    position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
  }
  
  const handleValidation = () => {
    const {username, email, password, confirmPassword} = values
    if(password !== confirmPassword){
      toast("Password and confirm pasword shold be same", toastOptions)
      return false
    }
    else if(username.length < 3){
      toast("Username should be greater than 3 characters", toastOptions)
    return false
    }
    else if(password.length < 8){
      toast("Password should be greater than 8 characters", toastOptions)
    return false
    }
    else if (email === ""){
      toast("Email is required", toastOptions)
    return false
    }
    return true 

    

  }
  
  const handleChange = (e) => {
    setValues({...values, [e.target.name]:e.target.value})
  }

  return (
    <div>
      <ToastContainer/>
      <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className='brand'>
          <img className='logo' src={logo}/> 
          <h1>snappy</h1>  
        </div>
        <input 
        type="text" 
        placeholder='Username' 
        name='username' 
        onChange={(e => handleChange(e))} />
          <input 
        type="email" 
        placeholder='Email' 
        name='email' 
        onChange={(e => handleChange(e))} /> 
          <input 
        type="password" 
        placeholder='Password' 
        name='password' 
        onChange={(e => handleChange(e))} /> 
          <input 
        type="password" 
        placeholder='Confirm Password' 
        name='confirmPassword' 
        onChange={(e => handleChange(e))} />    
       <button type='submit'>Create User</button>
       <span>Already have an acount? <Link to="/login">LOGIN</Link></span>
      </form>   
      </FormContainer>
      <ToastContainer/>  
    </div>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324

  }
`

export default Register