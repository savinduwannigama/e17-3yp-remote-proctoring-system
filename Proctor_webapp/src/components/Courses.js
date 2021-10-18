import React from 'react'
import Coursecontent from './Content/Coursecontent'
import ProctorAppBar from './ProctorAppBar'
function Courses() {
    return (
        <div style={{color:"black"}}>
           <ProctorAppBar> 
           
           <Coursecontent/>
           </ProctorAppBar>
          
        </div>
    )
}

export default Courses