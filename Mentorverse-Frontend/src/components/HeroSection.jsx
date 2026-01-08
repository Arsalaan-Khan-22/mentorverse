import React from 'react'
import "./HeroSection.css"
import { FaArrowRight } from 'react-icons/fa'

const HeroSection = () => {

    const glassContent = [
        {
            count: "500+",
            desc: "Expert Mentors"
        },
        {
            count: "1000+",
            desc: "Courses Available"
        },
        {
            count: "10K+",
            desc: "Happy Learners"
        }
    ]

    return (
        <div className='hero-section py-20 h-full flex flex-col items-center text-center lg:px-64 md:px-32 sm:px-12 px-6'>
            
            <div className='text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white'>
                <h1 className='mb-2'>
                    Learn from the Best,
                </h1>
                <h1 className='hero-title-2'>
                    Grow with Mentors
                </h1>
            </div>

            <h4 className='text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-3xl mt-10 leading-7 md:leading-10 opacity-95'>
                Connect with expert mentors, enroll in comprehensive courses, and accelerate your learning journey.
            </h4>

            <div className='w-full flex flex-col sm:flex-row justify-center sm:justify-around mt-12 gap-4 sm:gap-2'>
                <button className='hero-button-1 flex justify-center items-center gap-2 w-full sm:w-3xl h-14 text-white font-semibold rounded-xl cursor-pointer'>
                    Start Learning
                    <FaArrowRight className='right-arrow text-sm' />
                </button>
                <button className='hero-button-2 bg-white w-full sm:max-w-64 h-14 font-semibold rounded-xl cursor-pointer flex justify-center items-center gap-2'>
                    Become a Mentor
                    <FaArrowRight className='right-arrow text-sm' />
                </button>
            </div>

            <div className='w-full flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 text-white pt-20'>
                {
                    glassContent.map((glass, index) => (
                        <div 
                            key={index} 
                            className='px-6 py-7 rounded-3xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] hover:scale-103 hover:-translate-y-1 transition-all ease duration-300 hover:bg-[rgba(255,255,255,0.1)] text-center'
                        >
                            <h3 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-6 opacity-95 tracking-wider'>
                                {glass.count}
                            </h3>
                            <p className='text-sm sm:text-base md:text-lg font-medium opacity-95'>
                                {glass.desc}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HeroSection
