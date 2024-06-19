import { Request, Response } from 'express'
import * as AuthService from '../services/auth.service'
import logger from '../common/logger'

const login = async (req: Request, res: Response) => {
    const data = await AuthService.login(req.body?.email, req.body?.password)
    logger.info(data)
    res.status(data.statusCode).json(data)
}

const register = async (req: Request, res: Response) => {
    const data = await AuthService.signup(req.body)
    res.status(data.statusCode).json(data)
}

export { login, register }