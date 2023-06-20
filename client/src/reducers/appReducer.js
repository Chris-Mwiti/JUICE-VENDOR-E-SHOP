import ACTION_TYPES from "../global/globalActionTypes";

function AppReducer(state,action){
    switch(action.type){
      case ACTION_TYPES.FETCH_SUCCESS: return{
        ...state,
        loading: false,
        data: action.payload
      };

      case ACTION_TYPES.FETCH_ERROR: return{
        ...state,
        loading: false,
        error: action.error
      }

      case ACTION_TYPES.ADD_TO_CART: return{
        ...state,
        cart: [action.cartItem,...state.cart]
      }

      case ACTION_TYPES.FETCH_CART_ITEMS.FETCH_SUCCESS: return{
        ...state,
        loading: false,
        cartItems: action.cartItems
      }

      case ACTION_TYPES.FETCH_CART_ITEMS.FETCH_ERROR: return {
        ...state,
        loading: false,
        error: action.fetch_error
      }

      case ACTION_TYPES.CHECK_LOGGEDIN_STATUS.IS_LOGGED_IN: return{
        ...state,
        isLoggedIn: true
      }

      case ACTION_TYPES.CHECK_LOGGEDIN_STATUS.IS_LOGGED_OUT: return{
        ...state,
        isLoggenIn: false
      }
      
      default:
        state
    }
}

export default AppReducer