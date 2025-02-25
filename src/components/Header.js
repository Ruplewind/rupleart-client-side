import React, { useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useCart from '../utils/CartContext';
import { AuthContext } from '../utils/AuthContext';

function Header() {
    const { products } = useCart();
    const { token, logout } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // state to toggle mobile menu
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        window.location.reload();
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const apkUrl = "https://expo.dev/artifacts/eas/jPe1oar6TYWRpAYPdVwKe.apk";

    return (
        <div className='flex items-center justify-between shadow-md rounded-b-sm shadow-slate-400 w-full p-3 font-montserrat overflow-hidden'>
            <div className='flex items-center ml-1 lg:ml-5' onClick={()=>{
                navigate("/")
            }}>
                <img 
                    src={require('../images/logo.png')} 
                    className='w-12 max-w-full h-auto' 
                    alt="Logo"
                />
            </div>

            {/* Desktop Menu */}
            <div className='hidden lg:flex items-center justify-end'>
                <ul className='uppercase mr-1 lg:mr-5 tracking-wider text-sm'>
                    <div className='flex gap-2'>
                        <Link to={"/"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl'>Home</Link>
                        <Link to={"/events"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl'>Events</Link>
                        <Link to={"/about_us"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl'>About Us</Link>
                        <Link to={"/contact_us"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl'>Contact Us</Link>
                        { token && <Link to={"/orders"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl'>My Orders</Link> }
                        <Link to={'/cart'} className='flex items-center px-2 hover:text-purple-900'>
                            <ShoppingCartIcon fontSize={'small'} />
                            <sup className="text-black">{products.length}</sup>
                        </Link>

                        {token !== null ? (
                            <div className='relative'>
                                <div className='hover:underline hover:text-purple-900 p-1 rounded-2xl flex items-center cursor-pointer' onClick={toggleDropdown}>
                                    <PersonIcon sx={{fontSize: 20}} />
                                </div>

                                {dropdownVisible && (
                                    <div className='fixed z-50 right-0 mt-2 w-40 bg-gray-100 shadow-lg rounded-md py-2'>
                                        <button 
                                            onClick={() => {
                                                navigate('/profile');
                                                toggleDropdown();
                                            }} 
                                            className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-900 flex gap-2 items-center'
                                        >
                                            <PersonIcon sx={{fontSize: 16}} />
                                            <span>My profile</span>
                                        </button>
                                        <button 
                                            onClick={() => {
                                                handleLogout();
                                                toggleDropdown();
                                            }} 
                                            className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-900 flex gap-2 items-center'
                                        >
                                            <LogoutIcon sx={{fontSize: 16}} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to={"/login"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl'>Login/Register</Link>
                        )}

                        {token && <Link to={"/myads"} className='bg-purple-900 hover:bg-purple-800 text-white rounded-lg text-xs flex px-2 items-center'>Post Ad</Link>}

                        { token && <div className="flex justify-center">
                            <Link
                                onClick={()=>{
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    });
                                }}
                                to={"/download_app"}
                                className="border border-purple-900 text-purple-900 hover:text-white px-4 py-1 rounded-lg shadow-md hover:bg-purple-900 transition-all uppercase text-sm"
                            >
                                Download  Android App
                            </Link>
                        </div> }
                        {!token && <div className="flex justify-center">
                            <Link
                                onClick={()=>{
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    });
                                }}
                                to={"/download_app"}
                                className="bg-purple-900 text-white px-4 py-1 rounded-lg text-sm shadow-md hover:bg-purple-700 transition-all"
                            >
                                Download App
                            </Link>
                        </div> }
                    </div>
                </ul>
            </div>

            {/* Mobile Menu and Icons */}
            <div className='lg:hidden flex items-center'>
                <Link to={'/cart'} className='flex items-center px-2 hover:text-purple-900'>
                    <ShoppingCartIcon fontSize={'small'} />
                    <sup className="text-black">{products.length}</sup>
                </Link>
                <div className='ml-2 cursor-pointer' onClick={toggleMenu}>
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className='lg:hidden absolute top-14 right-0 w-full bg-gray-100 shadow-lg rounded-md py-2 z-50'>
                    <ul className='flex flex-col items-center gap-3'>
                        <Link to={"/"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl' onClick={toggleMenu}>Home</Link>
                        <Link to={"/events"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl' onClick={toggleMenu}>Events</Link>
                        <Link to={"/contact_us"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl' onClick={toggleMenu}>Contact Us</Link>
                        { token && <Link to={"/orders"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl' onClick={toggleMenu}>My Orders</Link> }

                        {token !== null ? (
                            <>
                                <Link to={"/profile"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl flex gap-2 items-center' onClick={toggleMenu}>
                                    <PersonIcon sx={{fontSize: 16}} />
                                    <span>My Profile</span>
                                </Link>
                                <button onClick={handleLogout} className='text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-900 flex gap-2 items-center'>
                                    <LogoutIcon sx={{fontSize: 16}} />
                                    <span>Logout</span>
                                </button>
                                <Link to={"/myads"} className='bg-purple-900 hover:bg-purple-800 text-white rounded-lg text-xs flex p-2 items-center' onClick={toggleMenu}>Post Ad</Link>
                            </>
                        ) : (
                            <Link to={"/login"} className='hover:underline hover:text-purple-900 p-1 rounded-2xl' onClick={toggleMenu}>Login/Register</Link>
                        )}
                        { token && <div className="flex justify-center">
                            <Link
                                onClick={()=>{
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    });
                                    toggleMenu()
                                }}
                                to={"/download_app"}
                                className="border border-purple-900 text-purple-900 hover:text-white px-4 py-1 rounded-lg shadow-md hover:bg-purple-900 transition-all uppercase text-sm"
                            >
                                Download  Android App
                            </Link>
                        </div> }
                        {!token && <div className="flex justify-center">
                            <Link
                                onClick={()=>{
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    });
                                    toggleMenu()
                                }}
                                to={"/download_app"}
                                className="bg-purple-900 text-white px-4 py-1 rounded-lg text-sm shadow-md hover:bg-purple-700 transition-all"
                            >
                                Download App
                            </Link>
                        </div> }
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Header;
