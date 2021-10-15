import React from 'react'
import Calendar from './Calendar'
import ProctorAppBar from './ProctorAppBar'
import UpcomingIcon from '@mui/icons-material/Upcoming';
function Schedule() {
    return (
        <div style={{color:"black"}}>
           <ProctorAppBar  item="Upcoming Exams" icon = {< UpcomingIcon/>}>
            <h2>Examination Schedule</h2>
            <div className="calendar" >
            <Calendar/>
            </div>
           </ProctorAppBar>
           
        </div>
    )
}

export default Schedule
