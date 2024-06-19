import { Product, StockStatus } from '@prisma/client'
import { ServiceAPIResponse } from '../../types/service-response'
import { IProduct } from '../models/types'
import { handleExceptionError, prisma } from '../utils/prisma'

const createProduct = async (
    product: IProduct,
): Promise<ServiceAPIResponse<Product>> => {
    try {
        const newProduct = await prisma.product.create(
            {
                data: {
                    name: product.name,
                    description: product.description,
                    type: product.type,
                    price: product.price,
                    quantity: product.quantity,
                    stockStatus: product.stockStatus,
                    menuId: product.menuId,
                    thumbnail: product.thumbnail
                },
            }
        )

        if (!newProduct) {
            return {
                statusCode: 404,
                body: {} as Product,
                message: 'Product not found',
            }
        }

        return {
            statusCode: 201,
            body: newProduct,
            message: 'Product created successfully',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Product,
            message,
        }
    }
}

const getAllProducts = async (): Promise<ServiceAPIResponse<Product[]>> => {
    try {
        const products = await prisma.product.findMany()
        if (!products) {
            return {
                statusCode: 404,
                body: [],
                message: 'No products found',
            }
        }
        return {
            statusCode: 200,
            body: products,
            message: 'Products found !',
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

const getProductById = async (id: string): Promise<ServiceAPIResponse<Product>> => {
    try {
        const product = await prisma.product.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!product) {
            return {
                statusCode: 404,
                body: {} as Product,
                message: 'No Product found',
            }
        }
        return {
            statusCode: 200,
            body: product,
            message: 'Product found',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Product,
            message
        }
    }
}

const removeProduct = async (id: string): Promise<ServiceAPIResponse<Product>> => {
    try {
        const product = await prisma.product.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!product) {
            return {
                statusCode: 404,
                body: {} as Product,
                message: 'Product not found',
            }
        }
        await prisma.product.delete(
            {
                where: {
                    id,
                },
            }
        )
        return {
            statusCode: 200,
            body: product,
            message: 'Product deleted',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Product,
            message,
        }
    }
}

const updateProduct = async (id: string, product: IProduct): Promise<ServiceAPIResponse<Product | null>> => {
    try {
        const existingProduct = await prisma.product.findUnique({
            where: {
                id,
            }
        })
        if (!existingProduct) {
            return {
                statusCode: 404,
                body: {} as Product,
                message: 'Product not found',
            }
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id,
            },
            data: {
                name: product.name,
                description: product.description,
                type: product.type,
                price: product.price,
                quantity: product.quantity,
                stockStatus: product.stockStatus as StockStatus,
                menuId: product.menuId,
                thumbnail: product.thumbnail
            }
        })

        if (!updatedProduct) {
            return {
                statusCode: 404,
                body: {} as Product,
                message: 'Product not found',
            }
        }

        return {
            statusCode: 200,
            body: updatedProduct,
            message: 'Product updated successfully',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Product,
            message,
        }
    }
}

export { createProduct, getAllProducts, getProductById, removeProduct, updateProduct }
