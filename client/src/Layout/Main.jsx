import {Outlet} from 'react-router-dom'
import {Box} from '@mui/material'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer';

const MainLayout = ({cartItems}) => {
    return ( 
        <Box sx={{width: '100%', height: '100%', position: 'relative',display: 'flex', flexDirection: 'column'}}>
            <Navbar cartItems={cartItems}/>
            <Outlet/>
            <Footer/>
        </Box>
    );
}
 
export default MainLayout;
