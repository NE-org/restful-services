
import { Student } from '@prisma/client'
import { ServiceAPIResponse } from '../../types/service-response'
import { handleExceptionError, prisma } from '../utils/prisma'
import { IStudent } from '../../types/types'

const getAll = async (): Promise<ServiceAPIResponse<Student[]>> => {
    try {
        const students = await prisma.student.findMany()
        if (!students) {
            return {
                statusCode: 404,
                body: [],
                message: 'No student found',
            }
        }
        return {
            statusCode: 200,
            body: students,
            message: 'Students found !',
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

const getById = async (id: string): Promise<ServiceAPIResponse<Student>> => {
    try {
        const student = await prisma.student.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!student) {
            return {
                statusCode: 404,
                body: {} as Student,
                message: 'No student found',
            }
        }
        return {
            statusCode: 200,
            body: student,
            message: 'Student found',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Student,
            message,
        }
    }
}

const remove = async (id: string): Promise<ServiceAPIResponse<Student>> => {
    try {
        const student = await prisma.student.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!student) {
            return {
                statusCode: 404,
                body: {} as Student,
                message: 'Student not found',
            }
        }
        await prisma.student.delete({
            where: {
                id,
            },
        })
        return {
            statusCode: 200,
            body: student,
            message: 'Student deleted',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Student,
            message,
        }
    }
}

const update = async (id: string, studentInfo: IStudent): Promise<ServiceAPIResponse<Student | null>> => {
    try {
        const student = await prisma.student.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!student) {
            return {
                statusCode: 404,
                body: {} as Student,
                message: 'Student not found',
            }
        }

        await prisma.student.update({
            where: {
                id,
            },
            data: {
                ...studentInfo,
            },
        })

        return {
            statusCode: 200,
            body: student,
            message: 'Student updated',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Student,
            message,
        }
    }
}

export { getAll, getById, remove, update }
