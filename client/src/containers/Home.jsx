import MansoryImageList from "../components/MansoryImageList";
import Services from "../components/Services";
import Carousel from "../components/carousel";
import ProductsGrid from "../components/productGrid";
import { Container } from "../styles/styledComponents";
const Home = ({products}) => {
    return ( 
        <Container overflow='hidden'>
            <Carousel/>
            <Services />
            <MansoryImageList/>
            <ProductsGrid products={products}/>
        </Container>
     );
}
 
export default Home;