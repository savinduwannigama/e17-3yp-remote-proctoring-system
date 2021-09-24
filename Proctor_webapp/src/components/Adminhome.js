import React from 'react'
import Adminbtn from './Adminbtn'
import ButtonGroup from '@mui/material/ButtonGroup';
import "../css/Admin.css"
import NavBar from './PrimarySearchAppBar';
import Box from '@mui/material/Box';
function adminhome() {
    return (
       
        <div className="Main">
            <NavBar></NavBar>
            
            <h3>Please upload the relevant files in CSV format.</h3>
            <Box  sx={{ justifyContent:"center", display: 'flex','& > *': { m: 1,}}} >
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add MasterSheet" value="mastersheet" />
            
            </ButtonGroup>
            
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add students" value="student" />
            
            </ButtonGroup>
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add Proctors" value="proctor"/>
            </ButtonGroup>
            </Box>
            
        </div>
        
    )
}

export default adminhome
