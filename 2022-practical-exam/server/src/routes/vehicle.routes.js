import express from 'express'
import { getAllVehicles, getVehicles, registerVehicle } from '../controllers/vehicle.controller.js'
import { validateVehicleRegistration } from '../validators/vehicle.validator.js'
const router = express.Router()

router.get("/", getVehicles)

router.get("/all", getAllVehicles)

router.post("/register",validateVehicleRegistration,registerVehicle)

export default router;