import { useEffect, useState } from "react";
import useCart from "../../utils/CartContext";
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const myRegex = /^07\d{8}$/;

const Checkout = () => {

    const { products, total } = useCart();

    const [ location, setLocation ] = useState(null);

    const [deliveryCost, setDeliveryCost] = useState(0);

    const [link, setLink] = useState('');

    const [showIframe, setShowIframe] = useState(false);

    const [loading, setLoading] = useState(false);

    const [towns, setTowns] = useState([]);

    const [townsLoading, setTownsLoading] = useState(true);

    const [allVideos, SetAllVideos] = useState(false);

    useEffect(()=>{
        let allItemsAreVideos = products.every(item => item.title);

        if(location !== null){
            const town = towns.filter( town => town._id === location);
            if(allItemsAreVideos){
                setDeliveryCost(0);
            }else{
                setDeliveryCost(town[0].price);
            }
            SetAllVideos(allItemsAreVideos);
            
        }
    }, [location])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/get_locations`)
        .then((data)=>{
            let allItemsAreVideos = products.every(item => item.title);
            if(data.ok){
                data.json().then((res)=>{
                    setTowns(res);
                    setLocation(res[0]._id);
                    if(allItemsAreVideos){
                        setDeliveryCost(0);
                    }else{
                        setDeliveryCost(res[0].price);
                    }
                    SetAllVideos(allItemsAreVideos);
                    setTownsLoading(false);
                })
            }else{
                setTownsLoading(false);
            }
        })
        .catch(err =>{
            console.log(err);
        })
    },[])


    const checkoutSchema = yup.object({
        firstname: yup.string().required().min(3),
        secondname: yup.string().required().min(3),
        email: yup.string().email('Invalid Email').required().min(3),
        phoneNumber: yup.string().nullable().matches(myRegex, {message:"Phone number is not valid", excludeEmptyString: true}),
        minPrice: yup.number().min(deliveryCost + total, `Minimum price is ${deliveryCost + total}`)
    })

    const handleSubmit = (data) =>{
        setLoading(true);
        let newData = {...data, products, location};

        fetch(`${process.env.REACT_APP_API_URL}/Checkout`,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newData)
        })
        .then((res)=>{
            if(res.ok){
                res.json().then(response => {
                    setLink(response.redirect_url);
                    setLoading(false);
                    setShowIframe(true);
                })
            }else{ 
                if(res.status == 400){
                    toast.error("Min price is invalid");
                }else{
                    res.json().then(response => {
                        toast.error(response)
                    })
                }
            }
            
        })
        .catch( err=>{
            console.log(err);
        })
    }

    const [ firstName, setFirstName] = useState('');
    const [ secondName, setSecondName] = useState('');
    const [ email, setEmail] = useState('');
    const [ phoneNumber, setPhoneNumber] = useState('');


    return ( <div className="mt-3 lg:mt-20 ">
        <ToastContainer />
            <div className="flex justify-center mb-10 text-xl">Checkout</div>
            
    { showIframe ? (
        <div className="flex justify-center items-center">
        <iframe
          src={link}
          title="Secure Checkout"
          width="80%"
          height="500px"
          frameBorder="0"
        />
        </div>
      )
    
    :
    
    <Formik
            initialValues={{firstname: firstName, secondname: secondName, email:email, phoneNumber:phoneNumber, minPrice: deliveryCost + total}}
            enableReinitialize={true}
            validationSchema={checkoutSchema}
            onSubmit={(values)=>{
                    handleSubmit(values);
                }
            }
            >
        {(props)=>(
    <Form>
        
        <div className="block lg:flex lg:justify-center mx-5 lg:mx-10">                
            <div className="block w-full lg:w-1/2">
                <div className="font-bold mb-5">Account Information</div>
                <div className="flex gap-4">
                    <div>
                        <Field type="text" name="firstname" onChange={e => {setFirstName(e.target.value)}} value={props.values.firstname} placeholder="First name"  className="border-b-2 p-3 mb-2 w-full lg:w-3/4" required/>
                        <div className="p-1 capitalize text-red-900 text-xs">{props.touched.firstname && props.errors.firstname}</div>
                    </div>
                    <div>
                        <Field type="text" name="secondname" onChange={e => {setSecondName(e.target.value)}} value={props.values.secondname} placeholder="Second name"  className="border-b-2 p-3 mb-2 w-full lg:w-3/4" required/>
                        <div className="p-1 capitalize text-red-900 text-xs">{props.touched.secondname && props.errors.secondname}</div>
                    </div>
                </div>                
                <div>
                <Field type="email" name="email" onChange={e => {setEmail(e.target.value)}} value={props.values.email} placeholder="Email"  className="border-b-2 p-3 mb-2 w-full lg:w-3/4" required/>
                </div>
                <div className="p-1 capitalize text-red-900 text-xs">{props.touched.email && props.errors.email}</div>
                <div>
                <Field type="text" name="phoneNumber" onChange={e => {setPhoneNumber(e.target.value)}} value={props.values.phoneNumber} placeholder="Phone Number" className="border-b-2 p-3 mb-2 w-full lg:w-3/4" />
                </div>
                {/* <div className="p-1 capitalize text-red-900 text-xs">{props.touched.phoneNumber && props.errors.phoneNumber}</div> */}
            </div>

            <div className="block w-full lg:w-1/2">
                { !allVideos && 
                <div>
                    <div className="font-bold mb-5">Select Delivery Location</div>
                    <select className="w-full p-1 lg:p-3 bg-white mb-4 border-b-2" onChange={(e)=>{ setLocation(e.target.value); }}>
                            {
                                townsLoading ?
                                <option>Loading....</option>
                                :
                                towns.map( town => 
                                    <option key={town._id} value={town._id}>{town.town} - Ksh.{town.price}</option>
                                )
                            }
                    </select>
                </div>
                }
                {
                    allVideos && <div className="mb-8 text-md text-zinc-700 italic">* Links to our watch streams will be emailed to you via the email you have provided on <b>Account Information</b></div>
                }
                <div className="font-bold mb-5">Order Summary</div>
                {
                    products.map( product =>(
                        <div className="flex mb-1 text-xs lg:text-base">
                            <div className="w-48 lg:w-64">
                                { product.productName || product.title }
                            </div>
                            <div className="ml-5 lg:ml-0 w-5 lg:w-20">
                               X { product.quantity }
                            </div>
                            <div className="ml-2">
                                KES. { product.quantity * product.price }
                            </div>
                        </div>
                    ))
                }
                <hr />

                <div className="flex mt-5 text-xs lg:text-base">
                    <div className="w-48 lg:w-80 lg:mr-6 font-bold">Delivery Cost:</div>
                    <div className="ml-12 lg:ml-0">KES. {deliveryCost}</div>
                </div>

                <div className="flex mt-5 text-xs lg:text-base">
                    <div className="w-72 lg:w-80 lg:mr-4 font-bold">Min Price:</div>
                    <div>
                        <div className="flex">
                            <span className="p-2">KES. </span>
                            <Field type="number" name="minPrice" value={props.values.minPrice} className="border-b-2 p-2 mb-2 w-full lg:w-3/4" />
                        </div>
                        <div className="p-1 capitalize text-red-900 text-xs">{props.touched.minPrice && props.errors.minPrice}</div>
                    </div>
                    {/* <div className="ml-12 lg:ml-0">KES. {total + deliveryCost}</div> */}
                </div>

                <button className="collapse lg:visible w-28 flex justify-center p-1 border-2 border-black mt-10 hover:bg-black hover:text-white" type="submit">
                    { loading &&  <div><SyncLoader size={6} color={"black"}/></div> }
                    {!loading && <div>PAY</div> }
                </button>


            </div>
        </div>


        <button type="submit" className="visible lg:collapse fixed bottom-0 bg-blue-950 text-white text-center w-full lg:w-0 p-4 text-bold tracking-wider font-serif flex justify-center">
           { loading &&  <div><SyncLoader size={6} color={"#fff"}/></div> }
           {!loading && <div>PAY</div> }
        </button>
        </Form>
    )}
    </Formik>
    }
    </div>
    );
}
 
export default Checkout;