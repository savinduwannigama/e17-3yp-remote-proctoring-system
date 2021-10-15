import React from 'react'
import Adminbtn from './Adminbtn'
import ButtonGroup from '@mui/material/ButtonGroup';
import "../css/Admin.css"
import NavBar from './AdminAppBar';
import Box from '@mui/material/Box';
import axios from 'axios';
function adminhome() {
    axios.get("http://143.244.139.140:5000/api/admin/courses/all").then(resp=>{
        console.log(resp.data)
    })
    axios.get("http://143.244.139.140:5000/api/admin/proctors/all").then(resp=>{
        console.log(resp.data)
    })
    return (
       
        <div className="admin-main">
            <NavBar></NavBar>
            
            <h3>Please upload the relevant files in CSV format.</h3>
            <Box  sx={{ justifyContent:"center", display: 'flex','& > *': { m: 1,}}} >
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add MasterSheet" value="mastersheet" url="exams/mastersheet" />
            
            </ButtonGroup>
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add courses" value="courses" url="courses/mastersheet"/>
            
            </ButtonGroup>
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add students" value="students" url="students/multiple"/>
            
            </ButtonGroup>
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add Proctors" value="proctors" url="proctors/multiple"/>
            </ButtonGroup>
            </Box>
            
        </div>
        
    )
}

export default adminhome
