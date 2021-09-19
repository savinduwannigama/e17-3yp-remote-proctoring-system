import React from 'react'
import Adminbtn from './Adminbtn'
import ButtonGroup from '@mui/material/ButtonGroup';
import "../css/Admin.css"
import NavBar from './PrimarySearchAppBar';
function adminhome() {
    return (

        <div className="Main">
            <NavBar></NavBar>
            
            <h3>Please upload the relevant files in CSV format.</h3>
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Upload Mastersheet"/>
            </ButtonGroup>
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add students"/>
            </ButtonGroup>
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add Proctors"/>
            </ButtonGroup>
        
        </div>
    )
}

export default adminhome
