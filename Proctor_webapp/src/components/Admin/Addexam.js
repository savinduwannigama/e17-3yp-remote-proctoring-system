import React from 'react'
import AdminAppBar from '../AdminAppBar'
import FileUploadIcon from '@mui/icons-material/UploadFile';
import Addexamcontent from './Content/Addexamcontent'
function Addexam() {
    return (
        <div style={{color:"black"}}>
            <AdminAppBar item="Add Exam" icon = {<FileUploadIcon/>}>
            Add exam
            <Addexamcontent/>
            </AdminAppBar>
        </div>
    )
}

export default Addexam
