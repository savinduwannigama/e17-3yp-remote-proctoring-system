import React from 'react'
import ProctorAppBar from './ProctorAppBar'
import HelpIcon from '@mui/icons-material/Help';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import { fontSize } from '@mui/system';
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
const lightTheme = createTheme({ palette: { primary: {
    main: '#006666',
  }, } });
function Help() {
    return (
        <div style={{color:"black"}}>
           <ProctorAppBar icon={<HelpIcon/>} item="Help">
           <Grid container spacing={2}>
           <Grid item xs key={1}>
           <ThemeProvider theme={lightTheme}>
            <Box
              sx={{
                p: 2,
                bgcolor: '#00666633',
                display: 'grid',
               
                gap: 2,
                fontFamily:"Sansita",
                color:"#006666",
                fontSize:"15px"
              }}
            >
              <div>
            
              <h4>Here are answers for some frequently asked questions.</h4>
              <ThemeProvider theme={theme}>
              <div style={{
                    display: 'flex',
                    textAlign:"left",
                    alignItems: 'left',
                    justifyContent:"left",
                    flexWrap: 'wrap',
                    fontSize:"10px",
                   
                }}>
                   
                </div>          
                <ol>
                   <li>
                       How can we register to the system?
                       <ul>
                           <li>
                       The administrator of your institution is responsible for authorizing the students and proctors for his/her insititution.
                         Therefore, to register to the system, please ask your administrator to authorize your email address.
                            </li>
                           </ul>
                   </li>
                   <br/>
                   <li>
                    Can we change the email address we use to sign in as we wish?
                    <ul>
                        <li>
                      You don't have permission to update your email address. If you want to change your email address, please contact your administrator.
                        </li>
                    </ul>
                    </li>
                   <br/>
                   <li>
                       I cannot see an examination I'm assigned to invigilate.
                       <ul>
                        <li>
                        The administrator is responsible for scheduling all the upcoming examinations. Please contact the administrator.
                        </li>
                       
                        </ul>
                    </li>
                   <br/>
                   <li>
                      I cannot see the link to the examination room.
                       <ul>
                        <li>
                        The link to the examination room will be available 2 hours prior to the scheduled time.
                        <br/> 
                        If you are unable to see the link at that time, please contact us at &nbsp;
                        <Link to={{pathname:'mailto:connexa.info@gmail.com'}} target="_blank" style={{  color:"#006666"}}  >

                        connexa.info@gmail.com
                        </Link>
                        </li>
                   </ul>                    
                       
                       
                   </li>
                   <br/>
                

               </ol>
        
          
          
          
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
            
              <h5>Cannot see what you are looking for?</h5>
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
           </ProctorAppBar>
        </div>
    )
}

export default Help