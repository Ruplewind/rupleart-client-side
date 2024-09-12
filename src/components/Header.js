import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  return (
    <div className='flex items-center shadow-md rounded-b-sm shadow-slate-400 w-full p-3 font-montserrat'>

        <div className='flex items-center ml-1 lg:ml-5'>
            <img src={require('../images/logo.png')} className='w-6 lg:w-12' />
        </div>

        <div className='flex items-center'>
            <ul className='collapse lg:visible uppercase mr-1 lg:mr-10 tracking-wider text-sm'>
                <div className='flex justify-end gap-2'>
                    <li className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl'>Home</li>
                    <li className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl'>Shop</li>
                    <li className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl '>Events</li>
                    <div className='collapse lg:visible'>
                        <div className='flex gap-2'>
                            <li className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl '>How It Works</li>
                            <li className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl '>About Us</li>
                            <li className='hover:underline decoration-purple-950 decoration-2 underline-offset-8 p-1 rounded-2xl '>Contact Us</li>
                        </div>
                        
                    </div>
                    <li className='bg-purple-900 hover:bg-purple-900 text-white rounded-lg text-xs flex px-2 items-center'>Post Ad</li>
                </div>
            </ul>

            <div className='visible lg:collapse lg:w-0'>
            <MenuIcon />
            </div>
        </div>
    </div>
  )
}

export default Header
