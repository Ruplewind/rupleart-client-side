import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function NewArtWorks() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/get_approved_products`)
        .then((res)=> res.json())
        .then((res)=>{
            setProducts(res.reverse());
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
            setError(true)
        })
    },[])
  return (
    <div className='font-montserrat mt-5 lg:mt-10 mx-5 lg:ml-14 mb-10'>
        <div className='font-bold uppercase'>New ArtWorks</div>

        { loading && <div className='text-gray-700'>Loading ...</div>}

        {
            !loading && !error && products.slice(0, 4).map(item => 
                (
                    <Link to={"/preview"} state={{ data: item }}className='mt-2 flex w-full gap-4 border-b border-b-gray-400 p-1 rounded-sm hover:shadow-lg hover:-translate-y-1'>
                        <img 
                        src={`${process.env.REACT_APP_API_URL}/uploads/${item.image[0]}`} 
                        alt={item.productName} 
                        className='transition-all duration-300 object-cover w-14 h-14 group-hover:w-60 group-hover:h-60 rounded-lg' 
                        />
                        <div className='mt-1'>
                            <div className='font-semibold hover:font-extrabold text-xs'>{item.productName}</div>                    
                            <div className='text-purple-900 hover:text-purple-700 font-montserrat text-xs mt-2'>Ksh {item.price}</div>
                        </div>
                    </Link>
                )
            )
        }
      
    </div>
  )
}

export default NewArtWorks
