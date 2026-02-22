import * as React from 'react'
import AtomText from '../atoms/text.atom'
import OrganismRegisterCustomerForm from './register_customer_form.organism'

interface IOrganismRegisterFormProps {}

const OrganismRegisterForm: React.FunctionComponent<IOrganismRegisterFormProps> = () => {
    return (
        <div className='container max-w-[540px]'>
            <AtomText type='title' text='Welcome to EventKu' extraClass='mb-0'/>
            <AtomText type='sub-title-small' text='Create your account and start your journey 😉'/>
            <hr className='mt-2 mb-10'/>
            <OrganismRegisterCustomerForm/>
        </div>
    )
}

export default OrganismRegisterForm