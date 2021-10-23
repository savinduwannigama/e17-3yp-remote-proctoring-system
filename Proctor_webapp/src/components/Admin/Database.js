import React from 'react'
import StorageIcon from  '@mui/icons-material/DeleteForever';
import AdminAppBar from '../AdminAppBar'
import Databasecontent from './Content/Databasecontent'
function Database() {
    return (
        <div style={{color:'black'}}>
             <AdminAppBar item="Remove Data" icon = {<StorageIcon/>}>
           Database 
           <Databasecontent/>
           </AdminAppBar>
        </div>
    )
}

export default Database
