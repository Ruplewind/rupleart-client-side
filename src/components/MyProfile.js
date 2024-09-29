import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utils/AuthContext';
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function MyProfile() {

    const [ firstName, setFirstName] = useState(null);
    const [ secondName, setSecondName] = useState(null);
    const [ email, setEmail] = useState(null);
    const [ phoneNumber, setPhoneNumber] = useState(null);
    const [ loading, setLoading] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false); // State for modal visibility

    const { userId, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const myRegex = /^07\d{8}$/;

    const checkoutSchema = yup.object({
        firstname: yup.string().required().min(3),
        secondname: yup.string().required().min(3),
        email: yup.string().email('Invalid Email').required().min(3),
        phoneNumber: yup.string().nullable().matches(myRegex, {message:"Phone number is not valid", excludeEmptyString: true}),
    })

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/profile`,{
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        })
        .then( data => data.json())
        .then( data => {
            setEmail(data.email);
            setFirstName(data.first_name);
            setSecondName(data.second_name);
            setPhoneNumber(data.phoneNumber);
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    const handleSubmit = (data) =>{
        setLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/update_profile`,{
            method: 'PUT',
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then((res)=>{
            if(res.ok){
                setLoading(false);
                toast.success("Success",{
                    autoClose: 500
                })
                setTimeout(()=>{
                    navigate('/');
                },700);
            }else{
                toast.error("Failed to update profile");
            }
        })
        .catch( err=>{
            console.log(err);
        })
    }

    const passwordSchema = yup.object({
        currentPassword: yup.string().required('Current password is required'),
        newPassword: yup.string().required('New password is required').min(6, 'Password should be at least 6 characters'),
        confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match').required('Confirm your new password')
    })

    const handleModalSubmit = (data) => {

        setLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/change_user_password`,{
            method: 'PUT',
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({
                current_password: data.currentPassword,
                new_password: data.newPassword
            })
        })
        .then((res)=>{
            if(res.ok){
                setLoading(false);
                toast.success("Success",{
                    autoClose: 500
                })
                setTimeout(()=>{
                    setShowPasswordModal(false);
                },500);
            }else{
                toast.error("Failed to update profile");
            }
            setLoading(false);
        })
        .catch( err=>{
            console.log(err);
            toast.error("Failed to update profile");
            setLoading(false);
        })
        
    }

    return (
    <div className='mt-10 mb-10'>
        <ToastContainer />
        <Formik
            initialValues={{firstname: firstName, secondname: secondName, email:email, phoneNumber:phoneNumber}}
            enableReinitialize={true}
            validationSchema={checkoutSchema}
            onSubmit={(values)=>{
                    handleSubmit(values);
                }
            }
            >
        {(props)=>(

    <Form>

        <div className={`block lg:flex lg:justify-center mx-5 lg:mx-auto ${showPasswordModal ? 'blur-sm' : ''}`}>                
            <div className="block w-full lg:w-1/3">
                <div className="font-bold mb-5">Account Information</div>
                <div className="flex gap-4">
                    <div>
                        <Field type="text" name="firstname" onChange={e => {setFirstName(e.target.value)}} value={props.values.firstname} placeholder="First name"  className="border-b-2 p-2 mb-2 w-full text-sm" required/>
                        <div className="p-1 capitalize text-red-900 text-xs">{props.touched.firstname && props.errors.firstname}</div>
                    </div>
                    <div>
                        <Field type="text" name="secondname" onChange={e => {setSecondName(e.target.value)}} value={props.values.secondname} placeholder="Second name"  className="border-b-2 p-2 mb-2 w-full text-sm" required/>
                        <div className="p-1 capitalize text-red-900 text-xs">{props.touched.secondname && props.errors.secondname}</div>
                    </div>
                </div>                
                <div>
                <Field type="email" name="email" onChange={e => {setEmail(e.target.value)}} value={props.values.email} readOnly placeholder="Email"  className="border-b-2 p-2 mb-2 w-full text-sm" required/>
                </div>
                <div className="p-1 capitalize text-red-900 text-xs">{props.touched.email && props.errors.email}</div>
                <div>
                <Field type="text" name="phoneNumber" onChange={e => {setPhoneNumber(e.target.value)}} value={props.values.phoneNumber} placeholder="Phone Number" className="border-b-2 p-2 mb-2 w-full text-sm" />
                </div>

                <button className="w-28 flex justify-center p-2 border-2 bg-purple-900 mt-3 hover:bg-purple-700 text-white rounded-lg" type="submit">
                    { loading &&  <div><SyncLoader size={6} color={"white"}/></div> }
                    {!loading && <div className='text-sm'>Save changes</div> }
                </button>

                <button onClick={e => {
                    e.preventDefault();
                    setShowPasswordModal(true); // Open modal on button click
                }} className='mt-5 text-xs text-red-900 hover:text-red-500'>Change password?</button>
            </div>
        </div>

        </Form>
    )}
    </Formik>

    {showPasswordModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowPasswordModal(false)}>
                <div className="bg-white p-4 rounded-lg shadow-lg relative w-3/4 lg:w-1/3" onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-md font-bold mb-4">Change Password</h3>
                    <Formik
                        initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
                        validationSchema={passwordSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            handleModalSubmit(values);
                        }}
                    >
                        {(props) => (
                            <Form>
                                <div className="mb-2">
                                    <Field type="password" name="currentPassword" placeholder="Current Password" className="border-b-2 p-2 mb-2 w-full" />
                                    <div className="p-1 capitalize text-red-900 text-xs">{props.touched.currentPassword && props.errors.currentPassword}</div>
                                </div>
                                <div className="mb-2">
                                    <Field type="password" name="newPassword" placeholder="New Password" className="border-b-2 p-2 mb-2 w-full" />
                                    <div className="text-red-600 text-xs">{props.touched.newPassword && props.errors.newPassword}</div>
                                </div>
                                <div className="mb-2">
                                    <Field type="password" name="confirmNewPassword" placeholder="Confirm New Password" className="border-b-2 p-2 mb-2 w-full" />
                                    <div className="text-red-600 text-xs">{props.touched.confirmNewPassword && props.errors.confirmNewPassword}</div>
                                </div>
                                <div className="flex justify-end gap-4 text-sm">
                                    <button type="button" className="text-gray-600" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                                    <button type="submit" className="bg-purple-900 text-white p-2 rounded-lg">
                                        { loading &&  <div><SyncLoader size={6} color={"white"}/></div> }
                                        {!loading && <div className='text-sm'>Change Password</div> }
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )}
    </div>
  )
}

export default MyProfile;
