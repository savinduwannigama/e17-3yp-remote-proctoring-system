import React from 'react'
import AdminAppBar from '../AdminAppBar'
import SettingsIcon from '@mui/icons-material/Settings';

function AdminSettings() {
    return (
        <div>
            <AdminAppBar item="Settings" icon={<SettingsIcon/>}>
            adminsettings
           </AdminAppBar>
            
        </div>
    )
}

export default AdminSettings
