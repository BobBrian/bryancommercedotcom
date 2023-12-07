"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/Modal'

interface AlertModalProps {
    isOpen:boolean,
    onClose: () => void,
    onConfrm: () => void,
    loading:boolean

}

export const AlertModal:React.FC<AlertModalProps> = ({isOpen,onClose, onConfrm,loading}) => {
    const [isMounted, SetIsMounted] = useState(false)

    useEffect(() => {
        SetIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }


  return (
    <Modal  title="Are you Sure ?" description="This Action Cannot be Undone" 
    isOpen={isOpen} onClose={onClose}>
        <div className="pt-6 space-x-2 flex items-center justify-end w-full"> 
        <Button disabled={loading} variant="outline" onClick={onClose}>
           Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onClose}>
           Continue
        </Button>

        </div>
    </Modal>
  )
}
