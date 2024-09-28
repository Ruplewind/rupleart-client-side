import { Link } from "react-router-dom";
import { Checkmark } from 'react-checkmark';
import { useEffect } from "react";
import useCart from "../utils/CartContext";

const SuccessTransaction = () => {

    const {  clearState } = useCart();

    useEffect(()=>{
        clearState();
    })

    return ( <div> 
        <div className='mt-10 lg:mt-10 flex justify-center mb-10'>
            <div className='block'>
                <div className='flex justify-center ml-5 mb-5 lg:mb-10'>
                    <Checkmark size='xxLarge' />
                </div>
                <div className="flex justify-center text-center  px-10 ml-5 text-2xl mb-5 lg:10">
                    Your Order Has Been Placed Succesfully. 
                </div>
                <div className="flex justify-center text-center px-10 ml-5 text-lg text-gray-600  mb-3 lg:mb-5">
                    You will be contacted by a Rupleart agent within the next few hours to make arrangements on delivery.
                </div>
                <div className="flex justify-center text-center mb-4 px-10 ml-5 text-lg">
                    Thank You!
                </div>
                <div className="flex justify-center text-center px-10 ml-5 mb-5 text-lg" style={{fontSize:'3em'}}>&#x1F38A;</div>
                <div className="flex justify-center px-10 ml-5 ">
                    <Link to={'/'}><div className="w-48 flex justify-center p-2 bg-purple-900 hover:bg-purple-700 text-white rounded-lg text-sm" >
                            HOME
                    </div></Link>
                </div>
                
            </div>
        </div>
    
        </div> );
}
 
export default SuccessTransaction;