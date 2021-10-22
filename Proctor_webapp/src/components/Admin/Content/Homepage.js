import * as React from 'react';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import path from '../../jsonfiles/path.json'
import MailOutlineIcon from '@mui/icons-material/MailOutline';

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

export default function HomePage() {
    const name = localStorage.getItem("adminusername")? localStorage.getItem("adminusername"):''
  return (
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
            >
           
               <h2>Hello {name}!</h2>
               <p style={{color:"red", fontSize:"18px",paddingBottom:"0px"}}>Please read the guidelines before proceeding to add/remove data from the system.
                        
                        </p>
               <p style={{fontSize:"15px",paddingTop:"0px"}}>Given below are the general guidelines to add and remove students, proctors, courses and examinations.
               <br/><br/>
               <h3>How to add students,proctors, courses and examinations?</h3>
               <br/>
               <ol>
                   <li>
                       Navigate to "Add to database" tab in the left side navigation bar.
                   </li>
                   <br/>
                   <li>
                       Follow the steps given from left to right to add an examination. On the process, you can add students, proctors and courses as well.
                   </li>
                   <br/>
                   <li>
                       Check if the proctors to be added are already in the system.
                       <ul>
                        <li>
                        If they are in the system, move on to the next step.
                        </li>
                        <li>
                        If not, you can either upload the list as a .CSV file or add the proctors one by one.
                      
                            
                        </li>
                        </ul>
                    </li>
                   <br/>
                   <li>
                       Check if the students to be added are already in the system.
                       <ul>
                        <li>
                        If they are in the system, move on to the next step.
                        </li>
                        <li>
                        If not, you can either upload the list as a .CSV file or add the students one by one.   </li>
                      </ul>                    
                       
                       
                   </li>
                   <br/>
                   <li>
                       Check if the courses to be added are already in the system. 
                       <ul>
                        <li>
                        If they are in the system, move on to the next step.
                        </li>
                        <li>
                        If not, you can upload the list as a
                       .CSV file.
                       </li>
                      </ul>  
                   </li>
                   <br/>
                   <li>
                       Check if the exam to be scheduled is already in the system. 
                       
                       <p style={{color:"red"}}>Please make sure that the course relevant to the examination is already in the system before scheduling the examination.
                        
                        </p>
                       <ul>
                        <li>
                        If the exams are in the system you don't have to reupload it.
                        </li>
                        <li>
                        If not, upload the details of the examination as a .CSV file.
             
                       </li>
                      </ul>  
                       
                      
                   </li>

               </ol>
               
               
               </p>
               
              <br/>
               
               
            </Box>
          </ThemeProvider>
          
        </Grid>
        <Grid item xs={4} key={2}>
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
              <div>
              <br/>
              <h3>Templates to add data</h3>
              <ThemeProvider theme={theme}>
              <br/>
          <Button color="neutral" variant="contained" component="span" size="large" >
          <Link to={{pathname:path[0]['student'] }} target="_blank" style={{ textDecoration: 'none', color:"white"}}>
          Template to add students
          </Link>
          
          </Button>
              <br/><br/>
          <Button color="neutral" variant="contained" component="span" size="large" >
          <Link to={{pathname:path[0]['proctor'] }} target="_blank" style={{ textDecoration: 'none', color:"white"}}>
          Template to add protctos
          </Link>
          </Button>
          <br/><br/>
          <Button color="neutral" variant="contained" component="span" size="large" >
          <Link to={{pathname:path[0]['course'] }} target="_blank" style={{ textDecoration: 'none', color:"white"}}>
          Template to add courses
          </Link>
          </Button>
          <br/><br/>
          <div style={{paddingLeft:"10px"}}>
          <Button color="neutral" variant="contained" component="span" size="large"  >
          <Link to={{pathname:path[0]['exam'] }} target="_blank" style={{ textDecoration: 'none', color:"white"}}>
          Template to add exams
          </Link>
          </Button>
          </div>
          </ThemeProvider>
         <br/>
              </div>
               
               
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
            
              <h5>How to convert the excel sheet to a CSV file</h5>
              <ThemeProvider theme={theme}>
             
                  
          <Link to='/admin/help' style={{  color:"#006666"}}  >

         <p style={{fontSize:"15px"}}> Check the help page</p>
          </Link>
        
          
          
          </ThemeProvider>
              </div>
               
               
            </Box>
          </ThemeProvider>
          <hr />
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
            
              <h5>Need to add an administrator?</h5>
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
  );
}