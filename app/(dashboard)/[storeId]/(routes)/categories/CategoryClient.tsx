"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { CategoryColumn , Columns} from './Column'
import { DataTable } from '@/components/ui/datatable'

interface CategoryClientProps{
  data: CategoryColumn[]
}

export const CategoryClient:React.FC<CategoryClientProps> = ({data}) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Category (${data.length})`} description='Manage the Categories of Stores'/>
            <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={Columns} data={data}/>
    </>
  )
}

