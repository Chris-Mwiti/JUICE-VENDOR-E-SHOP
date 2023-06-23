import { memo } from "react";
import MansoryImageList from "../components/MansoryImageList";
import Services from "../components/Services";
import Carousel from "../components/carousel";
import ProductsGrid from "../components/productGrid";
import { Container } from "../styles/styledComponents";
const Home = memo(function Home({products}){
    return ( 
        <Container overflow='hidden'>
            <Carousel/>
            <Services />
            <MansoryImageList/>
            <ProductsGrid products={products} noOfItems={8}/>
        </Container>
     );
})
 
export default Home;