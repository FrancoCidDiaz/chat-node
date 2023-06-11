import React from 'react'
import { useState, useEffect } from 'react'
import { getUser, getAllUsers } from '../../utils/ApiRoutes'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import loader from '../assets/loader.gif'
import Robot from '../assets/robot.gif'
import ChatInput from '../components/ChatInput'
import Messages from '../components/Messages'


const Chat = () => {
   
  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const storedUser = localStorage.getItem("chat-app-user");
  const userId = storedUser ? JSON.parse(storedUser)._id : "";
  const userEmail = storedUser ? JSON.parse(storedUser).email : ""
  const userUsername = storedUser ? JSON.parse(storedUser).username : ""
  const [welcome, setwelcome] = useState(true)
  const [user, setUser] = useState({
    id: userId,
    email: userEmail,
    username: userUsername
  })

  //  useEffect(() => {
     
  //    const fetchUser = async () => {

  //     try {
  //       const response = await axios.get(`${getUser.replace(':id', user.id)}`);
  //       const userData = response.data;        
  //       setUser(userData)
       

  //     } catch (error) {
  //        console.log(error)
  //     }
      
  //    }

     
  //    fetchUser()
  //   console.log(user)
  //  }, [])

   useEffect(() => {
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
     }
    const fetchUsers = async () => {

     try {
       const response = await axios.get(getAllUsers);
       const usersData = response.data;
       //console.log(usersData)
       setContacts(usersData.users)
      
      

     } catch (error) {
        console.log(error)
     }
     
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);


    fetchUsers()
   
  }, [])
  

  const changeCurrentChat = (index, contact) => {
    setCurrentChat(contact)
    setwelcome(false)
    
  }

  if(isLoading) {
    return (
      <div className='chat-container'>
        <img src={loader} alt="" />
      </div>
    )
  }

  const logout = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login")
  }

  return (
    <div className='chat-container'>
      <div onClick={logout} className='logout'>Logout</div>
      <div className='container-chat'>
        <div className='contacts-menu'>
          {contacts.map((contact, index) => (
         <div onClick={() => changeCurrentChat(index, contact.username)} className={`contact ${contact.username === currentChat ? "contact-selected" : ""}`} key={index}>{contact.username}</div>   
        ))}</div> 
        <div className="">
                       
          {welcome &&  <div> 
            <img src={Robot} alt="" />
            <h1>Welcome! <p className='user'>{user.username}</p></h1>
            <p>Please select a chat to Start Messaging</p>
            </div>}
            {!welcome && <div className='chat-menu'>
              <div className='current-chat'>{currentChat}</div> 
              <Messages/>
              <ChatInput/>
              </div>} 
           
        </div>          
      </div>
    </div>
  )
}

export default Chat