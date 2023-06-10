import React from 'react'
import { useState, useEffect } from 'react'
import { getUser } from '../../utils/ApiRoutes'
import axios from 'axios'

const Chat = () => {

  const [contacts, setContacts] = useState([])
  const storedUser = localStorage.getItem("chat-app-user");
  const userId = storedUser ? JSON.parse(storedUser)._id : "";

  const [user, setUser] = useState({
    id: userId,
    email: "",
    username: ""
  })

   useEffect(() => {
    
     const fetchUser = async () => {

      try {
        const response = await axios.get(`${getUser.replace(':id', user.id)}`);
        const userData = response.data;
        console.log(userData)
        setUser(userData)
       

      } catch (error) {
         console.log(error)
      }
      
     }

     fetchUser()
    
   }, [])

   
  

  return (
    <div className='chat-container'>
      <div className='container-chat'></div>
    </div>
  )
}

export default Chat