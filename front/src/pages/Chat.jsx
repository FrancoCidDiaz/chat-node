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
  const socket = useRef()
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

  
   

   useEffect(() => {
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
     }
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

  const getUsername = (userId) => {
    const contact = contacts.find((contact) => contact._id === userId);
    return contact ? contact.username : "";
  };

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
  

  const changeCurrentChat = (index, contact) => {
    
    setCurrentChat({
      id: contact._id,
      username: contact.username
    })
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
  
  // useEffect(() => {
  //   if(user) {
  //     socket.current = io(host)
  //     socket.current.emit("add-user", user.id)
  //   }

    
    
  // }, [user])

  const handleSendMsg = async(msg) => {
    console.log("enviado")
    await axios.post(sendMessageRoute,{
      from: userId,
      to: currentChat.id,
      message: msg
    })
    //  socket.current.emit("send.msg", {
    //    to: currentChat.id,
    //    from: user.id,
    //    message: msg
    //  })

    //  const msgs = [...messages]
    //  msgs.push({ fromSelf: true, message: msg })
    //  setMessages(msgs)
  }

  //  useEffect(() => {
  //    if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //        setArrivalMessage({ fromSelf: false, message: msg });
  //      });
  //    }
  //  }, []);

  //  useEffect(() => {
  //    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  //  }, [arrivalMessage]);

  //  useEffect(() => {
  //    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  //  }, [messages]);
 
  console.log(messages)
  return (
    <div className='chat-container'>
      <div onClick={logout} className='logout'>Logout</div>
      <div className='container-chat'>
        { <div className='contacts-menu'>
          {contacts.map((contact, index) => (
         <div onClick={() => changeCurrentChat(index, contact)} className={`contact ${contact.username === currentChat.username ? "contact-selected" : ""}`} key={index}>{contact.username}</div>   
        ))}</div>  }
        <div className="">
                       
          {welcome &&  <div> 
            <img src={Robot} alt="" />
            <h1>Welcome! <p className='user'>{user.username}</p></h1>
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