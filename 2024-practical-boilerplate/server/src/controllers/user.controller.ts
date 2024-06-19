import { Request, Response } from 'express'
import logger from '../common/logger'
import * as userService from '../services/user.service'

const getAll = async (req: Request,res: Response) => {
    const data = await userService.getAll()
    logger.info(data)
    res.status(data.statusCode).json(data)
}
const getById = async (req: Request, res: Response) => {
    const data = await userService.getById(req.params.id)
    res.status(data.statusCode).json(data)
}
const update = async (req: Request, res: Response) => {
    const data = await userService.update(req.params.id, req.body)
    res.status(data.statusCode).json(data)
}
const remove = async (req: Request, res: Response) => {
    const data = await userService.remove(req.params.id)
    res.status(data.statusCode).json(data)
}
export { getAll, getById, update, remove }