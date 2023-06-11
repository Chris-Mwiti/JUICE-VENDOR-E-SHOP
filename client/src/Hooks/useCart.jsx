import { useEffect } from "react";
import ACTION_TYPES from "../global/globalActionTypes";
import CartController from "../controllers/cartController";

export  default function useCart(dispatch){
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
        fecthCartItems(dispatch)
    },[])
}

