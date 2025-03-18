import { createContext, useContext, useState } from "react"
import UserApi from "../services/Api/User/UserApi"


export const UserStateContext = createContext({
    user:{},
    setUser: () => {},
    setUserToken: () => {},
    userToken: () => {},
    logout: () => {},
    login: () => {},
    setCategories: () => {}, 
    categories:{},
    setItin: () => {}, 
    itin:{},
})

export default function UserContext({ children }){
    const  [user, setUser] = useState({})
    const  [categories, setCategories] = useState([])
    const  [itin, setItin] = useState([])
    const [userToken, _setUserToken]=useState(localStorage.getItem('TOKEN') || '')

    // const navigate = useNavigate()
    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
    }

    const login = async (email,password) => {
 
       await UserApi.getCsrf()
       console.log(UserApi.getCsrf())
     return  UserApi.login(email,password)
    }
    const logout = () => {
        setUser({});
        setUserToken(null);
       
    }

    return <>
      <UserStateContext.Provider value={{
        user,
        login,
        setUser,
        logout,
        userToken,
        setUserToken,
        categories,
        setCategories,
        itin,
        setItin
        
      }}>
        {children}
      </UserStateContext.Provider>
    
    </>
}
export const useUserContext = () => useContext(UserStateContext)
// UserContext.propTypes = {
//     children: PropTypes.node.isRequired,
// };