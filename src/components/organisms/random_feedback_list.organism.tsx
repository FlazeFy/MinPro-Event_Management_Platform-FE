import * as React from 'react'
import AtomText from '../atoms/text.atom';
import MoleculeFeedbackBox from '../molecules/feedback_box.molecule';

interface IOrganismRandomFeedbackListProps {}

const OrganismRandomFeedbackList: React.FunctionComponent<IOrganismRandomFeedbackListProps> = () => {
    return (
        <div className="w-full mt-[10vh] p-5 pb-20 lg:p-10 lg:pb-40 text-center">
            <AtomText type='title-huge' text="What people say about us" extraClass='mb-10'/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MoleculeFeedbackBox name={'Jhon Doe'} feedback={'Lorem ipsum'} rate={4} idx={0}/>
                <MoleculeFeedbackBox name={'Budi'} feedback={'Lorem ipsum'} rate={3} idx={1}/>
                <MoleculeFeedbackBox name={'Jhon'} feedback={'Lorem ipsum'} rate={4} idx={2}/>
            </div>
            <AtomText type='content-title' text="Join us, and share your experience too" extraClass='text-primary'/>
        </div>
    )
}

export default OrganismRandomFeedbackList;
