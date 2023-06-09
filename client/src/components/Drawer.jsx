import { Button, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { StyledDrawer } from "../styles/styledComponents";
import { Login, PersonAdd } from "@mui/icons-material";
const Drawer = ({navLinks, toggleDrawer, drawerOpen}) => {
    return ( 
        <StyledDrawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
                <Stack direction='column' spacing={2}>
                    {navLinks.map((link) => (
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
                    ))}
                    <Stack direction='column' spacing={3} display= 'flex'>
                        <Link to={'/Sign-up'}>
                        <Button startIcon={<PersonAdd />} variant='contained' fullWidth>Sign Up</Button>
                        </Link>
                        <Link to={'/Log-in'}>
                        <Button startIcon={<Login />} variant='contained' fullWidth>Login</Button>
                        </Link>
                    </Stack>
                </Stack>
            </List>
        </StyledDrawer>
    );
}
 
export default Drawer;