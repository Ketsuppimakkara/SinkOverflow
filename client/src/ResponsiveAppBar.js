import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CountertopsIcon from '@mui/icons-material/Countertops';
import {Link} from "react-router-dom";
import jwt_decode from 'jwt-decode';



const pages = ['All questions', 'About'];
const loginOptions = ['Login', 'Register'];

function handleLogout(jwt, setJwt){
  setJwt(null);
  localStorage.clear()
  window.location.replace("/")
  return;
}

function handleProfile(jwt){
  console.log(jwt_decode(jwt).userId)
  console.log("not implemented yet")
  return;
}

function ResponsiveAppBar({jwt, setJwt}) {
  if(jwt){
    if((jwt_decode(jwt).exp)<Math.ceil(new Date().getTime()/1000)){
      console.log("expired");
      setJwt(null)
      window.localStorage.clear()
    }
  }


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userName] = React.useState("")
  const [profileIcon, setProfileIcon] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleCloseLoginMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    
  };
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters >
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, '& .MuiPaper-root': {backgroundColor:'primary.background'} }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="secondary"
                >
                  <MenuIcon />
                </IconButton>
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
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiPaper-root': {backgroundColor:'primary.background'},
                    textDecoration: 'none'
                  }}
                >
                  <Link style={{textDecoration: 'none'}} to={"/"}>
                    <MenuItem key="All questions">
                      <Typography sx={{fontSize: "0.8rem"}}  textAlign="center">{"All questions"}</Typography>
                    </MenuItem>
                    </Link>
                    <MenuItem key="About" onClick={handleCloseNavMenu}>
                      <Typography sx={{fontSize: "0.8rem"}} textAlign="center">{"About"}</Typography>
                    </MenuItem>
                </Menu>
              </Box>

            <CountertopsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize:"1.6rem" }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontSize: "0.8rem",
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  lineHeight: 0.8,
                  letterSpacing: '.01rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Sink<br></br>Overflow
              </Typography>

              <Box sx={{fontSize:"0.6rem", display: { xs: 'flex', md: 'none' } }}>{jwt? "Welcome, "+jwt_decode(jwt).username:
                <>{loginOptions.map((option) => (
                  <Link key={option} to={"/"+option+".html"} style={{textDecoration: 'none'}}  >
                    <Button
                      onClick={handleCloseLoginMenu}
                      sx={{ my: 2,  color: 'primary.text', display: 'block', fontSize: "0.6rem" }}
                    >
                      {option}
                    </Button>
                  </Link>
                ))}
              </>}
              </Box>

              {/* BELOW IS THE DESKTOP VERSION */}

              <CountertopsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 , fontSize :"1.6rem"}} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                SinkOverflow
              </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page} to={"/"} style={{textDecoration: 'none'}}> 
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'primary.text', display: 'block', fontSize: "1.0rem"}}
                  >
                    {page}
                  </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, fontSize: "0.9rem", }}>{jwt? "Welcome, "+jwt_decode(jwt).username:
            <>{loginOptions.map((option) => (
              <Link key={option} to={"/"+option+".html"} style={{textDecoration: 'none'}}  >
                <Button
                  onClick={handleCloseLoginMenu}
                  sx={{ my: 2, color: 'primary.text', display: 'block', fontSize: "0.9rem" }}
                >
                  {option}
                </Button>
              </Link>
            ))}
          </>}
          </Box>
          <Box sx={{ flexGrow: 0 }}>{jwt? <><Tooltip title="Open settings">                                       
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Longnose dog" src="/public/images/profile.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', '& .MuiPaper-root': {backgroundColor:'primary.background'}}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
            >
                <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={()=>handleProfile(jwt)} sx={{fontSize: "0.6rem"}}>{"Profile"}</Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={()=>handleLogout(jwt, setJwt)} sx={{fontSize: "0.6rem"}}>{"Logout"}</Typography>
                </MenuItem>
            </Menu> </> :""}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;