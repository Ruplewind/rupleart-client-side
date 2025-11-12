import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../utils/AuthContext';
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function MyAds() {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [myads, setMyads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [editShowPasswordModal, setEditShowPasswordModal] = useState(false);

    const [productName, setProductName] = useState(null);
    const [type, setType] = useState(null);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState(null);
    const [size, setSize] = useState(null);
    const [error, setError] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);

    const [imageSrc, setImageSrc] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);

    const [editId, setEditId] = useState(null);

    const resetState =  () => {
        setProductName(null);
        setType(null);
        setPrice(0);
        setDescription(null);
        setSize(null);
        setImageSrc([]);
        setImageUrl([]);
    }

      const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) {
            return;
        }
        setImageSrc((prevImages) => [...prevImages, ...files]);
        const newImageUrls = files.map((file) => URL.createObjectURL(file));
        setImageUrl((prevUrls) => [...prevUrls, ...newImageUrls]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDelete = (index) => {
        const updatedImageSrc = [...imageSrc];
        const updatedImageUrl = [...imageUrl];
        updatedImageSrc.splice(index, 1);
        updatedImageUrl.splice(index, 1);
        setImageSrc(updatedImageSrc);
        setImageUrl(updatedImageUrl);
    };

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/my_products`,{
          headers: {
            'Authorization':`Bearer ${token}`
          }
        })
        .then( data => {
            if(data.ok){
                return data.json();

            }else if(data.status === 401){
                navigate("/login")
            }
        })
        .then( data => {
          setMyads(data)
          setLoading(false);
        })
        .catch( err => { 
            console.log(err);
            setError(true);
         })
    },[]);

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/get_categories`,{
        headers: {
            'Authorization':`Bearer ${token}`
        }
        })
        .then( data => data.json())
        .then( data => {
            setCategories(data)
        } )
        .catch( err => { console.log(err) })
    },[])

    const adSchema = yup.object({
        currentPassword: yup.string().required('Current password is required'),
        newPassword: yup.string().required('New password is required').min(6, 'Password should be at least 6 characters'),
        confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match').required('Confirm your new password')
    });

    const [submitLoading, setSubmitLoading] = useState(false);

    const [errorText, setErrorText] = useState('');

    const handleSubmit = () => {
        setSubmitLoading(true);

        if(productName == null || productName.length < 1 || price < 1 || imageSrc.length < 1 || type == null || size == null || description == null){
            toast('All fields must be filled',{
                type:'error'
            })
            setSubmitLoading(false);
            return
        }

        if(!termsChecked){
            toast('Terms and conditions must be checked',{
                type:'error'
            });
            setSubmitLoading(false);
            return
        }

        const formData = new FormData();

        formData.append('productName', productName);
        formData.append('type', type);
        formData.append('price', price);
        imageSrc.forEach((image, index) => {
            formData.append(`image`, image);
        });
        formData.append('description', description);
        formData.append('size', size);

        fetch(`${process.env.REACT_APP_API_URL}/add_product`,{
            method: 'POST',
            headers: {
              'Authorization':`Bearer ${token}`
            },
            body: formData
        })
        .then((response)=>{
            if(response.ok){
                setShowPasswordModal(false);
                setSubmitLoading(true);
                toast('Success',{
                    type:"success"
                });
                setTimeout(()=>{
                    setSubmitLoading(false);
                    window.location.reload();
                },500)
            }else{
              response.json().then( err => {      
                setSubmitLoading(false);
                if(err.error == "Invalid Token"){
                    toast("Login to Continue",{
                        type:"error"
                    }); 
                }
                });
                
            }
        })
        .catch((err)=>{   
            setErrorText(err.error);
            setSubmitLoading(false);
            if(err.error == "Invalid Token"){
                toast("Login to Continue",{
                    type:"error"
                }); 
            }
        })
    }

    const handleEditSubmit = () =>{
        setSubmitLoading(true);

        if(productName == null || price < 1 || imageSrc.length < 1 || type == null || description == null || size == null){
            toast.error('All fields must be filled');
            setSubmitLoading(false);
            return
        }
    
        const formData = new FormData();
    
        formData.append('productName', productName);
        formData.append('type', type);
        formData.append('price', price);
        imageSrc.forEach((image, index) => {
            formData.append(`image`, image);
        });
        formData.append('description', description);
        formData.append('size', size);
    
        fetch(`${process.env.REACT_APP_API_URL}/edit_product/${editId}`,{
            method: 'PUT',
            headers: {
              'Authorization':`Bearer ${token}`
            },
            body: formData
        })
        .then((response)=>{
            if(response.ok){
                setEditShowPasswordModal(false);
                toast.success('Success');
                setTimeout(()=>{
                    setSubmitLoading(false);
                    window.location.reload();
                },500)
            }else{
                response.json().then( err => {
                    setSubmitLoading(false);
                    if(err.error == "Invalid Token"){
                        
                        toast.error("Login to Continue");
                    }
                })
                
            }
        })
        .catch((err)=>{
            setSubmitLoading(false);
            if(err.error == "Invalid Token"){
                
                toast.error("Login to Continue"); 
            }
        })
    }

    const fileInputRef = useRef(null);

    const handleDeleteItem = ( id ) => {
        fetch(`${process.env.REACT_APP_API_URL}/del_product/${id}`,{
            method: 'DELETE',
            headers: {
              'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            if(response.ok){
                toast.success('Success');
                setTimeout(()=>{
                    window.location.reload();
                },700)
            }else{
                toast.error('Server Error')
            }
        })
        .catch((err)=>{
            toast.error('Server Error')
        })
    }

  return (
    <div className='w-5/6 lg:w-3/4 mx-5 lg:mx-auto font-montserrat mt-10 mb-10'>
        <ToastContainer />
        <div className='text-xl font-bold uppercase'>My Ads</div>

        <div className="flex justify-end">
            <button 
                onClick={e => {
                    e.preventDefault();
                    setShowPasswordModal(true);
                }}
                className='bg-purple-900 hover:bg-purple-700 p-2 px-4 text-xs rounded-lg text-white'
            >
                    + Create an Ad
            </button>
        </div>

        {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 font-montserrat">
        {
            !loading && !error && myads.length > 0 && myads.map(ad => (
                <Link
                    to="/preview"
                    className="bg-white p-1 lg:p-4 pb-2 lg:pb-4 rounded-lg shadow-lg group"
                    key={ad._id}
                    state={{ data: ad }}
                >
                    <div className="flex flex-col h-full">
                        <div className='justify-end'>
                        <div className='text-center p-2'>
                            {
                                ad.approvalStatus == 0 ? 
                                    <div className='bg-gray-300 text-xs rounded-2xl p-1 w-full lg:w-3/4 mx-auto'>Pending approval</div>
                                : ad.approvalStatus == 1 ? 
                                    <div className='bg-green-500 text-xs rounded-2xl p-1 w-full lg:w-1/2 mx-auto text-white'>Approved</div>
                                :
                                <div>
                                    <div className='bg-red-500 text-xs rounded-2xl p-1 w-full lg:w-1/2 mx-auto text-white'>Rejected</div>

                                    { ad.disapproval_reason && <div className='mt-2 text-xs capitalize'>
                                        <b>Reason:</b> {ad.disapproval_reason}
                                    </div> }
                                </div>
                            }
                        </div>
                        </div>
                        <div className="flex justify-center items-center h-44 lg:h-64">
                            <img
                                src={`${process.env.REACT_APP_API_URL}/uploads/${ad.image[0]}`}
                                alt={ad.productName}
                                className="object-cover w-full h-full rounded-md"
                            />
                        </div>
                        <div className='flex mt-2'>
                            <div className='w-5/6'>
                                <div className="font-bold text-lg mt-3 truncate">{ad.productName}</div>
                            </div>
                            <div className='1/6 flex justify-end'>
                                <div className="text-purple-900 mt-2">Ksh {ad.price.toLocaleString()}</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-700 mt-2 lg:group-hover:max-h-20 lg:max-h-0 overflow-hidden transition-all duration-300">
                            <p className="line-clamp-2">{ad.description}</p>
                        </div>

                        <div className="flex gap-2 justify-end mt-auto lg:max-h-0 lg:overflow-hidden group-hover:max-h-20 transition-all duration-300">
                            <button onClick={(e)=>{
                                e.preventDefault();
                                setEditId(ad._id);
                                setProductName(ad.productName);
                                setType(ad.type);
                                setPrice(ad.price);
                                setDescription(ad.description);
                                setSize(ad.size);
                                // setImageUrl(`${process.env.REACT_APP_API_URL}/uploads/${ad.image[0]}`);
                                // setImageSrc(ad.image[0]);
                                setImageSrc(ad.image);
                                const imageUrls = ad.image.map(image => `${process.env.REACT_APP_API_URL}/uploads/${image}`);
                                setImageUrl(prevImageUrls => [...prevImageUrls, ...imageUrls]);
                                setEditShowPasswordModal(true);
                            }} className='bg-blue-900 hover:bg-blue-700 p-1 text-white rounded-lg text-xs px-2'>
                                Edit
                            </button>
                            <button
                                onClick={(e)=>{
                                    e.preventDefault();
                                    handleDeleteItem(ad._id);
                                }}
                                className='bg-red-900 hover:bg-red-700 p-1 text-white rounded-lg text-xs px-2'>
                                    Delete
                            </button>
                        </div>
                    </div>
                </Link>
            ))
        }

        </div> */}

        <div className="overflow-x-auto">
            <table className="mt-5 w-full border bg-white min-w-full text-xs lg:text-sm uppercase">
                <thead>
                <tr className="bg-gray-200 p-2">
                    <th className="p-2">Product ID</th>
                    <th className="p-2">Image</th>
                    <th className="p-2">Title/Description</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Size</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Approval Status</th>
                    <th className="p-2">Edit</th>
                    <th className="p-2">Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    !loading && !error && myads.length > 0 && myads.map((ad, index) => (
                    <tr
                        key={ad._id}
                        className="cursor-pointer odd:bg-gray-50 even:bg-white hover:bg-gray-100 border-b border-gray-300 transition-colors"
                        onClick={(e) => {
                                e.stopPropagation(); // prevent row click
                                setEditId(ad._id);
                                setProductName(ad.productName);
                                setType(ad.type);
                                setPrice(ad.price);
                                setDescription(ad.description);
                                setSize(ad.size);
                                setImageSrc(ad.image);
                                const imageUrls = ad.image.map(image => `${process.env.REACT_APP_API_URL}/uploads/${image}`);
                                setImageUrl(prevImageUrls => [...prevImageUrls, ...imageUrls]);
                                setEditShowPasswordModal(true);
                            }}
                    >
                        <td className='text-center p-2'>#{ad.productId}</td>
                        <td className="flex justify-center p-2">
                        <img
                            src={`${process.env.REACT_APP_API_URL}/uploads/${ad.image[0]}`}
                            alt={ad.productName}
                            className="w-30 h-20 object-cover"
                        />
                        </td>
                        <td className="p-2">
                        <div className="font-bold">{ad.productName}</div>
                        <div>{ad.description}</div>
                        </td>
                        <td className="text-center p-2">{ad.type}</td>
                        <td className="text-center p-2">{ad.size} cm</td>
                        <td className="text-center p-2">Ksh. {ad.price}</td>
                        <td className="text-center p-2">
                        {
                            ad.approvalStatus === 0 ? (
                            <div className="bg-gray-300 text-xs rounded-2xl p-1 w-full lg:w-3/4 mx-auto">Pending approval</div>
                            ) : ad.approvalStatus === 1 ? (
                            <div className="bg-green-500 text-xs rounded-2xl p-1 w-full lg:w-1/2 mx-auto text-white">Approved</div>
                            ) : (
                            <div>
                                <div className="bg-red-500 text-xs rounded-2xl p-1 w-full lg:w-1/2 mx-auto text-white">Rejected</div>
                                {ad.disapproval_reason && (
                                <div className="mt-2 text-xs capitalize">
                                    <b>Reason:</b> {ad.disapproval_reason}
                                </div>
                                )}
                            </div>
                            )
                        }
                        </td>
                        <td className="p-2">
                        <div className="flex justify-center">
                            <button
                            onClick={(e) => {
                                e.stopPropagation(); // prevent row click
                                setEditId(ad._id);
                                setProductName(ad.productName);
                                setType(ad.type);
                                setPrice(ad.price);
                                setDescription(ad.description);
                                setSize(ad.size);
                                setImageSrc(ad.image);
                                const imageUrls = ad.image.map(image => `${process.env.REACT_APP_API_URL}/uploads/${image}`);
                                setImageUrl(prevImageUrls => [...prevImageUrls, ...imageUrls]);
                                setEditShowPasswordModal(true);
                            }}
                            className="bg-blue-900 hover:bg-blue-700 p-1 text-white rounded-lg text-xs px-2"
                            >
                            Edit
                            </button>
                        </div>
                        </td>
                        <td>
                        <div className="flex justify-center">
                            <button
                            onClick={(e) => {
                                e.stopPropagation(); // prevent row click
                                handleDeleteItem(ad._id);
                            }}
                            className="bg-red-900 hover:bg-red-700 p-1 text-white rounded-lg text-xs px-2"
                            >
                            Delete
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>

        {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowPasswordModal(false)}>
            <div className="bg-white p-4 rounded-lg shadow-lg relative w-full mx-5 lg:w-1/3 text-xs" onClick={(e) => e.stopPropagation()}>
                <div className="mt-2">
                    <div className='font-bold'>Product Images</div>
                    <div
                        className="flex items-center justify-center w-full mt-1"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        >
                        {imageUrl.length > 0 ? (
                        <div className="flex flex-nowrap overflow-x-auto gap-2 p-1">
                            {imageUrl.map((url, index) => (
                            <div key={index} className="h-40 w-40 relative flex-shrink-0">
                                <button
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                                onClick={(e) =>{ e.preventDefault(); handleDelete(index); }}
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                </button>
                                <img
                                src={url}
                                alt="Preview"
                                className="w-full h-full object-contain rounded-lg"
                                />
                            </div>
                            ))}
                        </div>
                        ) : (
                            <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                            >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                                >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and
                                drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                name="images"
                                multiple
                                onChange={(e) => {
                                const files = Array.from(e.target.files);
                                setImageSrc([...imageSrc, ...files]);
                                const urls = files.map(file => URL.createObjectURL(file));
                                setImageUrl([...imageUrl, ...urls]);
                                }}
                            />
                            </label>
                        )}
                    </div>
                </div>

                <div className="mt-2">
                    <div className='font-bold'>Product Title</div>
                    <input className="mt-1 w-full p-2 border border-gray-400 rounded-lg" type="text" placeholder="Product name" onChange={e => setProductName(e.target.value)} required/>
                </div>

                <div className="mt-4">
                    <div className='font-bold'>Category</div>
                    <select className="mt-1 w-full p-2 border border-gray-400 rounded-lg" onChange={e => setType(e.target.value)}>
                        <option value={null}></option>
                        {
                        categories.length > 0 && categories.map(category => 
                            <option value={category.category}>{category.category}</option>
                        )
                        }
                    </select>
                </div>
                
                <div className="mt-2">
                    <div className='font-bold'>Description</div>
                    <textarea className="mt-1 w-full p-2 border border-gray-400 rounded-lg" rows="2" placeholder="Enter some description" onChange={e => setDescription(e.target.value)} required />
                </div>

                <div className="mt-2">
                    <div className='font-bold'>Size (in cm)</div>
                    <input className="mt-1 w-full p-2 border border-gray-400 rounded-lg" type="text" placeholder="50 X 40" onChange={e => setSize(e.target.value)} required/>
                </div>

                <div className="mt-2">
                    <div className='font-bold'>Price</div>
                    <input className="mt-1 w-full p-2 border border-gray-400 rounded-lg" type="number" placeholder="0" onChange={e => setPrice(e.target.value)} required/>
                </div>

                <div className='mt-2 flex gap-2'>
                    <input type="checkbox" onChange={e => setTermsChecked(e.target.value)} />
                    <div>
                        I have read the <b>Terms and conditions</b>. If not read <Link className='text-blue-600 hover:text-blue-400' to={"/terms"}>here</Link>
                    </div>

                </div>

                <div className='mt-2 flex gap-2'>{errorText}</div>
                
                <div className='flex justify-center gap-5 mt-2'>
                    <button 
                    className='border border-gray-500 hover:bg-gray-500 hover:text-white p-2 rounded-lg'
                    onClick={(e)=>{
                        e.preventDefault();
                        setShowPasswordModal(false);
                        resetState();
                    }}
                    >Cancel</button>
                    { !submitLoading && <button onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                    }} 
                    className='bg-purple-900 hover:bg-purple-700 p-2 text-white rounded-lg'>Submit</button> }
                    { submitLoading && <button onClick={e => {
                        e.preventDefault();
                    }} 
                    className='bg-gray-300 p-2 text-black rounded-lg'>Loading</button> }
                </div>

                </div>
            </div>
        )}

        {editShowPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowPasswordModal(false)}>
            <div className="bg-white p-4 rounded-lg shadow-lg relative w-full mx-5 lg:w-1/3 text-xs" onClick={(e) => e.stopPropagation()}>
                <div className="mt-1">
                    <div className='font-bold'>Product Image</div>
                    <br />
                    {/* <div
                        className="flex items-center justify-center w-full mt-1"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        >
                        {imageUrl.length > 0 ? (
                            <div className="flex flex-wrap">
                            {imageUrl.map((url, index) => (
                                <div key={index} className="h-40 w-40 relative m-1">
                                <button
                                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                                    onClick={(e) =>{ e.preventDefault(); handleDelete(index); } }
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                    </svg>
                                </button>
                                <img
                                    src={url}
                                    alt="Preview"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                                </div>
                            ))}
                            </div>
                        ) : (
                            <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                            >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                                >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and
                                drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                name="images"
                                multiple
                                onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    setImageSrc([...imageSrc, ...files]);
                                    const urls = files.map(file => URL.createObjectURL(file));
                                    setImageUrl([...imageUrl, ...urls]);
                                }}
                            />
                            </label>
                        )}
                    </div> */}

                    <div
                        className="flex items-center justify-center w-full mt-1"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        >
                        {imageUrl.length > 0 ? (
                            <div className="flex flex-nowrap overflow-x-auto gap-2 p-1">
                            {imageUrl.map((url, index) => (
                                <div key={index} className="h-40 w-40 relative flex-shrink-0">
                                <button
                                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                                    onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(index);
                                    }}
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                    </svg>
                                </button>
                                <img
                                    src={url}
                                    alt="Preview"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                                </div>
                            ))}
                            </div>
                        ) : (
                            <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                            >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                                >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                name="images"
                                multiple
                                onChange={(e) => {
                                const files = Array.from(e.target.files);
                                setImageSrc([...imageSrc, ...files]);
                                const urls = files.map((file) => URL.createObjectURL(file));
                                setImageUrl([...imageUrl, ...urls]);
                                }}
                            />
                            </label>
                        )}
                    </div>
                </div>

                <div className="mt-2">
                    <div className='font-bold'>Product Title</div>
                    <input className="mt-1 w-full p-2 border border-gray-400 rounded-lg" value={productName} type="text" placeholder="Product name" onChange={e => setProductName(e.target.value)} required/>
                </div>

                <div className="mt-4">
                    <div className='font-bold'>Category</div>
                    <select className="mt-1 w-full p-2 border border-gray-400 rounded-lg" onChange={e => setType(e.target.value)}>
                        <option value={type}>{type}</option>
                        {
                        categories.length > 0 && categories.map(category => 
                            <option value={category.category}>{category.category}</option>
                        )
                        }
                    </select>
                </div>
                
                <div className="mt-2">
                    <div className='font-bold'>Description</div>
                    <textarea className="mt-1 w-full p-2 border border-gray-400 rounded-lg" rows="2" placeholder="Enter some description" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>

                <div className="mt-2">
                    <div className='font-bold'>Size (in cm)</div>
                    <input className="mt-1 w-full p-2 border border-gray-400 rounded-lg" value={size} type="text" placeholder="50 X 40" onChange={e => setSize(e.target.value)} required/>
                </div>

                <div className="mt-2">
                    <div className='font-bold'>Price</div>
                    <input className="mt-1 w-full p-2 border border-gray-400 rounded-lg" type="number" value={price} placeholder="0" onChange={e => setPrice(e.target.value)} required/>
                </div>
                
                <div className='flex justify-center gap-5 mt-2'>
                    <button 
                    className='border border-gray-500 hover:bg-gray-500 hover:text-white p-2 rounded-lg'
                    onClick={(e)=>{
                        e.preventDefault();
                        setEditShowPasswordModal(false);
                        resetState();
                    }}
                    >Cancel</button>
                    { !submitLoading && <button onClick={e => {
                        e.preventDefault();
                        handleEditSubmit();
                    }} 
                    className='bg-purple-900 hover:bg-purple-700 p-2 text-white rounded-lg'>Submit</button> }
                    { submitLoading && <button onClick={e => {
                        e.preventDefault();
                    }} 
                    className='bg-gray-300 text-black rounded-lg'>Loading ....</button> }
                </div>

                </div>
            </div>
        )}
    </div>
  )
}

export default MyAds