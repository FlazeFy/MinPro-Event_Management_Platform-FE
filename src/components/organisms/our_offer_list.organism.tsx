import * as React from 'react'
import AtomText from '../atoms/text.atom';
import { faCalendar, faCheckCircle, faUser, } from '@fortawesome/free-solid-svg-icons';
import MoleculeOfferBox from '../molecules/our_offer_box.molecule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IOrganismOurOfferListProps {}

const OrganismOurOfferList: React.FunctionComponent<IOrganismOurOfferListProps> = () => {
    return (
        <div className="w-full p-5 pb-20 lg:p-10 lg:pb-40 text-center">
            <AtomText type='title-huge' text="What We Do?" extraClass='mb-0'/>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-5">
                    <MoleculeOfferBox icon={faCalendar} title="Explore Events"
                        content={
                            <ul>
                                <li className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} height={18} className="text-green-600" /> Browse many events</li>
                                <li className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} height={18} className="text-green-600" /> See trending events</li>
                                <li className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} height={18} className="text-green-600" /> Stay informed about events on sale</li>
                                <li className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} height={18} className="text-green-600" /> View event details and public feedback</li>
                                <li className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} height={18} className="text-green-600" /> Get event recommendations based on user preferences</li>
                            </ul>
                        }/>
                </div>
                <div className="w-full md:w-1/2 p-5">
                    <MoleculeOfferBox icon={faUser} title="Find Your Favorite EO"
                        content={
                            <ul>
                                <li className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} height={18} className="text-green-600" /> See the EO’s event trends</li>
                                <li className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} height={18} className="text-green-600" /> Get personalized recommendations</li>
                                <li className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} height={18} className="text-green-600" /> Leave a review for events</li>
                                <li className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} height={18} className="text-green-600" /> View event details and public feedback</li>
                                <li className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} height={18} className="text-green-600" /> Get discounts using coupons, points exchange, or referral code</li>
                            </ul>
                        }/>
                </div>
            </div>
            <AtomText type='title' text="Get extra points if someone use your referall code!" extraClass='mt-10'/>
        </div>
    )
}

export default OrganismOurOfferList;
