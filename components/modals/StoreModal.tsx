"use client"
import React from 'react'
import { useState } from "react"
import { UseStoreModal } from '@/hooks/UseStoreModal'
import Modal from '@/components/ui/Modal'
import * as z from "zod"
import { Form , FormControl, FormField, FormItem, FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
  const storeModal = UseStoreModal()
  const [loading, SetLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:""
    }
  })

  const onSubmit = async (values:z.infer<typeof formSchema>) => {
      try {
        SetLoading(true)
        const response = await axios.post('/api/stores/', values)
       window.location.assign(`/${response.data.id}`)
       toast.success("Store Created")
          
      } catch (error) {
        toast.error("Something Went Wrong")
      } finally{
        SetLoading(false)
      }
      console.log(values)   
  }

  return (
   <Modal title="Create  A Store" description="Add a New Store to Manage Produts and Categories" 
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}>
    <div>
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control}name="name" render={({field}) =>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Title" {...field} disabled={loading}/>
                  </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
                <div className="pt-6 space-x-2 flex items-center justify-end">
                    <Button variant="outline" onClick={storeModal.onClose} disabled={loading}>Close</Button>
                    <Button disabled={loading} type="submit">Continue</Button>
                </div>
           </form>
        </Form>
      </div>
    </div>

   </Modal>
  )
}
