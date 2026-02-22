import React from 'react'
import AtomText from '../atoms/text.atom'
import AtomStarList from '../atoms/star_list.atom'

interface MoleculeFeedbackBoxProps {
    name: string
    feedback: string
    rate: number
    idx: number
}

const MoleculeFeedbackBox: React.FC<MoleculeFeedbackBoxProps> = ({ name, feedback, rate, idx }) => {
    const positionClass = idx === 1 ? 'self-start' : 'self-end'

    return (
        <div className={`container mb-10 ${positionClass}`}>
            <AtomText type='content' text={<>“{feedback}”</>}/>
            <div className='mt-6 text-center'>
                <AtomText type='sub-title-small' text={name}/>
                <div className='mt-2'>
                    <AtomStarList value={rate}/>
                </div>
            </div>
        </div>
    )
}

export default MoleculeFeedbackBox
