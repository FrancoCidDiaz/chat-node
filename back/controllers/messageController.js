import messageModel from "../model/messageModel.js";
import Messages from "../model/messageModel.js";

export const addMessages = async(req, res, next) => {
  try {
    const { from, to , message } = req.body
    const data = await Messages.create({
        message: {text: message},
        users: [from, to],
        sender: from
    })
    if(data) return res.json({ msg: "Message added succesfully" })
    return res.json({ msg: "Failed to add message"})
  } catch (ex) {
      next(ex)
  }
}

export const getMessages = async(req, res, next) => {
    try {
      const { from, to } = req.body  
      const messages = await messageModel.find({
        users: {
            $all: [from, to]
        },
      }).sort({ updatedAt: 1 }) 
      console.log(messages)
      const projectMessages = messages.map((msg) => {
        return {
            fromSelf: msg.send && msg.send.toString() === from, 
            message: msg.message.text,
            from: msg.sender
            
        }
      })
     
      res.json(projectMessages)
    } catch (ex) {
        console.log(ex)  
    }

}