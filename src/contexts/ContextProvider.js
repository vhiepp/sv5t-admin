const { createContext, useState, useContext } = require("react");

const StateContext = createContext({
  user: {},
  token: null,
  setUser: () => {},
  setToken: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem('access_token'))

    const setToken = (token) => {
        if (token) {
            _setToken(token)
            localStorage.setItem('access_token', token)
        } else {
            _setToken(null)
            localStorage.removeItem('access_token')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)