import React, {useState, useEffect } from "react";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import jsonData from '../jsonfiles/exams.json';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import axios from "axios";
import Loader from "../Content/Loader"
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: "black",
}));

function Renderer ()  {
  const [data, setData] = useState('');
  const [inv,setInv]=useState('');
  useEffect(() => {
    axios.get('http://143.244.139.140:5000/api/proctor/exams/chief_invigilator/self',
    { headers: {
       'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
     }}
    ).then(resp => {
   
     console.log("chief invig exams",resp.data);
     setData(resp.data);
    
    }).catch(error=>{
     console.log("Error response",error.response.data["error"])
      
    });
    axios.get('http://143.244.139.140:5000/api/proctor/exams/invigilator/self',
    { headers: {
       'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
     }}
    ).then(resp => {
   
     console.log("invig exams",resp.data);
     setInv(resp.data);
    
    }).catch(error=>{
     console.log("Error response",error.response.data["error"])
      
    });
    // Run! Like go get some data from an API.
  }, []);
  console.log("Exams", jsonData)
  console.log("JSON DATA FROM API",data)
  let arraydata= [data]
  console.log(arraydata)
  //sort json data
  if(data.chief_invigilating_exams){
    data.chief_invigilating_exams.sort((a, b) =>Date.parse(new Date(a[1]['startTime'])) - Date.parse(new Date(b[1]['startTime'])));
  console.log("Sorted",data)
  }
  
  if(data.chief_invigilating_exams){
    const trail= data.chief_invigilating_exams.map(t => {
      //console.log(t.exam_room);
      const starttime = t[1]['startTime'];
      const utctime = new Date(starttime).toUTCString()
      const roomname = t[0]["room_name"];
      console.log(roomname)
      return(
        <Card sx={{width: "45%", height:"60vh" ,color:"black",margin:"auto",marginBottom:"40px", backgroundColor:"#00666633",padding:"15px",fontSize:"15px",borderRadius:"32px", display:"inline"}}>
            <div className="card-body" >
                <h4 className="card-title">{t[0]['exam']}</h4>
                <Stack>
                  <Item> Course: {t[1]['course']}</Item>
                  <Item> Duty: Chief invigilator</Item>
                  <Item> Start time: {utctime}</Item>
                  <Item>Duration: {t[1]['duration']} </Item>
                  <Item>Room name: {t[0]["room_name"]}</Item>
                  
                  <Item sx={{textAlign:"center"}}><Link to={{pathname:'/meeting',state:{roomname: roomname}}} className="nav-link" >Join Examination</Link> </Item>
                  
                </Stack>
                 {/* <h2 className="card-text">{t.location} </h2>
                    <h4 className="card-text">{t.summary} </h4>
<ul className="list-group list-group-flush">
            <li className="list-group-item">Difficulty: {t.difficulty}</li>
            <li className="list-group-item">Length: {t.length} miles</li>
            <li className="list-group-item">Ascent: {t.ascent} ft, Descent: {t.descent} ft</li>
            <li className="list-group-item">Conditions: {t.conditionStatus}, {t.conditionDetails} </li>
            <li className="list-group-item">High: {t.high} ft, Low: {t.low}</li>
            <li className="list-group-item">Stars: {t.stars}</li>
            <li className="list-group-item"><a href={t.url} target="_blank" rel="noopener noreferrer" className="card-link">Trail Information</a></li>
      </ul>*/}
            </div>
       
        </Card>
      )
    })
    return(
      <Box sx={{ flexGrow:1 }}>
      <Grid container rowSpacing={6} >
        
          {trail}
           
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
/*function renderer(config) {
  if (typeof KeysToComponentMap[config.component] !== "undefined") {
    return React.createElement(
      KeysToComponentMap[config.component],
      {
        src: config.src
      },
      config.children &&
        (typeof config.children === "string"
          ? config.children
          : config.children.map(c => renderer(c)))
    );
  }
}*/

export default Renderer;