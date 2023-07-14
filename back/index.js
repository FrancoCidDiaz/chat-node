import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { Server } from "socket.io";

const app = express()

dotenv.config()

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  };

app.use(cors(corsOptions))
app.use(express.json())



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB CONNECTION SUCCESSFULL")
}).catch((err) => {
    console.log(err.message)
})

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)

const server = app.listen(process.env.PORT, () =>{
    console.log(`SERVER STARTED AT PORT: ${process.env.PORT}`)
})



const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });



  // io.on("connection", (socket) => {
  //   global.chatSocket = socket;
  //   socket.on("add-user", (userId) => {
  //   onlineUsers.set(userId, socket.id);
  //   }
  
    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
      console.log("CONEXION SOCKET EXITOSA CONEXION SOCKET EXITOSA CONEXION SOCKET EXITOSA ")
      console.log(socket.id);
      global.chatSocket = socket;
    
      socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log("ADD-USER USERID:", userId)
        console.log("online users desde add-user", onlineUsers)
      })
      


       socket.on('send-msg', (data) => {
        console.log("SEND-MSG")
        console.log(data)
        //onlineUsers.get
         const sendUserSocket = (data.to);
         console.log("data to:", data.to)
         console.log("SEND USER SOCKET", sendUserSocket)
         if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
            console.log("msg-receive exitoso")
          }

       })


      //  global.onlineUsers = new Map();
      //  io.on("connection", (socket) => {
      //    global.chatSocket = socket;
      //    socket.on("add-user", (userId) => {
      //      onlineUsers.set(userId, socket.id);
      //    });

      //    socket.on("send-msg", (data) => {
      //      const sendUserSocket = onlineUsers.get(data.to);
      //      if (sendUserSocket) {
      //        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      //      }
      //    });
      //  });

  // socket.on("send-msg", (data) => {
  //   console.log("data.msg:", data.msg)
  //   const sendUserSocket = onlineUsers.get(data.to);
  //  if (sendUserSocket) {
  //   socket.to(sendUserSocket).emit("msg-recieve", data.msg);
  //       }
  //     });


    });

    io.listen(5173);

