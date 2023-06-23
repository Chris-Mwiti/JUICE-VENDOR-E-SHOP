// MUI COMPONENTS
import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";

// React imports
import { useState,useReducer, memo } from "react";

// Reducers
import { cartSummaryReducer } from "../reducers/cartReducers";

// Controllers
import DiscountController from "../controllers/discountController";
import OrderController from "../controllers/orderController";

// Helpers
import { isObjectEmpty } from "../helpers/isObjectEmpty";
import { discountCalculator } from "../helpers/discountCalculator";

const CartSummary = memo(function CartSummary ({cartItems,shippingDetails,isLoggedIn,cartDispatch}){
    // Checks tho no of items in the cart
    const noOfCartItems = cartItems && cartItems.length
    // States to manage the code status of each code
    const [codeStatus, setCodeStatus] = useState({
        loading: false,
        message: "",
        error: false
    })
    // Calculates the total price of the products in the cart
    const totalPrice = cartItems && cartItems.reduce((total,currValue) => total + currValue.total,0)
    // Initialize the state of the reducers
    const initState = {
        finalTotal: totalPrice,
        deliveryMethod: {price: 0, type:"free", helperText: "Delivery is within 2-5 hours"},
        deliveryOption: 0,
        promoValue: "",
        fetchPromoStatus: {
            loading: true,
            error:{status: false, message: ""},
            codes: null
        },
        checkOut:{
            loading: false,
            error:{status: false, message: "There was an error while placing your order"}
        },
        disabled: false  
    }
    const [state,dispatch] = useReducer(cartSummaryReducer, initState)
    
    // Fetch the promos from the database
    async function fetchPromo(){
        const discountController = new DiscountController()
        try{
          const codes = await discountController.getDiscountCodes()
          dispatch({type: "fetchPromoSuccess", codes: codes})
          return codes
        }
        catch(error){ 
          dispatch({type: "fetchPromoError", error: error.message})  
        }
    }

    // Check if the promo codes exists
    const checkPromoCode = async () => {
        // Sets the loading status to true
        setCodeStatus((prevState) => ({...prevState, loading: true}))

        fetchPromo().then((codes) => {
            // Returns the index of the promoCode
            const indexOfCode = codes.findIndex((item) => item.code == state.promoValue)
            if(indexOfCode == -1) return setCodeStatus((prevState) => ({...prevState, loading: false, message: "Promo code not found", error: true}))
            setCodeStatus((prevState) => ({...prevState, loading: false, message: "Promo code found", error: false}))

            // Apply the discount percentage to get the new value
            const newFinalTotal = totalPrice - discountCalculator(codes[indexOfCode].value,state.finalTotal);
            dispatch({type: "handleTotalChange", newTotal: newFinalTotal})
        })
    }

    const handleCheckOut = async(e) => {
        e.preventDefault()
        // Verify the user is logged in before completing purchase
        if(!isLoggedIn) return cartDispatch({type:"errorSnackBar", snackBarError: "Please log in to complete order" });
      
        if (isObjectEmpty(shippingDetails)) return cartDispatch({type: "errorSnackBar", snackBarError: "Please fill in your shipping Details"})
        const orderDetails = {
            cartTotal: state.finalTotal,
            cartItems: cartItems,
            shippingDetails: shippingDetails
        }
        // Instantiate the orderController
        const orderController = new OrderController(orderDetails)
        const postOrderResponse = await orderController.postOrderDetails();

        // Check if the response is successful or not
        if(postOrderResponse.status !== 201) return cartDispatch({type: "errorSnackBar", snackBarError: "There was an error while placing your order please try again later"})
        cartDispatch({type: "successSnackBar", snackBarSuccess: "Your order has been successfully been placed"})
        
    }
    return (
        <Box width={{xs: '100%', md: '30%'}} maxHeight={'700px'} display={'flex'} flexDirection={'column'} paddingX={3} paddingY={2}  gap={2} sx={{backgroundColor: '#e7e7e7'}} borderRadius={2} component={'form'} onSubmit={handleCheckOut}>
            <Typography variant="h5">Order Summary</Typography>
            <hr></hr>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                <Typography variant="h6">{`Items ${noOfCartItems}`}</Typography>
                <Typography variant="h6" color={'primary'}>{`Total: ${totalPrice}sh`}</Typography>
            </Stack>
            <Stack direction={'column'} spacing={3}>
                <Typography variant="body1" color={'#000'}>SHIPPING</Typography>
                <FormControl fullWidth>
                    <InputLabel id="select-shipping-method">Shipping Method</InputLabel>
                    <Select
                    labelId="select-shipping-method"
                    label="Shipping Method"
                    id="shipping-method"
                    value={state.deliveryOption}
                    onChange={(e) => dispatch({type: "handleDeliveryChange", option: e.target.value, totalPrice: totalPrice})}
                >
                    <MenuItem value={0}> Free Shipping - 0sh</MenuItem>
                    <MenuItem value={100}> Standard Shipping - 100sh</MenuItem>
                </Select>
                <FormHelperText>{state.deliveryMethod.helperText}</FormHelperText>
                </FormControl>
            </Stack>
            <Stack direction={'column'} spacing={3} marginBottom={2}>
                <Typography variant="body1" color={'#000'}>PROMO CODE</Typography>
                <TextField
                    id="promo-code"
                    label="Enter promo code"
                    value={state.promoValue}
                    onChange={(e) => dispatch({type: "handlePromoChange", promoValue: e.target.value})}
                    error = {codeStatus.error}
                    helperText={codeStatus.message}
                >
                </TextField>
                <Button variant="contained" sx={{width: '200px'}} onClick={checkPromoCode} disabled={codeStatus.loading || state.disabled }>{codeStatus.loading ? (<CircularProgress color="secondary" />) : (<Typography color={'#fff'}>APPLY</Typography>)
                }</Button>
            </Stack>
            <hr></hr>
            <Stack direction={'row'} justifyContent={'space-between'} marginBottom={2}>
                <Typography> TOTAL COST</Typography>
                <Typography color={'primary'}>{ `${state.finalTotal}sh`}</Typography>
            </Stack>
            <Button variant="contained" type="submit">CHECKOUT</Button>
        </Box>
     );
    
})
 
export default CartSummary;