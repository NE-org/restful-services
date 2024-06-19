import express from 'express'
import * as menuController from '../controllers/menu.controller'

const router = express.Router() 

router.get('/', menuController.getAll) 
router.get('/:id', menuController.getById) 
router.post('/', menuController.create) 
router.delete('/:id', menuController.remove) 
router.put('/:id', menuController.update)


export { router as menuRoute }