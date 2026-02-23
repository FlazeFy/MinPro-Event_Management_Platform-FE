"use client"
import React, { useState } from "react"
import Image from "next/image"

interface IOrganismEditImagePickerPickerProps {
    maxSize: number
    profilePic: string | null
    value?: File | null 
    onFileSelect?: (file: File | null) => void
}

const OrganismEditImagePickerPicker: React.FC<IOrganismEditImagePickerPickerProps> = ({ maxSize, value, onFileSelect, profilePic }) => {
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

    const displayImage = preview || profilePic || "/images/user.png"

    return (
        <>
            <div className="relative w-32 h-32 rounded-2xl bg-white overflow-hidden border-4 border-white shadow-md rounded-full">
                <Image src={displayImage} alt="Profile picture" width={128} height={128} className="w-full h-full object-cover rounded-2xl"/>
            </div>
            <label className="absolute bottom-0 right-0 cursor-pointer p-1 rounded-full w-10 h-10 text-white bg-primary shadow-xl">
                <Image src={'/images/camera.png'} alt="/images/camera.png" width={128} height={128} className="w-full h-full object-cover rounded-2xl"/><input type="file" accept=".jpg,.jpeg,.png,.gif" className="hidden" onChange={handleFileChange}/>
            </label>
        </>
       
    )
}

export default OrganismEditImagePickerPicker