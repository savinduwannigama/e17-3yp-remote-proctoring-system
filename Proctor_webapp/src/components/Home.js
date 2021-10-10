import React from 'react';
import ProctorAppBar from './ProctorAppBar';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
function Home() {
  const history = useHistory();
  /*const rememberMe = localStorage.getItem('rememberMe') === 'true';
  const user = rememberMe ? localStorage.getItem('user') : '';*/
  return (
    <div className="home">
    <ProctorAppBar >
      
      <HomeIcon/>
      Home Page
     
    </ProctorAppBar>
    <Button variant="contained" type="submit"  onClick={() => history.push('/meeting')}>Join Meeting</Button>
                
    </div>
  )
}

export default Home
