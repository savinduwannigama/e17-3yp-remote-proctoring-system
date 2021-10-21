import React,{useState,useEffect } from 'react'
import ProctorAppBar from '../components/ProctorAppBar'
import { useLocation,Link } from 'react-router-dom'
import Errorcomp from './Content/Error'
import axios from "axios";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//to display students in accordian
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import path from './jsonfiles/path.json'
import Loader from "./Content/Loader"
import CourseIcon from '@mui/icons-material/School';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: "black",
    fontFamily:'Sansita',
    fontSize:'15px'
  }));
function CoursePage({match}) {
    const [fail, setfail] = useState('');
    const [data, setData] = useState('')
    const location = useLocation()
    
    const {duty } = location.state
    const notduty = duty ==='chief_invigilator'? 'invigilator':'chief_invigilator'
    const{
        params:{courseId},

    } = match;
    console.log("inside dynamic routing", courseId)
    useEffect(() => {
        axios.get(`${path[0]['path']}proctor/exams/${duty}/self`,
       { headers: {
          'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
        }}
      ).then(resp => {
        
        
        console.log("Response from api",resp.data);
        setData(resp.data);
      
      }).catch(error=>{
        console.log("Error response",error.response.data["error"])
        setfail(1);
        console.log(fail);
      });
    },[])
    const firstkey=Object.keys(data)[0]
    console.log("Values inside data",data[firstkey])
    if(data[firstkey]){
        let stud=''
        const trail= data[firstkey].map(t => {
            if(t[1]['course'].trim()===courseId){
                console.log("course found",t[1]['course'])
                return(
                    <Card sx={{width: "45%",color:"black",margin:"auto",marginBottom:"40px", backgroundColor:"#00666633",padding:"15px",fontSize:"15px",borderRadius:"32px", display:"inline"}}>
            <div className="card-body" >
                <h2 className="card-title" style={{paddingLeft:'10px'}}>{t[1]['course']}</h2>
                <Stack>
                  <Item>  Course coordinator: {t[1]['course_coordinator']}</Item>
                  <Item>  Exam: {t[0]['exam']}</Item>
                  <Item>  Number of registered students: {t[1]['students'].length}</Item>
                  <Item>  Room name: {t[0]["room_name"]}</Item>
                  <Item>   Duty: {duty}</Item>
                  <Item>{notduty}: {t[0][notduty]} </Item>
                 
                        <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                        Students assigned to the room : Total ({t[0]['room_students'].length})
                            </AccordionSummary>
                            <AccordionDetails>
                            {stud = t[0]['room_students'].map(d=>{
                                return(
                                    <Typography>
                                   <p> {d['regNo']}
                                    {d['disconnections'].length !== 0 && 
                                    <div style={{color:"red", display:"inline"}}> : Disconnected {d['disconnections'].length} times during the exam
                                        <ul>
                                            
                                         {d['disconnections'].map(dis=><li >{dis}</li>)}
                                        </ul>
                                    </div>
                                       
                                    }
                                  
                                     </p>
                                    </Typography>
                                )
                            })}
                            </AccordionDetails>
                        </Accordion>
                                        
                      
                      
                           
                      
                      
               
                 
                 
                 
                  <Item><Link to={{pathname:t[0]['recordedStudentVideosAt']}} target="_blank" >
                        Link to see the recordings of disconneted students
                        </Link>
                  </Item>
                 
                </Stack>
                
            </div>
       
        </Card>
                )
            }
        })
        return (
            <div style={{color:"black"}}>
                <ProctorAppBar item={courseId} icon = {<CourseIcon/>}> 
                <br/><br/>
                <Box sx={{ flexGrow:1 }}>
                    <Grid container rowSpacing={6} >
                        
                        {trail}
                        
                        </Grid>
                        
                </Box>
                {fail && <Errorcomp/>}
                </ProctorAppBar>
            </div>
        )
    }
    else{
        return(
          <div style={{textAlign:"center"}}>
              <ProctorAppBar item={courseId} icon = {<CourseIcon/>}> 
            <Loader/>
            {fail && <Errorcomp/>}
            </ProctorAppBar>
    
          </div>
        )
      }
    
}

export default CoursePage
