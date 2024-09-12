import useCart from "../utils/CartContext";
import ClearIcon from '@mui/icons-material/Clear';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";

const Cart = () => {

    const { products, total, removeFromCart } = useCart();

    
    const handleRemoveFromCart = (product) =>{
        removeFromCart(product)
    }


    return ( <div>
        { products.length > 0 ? 
        <div>
            <div className="text-center font-semibold font-mono mt-16 lg:ml-8">Your Cart</div>
            <div className="text-center mt-1 text-gray-500 lg:ml-8 mb-10">{products.length} item(s)</div>

            { products.map(product =>(
                <div className="flex justify-center lg:justify-around mx-5 lg:mx-80 mb-5 lg:mb-3 gap-1">
                    
                    <img src={`${process.env.REACT_APP_API_URL}/uploads/${ product.image || product.thumbnail }`} className="w-20 h-20 lg:w-44 lg:h-auto"/>
                    
                    <div className="block lg:flex lg:gap-5  lg:justify-around text-sm lg:text-base ">
                        <div className="flex items-center text-xs lg:text-base w-52 lg:w-64 font-bold lg:font-normal">{ product.productName || product.title }</div>
                        { 
                            product.type == "hoodie" || product.type == "tshirt" ?  
                        <div className="flex py-0 w-10 lg:w-28">
                                <div className="text-gray-500 w-10 lg:w-10 flex items-center">Qty:</div>
                                <div className="flex items-center">{product.quantity}
                                {/* <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16 p-1 lg:p-2.5 dark:bg-gray-700 h-8 lg:h-10  dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={product.quantity}>{product.quantity}</option>
                                    <option value={1}>1</option>
                                    <option value={1}>2</option>
                                    <option value={1}>3</option>
                                    <option value={1}>4</option>
                                    <option value={1}>5</option>
                                </select>    */}
                                </div>             
                        </div>
                        : 
                        <div className="pb-2 lg:pb-4 flex gap-2 items-center text-sm mt-2 lg:mt-0">
                            <img src={require('../images/clock.png')} width={"15px"}/> 
                            { 
                                product.hours > 0 ? 
                                <span className="text-sm capitalize">{product.hours} Hrs {product.minutes} Mins</span>
                                    :
                                <span className="text-sm capitalize">{product.minutes} Mins</span>
                            }
                        </div> 
                        }
                        { 
                            product.type == "hoodie" || product.type == "tshirt" ?  
                            <div className="flex items-center lg:w-24">Size: {product.size}</div> 
                            : 
                            <div className="flex items-center lg:w-24"></div> 
                        }
                        <div className="flex items-center lg:w-20">Ksh {product.price}</div>
                    </div>
                    <div className="flex items-center m-0 lg:ml-10">
                        <ClearIcon onClick={()=> handleRemoveFromCart(product)} />
                    </div>
                </div>
            )) 
            }

            <div className="flex justify-center gap-4 p-10 lg:gap-10 mt-5 lg:mt-1">
                <div className="text-bold">Total:</div>
                <div className="text-bold">Ksh.{total}</div>
                    
            </div>
            <div className="flex justify-center px-10 ml-5 lg:mb-8">
                <Link to={'/checkout'}><div className="collapse lg:visible w-48 flex justify-center p-1 border-2 border-black hover:bg-black hover:text-white" >
                        CHECKOUT
                </div></Link>
            </div>
            
            

            <Link to={'/checkout'}><div className="visible lg:collapse fixed bottom-0 bg-blue-950 text-white text-center w-full lg:w-0 p-4 text-bold tracking-wider font-serif" >
                CHECKOUT
            </div></Link>
        </div> 
        
        : 
            <div className="flex justify-center mt-10 lg:mt-20 tracking-widest text-gray-600">Your <div className="mx-3"><ShoppingCartIcon /></div> is empty</div>
        }
    </div> );
}
 
export default Cart;