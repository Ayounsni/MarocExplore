import {createBrowserRouter} from "react-router-dom";
import Home from "../components/User/Home";
import Register from "../page/Register";
import Login from "../page/Login";
// import Users from "../page/Users";
import NotFound from "../page/NotFound";
import Layout from "../layouts/Layout";
import GuestLayout from "../layouts/GuestLayout";
import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../components/User/UserDashboard";
import AddItineraire from "../components/User/AddItineraire";
import EditRoute from "../components/User/EditRoute";
import Favoris from "../components/User/Favoris";

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
            {
                path: '/addItineraire',
                element: <AddItineraire/>
        
            },
            {
                path: '/users/editroute/:id',
                element: <EditRoute/>        
            },
            {
                path: '/favoris',
                element: <Favoris/>
        
            },

        ]

    },
    {
        path: '*',
        element: <NotFound/>

    },
    
])