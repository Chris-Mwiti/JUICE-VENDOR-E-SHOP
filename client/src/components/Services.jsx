import { Box, Stack, Typography } from "@mui/material";
import { Container } from "../styles/styledComponents";
import { LocalShipping, LocalBar, Verified, SupportAgent } from "@mui/icons-material";

const Services = () => {
    const servicesList = [
        {
            id: 1,
            icon: <LocalShipping sx={{fontSize: '50px'}} color="#fff" />,
            title: "FREE SHIPPING",
            body: "ON ORDER OVER SH 500",
            backGroundColor: '#a559f8'
        },
        {
            id: 2,
            icon: <LocalBar sx={{fontSize: '50px'}} color="#fff"  />,
            title: "ALWAYS FRESH",
            body: "PRODUCT WELL PACKAGE",
            backgroundColor: "#e4c47e"
        },
        {
            id: 3,
            icon: <Verified sx={{fontSize: '50px'}} color="#fff"/>,
            title: "VERIFIED QUALITY",
            body: "ALWAYS QUALITY PRODUTS",
            backGroundColor: "#94dbf7"
        },
        {
            id: 4,
            icon: <SupportAgent sx={{fontSize: '50px'}} color="#fff"/>,
            title: "SUPPORT",
            body: "24/7 SUPPORT",
            backGroundColor: "#f8be65"
        }
    ]
    return ( 
        <Container>
            <Stack direction={{xs: 'column', md: 'row'}} justifyContent={{xs: 'center', md: 'space-around'}} alignItems='center' margin={3}>
              {servicesList.map((item) => (
                <Box display='flex' flexDirection= 'column' gap={1} justifyContent='center'key={item.id} >
                    <Box display='inherit' justifyContent='center' alignItems='center'>
                        <Box sx={{width: '90px', height: '90px', borderRadius: '50%',  color: '#fff',backgroundColor: '#e4c47e', padding: '5px', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                            <Box sx={{width: '70px', height: '70px', borderRadius: 'inherit', border: 2, borderColor: '#fff', display: 'inherit', alignItems: 'inherit', justifyContent: 'inherit', padding: '10px'}}>
                                {item.icon}
                            </Box>
                        </Box>
                    </Box>
                    <Typography variant="h6" component='h3' textAlign='center'>{item.title}</Typography>
                    <Typography variant="body1" component='p'>{item.body}</Typography>
                </Box>
              ))}
            </Stack>
        </Container>
     );
}
 
export default Services;