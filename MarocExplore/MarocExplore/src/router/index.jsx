import {createBrowserRouter} from "react-router-dom";
import Home from "../page/Home";
import Register from "../page/Register";
import Login from "../page/Login";
// import Users from "../page/Users";
import NotFound from "../page/NotFound";
import Layout from "../layouts/Layout";
import GuestLayout from "../layouts/GuestLayout";
import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../components/User/UserDashboard";

export const USER = '/users'
export const LOGIN = '/login'

export const router = createBrowserRouter([
    {
        
        element: <Layout/>,
        children:[
            {
                path: '/',
                element: <Home/>
        
            },

        ]

    },
    {
        
        element: <GuestLayout/>,
        children:[

            {
                path: LOGIN,
                element: <Login/>
        
            },
            {
                path: '/register',
                element: <Register/>
        
            },
            
        ]

    },
    {
        
        element: <UserLayout/>,
        children:[
        
            {
                path: USER,
                element: <UserDashboard/>
        
            },

        ]

    },
    {
        path: '*',
        element: <NotFound/>

    },
    
])