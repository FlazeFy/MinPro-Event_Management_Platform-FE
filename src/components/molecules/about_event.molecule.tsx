import React from 'react';
import { Button } from '../ui/button';
import AtomText from '../atoms/text.atom';
import MoleculeShortProfileBox from './short_profile_box.molecule';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface MoleculeAboutEventProps {
    image: string
    category: string
    isHotEvent?: boolean
    title: string
    organizer: {
        name: string
        image?: string
    }
    rating: number
    reviews: number
    description: string
}

const MoleculeAboutEvent: React.FC<MoleculeAboutEventProps> = ({
    image,
    category,
    isHotEvent = false,
    title,
    organizer,
    rating,
    reviews,
    description
}) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Banner Section */}
            <div className="relative w-full h-75 md:h-100 rounded-2xl overflow-hidden">
                <Image src={image} alt={title} fill className="object-cover"/>
                {/* Badges/Buttons Overlay */}
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <Button variant="secondary" className="bg-white/90 text-primary hover:bg-white rounded-full text-xs font-semibold px-4">
                        {category}
                    </Button>
                    {isHotEvent && (
                        <Button className="bg-primary text-white hover:bg-primary/90 rounded-full text-xs font-semibold px-4 border-none shadow-none">
                            HOT EVENT
                        </Button>
                    )}
                </div>

                {/* Gradient Overlay (Optional for better text visibility if text was on image, but here it's cleaner without strong gradient unless design implies it) */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            {/* Title Section */}
            <div>
                <AtomText type="title-huge" text={title} extraClass="text-3xl md:text-5xl font-bold text-primary mb-4" />
                {/* Organizer and Rating Molecules Row */}
                <div className="flex flex-col md:flex-row gap-6 md:items-center mt-4">
                    {/* Organized By Molecule */}
                    <div className="min-w-50">
                        <MoleculeShortProfileBox
                            title={organizer.name}
                            description="Organized by"
                            image={organizer.image}
                            descriptionClassName="text-gray-500"
                        />
                    </div>
                    {/* Rating Molecule */}
                    <div className="flex items-center gap-3 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-primary">{rating}</span>
                            <span className="text-sm text-gray-500">({reviews} Reviews)</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* About Section */}
            <div className="mt-4 space-y-3">
                <AtomText type="content-title" text="About the Event" extraClass="text-2xl font-semibold flex items-center gap-2" />
                {/* Description Text */}
                <div className="text-gray-600 leading-relaxed text-lg">
                    <AtomText type="content" text={description} />
                </div>
            </div>
        </div>
    );
};

export default MoleculeAboutEvent;
