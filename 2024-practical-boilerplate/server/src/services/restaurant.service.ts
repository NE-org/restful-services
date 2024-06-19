import { Restaurant } from '@prisma/client'
import { ServiceAPIResponse } from '../../types/service-response'
import { IRestaurant } from '../models/types'
import { handleExceptionError, prisma } from '../utils/prisma'

const create = async (
    restaurant: IRestaurant,
): Promise<ServiceAPIResponse<IRestaurant>> => {
    try {
        const newRestaurant = await prisma.restaurant.create(
            {
                data: {
                    title: restaurant.title,
                    location: restaurant.location,
                    status: restaurant.status,
                    thumbnail: restaurant.thumbnail,
                    description: restaurant.description,
                    rating: restaurant.rating,
                },
            }
        )

        if (!newRestaurant) {
            return {
                statusCode: 404,
                body: {} as Restaurant,
                message: 'Restaurant not found',
            }
        }

        return {
            statusCode: 201,
            body: newRestaurant,
            message: 'Restaurant created successfully',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Restaurant,
            message,
        }
    }
}

const getAll = async (): Promise<ServiceAPIResponse<IRestaurant[]>> => {
    try {
        const restaurants = await prisma.restaurant.findMany()
        console.log('The resto: ', restaurants)
        if (!restaurants) {
            return {
                statusCode: 404,
                body: [],
                message: 'No restaurants found',
            }
        }
        return {
            statusCode: 200,
            body: restaurants,
            message: 'Restaurants found !',
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

const getById = async (id: string): Promise<ServiceAPIResponse<Restaurant>> => {
    try {
        const restaurant = await prisma.restaurant.findUnique(
            {
                where: {
                    id: id,
                },
            }
        )
        if (!restaurant) {
            return {
                statusCode: 404,
                body: {} as Restaurant,
                message: 'No Restaurant found',
            }
        }
        return {
            statusCode: 200,
            body: restaurant,
            message: 'Restaurant found',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Restaurant,
            message,
        }
    }
}

const remove = async (id: string): Promise<ServiceAPIResponse<Restaurant>> => {
    try {
        const restaurant = await prisma.restaurant.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!restaurant) {
            return {
                statusCode: 404,
                body: {} as Restaurant,
                message: 'Restaurant not found',
            }
        }
        await prisma.restaurant.delete(
            {
                where: {
                    id,
                },
            }
        )
        return {
            statusCode: 200,
            body: restaurant,
            message: 'Restaurant deleted',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Restaurant,
            message,
        }
    }
}

const update = async (id: string, resto: IRestaurant) : Promise<ServiceAPIResponse<Restaurant | null>> => {
    try {
        const restaurant = await prisma.restaurant.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!restaurant) {
            return {
                statusCode: 404,
                body: {} as Restaurant,
                message: 'Restaurant not found',
            }
        }
        const updatedRestaurant = await prisma.restaurant.update(
            {
                where: {
                    id,
                },
                data: {
                    title: resto.title,
                    location: resto.location,
                    status: resto.status,
                    thumbnail: resto.thumbnail,
                    description: resto.description,
                    rating: resto.rating,
                },
            }
        )
        return {
            statusCode: 200,
            body: updatedRestaurant,
            message: 'Restaurant updated',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Restaurant,
            message,
        }
    }
}

export { create, getAll, getById, remove, update }
