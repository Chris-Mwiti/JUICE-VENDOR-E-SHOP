import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Container } from "../styles/styledComponents";

const MansoryImageList = () => {
    const imageItems = [
        {
            id: 1,
            url: '/Images/Products/strawberry smoo 0.png',
            alt: 'Strawberry smoothie'
        },
        {
            id: 2,
            url: '/Images/Products/mango-passion (2).jpg',
            alt: 'Strawberry smoothie'
        },
        {
            id: 3,
            url: '/Images/Products/banana-strawberry (2).jpg',
            alt: 'banana smoothie'
        },
        {
            id: 4,
            url: '/Images/Products/pineapple smoot 1.png',
            alt: 'pineapple smoothie'
        },

    ]
    return ( 
        <Container display='flex' alignItems='center' padding={2}>
            <ImageList variant="masonry" cols={2} gap={2} sx={{display: {xs: 'block', md: 'flex'}, alignItems: 'center', }}>
            {imageItems.map((item) => (
            <ImageListItem key={item.id} sx={{width: {md: '500px'}}}>
                <img
                src={`${item.url}?w=48&fit=crop&auto=format`}
                alt={item.alt}
                loading="lazy"
                />
                
            </ImageListItem>
            ))}
            </ImageList>
        </Container>
     );
}
 
export default MansoryImageList;