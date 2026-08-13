import React from 'react'
import CampaignIcon from '@mui/icons-material/Campaign';

const advertisers = [
  'Event organizers',
  'Businesses',
  'Brands',
  'Companies',
  'Organizations',
  'Institutions',
  'Creatives',
  'Venues',
  'Promoters',
  'Individuals',
]

function EventsPromotions() {
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
                    Events &amp; Promotions
                </span>
                <h1 className="text-white font-serif italic text-2xl lg:text-3xl">Discover What's Happening</h1>
            </div>
        </div>

        {/* Intro */}
        <div className='w-full lg:w-3/4 lg:mx-auto mt-8 text-sm font-montserrat mb-4 p-2 leading-relaxed text-gray-700'>

            <div>
                <b className='text-purple-900'>Rupleart</b> isn't only about what you can shop for — it's also about{' '}
                <i>what you can discover and experience</i>.
            </div>

            <div className='mt-5'>
                Explore upcoming <i>events, exhibitions, creative experiences, promotions, special offers and other featured opportunities</i> through Rupleart.
            </div>

        </div>

        {/* Advertise With Rupleart */}
        <div className="bg-[#faf8f5] py-12 lg:py-16 px-4 mt-6">
            <div className="max-w-3xl mx-auto">

                <div className="text-center mb-8">
                    <span className="text-[#b8925a] text-[11px] tracking-[0.3em] uppercase font-montserrat font-semibold">
                        Get Featured
                    </span>
                    <h2 className="font-serif italic text-purple-950 text-xl lg:text-2xl mt-3">
                        Advertise With Rupleart
                    </h2>
                </div>

                <div className='text-sm font-montserrat leading-relaxed text-gray-700'>
                    <div>
                        Have an <i>event, promotion or experience</i> you want people to discover? Rupleart provides advertising opportunities within our Events &amp; Promotions section.
                    </div>

                    <div className='mt-5 font-semibold text-purple-950'>
                        <i>Anyone can submit an advertising request</i>, including:
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                    {advertisers.map((item) => (
                        <div
                            key={item}
                            className="text-center text-xs font-montserrat font-semibold uppercase tracking-wide text-purple-900 bg-white border border-[#d4b078]/40 rounded-full py-2 px-2"
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <div className='text-sm font-montserrat leading-relaxed text-gray-700 mt-8'>
                    <div>
                        Advertising may include <i>events, exhibitions, shows, festivals, launches, promotions, special offers and other approved promotional content</i>.
                    </div>
                </div>

                {/* Contact callout */}
                <div className='mt-6 bg-white border-l-4 border-[#d4b078] rounded-r-lg p-5 flex gap-4 items-start'>
                    <span className='flex items-center justify-center w-9 h-9 rounded-full bg-purple-900 text-white shrink-0'>
                        <CampaignIcon sx={{ fontSize: 18 }} />
                    </span>
                    <div>
                        <div className='font-serif italic text-purple-950 text-base mb-1'>How to Advertise</div>
                        <p className='text-sm text-gray-600 leading-relaxed'>
                            To advertise, simply contact the <i className="text-purple-800">Rupleart Administration through our official administration email</i> with details of your event or promotion.
                        </p>
                        <p className='text-sm text-gray-600 leading-relaxed mt-3'>
                            All advertisements are subject to <i className="text-purple-800">review and approval by Rupleart Administration</i> before publication.
                        </p>
                    </div>
                </div>

            </div>
        </div>

        {/* Manifesto */}
        <div className="relative bg-[#3b0764] py-14 lg:py-20 px-6 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 50% 15%, rgba(212,176,120,0.18), transparent 55%)' }}
            ></div>
            <p className="relative max-w-2xl mx-auto text-center font-serif italic text-white text-xl lg:text-[26px] leading-relaxed">
                Your event. Your promotion. A wider audience.
            </p>
            <div className="relative mt-6 flex justify-center">
                <span className="w-12 h-px bg-[#d4b078]"></span>
            </div>
        </div>

    </div>
  )
}

export default EventsPromotions