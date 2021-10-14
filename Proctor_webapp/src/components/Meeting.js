import React from 'react'
import JitsiMeetComponent from './JitsiMeet';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom"
function Meeting(props) {
    const location = useLocation()
    const roomname = location.state?.roomname
    return (
        
        <div style={{height:'600px'}}>
           <JitsiMeetComponent name= {roomname}/> 
        </div>
    )
}

export default Meeting
