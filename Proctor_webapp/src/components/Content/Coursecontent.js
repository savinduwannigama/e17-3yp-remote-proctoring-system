import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
//import { CardActionArea } from '@mui/material';
//import Loader from "../Content/Loader"
import {Link} from 'react-router-dom';
//import ProctorAppBar from '../ProctorAppBar'

function Coursecontent() {
   
    let chiefcourses= localStorage.getItem("chief_invig courses")?localStorage.getItem("chief_invig courses"):'';
    let invigcourses = localStorage.getItem("invig courses")?localStorage.getItem("invig courses"):''
    chiefcourses =chiefcourses?  JSON.parse(chiefcourses):''
    invigcourses =invigcourses? JSON.parse(invigcourses):''
  //  console.log(invigcourses.invigilating_courses)
    if(chiefcourses.chief_invigilating_courses||invigcourses.invigilating_courses){
        const trail = chiefcourses.chief_invigilating_courses.map(t=>{
            return(
                <Card sx={{width:"20%",height:"30vh",color:"black",marginBottom:"40px", backgroundColor:"#00666633",fontSize:"15px",borderRadius:"32px", display:"inline",margin:"auto"}}>
                    
                      <Link to={{pathname:`/courses/${t}`,state:{duty: 'chief_invigilator'}}}  style={{ textDecoration: 'none', color:"#006666"}}> 
                      <span className="card" style={{"display": "inline-block", width:"100%",height:"30vh",paddingTop:"5%"}}>
                
                      <h3 style={{textAlign:"center",marginTop:"20%",color:"#035252"}}>{t}</h3>     
                     </span>
                      </Link> 
                </Card>
            )
        })

        const invig = invigcourses.invigilating_courses.map(t=>{
            return(
                <Card sx={{width:"20%",height:"30vh",color:"black",marginBottom:"40px", backgroundColor:"#00666633",fontSize:"15px",borderRadius:"32px", display:"inline",margin:"auto"}}>
                
                <Link to={{pathname:`/courses/${t}`,state:{duty: 'invigilator'}}} style={{ textDecoration: 'none', color:"#006666"}}>
                <span className="card" style={{"display": "inline-block",width:"100%",height:"30vh",paddingTop:"5%"}}>
                   
                             <h3 style={{textAlign:"center",marginTop:"20%",color:"#035252"}}>{t}</h3>     
                     
                
                </span>
                 </Link>
                 </Card>
            )
        })

        return(
      
            <Box sx={{ flexGrow:1 }}>
                <h3>Chief Invigilating courses</h3>
            <Grid container rowSpacing={6} sx={{paddingTop:"5%"}} >
              
                {trail}
                 
              </Grid>
              <h3>Invigilating courses</h3>
              <Grid container rowSpacing={6} sx={{paddingTop:"5%"}} >
              
                {invig}
                 
              </Grid>
              
          </Box>
          )
    }
    
    else{
        return(
          <div style={{textAlign:"center", color:"black"}}>
            You don't have any courses with scheduled examinations
          </div>
        )
      }
}

export default Coursecontent
