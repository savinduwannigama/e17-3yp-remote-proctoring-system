import React,{useState}  from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Adminbtn from '../../Adminbtn'
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function Addcourse() {
  const [reqfail,setReqfail]=useState('')
  const [failure,setFail] = useState('')
  const [suc,setSuc]=useState('')
 
  let courses = localStorage.getItem('Admincourses')? localStorage.getItem("Admincourses"):''
  let cour = ''
  courses =courses?  JSON.parse(courses):''
  return (
        <div style={{textAlign:"center", fontSize:"15px"}}>
          <div style={{width:"50%", display: 'flex',margin:"auto"}}>
         <Accordion style={{display:"block",marginLeft: "auto",  marginRight: "auto"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
            Courses already added to the system : Total ({courses.length})
            </AccordionSummary>
            {courses.length!==0 && <AccordionDetails>
              {cour = courses.map(c=>{
                  return(
                    <Accordion>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                      >
                      {c['shortname']}
                     </AccordionSummary>
                     <AccordionDetails style={{justifyContent:"flex-start"}}>
                       <Typography align="left" sx={{fontFamily:"Sansita"}}>
                      Full name :  {c['fullname']}
                      <br/>
                      Department : {c['department']}
                      <br/>
                      Has scheduled exams : {c['hasExam']===false? 'No':'Yes'}
                     </Typography>
                     </AccordionDetails>
                    
                     
                      
                    </Accordion>
                  )
              })}
              </AccordionDetails> }
          </Accordion>
          </div>
          <br/>
          <p>If the courses of the exams to be scheduled is not in the above list please add them to the system here.</p>
          <p>If the courses are already in the list please proceed to the next step.</p>
          
          <br/>
          <hr style={{background:"#006666",height:"5px"}}/>
          To add Courses in bulk Please upload the CSV file in correct format.

        <Box
      sx={{
        display: 'flex',
        
        '& > *': {
          m: 1,
        },
      }}
    >
           <ButtonGroup  orientation="vertical" sx={{display:"block",marginLeft: "auto",  marginRight: "auto"}}>
           <Adminbtn btnname="Add courses" value="courses" url="courses/mastersheet" user="courses"/>
            </ButtonGroup>
        </Box>
        <hr style={{background:"#006666",height:"5px"}}/>
       

        {suc && <p style={{textAlign:"center"}}>Course Added successfully. Please proceed to next step</p>}






        </div>
    )
}

export default Addcourse
