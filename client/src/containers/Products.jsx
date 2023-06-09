import { Alert, Box, Button, CircularProgress, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Container } from "../styles/styledComponents";
import { Link, useNavigate, useParams } from "react-router-dom";

// Controllers 
import ProductController from "../controllers/productController";
import CartController from "../controllers/cartController";


// Global variables
import ACTION_TYPES from "../global/globalActionTypes";

// React Hooks
import { useEffect, useReducer,useState } from "react";

const Product = ({dispatchCart}) => {
    // Parameters Query
    const {id,category} = useParams();

    // Reducer states  
    const initialStates = {
        loading: true,
        productItem: null,
        error: null,
        filterCategory: null,
    }

    // Reducer Function
    function reducer(state,action){
        switch(action.type){
        case ACTION_TYPES.FETCH_SUCCESS: return{
            ...state,
            loading: false,
            productItem: action.payload,
            filterCategory: action.filter
        };

        case ACTION_TYPES.FETCH_ERROR: return{
            ...state,
            loading: false,
            error: action.error
        }

        default:
            state
        }   
    }

    const [state, dispatch] = useReducer(reducer, initialStates)
    // Mount Hook
    useEffect(() => {
        // Asynchronous function for fetch product
        async function fetchProduct(dispatch){
            try {
            const productController = new ProductController(id,category);
            const products = await productController.getProduct();
            const filterCategory = await productController.filterProducts()
            dispatch({type: ACTION_TYPES.FETCH_SUCCESS, payload: products, filter: filterCategory})
            } catch (error) {
            dispatch({type: ACTION_TYPES.FETCH_ERROR, error: error.message})
            }

        }
        fetchProduct(dispatch)
    },[id])

    // Components state
    const [quantity,setQuantity] = useState(1)
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }
    const [snackBarStatus, setSnackBarStatus] = useState(false)

    // initialize navigate hook
    const navigate = useNavigate()

    const handleAddCartItem = async(productItem) => {
       await dispatchCart({type: ACTION_TYPES.ADD_TO_CART, cartItem: productItem})

        // Adds Quantity property to the productItem
       const newProductItem = {...productItem, quantity: quantity}
       const cartController = new CartController(newProductItem)

        // Post Status
       const status = await cartController.addItem()
       if(!status == 201) return
        setSnackBarStatus(true)

        // Redirect user back to the home page
        setTimeout(() => navigate('/'), 3000)

    }
    
    return ( 
        <Container display='flex' flexDirection='column' alignItems='center' paddingY={8} paddingX={3} gap={2}>
            <Typography variant="h3" color='#000000'>Products</Typography>
            <Typography variant="body1">Here is your selected product</Typography>
            <Container display='flex' justifyContent='center' flexDirection='column'>
                {state.loading && <CircularProgress size='100px'/>}
                {state.error && <div>{state.error}</div>}
                {state.productItem && 
                <Container display='flex' justifyContent='center' >
                    <Box border={2} borderRadius={2} borderColor='#898a89' display={'flex'} sx={{flexDirection: {xs: 'column', md: 'row'}}}>
                        <Box width={{xs: '100%', md: '500px'}} height={{xs: '100%', md: '500px'}} borderRadius='inherit'>
                            <img width='100%' height='100%' style={{objectFit: 'contain', borderRadius: '6px'}} src={state.productItem.image} alt={state.productItem.title} />
                        </Box>
                        <Box width={{xs: '100%', md: '500px'}} height={{xs: '100%', md: '500px'}} padding={3}>
                            <Container display='flex' flexDirection='column' gap={3}>
                                <Typography variant="h4">{state.productItem.title}</Typography>
                                <hr></hr>
                                <Box display='flex' alignItems='center' justifyContent='space-between' flexDirection={{xs: 'column', md: 'row'}}>
                                    <Typography variant="h4" color='primary'>{`${state.productItem.price.slice(0,2) * quantity} sh`}</Typography>
                                    <TextField type="number" value={quantity} onChange={(e) => handleQuantityChange(e)}/>
                                </Box>
                                <hr></hr>
                                <Typography variant="body1">{state.productItem.description}</Typography>
                                <hr></hr>
                                <Button variant="contained" onClick={() => {handleAddCartItem(state.productItem)}}>ADD TO CART</Button>
                            </Container>
                        </Box>
                    </Box>
                </Container>}
            </Container>
            <Container height='200px' display={'flex'} flexDirection={'column'} gap={2}>
                <Typography variant="h4" textAlign='center'>Similar Products</Typography>
                <Stack direction= {{xs: 'column', md: 'row'}} justifyContent='space-evenly' gap={2}>
                    {state.filterCategory && state.filterCategory.map((item) => (
                        <Link to={`/product/${item.id}/${item.category}`} key={item.id}>
                            <Box key={item.id} display={'flex'} gap={2} border={2} borderColor='#898a89' padding={2} borderRadius={2}>
                                <Box display='flex'>
                                    <Box width='110px' height='110px'>
                                        <img src={item.image} width='100%' height='100%' alt={item.title} />
                                    </Box>
                                </Box>
                                <Stack direction={'column'} spacing={2}>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography variant="h5" color={'primary'}>{item.price}</Typography>
                                </Stack>
                            </Box>
                        </Link>
                    ))}
                </Stack>
            </Container>

            <Snackbar open={snackBarStatus} autoHideDuration={2000} onClose={() => setSnackBarStatus(false)}>
                <Alert onClose={() => setSnackBarStatus(false)} severity="success" sx={{ width: '100%' }}>
                    Item has been added to your cart
                </Alert>
            </Snackbar>
        </Container>
     );
}
 
export default Product;