"use client"
import React, { useEffect } from 'react'
import { UseStoreModal } from '@/hooks/UseStoreModal'

export default function Home() {
  const onOpen = UseStoreModal((state) => state.onOpen)
  const isOpen = UseStoreModal((state) => state.isOpen)

  useEffect(() =>{
    if(!isOpen){
      onOpen()
    }
  },[isOpen, onOpen])

  return null;
}
