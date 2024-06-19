import { LOCAL_STORAGE_TOKEN_KEY } from "@/utils/constants";

export const getDecToken = () => {
    if (typeof window !== "undefined")
        return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    return;
}

export const setEncToken = (token: string) => {
    if (typeof window !== "undefined")
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
}

export const removeToken = () => {
    if (typeof window !== "undefined")
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}