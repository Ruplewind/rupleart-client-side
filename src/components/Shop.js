import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Products from './Products';
import NewArtWorks from './NewArtWorks';

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/get_categories`)
        .then(res => res.json())
        .then(data => {
            setCategories(data);
            setLoading(false);
        })
        .catch(()=>{
            setError(true);
            setLoading(false);
        })
    },[])

    const [ selectedCategory, setSelectedCategory] = useState(null);


    return ( <div className='flex mx-5 gap-4 mb-10'>
        <div className='w-1/6'>
            <div className='font-montserrat mt-10 ml-20'>
                <div className='font-bold'>CATEGORIES</div>
                    { loading && <div className='text-gray-700'>Loading ...</div>}
                    <div className='mt-2'>
                        <button 
                            onClick={() => {
                                setSelectedCategory(null);
                            }
                            } 
                            className='text-gray-700 hover:text-gray-900'
                        >
                            All
                        </button>
                    </div>
                    {
                        !loading && !error && categories.map(category => 
                            (
                                <div className='mt-2'>
                                    <button 
                                        onClick={() => {
                                            setSelectedCategory(category.category);
                                        }
                                        } 
                                        className='text-gray-700 hover:text-gray-900'
                                    >
                                        {category.category}
                                    </button>
                                </div>
                            )
                        )
                    }          
                </div>
                <NewArtWorks />
        </div>
        <div className='w-5/6'>
            <Products category={selectedCategory}/>
        </div>
    </div> );
}
 
export default Shop;