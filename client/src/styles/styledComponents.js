import { AppBar, Box, Drawer, IconButton, TableCell, TableRow, Toolbar, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  flexGrow: 1,
  position: 'absolute',
  zIndex: 5,
  height: '60px',
  backgroundColor: 'rgba(  0, 0, 0, 0.35 )',
  boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const StyledDrawer = styled(Drawer)({
  width: 200,
});

const Container = styled(Box)({
    width: '100%',
    height: '100%'
})

const StyledIconButton = styled(IconButton)({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
  backgroundColor: '#e3e3e3'
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export {StyledAppBar,StyledDrawer, StyledToolbar,Container,StyledIconButton, StyledTableCell,StyledTableRow}