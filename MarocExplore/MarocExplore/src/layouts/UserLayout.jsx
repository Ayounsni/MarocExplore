import { Outlet, Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../index.css'; 
import logo from "../assets/kamel.png";
import { LOGIN } from "../router/index";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import UserApi from "../services/Api/User/UserApi";

export default function UserLayout(){
    const navigate = useNavigate()
    const {setUser, logout} = useUserContext()
    useEffect(() => {
        UserApi.getUser().then(({data})=> {
            setUser(data)
            console.log(data)
        }).catch(() =>{
            console.log(UserApi.getUser())
            logout()      
            navigate(LOGIN)
        })
      
    }, []);

    const out = async () => {
        UserApi.logout().then(() =>{
            logout()
            navigate(LOGIN)
        })
    }

    return (
        <>    
        <div className=" min-h-screen bg-green-50 ">
            <nav className="bg-gray-50 dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-198 dark:border-gray-600 shadow-md">
                <div className=" flex flex-wrap items-center justify-between mx-auto p-3 px-8">
                    <div className="flex justify-center">
                    <img src={logo} className="h-11" alt="Logo" /> 
                    <p className="mt-2 text-red-600 text-xl font-semibold">Maroc<span className="text-green-500">Explore</span></p>
                    </div>
                    <div className="flex gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link to="/register">
                            <button onClick={out} className="text-white bg-gray-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                        </Link>
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-0 md:p-0 font-medium border-gray-96 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to="/users" className="block py-0 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Accueil</NavLink>
                            </li>
                            <li>
                                <NavLink to="/favoris" className="block py-0 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Favoris</NavLink>
                            </li>
                            
                            <li>
                                <NavLink to="/addItineraire" className="block py-0 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Ajouter Itineraire</NavLink>
                            </li>

                        </ul>
                    </div>           
                </div>
            </nav>
            <main >
                <Outlet/>              
            </main>
        </div>
            
        </>
    );
}
