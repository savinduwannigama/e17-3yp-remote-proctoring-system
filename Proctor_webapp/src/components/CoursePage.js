import React from 'react'

function CoursePage({match}) {
    const{
        params:{courseId},

    } = match;
    console.log("inside dynamic routing", courseId)
    return (
        <div style={{color:"black"}}>
            {courseId}
        </div>
    )
}

export default CoursePage
