import React from 'react'
import { useState, useRef } from 'react';
import Picker from 'emoji-picker-react'
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({ handleSendMsg }) => {
    const inputRef = useRef(null);
    const [msg, setMsg] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };


    const handleInputChange = (e) => {
        const input = inputRef.current;
        const content = e.target.value;
        if(content.length > 40){
          input.style.height = '100px';
        }
       
        setMsg(e.target.value)
    };

    return (

        <form className='form-chat' onSubmit={(event) => sendChat(event)}>
            {/* <div className="emoji"><BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}</div> */}
            <input className='input-chat' type="text" placeholder='type your message here' ref={inputRef} onChange={handleInputChange}
                value={msg} />
            <button className='submit' type='submit'><IoMdSend /></button>

        </form>

    )
}

export default ChatInput