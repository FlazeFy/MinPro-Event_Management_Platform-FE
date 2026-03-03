"use client"
import React, { useState } from "react"
import AtomText from "../atoms/text.atom"
import { Button } from "../ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"

interface IOrganismEventImagePickerProps {
    label: string
    maxSize: number
    value?: File | null 
    onFileSelect?: (file: File | null) => void
}

const OrganismEventImagePicker: React.FC<IOrganismEventImagePickerProps> = ({ label, maxSize, value, onFileSelect }) => {
    const [preview, setPreview] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validation file type
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
        if (!allowedTypes.includes(file.type)) {
            setError("Only JPG, JPEG, PNG, and GIF files are allowed.")
            setPreview(null)
            onFileSelect?.(null)
            return
        }

        // Validation size
        const maxSizeFinal = maxSize * 1024 * 1024
        if (file.size > maxSizeFinal) {
            setError("File size must not exceed 10 MB.")
            setPreview(null)
            onFileSelect?.(null)
            return
        }

        setError(null)
        onFileSelect?.(file)
        // Set preview
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result as string)
        reader.readAsDataURL(file)
    }

    const handleReset = () => {
        setPreview(null)
        setError(null)
        onFileSelect?.(null)
    }

    return (
        <div className="flex flex-col w-full">
            <AtomText type="label" text={label}/>
            <div className="bg-gray-100 p-5 flex flex-col items-center">
                <div className={`${ preview ? 'w-full h-full' : 'w-32 h-32' } rounded-lg flex items-center justify-center overflow-hidden relative mb-5`}>
                    <Image src={preview ?? `/images/camera.png`} alt={preview ?? `/images/camera.png`} width={100} height={100} className="w-full h-full object-cover"/>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="default" asChild>
                        <label className="cursor-pointer flex items-center gap-2 text-white">
                            <FontAwesomeIcon icon={faCamera}/> Upload Photo
                            <input type="file" accept=".jpg,.jpeg,.png,.gif" className="hidden" onChange={handleFileChange}/>
                        </label>
                    </Button>
                    { preview && <Button type="button" variant="destructive" onClick={handleReset}><FontAwesomeIcon icon={faTrash}/></Button> }
                </div>
                <div className="mt-2 text-center bg-blue-100 p-5 rounded-xl w-full">
                    <AtomText type="content" text="Allowed file types: JPG, JPEG, PNG, GIF" />
                    <AtomText type="content" text="Max size: 10 MB" />
                </div>
                { error && <AtomText type="content" extraClass="text-red-500 mt-2" text={error}/> }
            </div>
        </div>
    )
}

export default OrganismEventImagePicker
