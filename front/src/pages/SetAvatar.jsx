import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { setAvatarRoute } from '../../utils/ApiRoutes'
import loader from '../assets/loader.gif'

const SetAvatar = () => {

const api = "https://api.multiavatar.com/90823904"

  return (
    <div>SetAvatar
    <ToastContainer/>
    
    
    <ToastContainer/>    
    </div>
  )
}

export default SetAvatar