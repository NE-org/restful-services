import logger from '../common/logger'
import * as bookService from '../services/book.service'
import { Request, Response } from 'express'

const getAll = async (req: Request,res: Response) => {
    const data = await bookService.getAll()
    logger.info(data)
    res.status(data.statusCode).json(data)
}
const getById = async (req: Request, res: Response) => {
    const data = await bookService.getBookById(req.params.id)
    res.status(data.statusCode).json(data)
}
const create = async (req: Request, res: Response) => {
    const data = await bookService.create(req.body)
    res.status(data.statusCode).json(data)
}
const update = async (req: Request, res: Response) => {
    const data = await bookService.updateBook(req.params.id, req.body)
    res.status(data.statusCode).json(data)
}
const remove = async (req: Request, res: Response) => {
    const data = await bookService.removeBook(req.params.id)
    res.status(data.statusCode).json(data)
}
export { getAll, getById, create, update, remove }