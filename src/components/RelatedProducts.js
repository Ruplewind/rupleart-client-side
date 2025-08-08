import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function RelatedProducts({category}) {
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
  return (
    <div className='mb-10'>
      <div className='font-bold border-b-2 border-purple-900 hover:border-purple-700 w-40 text-center uppercase text-sm mx-5 lg:mx-0'>Related Products</div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-montserrat mt-5">
            {!loading &&
                filteredData.slice(0, 6).map((item) => (
                <Link
                    to="/preview"
                    onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                    }}
                    className="group relative bg-white p-2 rounded-lg transform transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                    key={item.productName}
                    state={{ data: item }}
                >
                    <div className="flex flex-col h-full">
                    {/* Image container with standard size and smooth resizing on hover */}
                    <div className="flex justify-center items-center h-52">
                        <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${item.image[0]}`}
                        alt={item.productName}
                        className="transition-all duration-300 object-cover w-full h-full rounded-md group-hover:scale-105"
                        />
                    </div>

                    {/* Product name */}
                    <div className="text-center font-bold mt-3 text-sm truncate">
                        {item.productName}
                    </div>

                    {/* Price */}
                    <div className="text-center text-purple-900 font-montserrat text-sm">
                        Ksh {item.price.toLocaleString()}
                    </div>
                    </div>
                </Link>
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProducts
