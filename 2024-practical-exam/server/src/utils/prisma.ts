import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()
import { Prisma } from '@prisma/client'
import * as yup from 'yup'

/* 
  Handling the exception with prisma client and
    returning the status code and message
*/
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

export const studentSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
})

export const bookSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    author: yup.string().required('Author is required'),
    publisher: yup.string().required('Publisher is required'),
    publicationYear: yup.number().required('Publication Year number required!'),
    subject: yup.string().required('Subject is required')
})
