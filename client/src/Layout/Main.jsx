import {Outlet} from 'react-router-dom'
import {Box} from '@mui/material'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer';
import { memo } from 'react';

const MainLayout =memo(function MainLayout({cartItems,isLoggedIn}) {
    return ( 
        <Box sx={{width: '100%', height: '100%', position: 'relative',display: 'flex', flexDirection: 'column'}}>
            <Navbar cartItems={cartItems} isLoggedIn={isLoggedIn}/>
            <Outlet/>
            <Footer/>
        </Box>
    );
})
 
export default MainLayout;
