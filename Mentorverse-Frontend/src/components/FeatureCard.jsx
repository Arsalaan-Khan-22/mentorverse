import React from 'react'

const FeatureCard = ({icon, title, desc}) => {
  return (
    <div className="feature-card flex flex-col gap-6 bg-white px-6 py-10 border border-[#e2e8f0] rounded-3xl w-full hover:shadow-lg transition-all duration-300">
      <div className="features-icon mx-auto w-20 h-20 flex justify-center items-center rounded-full text-white text-3xl bg-(--primary-color)">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold">{title}</h3>
      <p className="text-sm sm:text-base text-[#475569] px-2 leading-6 sm:leading-7">
        {desc}
      </p>
    </div>
  )
}

export default FeatureCard