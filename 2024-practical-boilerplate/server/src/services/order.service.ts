import { Order } from '@prisma/client'
import { ServiceAPIResponse } from '../../types/service-response'
import { IOrders } from '../models/types'
import { handleExceptionError, prisma } from '../utils/prisma'

const createOrder = async (
    order: IOrders,
): Promise<ServiceAPIResponse<Order>> => {
    try {
        const newOrder = await prisma.order.create(
            {
                data: {
                    userId: order.userId,
                    productId: order.productId,
                    quantity: order.quantity,
                    paymentStatus: order.paymentStatus,
                    total: order.total,
                    paymentDate: order.paymentDate,
                },
            }
        )

        if (!newOrder) {
            return {
                statusCode: 404,
                body: {} as Order,
                message: 'Order not found',
            }
        }

        return {
            statusCode: 201,
            body: newOrder,
            message: 'Order created successfully',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Order,
            message,
        }
    }
}

const getAllOrders = async (): Promise<ServiceAPIResponse<Order[]>> => {
    try {
        const orders = await prisma.order.findMany()
        if (!orders) {
            return {
                statusCode: 404,
                body: [],
                message: 'No orders found',
            }
        }
        return {
            statusCode: 200,
            body: orders,
            message: 'Orders found !',
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

const getOrderById = async (id: string): Promise<ServiceAPIResponse<Order>> => {
    try {
        const order = await prisma.order.findUnique(
            {
                where: {
                    id: id
                }
            }
        )
        if (!order) {
            return {
                statusCode: 404,
                body: {} as Order,
                message: 'No Order found',
            }
        }
        return {
            statusCode: 200,
            body: order,
            message: 'Order found',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Order,
            message,
        }
    }
}

const removeOrder = async (id: string): Promise<ServiceAPIResponse<Order>> => {
    try {
        const order = await prisma.order.findUnique(
            {
                where: {
                    id: id
                }
            }
        )
        if (!order) {
            return {
                statusCode: 404,
                body: {} as Order,
                message: 'Order not found',
            }
        }
        await prisma.order.delete(
            {
                where: {
                    id: id
                }
            }
        )
        return {
            statusCode: 200,
            body: order,
            message: 'Order deleted',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Order,
            message,
        }
    } 
}

const update = async (id: string, resto: IOrders): Promise<ServiceAPIResponse<Order | null>> => {
    try {
        const order = await prisma.order.findUnique(
            {
                where: {
                    id: id
                }
            }
        )
        if (!order) {
            return {
                statusCode: 404,
                body: {} as Order,
                message: 'Order not found',
            }
        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: id
            },
            data: {
                userId: resto.userId,
                productId: resto.productId,
                quantity: resto.quantity,
                paymentStatus: resto.paymentStatus,
                total: resto.total,
                paymentDate: resto.paymentDate,
            }
        })

        return {
            statusCode: 200,
            body: updatedOrder,
            message: 'Order updated',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Order,
            message,
        }
    }
}
export { createOrder, getAllOrders, getOrderById, removeOrder, update }