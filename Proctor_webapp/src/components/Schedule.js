import React,{useEffect, useState} from 'react'
import Calendar from './Calendar'
import ProctorAppBar from './ProctorAppBar'
import UpcomingIcon from '@mui/icons-material/CalendarToday';
import axios from "axios";
import Errorcomp from './Content/Error'
import path from './jsonfiles/path.json'
function Schedule() {
    const [data, setData] = useState('');
    const [fail, setfail] = useState('');
    var events = [];
    useEffect(() => {
        axios.get(`${path[0]['path']}proctor/exams/self`,
        { headers: {
           'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
         }}
        ).then(resp => {
       
         console.log("chief invig exams",resp.data);
         setData(resp.data);
        
        }).catch(error=>{
         console.log("Error response",error.response.data["error"])
         setfail(1);
         console.log(fail);
          
    })},[fail]);
    if(data.all_exams){
        console.log("data received",data.all_exams)
        console.log("values in each key 0,1,2,3",Object.values(data.all_exams))
        for(var i in data.all_exams){
            var item= Object.values(data.all_exams)
            const stime = item[i]['exam_startTime'].replace('.000Z', '')+'';
            console.log("time given",stime)
            const isotime= new Date(stime).toISOString();
            console.log("converted time",isotime)
            events.push({title: item[i]['exam_name'],start: stime,allDay: false,display:'list-item',description:item[i]["exam_room_name"]})
        }
        console.log("events taken from api", events)
    }

    const jsonstring =JSON.stringify(events);
    const jsondata= JSON.parse(jsonstring)
    
    return (
        <div style={{color:"black"}}>
           <ProctorAppBar  item="Calendar" icon = {< UpcomingIcon/>}>
            <h2>Examination Schedule</h2>
            <div className="calendar" >
            <Calendar events= {jsondata}/>
            </div>
            {fail && <Errorcomp next="/signin"/>}
           </ProctorAppBar>
           
        </div>
    )
}

export default Schedule
