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
import SignUpForm from './containers/Sign-up.jsx'
import Product from './containers/Products.jsx'

// Router-Dom Components
import { Routes, Route } from 'react-router-dom'

// Hooks
import { useApp } from './Hooks/useApp.jsx'

// Reducers
import AppReducer from './reducers/appReducer.js'
import LogInForm from './containers/Log-in.jsx'
import Shop from './containers/Shop.jsx'



function App(){
  const initialStates = {
    loading: true,
    data: null,
    error: null,
    cart: [],
    cartItems: null,
    token: null,
    isLoggedIn: false
  }

  const [state, dispatch] = useReducer(AppReducer, initialStates)
  // Mount hook
  useApp(dispatch,state)
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{width: '100%',minHeight: '100vh', position: 'relative'}} overflow={'hidden'}>
        <Routes>
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/log-in' element={<LogInForm appDispatch={dispatch} />} />
          <Route path='/' element={<MainLayout cartItems={state.cartItems && state.cartItems.length} isLoggedIn={state.isLoggedIn} />}>
            <Route index element={<Home products={state.data}/>} />
            <Route path='cart' element={<Cart cartItems={state.cartItems} isLoggedIn={state.isLoggedIn}/>} />
            <Route path='shop' element={<Shop products={state.data} />} />
            <Route path='/product/:id/:category' element={<Product dispatchCart={dispatch}/>}></Route>
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  )
}

export default App
