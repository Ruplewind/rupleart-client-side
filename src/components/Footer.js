import React, { useEffect, useState } from 'react'
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

function Footer() {
    const [year, setYear] = useState(null);

    useEffect(()=>{
        const date =  new Date();

        setYear(date.getFullYear());
    },[])

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
  return (
    <div className='w-full font-montserrat bg-black/100 p-2'>
        <div className='block lg:flex gap-4 w-full justify-evenly mb-2 mt-4'>
            <div className='mb-4'>
                <div className='flex gap-2 items-center'>
                    <img src={require("../images/logo.png")} className='w-10 lg:w-14 bg-white p-2 rounded-lg' />
                    <span className='text-white font-bold text-lg lg:text-xl'>Ruple Art</span>
                </div>
                <div className='flex items-center mt-4 gap-2'>
                    <LocationOnIcon sx={{color: 'white', fontSize: 20}}/>
                    <button className='block text-gray-400 hover:text-gray-600 uppercase text-sm'>Heritan Hse Argwings Kodhek Road</button>
                </div>
                <div className='flex items-center mt-2 gap-2'>
                    <CallIcon sx={{color: 'white', fontSize: 20}} />
                    <button className='block text-gray-400 hover:text-gray-600 uppercase text-sm'>+254 736 012 377</button>
                </div>
                <div className='flex items-center mt-2 gap-2'>
                    <MailIcon sx={{color: 'white', fontSize: 20}} />
                <button className='block text-gray-400 hover:text-gray-600 uppercase text-sm'>Rupleart@gmail.com</button>
                </div>

            </div>
            <div className='mb-4 mt-10 lg:mt-0'>
                <div className='font-bold text-white'>OUR COMPANY</div>
                <Link to={"/faq"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>FAQ</Link>
                <Link to={"/contact_us"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>Contact Us</Link>
                <Link to={"/about_us"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>About Us</Link>
                <Link to={"/howitworks"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>How it Works</Link>
                <Link to={"/dcma"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>DCMA Notice</Link>
                <Link to={"/terms"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>Terms of Use</Link>
                <Link to={"/return"} className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>Return Policy</Link>
            </div>

            <div className='mb-4 h-0 collapse lg:visible'>
                <div className='font-bold text-white'>SHOP</div>
                {
                    !loading && categories.length > 0 && categories.slice(1,6).map(category => 
                        <div>
                            <button className='text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>{category.category}</button>
                        </div>
                    )
                }
            </div>

            <div className='h-0 collapse lg:visible'>
                <div className='font-bold text-white'>EVENTS</div>

                <button className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>The Spectrum of Silence</button>
                <button className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>EcoArt Futures Festival</button>
                <button className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>Chromatic Horizons</button>
                <button className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>Metaverse Art Summit</button>
                <button className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>Sculpting the Future</button>            </div>

        </div>
      <div className='text-center p-2 text-sm mt-3 font-bold text-white'>
        Ruple Art &copy; {year}
      </div>
    </div>
  )
}

export default Footer
