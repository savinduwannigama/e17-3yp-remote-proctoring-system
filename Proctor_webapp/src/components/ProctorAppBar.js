import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UpcomingIcon from '@mui/icons-material/CalendarToday';
//import UpcomingIcon from '@mui/icons-material/Upcoming';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: '#006666',
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
      backgroundColor: '#006666'
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
  //bgcolor: '#006666'
}));

export default function PersistentDrawerLeft(props) {
  const rememberMe = localStorage.getItem('prememberMe') === 'true';
  const user =  localStorage.getItem('username') ;
 // const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
  const img = localStorage.getItem('profileimage') ? localStorage.getItem('profileimage') : '';
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout =()=>{
    if(!rememberMe){
      localStorage.removeItem("user");

    }
    
    localStorage.removeItem("profileimage");
    localStorage.removeItem("ptoken");
    history.push('/');
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      /*anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}*/
      id="basic-menu"
     // keepMounted
     /* transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}*/
      open={isMenuOpen}
      onClose={handleMenuClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {/*<MenuItem onClick={handleMenuClose} divider="true"><Avatar src={img} /> {username}</MenuItem>*/}
      <MenuItem onClick={handleMenuClose}divider="true">My Account</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#006666' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 3, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {props.item}
          {props.icon}
          
          {/*<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>*/}

          <Box sx={{ flexGrow: 2 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/*<IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
  </IconButton>*/}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={img} />
              <div style={{paddingLeft:"10px",  fontSize:"15px",fontFamily:"Sansita"}}>{user}</div>
              
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer
        sx={{
          
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
       
      >
        <DrawerHeader sx={{ backgroundColor: '#006666' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <CloseIcon sx={{color: 'white'}}/> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        
        <List sx={{ backgroundColor: '#006666',color: 'white'}}>
            
            <Divider sx={{height:'5px', backgroundColor: 'white'}}/>
            <ListItem button key="Home" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/home')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            
            <Divider sx={{height:'5px', backgroundColor: 'white'}}/>
            <ListItem button key="Dashboard" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/dashboard')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <Divider sx={{height:'5px', backgroundColor: 'white'}} />
            <ListItem button key="Upcoming exams" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/schedule')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <UpcomingIcon/>
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItem>

            <Divider sx={{height:'5px',backgroundColor: 'white'}}/>
            <ListItem button key="Courses" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/courses')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <SchoolIcon/>
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItem>

            <Divider sx={{height:'5px', backgroundColor: 'white'}}/>
            <ListItem button key="Settings" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/settings')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <SettingsIcon/>
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

            <Divider sx={{height:'5px', backgroundColor: 'white'}}/>
            <ListItem button key="Help" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/help')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <HelpIcon/>
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>

            
          
        </List>
        
       
      </Drawer>
      <Main open={open} sx={{color:"black"}}>
        <DrawerHeader />
        {/*Content starts here if u wanna load content dynamically it should be props.children*/}
        {props.children}
      </Main>
    </Box>
  );
}