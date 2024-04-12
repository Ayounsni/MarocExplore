import { createContext, useContext, useState } from "react"
import UserApi from "../services/Api/User/UserApi"
import { USER } from "../router/index"
import { useNavigate } from 'react-router-dom';

// import PropTypes from 'prop-types';

export const UserStateContext = createContext({
    user:{},
    authenticated: false,
    setUser: () => {},
    logout: () => {},
    login: (email,passwod) => {},
    setAuthenticated: () => {},
})

export default function UserContext({ children }){
    const  [user, setUser] = useState({})
    const  [authenticated, _setAuthenticated] = useState(window.localStorage.getItem('AUTHENTICATED'))
    // const navigate = useNavigate()

    const login = async (email,password) => {
 
       await UserApi.getCsrf()
     return  UserApi.login(email,password)
    }
    const logout = () => {
        setUser({})
        _setAuthenticated(false)
    }
    const setAuthenticated = (isAuthenticated)=>{
       _setAuthenticated(isAuthenticated)
       window.localStorage.setItem('AUTHENTICATED',isAuthenticated)
    }
    return <>
      <UserStateContext.Provider value={{
        user,
        login,
        authenticated,
        setUser,
        setAuthenticated,
        logout
        
      }}>
        {children}
      </UserStateContext.Provider>
    
    </>
}
export const useUserContext = () => useContext(UserStateContext)
// UserContext.propTypes = {
//     children: PropTypes.node.isRequired,
// };