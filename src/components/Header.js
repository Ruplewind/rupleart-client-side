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

    const navLinkClass = 'hover:text-purple-900 border-b-2 border-transparent hover:border-purple-900 px-1 py-1 transition-colors';

    return (
        <div className='sticky top-0 z-50 bg-white flex items-center justify-between shadow-md rounded-b-sm shadow-slate-400 w-full p-3 lg:px-6 font-montserrat overflow-visible'>
            <div
                className='flex items-center ml-1 lg:ml-2 cursor-pointer'
                onClick={()=>{
                    navigate("/")
                }}
            >
                <img 
                    src={require('../images/logo.png')} 
                    className='w-12 max-w-full h-auto' 
                    alt="Logo"
                />
            </div>

            {/* Desktop Menu */}
            <div className='hidden lg:flex items-center justify-end'>
                <ul className='uppercase mr-1 lg:mr-4 tracking-wider text-sm flex items-center gap-5'>
                    <Link to={"/"} className={navLinkClass}>Home</Link>
                    <Link to={"/events"} className={navLinkClass}>Events</Link>
                    <Link to={"/about_us"} className={navLinkClass}>About Us</Link>
                    <Link to={"/contact_us"} className={navLinkClass}>Contact Us</Link>
                    { token && <Link to={"/orders"} className={navLinkClass}>My Orders</Link> }

                    <Link to={'/cart'} className='relative flex items-center hover:text-purple-900 transition-colors' aria-label="Cart">
                        <ShoppingCartIcon fontSize={'small'} />
                        {products.length > 0 && (
                            <span className='absolute -top-2 -right-2 bg-purple-900 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center'>
                                {products.length}
                            </span>
                        )}
                    </Link>

                    {token !== null ? (
                        <div className='relative'>
                            <button
                                type="button"
                                aria-haspopup="true"
                                aria-expanded={dropdownVisible}
                                aria-label="Account menu"
                                className='hover:text-purple-900 transition-colors flex items-center cursor-pointer'
                                onClick={toggleDropdown}
                            >
                                <PersonIcon sx={{fontSize: 20}} />
                            </button>

                            {dropdownVisible && (
                                <div className='absolute z-50 right-0 top-full mt-2 w-40 bg-gray-100 shadow-lg rounded-md py-2 normal-case'>
                                    <button 
                                        onClick={() => {
                                            navigate('/profile');
                                            toggleDropdown();
                                        }} 
                                        className='w-full text-left px-4 py-2 text-gray-700 hover:bg-white hover:text-purple-900 flex gap-2 items-center'
                                    >
                                        <PersonIcon sx={{fontSize: 16}} />
                                        <span>My profile</span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            toggleDropdown();
                                        }} 
                                        className='w-full text-left px-4 py-2 text-gray-700 hover:bg-white hover:text-red-900 flex gap-2 items-center'
                                    >
                                        <LogoutIcon sx={{fontSize: 16}} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to={"/login"} className={navLinkClass}>Login/Register</Link>
                    )}

                    {token && (
                        <Link to={"/myads"} className='bg-purple-900 hover:bg-purple-800 transition-colors text-white rounded-lg text-xs px-3 py-1.5 normal-case tracking-normal'>
                            Post Ad
                        </Link>
                    )}

                    <span className='w-px h-5 bg-gray-200'></span>

                    { token ? (
                        <Link
                            onClick={()=>{
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }}
                            to={"/download_app"}
                            className="border border-purple-900 text-purple-900 hover:text-white px-4 py-1.5 rounded-lg shadow-md hover:bg-purple-900 transition-all normal-case tracking-normal text-sm"
                        >
                            Download Android App
                        </Link>
                    ) : (
                        <Link
                            onClick={()=>{
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }}
                            to={"/download_app"}
                            className="bg-purple-900 text-white px-4 py-1.5 rounded-lg text-sm shadow-md hover:bg-purple-700 transition-all normal-case tracking-normal"
                        >
                            Download App
                        </Link>
                    ) }
                </ul>
            </div>

            {/* Mobile Menu and Icons */}
            <div className='lg:hidden flex items-center gap-1'>
                <Link to={'/cart'} className='relative flex items-center px-2 hover:text-purple-900' aria-label="Cart">
                    <ShoppingCartIcon fontSize={'small'} />
                    {products.length > 0 && (
                        <span className='absolute top-0 right-0 bg-purple-900 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center'>
                            {products.length}
                        </span>
                    )}
                </Link>
                <button
                    type="button"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    className='ml-1 cursor-pointer p-1'
                    onClick={toggleMenu}
                >
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className='lg:hidden absolute top-full left-0 right-0 bg-gray-100 shadow-lg rounded-b-md z-50 divide-y divide-gray-200'>
                    <ul className='flex flex-col items-stretch text-center'>
                        <Link to={"/"} className='hover:bg-white hover:text-purple-900 py-3 transition-colors' onClick={toggleMenu}>Home</Link>
                        <Link to={"/events"} className='hover:bg-white hover:text-purple-900 py-3 transition-colors' onClick={toggleMenu}>Events</Link>
                        <Link to={"/about_us"} className='hover:bg-white hover:text-purple-900 py-3 transition-colors' onClick={toggleMenu}>About Us</Link>
                        <Link to={"/contact_us"} className='hover:bg-white hover:text-purple-900 py-3 transition-colors' onClick={toggleMenu}>Contact Us</Link>
                        { token && <Link to={"/orders"} className='hover:bg-white hover:text-purple-900 py-3 transition-colors' onClick={toggleMenu}>My Orders</Link> }

                        {token !== null ? (
                            <>
                                <Link to={"/profile"} className='hover:bg-white hover:text-purple-900 py-3 transition-colors flex gap-2 items-center justify-center' onClick={toggleMenu}>
                                    <PersonIcon sx={{fontSize: 16}} />
                                    <span>My Profile</span>
                                </Link>
                                <button onClick={() => { handleLogout(); toggleMenu(); }} className='py-3 text-gray-700 hover:bg-white hover:text-red-900 flex gap-2 items-center justify-center'>
                                    <LogoutIcon sx={{fontSize: 16}} />
                                    <span>Logout</span>
                                </button>
                                <Link to={"/myads"} className='hover:bg-white flex items-center justify-center py-3' onClick={toggleMenu}>
                                    <span className='bg-purple-900 hover:bg-purple-800 text-white rounded-lg text-xs px-4 py-1.5'>Post Ad</span>
                                </Link>
                            </>
                        ) : (
                            <Link to={"/login"} className='hover:bg-white hover:text-purple-900 py-3 transition-colors' onClick={toggleMenu}>Login/Register</Link>
                        )}

                        <div className="flex justify-center py-4">
                            { token ? (
                                <Link
                                    onClick={()=>{
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                        toggleMenu()
                                    }}
                                    to={"/download_app"}
                                    className="border border-purple-900 text-purple-900 hover:text-white px-4 py-1.5 rounded-lg shadow-md hover:bg-purple-900 transition-all uppercase text-sm"
                                >
                                    Download Android App
                                </Link>
                            ) : (
                                <Link
                                    onClick={()=>{
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                        toggleMenu()
                                    }}
                                    to={"/download_app"}
                                    className="bg-purple-900 text-white px-4 py-1.5 rounded-lg text-sm shadow-md hover:bg-purple-700 transition-all"
                                >
                                    Download App
                                </Link>
                            ) }
                        </div>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Header;