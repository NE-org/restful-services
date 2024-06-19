import express from 'express'
import { getAllOwners, getOwners, registerOwner } from '../controllers/owner.controller.js'
import { validateOwnerRegistration } from '../validators/owner.validator.js'
const router = express.Router()

router.get("/", getOwners)

router.get("/all", getAllOwners)

router.post("/register",validateOwnerRegistration,registerOwner)

export default router;