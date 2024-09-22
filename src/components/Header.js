import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='flex items-center justify-between shadow-md rounded-b-sm shadow-slate-400 w-full p-3 font-montserrat overflow-hidden'> {/* Added overflow-hidden */}

        <div className='flex items-center ml-1 lg:ml-5'>
            <img 
              src={require('../images/logo.png')} 
              className='w-6 lg:w-12 max-w-full h-auto' // Ensure the image is responsive
              alt="Logo"
            />
        </div>

        <div className='flex items-center justify-end'>
            <ul className='collapse lg:visible uppercase mr-1 lg:mr-10 tracking-wider text-sm'>
                <div className='flex justify-end gap-2'>
                    <Link to={"/"} className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl'>Home</Link>
                    <Link to={"/shop"} className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl'>Shop</Link>
                    <Link to={"/"} className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl '>Events</Link>
                    <div className='collapse lg:visible'>
                        <div className='flex gap-2'>
                            <Link to={"/"} className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl '>How It Works</Link>
                            <Link to={"/"} className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl '>About Us</Link>
                            <Link to={"/"} className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl '>Contact Us</Link>
                        </div>
                    </div>
                    <Link to={"/"} className='bg-purple-900 hover:bg-purple-800 text-white rounded-lg text-xs flex px-2 items-center'>Post Ad</Link>
                </div>
            </ul>

            <div className='visible lg:collapse lg:w-0'>
                <MenuIcon />
            </div>
        </div>
    </div>
  )
}

export default Header;