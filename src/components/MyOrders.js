import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utils/AuthContext';
import { DnsTwoTone } from '@mui/icons-material';
import useAuthCheck from '../utils/useAuthCheck';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const COLOR_SWATCHES = {
  Black: '#000000', White: '#FFFFFF', Grey: '#808080', Red: '#DC2626',
  Orange: '#EA580C', Yellow: '#EAB308', Green: '#16A34A', Blue: '#2563EB',
  Navy: '#1E3A8A', Purple: '#9333EA', Pink: '#EC4899', Brown: '#78350F',
  Beige: '#D8C3A5', Gold: '#D4AF37', Silver: '#C0C0C0'
};

function MyOrders() {
    const [order, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);

    useAuthCheck();

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/GetMyOrders`,{
            headers: {
                'Authorization':`Bearer ${token}`
            }
        })
        .then(data => {
            if(data.ok){
                return data.json();

            }else if(data.status === 401){
                navigate("/login")
            }
        })
        .then( result => {
            Promise.all(
                result.map(order =>
                  fetch(`${process.env.REACT_APP_API_URL}/get_location/${order.deliveryLocation}`,{
                    method: 'GET',
                    headers: {
                      'Authorization':`Bearer ${token}`
                    }
                  })
                    .then(response => response.json())
                    .then(location => ({ ...order, deliveryLocation: location.town  }))
                )
              ).then(ordersWithData => {
                // setTotalResults(ordersWithData.length);
                setOrders(ordersWithData)
                setLoading(false);
              });
        })
        .catch(err => {
            setError(true);
            setLoading(false);
        })
    },[])

    const [cancelLoading, setCancelLoading] = useState(false);

    const handleSubmit = (id) => {
        setCancelLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/cancel_order/`+id,{
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        })
        .then( data => {
            if(data.ok){
                toast.success("Order Succesfully Cancelled. Await Refund",{
                    autoClose: 1000
                });
                setTimeout(()=>{
                    setCancelLoading(false);
                    window.location.reload();
                },1010)
            }else{
                data.json().then(err => {
                    toast.error(err,{
                        autoClose: 1000
                    });
                    setCancelLoading(false);
                })
            }
        })
        .catch(err => {
            toast.error(err,{
                autoClose: 1000
            });
            setCancelLoading(false);
        })
    }
  return (
    <div className='w-5/6 lg:w-3/4 mx-5 lg:mx-auto font-montserrat mt-10 mb-10'>
        <ToastContainer />
        <div className='text-xl font-bold uppercase'>My Orders</div>

        <div className='overflow-x-auto'>
        <table className='mt-5 w-full border bg-white min-w-full text-xs lg:text-xs uppercase'>
            <thead>
            <tr className='bg-gray-100 p-2'>
                <th className='p-2'>Date</th>
                <th className='p-2'>Products</th>
                <th className='p-2'>Delivery Location</th>
                <th className='p-2'>Total Cost</th>
                <th className='p-2'>Payment Status</th>
                <th className='p-2'>Delivery Status</th>
                <th className='p-2'>Delivery Date</th>
                <th className='p-2'>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                    !loading && !error && order.length > 0 && order.map(ad => (
                        <tr key={ad._id} className='mt-5 border-b border-gray-300 p-4'>
                            <td className='text-center p-2'>{ad.order_date}</td>
                            <td className='p-2'>
                                {
                                    ad.items.map( item => 
                                        <div key={item._id} className='font-bold'>
                                            <div className='text-blue-500'>#{item.productId}</div>
                                            <div>{item.productName} X {item.quantity}</div>
                                            {item.color &&
                                                <div className='flex items-center gap-1 normal-case font-normal text-gray-600'>
                                                    <span
                                                        title={item.color}
                                                        className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block cursor-default"
                                                        style={{ backgroundColor: COLOR_SWATCHES[item.color] || '#ccc' }}
                                                    />
                                                    <span>{item.color}</span>
                                                </div>
                                            }
                                            ----------
                                        </div>
                                    )
                                }
                            </td>
                            <td className='text-gray-700 p-2'>
                                <div className='font-bold text-black'>{ad.deliveryLocation}</div>
                                <div className='text-xs'>Ksh. {ad.delivery_cost}</div>
                                {ad.hasFlowers && ad.flowerDelivery && (
                                    <div className='mt-2 p-2 border border-pink-300 rounded-lg normal-case font-normal'>
                                        <div className='font-bold text-pink-800'>
                                            {ad.flowerDelivery.sameDay
                                                ? 'Same-day delivery'
                                                : `Deliver on ${ad.flowerDelivery.preferredDate}`}
                                        </div>
                                        <div>To: {ad.flowerDelivery.recipientName}, {ad.flowerDelivery.recipientPhone}</div>
                                        <div>{ad.flowerDelivery.recipientAddress}</div>
                                        {ad.flowerDelivery.note && <div className='italic'>"{ad.flowerDelivery.note}"</div>}
                                    </div>
                                )}
                            </td>
                            <td className='text-center p-2'>Ksh. {ad.total_price + ad.delivery_cost}</td>
                            <td className='text-center p-2'>{
                                ad.completion_status == "pending" ? 
                                    <div className='bg-gray-300 text-xs rounded-2xl p-1 w-full lg:w-3/4 mx-auto'>Pending Payment</div>
                                :
                                <div>
                                    <div className='bg-green-500 text-xs rounded-2xl p-1 w-full lg:w-1/2 mx-auto text-white'>Paid</div>
                                    <div className='mt-1'>{ad.confirmation_code}</div>
                                </div>
                                    
                                }
                            </td>
                            <td className='text-center p-2'>
                                {
                                    ad.delivery_status == "pending" ? (
                                    <div className='bg-gray-200 text-gray-800 text-xs border border-gray-500 rounded-full px-3 py-1 inline-block'>
                                        Pending Confirmation
                                    </div>
                                    ) :
                                    ad.delivery_status == "transit" ? (
                                    <div className='bg-orange-100 text-orange-900 text-xs border border-orange-300 rounded-full px-3 py-1 inline-block'>
                                        In Transit
                                    </div>
                                    ) :
                                    ad.delivery_status == "cancelled" ? (
                                    <div className='bg-red-100 text-red-900 text-xs border border-red-300 rounded-full px-3 py-1 inline-block'>
                                        Cancelled
                                    </div>
                                    ) : (
                                    <div className='bg-green-100 text-green-900 text-xs border border-green-300 rounded-full px-3 py-1 inline-block'>
                                        Delivered
                                    </div>
                                    )
                                }
                            </td>
                            <td className='text-center p-2'>{ad.delivery_date}</td>
                            <td className='text-center p-2'>
                            {
                                ad.delivery_status == "pending" ? 
                                <div>
                                    { !cancelLoading ? 
                                        <button
                                        className="border border-red-600 text-red-600 hover:bg-red-50 text-xs font-medium rounded-lg py-1 px-2 w-full lg:w-3/4 mx-auto transition-all duration-200"
                                        onClick={()=>{
                                            handleSubmit(ad._id);
                                        }}
                                        >
                                            Cancel Order
                                        </button>
                                        :
                                        <div>Loading ...</div>
                                    }
                                </div>
                                :
                                <div></div>
                            }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default MyOrders