import { Request, Response } from 'express'
import logger from '../common/logger'
import * as orderService from '../services/order.service'

const getAll = async (res: Response) => {
    const data = await orderService.getAllOrders()
    logger.info(data)
    res.status(data.statusCode).json(data)
}
const getById = async (req: Request, res: Response) => {
    const data = await orderService.getOrderById(req.params.id)
    res.status(data.statusCode).json(data)
}
const create = async (req: Request, res: Response) => {
    const data = await orderService.createOrder(req.body)
    res.status(data.statusCode).json(data)
}
const update = async (req: Request, res: Response) => {
    const data = await orderService.update(req.params.id, req.body)
    res.status(data.statusCode).json(data)
}
const remove = async (req: Request, res: Response) => {
    const data = await orderService.removeOrder(req.params.id)
    res.status(data.statusCode).json(data)
}
export { getAll, getById, create, update, remove }