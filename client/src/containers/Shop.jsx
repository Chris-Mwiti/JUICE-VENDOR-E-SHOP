import { Box, Breadcrumbs, Typography } from '@mui/material';
import {Container} from '../../src/styles/styledComponents'
import {Link} from 'react-router-dom'
import {NavigateNext} from '@mui/icons-material'
import ProductsGrid from '../components/productGrid'
import { memo } from 'react';
const Shop = memo(function Shop({products}){
    return ( 
        <Container display={'flex'} flexDirection={'column'}>
            <Box width='100%' height='400px' position={'relative'}>
                <img src='../../public/Images/Contact/contact-breadcrumb-background.jpg' alt="hero-background" width='100%' height='100%' style={{objectFit: 'cover'}} />
                <Box width="100%" sx={{position: "absolute", zIndex: 5, top: "50%", left: "50%", transform: 'translate(-50%, -50%)'}} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={2}>
                    <Breadcrumbs aria-label="breadcrumbs" separator={<NavigateNext fontSize="small" color="primary" />}>
                        <Link to={'/'} style={{fontSize: '18px', fontWeight: 'bolder'}}>Home</Link>
                        <Typography variant="h5" color={'primary.contrastText'}>Cart</Typography>
                    </Breadcrumbs>
                    <Typography variant="h3" textAlign={'center'} color={'primary.contrastText'}>Shop</Typography>
                </Box>
            </Box>
            <ProductsGrid products={products} noOfItems={12}/>
        </Container>
     );
})
 
export default Shop;