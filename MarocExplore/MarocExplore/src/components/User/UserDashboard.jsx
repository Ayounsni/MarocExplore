import { Link } from "react-router-dom";
import '../../index.css'; 
import { useEffect } from "react";
import UserApi from '../../services/Api/User/UserApi';
import logo from "../../assets/kamels.png";
import { useUserContext } from '../../context/UserContext';
import axiosClient from "../../api/axios";
// import {  useUserContext } from "../context/UserContext"
// import UserApi from "../services/Api/User/UserApi";


export default function UserDashboard(){
  // const {setUser} = useUserContext()
  const{ categories, setCategories, itin, setItin} = useUserContext();
useEffect(() => {
    UserApi.getCat().then(({data})=> {
        console.log(data);
        setCategories(data);
    }).catch(() =>{
              
    })

    
}, [setCategories]);

useEffect(() => {
  UserApi.getItin().then(({data})=> {
    console.log(data);
    setItin(data);
}).catch(() =>{
          
})
}, [setItin])

const deleteItin = (id) => {
  axiosClient.delete('/api/deleteroute/'+ id).then(function(response){
    console.log(response);
    window.location.reload();
    alert('itineraire supprimer');


  }).catch(({response}) => { 
    console.log(response)  
    alert('Vous n avez pas le droit de supprimer cette Itineraire');    
  
});
}
const favoris = (id) => {
  axiosClient.get('/api/addfavoris/'+ id).then(function(response){
    console.log(response);
    
    alert('itineraire ajoute au favoris avec succes');


  }).catch(({response}) => { 
    console.log(response.data.message)  
    alert(response.data.message);    
  
});
}


    return (
        <>    

      <div className="px-28">
        <div className='flex justify-center scale'>
        <h2 className='text-4xl text-center mt-4 text-gray-50 bg-red-500 px-3 py-1 rounded-sm w-fit fw-medium '>ITINERAIRE</h2>
      </div>
      { itin.length > 0 && ( itin.map(itine => (
      <div key={itine.id} className="bg-gray-100 mb-3 px-10 py-4 shadow-md rounded-lg mt-8" >
        <div className="flex justify-end gap-2">
                          <button onClick={() => favoris(itine.id)} className="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 text-center ">Favoris</button>
                                <Link to={`editroute/${itine.id}`}>
                            <button className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center ">Modifier</button>
                              </Link>
  
                            <button onClick={() => deleteItin(itine.id)} className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center ">Supprimer</button>


                        </div>
        <h1 className="text-3xl  text-center font-bold text-gray-600">Itinéraire {itine.titre}</h1>
        <div className="flex justify-center items-center">
          <img src={logo} className="w-96" alt="Logo" />
        </div>
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Catégorie : <span className="text-red-500">{itine.categorie?.nom}</span></p>
          <p className="text-xl font-semibold">Durée : <span className="text-red-500">{itine.dure}  jours</span></p>
        </div>
        <div className="flex flex-wrap justify-evenly my-5">
        { itine.destinations && itine.destinations.map(destination => (
        <div key={destination.id} className="flex flex-col px-3 py-2 mt bg-gray-300 w-2/12 mt-4 rounded-md shadow-md">
           <p className="text-center font-semibold text-lg "> {destination.nom} </p>
           <p className="">Lieu : <span className="text-red-500">{destination.lieu}</span></p>
           <p className="">Endroit : <span className="text-red-500">{destination.endroit}</span></p>
           <p className="">Plat : <span className="text-red-500">{destination.plat}</span></p>
           <p className="">Activité : <span className="text-red-500">{destination.activite}</span></p>
        </div>
            ))}


      </div>
      </div>
    )))}
      </div>
        </>
    );
}

