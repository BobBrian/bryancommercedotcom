"use client"
import React, { useState } from 'react'
import { Store } from '@prisma/client'
import { Heading } from '@/components/ui/Heading'
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
import { AlertModal } from '@/components/Modals/AlertModal'

interface SettingFormProps {
    initialData:Store
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingFormValues = z.infer<typeof formSchema>

export const SettingForm:React.FC<SettingFormProps> = ({initialData}) => {

    const [open,Setopen] = useState(false)
    const [loading, Setloading] =useState(false)
    const params = useParams()
    const router = useRouter()

    const form = useForm<SettingFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData
    })

    const onSubmit = async(data:SettingFormValues) =>{
        try {
            Setloading(true)
            await axios.patch(`/api/stores/${params.storeId}`,data)
            router.refresh()
            toast.success("Store Updated")
            
           } catch (error) {
            toast.error("Something Went Wrong")
        
           }finally{
            Setloading(false)
        }
    }

    const onDelete = async() =>{
        try {
            Setloading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push("/")
            toast.success("Store Deleted")
            
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
        <Heading title='Settings' description='Manage Store Prefrences'/>
            <Button variant="destructive" size="icon" onClick={()=>Setopen(true)}>
                <Trash className="h-4 w-4"/>
            </Button> 
        </div>
        <Separator/>
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField control={form.control} name="name"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Store Name'{...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type='submit'>
                    Save Changes
                </Button>
            </form>

        </Form>
    </>
  )
}
