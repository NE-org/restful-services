/* eslint-disable @typescript-eslint/no-explicit-any */
import { RestaurantState } from "@/store"
import { http } from "@/utils/http-common"
import { IRestaurant } from "@/utils/types"
import { notification } from "antd"
import { useRecoilState } from "recoil"
import useSWR from "swr"


const useRestaurants = (callback?: (data: unknown) => void) => {
    const [, setRestaurantState] = useRecoilState(RestaurantState)

    const fetcher = (url: string) => http.get(url).then((res) => res.data.body)

    const { data, error, mutate } = useSWR<IRestaurant[], Error>('/restaurants', fetcher, {
        onSuccess: (data: any) => {
            setRestaurantState(data)
            if (callback) callback(data)
        },
        onError: (error) => {
            notification.error({
                message: 'Error fetching restaurants',
                description: error.message
            })
        }
    })

    const createRestaurant = async (resto: IRestaurant) => {
        try {
            const data = await http.post('/restaurants', resto)
            const newRestaurant = data.data.body;
            console.log(data)
            mutate((data: IRestaurant[] | undefined) => {
                if (!data) {
                    return [newRestaurant];
                }
                const formattedData = [...data, newRestaurant];
                console.log(formattedData)
                return formattedData;
            });
            if (newRestaurant) {
                notification.success({
                    message: 'Successfully created restaurants',
                })
            }
            return newRestaurant
        } catch (error: any) {
            notification.error({
                message: 'Error fetching restaurants',
                description: error.message
            })
            return null
        }
    }

    const updateRestaurant = async (resto: IRestaurant) => {
        if (!data) {
            return false;
        }
        try {
            const data = await http.put(
                `/restaurants/${resto.id}`,
                resto
            );
            const updatedRestaurant = data.data.body;
            mutate((currentData: IRestaurant[] | undefined) => {
                if (!currentData) {
                    return [];
                }
                const formattedData = currentData.map((u: IRestaurant) =>
                    u.id === updatedRestaurant.id ? updatedRestaurant : u
                );
                return formattedData;
            }, false);
            notification.success({
                message: 'Restaurant updated successfully!',
            });
            return updatedRestaurant;
        } catch (error: any) {
            notification.error({
                message: 'Error updating restaurant',
                description: error.message
            });
            return null;
        }
    };

    const deleteRestaurant = async (id: string) => {
        if (!data) {
            return false;
        }
        try {
            await http.delete(`/restaurants/${id}`);
            mutate(data.filter((resto) => resto.id !== id), false);
            notification.success({
                message: 'Restaurant deleted!'
            })
        } catch (error: any) {
            notification.error({
                message: 'Failure !',
                description: error.message
            })
        }
    };

    return {
        restaurants: data,
        mutate,
        error,
        createRestaurant,
        updateRestaurant,
        deleteRestaurant
    }
}

export default useRestaurants