import {createBrowserRouter} from "react-router-dom";
import Home from "../page/Home";
import Register from "../page/Register";
import Login from "../page/Login";
import Users from "../page/Users";
import NotFound from "../page/NotFound";
import Layout from "../layouts/Layout";

export const USER = '/users'

export const router = createBrowserRouter([
    {
        
        element: <Layout/>,
        children:[
            {
                path: '/',
                element: <Home/>
        
            },
            {
                path: '/login',
                element: <Login/>
        
            },
            {
                path: '/register',
                element: <Register/>
        
            },
            
            {
                path: USER,
                element: <Users/>
        
            },

        ]

    },
    {
        path: '*',
        element: <NotFound/>

    },
    
])