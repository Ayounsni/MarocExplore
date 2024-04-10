import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
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
import { axiosClient } from "../../api/axios"
import { USER } from "../../router/index";
 
const formSchema = z.object({
  email: z.string().email().min(2).max(30),
  password: z.string().min(8).max(30),
})


export default function UserLogin(){
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password:"",
        },
      })
    //   function onSubmit(values) {
    //     const axios = axiosClient.defaults
    //     console.log(values,axios)
    //   }
    //   const onSubmit = async values => {
    //     await axiosClient.get('sanctum/csrf-cookie')
    //     const data = await axiosClient.post('/api/login', values)
    //     console.log(data)
    //   };

      const {setError, formState: {isSubmitting}} = form

      const onSubmit = async values => {
        await axiosClient.get('sanctum/csrf-cookie')
         await axiosClient.post('/api/login', values).then(
          (value) => {
            if (value.status === 201) {
              navigate(USER);
            }
          }).catch(({response}) => { 
            console.log(response.data.message)      
          setError('email', {
            message: response.data.message
          })
        })
      }

    return <>

<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={"password"} placeholder="Enter Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
                <Button className={'mt-2 '} disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {' '} Login
        </Button>
        </div>
      </form>
    </Form>
    
    </>
}