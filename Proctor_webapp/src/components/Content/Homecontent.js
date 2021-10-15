import React from "react";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import jsonData from '../jsonfiles/exams.json';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: "black",
}));

function renderer ()  {
  
  console.log("Exams", jsonData)
  
  if(jsonData.chief_invigilating_exams){
    const trail= jsonData.chief_invigilating_exams.map(t => {
      console.log(t.exam_room);
      const starttime = t[1]['startTime'];
      const utctime = new Date(starttime).toUTCString()
      const roomname = t[0]["room_name"];
      console.log(roomname)
      return(
        <Card sx={{width: "30%", height:"60vh" ,color:"black",margin:"auto",backgroundColor:"#00666633",padding:"15px",fontSize:"15px",borderRadius:"32px"}}>
            <div className="card-body" >
                <h4 className="card-title">{t[1]['name']}</h4>
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
      <Stack direction="row" >
        {trail}
      </Stack>
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

export default renderer;