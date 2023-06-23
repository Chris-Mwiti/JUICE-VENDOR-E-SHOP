
import ACTION_TYPES from "../global/globalActionTypes"

// Main Cart Reducers
export function cartReducer(state,action){
    switch(action.type){
        case "handleQuantityChange": return{
            ...state,
            cartItems: action.newCartItems
        }
        case ACTION_TYPES.FETCH_CART_ITEMS.CALCULATE_TOTAL: return{
            ...state,
            cartTotal: action.cartTotal
        }
          case ACTION_TYPES.SHIPPING_DETAILS_SUBMIT: return{
            ...state,
            shippingDetails: {...action.shippingDetailsPayload}
        }

        case "closeSnackBar": return{
            ...state,
            snackBarStatus:{
                ...state.snackBarStatus,
                open: false
            }
        }
        case "errorSnackBar": return{
            ...state,
            snackBarStatus:{
                ...state.snackBarStatus,
                open: true,
                status: false,
                message: action.snackBarError
            }
        }
        case "successSnackBar": return{
            ...state,
            snackBarStatus:{
                ...state.snackBarStatus,
                open: true,
                status: true,
                message: action.snackBarSuccess
            }
        }
        default: 
            state
    }
}

// CartSummary reducer
export function cartSummaryReducer(state,action){
    switch(action.type){
        case "handleDeliveryChange": return{
            ...state,
            deliveryOption: action.option,
            deliveryMethod: state.deliveryOption == "Standard" ? {price: 100,type: "Standard",helperText: "Delivery is within 1-3 hours"} : {price: 0,type: "Free",helperText: "Delivery is within 2-5 hours"} ,
            finalTotal: action.totalPrice + state.deliveryOption
        }
        case "handlePromoChange": return{
            ...state,
            promoValue: action.promoValue
        }
        case "fetchPromoSuccess": return{
            ...state,
            fetchPromoStatus: {
                ...state.fetchPromoStatus,
                loading: false,
                codes: [...action.codes]
            }
        }

        case "fetchPromoError": return{
            ...state, 
            fetchPromoStatus:{
                ...state.fetchPromoStatus,
                loading: false,
                error:{
                    ...state.fetchPromoStatus.error,
                    status: true
                }
            }
        }

        case "handleTotalChange": return{
            ...state,
            finalTotal: action.newTotal,
            disabled: true
        }

        case ACTION_TYPES.HANDLE_CHECKOUT_SUCCESS: return{
            ...state,
            checkOut:{
                loading: false,
                error:{...state.checkOut.error, status: false}
            }
        }

        case ACTION_TYPES.HANDLE_CHECKOUT_ERROR: return{
            ...state,
            checkOut:{
                loading: false,
                error:{...state.checkOut.error,status: true}
            }
        }
        default:
            state

    }
}

