"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { BillboardColumn, Columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

interface BillboardClientProps{
  data: BillboardColumn[]
}

export const BillboardClient:React.FC<BillboardClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()

    

  return (
    <>
      <div className="flex items-center justify-between">
            <Heading title={`Billboard (${data.length})`} description='Manage the Billboards of Stores'/>
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
        </div>
      <Separator/>

      <DataTable searchKey="label" columns={Columns} data={data}/>
        
    </>
  )
}
