import { AuthState } from "@/store";
import { removeToken } from "@/store/local-storage";
import { http } from "@/utils/http-common"
import { IUser } from "@/utils/types";
import { useRecoilState } from "recoil";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAuth = (callback?: (data: any) => void) => {
    const [,setAuthState] = useRecoilState(AuthState)

    const login = async (data: Partial<IUser>) => {
        try {
            const response = await http.post(`/auth/login`, data);
            if (response.status === 200) {
                setAuthState({
                    isAuthenticated: true,
                    user: response.data.body
                });
                localStorage.setItem('authState', JSON.stringify(response.data.body));
                if (callback) callback(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const register = async (data: IUser) => {
        try {
            const response = await http.post(`/auth/register`, data);
            if (response.status === 201) {
                if (callback) callback(response.data);
            }
        } catch (error) {
            console.error("Register Error:", error);
        }
    }

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            user: {
                id: '',
                fullName: '',
                email: '',
                telephone: '',
                password: '',
                role: 'admin'
            }
        });
        removeToken();
    }

    return {
        login,
        register,
        logout
    }
}

export default useAuth