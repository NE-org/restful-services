import logger from '../common/logger'
import * as menuService from '../services/menu.service'
import { Request, Response } from 'express'

const getAll = async (req: Request,res: Response) => {
    const data = await menuService.getAllMenus()
    logger.info(data)
    res.status(data.statusCode).json(data)
}
const getById = async (req: Request, res: Response) => {
    const data = await menuService.getMenuById(req.params.id)
    res.status(data.statusCode).json(data)
}
const create = async (req: Request, res: Response) => {
    const data = await menuService.createMenu(req.body)
    res.status(data.statusCode).json(data)
}
const update = async (req: Request, res: Response) => {
    const data = await menuService.updateMenu(req.params.id, req.body)
    res.status(data.statusCode).json(data)
}
const remove = async (req: Request, res: Response) => {
    const data = await menuService.removeMenu(req.params.id)
    res.status(data.statusCode).json(data)
}
export { getAll, getById, create, update, remove }