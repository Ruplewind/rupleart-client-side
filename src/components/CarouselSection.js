import { Carousel, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CarouselSection() {
  const navigate = useNavigate();

  return (
    <Carousel className="h-96" 
    transition={{duration: 1}} 
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
              className="mb-9 opacity-80 text-xs lg:text-sm"
            >
              Rupleart is a dynamic online marketplace where creativity, design and lifestyle come together. Evolving beyond traditional art, Rupleart connects customers with artists, designers, creators and businesses offering unique products across art, home décor, fashion & design, souvenirs, creative pieces and selected lifestyle categories.

              Our mission is to provide a modern platform where creators and businesses can showcase and sell distinctive products while giving customers an exciting place to discover, shop and experience creativity in its many forms.

              Rupleart — Creativity Beyond the Canvas.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="sm" color="white" onClick={()=> {
                navigate("/howitworks")
              }}>
                How It Works
              </Button>
              <Button size="sm" color="white" variant="text" onClick={()=> {
                navigate("/about_us")
              }}>
                About Us
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
              Whether you’re an artist, designer, creator or business looking to grow your audience and showcase your products, or a customer searching for something unique, Rupleart brings creativity, design and lifestyle together in one dynamic marketplace.

              From art and home décor to fashion, souvenirs, creative pieces and selected lifestyle products, Rupleart makes it easier to discover, connect and shop. The platform provides a seamless experience with secure payments, convenient transactions and a user-friendly marketplace* for both buyers and sellers.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="sm" color="white" onClick={()=> {
                navigate("/howitworks")
              }}>
                How It Works
              </Button>
              <Button size="sm" color="white" variant="text" onClick={()=> {
                navigate("/about_us")
              }}>
                About Us
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
              Rupleart makes creativity and unique products accessible to everyone, connecting people with art, décor, lifestyle pieces and more—all in one marketplace.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="sm" color="white" onClick={()=> {
                navigate("/howitworks")
              }}>
                How It Works
              </Button>
              <Button size="sm" color="white" variant="text" onClick={()=> {
                navigate("/about_us")
              }}>
                About Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  )
}

export default CarouselSection
