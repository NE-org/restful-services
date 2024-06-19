import { AuthContext } from "@/contexts/PersistenceProvider";
import { AuthState } from "@/store";
import { removeToken, setEncToken } from "@/store/local-storage";
import { http } from "@/utils/http-common"
import { IStudent } from "@/utils/types";
import { notification } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAuth = (callback?: (data: any) => void) => {
    const [,setRecoilAuthState] = useRecoilState(AuthState);
    const navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);
    const login = async (data: Partial<IStudent>) => {
        try {
            const response = await http.post(`/auth/login`, data);
            console.log('Login Response:', response);
            if (response.status === 200) {
                setRecoilAuthState({
                    isAuthenticated: true,
                    user: response.data.body
                });
                setAuthState(response.data.body);
                setEncToken(response.data.token);
                notification.success({
                    message: response.data.message
                })
                navigate('/')
                if (callback) return callback(response.data);
            } else {
                notification.error({
                    message: response.data.message
                })
                if (callback) return callback(response.data);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            notification.error({
                message: error?.message
            })
            console.log(error);
        }
    }

    const register = async (data: IStudent) => {
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
        setRecoilAuthState({
            isAuthenticated: false,
            user: {
                id: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
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