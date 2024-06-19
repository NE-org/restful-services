import { Student } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

interface AuthRequest extends Request {
    user?: Student
}

const roleMiddleware = () => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized. User not authenticated.',
            })
        }
        if (req.user) {
            return res.status(200).json({
                message: 'You are allowed to access this resource',
            })
        }
        next()
    }
}
export { roleMiddleware }