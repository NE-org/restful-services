import express from 'express'
import * as restaurantController from '../controllers/restaurant.controller'

const router = express.Router() 

router.get('/', restaurantController.getAll) 
router.get('/:id', restaurantController.getById) 
router.post('/', restaurantController.create) 
router.delete('/:id', restaurantController.remove) 
router.put('/:id', restaurantController.update)

export { router as restaurantRoute }