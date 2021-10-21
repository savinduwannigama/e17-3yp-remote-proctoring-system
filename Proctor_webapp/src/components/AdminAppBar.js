import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';

//Drawer stuff
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


//import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
//import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import StorageIcon from '@mui/icons-material/Storage';
import FileUploadIcon from '@mui/icons-material/UploadFile';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  paper: {
    background: '#006666',
    color: 'white'
  }
});
const drawerWidth = 240;
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
export default function PrimarySearchAppBar(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const styles = useStyles();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //stuff added to store details
  const rememberMe = localStorage.getItem('arememberMe') === 'true';
  const user = localStorage.getItem('adminuser') ;
 // const username = localStorage.getItem('ausername') ? localStorage.getItem('ausername') : '';
  const img = localStorage.getItem('aprofileimage') ? localStorage.getItem('aprofileimage') : '';
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      localStorage.removeItem("adminuser");
    }
    
    localStorage.removeItem("aprofileimage");
    localStorage.removeItem("atoken");
    localStorage.removeItem("Proctors")
    localStorage.removeItem("Students")
    localStorage.removeItem("Admincourses")
    localStorage.removeItem("Adminexams")
    history.push('/');
  }
  const gotoSettings=()=>{
    history.push('/admin/settings');
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
      /*keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}*/
      open={isMenuOpen}
      onClose={handleMenuClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
     <MenuItem onClick={gotoSettings}divider="true">My Account</MenuItem>
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
          
          <Box sx={{ flexGrow: 2 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
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
        classes={{ paper: styles.paper }}
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
            
            <Divider sx={{height:'1px', backgroundColor: 'white'}}/>
            <ListItem button key="Home" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/admin/home')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            
            <Divider sx={{height:'1px', backgroundColor: 'white'}}/>
            <ListItem button key="Add Exam" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/admin/addexam')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <FileUploadIcon/>
              </ListItemIcon>
              <ListItemText primary="Add Exam" />
            </ListItem>

            <Divider sx={{height:'1px', backgroundColor: 'white'}} />
            <ListItem button key="Database" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/admin/database')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <StorageIcon/>
              </ListItemIcon>
              <ListItemText primary="Database" />
            </ListItem>

            <Divider sx={{height:'1px', backgroundColor: 'white'}}/>
            <ListItem button key="Settings" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/admin/settings')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <SettingsIcon/>
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

            <Divider sx={{height:'1px', backgroundColor: 'white'}}/>
            <ListItem button key="Help" sx={{backgroundColor: '#006666' }} onClick={() => history.push('/admin/help')}>
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
