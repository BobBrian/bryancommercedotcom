"use client"
import React, { useState } from 'react'
import { Billboard, Category } from '@prisma/client'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1)
})

type CategoryFormValues = z.infer<typeof formSchema>


interface CategoryFormProps {
  initialData:Category | null;
  billboards:Billboard[]
}

export const CategoryForm:React.FC<CategoryFormProps> = ({initialData,billboards}) => {

  const [open,Setopen] = useState(false)

  const [loading, Setloading] =useState(false)

  const params = useParams()

  const router = useRouter()

  const title = initialData ? "Edit Category" : "Create Category"
  const description = initialData ? "Edit a Category" : "Add a New Category"
  const toastMessage = initialData ? "Category Updated" : "Category Created"
  const action = initialData ? "Save Changes" : "Create"

  const form = useForm<CategoryFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData || {
      name: '',
      billboardId: ''
    }
  })

  const onSubmit = async(data:CategoryFormValues) =>{
    try {
     Setloading(true)
    if(!initialData){
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`,data)
        }else{
        await axios.post(`/api/${params.storeId}/categories`,data)
    }
        router.refresh()
        router.push(`/api/${params.storeId}/categories`)
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
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
      router.refresh()
      router.push(`/${params.storeId}/categories`)
      toast.success(toastMessage)
      
    } catch (error) {
      toast.error("Make sure you removed all products and category first")
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
                    <FormField control={form.control} name="name"
                        render={({field}) =>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input disabled={loading} placeholder='Category Name'{...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>)}/>
                    <FormField control={form.control} name="billboardId"render={({field}) =>(
                    <FormItem>
                            <FormLabel>Billboard</FormLabel>
                            <Select disabled={loading} onValueChange={field.onChange}
                            value={field.value} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger >
                                <SelectValue defaultValue={field.value} placeholder='Select a Billboard'/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {billboards.map((item) =>(
                                <SelectItem key={item.id} value={item.id}>
                                    {item.label}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage/>
                    </FormItem>)}/>
               </div>
                <Button disabled={loading} className="ml-auto" type='submit'>
                    {action}
                </Button>
            </form>
        </Form>
    </>
  )
}