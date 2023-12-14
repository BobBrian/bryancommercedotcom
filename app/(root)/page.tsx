"use client"
import React from 'react'
import { UserButton } from "@clerk/nextjs";
import Modal from '@/components/ui/Modal';

export default function Home() {
  return (
    <div>
      <Modal title='Test' description='Test Desc' isOpen onClose={() => {}}>
        Children
      </Modal>
    </div>
  )
}
