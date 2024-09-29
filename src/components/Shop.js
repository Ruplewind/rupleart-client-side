import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Products from './Products';
import NewArtWorks from './NewArtWorks';
import CarouselSection from './CarouselSection';

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


    return ( 
    <div>  
      <CarouselSection />
      <div className='block lg:flex mx-2 lg:mx-5 gap-4 mb-10 min-h-screen'>
        <div className='collapse lg:visible h-0 w-0 lg:w-1/6'>
            <div className='font-montserrat mt-10 ml-14'>
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
        <div className='w-full lg:w-5/6'>
            <div className="flex justify-center lg:justify-end gap-2 text-sm items-center mt-2 lg:mt-5 lg:mr-5">
                <div>Sort By Category: </div>
                <select 
                    onChange={e => {
                        if(e.target.value == "All"){
                            setSelectedCategory(null);
                        }else{
                            setSelectedCategory(e.target.value);
                        }
                    }} 
                    className="p-1 border border-gray-400 rounded-md"
                >
                    <option value={null}>All</option> 
                    {
                        !loading && !error && categories.map(category => 
                        ( 
                            <option value={category.category}>{category.category}</option> 
                        )
                    )}
                </select>
            </div>
            <Products category={selectedCategory}/>
        </div>
    </div>
    </div> );
}
 
export default Shop;