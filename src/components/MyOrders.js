import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utils/AuthContext';
import { DnsTwoTone } from '@mui/icons-material';

function MyOrders() {
    const [order, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { token } = useContext(AuthContext);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/GetMyOrders`,{
            headers: {
                'Authorization':`Bearer ${token}`
            }
        })
        .then(data =>  data.json())
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
  return (
    <div className='w-5/6 lg:w-3/4 mx-5 lg:mx-auto font-montserrat mt-10 mb-10'>
        <div className='text-xl font-bold uppercase'>My Orders</div>

        <div className='overflow-x-auto'>
        <table className='mt-5 w-full border bg-white min-w-full text-xs lg:text-xs uppercase'>
            <tr className='bg-gray-100 p-2'>
                <th className='p-2'>Date</th>
                <th className='p-2'>Products</th>
                <th className='p-2'>Delivery Location & Cost</th>
                <th className='p-2'>Total Cost</th>
                <th className='p-2'>Payment Status</th>
                <th className='p-2'>Delivery Status</th>
                <th className='p-2'>Delivery Date</th>
            </tr>

                {
                    !loading && !error && order.length > 0 && order.map(ad => (
                        <tr className='mt-5 border-b border-gray-300 p-4'>
                            <td className='text-center p-2'>{ad.order_date}</td>
                            <td className='p-2'>
                                {
                                    ad.items.map( item => 
                                        <div className='font-bold'>{item.productName} X {item.quantity}</div>
                                    )
                                }
                            </td>
                            <td className='text-gray-700 p-2'>
                                <div className='font-bold text-black'>{ad.deliveryLocation}</div>
                                <div className='text-xs'>Ksh. {ad.delivery_cost}</div>
                            </td>
                            <td className='text-center p-2'>Ksh. {ad.total_price + ad.delivery_cost}</td>
                            <td className='text-center p-2'>{
                                ad.completion_status == "pending" ? 
                                    <div className='bg-gray-300 text-xs rounded-2xl p-1 w-full lg:w-3/4 mx-auto'>Pending Payment</div>
                                :
                                    <div className='bg-green-500 text-xs rounded-2xl p-1 w-full lg:w-1/2 mx-auto text-white'>Paid</div>
                                }
                            </td>
                            <td className='text-center p-2'>{
                                ad.delivery_status == "pending" ? 
                                    <div className='bg-gray-300 text-xs rounded-2xl p-1 w-full lg:w-3/4 mx-auto'>Pending</div>
                                :
                                    <div className='bg-green-500 text-xs rounded-2xl p-1 w-full lg:w-1/2 mx-auto text-white'>Delivered</div>
                                }
                            </td>
                            <td className='text-center p-2'>{ad.delivery_date}</td>
                        </tr>
                    ))
                }
                

        </table>
        </div>
    </div>
  )
}

export default MyOrders