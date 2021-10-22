import React from 'react'
import AdminAppBar from '../AdminAppBar'
import SettingsIcon from '@mui/icons-material/Settings';
import Updateprofile from './Content/Updateprofile';

function AdminSettings() {
    return (
        <div>
            <AdminAppBar item="Settings" icon={<SettingsIcon/>}>
            
            <Updateprofile/>
           </AdminAppBar>
            
        </div>
    )
}

export default AdminSettings
