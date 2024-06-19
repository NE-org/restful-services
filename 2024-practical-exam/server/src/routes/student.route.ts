import express from 'express'
import * as studentController from '../controllers/student.controller'

const router = express.Router() 

router.get('/', studentController.getAll)
router.get('/:id', studentController.getById)
router.put('/:id', studentController.update)
router.delete('/:id', studentController.remove)

export { router as studentRoute }