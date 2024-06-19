/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuState } from "@/store"
import { http } from "@/utils/http-common"
import { IMenu, IRestaurant } from "@/utils/types"
import { notification } from "antd"
import { useRecoilState } from "recoil"
import useSWR from "swr"


const useMenu = (callback?: (data: unknown) => void) => {
    const [, setMenu] = useRecoilState(MenuState)

    const fetcher = (url: string) => http.get(url).then((res) => res.data.body)

    const { data, error, mutate } = useSWR<IMenu[], Error>('/menus', fetcher, {
        
        onSuccess: (data: any) => {
            console.log('The info: ',data)
            setMenu(data)
            if (callback) callback(data)
        },
        onError: (error) => {
            console.log(error)
            notification.error({
                message: 'Error fetching menus',
                description: error.message
            })
        }
    })

    const createMenus = async (menu: IMenu) => {
        try {
            const data = await http.post('/menus', menu)
            const newMenu = data.data.body;
            console.log(data)
            mutate((data: IMenu[] | undefined) => {
                if (!data) {
                    return [newMenu];
                }
                const formattedData = [...data, newMenu];
                console.log(formattedData)
                return formattedData;
            });
            if (newMenu) {
                notification.success({
                    message: 'Successfully created menus',
                })
            }
            return newMenu
        } catch (error: any) {
            notification.error({
                message: 'Error fetching menus',
                description: error.message
            })
            return null
        }
    }

    const updateMenus = async (menu: IRestaurant) => {
        if (!data) {
            return false;
        }
        try {
            const data = await http.put(
                `/menus/${menu.id}`,
                menu
            );
            const updatedMenu = data.data.body;
            mutate((currentData: IMenu[] | undefined) => {
                if (!currentData) {
                    return [];
                }
                const formattedData = currentData.map((u: IMenu) =>
                    u.id === updatedMenu.id ? updatedMenu : u
                );
                return formattedData;
            }, false);
            notification.success({
                message: 'Menu updated successfully!',
            });
            return updatedMenu;
        } catch (error: any) {
            notification.error({
                message: 'Error updating menu',
                description: error.message
            });
            return null;
        }
    };

    const deletedMenu = async (id: string) => {
        if (!data) {
            return false;
        }
        try {
            await http.delete(`/menus/${id}`);
            mutate(data.filter((menu) => menu.id !== id), false);
            notification.success({
                message: 'Menu deleted!'
            })
        } catch (error: any) {
            notification.error({
                message: 'Failure !',
                description: error.message
            })
        }
    };

    return {
        menus: data,
        mutate,
        error,
        createMenus,
        updateMenus,
        deletedMenu
    }
}

export default useMenu