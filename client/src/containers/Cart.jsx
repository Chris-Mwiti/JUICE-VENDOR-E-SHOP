import { Alert, Box, Breadcrumbs, Snackbar, Stack, Typography } from "@mui/material";
import { Container } from "../styles/styledComponents";
import { Link } from "react-router-dom";
import { NavigateNext } from "@mui/icons-material";
import CartItems from "../components/CartItems";
import { useReducer,memo } from "react";
import CartSummary from "../components/CartSummary";
import { useCallback } from "react";
import ShippingForm from "../components/CartShippingDetails";
import { cartReducer } from "../reducers/cartReducers";

const Cart = memo(function Cart({cartItems,isLoggedIn}){
    // State Managment
    const initState={
        cartItems: cartItems,
        cartTotal:0,
        shippingDetails:{},
        paymentType: "mpesa",
        snackBarStatus:{
            open: false,
            status: false,
            message: ""
        }
    }
    const [state,dispatch] = useReducer(cartReducer,initState)

    // Handlers
    const handleQuantityChange = useCallback((e,item) => {
       const {value} = e.target
       const cartItem = [...state.cartItems];
       const newCartItems = cartItem.map((cartItem) => {
            if(item.id == cartItem.id){
                return {
                    ...cartItem,
                    quantity: value,
                    total: value * cartItem.price
                }
            }
            else{
                return {
                    ...cartItem
                }
            }
        })
        dispatch({type: "handleQuantityChange", newCartItems: newCartItems})
    },[state.cartItems])

    return (  
        <Container minHeight={'100%'}>
            <Box width='100%' height='400px' position={'relative'}>
                <img src='/Images/Shop/shop-breadcrumb-background.jpg' alt="hero-background" width='100%' height='100%' style={{objectFit: 'cover'}} />
                <Box width="100%" sx={{position: "absolute", zIndex: 5, top: "50%", left: "50%", transform: 'translate(-50%, -50%)'}} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={2}>
                    <Breadcrumbs aria-label="breadcrumbs" separator={<NavigateNext fontSize="small" color="primary" />}>
                        <Link to={'/'} style={{fontSize: '18px', fontWeight: 'bolder'}}>Home</Link>
                        <Typography variant="h5" color={'primary.contrastText'}>Cart</Typography>
                    </Breadcrumbs>
                    <Typography variant="h3" textAlign={'center'} color={'primary.contrastText'}>My Cart</Typography>
                </Box>
            </Box>
            <Box display={'flex'} padding={2} width={'100%'}>
                { state.cartItems && state.cartItems ? (
                <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={2} margin={0}>
                    <CartItems cartItems={state.cartItems} handleQuantityChange={handleQuantityChange} />
                    <Stack display={'flex'} direction={{xs: 'column', md: 'row'}} justifyContent={'space-around'} alignItems={'center'} width={'100%'} spacing={2}>
                        <ShippingForm dispatch={dispatch} />
                        <CartSummary cartItems={state.cartItems} cartDispatch={dispatch} shippingDetails={state.shippingDetails} isLoggedIn={isLoggedIn}/>
                    </Stack>
                </Box>
                
                ):(
                <Box width={'100%'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='h4' textAlign={'center'}>Ooops!!, You have no items in your cart</Typography>
                </Box>)}
            </Box>
            <Snackbar open={state.snackBarStatus.open} autoHideDuration={2000} onClose={() => dispatch({type: "closeSnackBar"})}>
                <Alert onClose={() => dispatch({type: "closeSanckBar"})} severity={state.snackBarStatus.status ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {state.snackBarStatus.message}
                </Alert>
            </Snackbar>

        </Container>
    );
})
 
export default Cart;