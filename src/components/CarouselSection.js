import { Carousel, Typography, Button } from '@material-tailwind/react'
import React from 'react'

function CarouselSection() {
  return (
    <Carousel className="h-96" 
    transition={{duration: 5}} 
    autoplay={true}
    loop={true}
    prevArrow={({handlePrev})=>{

    }}
    nextArrow={({handleNext})=>{

    }}
    >
      <div className="relative h-96 w-full">
        <img
          src={require('../images/carousel/sticks.jpg')}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              RUPLEART
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-9 opacity-80 text-sm"
            >
              Rupleart is an innovative online platform designed to bring artists and art enthusiasts together. As a marketplace for creativity, Rupleart allows artists to showcase their paintings, drawings, and other forms of visual art to a global audience. Our mission is to support artists by providing them with an accessible and dynamic space to sell their original artwork, while offering buyers a diverse collection of unique pieces to discover and purchase
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="sm" color="white">
                Explore
              </Button>
              <Button size="sm" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-96 w-full">
        <img
          src={require('../images/carousel/sculpture.jpg')}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              RUPLEART
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-9 opacity-80 text-sm"
            >
              Whether you’re an artist looking to grow your audience and sell your work, or an art lover searching for the perfect piece to complete your space, Rupleart is the ultimate destination for connecting talent with appreciation. The platform ensures smooth transactions, secure payments, and a personalized experience for both buyers and sellers
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="sm" color="white">
                Explore
              </Button>
              <Button size="sm" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-96 w-full">
        <img
          src={require('../images/carousel/purple.jpg')}
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              RUPLEART
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-9 opacity-80 text-sm"
            >
              Rupleart makes art accessible to everyone, transforming every space into a work of art, one piece at a time.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="sm" color="white">
                Explore
              </Button>
              <Button size="sm" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  )
}

export default CarouselSection
