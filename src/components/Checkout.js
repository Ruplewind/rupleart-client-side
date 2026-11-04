import { useContext, useEffect, useState } from "react";
import useCart from "../utils/CartContext";
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useFlowerCategories from "../utils/useFlowerCategories";
import FlowerDeliveryForm, { emptyFlowerDetails, validateFlowerDetails } from "./FlowerDeliveryForm";

const myRegex = /^07\d{8}$/;
const TAX_RATE = 0.015; // 1.5%

const COLOR_SWATCHES = {
  Black: '#000000', White: '#FFFFFF', Grey: '#808080', Red: '#DC2626',
  Orange: '#EA580C', Yellow: '#EAB308', Green: '#16A34A', Blue: '#2563EB',
  Navy: '#1E3A8A', Purple: '#9333EA', Pink: '#EC4899', Brown: '#78350F',
  Beige: '#D8C3A5', Gold: '#D4AF37', Silver: '#C0C0C0'
};

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

    const { flowerTypes, ready } = useFlowerCategories();
    const hasFlowers = products.some((p) => flowerTypes.has(p.type));
    const mixedCart = hasFlowers && !products.every((p) => flowerTypes.has(p.type));

    const [flower, setFlower] = useState(emptyFlowerDetails);
    const [flowerErrors, setFlowerErrors] = useState({});
    const patchFlower = (patch) => {
        setFlower((f) => ({ ...f, ...patch }));
        setFlowerErrors({}); // clear stale errors once the user edits
    };

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

    // Tax is 1.5% of (items total + delivery cost)
    const tax = (total + deliveryCost) * TAX_RATE;
    const grandTotal = total + deliveryCost + tax;

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
        minPrice: yup.number().min(deliveryCost + total + tax, `Minimum price is ${(deliveryCost + total + tax).toFixed(2)}`)
    })

    const { userId, token } = useContext(AuthContext);

    const handleSubmit = (data) => {
        if (hasFlowers) {
            const errs = validateFlowerDetails(flower);
            setFlowerErrors(errs);
            if (Object.keys(errs).length > 0) {
                toast.error("Please complete the flower delivery details");
                return;
            }
        }

        setLoading(true);
        const newData = {
            ...data, products, location, tax, grandTotal,
            ...(hasFlowers && { flowerDetails: flower }),
        };

        fetch(`${process.env.REACT_APP_API_URL}/Checkout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newData)
        })
        .then((res) => {
            if (res.ok) {
                res.json().then(response => {
                    setLink(response.redirect_url);
                    setLoading(false);
                    setShowIframe(true);
                });
            } else {
                // Show the server's own message (flower validation, min price, etc.)
                res.json()
                    .then(msg => toast.error(typeof msg === 'string' ? msg : "Something went wrong. Try again"))
                    .catch(() => toast.error("Something went wrong. Try again"))
                    .finally(() => setLoading(false));
            }
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            toast.error("Network error. Try again");
        });
    }

    const [ firstName, setFirstName] = useState('');
    const [ secondName, setSecondName] = useState('');
    const [ email, setEmail] = useState('');
    const [ phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/profile`,{
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        })
        .then( data => {
            if(data.ok){
                return data.json();

            }else if(data.status === 401){
                navigate("/login")
            }
        })
        .then( data => {
            setEmail(data.email);
            setFirstName(data.first_name);
            setSecondName(data.second_name);
            setPhoneNumber(data.phoneNumber);
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    if (!ready) {
        return <div className="text-center mt-20 text-gray-500">Loading...</div>;
    }

    if (mixedCart) {
        return (
            <div className="mt-20 mx-5 text-center">
                <div className="font-bold mb-2">Flowers must be ordered separately</div>
                <p className="text-sm text-gray-600 mb-5">
                    Flowers are delivered to a recipient, while other items go to your own delivery
                    location. Please remove one kind from your cart and check out separately.
                </p>
                <Link to="/cart" className="px-4 py-2 bg-purple-900 hover:bg-purple-700 text-white rounded-lg">
                    Back to cart
                </Link>
            </div>
        );
    }

    return ( <div className="mt-3 lg:mt-10 mb-10 lg:mb-10 ">
        <ToastContainer />
            <div className="flex justify-center mb-10 text-xl font-montserrat uppercase">Checkout</div>
            
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
            initialValues={{firstname: firstName, secondname: secondName, email:email, phoneNumber:phoneNumber, minPrice: deliveryCost + total + tax}}
            enableReinitialize={true}
            validationSchema={checkoutSchema}
            onSubmit={(values)=>{
                    handleSubmit(values);
                }
            }
            >
        {(props)=>(
    <Form>
        
        <div className="block lg:flex lg:justify-center mx-5 lg:mx-20">                
            <div className="block w-full lg:w-1/2">
                <div className="font-bold mb-5">Account Information</div>
                <div className="flex gap-4">
                    <div>
                        <Field type="text" name="firstname" readOnly onChange={e => {setFirstName(e.target.value)}} value={props.values.firstname} placeholder="First name"  className="border-b-2 p-2 mb-2 w-full lg:w-3/4" required/>
                        <div className="p-1 capitalize text-red-900 text-xs">{props.touched.firstname && props.errors.firstname}</div>
                    </div>
                    <div>
                        <Field type="text" name="secondname" readOnly onChange={e => {setSecondName(e.target.value)}} value={props.values.secondname} placeholder="Second name"  className="border-b-2 p-2 mb-2 w-full lg:w-3/4" required/>
                        <div className="p-1 capitalize text-red-900 text-xs">{props.touched.secondname && props.errors.secondname}</div>
                    </div>
                </div>                
                <div>
                <Field type="email" name="email" readOnly onChange={e => {setEmail(e.target.value)}} value={props.values.email} placeholder="Email"  className="border-b-2 p-2 mb-2 w-full lg:w-3/4" required/>
                </div>
                <div className="p-1 capitalize text-red-900 text-xs">{props.touched.email && props.errors.email}</div>
                <div>
                <Field type="text" name="phoneNumber" readOnly onChange={e => {setPhoneNumber(e.target.value)}} value={props.values.phoneNumber} placeholder="Phone Number" className="border-b-2 p-2 mb-2 w-full lg:w-3/4" />
                </div>
                <div className="flex justify-end  w-full lg:w-3/4">
                    <button onClick={e => {
                        e.preventDefault();
                        navigate("/profile");
                    }} className='mt-2 text-sm text-red-900 hover:text-red-500'>Edit profile?</button>
                </div>
                
                {/* <div className="p-1 capitalize text-red-900 text-xs">{props.touched.phoneNumber && props.errors.phoneNumber}</div> */}
            </div>

            <div className="block w-full lg:w-1/2">
                { !allVideos && 
                <div>
                    <div className="font-bold mb-5">
                        {hasFlowers ? "Select Delivery Area" : "Select Delivery Location"}
                    </div>
                    <select className="w-full p-1 lg:p-2 bg-white mb-4 border-b-2" onChange={(e)=>{ setLocation(e.target.value); }}>
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
                {hasFlowers && (
                    <FlowerDeliveryForm value={flower} onChange={patchFlower} errors={flowerErrors} />
                )}
                <div className="font-bold mb-5">Order Summary</div>
                {
                    products.map( product =>(
                        <div key={product.cartItemId ?? product._id} className="flex mb-1 text-xs lg:text-base items-center">
                            <div className="w-48 lg:w-64">
                                <div>{ product.productName } #{product.productId}</div>
                                { product.color &&
                                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                                        <span
                                            title={product.color}
                                            className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block cursor-default"
                                            style={{ backgroundColor: COLOR_SWATCHES[product.color] || '#ccc' }}
                                        />
                                        <span>{product.color}</span>
                                    </div>
                                }
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

                <div className="flex mt-2 text-xs lg:text-base">
                    <div className="w-48 lg:w-80 lg:mr-6 font-bold">Tax (1.5%):</div>
                    <div className="ml-12 lg:ml-0">KES. {tax.toFixed(2)}</div>
                </div>

                <div className="flex mt-2 text-xs lg:text-base">
                    <div className="w-48 lg:w-80 lg:mr-6 font-bold">Order Total:</div>
                    <div className="ml-12 lg:ml-0 font-bold text-purple-900">KES. {grandTotal.toFixed(2)}</div>
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

                <button className="w-full lg:w-28 flex justify-center p-2 border-2 bg-purple-900 mt-5 lg:mt-10 hover:bg-purple-700 text-white rounded-lg" type="submit">
                    { loading &&  <div><SyncLoader size={6} color={"white"}/></div> }
                    {!loading && <div>PAY</div> }
                </button>


            </div>
        </div>
        </Form>
    )}
    </Formik>
    }
    </div>
    );
}
 
export default Checkout;