import { Request, Response } from 'express'
import logger from '../common/logger'
import * as studentService from '../services/student.service'

const getAll = async (req: Request,res: Response) => {
    const data = await studentService.getAll()
    logger.info(data)
    res.status(data.statusCode).json(data)
}
const getById = async (req: Request, res: Response) => {
    const data = await studentService.getById(req.params.id)
    res.status(data.statusCode).json(data)
}
const update = async (req: Request, res: Response) => {
    const data = await studentService.update(req.params.id, req.body)
    res.status(data.statusCode).json(data)
}
const remove = async (req: Request, res: Response) => {
    const data = await studentService.remove(req.params.id)
    res.status(data.statusCode).json(data)
}
export { getAll, getById, update, remove }