import React, { useEffect, useState } from 'react'
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
        <div className='flex gap-4 w-full justify-evenly mb-2 mt-4'>
            <div>
                <div className='flex gap-2 items-center'>
                    <img src={require("../images/logo.png")} className='w-14 bg-white p-2 rounded-lg' />
                    <span className='text-white font-bold text-xl'>Ruple Art</span>
                </div>
                <div className='flex items-center mt-4 gap-2'>
                    <LocationOnIcon sx={{color: 'white', fontSize: 20}}/>
                    <button className='block text-gray-400 hover:text-gray-600 uppercase text-sm'>Heritan House Argwings Kodhek Road</button>
                </div>
                <div className='flex items-center mt-2 gap-2'>
                    <CallIcon sx={{color: 'white', fontSize: 20}} />
                    <button className='block text-gray-400 hover:text-gray-600 uppercase text-sm'>+254 7XX XXX XXX</button>
                </div>
                <div className='flex items-center mt-2 gap-2'>
                    <MailIcon sx={{color: 'white', fontSize: 20}} />
                <button className='block text-gray-400 hover:text-gray-600 uppercase text-sm'>info@rupleart.co.ke</button>
                </div>

            </div>
            <div className=''>
                <div className='font-bold text-white'>OUR COMPANY</div>
                <button className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>FAQ</button>
                <button className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>Contact Us</button>
                <button className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>About Us</button>
                <button className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>Terms of Use</button>
                <button className='block text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>Return Policy</button>
            </div>

            <div>
                <div className='font-bold text-white'>SHOP</div>
                {
                    !loading && categories.length > 0 && categories.slice(1,6).map(category => 
                        <div>
                            <button className='text-gray-400 hover:text-gray-600 mt-2 uppercase text-sm'>{category.category}</button>
                        </div>
                    )
                }
            </div>

            <div>
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
