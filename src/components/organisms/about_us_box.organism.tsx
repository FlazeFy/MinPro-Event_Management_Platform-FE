import * as React from 'react'
import AtomText from '../atoms/text.atom';

interface IOrganismsAboutUsBoxProps {}

const OrganismsAboutUsBox: React.FunctionComponent<IOrganismsAboutUsBoxProps> = () => {
    return (
        <div className="max-w-[720px] w-full mt-[10vh] p-5 pb-20 lg:p-10 lg:pb-40 text-center mx-auto">
            <AtomText type='title-huge' text="EventKu" extraClass='mb-0'/>
            <AtomText type='content' text="EventKu is a platform where you can find events across various categories. You can also discover recommended and trending events, along with many promotions. With just one transaction, you can book tickets for multiple people. Explore professional event organizers and the exciting events they have to offer." extraClass='mb-10'/>
        </div>
    )
}

export default OrganismsAboutUsBox;
