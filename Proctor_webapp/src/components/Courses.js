import React from 'react'
import Coursecontent from './Content/Coursecontent'
import ProctorAppBar from './ProctorAppBar'
import CourseIcon from '@mui/icons-material/School';
function Courses() {
    return (
        <div style={{color:"black"}}>
           <ProctorAppBar  item="Courses" icon = {<CourseIcon/>}> 
           
           <Coursecontent/>
           </ProctorAppBar>
          
        </div>
    )
}

export default Courses