import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const Messages = ({ messages, user, scrollRef }) => {
  
  return (
    <div className='messages'>
        {messages.map((message, index) => (
            <div ref={scrollRef} key={uuidv4()} className={`${message.from == user.username ? "mensaje-usuario-actual" : "mensaje-usuario"}  `} >           
            <p>{message.message}</p>
          </div>
        )
        )}
    </div>
  )
}

export default Messages