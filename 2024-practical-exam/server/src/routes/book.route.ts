import express from 'express'
import * as bookController from '../controllers/book.controller'

const router = express.Router() 

router.get('/', bookController.getAll) 
router.get('/:id', bookController.getById) 
router.post('/', bookController.create) 
router.delete('/:id', bookController.remove) 
router.put('/:id', bookController.update)


export { router as bookRoute }