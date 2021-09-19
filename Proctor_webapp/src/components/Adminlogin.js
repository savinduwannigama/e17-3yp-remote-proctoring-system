import React from 'react'
import Adminbtn from './Adminbtn'
import ButtonGroup from '@mui/material/ButtonGroup';
import "../css/Admin.css"
function Adminlogin() {
    return (
        <div className="Main">
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

export default Adminlogin
