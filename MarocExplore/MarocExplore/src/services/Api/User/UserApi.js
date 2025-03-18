import  axiosClient  from "../../../api/axios"

const UserApi = {
    getCsrf: async () =>{
     return   await axiosClient.get('sanctum/csrf-cookie')
    },
    login: async (email,password) =>{
        return    await axiosClient.post('/api/login', {email,password})
    },
    logout: async () =>{
        return    await axiosClient.post('/api/logout')
    },
    getUser: async () =>{
    return await  axiosClient.get('/api/user')
    },
    getCat: async () =>{
        return await  axiosClient.get('/api/categorie')
        },
    getItin: async () =>{
       return await  axiosClient.get('/api/route')
      }
}

export default UserApi