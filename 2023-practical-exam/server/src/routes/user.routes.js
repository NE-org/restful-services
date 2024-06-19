import express from 'express'
import { validateAdminRegistration, validateLogin } from '../validators/user.validator.js'
import authenticate from '../middlewares/auth.middleware.js'
import {getProfile,register, login} from "../controllers/user.controller.js"

const router = express.Router()

router.get("/profile", authenticate, getProfile)

router.post("/admin/register",validateAdminRegistration,register)

router.post("/login", validateLogin, login)

export default router;