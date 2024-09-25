import React, { useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import useCart from '../utils/CartContext';
import { AuthContext } from '../utils/AuthContext';

function Header() {
    const { products } = useCart();
    const { token, userId, fullName, logout } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        window.location.reload();
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className='flex items-center justify-between shadow-md rounded-b-sm shadow-slate-400 w-full p-3 font-montserrat overflow-hidden'>
            <div className='flex items-center ml-1 lg:ml-5'>
                <img 
                  src={require('../images/logo.png')} 
                  className='w-6 lg:w-12 max-w-full h-auto' 
                  alt="Logo"
                />
            </div>

            <div className='flex items-center justify-end'>
                <ul className='collapse lg:visible uppercase mr-1 lg:mr-5 tracking-wider text-sm'>
                    <div className='flex justify-end gap-2'>
                        <Link to={"/"} className='hover:underline hover:text-purple-900 decoration-purple-900 decoration-2 underline-offset-8 p-1 rounded-2xl'>Home</Link>
                        <Link to={"/shop"} className='hover:underline hover:text-purple-900 decoration-purple-900 decoration-2 underline-offset-8 p-1 rounded-2xl'>Shop</Link>
                        <Link to={"/events"} className='hover:underline hover:text-purple-900 decoration-purple-900 decoration-2 underline-offset-8 p-1 rounded-2xl '>Events</Link>
                        <Link to={'/cart'} className='flex items-center px-2 hover:text-purple-900'>
                            <ShoppingCartIcon fontSize={'small'}   />
                            <sup className="font-features sups bg"><div className='text-black bg-black'>{products.length}</div></sup>
                        </Link>

                        {token !== null ? (
                            <div className='relative'>
                                {/* Trigger dropdown */}
                                <div 
                                    className='hover:underline hover:text-purple-900 decoration-purple-900 decoration-2 underline-offset-8 p-1 rounded-2xl flex items-center cursor-pointer'
                                    onClick={toggleDropdown}
                                >
                                    <PersonIcon sx={{fontSize: 20}} />
                                </div>

                                {/* Dropdown menu */}
                                {dropdownVisible && (
                                    <div className='fixed z-50 right-0 mt-2 w-40 bg-gray-100 shadow-lg rounded-md py-2'>
                                        <button 
                                            onClick={() => {
                                                navigate('/profile');
                                                toggleDropdown();
                                            }} 
                                            className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-900'
                                        >
                                            My Profile
                                        </button>
                                        <button 
                                            onClick={()=> {
                                                handleLogout();
                                                toggleDropdown();
                                            }} 
                                            className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-900'
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='collapse lg:visible'>
                                <div className='flex gap-2'>
                                    <Link to={"/login"} className='hover:underline hover:text-purple-900 decoration-purple-900 decoration-2 underline-offset-8 p-1 rounded-2xl '>Login/Register</Link>
                                </div>
                            </div>
                        )}
                        { token && <Link to={"/"} className='bg-purple-900 hover:bg-purple-800 text-white rounded-lg text-xs flex px-2 items-center'>Post Ad</Link> }

                    </div>
                </ul>

                <div className='visible lg:collapse lg:w-0'>
                    <MenuIcon />
                </div>
            </div>
        </div>
    );
}

export default Header;
