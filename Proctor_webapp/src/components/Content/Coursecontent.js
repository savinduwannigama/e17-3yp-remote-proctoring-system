import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import Loader from "../Content/Loader"
function Coursecontent() {
    const handleclick =course=>{
        console.log("card clicked",course)
    }
    let chiefcourses= localStorage.getItem("chief_invig courses")
    let invigcourses = localStorage.getItem("invig courses")
    chiefcourses = JSON.parse(chiefcourses)
    invigcourses = JSON.parse(invigcourses)
    console.log(invigcourses.invigilating_courses)
    if(chiefcourses.chief_invigilating_courses||invigcourses.invigilating_courses){
        const trail = chiefcourses.chief_invigilating_courses.map(t=>{
            return(
                <Card sx={{width:"20%",height:"30vh",color:"black",marginBottom:"40px", backgroundColor:"#00666633",padding:"15px",fontSize:"15px",borderRadius:"32px", display:"inline",margin:"auto"}}>
                    
                        <h3 style={{textAlign:"center",marginTop:"20%",color:"#035252"}}>{t}</h3>     
                    
                </Card>
            )
        })

        const invig = invigcourses.invigilating_courses.map(t=>{
            return(
                <Card  sx={{width:"20%",height:"30vh",color:"black",marginBottom:"40px", backgroundColor:"#00666633",padding:"15px 15px 15px 15px",fontSize:"15px",borderRadius:"32px", display:"inline",margin:"auto"}}>
                     
                        <h3 style={{textAlign:"center",marginTop:"20%",color:"#035252"}}>{t}</h3>     
                      
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
          <div style={{textAlign:"center"}}>
            <Loader/>
          </div>
        )
      }
}

export default Coursecontent
