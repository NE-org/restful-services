import express from 'express'
import * as orderController from '../controllers/order.controller'

const router = express.Router() 

router.get('/', orderController.getAll) 
router.get('/:id', orderController.getById) 
router.post('/', orderController.create) 
router.delete('/:id', orderController.remove) 
router.put('/:id', orderController.update)


export { router as orderRoute }