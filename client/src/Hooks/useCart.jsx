import { useEffect } from "react";
import ACTION_TYPES from "../global/globalActionTypes";
import CartController from "../controllers/cartController";

//@TODO ADD A DISPATCH FUNCTION TO UPDATE THE CARTITEMS 
export  default function useCart(dispatch,state){
    useEffect(() => {
        async function fecthCartItems(){
            const cartControlller = new CartController();
           try{
            const cartItems = await cartControlller.getItems()
            dispatch({type: ACTION_TYPES.FETCH_CART_ITEMS.FETCH_SUCCESS, payload: cartItems})
           }
           catch(error){
            dispatch({type: ACTION_TYPES.FETCH_CART_ITEMS.FETCH_ERROR, error: error.message})
           }
        }
        if(state.cartItems !== null) return
        fecthCartItems(dispatch)
    },[])
}

