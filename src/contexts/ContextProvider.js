import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const { createContext, useState, useContext } = require("react");

const domain = process.env.REACT_APP_SERVER_DOMAIN

const StateContext = createContext({
    user: {},
    setUser: () => { },
    axiosApi: {}
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
            }

        } catch (error) {
            // console.log(error);
        }
    })

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