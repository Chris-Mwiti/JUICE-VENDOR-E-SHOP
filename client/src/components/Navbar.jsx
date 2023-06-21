import { useState } from 'react';
import {
  IconButton,
  Typography,
  Button,
  List,
  Stack,
  Badge,
  Avatar,
} from '@mui/material';
import {Home, Info, Login,Menu,PersonAdd, ShoppingCart, Store} from '@mui/icons-material';
import { StyledAppBar, StyledToolbar } from '../styles/styledComponents';
import Drawer from './Drawer';
import { Link } from 'react-router-dom';
import { deepOrange } from '@mui/material/colors';
import NavLinks from './NavLinks';


const Navbar = ({cartItems,isLoggedIn}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const navLinks = [
    {
        id: 1,
        icon: <Home />,
        title: 'Home',
        path: ''
    },
    {
        id: 2,
        icon: <Info />,
        title: 'About',
        path: 'about'
    },
    {
        id: 3,
        icon: <Store />,
        title: 'Shop',
        path: 'shop'
    },
    {
        id: 4,
        icon: 
        <IconButton>
            <Badge badgeContent={cartItems && cartItems} color='primary'>
                <ShoppingCart/>
            </Badge>
        </IconButton>,
        title: 'Cart',
        path: 'cart'
    }
  ]



  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>

        {/* NavLinks */}
        <List sx={{display: {xs: 'none', md: 'block'}}}>
          <NavLinks navLinks={navLinks} />
        </List>

        {/* App Title */}
        <IconButton>
            <Link to={'/Home'}>
              <Typography variant='h3' component='h1' fontSize='29px' color='primary.main'>JUICE HUB</Typography>
            </Link>
        </IconButton>

        {/* Register Options Button */}
        {isLoggedIn && isLoggedIn ? (<Avatar sx={{bgcolor: deepOrange[500], display: {xs: 'none', md: 'flex'}}}>U</Avatar>) : 
        (
          <Stack direction='row' spacing={3} display={{xs: 'none', md: 'flex'}}>
              <Link to={'/sign-up'}>
                <Button startIcon={<PersonAdd />} variant='outlined'>Sign Up</Button>
              </Link>
              <Link to={'/log-in'}>
                <Button startIcon={<Login />} variant='outlined'>Login</Button>
              </Link>
          </Stack>)
        }

        {/* Hamburger Icon  && User Avatar on small devices*/}
        <Stack direction={'flex'} spacing={2} justifyContent={'center'} alignItems={'center'}>
          {isLoggedIn && isLoggedIn ? (<Avatar sx={{bgcolor: deepOrange[500], display:{xs: 'flex', md: 'none'}}}>U</Avatar>) : ''}
          <IconButton size='large' sx={{color: '#fff', display: {xs: 'block', md: 'none'}}} onClick={() => setDrawerOpen(true)}>
            <Menu fontSize='inherit' />
          </IconButton>
        </Stack>
        

        {/* Drawer Component */}
        <Drawer navLinks={navLinks} toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} isLoggedIn={isLoggedIn}/>
        
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
