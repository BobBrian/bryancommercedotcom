"use client"
import React from 'react'
import { PopoverTrigger, Popover } from '@/components/ui/popover'
import { Store } from '@prisma/client'
import { UseStoreModal } from '@/hooks/UseStoreModal'
import {useParams, useRouter} from "next/navigation"
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { PopoverContent } from '@radix-ui/react-popover'
import { Check, ChevronsUpDown ,PlusCircle,Store as StoreIcon } from 'lucide-react'
import { useState } from 'react'
import { Command, CommandEmpty, CommandGroup, 
    CommandInput, CommandItem, CommandList,
    CommandSeparator
} from '@/components/ui/command'


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

//renders the items inside the store trigger
interface StoreSwitcherProps extends PopoverTriggerProps{
    items:Store[]
}

function StoreSwitcher({className, items =[]}:StoreSwitcherProps) {

    const storeModal = UseStoreModal()
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map((items) =>({
        label: items.name,
        value: items.id
    }))

    const currentStore = formattedItems.find((item) => item.value === params.storeId)

    const [open, Setopen] = useState(false)

    const onStoreSelect = (store: {value:string, label:string}) =>{
        Setopen(false)
        router.push(`/${store.value}`)
    }

  return (
    <Popover open={open} onOpenChange={Setopen}>
        <PopoverTrigger>
            <Button variant="outline" 
            size="sm"  role='combobox' 
            aria-expanded={open} aria-label="Select a Store"
            className={cn("w-[200px] justify-between", className)}>
                <StoreIcon className="mr-2 h-4"/>
                {currentStore?.label}
                <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50'/>
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <Command>
                <CommandList>
                    <CommandInput placeholder='Search Store...'/>
                    <CommandEmpty>No Store Found</CommandEmpty>
                    <CommandGroup heading="Stores">
                        {formattedItems.map((store) =>(
                            <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className='text-sm'>
                                <StoreIcon/>
                                {store.label}
                                <Check className={cn(
                                    "ml-auto h-4 w-4",
                                    currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                                )}/>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
                <CommandSeparator>
                    <CommandList>
                        <CommandGroup>
                        <CommandItem onSelect={() =>{
                                Setopen(false)
                                storeModal.onOpen()
                            }}>
                            <PlusCircle className="mr-2 h-5 w-5"/>
                                Create Store
                        </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </CommandSeparator>
            </Command>
        </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher