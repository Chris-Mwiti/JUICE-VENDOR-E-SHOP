import { useEffect } from "react";
import ACTION_TYPES from "../global/globalActionTypes";
import ProductController from "../controllers/productController";
import CartController from "../controllers/cartController";
import RegistrationController from "../controllers/registrationController";

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

      async function fetchCartItems(){
        try{
          const cartController = new CartController();
          const cartItems = await cartController.getItems();
          dispatch({type: ACTION_TYPES.FETCH_CART_ITEMS.FETCH_SUCCESS, cartItems: cartItems})
        }
        catch(error){
          dispatch({type: ACTION_TYPES.FETCH_CART_ITEMS.FETCH_ERROR, fetch_error: error.message})
        }
      }
      async function checkLogInStatus(){
        try{
          const userController = new RegistrationController();
          const response = await userController.checkUser();
          switch(response.status){
            case 401:
              dispatch({type: ACTION_TYPES.CHECK_LOGGEDIN_STATUS.IS_LOGGED_OUT})
              break;
            case 403:
              dispatch({type: ACTION_TYPES.CHECK_LOGGEDIN_STATUS.IS_LOGGED_OUT})
              break;
            case 200:
              dispatch({type: ACTION_TYPES.CHECK_LOGGEDIN_STATUS.IS_LOGGED_IN})
              break;
            default:
              dispatch({type: ACTION_TYPES.CHECK_LOGGEDIN_STATUS.IS_LOGGED_OUT})
          }
        }catch(err){
          dispatch({type: ACTION_TYPES.CHECK_LOGGEDIN_STATUS.IS_LOGGED_OUT})
          console.log(err);
        }
      }
      if(state.data == null){
        fetchProducts()
      }
      fetchCartItems()
      checkLogInStatus()

    },[])

    
}