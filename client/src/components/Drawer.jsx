import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { StyledDrawer } from "../styles/styledComponents";
import { Login, PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";
const Drawer = ({navLinks, toggleDrawer, drawerOpen,isLoggedIn}) => {
    return ( 
        <StyledDrawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
                <Stack direction='column' spacing={2}>
                    {navLinks.map((link) => (
                        <Link to={link.path} key={link.id}>
                            <ListItem disablePadding key={link.id}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {link.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={link.title} primaryTypographyProps=
                                    {{
                                        fontSize: 18,
                                        fontWeight: '700',
                                        letterSpacing: 0,
                                        color: '#000'
                                    }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                    {isLoggedIn && isLoggedIn ? '': (
                        <Stack direction='column' spacing={3} display= 'flex'>
                            <Link to={'/sign-up'}>
                            <Button startIcon={<PersonAdd />} variant='contained' fullWidth>Sign Up</Button>
                            </Link>
                            <Link to={'/log-in'}>
                            <Button startIcon={<Login />} variant='contained' fullWidth>Login</Button>
                            </Link>
                        </Stack>
                    )}
                    
                </Stack>
            </List>
        </StyledDrawer>
    );
}
 
export default Drawer;