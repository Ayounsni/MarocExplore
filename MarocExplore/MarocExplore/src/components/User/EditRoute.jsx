// import { Link } from "react-router-dom";
import '../../index.css'; 
// import { useEffect } from "react";
// import UserApi from '../../services/Api/User/UserApi';
import { useUserContext } from '../../context/UserContext';
// import UserApi from "../services/Api/User/UserApi";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import UserApi from '../../services/Api/User/UserApi';
import { z } from "zod"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axiosClient from '../../api/axios';
import { USER } from '../../router';


const formSchema = z.object({
  titre: z.string().min(2).max(30),
  id_categorie: z.string().min(1).max(30),
  duree: z.string().min(1).max(30),
  image: z.string().min(1).max(30),

})


export default function EditRoute(){
  const navigate = useNavigate()
  const{ user, categories, setCategories, itin ,setItin} = useUserContext();
  useEffect(() => {
    UserApi.getCat().then(({data})=> {
        console.log(data);
        setCategories(data);
    }).catch(() =>{
              
    })
   
}, [setCategories]);

const {id} = useParams();

useEffect(() => {
  getRoute();
 
}, []);

function getRoute(){
  axiosClient.get('/api/routee/'+id).then(({data}) =>{
    console.log(data);
    setItin(data);

  });
}




  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "",
      id_categorie:"",
      dure:"",
      image:"",
    },
  })

  const {setError, formState: {isSubmitting}} = form
  const onSubmit = async values => {
    console.log(values)

     await axiosClient.put('/api/editroute/7', values).then(
      (value) => {
        console.log(value)
        // if (value.status === 200) {
          
        //   navigate(USER);
       
        // }
      }).catch(({response}) => { 
        console.log(response.data.message)      
      setError('titre', {
        message: response.data.message
      })
    })
  }


    return (
        <>   
            <div className="flex justify-center">
    <div className="w-2/6 shadow-lg bg-gray-200 rounded-lg mt-5 px-6 py-3 ">
        <div className='flex flex-col center justify-center gap-2 '>
     <h1 className="text-center text-3xl font-mono font-semibold text-red-500 mt-3 w-fit  border-b-2 border-green-500">Modifier <span className='text-green-500 border-b-2 border-red-500'>Itineraire</span></h1>
    
    </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="titre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl> 
                <Input placeholder="Enter Titre" {...field} value={field.value || itin.titre} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
  control={form.control}
  name="id_categorie"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Categorie</FormLabel>
      <FormControl>
        <select {...field} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value={itin.categorie?.id}  >{itin.categorie?.nom}</option>
          {categories.map(category => (         
          <option key={category.id} value={category.id}>{category.nom}</option>
        ))}
  
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
                <FormField
          control={form.control}
          name="dure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durer</FormLabel>
              <FormControl>
                <Input type={"number"} placeholder="Enter Durer" {...field} value={field.value || itin.dure} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="Enter Titre"  {...field} value={field.value || itin.image} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
                <Button className={'mt-2 '} disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {' '} Modifier
        </Button>
        </div>
      </form>
    </Form>
    </div>
    </div>

      
        </>
    );
}

