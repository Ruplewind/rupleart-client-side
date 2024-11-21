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
    <div className='bg-gray-100 min-h-screen'>
        <ToastContainer />
        <div className='shadow-lg w-5/6 lg:w-1/3 mx-auto rounded-lg mt-20 bg-white p-4 font-montserratb'>
            <div className='text-2xl text-center font-bold'>Register</div>
            <form className='text-sm'>
                    <div className='flex gap-2'>
                        <div className='mt-3 w-1/2'>
                            <div className='text-md'>First name</div>
                            <input type="text" onChange={e => setFirstName(e.target.value)} className="mt-2 border-b border-gray-400 rounded-xs p-2 w-full" placeholder='John' />
                        </div>
                        <div className='mt-3 w-1/2'>
                            <div className='text-md'>Second name</div>
                            <input type="text" onChange={e => setSecondName(e.target.value)} className="mt-2 border-b border-gray-400 rounded-xs p-2 w-full" placeholder='Doe' />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className='text-md'>Email</div>
                        <input type="email" onChange={e => setEmail(e.target.value)} className="mt-2 border-b border-gray-400 rounded-xs p-2 w-full" placeholder='john.doe@gmail.com' />
                    </div>
                    <div className='mt-3'>
                        <div className='text-md'>Phone number</div>
                        <input type="text" onChange={e => setPhoneNumber(e.target.value)} className="mt-2 border-b border-gray-400 rounded-xs p-2 w-full" placeholder='0707357072' />
                    </div>
                    <div className='mt-3'>
                        <div className='text-md'>Password</div>
                        <input type="password" onChange={e => setPassword(e.target.value)} className="mt-2 border-b border-gray-400 rounded-xs p-2 w-full" placeholder='************' />
                    </div>
                    <button 
                    onClick={(e)=>{
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className='w-full p-2 text-white bg-purple-900 hover:bg-purple-700 rounded-lg mt-4 uppercase'>Register</button>
            </form>

            <div className='mt-2 text-sm flex gap-1 items-center'>
                <span>I have an account? Login </span>
                <Link to={"/login"} className='text-purple-900 hover:text-purple-700 hover:underline'>here</Link>
            </div>
        </div>
    </div>
  )
}

export default Register