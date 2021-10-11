import React from 'react';
import ProctorAppBar from './ProctorAppBar';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home() {
  const history = useHistory();
  /*const rememberMe = localStorage.getItem('rememberMe') === 'true';
  const user = rememberMe ? localStorage.getItem('user') : '';*/
  //add to line 20 if necessary <Button variant="contained" type="submit"  onClick={() => history.push('/meeting')}>Join Meeting</Button>
  return (
    <div className="home">
    <ProctorAppBar >
      
      <HomeIcon/>
      Home Page
     
    </ProctorAppBar>
  
                
    </div>
  )
}

export default Home
