import express from 'express'
import * as userController from '../controllers/user.controller'

const router = express.Router() 

router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.put('/:id', userController.update)
router.delete('/:id', userController.remove)

export { router as userRoute }