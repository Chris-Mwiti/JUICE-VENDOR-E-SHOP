import React, { useState } from 'react';
import {
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Stack,
  Badge,
} from '@mui/material';
import {Home, Info, Login,Menu,PersonAdd, ShoppingCart, Store} from '@mui/icons-material';
import { StyledAppBar, StyledToolbar } from '../styles/styledComponents';
import Drawer from './Drawer';
import { Link } from 'react-router-dom';


const Navbar = ({cartItems}) => {
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
            <Stack direction='row' spacing={2}>
                {navLinks.map((link) => (
                    <Link to={`/${link.path}`} key={link.id}>
                      <ListItem disablePadding key={link.id}>
                        {/* Displays Only Cart Icon */}
                        {link.title == 'Cart' ? <ListItemIcon>
                            {link.icon}
                        </ListItemIcon>: ''}
                        {/* Displays nav links except for cart option */}
                        {link.title == 'Cart' ? '': 
                        <ListItemButton>
                            <ListItemText primary={link.title} primaryTypographyProps=
                            {{
                                fontSize: 18,
                                fontWeight: '700',
                                letterSpacing: 0,
                                color: '#fff'
                            }} />
                        </ListItemButton>
                        }
                      </ListItem>
                    </Link>
                ))}
            </Stack>
        </List>

        {/* App Title */}
        <IconButton>
            <Link to={'/Home'}>
              <Typography variant='h3' component='h1' fontSize='29px' color='primary.main'>JUICE HUB</Typography>
            </Link>
        </IconButton>

        {/* Register Options Button */}
        <Stack direction='row' spacing={3} display={{xs: 'none', md: 'flex'}}>
            <Link to={'/sign-up'}>
              <Button startIcon={<PersonAdd />} variant='outlined'>Sign Up</Button>
            </Link>
            <Link to={'/log-in'}>
              <Button startIcon={<Login />} variant='outlined'>Login</Button>
            </Link>
        </Stack>

        {/* Hamburger Icon */}
        <IconButton size='large' sx={{color: '#fff', display: {xs: 'block', md: 'none'}}} onClick={() => setDrawerOpen(true)}>
            <Menu fontSize='inherit' />
        </IconButton>

        {/* Drawer Component */}
        <Drawer navLinks={navLinks} toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
        
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
