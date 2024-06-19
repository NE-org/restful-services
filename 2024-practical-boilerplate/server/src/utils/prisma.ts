import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

import { Prisma } from '@prisma/client'

export const handleExceptionError = (error: any): { statusCode: number, message: string } => {
    let statusCode = 500
    let message = 'Internal server error'

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                statusCode = 409
                message = 'Unique constraint failed'
                break
            case 'P2003':
                statusCode = 422
                message = 'Foreign key constraint failed'
                break
            default:
                statusCode = 400
                message = 'Bad request' + error.message
                break
        }
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = 500
        message = 'Unknown server error'
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
        statusCode = 500
        message = 'Rust panic error'
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
        statusCode = 500
        message = 'Initialization error'
    } else if (error instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400
        message = 'Validation error' + error.message
    } else if (error.code === 'ETIMEDOUT') {
        statusCode = 504
        message = 'Database request timed out'
    } else {
        statusCode = error.status
        message = error.message || 'Internal server error'
    }

    return { statusCode, message }
}
