import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCart from '../utils/CartContext';

const Products = ({ category }) => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/get_approved_products`)
        .then((res)=> res.json())
        .then((res)=>{
            setProducts(res);
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
            setError(true)
        })
    },[])

    const filteredData = products.filter((item)=>{
                    
        if(category === '' || category === null){
            return item;
        }else if(
            item.type.toLowerCase().includes(category.toLowerCase())
        ){
            return item;
        }
    })

    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (data) => {
        addToCart({ ...data, quantity: Number(quantity) });
    }
    return ( <div className='mt-2 lg:mt-5 mx-2 lg:mx-5'>
        { loading && <div className="text-center text-slate-500 text-md mb-5">Loading...</div>}
        <div className="text-center font-bold text-slate-500 text-md mb-1 capitalize">{category == null ?  (<div>All Artworks</div>) : category}</div>
        <div className="text-center text-slate-500 text-md mb-5 text-sm">({!loading && filteredData.length} items)</div>


        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 font-montserrat">
        {!loading &&
            filteredData.reverse().map((item) => (
            <Link
                to="/preview"
                className="bg-white p-1 lg:p-4 pb-2 lg:pb-4 rounded-lg shadow-lg group"
                key={item._id}
                state={{ data: item }}
            >
                <div className="flex flex-col h-full">
                {/* Image container */}
                <div className="flex justify-center items-center h-44 lg:h-64">
                    <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`}
                    alt={item.productName}
                    className="object-cover w-full h-full rounded-md"
                    />
                </div>

                {/* Product name */}
                <div className="text-center font-bold text-lg mt-3 truncate">
                    {item.productName}
                </div>

                {/* Price */}
                <div className="text-center text-purple-900 mt-2">
                    Ksh {item.price.toLocaleString()}
                </div>

                {/* Collapsible description */}
                <div className="text-center text-sm text-gray-700 mt-2 lg:group-hover:max-h-20 lg:max-h-0 overflow-hidden transition-all duration-300">
                    <p className="line-clamp-2">{item.description}</p>
                </div>

                {/* Add to cart button */}
                <div className="flex justify-center mt-auto lg:max-h-0 lg:overflow-hidden group-hover:max-h-20 transition-all duration-300">
                    <button
                    onClick={() => {
                        handleAddToCart(item);
                    }}
                    className="bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 text-sm uppercase rounded-lg mt-3"
                    >
                    Add to cart
                    </button>
                </div>
                </div>
            </Link>
            ))
        }
        </div>


        
    </div> );
}
 
export default Products;