"use client"
import React, { useEffect , useState} from 'react'
import { Button } from '@/components/ui/button'
import { ImagePlusIcon, Trash } from 'lucide-react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps{
    disabled?: boolean,
    onChange: (value:string) => void,
    onRemove: (value:string) => void,
    value: string[]

}

const ImageUpload:React.FC<ImageUploadProps> = ({disabled, onChange,onRemove,value}) => {
    const [ismounted,SetIsmounted] = useState(false)

    useEffect(() =>{
        SetIsmounted(true)

    },[])

    if(!ismounted){
        return null
    }

    const onUpload = (result:any) =>{
        onChange(result.info.secure_url)
    }


  return (
    <div>
        <div className="mb-4 flex items-center gap-4">
            {value.map((url) =>(
                <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <div className="z-10 absolute top-2 right-2">
                        <Button type='button' onClick={() => onRemove(url) } variant="destructive" size="icon">
                            <Trash className="h-4 w-4"/>
                        </Button>
                    </div>
                    <Image
                    fill
                    className="object-cover"
                    alt='image'
                    src={url}
                    />
                </div>
            ))}

        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset='mxlh60xv'>
            {({open})=>{
                const onClick = () =>{
                    open()
                }

                return(
                    <Button type='button' disabled={disabled} variant="secondary" onClick={onClick}>
                        <ImagePlusIcon className='h-4 w-4 mr-2'/>
                        Upload Image
                    </Button>
                )
            }}

        </CldUploadWidget>
    </div>
  )
}

export default ImageUpload