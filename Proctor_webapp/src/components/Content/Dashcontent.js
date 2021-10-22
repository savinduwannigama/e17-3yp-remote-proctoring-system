import React,{useEffect,useState} from 'react'
import axios from "axios";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import Loader from "../Content/Loader"
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Errorcomp from './Error'
import path from '../jsonfiles/path.json'
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: "black",
}));
const theme = createTheme({
  
    palette: {
      
      neutral: {
        main: '#006666',
        contrastText: '#fff',
      },
    },
  });
  
function Dashcontent() {
    const [data, setData] = useState('')
    const [fail, setfail] = useState('');
  
    let recent = localStorage.getItem("most recent exam")?localStorage.getItem("most recent exam"):'' ;
    let duty='',name='';
    recent= recent.slice(0, -6).trim();
    const examinations = localStorage.getItem("examinations")?localStorage.getItem("examinations"):'';
    console.log("exams in storage",examinations)
    var items = JSON.parse(examinations);
   // console.log("exams stored in local",items)
  //console.log("recent exam",recent)
    for(var i in items){
        //console.log("inside items",i)
        var exams= Object.values(items);
        
        if(exams[i]["exam"].trim()===recent){
            duty = exams[i]["duty"];
            name = exams[i]["exam"].trim
            //console.log("exam name",name)
            //console.log("duty for exam",duty);
        }
       
    }
    
    useEffect(() => {
        axios.get(`${path[0]['path']}proctor/exams/${duty}/self`,
        { headers: {
           'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
         }}
        ).then(resp => {
       
         console.log("exam details fetched from api",resp.data);
         setData(resp.data);
         //console.log("exam details in data",data);
         
        
        }).catch(error=>{
         console.log("Error response",error.response.data["error"])
         console.log("Error ",error)
         if(duty!==''&& name!==''){
            setfail(1);
         }
        
        })},[duty,name])
   //var items = JSON.parse(localStorage.getItem("examinations"));
    //console.log("exams stored in local",items)
    console.log("api data",data)
    const firstkey=Object.keys(data)[0]
    console.log("Values inside data",firstkey)
    if(data[firstkey]){
       /* for(var i in Object.values(data)[0]){
            var item=data[0]
            console.log("room name in each",item[i][0]["room_name"])
        }*/
        //let stud=''
        const trail= data[firstkey].map(t => {
          //console.log(t.exam_room);
          //const disconstud = []
          if(t[0]['exam'].trim()===recent){
            let disconnections=[]
            
            disconnections= JSON.stringify(disconnections);
            console.log("disconnected students",disconnections)
            const starttime = t[1]['startTime'];
            const utctime = new Date(starttime).toUTCString()
            const roomname = t[0]["room_name"];
            console.log(roomname)
            return(
                <Card sx={{width: "45%", color:"black",margin:"auto",marginBottom:"40px", backgroundColor:"#00666633",padding:"15px",fontSize:"15px",borderRadius:"32px", display:"inline"}}>
                    <div className="card-body" >
                        <h2 style={{textAlign:"center"}}>Most recently conducted examination</h2>
                    <h4 style={{textAlign:"center"}} className="card-title">{t[0]['exam']}</h4>
                    <Stack>
                      <Item> Course: {t[1]['course']}</Item>
                      <Item> Duty: {duty}</Item>
                      <Item> Start time: {utctime}</Item>
                      <Item>Duration: {t[1]['duration']} </Item>
                      <Item>Room name: {t[0]["room_name"]}</Item>
             
                      <Item>Disconnected Students:{ t[0]['room_students'].map(d=>{
                
                if(Object.keys(d['disconnections']).length !== 0 ){
                    console.log("students in room", d);
                    //disconnections.push({regNo:d['regNo'],disconnections:d['disconnections']})
                
                    return(
                        <div>
                        <p><ul><li>Registration Number: {d['regNo']}</li></ul></p>
                        <p  style={{paddingLeft:"10%"}}>Disconnections: {d['disconnections'].map(dis=><p style={{paddingLeft:"10%"}}>{dis}</p>)}</p>
                        </div>
                    )
                }
                else{
                  return null
                }
                
            })}</Item>
               <br/>
                    <ThemeProvider theme={theme}>
                    <Button color= "neutral" size="medium" variant="contained" sx={{width:"50%", margin:"auto"}} > 
                        <Link to={{pathname:t[0]['recordedStudentVideosAt']}} target="_blank"  style={{ textDecoration: 'none', color:"white"}}>
                        Check the recordings
                        </Link>
                     </Button>
                    
                   
                    </ThemeProvider>
                    
                    
             
                     
                    </Stack>
                     
                </div>
           
            </Card>
          )
          }
          else{
            return null
          }
          
        })
        return(
          <Box sx={{ flexGrow:1 }}>
              <br/><br/>
          <Grid container rowSpacing={6} >
            
              {trail}
               
            </Grid>
            {fail && <Errorcomp/>}
    
        </Box>
        )
      }
      else if(duty!=='' && name!==''){
        return(
          <div style={{textAlign:"center"}}>
            <Loader/>
            {fail && <Errorcomp/>}
    
          </div>
        )
      }
      else{
        return(
            <div style={{textAlign:"center"}}>
              No recently accessed courses
              {fail && <Errorcomp next="/signin"/>}
      
            </div>
          )
      }
      
}

export default Dashcontent
