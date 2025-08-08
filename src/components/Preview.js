import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useCart from "../utils/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageZoom from "./ImageZoom";
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Twitter } from "@mui/icons-material";
import RelatedProducts from "./RelatedProducts";
import NewArtWorks from "./NewArtWorks";

const Preview = () => {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const data = location.state.data;

    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart({ ...data, quantity: Number(quantity) });
    }

    const [displayImageIndex, setDisplayImageIndex] = useState(0);

    const handlePrevBtn = () => {
        if (displayImageIndex > 0) {
            setDisplayImageIndex(displayImageIndex - 1);
        } else {
            setDisplayImageIndex(data.image.length - 1); // Wrap around to the last image
        }
    }
    
    const handleNextBtn = () => {
        if (displayImageIndex < data.image.length - 1) {
            setDisplayImageIndex(displayImageIndex + 1);
        } else {
            setDisplayImageIndex(0); // Wrap around to the first image
        }
    }

    return (
        <div className="mt-10 lg:mx-28 font-montserrat">
            <ToastContainer />

            <div className="block lg:flex">
                {/* Image section with zoom */}
                {/* <div className="lg:w-2/6 flex justify-center lg:justify-start collapse h-0 lg:visible lg:relative">
                    <ImageZoom imageUrl={`${process.env.REACT_APP_API_URL}/uploads/${data.image[0]}`} />
                </div> */}

                {/* Mobile view for image (non-zoomed) */}
                {/* <div className="lg:hidden flex justify-center">
                    <img 
                        src={`${process.env.REACT_APP_API_URL}/uploads/${data.image[0]}`} 
                        className="object-contain" 
                        width="210px" 
                        alt={data.productName} 
                    />
                </div> */}

                <div className="w-3/6 hidden lg:block">
            {/* Image section with zoom */}
            <div className="flex items-center gap-5 justify-center">
                <div onClick={handlePrevBtn} className="bg-black hover:bg-gray-500 text-white text-xl rounded-3xl px-2 cursor-pointer">{"<"}</div>
                <ImageZoom imageUrl={`${process.env.REACT_APP_API_URL}/uploads/${data.image[displayImageIndex]}`} />
                <div onClick={handleNextBtn} className="bg-black hover:bg-gray-500 text-white text-xl rounded-3xl px-2 cursor-pointer">{">"}</div>
            </div>
            <div className="flex justify-center gap-5 mt-5 w-3/4 mx-10">
                {
                    data.image.map((pic, index) => (
                        <div className="h-20 w-20">
                            <img 
                                onClick={()=>{
                                    setDisplayImageIndex(index);
                                }}
                                src={`${process.env.REACT_APP_API_URL}/uploads/${pic}`} 
                                className="object-cover border bg-white p-2 h-full w-full hover:border-gray-500 cursor-pointer" 
                                alt={data.productName} 
                            />
                        </div>
                    ))
                }
            </div>
        </div>

        {/* Mobile view for image (non-zoomed) */}
        <div className="lg:hidden flex items-center gap-5 justify-center">
            <div onClick={handlePrevBtn} className="bg-black hover:bg-gray-500 text-white text-xl rounded-3xl px-2 cursor-pointer">{"<"}</div>
            <img 
                src={`${process.env.REACT_APP_API_URL}/uploads/${data.image[displayImageIndex]}`} 
                className="object-contain w-4/6" 
                alt={data.productName} 
            />
            <div onClick={handleNextBtn} className="bg-black hover:bg-gray-500 text-white text-xl rounded-3xl px-2 cursor-pointer">{">"}</div>
        </div>

                {/* Product details */}
                <div className="p-5 lg:p-10 w-full lg:w-3/6 ml-0 lg:ml-5">
                    <div className="font-semibold lg:text-3xl tracking-wide pb-1 lg:pb-3 mx-10 lg:mx-0">{data.productName}</div> 

                    <form className="mx-10 lg:mx-0">
                        <div className="text-sm">
                            <div className="flex gap-2 items-center my-2">
                                <div className="">Category:</div>
                                <div className="">{data.type}</div>            
                            </div>
                            <div className="flex gap-2 items-center my-2">
                                <div className="">Description:</div>
                                <div className="text-gray-800">{data.description}</div>            
                            </div>
                            <div className="flex gap-2 items-center my-2">
                                <div className="">Size:</div>
                                <div>{data.size}</div>            
                            </div>
                            <div className="my-2 lg:my-2 text-purple-900 font-extrabold">Ksh {data.price.toLocaleString()}</div>
                          
                            <div className="flex gap-2 items-center my-2 mt-4">
                                <div className="">Quantity</div>
                                <select 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-1 lg:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setQuantity(e.target.value)}
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>                
                            </div>
                        </div>
                    </form>

                    <button 
                        className="w-full lg:w-52 mt-10 p-2 bg-purple-900 hover:bg-purple-800 text-white rounded-md text-sm mx-auto lg:mx-0"
                        onClick={() => handleAddToCart()}
                    >
                        ADD TO CART
                    </button>

                    {/* Share section */}
                    <div className="hidden lg:flex mt-5 items-center text-sm gap-2 font-bold">
                        <span>Share: </span>
                        <Link to={"/"}>
                            <FacebookIcon sx={{color:'#424242', fontSize: 20}} />
                        </Link>
                        <Link to={"/"}>
                            <Twitter sx={{color:'#424242', fontSize: 20}} />
                        </Link>
                        <Link to={"/"}>
                            <EmailIcon sx={{color:'#424242', fontSize: 20}} />
                        </Link>
                        <Link to={"/"}>
                            <WhatsAppIcon  sx={{color:'#424242', fontSize: 20}} />
                        </Link>                    
                    </div>
                </div>

                <div className="w-full lg:w-2/6 border-l">
                    <NewArtWorks />
                </div>
            </div>

            {/* Related Products section */}
            <div className="mt-12">
                <RelatedProducts category={data.type} />
            </div>
        </div> 
    );
}
 
export default Preview;
