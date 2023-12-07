"use client"
import React, { useState } from 'react'
import { Billboard } from '@prisma/client'
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
import ImageUpload from '@/components/ui/imageupload'

interface BillboardFormProps {
    initialData:Billboard | null
}

const formSchema = z.object({
    label: z.string().min(1),
    imageURL: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof formSchema>

export const BillboardForm:React.FC<BillboardFormProps> = ({initialData}) => {

  const [open,Setopen] = useState(false)

  const [loading, Setloading] =useState(false)

  const params = useParams()

  const router = useRouter()

  const title = initialData ? "Edit Billboard" : "Create Billboard"
  const description = initialData ? "Edit a Billboard" : "Add a New Billboard"
  const toastMessage = initialData ? "Billboard Updated" : "Billboard Created"
  const action = initialData ? "Save Changes" : "Create"

  const form = useForm<BillboardFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData || {
        label: '',
        imageURL: ''
    }
  })

  const onSubmit = async(data:BillboardFormValues) =>{
    try {
     Setloading(true)
    //  await axios.patch(`/api/stores/${params.storeId}`,data)
    if(!initialData){
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,data)
        }else{
        await axios.post(`/api/${params.storeId}/billboards`,data)
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
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
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
                <FormField control={form.control} name="imageURL"
                render={({field}) =>(
                <FormItem>
                    <FormLabel>Background Image</FormLabel>
                    <FormControl>
                    <ImageUpload value={field.value ? [field.value]:[]}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
                )}
                />
                <div className="grid grid-cols-3 gap-8">
                    <FormField control={form.control} name="label"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Billboard Label'{...field}/>
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