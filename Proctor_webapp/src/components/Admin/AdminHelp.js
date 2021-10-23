import React from 'react'
import HelpIcon from '@mui/icons-material/Help';
import AdminAppBar from '../AdminAppBar';
import Grid from '@mui/material/Grid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import image1 from './Content/HelpPage/excel1.png'
import image2 from './Content/HelpPage/excel2.png'
import image4 from './Content/HelpPage/googlesheet2.png'

const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      neutral: {
        main: '#006666',
        contrastText: '#fff',
      },
      other:{
        main: 'white'
      }
    },
});

const darkTheme = createTheme({ palette: { mode: '#006666' } });
const lightTheme = createTheme({ palette: { primary: {
    main: '#006666',
  }, } });

function AdminHelp() {
    return (
        <div>
           <AdminAppBar item="Help" icon = {<HelpIcon/>}>
           
           <Grid container spacing={2}>
      
      <Grid item xs key={1}>
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              p: 2,
              bgcolor: '#00666633',
              display: 'grid',
              justifyContent:"center",
              gap: 2,
              fontFamily:"Sansita",
              color:"#006666"
            }}
            id="excel"
          >
         
             <h3>Follow these steps to convert a Excel workbook to csv format</h3>
            <ol>
                <li>
                    Go to File &#8594; Save As and select the folder you want to save the file in.
                </li>
                
                    <img src = {image1} style={{width:"90%"}}></img>
                    <br/><br/>
                <li>
                    For the "Save as type" in the pop up window, choose "CSV (Comma Delimited)(*.csv)"
                </li>
                
                    <img src = {image2} style={{width:"90%"}}></img>
               
            </ol>
            <hr/>
         </Box>
        </ThemeProvider>
        <hr/>
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              p: 2,
              bgcolor: '#00666633',
              display: 'grid',
              justifyContent:"center",
              gap: 2,
              fontFamily:"Sansita",
              color:"#006666"
            }}
            id = "Google"
          >
         
             <h3>Follow these steps to convert a Google spreadsheet to csv format</h3>
            <ol>
                <li>
                    Go to File &#8594; Download &#8594; Comma-Separated values(.csv, current sheet)
                </li>
                
                    <img src = {image4} style={{width:"90%"}}></img>
                    <br/><br/>
                <li>
                    The CSV file will be downloaded to a folder in your device.
                    
                 </li>
               
            </ol>
            <hr/>
         </Box>
        </ThemeProvider>
        
      </Grid>
      <Grid item xs={3} key={2}>
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              p: 2,
              bgcolor: '#00666633',
              display: 'grid',
              justifyContent:"center",
              gap: 2,
              fontFamily:"Sansita",
              color:"#006666"
              
            }}
          >
         
             <h4>On this page...</h4>
            <ol style={{fontSize:"20px"}}>
                <li>
                    <a href="#excel" style={{color:"#006666"}}>How to convert Excel workbook to a csv file</a>
                </li>
                
                <br/><br/>
                <li>
                <a href="#Google" style={{color:"#006666"}}> How to convert Google spreadsheet to a csv file</a>
                </li>
                
                              
            </ol>
            <hr/>
         </Box>
        </ThemeProvider>
        <hr/>
        <ThemeProvider theme={lightTheme}>
            <Box
              sx={{
                p: 2,
                bgcolor: '#00666633',
                display: 'grid',
                textAlign:"center",
                gap: 2,
                fontFamily:"Sansita",
                color:"#006666"
              }}
            >
              <div>
            
              <h5>Need more help?</h5>
              <ThemeProvider theme={theme}>
              <div style={{
                    display: 'flex',
                    textAlign:"center",
                    alignItems: 'center',
                    justifyContent:"center",
                    flexWrap: 'wrap',
                    fontSize:"15px",
                   
                }}>
                    <MailOutlineIcon  />
                    <span>Contact us</span>
                </div>          
                        
           <Link to={{pathname:'mailto:connexa.info@gmail.com'}} target="_blank" style={{  color:"#006666"}}  >

          <p style={{fontSize:"15px"}}>connexa.info@gmail.com</p>
          </Link>
          
          
          </ThemeProvider>
              </div>
               
               
            </Box>
          </ThemeProvider>
        
       
      </Grid>
     
    
  </Grid>
          </AdminAppBar>
        </div>
    )
}

export default AdminHelp
