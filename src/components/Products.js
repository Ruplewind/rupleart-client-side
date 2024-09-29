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

    const filteredData = products.reverse().filter((item)=>{
                    
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


        <div className='flex gap-4 justify-evenly flex-wrap font-montserrat'>
            {!loading && filteredData.map(item => (
                <Link 
                to={"/preview"} 
                className='w-full md:w-1/4 ' 
                key={item.productName} 
                state={{ data: item }}
                >
                <div className='group relative bg-white p-2 rounded-lg lg:transform lg:transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1'>
                    {/* Image container with standard size and smooth resizing on hover */}
                    <div className='flex justify-center items-center'>
                    <img 
                        src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`} 
                        alt={item.productName} 
                        className='transition-all duration-300 object-cover w-64 h-64 group-hover:w-60 group-hover:h-60' 
                    />
                    </div>

                    <div className='text-center text-bold mt-3'>{item.productName}</div>                    

                    <div className='text-center text-purple-900 font-montserrat'>Ksh {item.price}</div>

                    {/* Collapsible description */}
                    <div className='text-center text-sm lg:max-h-0 lg:overflow-hidden group-hover:max-h-20 transition-all duration-300 text-gray-700'>
                        {item.description}
                    </div>

                    <div className='flex justify-center lg:max-h-0 lg:overflow-hidden group-hover:max-h-20 transition-all duration-300'>
                    <button 
                    onClick={()=>{
                        handleAddToCart(item)
                    }}
                    className='bg-purple-900 hover:bg-purple-700 text-white p-2 text-sm uppercase rounded-lg mt-2'>
                        add to cart
                    </button>
                    </div>
                </div>
                </Link>
            ))}
        </div>

        
    </div> );
}
 
export default Products;