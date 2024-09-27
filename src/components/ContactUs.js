import React from 'react'
import CarouselSection from './CarouselSection'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

function ContactUs() {

    const location = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8091639245717!2d36.818232084812095!3d-1.288692995344679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11747e756f41%3A0x146973898c119b47!2sKenyatta%20International%20Convention%20Centre!5e0!3m2!1sen!2ske!4v1727439193227!5m2!1sen!2ske";
  return (
    <div>
        <div className="relative w-full h-56 lg:h-60 bg-black opacity-80">
            <img
                src={require('../images/carousel/purple.jpg')}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt="Background"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-xl lg:text-4xl font-bold">Contact Us</h1>
            </div>
        </div>

        <div className='w-full lg:w-3/4 lg:mx-auto mt-5 text-sm font-montserrat mb-10 p-2 block lg:flex gap-5'>

        <div className='w-full lg:w-1/2 mx-1'>
            <div className='mb-2 text-xl font-bold tracking-wide'>Get in touch</div>
            <div className='mb-10 text-sm underline decoration-4 underline-offset-8 font-sans'>Reach Out – We're Here to Help!</div>
            <div className='flex gap-2 items-center mb-5'>
                <PhoneIcon sx={{fontSize:16}}/>
                <div>+254 759 324 250</div>
            </div>
            <div className='flex gap-2 items-center mb-5'>
                <EmailIcon sx={{fontSize: 16}} />
                <div>Rupleart@gmail.com</div>
            </div>

            <iframe src={location} className='w-full h-56 border border-gray-300' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div className='bg-gray-300 p-4 w-full lg:w-1/2 rounded-lg text-sm mt-10 lg:mt-0'>
            <div className='mb-2 text-lg font-bold tracking-wide text-center'>Shoot us a message!</div>
            <div className='mt-2 text-sm'>Name</div>
            <input type="text" className='w-full rounded-md p-2 bg-white mt-2 text-sm' />
            <div className='mt-2 text-sm'>Email</div>
            <input type="email" className='w-full rounded-md p-2 bg-white mt-2 text-sm' />
            <div className='mt-2 text-sm'>Message</div>
            <textarea rows={5} className='w-full rounded-md p-2 bg-white mt-2 text-sm'></textarea>
            <button className='mt-5 flex justify-center gap-2 items-center bg-purple-900 hover:bg-purple-700 text-white p-1 mx-auto rounded-lg w-1/2'>
                <div>Send</div>
            </button>

        </div>
        </div>
    </div>
  )
}

export default ContactUs