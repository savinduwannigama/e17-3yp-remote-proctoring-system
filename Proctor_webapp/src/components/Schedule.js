import React,{useEffect, useState} from 'react'
import Calendar from './Calendar'
import ProctorAppBar from './ProctorAppBar'
import UpcomingIcon from '@mui/icons-material/Upcoming';
import axios from "axios";
function Schedule() {
    const [data, setData] = useState('');
    var events = [];
    useEffect(() => {
        axios.get('http://143.244.139.140:5000/api/proctor/exams/chief_invigilator/self',
        { headers: {
           'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
         }}
        ).then(resp => {
       
         console.log("chief invig exams",resp.data);
         setData(resp.data);
        
        }).catch(error=>{
         console.log("Error response",error.response)//.data["error"])
          
    })},[]);
    if(data.chief_invigilating_exams){
        console.log("data received",data.chief_invigilating_exams)
        console.log("values in each key 0,1,2,3",Object.values(data.chief_invigilating_exams)[0])
        for(var i in data.chief_invigilating_exams){
            var item= Object.values(data.chief_invigilating_exams)
            const stime = item[i][1]['startTime'].replace('.000Z', '')+'';
            console.log("time given",stime)
            const isotime= new Date(stime).toISOString();
            console.log("converted time",isotime)
            events.push({title: item[i][0]['exam'],start: stime,allDay: false,display:'list-item'})
        }
        console.log("events taken from api", events)
    }

    const jsonstring =JSON.stringify(events);
    const jsondata= JSON.parse(jsonstring)
    
    return (
        <div style={{color:"black"}}>
           <ProctorAppBar  item="Upcoming Exams" icon = {< UpcomingIcon/>}>
            <h2>Examination Schedule</h2>
            <div className="calendar" >
            <Calendar events= {jsondata}/>
            </div>
           </ProctorAppBar>
           
        </div>
    )
}

export default Schedule
