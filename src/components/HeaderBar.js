import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCart from '../utils/CartContext';

const HeaderBar = () => {
    const location = useLocation();

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if(location.pathname === '/preview' || location.pathname === '/cart' || location.pathname === '/checkout'){
            setShow(true);
        }else{
            setShow(false)
        }
    })

    const { products } = useCart();
    

    return ( <div className="flex justify-between mx-7 lg:mx-20 mt-3 mb-3">
    { show && <div className='lg:pl-10'>
         <KeyboardBackspaceSharpIcon onClick={() => navigate('/')} /> 
    </div>
    }
    { !show && <div className='lg:pl-10 w-6'></div>}

    <div className='font-sans text-lg lg:text-2xl text-center tracking-widest font-bold flex items-center'>IKO NINI</div>
    
    <Link to={'/cart'} >
    <div className='flex items-center'>
        <ShoppingCartIcon fontSize={'medium'}   />
        <sup class="font-features sups bg"><div className='text-black bg-black'>{products.length}</div></sup>
    </div>
    </Link>

</div> );
}

export default HeaderBar;