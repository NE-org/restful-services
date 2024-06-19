import express from 'express'
import { assignVehicleToOwner, getVehicleOwners } from '../controllers/vehicleOwner.controller.js'
const router = express.Router()

router.get("/", getVehicleOwners)

router.post("/assign/vehicle/:vehicleId/owner/:ownerId",assignVehicleToOwner)

export default router;