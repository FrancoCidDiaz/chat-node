import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { setAvatarRoute } from '../../utils/ApiRoutes'
import loader from '../assets/loader.gif'


const SetAvatar = () => {

const api = "https://api.multiavatar.com/"

const navigate = useNavigate()

const [avatars, setAvatars] = useState([])
const [isLoading, setIsLoading] = useState(true)
const [selectedAvatar, setSelectedAvatar] = useState(undefined)

const toastOptions = {
  position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"
}

useEffect(() => {
  const fetchData = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.round(Math.random() * 2723);
      const image = await axios.get(`${api}/${randomNumber}`);
      data.push(image.data);
    }
    setAvatars(data);
    setIsLoading(false);
    console.log(avatars)
  };

  fetchData();
}, []);


  return (
    <div>
    <ToastContainer/>
    <h1>Pick an avatar as your profile picture</h1>
      <div className="avatars">
      {avatars.map((avatar, index) => (
          <div className="avatar" key={index}>
            <img src={avatar} alt={`Avatar ${index}`} />
            
          </div>
        ))}
      </div>
    <ToastContainer/>    
    </div>
  )
}

export default SetAvatar