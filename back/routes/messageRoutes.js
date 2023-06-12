import express from 'express'
import { addMessages, getMessages } from '../controllers/messageController.js'

const router = express.Router()

router.post("/addMsg", addMessages)
router.post("/getMsg", getMessages)

export default router