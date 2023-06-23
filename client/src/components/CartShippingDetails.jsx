import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { Container } from "../styles/styledComponents";
import { useState } from "react";
import ACTION_TYPES from "../global/globalActionTypes";

const ShippingForm = ({dispatch}) => {
    // Components states
    const [countyName,setCountyName] = useState('')
    const [townName,setTownName] = useState('')
    const [streetName,setStreetName] = useState('')
    const [locationDesc,setLocationDesc] = useState('')
    const [loading,setLoading] = useState(false)

    // Container for holding shipping info
    const shippingInfo = {
        county: countyName,
        town: townName,
        street: streetName,
        locationDesc: locationDesc
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await dispatch({type: ACTION_TYPES.SHIPPING_DETAILS_SUBMIT, shippingDetailsPayload: shippingInfo})
        setLoading(false);
    }

    return ( 
        <Container width={{xs: '100%', md: '30%'}} bgcolor={'#e7e7e7'} padding={2} borderRadius={2}>
            <Box component={'form'} display={'flex'} flexDirection={'column'} gap={2} onSubmit={handleSubmit}>
                <Typography variant="h5">Shipping Details</Typography>
                <hr></hr>
                <Stack direction={'column'} spacing={3}>
                    <TextField type="text" value={countyName} onChange={(e) => setCountyName(e.target.value)} label="Enter county name" required />
                    <TextField type="text" value={townName} onChange={(e) => setTownName(e.target.value)} label="Enter town name" required />
                    <TextField type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} label="Enter street name" required />
                    <TextField type="text" value={locationDesc} onChange={(e) => setLocationDesc(e.target.value)} label="Enter location description" multiline rows={4} required />
                </Stack>
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? (<CircularProgress color="primary"/>) : "Submit"}
                </Button>
            </Box>
        </Container>
     );
}
 
export default ShippingForm;