import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Tshirts = () => {

    const [loading, setLoading] = useState(true);
    const [hoodies, setHoodies] = useState([]);
    const [error, setError] = useState(false);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/get_products/tshirt`)
        .then((res)=> res.json())
        .then((res)=>{
            setHoodies(res);
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
            setError(true)
        })
    },[])
    return ( <div className='mb-10'>
        <div className='invisible lg:visible h-0 lg:h-auto'>
            <img src={require('../images/mens_tshirts.jpg')} className='object-cover' style={{ width: '100%', maxHeight: '250px' }} alt="" />
        </div>

        <div className='text-center mt-5 text-gray-950 text-bold font-serif text-xl tracking-wider'>Tshirts</div>
        { loading && <div className="text-center text-slate-500 text-md mb-5">Loading...</div>}
        <div className="text-center text-slate-500 text-md mb-5">({!loading && hoodies.length} items)</div>

        <div className='flex flex-wrap justify-center'>
           { 
           
           !loading && hoodies.map( hoodie => (
            <Link to={"/preview"} className='w-1/2 md:w-2/6 p-3' key={hoodie.productName} state={{ data: hoodie}}>
                <div className='flex justify-center items-center '>
                    <img src={`${process.env.REACT_APP_API_URL}/uploads/${hoodie.image}`} width="310px" alt="" />
                </div>

                <div className='text-center text-bold'>{hoodie.productName}</div>
                <div className='text-center text-gray-700'>Ksh {hoodie.price}</div>
            </Link>
           )) 
           }
            
        </div>
        
    </div> );
}
 
export default Tshirts;