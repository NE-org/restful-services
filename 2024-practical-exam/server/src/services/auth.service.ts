import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { ServiceAPIResponse, ServiceAuthResponse } from '../../types/service-response'
import { handleExceptionError, prisma, studentSchema } from '../utils/prisma'
import { Student } from '@prisma/client'
import { IStudent } from '../../types/types'
import _ from 'lodash'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

/* 
    Login service for student, performing the login operation
*/
const login = async (email: string, password: string): Promise<ServiceAuthResponse<Student>> => {
    try {
        const student = await prisma.student.findUnique({
            where: {
                email,
            },
        })
        if (!student) {
            return {
                statusCode: 404,
                body: {} as Student,
                message: 'Student not found',
                token: '',
            }
        }

        if (student.password) {
            const isPasswordMatch = await bcrypt.compare(password, student.password)
            if (!isPasswordMatch) {
                return {
                    statusCode: 401,
                    body: {} as Student,
                    message: 'Password does not match',
                    token: '',
                }
            }
        }
        console.log(student.id)
        const token = jwt.sign({ id: student.id }, JWT_SECRET, {
            expiresIn: '1d',
        })

        return {
            statusCode: 200,
            body: {
                ...student,
                password: undefined,
            },
            message: 'Login success',
            token,
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Student,
            message,
            token: '',
        }
    }
}

const signup = async (studentInfo: IStudent): Promise<ServiceAPIResponse<Student>> => {
    try {
        await studentSchema.validate(studentInfo, { abortEarly: false })
        const hashedPassword = await bcrypt.hash(studentInfo.password, 10)
        studentInfo.password = hashedPassword
        const newStudent = await prisma.student.create({
            data: {
                ...studentInfo,
            },
        })
        if (!newStudent) {
            return {
                statusCode: 404,
                body: {} as Student,
                message: 'Student not found',
            }
        }
        const newStudentResponse = _.omit(newStudent, ['password'])
        return {
            statusCode: 201,
            body: newStudentResponse as Student,
            message: 'Student created successfully',
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

const loggedIn = async (token: string): Promise<ServiceAuthResponse<Student>> => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const student = await prisma.student.findUnique({
            where: {
                id: (decoded as any).id,
            },
        })
        if (!student) {
            return {
                statusCode: 404,
                body: {} as Student,
                message: 'Student not found',
                token: '',
            }
        }
        return {
            statusCode: 200,
            body: {
                ...student,
                password: undefined,
            },
            message: 'Login success',
            token,
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Student,
            message,
            token: '',
        }
    }
}

export { login, signup, loggedIn }
