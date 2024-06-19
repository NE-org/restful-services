import express from 'express'
import * as authController from '../controllers/auth.controller'

const router = express.Router() 

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/loggedIn', authController.loggedIn)

export { router as authRoute }