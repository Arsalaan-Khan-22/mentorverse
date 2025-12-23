import React from 'react'

const FeatureCard = ({icon, title, desc}) => {
    return (
        <>
            <div className='feature-card flex flex-col gap-7 bg-white px-5 py-13 border border-[#e2e8f0] rounded-3xl w-full'>
                <div className='features-icon mx-auto text-4x w-20 h-20 flex justify-center items-center rounded-full text-white text-3xl'>
                    {icon}
                </div>
                <h3 className='text-2xl font-bold'>{title}</h3>
                <p className='text-base text-[#475569] px-2 leading-7'>{desc}</p>
            </div>
        </>
    )
}

export default FeatureCard
