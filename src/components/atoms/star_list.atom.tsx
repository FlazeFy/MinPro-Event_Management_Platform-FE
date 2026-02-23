import React from 'react'
import { Star } from "lucide-react"

interface AtomStarListProps {
    value: number
}

const AtomStarList: React.FC<AtomStarListProps> = ({ value }) => {
    return (
        <div className="flex gap-1 justify-center items-center">
            {
                [...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}/>
                ))
            }
        </div>
    )
}

export default AtomStarList