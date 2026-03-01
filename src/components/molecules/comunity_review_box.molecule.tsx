import React from "react";
import AtomText from "../atoms/text.atom";
import { Star } from "lucide-react";
import { convertUTCToLocal } from "@/helpers/converter.helper";
import { TransactionReviewItem } from "@/repositories/r_event";

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
    )
}

const MoleculeReviewBox: React.FC<TransactionReviewItem> = ({ reviews, customer }) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <AtomText type="content-title" text={customer.username} extraClass="text-3xl font-semibold text-primary leading-tight"/>
                    <AtomText type="sub-content" text={convertUTCToLocal(reviews[0].created_at)} extraClass="text-gray-500"/>
                </div>
                {renderStars(reviews[0].review_rate)}
            </div>
            <AtomText type="content" text={reviews[0].review_body} extraClass="text-gray-600 mt-5"/>
        </div>
    )
}

export default MoleculeReviewBox;
