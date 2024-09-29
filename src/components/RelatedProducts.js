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

      <div className='flex gap-2 flex-wrap font-montserrat mt-5'>
            {!loading && filteredData.slice(0,6).map(item => (
                <Link 
                to={"/preview"} 
                className='w-full lg:w-1/6 mx-5' 
                key={item.productName} 
                state={{ data: item }}
                >
                <div className='group relative bg-white p-2 rounded-lg transform transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1'>
                    {/* Image container with standard size and smooth resizing on hover */}
                    <div className='flex justify-center items-center'>
                    <img 
                        src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`} 
                        alt={item.productName} 
                        className='transition-all duration-300 object-cover w-64 h-52 group-hover:w-60 group-hover:h-60' 
                    />
                    </div>

                    <div className='text-center text-bold mt-3 text-sm'>{item.productName}</div>                    

                    <div className='text-center text-purple-900 font-montserrat text-sm'>Ksh {item.price}</div>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts
