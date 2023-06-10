import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

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

const server = app.listen(process.env.PORT, () =>{
    console.log(`SERVER STARTED AT PORT: ${process.env.PORT}`)
})