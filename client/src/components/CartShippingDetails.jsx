import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Container } from "../styles/styledComponents";
import { useState } from "react";

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
        await dispatch({type: AC})
    }

    return ( 
        <Container>
            <Box component={'form'} display={'flex'} flexDirection={'column'} gap={2}>
                <Typography variant="h4">Shipping Details</Typography>
                <hr></hr>
                <Stack direction={'column'} spacing={2}>
                    <TextField type="text" value={countyName} onChange={(e) => setCountyName(e.target.value)} label="Enter county name" required />
                    <TextField type="text" value={townName} onChange={(e) => setTownName(e.target.value)} label="Enter county name" required />
                    <TextField type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} label="Enter county name" required />
                    <TextField type="text" value={locationDesc} onChange={(e) => setLocationDesc(e.target.value)} label="Enter county name" required />
                </Stack>
                <Button variant="contained" type="submit">Submit</Button>
            </Box>
        </Container>
     );
}
 
export default ShippingForm;