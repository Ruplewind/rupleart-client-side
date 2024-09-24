import { createContext, useContext, useEffect, useReducer } from "react";
import reducer, { initialState } from "./Reducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
    const [state , dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
        const storedState = localStorage.getItem('state');

        if(storedState) {
            dispatch({type: 'SET_STATE', payload: JSON.parse(storedState)});
        }
    },[])

    const addToCart = (product) => {
        
        const itemIndex = state.products.findIndex(item => item._id === product._id);
        

        if(itemIndex >= 0){ //If it exists in state
                
            state.products[itemIndex].quantity += Number(product.quantity);

            state.products[itemIndex].size = product.size;

            updatedPrice(state.products);
            
            toast("Product Has Been Added To Cart",{
                autoClose: 500
            })
            
        }else{
            //let newProduct = {...product, quantity: product.quantity}

            const updatedCart = state.products.concat(product);

            updatedPrice(updatedCart)

            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    products: updatedCart
                }
            })

            toast("Product Has Been Added To Cart")
        }
    }

    const removeFromCart = (product) =>{
        const updatedCart = state.products.filter(currentProduct => 
            currentProduct._id !== product._id
        )

        updatedPrice(updatedCart);

        dispatch({
            type:"REMOVE_FROM_CART",
            payload: {
                products: updatedCart
            }
        })
    }


    const updatedPrice = (products) =>{
        let total = 0;

        products.forEach(product => total += (product.price * product.quantity))

        dispatch({
            type: "UPDATE_TOTAL",
            payload: {
                total: total
            }
        })
    }

    const clearState = () => {
        dispatch({
            type: "CLEAR_STATE",
            payload: {}
        })
    }

    const value = {
        total: state.total,
        products: state.products,
        addToCart,
        removeFromCart,
        clearState
    }

    return <CartContext.Provider value={value}>
        { children }
    </CartContext.Provider>
}

const  useCart = () => {
    const context = useContext(CartContext)

    if(context === 'undefined'){
        throw new Error("usecart must be used within CartContext")
    }
    return context;
}
 
export default useCart;