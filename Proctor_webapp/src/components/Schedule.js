import React from 'react'
import Calendar from './Calendar'
import ProctorAppBar from './ProctorAppBar'
function Schedule() {
    return (
        <div style={{color:"black"}}>
           <ProctorAppBar>
            <h2>Examination Schedule</h2>
            <div className="calendar" >
            <Calendar/>
            </div>
           </ProctorAppBar>
           
        </div>
    )
}

export default Schedule
