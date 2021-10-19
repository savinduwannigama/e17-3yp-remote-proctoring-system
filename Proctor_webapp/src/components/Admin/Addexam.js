import React from 'react'
import AdminAppBar from '../AdminAppBar'
import FileUploadIcon from '@mui/icons-material/UploadFile';
import Addexamcontent from './Content/Addexamcontent'
function Addexam() {
    return (
        <div style={{color:"black"}}>
            <AdminAppBar item="Add Exam" icon = {<FileUploadIcon/>}>
           <p style={{fontSize:"20px"}}>Follow the steps to add exams</p>
            <Addexamcontent/>
            </AdminAppBar>
        </div>
    )
}

export default Addexam
