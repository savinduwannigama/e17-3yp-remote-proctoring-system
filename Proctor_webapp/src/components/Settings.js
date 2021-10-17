import React from 'react'
import ProctorAppBar from './ProctorAppBar'
import Updatedetails from './Content/Updatedetails'
import SettingsIcon from '@mui/icons-material/Settings';
function Settings() {
    return (
        <div style={{color:"black"}}>
           <ProctorAppBar item="Settings" icon = {<SettingsIcon/>}>
          
           <Updatedetails/>
           </ProctorAppBar>
        </div>
    )
}

export default Settings