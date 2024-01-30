import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet, Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const pages = ['SHOP', 'ABOUT', 'OUR IMPACT'];

function Header() {

    let token = Cookies.get('token') || localStorage.getItem("token")
  
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

   const Logout=()=>{
    Cookies.remove('token')
    navigate('/signUp')
   }


    //    for dark mode 
    const theme = createTheme({

        palette: {
            // mode: 'dark',
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" sx={{ backgroundColor: "#DCDCDC" }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
                            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: '#5F4F99',
                                    textDecoration: 'none',
                                }}
                            >
                                Bite
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                {/* mobile menu */}
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    // onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page}
                                        // onClick={handleCloseNavMenu}
                                        >
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>

                            </Box>
                            {/* mobiel logo */}
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Bite
                            </Typography>

                            {/* window menu */}
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>


                                <Link to="/shop" style={{ textDecoration: "none" }} > <Button
                                    sx={{ my: 2, color: '#5F4F99', display: 'block' }}  >
                                    SHOP
                                </Button></Link>
                                <Link to="/about" style={{ textDecoration: "none" }}> <Button sx={{ my: 2, color: '#5F4F99', display: 'block' }}  >
                                    ABOUT
                                </Button></Link>
                                <Link to="/ourImpact" style={{ textDecoration: "none" }}><Button
                                    sx={{ my: 2, color: '#5F4F99', display: 'block' }}  >
                                    OUR IMPACT
                                </Button></Link>
                                <Outlet />

                            </Box>

                            <Box sx={{ m: 2 }}>

                                {!token ? <p onClick={() => { navigate('/signUp') }}><AccountCircleIcon sx={{ color: "#5F4F74" }} /></p> : null}
                                {/* <Link to="/" >
                                    Hi 
                                </Link> */}
                                {token ? <Button variant="outlined" style={{ color: "#5F4F74", borderColor: "#5F4F74" }}
                                    endIcon={<SendIcon />}
                                    onClick={() => {
                                        console.log("log");
                                        Logout ()
                                    }}> 
                                </Button> : null}

                            </Box>
                            <Box sx={{ m: 0.4 }}>
                                <AddShoppingCartIcon sx={{ color: "#5F4F74" }} />
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <div ></div>
            </ThemeProvider>

        </>
    );
}
export default Header;