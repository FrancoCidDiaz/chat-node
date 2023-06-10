import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import '../styles/Register.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { loginRoute } from '../../utils/ApiRoutes'
import '../styles/Login.css'

const Login = () => {
  
  const [values, setValues] = useState({
    username:"",
    email:""
  })

  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault()
    if(handleValidation()){
      console.log("in validation", loginRoute)
      const {username, password } = values
      const { data } = await axios.post(loginRoute,{
        username, password
      })
      if(data.status === false){
        toast(data.msg, toastOptions)
        console.log(data.msg)
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
    const {username, password} = values
    if (username == "" || password == "") {
      toast("Username and Password are required.", toastOptions);
      return false;
    }
    if(password == ""){
      toast("Password is required", toastOptions)
      console.log("password is required")
      return false
    }
    else if(username == ""){
      toast("Username is required", toastOptions)
      console.log("user is required")
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
        type="password" 
        placeholder='Password' 
        name='password' 
        onChange={(e => handleChange(e))} />     
       <button type='submit'>Login</button>
       <span>Don't have an acount? <Link to="/register">REGISTER</Link></span>
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

  
`

export default Login