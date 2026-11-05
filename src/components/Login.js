import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../utils/AuthContext';

function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if(password == null || email == null){
            toast.error("All fields must be filled.",{
                autoClose: 1000
            });
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/user_login`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res)=>{
            if(res.ok){
                res.json().then(data => {
                    login(data.token, data.userId, `${data.first_name} ${data.second_name}`, data.canPostAds);
                    toast.success("Welcome Onboard!",{
                        autoClose: 1000
                    });
                    setTimeout(()=>{
                        navigate('/');
                    }, 500);
                })                
            }else{
                toast.error("Login Failed.",{
                    autoClose: 1000
                });
            }
        })
        .catch(err => {
            toast.error("Login Failed.",{
                autoClose: 1000
            });
        })
    }
  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center p-4'>
        <ToastContainer />

        <div className='w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row'>

            {/* Brand panel */}
            <div className='relative lg:w-2/5 bg-[#3b0764] p-8 flex flex-col justify-center overflow-hidden'>
                <div
                    className='absolute inset-0'
                    style={{ background: 'radial-gradient(circle at 30% 20%, rgba(212,176,120,0.2), transparent 55%)' }}
                ></div>

                <div className='relative flex items-center gap-2 mb-8'>
                    <img src={require('../images/logo.png')} className='w-10 bg-white p-1.5 rounded-lg' alt="Rupleart" />
                    <span className='text-white font-bold text-lg'>Ruple Art</span>
                </div>

                <span className='relative text-[#d4b078] text-[11px] tracking-[0.3em] uppercase font-montserrat font-semibold mb-3'>
                    Sign In
                </span>
                <h1 className='relative font-serif italic text-white text-2xl lg:text-[26px] mb-4 leading-snug'>
                    Welcome to Rupleart
                </h1>
                <p className='relative text-gray-300 text-sm leading-relaxed font-montserrat'>
                    Sign in to continue discovering and shopping from Rupleart's collection of{' '}
                    <i className="text-[#d4b078]">creative, design and lifestyle products</i>.
                </p>

                <div className='relative mt-10 pt-6 border-t border-white/10 text-sm font-montserrat'>
                    <p className='text-gray-300'>
                        <i>New to Rupleart? Create an account and start discovering.</i>
                    </p>
                    <Link
                        to={"/register"}
                        className='inline-block mt-3 text-sm border border-[#d4b078] text-[#d4b078] hover:bg-[#d4b078] hover:text-purple-950 transition-colors px-4 py-1.5 rounded-lg'
                    >
                        Create an account
                    </Link>
                </div>
            </div>

            {/* Form panel */}
            <div className='lg:w-3/5 p-6 lg:p-10 font-montserratb flex flex-col justify-center'>
                <div className='text-2xl font-bold text-purple-950 mb-1'>Login</div>
                <div className='text-xs text-gray-500 mb-6'>Good to see you again.</div>

                <form className='text-sm'>
                        <div>
                            <div className='text-sm font-semibold text-gray-700'>Email</div>
                            <input type="email" onChange={e=>setEmail(e.target.value)} className="mt-2 border border-gray-200 bg-gray-50 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent" placeholder='rupleart@gmail.com' />
                        </div>
                        <div className='mt-4'>
                            <div className='text-sm font-semibold text-gray-700'>Password</div>
                            <input type="password" onChange={e=>setPassword(e.target.value)} className="mt-2 border border-gray-200 bg-gray-50 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent" placeholder='************' />
                        </div>
                        <div className='flex justify-end'>
                            <Link to={"/forgot_password"} className="mt-2 text-gray-500 hover:text-purple-900 transition-colors text-xs">Forgot password?</Link>
                        </div>
                        <div>
                            <input 
                            onClick={e => {
                                e.preventDefault();
                                handleSubmit();
                            }} type="submit" 
                            value="Login" 
                            className='w-full p-2.5 text-white bg-purple-900 hover:bg-purple-700 transition-colors rounded-lg mt-6 uppercase text-sm shadow-md cursor-pointer' />
                        </div>
                </form>

                <div className='mt-4 text-sm flex gap-1 items-center lg:hidden'>
                    <span>I don't have an account? Register </span>
                    <Link to={"/register"} className='text-purple-900 hover:text-purple-700 hover:underline'>here</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login