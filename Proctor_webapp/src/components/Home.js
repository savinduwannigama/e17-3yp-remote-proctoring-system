import React from 'react';
import ProctorAppBar from './ProctorAppBar';
import HomeIcon from '@mui/icons-material/Home';

function Home() {
  /*const rememberMe = localStorage.getItem('rememberMe') === 'true';
  const user = rememberMe ? localStorage.getItem('user') : '';*/
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
