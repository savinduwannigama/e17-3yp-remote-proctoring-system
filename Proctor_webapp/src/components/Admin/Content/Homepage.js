import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import path from '../../jsonfiles/path.json'
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
                       Check if the proctors to be added are already in the system. If not, you can either upload the list as a
                       .CSV file or add the proctors one by one.
                   </li>
                   <br/>
                   <li>
                       Check if the students to be added are already in the system. If not, you can either upload the list as a
                       .CSV file or add the students one by one.
                   </li>
                   <br/>
                   <li>
                       Check if the courses to be added are already in the system. If not, you can upload the list as a
                       .CSV file.
                   </li>
                   <br/>
                   <li>
                       Check if the exam to be scheduled is already in the system. If not, upload the details of the examination as a .CSV file.
                        <p style={{color:"red"}}>Please make sure that the course relevant to the examination is already in the system before scheduling the examination.
                        
                        </p>
                   </li>

               </ol>
               
               
               </p>
               
              
               
               
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
              <h3>Templates to add data</h3>
              <ThemeProvider theme={theme}>
                  
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
              <h3>How to convert the excel sheet to a CSV file?</h3>
              <ThemeProvider theme={theme}>
                  
          <Link to='/admin/help' style={{  color:"#006666"}}  >
         <p style={{fontSize:"20px"}}> Check the help page</p>
          </Link>
        
          
          
          </ThemeProvider>
              </div>
               
               
            </Box>
          </ThemeProvider>
        </Grid>
      
    </Grid>
  );
}