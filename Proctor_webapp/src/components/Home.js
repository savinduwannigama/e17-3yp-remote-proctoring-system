import React from 'react';
import ProctorAppBar from './ProctorAppBar';
import HomeIcon from '@mui/icons-material/Home';
import Calendar from './Calendar';
function Home() {
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
