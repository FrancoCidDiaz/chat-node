import express from 'express'
import { register, login, getUser, getAllUsers } from '../controllers/userController.js'

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/user/:id", getUser)
router.get("/allUsers", getAllUsers)

export default router