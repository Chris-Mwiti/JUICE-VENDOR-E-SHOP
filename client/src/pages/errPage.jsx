import {Box, Button, Typography} from '@mui/material'
import {Container} from '../styles/styledComponents'
import { Link } from 'react-router-dom';

const ErrorPage = ({resetErrorBoundary}) => {
    return ( 
        <Container display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} flexDirection={'column'}>
            <Typography variant='h4'>Oop's Something went wrong</Typography>
            {resetErrorBoundary && (<Button variant='contained' onClick={resetErrorBoundary}>Try Again !</Button>)}
        </Container>
     );
}
 
export default ErrorPage;