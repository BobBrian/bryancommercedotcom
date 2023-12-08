"use client"
import React, { useState } from 'react'
import { Size } from '@prisma/client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import toast from 'react-hot-toast'
import axios from 'axios'
import { AlertModal } from '@/components/modals/AlertModal'

interface SizeFormProps {
    initialData:Size | null
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type SizeFormValues = z.infer<typeof formSchema>

export const SizeForm:React.FC<SizeFormProps> = ({initialData}) => {

  const [open,Setopen] = useState(false)

  const [loading, Setloading] =useState(false)

  const params = useParams()

  const router = useRouter()

  const title = initialData ? "Edit Size" : "Create Size"
  const description = initialData ? "Edit a Size" : "Add a New Size"
  const toastMessage = initialData ? "Size Updated" : "Size Created"
  const action = initialData ? "Save Changes" : "Create"

  const form = useForm<SizeFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData || {
        name: '',
        value: ''
    }
  })

  const onSubmit = async(data:SizeFormValues) =>{
    try {
     Setloading(true)
    //  await axios.patch(`/api/stores/${params.storeId}`,data)
    if(!initialData){
        await axios.patch(`/api/${params.storeId}/sizes/${params.billboardId}`,data)
        }else{
        await axios.post(`/api/${params.storeId}/sizes`,data)
    }
     router.refresh()
     toast.success(toastMessage)
     
    } catch (error) {
     toast.error("Something Went Wrong")
 
    }finally{
     Setloading(false)
    }
   }

   const onDelete = async () =>{
    try {
      Setloading(true)
      await axios.delete(`/api/${params.storeId}/sizes/${params.billboardId}`)
      router.refresh()
      router.push(`/${params.storeId}/sizes`)
      toast.success("Billboard Deleted")
      
    } catch (error) {
      toast.error("Make sure you removed all products and categories first")
    }finally{
      Setloading(false)
      Setopen(false)
    }
  }

  return (
    <>
        <AlertModal isOpen={open} onClose={() => Setopen(false)} onConfrm={onDelete} loading={loading}/>
        <div className="flex items-center justify-between">
            <Heading title={title} description={description}/>
            <Button variant="destructive" size="icon" onClick={()=>Setopen(true)}>
                <Trash className="h-4 w-4"/>
            </Button>   
        </div>

        <Separator/>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
               
                <div className="grid grid-cols-3 gap-8">
                <FormField control={form.control} name="name"render={({field}) =>(
                <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input disabled={loading} placeholder='Size Name'{...field}/>
                        </FormControl>
                        <FormMessage/>
                </FormItem>
                )}
                />
                <FormField control={form.control} name="value"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Value</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Size Value'{...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type='submit'>
                    {action}
                </Button>
            </form>
        </Form>
    </>
  )
}