import { User } from '@prisma/client'
import { ServiceAPIResponse } from '../../types/service-response'
import { IUser } from '../models/types'
import { handleExceptionError, prisma } from '../utils/prisma'

const getAll = async (): Promise<ServiceAPIResponse<User[]>> => {
    try {
        const user = await prisma.user.findMany()
        if (!user) {
            return {
                statusCode: 404,
                body: [],
                message: 'No user found',
            }
        }
        return {
            statusCode: 200,
            body: user,
            message: 'Users found !',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: [],
            message,
        }
    }
}

const getById = async (id: string): Promise<ServiceAPIResponse<User>> => {
    try {
        const user = await prisma.user.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!user) {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'No user found',
            }
        }
        return {
            statusCode: 200,
            body: user,
            message: 'User found',
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

const remove = async (id: string): Promise<ServiceAPIResponse<User>> => {
    try {
        const user = await prisma.user.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!user) {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'User not found',
            }
        }
        await prisma.user.delete({
            where: {
                id,
            },
        })
        return {
            statusCode: 200,
            body: user,
            message: 'User deleted',
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

const update = async (id: string, userInfo: IUser): Promise<ServiceAPIResponse<User | null>> => {
    try {
        const user = await prisma.user.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!user) {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'User not found',
            }
        }

        await prisma.user.update({
            where: {
                id,
            },
            data: {
                ...userInfo,
            },
        })

        return {
            statusCode: 200,
            body: user,
            message: 'User updated',
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

export { getAll, getById, remove, update }
