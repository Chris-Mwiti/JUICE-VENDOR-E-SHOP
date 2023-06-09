import { Box, Button, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper'
import 'swiper/css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Navbar from "./Navbar";


const Carousel = () => {
    // Images state
    const [images, setImages] = useState([
        {
            id: 1,
            url: 'Images/Heros/background13.jpg',
            title: 'We Offer Fresh And Fruity Smoothies',
            body: '100% Fresh And Organic Fruits'
        },
        {
            id: 2,
            url: 'Images/Heros/background4.jpg',
            title: "Quench Your Thirst With Freshly Made Smoothies",
            body: 'We Deliver At Your DoorStep'
            
        }
    ])

    return ( 
        <Box sx={{width: '100%', position: 'relative'}}>
            <Swiper modules={[Navigation]} loop spaceBetween={5}>
              {images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <Box sx={{width: '100vw', height: {xs: '90vh', sm: '90vh', md: 'calc(100vh - 80px)',position: 'relative'}}}>
                        <img src={image.url} height= "100%" width="100%" style={{objectFit: 'cover', objectPosition: 'center', opacity: 0.9}} />
                        <Stack direction='column' spacing={2} position='absolute' sx={{
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%,-50%)`,
                            zIndex: '3',
                            width: '100%'
                        }} alignItems='center'>
                            <Typography variant="h3" component="h1" textAlign='center' width='100%' fontSize={{xs: '28px', sm: '50px', md: '55px'}}>
                                {image.title}
                            </Typography>
                            <Typography variant="body1" component="h1" textAlign='center' width='100%' fontSize='20px' color='#f8f8f8'>
                               {image.body}
                            </Typography>
                            <Button startIcon={<ShoppingCartIcon />} variant="contained" sx={{width: '200px'}}>Shop Now</Button>
                        </Stack>
                    </Box>
                  </SwiperSlide>
              ))}
            </Swiper>
        </Box> 
     );
}
 
export default Carousel;
