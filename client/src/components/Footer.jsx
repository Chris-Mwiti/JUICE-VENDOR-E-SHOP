import React from 'react'
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { Container, StyledIconButton } from '../styles/styledComponents'
import {Twitter,Facebook,Instagram, LocationOn, Phone, Email} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const links = ["Home", "About", "Contact", "Shop"]
    const helpLinks = ["Shipping Information", "Returns and Exchange", "Terms & Condition", "Privacy Policy"]
  return (
    <Container sx={{minHeight: '400px', display: 'flex',flexDirection: {xs: 'column', md: 'row'}, justifyContent: {xs: 'flex-start', md: 'space-around'}, paddingY: {xs: '10px', md: '80px'}, paddingX: {xs: '10px', md: 0}, gap: {xs: '1.5rem'}}}>
        <Stack direction='column' spacing={3} maxWidth='400px'>
            <IconButton sx={{width: '180px', height: '50px', padding: 0}}>
                <Typography variant='h3' component='h1' fontSize='29px' color='primary.main'>JUICE HUB</Typography>
            </IconButton>

            <Typography variant='body1' component='span' textAlign='justify'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</Typography>

            <Stack direction='row' spacing={2}>
                <StyledIconButton size='large'>
                    <Twitter fontSize='inherit'/>
                </StyledIconButton>

                <StyledIconButton size='large'>
                    <Facebook fontSize='inherit'/>
                </StyledIconButton>

                <StyledIconButton size='large'>
                    <Instagram fontSize='inherit'/>
                </StyledIconButton>
            </Stack>
        </Stack>

        <Stack direction='column' spacing={1} alignItems={{xs: 'flex-start', md: 'center'}} justifyContent={{xs: 'center', md: 'stretch'}}>
            <Typography variant='h6' component='h4'>Menu</Typography>

            <List>
                {links.map((link) => (
                    <Link to={`/${link}`} key={link.id}>
                    <ListItem key={link} disablePadding>
                        <ListItemButton sx={{paddingX: '0', margin: 0}}>
                            <ListItemText primary={link}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    </Link>
                ))}
            </List>
        </Stack>


        <Stack direction='column' spacing={1} alignItems={{xs: 'flex-start', md: 'center'}} justifyContent={{xs: 'center', md: 'flex-start'}}>
            <Typography variant='h6' component='h4'>Help</Typography>

            <List>
                {helpLinks.map((link) => (
                <ListItem key={link} disablePadding>
                    <ListItemButton sx={{paddingX: '0', margin: 0}}>
                        <ListItemText primary={link}></ListItemText>
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Stack>

        <Stack direction='column' spacing={1} alignItems={{xs: 'flex-start', md: 'center'}} justifyContent={{xs: 'center', md: 'flex-start'}}>
            <Typography variant='h6' component='h4'>Contact Us</Typography>

            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <LocationOn />
                </ListItemIcon>
                <ListItemText primary="Nkubu Opposite Sayen SuperMarket" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Phone />
                    </ListItemIcon>
                    <ListItemText primary="+25471234567" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Email />
                    </ListItemIcon>
                    <ListItemText primary="chris@gmail.com" />
                </ListItemButton>
            </ListItem>
        </Stack>
    </Container>
  )
}
