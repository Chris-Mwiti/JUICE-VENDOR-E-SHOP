import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import { Container } from "../styles/styledComponents";
import { Link } from "react-router-dom";
import { NavigateNext } from "@mui/icons-material";
import CartItems from "../components/CartItems";
import { useReducer } from "react";
import ACTION_TYPES from "../global/globalActionTypes";
import useCart from "../Hooks/useCart";
import CartSummary from "../components/CartSummary";

const Cart = () => {
    const initState={
        cartItems:null,
        loading:false,
        error: null,
        cartTotal:0
    }
    function reducer(state,action){
        switch(action.type){
            case ACTION_TYPES.FETCH_CART_ITEMS.FETCH_SUCCESS:return{
                ...state,
                loading: false,
                cartItems: action.payload
            }
            case ACTION_TYPES.FETCH_CART_ITEMS.FETCH_ERROR: return{
                ...state,
                loading: false,
                error: action.error
            }
            case "handleQuantityChange": return{
                ...state,
                cartItems: action.newCartItems
            }
            case ACTION_TYPES.FETCH_CART_ITEMS.CALCULATE_TOTAL: return{
                ...state,
                cartTotal: action.cartTotal
            }
        }
    }
    const [state,dispatch] = useReducer(reducer,initState)
    const handleQuantityChange = (e,item) => {
       const {value} = e.target
       const cartItems = [...state.cartItems];
       const newCartItems = cartItems.map((cartItem) => {
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
    }
    // Mount hook
    useCart(dispatch)

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
                <Stack display={'flex'} direction={{xs: 'column', md: 'row'}} justifyContent={'space-between'} width={'100%'} gap={{xs: 2, md: 0}}>
                    <CartItems cartItems={state.cartItems} handleQuantityChange={handleQuantityChange} />
                    <CartSummary cartItems={state.cartItems} />
                </Stack>
                ):(
                <Box width={'100%'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='h4' textAlign={'center'}>Ooops!!, You have no items in your cart</Typography>
                </Box>)}
            </Box>

        </Container>
    );
}
 
export default Cart;