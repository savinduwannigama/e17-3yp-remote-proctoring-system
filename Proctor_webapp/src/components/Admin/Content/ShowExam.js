import React,{useState}  from 'react'
import IconButton from '@mui/material/IconButton';

import Confirm from './Confirm'
import DeleteIcon from '@mui/icons-material/Delete';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import '../../../css/hide.css';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#006666',
      contrastText: '#fff',
    },
  },
});
function Showexams() {
  //const [reqfail,setReqfail]=useState('')
  //const [failure,setFail] = useState('')
  const [suc,setSuc]=useState('')
  const [open, setOpen] = useState(false);
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  //const [items, setItems] = useState({email:"", name:""});
  //const [errors,setErrors] = useState({email:'',name:''})
  /*const handleChange=(event)=>{
   /* let input = [...items];
    input[event.target.name]=event.target.value;
    const id =event.target.name
    const val = event.target.value
    const{name,value} = event.target
    /*if(id==='email'){
      setEmail(val)
    }
    else{
      setName(val)
    }
    setItems(prev=>({ ...prev, [name]:value}));
  }*/
  
 const handleClick=(event)=>{
    console.log("inside click")
   //  console.log(event.target.id);
     console.log(event.currentTarget.id);
     console.log(event.currentTarget.name)
    setName(event.currentTarget.name)
    setEmail(event.currentTarget.id)
    setOpen(true);
 }
const handlesuccess=()=>{
    setSuc(1)
    setOpen(false);
}
 const handleClose=()=>{
     setOpen(false);
 }
 let exams = localStorage.getItem('Adminexams')? localStorage.getItem("Adminexams"):''
  //let ex = ''
  exams =exams?  JSON.parse(exams):''
 return (
        <div style={{textAlign:"center", fontSize:"15px"}}>
             {suc && <div  style={{textAlign:"center",color:"#006666"}}>Exam Deleted successfully!</div>}
          <br/><br/>
          <div style={{width:"50%", display: 'flex',margin:"auto"}}>
         
         <Accordion style={{display:"block",marginLeft: "auto",  marginRight: "auto" , background:"#00666633"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
            
            Exams already added to the system : Total ({exams.length})
         </AccordionSummary>
            {exams.length!==0  && <AccordionDetails>
              {exams.map(e=>{
                  return(
                    <Accordion id = {e['name']}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                      >
                      {e['name']}
                     </AccordionSummary>
                     <AccordionDetails style={{justifyContent:"flex-start"}}>
                       <Typography align="left" sx={{fontFamily:"Sansita"}}>
                      Name : {e['name']}
                        <br/>
                      Course :  {e['course']}
                      <br/>
                      Course coordinator : {e['course_coordinator']}
                      <br/>
                      Start date : {new Date(e['startTime']).toUTCString()}
                      <br/>
                      Duration : {e['duration']}
                       </Typography>
                     <ThemeProvider theme={theme}>
                  
                     <div style={{float:"right"}}>
                         
                        <IconButton aria-label="delete" color="neutral" size="large" id={e['name']} onClick={handleClick} name={e['course']}> 
                            <DeleteIcon />
                        </IconButton>
                        
                    </div>
                  
                    </ThemeProvider>
                   
                     </AccordionDetails>
                     
                      
                    </Accordion>
                  )
              })}
              </AccordionDetails>}
          </Accordion>
          <Confirm open={open} name={name} close={handleClose} email={email} success={handlesuccess} user="exam" label="Exam name" title = "Course code"/>
          </div>
          <br/><br/><br/>
          <hr style={{background:"#006666",height:"5px"}}/>

      





        </div>
    )
}

export default Showexams
