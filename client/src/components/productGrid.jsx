// MUI COMPONENTS
import { Favorite } from "@mui/icons-material";
import { Button, IconButton, Skeleton, Typography } from "@mui/material";
// Styled Components
import '../styles/productGrid.css'
import { Container } from "../styles/styledComponents";

// React-Router components
import {Link} from 'react-router-dom'

const ProductsGrid = ({products,noOfItems}) => {
    const maxProducts = noOfItems
    const limitedProducts =products &&  products.slice(0,maxProducts)
    return ( 
       <Container padding={1} display='flex' flexDirection='column' gap={3}>
            <Typography variant="h4" textAlign='center' color='primary'>Featured Products</Typography>
            <Typography variant="h3" color='#000' textAlign='center'>Our Products</Typography>
            <Typography variant="body1" textAlign='center'>Quench Your thirst with our refreshing juices</Typography>
            <div className="product-grid-container">
               {products && limitedProducts.map((product) => (
                <div className="product-grid-item" key={product.id}>
                   <Link to={`/product/${product.id}/${product.category}`}>
                        {product.image ? (
                        <div className="product-image">
                            <img src={product.image} alt={product.title}></img>
                        </div>
                        ): (<Skeleton variant="rectangular" width='100%' height= '300px' ></Skeleton>)}
                   </Link>
                    <div className="product-details">
                        <span className="product-name">{product.title}</span>
                        <span className="price-tag">Price: <span className="price">{`${product.price} sh`}</span></span>
                        <div className="product-action-btn">
                            <IconButton><Favorite/></IconButton>
                            <Button variant="outlined">ADD TO CART</Button>
                        </div>
                    </div>
                </div>
               ))}
               {}
            </div>
       </Container>
     );
}
 
export default ProductsGrid;