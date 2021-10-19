import React from 'react'
import StorageIcon from '@mui/icons-material/Storage';
import AdminAppBar from '../AdminAppBar'
function Database() {
    return (
        <div style={{color:'black'}}>
             <AdminAppBar item="Database" icon = {<StorageIcon/>}>
           Database 
           </AdminAppBar>
        </div>
    )
}

export default Database
