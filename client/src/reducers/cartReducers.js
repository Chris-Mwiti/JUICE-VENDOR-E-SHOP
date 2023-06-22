import { Code } from "@mui/icons-material"

// CartSummary reducer
export function cartSummaryReducer(state,action){
    switch(action.type){
        case "handleDeliveryChange": return{
            ...state,
            deliveryOption: action.option,
            deliveryMethod: state.deliveryOption == "Standard" ? {price: 100,type: "Standard",helperText: "Delivery is within 1-3 hours"} : {price: 0,type: "Free",helperText: "Delivery is within 2-5 hours"} ,
            finalTotal: state.deliveryMethod.price + action.totalPrice
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

        case ACTION_TY

    }
}

