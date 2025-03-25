import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCart from "../utils/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageZoom from "./ImageZoom";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Twitter } from "@mui/icons-material";
import RelatedProducts from "./RelatedProducts";
import NewArtWorks from "./NewArtWorks";

const SharedPreview = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/get_single_product?id=${id}`);
                if (!response.ok) throw new Error("Failed to fetch product");
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>Product not found</div>;

    const handleAddToCart = () => {
        addToCart({ ...data, quantity: Number(quantity) });
    };

    return (
        <div className="mt-10 lg:mx-28 font-montserrat">
            <ToastContainer />

            <div className="block lg:flex">
                {/* Image section */}
                <div className="lg:w-2/6 flex justify-center lg:justify-start">
                    <ImageZoom imageUrl={`${process.env.REACT_APP_API_URL}/uploads/${data.image}`} />
                </div>

                {/* Product details */}
                <div className="p-5 lg:p-10 w-full lg:w-3/6 ml-0 lg:ml-5">
                    <h1 className="font-semibold lg:text-3xl tracking-wide pb-3">{data.productName}</h1>
                    <p className="text-gray-800 my-2">{data.description}</p>
                    <p className="text-purple-900 font-extrabold">Ksh {data.price.toLocaleString()}</p>

                    <div className="flex gap-2 items-center my-2">
                        <span>Quantity:</span>
                        <select 
                            className="border rounded p-2"
                            onChange={(e) => setQuantity(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>

                    <button 
                        className="w-full lg:w-52 mt-10 p-2 bg-purple-900 hover:bg-purple-800 text-white rounded-md"
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </button>

                    {/* Share section */}
                    <div className="hidden lg:flex mt-5 items-center gap-2">
                        <span>Share:</span>
                        <FacebookIcon className="cursor-pointer" />
                        <Twitter className="cursor-pointer" />
                        <EmailIcon className="cursor-pointer" />
                        <WhatsAppIcon className="cursor-pointer" />
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
};

export default SharedPreview;