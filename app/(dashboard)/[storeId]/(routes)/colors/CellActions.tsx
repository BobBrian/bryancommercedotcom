"use client"
import React from 'react'
import { useState } from 'react'
import { BillboardColumn } from './Column'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Edit , Copy, Trash} from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import { AlertModal } from '@/components/modals/AlertModal'

interface CellActionsProps{
    data: BillboardColumn
}

export const CellActions:React.FC<CellActionsProps> = ({data}) => {

    const [open,Setopen] = useState(false)
    const [loading, Setloading] =useState(false)
    const router = useRouter()
    const params = useParams()

    const onCopy = (id:string) =>{
        navigator.clipboard.writeText(id)
        toast.success("BillBoard ID Copied to the Clipboard")
    }

    const onDelete = async () =>{
        try {
          Setloading(true)
          await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
          router.refresh()
          router.push("/")
          toast.success("Billboard Deleted")
          
        } catch (error) {
          toast.error("Make sure you removed all  categories using the billboard first")
        }finally{
          Setloading(false)
          Setopen(false)
        }
      }


  return (
    <>
    <AlertModal isOpen={open} onClose={() => Setopen(false)} onConfrm={onDelete} loading={loading}/>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.id)}>
                <Copy className="mr-2 h-4 w-4"/>
                Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
                <Edit className="mr-2 h-4 w-4"/>
                Update
            </DropdownMenuItem>
            <DropdownMenuItem  onClick={() => Setopen(true)}>
                <Trash className="mr-2 h-4 w-4"/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
  
}