import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const { createContext, useState, useContext, useEffect } = require("react");


const domain = process.env.REACT_APP_SERVER_DOMAIN


const StateContext = createContext({
    user: {},
    setUser: () => { },
    api: {}
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    const axiosApi = axios.create({
        baseURL: `${domain}/api`
    })

    axiosApi.interceptors.request.use((config) => {
        config.withCredentials = true;
        return config
    })

    axiosApi.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        try {

            const { response } = error

            if (response.status === 401) {
                navigate('/login');
                console.warn('Bạn cần phải đăng nhập với quyền quản trị để xem được nội dung này!');
            }

        } catch (error) {
            // console.log(error);
        }
    })

    useEffect(() => {
        axiosApi.post('/admin/auth/me')
            .then(({ data }) => {
                setUser(data.user)
            })
            .catch((e) => {
            })
    }, [])

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            axiosApi
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)