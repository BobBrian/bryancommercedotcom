
import React from 'react'
import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from "next/navigation"
import prismadb from '@/lib/prismadb'
import NavigationRoutes from './NavigationRoutes'
import StoreSwitcher from './StoreSwitcher'

const NavigationBar = async () => {
    const {userId} = auth()

    if(!userId){
        redirect("/sign-in")
    }

    const stores = await prismadb.store.findMany({
        where:{
            userId
        }
    })

  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
            <StoreSwitcher />
            <NavigationRoutes/>
            <div className="ml-auto flex items-center space-x-4">
                <UserButton afterSignOutUrl='/'/>

            </div>
        </div>   
    </div>
  )
}

export default NavigationBar