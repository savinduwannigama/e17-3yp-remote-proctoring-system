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
 
  let exams = localStorage.getItem('Adminexams')? localStorage.getItem("Adminexams"):''
  let ex = ''
  
  exams =exams?  JSON.parse(exams):''
  return (
        <div style={{textAlign:"center", fontSize:"15px"}}>
          <div style={{width:"50%", display: 'flex',margin:"auto"}}>
         <Accordion style={{display:"block",marginLeft: "auto",  marginRight: "auto"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
            Exams already added to the system : Total ({exams.length})
            </AccordionSummary>
            {exams.length!==0 && <AccordionDetails>
              {ex = exams.map(e=>{
                  return(
                    <Accordion>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                      >
                      {e['name']}
                     </AccordionSummary>
                     <AccordionDetails style={{justifyContent:"flex-start"}}>
                       <Typography align="left" sx={{fontFamily:"Sansita"}}>
                      Course :  {e['course']}
                      <br/>
                      Course coordinator : {e['course_coordinator']}
                      <br/>
                      Duration : {e['duration']}
                     </Typography>
                     
                     </AccordionDetails>
                    
                     
                      
                    </Accordion>
                  )
              })}
              </AccordionDetails> }
          </Accordion>
          </div>
          <br/>
          <p>If the exam to be scheduled is not in the above list please add them to the system here.</p>
          
          <br/>
          <hr style={{background:"#006666",height:"5px"}}/>
          To add all the details of the examination Please upload the CSV file in the correct format.

        <Box
      sx={{
        display: 'flex',
        
        '& > *': {
          m: 1,
        },
      }}
    >
           <ButtonGroup  orientation="vertical" sx={{display:"block",marginLeft: "auto",  marginRight: "auto"}}>
           <Adminbtn btnname="Add MasterSheet" value="mastersheet" url="exams/mastersheet" user="exams" />
             </ButtonGroup>
        </Box>
        <hr style={{background:"#006666",height:"5px"}}/>
       

        {suc && <p style={{textAlign:"center"}}>Examinations Added successfully!</p>}






        </div>
    )
}

export default Addcourse