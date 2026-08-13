import React, { useState } from 'react'
import CarouselSection from './CarouselSection'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import CampaignIcon from '@mui/icons-material/Campaign';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactUs() {

    const location = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8188944289295!2d36.82347610306517!3d-1.2824647572041252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f112a74848b9b%3A0x34db30f217a96906!2sLatema%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1728508285173!5m2!1sen!2ske";

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = () => {

        if(name ==  null || email == null || message == null){
            toast.error("All fields must be filled");
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/send_message`,{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, email, message
            })
        })
        .then((res)=>{
            if(res.ok){
                toast.success("Message Sent Succesfully. We will get back to you in a moment");
                setTimeout(()=>{
                    window.location.reload()
                },700);
            }else{
                toast.error("Message Not Sent! Retry");
            }
        })
        .catch(errr=> {
            toast.error("Message Not Sent! Retry");
        })

    }
  return (
    <div>
        <ToastContainer />

        {/* Hero */}
        <div className="relative w-full h-56 lg:h-60 bg-black opacity-80">
            <img
                src={require('../images/carousel/purple.jpg')}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt="Background"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-[#d4b078] text-[11px] tracking-[0.35em] uppercase font-montserrat font-semibold">
                    Get In Touch
                </span>
                <h1 className="text-white font-serif italic text-2xl lg:text-3xl">Contact Us</h1>
            </div>
        </div>

        {/* Intro */}
        <div className="max-w-2xl mx-auto text-center mt-10 mb-12 px-4">
            <h2 className="font-serif italic text-purple-950 text-xl lg:text-2xl mb-4">
                We're Here to Help
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-montserrat">
                Have a question about a <i className="text-purple-800">product, order, payment, delivery, account, event or advertising opportunity?</i> Get in touch with the Rupleart team through our official contact channels and we'll be happy to assist you.
            </p>
        </div>

        <div className='w-full lg:w-3/4 lg:mx-auto text-sm font-montserrat mb-10 p-2 block lg:flex gap-8'>

        <div className='w-full lg:w-1/2 mx-1'>
            <div className='mb-1 text-xl font-bold tracking-wide text-purple-950'>Contact details</div>
            <div className='mb-8 text-sm font-montserrat text-[#b8925a] font-semibold tracking-wide'>Reach out — we're here to help!</div>

            <div className='flex gap-3 items-center mb-4'>
                <span className='flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-900'>
                    <PhoneIcon sx={{fontSize:16}}/>
                </span>
                <div>+254 759 324 250</div>
            </div>
            <div className='flex gap-3 items-center mb-4'>
                <span className='flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-900'>
                    <EmailIcon sx={{fontSize: 16}} />
                </span>
                <div>Rupleart@gmail.com</div>
            </div>
            <div className='flex gap-3 items-center mb-6'>
                <span className='flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-900'>
                    <LocationOnIcon sx={{fontSize: 16}} />
                </span>
                <div>Latema Road, Nairobi, Kenya</div>
            </div>

            <iframe src={location} className='w-full h-56 rounded-lg border border-gray-200 shadow-sm' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

            {/* Advertising Enquiries */}
            <div className='mt-8 bg-[#faf8f5] border-l-4 border-[#d4b078] rounded-r-lg p-5'>
                <div className='flex gap-3 items-start'>
                    <span className='flex items-center justify-center w-8 h-8 rounded-full bg-purple-900 text-white shrink-0'>
                        <CampaignIcon sx={{fontSize: 16}} />
                    </span>
                    <div>
                        <div className='font-serif italic text-purple-950 text-base mb-2'>Advertising Enquiries</div>
                        <p className='text-sm text-gray-600 leading-relaxed'>
                            For <i className="text-purple-800">event and promotional advertising</i>, contact the Rupleart Administration through our official administration email with the details of what you would like featured.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className='bg-white p-6 w-full lg:w-1/2 rounded-xl text-sm mt-10 lg:mt-0 shadow-md border-t-4 border-purple-900'>
            <div className='mb-1 text-lg font-bold text-center text-purple-950'>Shoot us a message!</div>
            <div className='mb-6 text-xs text-center text-gray-500'>We typically respond within 24 hours.</div>
            <div className='mt-2 text-sm font-semibold text-gray-700'>Name</div>
            <input onChange={e => {
                setName(e.target.value);
            }} type="text" className='w-full rounded-md p-2 bg-gray-50 border border-gray-200 mt-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent' />
            <div className='mt-4 text-sm font-semibold text-gray-700'>Email</div>
            <input type="email" onChange={e => {
                setEmail(e.target.value);
            }} className='w-full rounded-md p-2 bg-gray-50 border border-gray-200 mt-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent' />
            <div className='mt-4 text-sm font-semibold text-gray-700'>Message</div>
            <textarea rows={5} onChange={e => {
                setMessage(e.target.value);
            }} className='w-full rounded-md p-2 bg-gray-50 border border-gray-200 mt-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent'></textarea>
            <button onClick={e => {
                e.preventDefault();
                handleSubmit();
            }} className='mt-6 flex justify-center gap-2 items-center bg-purple-900 hover:bg-purple-700 transition-colors text-white p-2.5 mx-auto rounded-lg w-2/3'>
                <div>Send</div>
                <SendIcon sx={{fontSize: 16}} />
            </button>

        </div>
        </div>
    </div>
  )
}

export default ContactUs