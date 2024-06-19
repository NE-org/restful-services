import { IBooks, IStudent } from "@/utils/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const AuthState = atom({
    key: 'AuthState',
    default: {
        isAuthenticated: false,
        user: {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        } as IStudent
    },
    effects_UNSTABLE: [persistAtom]
})

export const BookState = atom({
    key: 'BooksState',
    default: [] as IBooks[]
})