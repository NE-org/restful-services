import { IMenu, IOrders, IProduct, IRestaurant, IUser } from "@/utils/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();


export const AuthState = atom({
    key: 'AuthState',
    default: {
        isAuthenticated: false,
        user: {
            id: '',
            fullName: '',
            email: '',
            telephone: '',
            password: '',
            role: 'admin'
        } as IUser
    },
    effects_UNSTABLE: [persistAtom]
})

export const CustomersState = atom({
    key: 'CustomersState',
    default: [] as IUser[]
})

export const SelectedCustomerState = atom({
    key: 'SelectedCustomerState',
    default: {} as IUser
})

export const RestaurantState = atom({
    key: 'RestaurantState',
    default: [] as IRestaurant[]
})

export const MenuState = atom({
    key: 'MenuState',
    default: [] as IMenu[]
})

export const ProductSate = atom({
    key: 'ProductSate',
    default: [] as IProduct[]
})

export const OrderState = atom({
    key: 'OrderState',
    default: [] as IOrders[]
})