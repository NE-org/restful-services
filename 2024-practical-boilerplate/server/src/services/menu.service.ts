import { Menu } from '@prisma/client'
import { ServiceAPIResponse } from '../../types/service-response'
import { IMenu } from '../models/types'
import { handleExceptionError, prisma } from '../utils/prisma'

const createMenu = async (
    menu: IMenu,
): Promise<ServiceAPIResponse<Menu>> => {
    try {
        const newMenu = await prisma.menu.create(
            {
                data: {
                    name: menu.name,
                    restaurantId: menu.restaurantId,
                    description: menu.description,
                    icon: menu.icon,
                }
            }
        )

        if (!newMenu) {
            return {
                statusCode: 404,
                body: {} as Menu,
                message: 'Menu not found',
            }
        }

        return {
            statusCode: 201,
            body: newMenu,
            message: 'Menu created successfully',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Menu,
            message,
        }
    }
}

const getAllMenus = async (): Promise<ServiceAPIResponse<IMenu[]>> => {
    try {
        const menus = await prisma.menu.findMany()
        console.log('The menus: ', menus)

        if (!menus) {
            return {
                statusCode: 404,
                body: [],
                message: 'No menus found',
            }
        }
        return {
            statusCode: 200,
            body: menus,
            message: 'Menus found !',
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

const getMenuById = async (id: string): Promise<ServiceAPIResponse<Menu>> => {
    try {
        const menu = await prisma.menu.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!menu) {
            return {
                statusCode: 404,
                body: {} as Menu,
                message: 'No Menu found',
            }
        }
        return {
            statusCode: 200,
            body: menu,
            message: 'Menu found',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Menu,
            message,
        }
    }
}

const removeMenu = async (id: string): Promise<ServiceAPIResponse<Menu>> => {
    try {
        const menu = await prisma.menu.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!menu) {
            return {
                statusCode: 404,
                body: {} as Menu,
                message: 'Menu not found',
            }
        }
        await prisma.menu.delete(
            {
                where: {
                    id,
                },
            }
        )
        return {
            statusCode: 200,
            body: menu,
            message: 'Menu deleted',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Menu,
            message,
        }
    }
}

const updateMenu = async (id: string, menu: IMenu): Promise<ServiceAPIResponse<Menu | null>> => {
    try {
        const existingMenu = await prisma.menu.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!existingMenu) {
            return {
                statusCode: 404,
                body: {} as Menu,
                message: 'Menu not found',
            }
        }

        const updatedMenu = await prisma.menu.update(
            {
                where: {
                    id,
                },
                data: {
                    name: menu.name,
                    restaurantId: menu.restaurantId,
                    description: menu.description,
                    icon: menu.icon,
                },
            }
        )

        if (!updatedMenu) {
            return {
                statusCode: 404,
                body: {} as Menu,
                message: 'Menu not found',
            }
        }

        return {
            statusCode: 200,
            body: updatedMenu,
            message: 'Menu updated',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Menu,
            message,
        }
    }
}

export { createMenu, getAllMenus, getMenuById, removeMenu, updateMenu }
