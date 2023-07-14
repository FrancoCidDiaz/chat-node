import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { getAllUsers, sendMessageRoute, getMessages, host } from '../../utils/ApiRoutes.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import loader from '../assets/loader.gif'
import Robot from '../assets/robot.gif'
import ChatInput from '../components/ChatInput'
import Messages from '../components/Messages'
import { io } from 'socket.io-client'



const Chat = () => {
  const navigate = useNavigate() 
  const socket = io();
  const scrollRef = useRef()
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([])
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [currentChat, setCurrentChat] = useState({
    id: "",
    username: ""
  })
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
  const [responsive, setResponsive] = useState(false)
  const [showResponsiveContacts, setShowResponsiveContacts] = useState(false)
  
  const logout = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login")
  } 

   useEffect(() => {
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
     }
     const screenWidth = window.innerWidth;
     setResponsive(screenWidth <= 700);
    const fetchUsers = async () => {

     try {
       const response = await axios.get(getAllUsers);
       const usersData = response.data;     
       setContacts(usersData.users.filter( userdata => userdata._id !== user.id))
      
      

     } catch (error) {
        console.log(error)
     }
     
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);


    fetchUsers()
    
  }, [])



  const handleSendMsg = async(msg) => {
    console.log("enviado")
    console.log("MSG:", msg)
  
    await axios.post(sendMessageRoute,{
      from: userId,
      to: currentChat.id,  
      message: msg
    }) 
    socket.current = io(host);
    socket.current.on("connect", () => {
      
      console.log(socket.current.id); // x8WIv7-mJelg7on_ALbx
      console.log('DESDE CONNECT DEL FRONT')
    });
    
    if(user) {
      socket.current.emit("add-user", user.id)
    }

    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log("MSG DESDE MSG-RECIEVED", msg)
         setArrivalMessage({ from: currentChat, message: msg });
       });
     }
    
       socket.current.emit("send-msg", {
        to: currentChat.id,
        from: user.id,
        message: msg
        })
        console.log("MSG DESDE SEND-MSG FRONT", msg)

            const msgs = [...messages]
       msgs.push({ from: user.username, message: msg })
      setMessages(msgs)
   }

  

  const getUsername = (userId) => {
    const contact = contacts.find((contact) => contact._id === userId);
    return contact ? contact.username : "";
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
     const getMsgs = async() => {
       const response = await axios.post(getMessages,{
        from: user.id,
        to: currentChat.id
       })       
       setMessages((prevMessages) =>
       response.data.map((message) => ({
         message: message.message,
         from: message.from !== user.id ? getUsername(message.from) : user.username,
       }))
     );
     }

     getMsgs()
     
  }, [currentChat])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  

  const changeCurrentChat = (index, contact) => {
    
    setCurrentChat({
      id: contact._id,
      username: contact.username
    })
    setwelcome(false)
    setShowResponsiveContacts(false)
  }

  if(isLoading) {
    return (
      <div className='chat-container'>
        <img src={loader} alt="" />
      </div>
    )
  }


  return (
    <div className='chat-container'>

      <div className='container-buttons'>
      {responsive &&    
       <button onClick={() => setShowResponsiveContacts(!showResponsiveContacts)} className='contacts-button'>CONTACTS</button>   
       }


        <button onClick={logout} className='logout'>LOGOUT</button> 
      </div>
     
     
      <div className={`container-chat ${showResponsiveContacts ? 'container-chat-responsive' : 'container-chat-responsive'}`}>
        { <div className={`contacts-menu ${showResponsiveContacts && responsive ? 'contacts-menu-full-width' : 'contacts-menu-hidden'}`}>
          {contacts.map((contact, index) => (
         <div onClick={() => changeCurrentChat(index, contact)} className={`contact ${contact.username === currentChat.username ? "contact-selected" : ""}  ${showResponsiveContacts ? '' : 'contacts-hidden'}`} key={index}>{contact.username}</div>   
        ))}</div>  }
        <div className={`${showResponsiveContacts ? 'messages-hidden' : 'messages-full-width'}`}>
                       
          {welcome &&  <div className='container-titulo'> 
            <img className='robot' src={Robot} alt="" />
            <h1 className=''>Welcome! <p className='user'>{user.username}</p></h1>
            <p>Please select a chat to Start Messaging</p>
            </div>}
            {!welcome && <div className='chat-menu'>
              <div className='current-chat'>{currentChat.username}</div> 
              <Messages messages={messages} scrollRef={scrollRef} user={user}/>
              <ChatInput handleSendMsg={handleSendMsg}/>
              </div>} 
           
        </div>          
      </div>
    </div>
  )
}

export default Chat