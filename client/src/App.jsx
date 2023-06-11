// React
import { useReducer, useEffect } from 'react'

// MUI COMPONETS
import { ThemeProvider } from '@emotion/react'
import {theme} from './theme/customTheme.js'
import { Box } from '@mui/material'

// Styling Files
import './App.css'

// Components
import Home from './containers/Home.jsx'
import MainLayout from './Layout/Main.jsx'
import Cart from './containers/Cart.jsx'

// Router-Dom Components
import { Routes, Route } from 'react-router-dom'
import ProductController from './controllers/productController.js'

// Global Variables
import ACTION_TYPES from './global/globalActionTypes.js'
import Product from './containers/Products.jsx'
import CartController from './controllers/cartController.js'

function App(){
  const initialStates = {
    loading: true,
    data: null,
    error: null,
    cart: [],
    cartItems: null
  }

  function reducer(state,action){
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

      
      default:
        state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialStates)
  console.log(state.cart)
    useEffect(() => {
      async function fetchProducts(dispatch){
        try {
          const productController = new ProductController();
          const products = await productController.getProducts();
          dispatch({type: ACTION_TYPES.FETCH_SUCCESS, payload: products})
        } catch (error) {
          dispatch({type: ACTION_TYPES.FETCH_ERROR, error: error.message})
        }
      }

      async function fetchCartItems(dispatch){
        try{
          const cartController = new CartController();
          const cartItems = await cartController.getItems();
          dispatch({type: ACTION_TYPES.FETCH_CART_ITEMS.FETCH_SUCCESS, cartItems: cartItems})
        }
        catch(error){
          dispatch({type: ACTION_TYPES.FETCH_CART_ITEMS.FETCH_ERROR, fetch_error: error.message})
        }
      }
      if(state.data == null){
        fetchProducts(dispatch)
      }

      fetchCartItems(dispatch)
    },[])
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{width: '100vw',minHeight: '100vh', position: 'relative'}}>
        <Routes>
          <Route path='/' element={<MainLayout cartItems={state.cart.length} />}>
            <Route index element={<Home products={state.data}/>} />
            <Route path='cart' element={<Cart cartItems={state.cartItems}/>} />
            <Route path='/product/:id/:category' element={<Product dispatchCart={dispatch}/>}></Route>
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  )
}

export default App
