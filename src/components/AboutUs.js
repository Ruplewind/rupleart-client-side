import React from 'react'
import CarouselSection from './CarouselSection'

const foundations = [
  {
    label: 'Our Mission',
    title: 'Making creativity accessible',
    body: (
      <>
        To <i className="text-purple-800">make creative, distinctive and inspiring products and experiences more accessible</i> by building a modern platform that brings creativity, design and lifestyle together.
      </>
    )
  },
  {
    label: 'Our Vision',
    title: 'Beyond the canvas',
    body: (
      <>
        To become a leading destination for discovering <i className="text-purple-800">creative, design and lifestyle products, events and experiences from Africa and beyond</i>.
      </>
    )
  },
  {
    label: 'Our Promise',
    title: 'Every visit, a discovery',
    body: (
      <>
        We want every visit to Rupleart to feel like a discovery. Whether you're looking for something for your{' '}
        <i className="text-purple-800">home, personal style, collection, gift or everyday life</i>, or you're simply looking for something new to experience, Rupleart gives you a place to discover something different.
      </>
    )
  }
]

function AboutUs() {
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
                    Our Story
                </span>
                <h1 className="text-white font-serif italic text-2xl lg:text-3xl">About Us</h1>
            </div>
        </div>

        {/* Intro */}
        <div className='w-full lg:w-3/4 lg:mx-auto mt-8 text-sm font-montserrat mb-4 p-2 leading-relaxed text-gray-700'>

            <div>
                Welcome to <b className='text-purple-900'>Rupleart</b>, where{' '}
                <i>creativity, design and lifestyle come together</i>.
            </div>

            <div className='mt-5'>
                <b className='text-purple-900'>Rupleart</b> is a dynamic online shopping platform created for people who appreciate{' '}
                <i>unique, creative and distinctive products</i>.
            </div>

            <div className='mt-5'>
                What began with a strong passion for art has evolved into a broader destination featuring{' '}
                <i>art, home décor, fashion &amp; design, creative pieces and selected lifestyle products</i>.
            </div>

            <div className='mt-5'>
                We believe the things you choose should do more than serve a purpose — they should reflect your{' '}
                <i>style, personality and individuality</i>.
            </div>

            <div className='mt-5'>
                That's why <b className='text-purple-900'>Rupleart</b> brings together carefully selected products that can transform your space, complement your style or simply help you discover something different.
            </div>

            <div className='mt-5'>
                Beyond shopping, <b className='text-purple-900'>Rupleart</b> also provides a space for people, businesses, brands and organizations to{' '}
                <i>discover and promote events, offers and experiences</i> through our Events &amp; Promotions section.
            </div>

            <div className='mt-5'>
                Our goal is simple: to make discovering, shopping and experiencing creativity{' '}
                <i>easy, enjoyable and inspiring</i>.
            </div>

        </div>

        {/* Mission / Vision / Promise */}
        <div className="bg-[#faf8f5] py-14 lg:py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 relative">
                    <div className="hidden md:block absolute left-1/3 top-1 bottom-1 w-px bg-[#d4b078]/50"></div>
                    <div className="hidden md:block absolute left-2/3 top-1 bottom-1 w-px bg-[#d4b078]/50"></div>

                    {foundations.map((item) => (
                        <div key={item.label} className="px-1 md:px-6 text-center md:text-left">
                            <span className="block text-[11px] tracking-[0.3em] uppercase text-[#b8925a] font-montserrat font-semibold mb-3">
                                {item.label}
                            </span>
                            <h3 className="font-serif italic text-purple-950 text-xl lg:text-[22px] mb-3 leading-snug">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed font-montserrat">
                                {item.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Manifesto */}
        <div className="relative bg-[#3b0764] py-16 lg:py-24 px-6 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 50% 15%, rgba(212,176,120,0.18), transparent 55%)' }}
            ></div>
            <p className="relative max-w-3xl mx-auto text-center font-serif italic text-white text-xl lg:text-[28px] leading-relaxed">
                Rupleart is a creative, design and lifestyle shopping platform bringing together distinctive products, events, promotions and experiences in one dynamic destination.
            </p>
            <div className="relative mt-7 flex justify-center">
                <span className="w-12 h-px bg-[#d4b078]"></span>
            </div>
        </div>

    </div>
  )
}

export default AboutUs