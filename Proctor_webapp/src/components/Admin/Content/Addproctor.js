import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Adminbtn from '../../Adminbtn'
import Box from '@mui/material/Box';

function Addproctor() {
    return (
        <div style={{textAlign:"center"}}>
             To add Proctors in bulk Please upload the CSV file in correct format.
        
        <Box
      sx={{
        display: 'flex',
        
        '& > *': {
          m: 1,
        },
      }}
    >
           <ButtonGroup  orientation="vertical" sx={{display:"block",marginLeft: "auto",  marginRight: "auto"}}>
            <Adminbtn btnname="Add Proctors" value="proctors" url="proctors/multiple"/>
            </ButtonGroup>
        </Box>
        </div>
    )
}

export default Addproctor
