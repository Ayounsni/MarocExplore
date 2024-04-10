import UserLogin from "../components/User/UserLogin"
import logo from "../assets/kamels.png"

export default function Login(){

    return <>
    <div className="flex justify-center">
    <div className="w-2/6 shadow-lg bg-gray-200 rounded-lg mt-28 px-6 py-3 ">
        <div className='flex flex-col center justify-center gap-2 '>
     <h1 className="text-center text-3xl font-mono font-semibold text-red-500 mt-3 w-fit  border-b-2 border-green-500">Log<span className='text-green-500 border-b-2 border-red-500'>in</span></h1>
     <img src={logo} className="w-36" alt="Logo" /> 
    </div>
     <UserLogin/>
    </div>
    </div>

    </>

}