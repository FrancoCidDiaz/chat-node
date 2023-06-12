import React from 'react'
import { useState } from 'react';
import Picker from 'emoji-picker-react'
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({handleSendMsg}) => {

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

     
    return (
        <div>
            <form className='form-chat' onSubmit={(event) => sendChat(event)}>
                {/* <div className="emoji"><BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}</div> */}
                <input className='input-chat' type="text"  placeholder='type your message here'  onChange={(e) => setMsg(e.target.value)}
          value={msg}/>
                 <button type='submit'><IoMdSend/></button>

            </form>
        </div>
    )
}

export default ChatInput