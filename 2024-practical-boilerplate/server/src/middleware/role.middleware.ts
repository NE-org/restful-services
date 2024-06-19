import { NextFunction, Request, Response } from 'express'
import { TAction, TRole } from '../models/types'
import User from '../models/factory/user'

interface AuthRequest extends Request {
    user?: User
}
const roleMiddleware = (action: TAction, role: TRole) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized. User not authenticated.',
            })
        }
        if (req.user.role !== role) {
            return res.status(403).json({
                message: `You are not allowed to ${action} this resource`,
            })
        }
        next()
    }
}
export { roleMiddleware }