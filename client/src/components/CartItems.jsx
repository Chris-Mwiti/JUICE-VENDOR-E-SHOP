import { Box, Stack, Typography,TableContainer,Table, TableHead, TableBody,TableRow, TextField } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../styles/styledComponents";
import { useState } from "react";

const CartItems = ({cartItems,handleQuantityChange}) => {
    return ( 
        <Box display={'flex'} flexDirection={'column'} width={{xs: '100%', md:'70%'}} maxHeight={'100%'} gap={2} paddingY={2}>
            <Typography variant="h5">Shopping Cart</Typography>
            <hr></hr>
            <Stack direction={'column'} spacing={1} width={'100%'}>
             <TableContainer component={'paper'} sx={{maxHeight:{md: 700}, width: '100%'}}>
                <Table sx={{width: '100%'}} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>PRODUCT DETAILS</StyledTableCell>
                            <StyledTableCell align="right">QUANTITY</StyledTableCell>
                            <StyledTableCell align="right">PRICE</StyledTableCell>
                            <StyledTableCell align="right">TOTAL</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems && cartItems.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component='th'>
                                    <Box display={'flex'} height={'110px'} width={{xs: 150, md: 300}} gap={1}>
                                        <Box width={{xs: 70, md: 110}} height={{xs: 70, md: 110}}>
                                            <img src={item.image} width="100%" height="100%" style={{objectFit: "contain"}} alt={item.title} />
                                        </Box>
                                        <Stack direction={'column'} spacing={2}>
                                            <Typography variant="h6">{item.title}</Typography>
                                        </Stack>
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <TextField type="number" value={item.quantity} onChange={(e) => handleQuantityChange(e,item)} />
                                </StyledTableCell>
                                <StyledTableCell align="right">{item.price}</StyledTableCell>
                                <StyledTableCell align="right">{Number(item.price) * item.quantity}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
             </TableContainer>
            </Stack>
        </Box>
     );
}
 
export default CartItems;