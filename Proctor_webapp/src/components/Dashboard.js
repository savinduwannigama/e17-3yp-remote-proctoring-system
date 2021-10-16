import React from 'react'
import ProctorAppBar from './ProctorAppBar'
import DashboardIcon from '@mui/icons-material/Dashboard';
import axios from "axios";

function Dashboard() {
   
    return (
        <div style={{color:"black"}}>
            <ProctorAppBar item="Dashboard" icon = {<DashboardIcon/>}>
                
                
            </ProctorAppBar>
           
        </div>
    )
}

export default Dashboard
