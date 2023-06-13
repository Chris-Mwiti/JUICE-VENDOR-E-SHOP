import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState,useReducer } from "react";
import { cartSummaryReducer } from "../reducers/cartReducers";
import DiscountController from "../controllers/discountController";

const CartSummary = ({cartItems}) => {
    const noOfCartItems = cartItems && cartItems.length
    const totalPrice = cartItems && cartItems.reduce((total,currValue) => total + currValue.total,0)
    const initState = {
        finalTotal: totalPrice,
        deliveryMethod: {price: 0, type:"free", helperText: "Delivery is within 2-5 hours"},
        deliveryOption: "Free",
        promoValue: "",
        fetchPromoStatus: {
            loading: true,
            error:{status: false, message: ""},
            codes: []
        },
        codeStatus: {
            loading: false,
            error:{status: false, message: ""}
        }
    }
    const [state,dispatch] = useReducer(cartSummaryReducer, initState)
    async function fetchPromo(){
        const discountController = new DiscountController()
        try{
          const codes = await discountController.getDiscountCodes()
          console.log(codes)
          dispatch({type: "fetchPromoSuccess", codes: codes})
          console.log(state.fetchPromoStatus.codes)
        }
        catch(error){
          dispatch({type: "fetchPromoError", error: error.message})  
        }
    }
    const checkPromoCode = async () => {
        // dispatch({type: 'loading'})
        await fetchPromo()
        state.fetchPromoStatus.codes.map((item) => {
            if(item.code !== state.promoValue){
                dispatch({type: "promoError", errorMessage: "Promo code not found"})
            }
            else{
                console.log("success")
                dispatch({type: "promoSuccess", successMessage: "Promo code found"})
            }

            
        })
    }
    return (
        <Box width={{xs: '100%', md: '30%'}} height={'100%'} display={'flex'} flexDirection={'column'} paddingX={3} paddingY={2}  gap={2} sx={{backgroundColor: '#e7e7e7'}}>
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
                    <MenuItem value={"Free"}> Free Shipping - 0sh</MenuItem>
                    <MenuItem value={"Standard"}> Standard Shipping - 100sh</MenuItem>
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
                    error={state.codeStatus.error.status}
                    helperText={state.codeStatus.message}
                >
                </TextField>
                <Button variant="contained" sx={{width: '200px'}} onClick={checkPromoCode} disabled={state.codeStatus.loading}>{state.codeStatus.loading ? (<CircularProgress color="secondary" />) : (<Typography color={'#fff'}>APPLY</Typography>)
                }</Button>
            </Stack>
            <hr></hr>
            <Stack direction={'row'} justifyContent={'space-between'} marginBottom={2}>
                <Typography> TOTAL COST</Typography>
                <Typography color={'primary'}>{ `${state.finalTotal}sh`}</Typography>
            </Stack>
            <Button variant="contained">CHECKOUT</Button>
        </Box>
     );
}
 
export default CartSummary;