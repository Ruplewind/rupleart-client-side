import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FailedTransaction from "./FailedTransaction";
import SuccessTransaction from "./SuccessTransaction";
import PuffLoader from "react-spinners/PuffLoader";

const ConfirmPayment = () => {

    const [searchParams, setSearchParams] =useSearchParams();

    let id = searchParams.get('OrderMerchantReference');


    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/ConfirmPayment/${id}`)
        .then(res => {
            if(res.ok){
                setSuccess(true);
                setLoading(false);
            }else{
                setSuccess(false);
                setLoading(false);
            }
        })
        .catch(err =>{
            setLoading(false);
        })

    },[])
    return ( <div>
        {
            loading && <div class="flex items-center justify-center h-screen">
            <PuffLoader size={60} color={"#172554"}/>
          </div>
        }
        {
            !loading && success && <SuccessTransaction />
        }
        {
            !loading && !success && <FailedTransaction />
        }
    </div> );
}
 
export default ConfirmPayment;