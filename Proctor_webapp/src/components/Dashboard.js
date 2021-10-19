import React from 'react'
import ProctorAppBar from './ProctorAppBar'
import DashboardIcon from '@mui/icons-material/Dashboard';
import axios from "axios";
import Dashcontent from './Content/Dashcontent';

function Dashboard() {
  
  // recent = localStorage.getItem("most recent exam").replace(' room B', '');
  // recent = localStorage.getItem("most recent exam").replace(' room C', '');
    
   return (
        <div style={{color:"black"}}>
            <ProctorAppBar item="Dashboard" icon = {<DashboardIcon/>}>
               
                <Dashcontent/>
            </ProctorAppBar>
           
        </div>
    )
}

export default Dashboard
