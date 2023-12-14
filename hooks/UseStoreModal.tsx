import { create } from 'zustand'

interface UseStoreModalProps{
    isOpen: boolean,
    onOpen: ()=> void,
    onClose: ()=> void
}


export const UseStoreModal = create<UseStoreModalProps> ((set) =>  ({
    isOpen: false,
    onOpen: ()=> set({isOpen:true}),
    onClose: ()=> set({isOpen:false}),
  
}))