"use client"
import React from 'react'
import ReactStars from "react-stars"

interface AtomStarInputProps {
    id: string
    value? : number
    handleChange: (value: number) => void
}

const AtomStarInput: React.FC<AtomStarInputProps> = ({ id, handleChange }) => {
    return (
        <div id={id}>
            <ReactStars count={5} onChange={handleChange} size={24} half={false} color2={'#ffd700'}/>
        </div>
    )
}

export default AtomStarInput