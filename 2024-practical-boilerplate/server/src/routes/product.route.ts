import express from 'express'
import * as productController from '../controllers/product.controller'

const router = express.Router() 

router.get('/', productController.getAll) 
router.get('/:id', productController.getById) 
router.post('/', productController.create) 
router.delete('/:id', productController.remove) 
router.put('/:id', productController.update)


export { router as productRoute }