import React from "react";
import AtomText from "../atoms/text.atom";
import { MessageSquareText } from "lucide-react";
import MoleculeReviewBox from "../molecules/comunity_review_box.molecule";
import { TransactionReviewItem } from "@/repositories/r_event";
import MoleculeNoDataBox from "../molecules/no_data_box.molecule";

interface OrganismCommunityReviewsProps {
    transactions: TransactionReviewItem[]
}

const OrganismCommunityReviews: React.FC<OrganismCommunityReviewsProps> = ({ transactions }) => {
    return (
        <section className="w-full mt-10">
            <div className="flex items-center gap-3 mb-6">
                <MessageSquareText className="w-7 h-7 text-primary" />
                <AtomText type="content-title" text='Reviews' extraClass="text-3xl font-semibold text-primary"/>
            </div>
            {
                transactions.length > 0 ? 
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                        {
                            transactions.map((dt, idx) => {
                                if (dt.reviews.length > 0){
                                    return <MoleculeReviewBox key={idx} customer={dt.customer} reviews={dt.reviews}/>
                                }
                            })
                        }
                    </div>
                :
                    <MoleculeNoDataBox title="No review to show" style={{ height: "100px" }} color="gray"/>
            }
        </section>
    )
}

export default OrganismCommunityReviews;
