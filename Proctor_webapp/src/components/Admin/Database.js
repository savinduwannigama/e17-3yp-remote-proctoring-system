import React from 'react'
import StorageIcon from '@mui/icons-material/Storage';
import AdminAppBar from '../AdminAppBar'
import Databasecontent from './Content/Databasecontent'
function Database() {
    return (
        <div style={{color:'black'}}>
             <AdminAppBar item="Database" icon = {<StorageIcon/>}>
           Database 
           <Databasecontent/>
           </AdminAppBar>
        </div>
    )
}

export default Database
