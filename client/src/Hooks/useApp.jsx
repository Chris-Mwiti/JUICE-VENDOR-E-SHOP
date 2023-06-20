import { useEffect } from "react";
import ACTION_TYPES from "../global/globalActionTypes";
import ProductController from "../controllers/productController";
import CartController from "../controllers/cartController";

export const useApp = (dispatch,state) => {
    useEffect(() => {
      async function fetchProducts(){
        try {
          const productController = new ProductController();
          const products = await productController.getProducts();
          dispatch({type: ACTION_TYPES.FETCH_SUCCESS, payload: products})
        } catch (error) {
          dispatch({type: ACTION_TYPES.FETCH_ERROR, error: error.message})
        }
      }

      async function fetchCartItems(dispatch){
        try{
          const cartController = new CartController();
          const cartItems = await cartController.getItems();
          dispatch({type: ACTION_TYPES.FETCH_CART_ITEMS.FETCH_SUCCESS, cartItems: cartItems})
        }
        catch(error){
          dispatch({type: ACTION_TYPES.FETCH_CART_ITEMS.FETCH_ERROR, fetch_error: error.message})
        }
      }
      if(state.data == null){
        fetchProducts(dispatch)
      }

      fetchCartItems(dispatch)
    },[])
}