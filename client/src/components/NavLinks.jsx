import { ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const NavLinks = ({navLinks}) => {
    return ( 
          <Stack direction='row' spacing={2}>
                {navLinks && navLinks.map((link) => (
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
     );
}
 
export default NavLinks;