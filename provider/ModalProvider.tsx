"use client"
import React from 'react'
import { useEffect, useState } from "react"
import { StoreModal } from '@/components/modals/StoreModal'


export const ModalProvider = () => {
    const [isMounted, setIsMouted] = useState(false)

    useEffect(() =>{
        setIsMouted(true)
    },[])

    
    if(!isMounted){
        return null
    }

  return (
    <>
    <StoreModal/>
    </>
  )
}
