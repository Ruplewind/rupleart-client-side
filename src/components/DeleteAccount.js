import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../utils/AuthContext';

function DeleteAccount() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDeleteAccount = () => {
        if (username == null || password == null) {
            toast.error("All fields must be filled.", {
                autoClose: 1000,
            });
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/user_login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: username,
                password,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then(() => {
                        toast.success("Account deletion request has been placed.", {
                            autoClose: 1000,
                        });
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000);
                    });
                } else {
                    toast.error("Failed to place account deletion request. Please check your credentials.", {
                        autoClose: 1000,
                    });
                }
            })
            .catch(() => {
                toast.error("Failed to place account deletion request. Please try again later.", {
                    autoClose: 1000,
                });
            });
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <ToastContainer />
            <div className='shadow-lg w-5/6 lg:w-1/3 mx-auto rounded-lg mt-20 bg-white p-4 font-montserratb'>
                <div className='text-2xl text-center font-bold'>Delete Account</div>
                <form className='text-sm'>
                    <div className='mt-5'>
                        <div className='text-md'>Username</div>
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 border-b border-gray-400 rounded-xs p-2 w-full"
                            placeholder='Enter your username'
                        />
                    </div>
                    <div className='mt-5'>
                        <div className='text-md'>Password</div>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 border-b border-gray-400 rounded-xs p-2 w-full"
                            placeholder='Enter your password'
                        />
                    </div>
                    <div>
                        <input
                            onClick={(e) => {
                                e.preventDefault();
                                handleDeleteAccount();
                            }}
                            type="submit"
                            value="Delete Account"
                            className='w-full p-2 text-white bg-red-600 hover:bg-red-400 rounded-lg mt-4 uppercase'
                        />
                    </div>
                </form>

                <div className='mt-4 text-sm text-red-600'>
                    Disclaimer: All your user data will be cleared within the next 7 days. If you wish to stop the account deletion process, write an email to <a href="mailto:Rupleart@gmail.com" className='text-blue-600 hover:underline'>Rupleart@gmail.com</a>.
                </div>

                <div className='mt-2 text-sm flex gap-1 items-center'>
                    <span>Changed your mind? </span>
                    <Link to={"/"} className='text-purple-900 hover:text-purple-700 hover:underline'>Go back</Link>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;
