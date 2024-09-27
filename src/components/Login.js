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
                    console.log(data)
                    login(data.token, data.userId, `${data.first_name} ${data.second_name}`);
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
    <div className='bg-gray-100 min-h-screen'>
        <ToastContainer />
        <div className='shadow-lg w-5/6 lg:w-1/3 mx-auto rounded-lg mt-20 bg-white p-4 font-montserratb'>
            <div className='text-2xl text-center font-bold'>Login</div>
            <form className='text-sm'>
                    <div className='mt-5'>
                        <div className='text-md'>Email</div>
                        <input type="email" onChange={e=>setEmail(e.target.value)} className="mt-1 border-b border-gray-400 rounded-xs p-2 w-full" placeholder='john.doe@gmail.com' />
                    </div>
                    <div className='mt-5'>
                        <div className='text-md'>Password</div>
                        <input type="password" onChange={e=>setPassword(e.target.value)} className="mt-1 border-b border-gray-400 rounded-xs p-2 w-full" placeholder='************' />
                    </div>
                    <div className='flex justify-end'>
                        <Link to={"/forgot_password"} className="mt-2 hover:text-purple-700">Forgot password?</Link>
                    </div>
                    <div>
                        <input 
                        onClick={e => {
                            e.preventDefault();
                            handleSubmit();
                        }} type="submit" 
                        value="Login" 
                        className='w-full p-2 text-white bg-purple-900 hover:bg-purple-700 rounded-lg mt-4 uppercase' />
                    </div>
            </form>

            <div className='mt-2 text-sm flex gap-1 items-center'>
                <span>I don't have an account? Register </span>
                <Link to={"/register"} className='text-purple-900 hover:text-purple-700 hover:underline'>here</Link>
            </div>
        </div>
    </div>
  )
}

export default Login