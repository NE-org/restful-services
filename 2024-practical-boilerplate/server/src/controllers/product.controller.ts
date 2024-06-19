import { Request, Response } from 'express'
import logger from '../common/logger'
import * as productService from '../services/product.service'

const getAll = async (req: Request,res: Response) => {
    const data = await productService.getAllProducts()
    logger.info(data)
    res.status(data.statusCode).json(data)

}
const getById = async (req: Request, res: Response) => {
    const data = await productService.getProductById(req.params.id)
    res.status(data.statusCode).json(data)
}
const create = async (req: Request, res: Response) => {
    const data = await productService.createProduct(req.body)
    res.status(data.statusCode).json(data)
}
const update = async (req: Request, res: Response) => {
    const data = await productService.updateProduct(req.params.id, req.body)
    res.status(data.statusCode).json(data)
}
const remove = async (req: Request, res: Response) => {
    const data = await productService.removeProduct(req.params.id)
    res.status(data.statusCode).json(data)
}
export { getAll, getById, create, update, remove }