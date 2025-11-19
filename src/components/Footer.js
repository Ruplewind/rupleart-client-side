import React, { useEffect, useState } from 'react'
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link, useNavigate } from 'react-router-dom';

function Footer() {
    const [year, setYear] = useState(null);

    useEffect(()=>{
        const date =  new Date();

        setYear(date.getFullYear());
    },[]);

    const navigate = useNavigate();

    const [eventsLoading, setEventsLoading] = useState(true);
    const [events, setEvents] = useState([]);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [eventsError, setEventsError] = useState(false);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/get_categories`)
        .then(res => res.json())
        .then(data => {
            setCategories(data);
            setLoading(false);
        })
        .catch(()=>{
            setError(true);
            setLoading(false);
        })
    },[])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/events`)
        .then(res => res.json())
        .then(data => {
            setEvents(data);
            setEventsLoading(false);
        })
        .catch(()=>{
            setEventsError(true);
            setEventsLoading(false);
        })
    },[])
  return (
    <div className='w-full font-montserrat bg-black p-2 mt-5'>
        <div className='block lg:flex gap-4 w-full justify-evenly mb-2 mt-4'>
            <div className='mb-4'>
                <div className='flex gap-2 items-center'>
                    <img src={require("../images/logo.png")} className='w-10 lg:w-14 bg-white p-2 rounded-lg' />
                    <span className='text-white font-bold text-lg lg:text-xl'>Ruple Art</span>
                </div>
                <div className='flex items-center mt-4 gap-2'>
                    <LocationOnIcon sx={{color: 'white', fontSize: 20}}/>
                    <button className='block text-gray-400 hover:text-gray-600 uppercase text-xs'>Urban View Building, Latema Rd, Nairobi CBD</button>
                </div>
                <div className='flex items-center mt-2 gap-2'>
                    <CallIcon sx={{color: 'white', fontSize: 20}} />
                    <button className='block text-gray-400 hover:text-gray-600 uppercase text-xs'>+254 759 324 250</button>
                </div>
                <div className='flex items-center mt-2 gap-2'>
                    <MailIcon sx={{color: 'white', fontSize: 20}} />
                    <button className='block text-gray-400 hover:text-gray-600 uppercase text-xs'>Rupleart@gmail.com</button>
                </div>

                <div className='flex items-center mt-4 lg:mt-10 gap-2'>
                    <Link 
                    onClick={()=>{
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                    }}
                    to={"/download_app"} className=' bg-purple-900 p-2 text-white rounded-lg px-5'>Download Rupleart App</Link>
                </div>

            </div>

            <div className='mb-0 lg:mb-4 mt-10 lg:mt-0'>
                <div className='font-bold text-white'>OUR COMPANY</div>
                
                <Link 
                onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
                to={"/faq"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-xs'>FAQ</Link>

                <Link 
                onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
                to={"/contact_us"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-xs'>Contact Us</Link>

                <Link onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
                to={"/about_us"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-xs'>About Us</Link>

                <Link onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
                to={"/howitworks"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-xs'>How it Works</Link>

                <Link onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
                to={"/dcma"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-xs'>DCMA Notice</Link>

                <Link 
                onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
                to={"/terms"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-xs'>Terms of Use</Link>

                <Link onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
                to={"/return"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-xs'>Return Policy</Link>

                <Link onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
                target='_blank'
                to={"https://www.privacypolicies.com/live/84b45be8-cb8e-498c-9bd2-95ac38fc39e4"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-xs'>Privacy Policy</Link>

                <Link onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
                to={"/delete_account"} className='block text-red-400 hover:text-gray-600 uppercase text-xs mt-5 '>I want my account deleted?</Link>
            </div>

            <div className='mb-0 lg:mb-4 h-0 lg:h-max collapse lg:visible'>
                <div className='h-0 lg:h-max collapse lg:visible font-bold text-white mb-2 block'>SHOP</div>
                {
                    !loading && !error && categories.length > 0 && categories.slice(0,6).map(category => 
                        <div key={category._id} onClick={() => {
                            navigate("/")
                        }} className='h-0 lg:h-max collapse lg:visible text-gray-400 hover:text-gray-600 mt-2 uppercase text-xs cursor-pointer '>
                            {category.category}
                        </div>
                    )
                }
            </div>

            <div className='mb-0 lg:mb-4 h-0 lg:h-max collapse lg:visible'>
                <div className='h-0 lg:h-max collapse lg:visible font-bold text-white'>EVENTS</div>
                {
                    !eventsLoading && !error && events.length > 0 && events.slice(0,6).map(event => 
                        <div key={event._id} onClick={() => {
                            navigate("/events")
                        }} 
                        className='h-0 lg:h-max collapse lg:visible text-gray-400 hover:text-gray-600 mt-2 uppercase text-xs cursor-pointer'>
                            {event.title}
                        </div>
                    )
                }
                </div>
            </div>
      <div className='text-center p-2 text-xs mt-3 font-bold text-white'>
        Ruple Art &copy; {year}
      </div>
    </div>
  )
}

export default Footer
