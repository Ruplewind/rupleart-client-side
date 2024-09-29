import React from 'react'
import CarouselSection from './CarouselSection'

function AboutUs() {
  return (
    <div>
        <div className="relative w-full h-56 lg:h-60 bg-black opacity-80">
            <img
                src={require('../images/carousel/purple.jpg')}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt="Background"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-xl lg:text-2xl font-bold">About Us</h1>
            </div>
        </div>

        <div className='w-full lg:w-3/4 lg:mx-auto mt-5 text-sm font-montserrat mb-10 p-2'>

        <div>Welcome to <b className='text-purple-900'>Rupleart</b>, where creativity meets opportunity! We are an online platform that connects artists with buyers from all around the world. Our mission is to support artists by providing them with a space to showcase their unique artwork, while offering art enthusiasts a diverse collection of one-of-a-kind pieces.</div>

        <div className='mt-5'>At Rupleart, we believe that every artist deserves a chance to shine. Whether you are a painter, illustrator, or a creator of visual art, we give you the tools and platform to reach a wider audience and sell your work effortlessly. For art lovers, Rupleart provides a carefully curated selection of original paintings, drawings, and more—bringing beauty and inspiration to every space.</div>

        <div className='mt-5'>We are committed to fostering a vibrant community where creativity thrives. Every purchase on Rupleart directly supports independent artists, helping them to continue their artistic journeys. Explore, connect, and transform your world with the power of art through Rupleart.</div>

        </div>
    </div>
  )
}

export default AboutUs