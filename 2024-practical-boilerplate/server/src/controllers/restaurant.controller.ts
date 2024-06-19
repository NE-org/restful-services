import { Request, Response } from 'express'
import logger from '../common/logger'
import * as restaurantService from '../services/restaurant.service'

const getAll = async (req: Request, res: Response) => {
    console.log('get all')
    const data = await restaurantService.getAll()
    logger.info(data)

    res.status(data.statusCode).json(data)
}
const getById = async (req: Request, res: Response) => {
    const data = await restaurantService.getById(req.params.id)
    res.status(data.statusCode).json(data)
}
const create = async (req: Request, res: Response) => {
    const data = await restaurantService.create(req.body)
    res.status(data.statusCode).json(data)
}
const update = async (req: Request, res: Response) => {
    const data = await restaurantService.update(req.params.id, req.body)
    res.status(data.statusCode).json(data)
}
const remove = async (req: Request, res: Response) => {
    const data = await restaurantService.remove(req.params.id)
    res.status(data.statusCode).json(data)
}
export { getAll, getById, create, update, remove }