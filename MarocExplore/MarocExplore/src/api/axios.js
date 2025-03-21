import axios from "axios"; 
// import { router } from "../router";


 const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

axiosClient.interceptors.request.use((config)=>{
    
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`;
    return config;
});

// axiosClient.interceptors.response.use(response =>{
//     return response;
// }, error =>{
//     if(error.response && error.response.status === 401){
//         router.navigate('/login')
//         return error;
//     }
//     throw error;
// })

export default axiosClient;
