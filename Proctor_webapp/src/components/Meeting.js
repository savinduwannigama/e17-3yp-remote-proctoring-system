import React from 'react'
import JitsiMeetComponent from './JitsiMeet';
import { useHistory } from 'react-router-dom';
function Meeting() {
    const history = useHistory();
    return (
        <div style={{height:'600px'}}>
           <JitsiMeetComponent/> 
        </div>
    )
}

export default Meeting
