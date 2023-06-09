import { useSwiper } from "swiper/react";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const SwiperNextBtn = () => {
    const swiper = useSwiper()
    return ( 
        <IconButton size="large" color="primary" onClick={() => swiper.slideNext()}>
            <ArrowForwardIosIcon fontSize="inherit" />
        </IconButton>
     );
}
 
export default SwiperNextBtn;