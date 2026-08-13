import React from 'react'

const categories = [
  'Art & creative pieces',
  'Home décor',
  'Fashion & design',
  'Sculptures & decorative pieces',
  'Drawings & visual creations',
  'Selected lifestyle products',
  'Unique and distinctive finds',
]

function WhatWeDo() {
  return (
    <div>
        {/* Hero */}
        <div className="relative w-full h-56 lg:h-60 bg-black opacity-80">
            <img
                src={require('../images/carousel/purple.jpg')}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt="Background"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-[#d4b078] text-[11px] tracking-[0.35em] uppercase font-montserrat font-semibold">
                    The Rupleart Experience
                </span>
                <h1 className="text-white font-serif italic text-2xl lg:text-3xl">What We Do</h1>
            </div>
        </div>

        {/* Intro */}
        <div className='w-full lg:w-3/4 lg:mx-auto mt-8 text-sm font-montserrat mb-4 p-2 leading-relaxed text-gray-700'>

            <div>
                <b className='text-purple-900'>Rupleart</b> brings together{' '}
                <i>creativity, design, shopping and lifestyle experiences</i> in one convenient digital platform.
            </div>

            <div className='mt-5'>
                We present products across selected categories, giving our customers an easier way to discover pieces that are distinctive, expressive and different from the ordinary.
            </div>

            <div className='mt-5'>
                From something that transforms your home to something that complements your personal style, Rupleart helps you discover products worth experiencing.
            </div>

        </div>

        {/* Categories */}
        <div className="bg-[#faf8f5] py-12 lg:py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-[#b8925a] text-[11px] tracking-[0.3em] uppercase font-montserrat font-semibold">
                        What You'll Find
                    </span>
                    <h2 className="font-serif italic text-purple-950 text-xl lg:text-2xl mt-3">
                        Our growing collection includes
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-[#d4b078] rotate-45 shrink-0"></span>
                            <span className="text-sm font-montserrat text-gray-700">{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Events & Promotions */}
        <div className='w-full lg:w-3/4 lg:mx-auto mt-10 mb-4 p-2 text-sm font-montserrat leading-relaxed text-gray-700'>
            <div>
                <b className='text-purple-900'>Rupleart</b> also features an{' '}
                <i className="text-purple-800">Events &amp; Promotions section</i>, providing a space where customers can discover upcoming events, promotions, exhibitions, experiences and other opportunities.
            </div>
        </div>

        <div className='w-full lg:w-3/4 lg:mx-auto mb-14 p-2'>
            <div className='bg-[#faf8f5] border-l-4 border-[#d4b078] rounded-r-lg p-5'>
                <p className='text-sm text-gray-600 leading-relaxed font-montserrat'>
                    Individuals, businesses, brands, organizations and event organizers interested in advertising an{' '}
                    <i className="text-purple-800">event or promotion</i> on Rupleart can contact the{' '}
                    <i className="text-purple-800">Rupleart Administration through the official administration email provided on the platform</i>.
                </p>
            </div>
        </div>

    </div>
  )
}

export default WhatWeDo