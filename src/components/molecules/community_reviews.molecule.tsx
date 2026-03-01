import React from "react";
import AtomText from "../atoms/text.atom";
import { MessageSquareText, Star } from "lucide-react";
import Image from "next/image";

interface ReviewItem {
    name: string
    timeAgo: string
    rating: number
    review: string
    avatar?: string
}

interface MoleculeCommunityReviewsProps {
    title?: string
    reviews?: ReviewItem[]
}

const defaultReviews: ReviewItem[] = [
    {
        name: "Alex Chen",
        timeAgo: "2 days ago",
        rating: 5,
        review:
            '"The last event by Nexus was mind-blowing. The organization was top-notch and the speakers were actual practitioners, not just theorists."',
        avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "Sarah Miller",
        timeAgo: "1 week ago",
        rating: 4.5,
        review:
            "\"Great value for money. If you're looking to network in the tech space, this is where you need to be.\"",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    },
];

const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: fullStars }).map((_, index) => (
                <Star key={`full-${index}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            {hasHalf && <Star className="w-4 h-4 fill-yellow-300 text-yellow-400" />}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <Star key={`empty-${index}`} className="w-4 h-4 text-yellow-400" />
            ))}
        </div>
    );
};

const MoleculeCommunityReviews: React.FC<MoleculeCommunityReviewsProps> = ({ title = "Community Reviews", reviews = defaultReviews }) => {
    return (
        <section className="w-full mt-10">
            <div className="flex items-center gap-3 mb-6">
                <MessageSquareText className="w-7 h-7 text-primary" />
                <AtomText
                    type="content-title"
                    text={title}
                    extraClass="text-3xl font-semibold text-primary"
                />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {
                    reviews.map((item, idx) => (
                        <div key={idx} className="rounded-3xl border border-secondary/30 bg-white p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary/20 shrink-0">
                                        <Image src={item.avatar ?? "/images/user.png"} alt={item.avatar ?? "/images/user.png"} className="w-full h-full object-cover" width={100} height={100}/>
                                    </div>
                                    <div>
                                        <AtomText type="content-title" text={item.name} extraClass="text-3xl font-semibold text-primary leading-tight"/>
                                        <AtomText type="sub-content" text={item.timeAgo} extraClass="text-gray-500"/>
                                    </div>
                                </div>
                                {renderStars(item.rating)}
                            </div>
                            <AtomText type="content" text={item.review} extraClass="text-gray-600 text-xl leading-relaxed mt-5"/>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default MoleculeCommunityReviews;
