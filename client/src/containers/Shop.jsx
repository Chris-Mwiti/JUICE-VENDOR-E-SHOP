import { Box, Breadcrumbs,Typography, OutlinedInput,InputLabel,MenuItem,FormControl,Select,Chip,FormHelperText } from '@mui/material';
import {Container} from '../../src/styles/styledComponents'
import {Link} from 'react-router-dom'
import {NavigateNext} from '@mui/icons-material'
import ProductsGrid from '../components/productGrid'
import { memo, useEffect, useState } from 'react';
import CategoriesController from '../controllers/categoriesController';
import { MenuProps } from '../styles/props';
const Shop = memo(function Shop({products}){
    const [loading, setLoading] = useState(false);
    const [filteredItems, setFilteredItems] = useState( products && [...products]);
    const [categories, setCategories] =  useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    // Fecth the categories available from the database

    const fetchCategories = async () => {
        const categoriesController = new CategoriesController()
       try{
        setLoading(true)
        const response = await categoriesController.getItems();
        const data = response.map((item) => item.name);
        setCategories([...data]);
        setLoading(false);
       }catch(err){
        console.error(err)
       }
    }
    useEffect(() => {
        fetchCategories()
    },[])

    // Handles the Item change in the select options
    const handleItemChange = (e) => {
        const { value } = e.target
        setSelectedItems([
            ...value
        ])
    }
    // Filters the items based on the categories selected
    useEffect(() => {
       if(selectedItems.length == 0) return setFilteredItems([...products])
        setFilteredItems(() => products.filter((product) => selectedItems.includes(product.category)));
    },[selectedItems,products])   

    return ( 
        <Container display={'flex'} flexDirection={'column'} alignItems={'center'}>
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

            <FormControl sx={{ m: 3, width: 300 }}>
                <InputLabel id="categories-multiple-chip-label">Categories</InputLabel>
                <Select
                labelId="categories-multiple-chip-label"
                id="categories-multiple-chip"
                multiple
                value={selectedItems}
                onChange={(e) => handleItemChange(e)}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                >
                {categories.map((category) => (
                    <MenuItem
                    key={category}
                    value={category}
                    >
                    {category}
                    </MenuItem>
                ))}
                </Select>
                <FormHelperText>Please Select the category of fruits to shop</FormHelperText>

            </FormControl>

            <ProductsGrid products={filteredItems} noOfItems={12}/>
        </Container>
     );
})
 
export default Shop;