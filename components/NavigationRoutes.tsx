"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import {usePathname, useParams} from "next/navigation"
import Link from "next/link"

function NavigationRoutes({className, ...props}:React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            href: `/${params.storeId}`,
            label: "Overview",
            active: pathname === `/${params.storeId}`

        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboards",
            active: pathname === `/${params.storeId}/billboards`

        },
        {
            href: `/${params.storeId}/categories`,
            label: "Category",
            active: pathname === `/${params.storeId}/categories`

        },
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/setting`

        }
    ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
        {routes.map((route)=>(
            <Link key={route.href} href={route.href} 
            className={cn("text-sm font-medium transition-colors hover:text-primary",
            route.active?"text-black dark-text":"text-muted-foreground")}>
                {route.label}
            </Link>
        ))}
    </nav>
  )
}

export default NavigationRoutes