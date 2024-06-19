/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomersState } from "@/store"
import { http } from "@/utils/http-common"
import { IUser } from "@/utils/types"
import { notification } from "antd"
import { useRecoilState } from "recoil"
import useSWR from "swr"

const useCustomers = (callback?: (data: unknown) => void) => {
    const [, setCustomerState] = useRecoilState(CustomersState)

    const fetcher = (url: string) => http.get(url).then((res) => {
        console.log(res)
        return res.data.body

    })

    const { data, error, mutate } = useSWR<IUser[], Error>('/users', fetcher, {
        onSuccess: (data: any) => {
            console.log(data)
            setCustomerState(data)
            if (callback) callback(data)
        },
        onError: (error) => {
            console.error('Error fetching customers:', error)
        }
    })

    const updateUser = async (user: IUser) => {
        console.log('reached here')
        if (!data) {
            return false;
        }
        console.log('Updating user:', user);

        try {
            const data = await http.put(
                `/users/${user.id}`,
                user
            );

            const updatedUser = data.data?.body;
            mutate((currentData: IUser[] | undefined) => {
                if (!currentData) {
                    return [];
                }

                return currentData.map(
                    (u: IUser) => u.id === updatedUser.id ? updatedUser : u
                )
            })
            notification.success({
                message: 'Updated updated successfully!',
            });

            return updatedUser;
        } catch (error: any) {
            notification.error({
                message: 'Error updating restaurant',
                description: error.message
            });
            return null;
        }
    };

    const deleteUser = async (id: string) => {
        if (!data) {
            return false;
        }
        await http.delete(`/users/${id}`);
        mutate(data.filter((user) => user.id !== id), false);
    };

    return {
        customers: data,
        mutate,
        error,
        updateUser,
        deleteUser
    }
}

export default useCustomers