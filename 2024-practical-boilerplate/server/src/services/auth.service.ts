import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { ServiceAPIResponse, ServiceAuthResponse } from '../../types/service-response'
import { IUser } from '../models/types'
import { handleExceptionError, prisma } from '../utils/prisma'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

const login = async (email: string, password: string): Promise<ServiceAuthResponse<User>> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (!user) {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'User not found',
                token: '',
            }
        }

        if (user.password) {
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                return {
                    statusCode: 401,
                    body: {} as User,
                    message: 'Password does not match',
                    token: '',
                }
            }
        }
        console.log(user.id)
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: '1d',
        })
        
        return {
            statusCode: 200,
            body: {
                ...user,
                password: undefined,
            },
            message: 'Login success',
            token,
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as User,
            message,
            token: '',
        }
    }
}

const signup = async (user: IUser): Promise<ServiceAPIResponse<User>> => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
        const newUser = await prisma.user.create({
            data: {
                ...user,
            },
        })
        if (!newUser) {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'User not found',
            }
        }
        const newUserResponse = newUser as User
        return {
            statusCode: 201,
            body: newUserResponse,
            message: 'User created successfully',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as User,
            message,
        }
    }
}

export { login, signup }
