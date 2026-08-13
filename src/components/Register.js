import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [secondName, setSecondName] = useState(null);
    const [password, setPassword] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    const navigate = useNavigate();
    const phoneNumberRegex = /^(07|01)\d{8}$/;

    const handleSubmit = () => {
        if(firstName == null || secondName == null || password == null || phoneNumber == null || email == null){
            toast.error("All fields must be filled.",{
                autoClose: 1000
            });
            return;
        }

        // if(!phoneNumberRegex.test(phoneNumber)){
        //     toast.error("Invalid phone number.",{
        //         autoClose: 1000
        //     });
        //     return;
        // }

        fetch(`${process.env.REACT_APP_API_URL}/register_user`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                first_name : firstName,
                second_name : secondName,
                email,
                password,
                phoneNumber
            })
        })
        .then((res)=>{
            if(res.ok){
                toast.success("Registration succesful",{
                    autoClose: 1000
                });
                setTimeout(()=>{
                    navigate('/login');
                }, 500);
                
            }else{
                toast.error("Failed.",{
                    autoClose: 1000
                });
            }
        })
        .catch(err => {
            toast.error("Failed.",{
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
                    Join Rupleart
                </span>
                <h1 className='relative font-serif italic text-white text-2xl lg:text-[26px] mb-4 leading-snug'>
                    Welcome to Rupleart
                </h1>
                <p className='relative text-gray-300 text-sm leading-relaxed font-montserrat'>
                    Create an account to continue discovering and shopping from Rupleart's collection of{' '}
                    <i className="text-[#d4b078]">creative, design and lifestyle products</i>.
                </p>

                <div className='relative mt-10 pt-6 border-t border-white/10 text-sm font-montserrat'>
                    <p className='text-gray-300'>
                        <i>Already part of Rupleart? Sign in and keep discovering.</i>
                    </p>
                    <Link
                        to={"/login"}
                        className='inline-block mt-3 text-sm border border-[#d4b078] text-[#d4b078] hover:bg-[#d4b078] hover:text-purple-950 transition-colors px-4 py-1.5 rounded-lg'
                    >
                        Sign in here
                    </Link>
                </div>
            </div>

            {/* Form panel */}
            <div className='lg:w-3/5 p-6 lg:p-10 font-montserratb'>
                <div className='text-2xl font-bold text-purple-950 mb-1'>Create your account</div>
                <div className='text-xs text-gray-500 mb-6'>It only takes a minute.</div>

                <form className='text-sm'>
                        <div className='flex gap-3'>
                            <div className='w-1/2'>
                                <div className='text-sm font-semibold text-gray-700'>First name</div>
                                <input type="text" onChange={e => setFirstName(e.target.value)} className="mt-2 border border-gray-200 bg-gray-50 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent" placeholder='John' />
                            </div>
                            <div className='w-1/2'>
                                <div className='text-sm font-semibold text-gray-700'>Second name</div>
                                <input type="text" onChange={e => setSecondName(e.target.value)} className="mt-2 border border-gray-200 bg-gray-50 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent" placeholder='Doe' />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className='text-sm font-semibold text-gray-700'>Email</div>
                            <input type="email" onChange={e => setEmail(e.target.value)} className="mt-2 border border-gray-200 bg-gray-50 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent" placeholder='rupleart@gmail.com' />
                        </div>
                        <div className='mt-4'>
                            <div className='text-sm font-semibold text-gray-700'>Phone number</div>
                            <input type="text" onChange={e => setPhoneNumber(e.target.value)} className="mt-2 border border-gray-200 bg-gray-50 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent" placeholder='0759324250' />
                        </div>
                        <div className='mt-4'>
                            <div className='text-sm font-semibold text-gray-700'>Password</div>
                            <input type="password" onChange={e => setPassword(e.target.value)} className="mt-2 border border-gray-200 bg-gray-50 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent" placeholder='************' />
                        </div>
                        <button 
                        onClick={(e)=>{
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className='w-full p-2.5 text-white bg-purple-900 hover:bg-purple-700 transition-colors rounded-lg mt-6 uppercase text-sm shadow-md'>Register</button>
                </form>

                <div className='mt-4 text-sm flex gap-1 items-center lg:hidden'>
                    <span>I have an account? Login </span>
                    <Link to={"/login"} className='text-purple-900 hover:text-purple-700 hover:underline'>here</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register