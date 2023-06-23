const ACTION_TYPES = {
    FETCH_SUCCESS: "fetchSuccess",
    FETCH_ERROR: "fetchError",
    ADD_TO_CART: "addToCart",
    CATEGORY_FILTER:{
        FETCH_SUCCESS: "fetchSuccess",
        FETCH_ERROR: "fetchError"
    },
    FETCH_CART_ITEMS: {
        FETCH_SUCCESS: "fetchSucess",
        FETCH_ERROR: "fetcherror",
        CALCULATE_TOTAL: "calculateTotal"
    },
    CHECK_LOGGEDIN_STATUS:{
        IS_LOGGED_IN:"isLoggedIn",
        IS_LOGGED_OUT: "isLoggedOut"
    },
    SHIPPING_DETAILS_SUBMIT: "handleShippingDetails",
    HANDLE_CHECKOUT_SUCCESS: "checkOutSuccess",
    HANDLE_CHECKOUT_ERROR: "checkOutError"

}

export default ACTION_TYPES