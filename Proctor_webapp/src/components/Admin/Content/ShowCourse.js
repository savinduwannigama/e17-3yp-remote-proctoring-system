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
function Showcourses() {
  const [reqfail,setReqfail]=useState('')
  const [failure,setFail] = useState('')
  const [suc,setSuc]=useState('')
  const [open, setOpen] = useState(false);
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [items, setItems] = useState({email:"", name:""});
  const [errors,setErrors] = useState({email:'',name:''})
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
 let courses = localStorage.getItem('Admincourses')? localStorage.getItem("Admincourses"):''
 let cour = ''
 courses =courses?  JSON.parse(courses):''
 return (
        <div style={{textAlign:"center", fontSize:"15px"}}>
             {suc && <div  style={{textAlign:"center",color:"#006666"}}>Course Deleted successfully!</div>}

          <div style={{width:"50%", display: 'flex',margin:"auto"}}>
         
         <Accordion style={{display:"block",marginLeft: "auto",  marginRight: "auto"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
            
            Courses already added to the system : Total ({courses.length})
           </AccordionSummary>
            {courses.length!==0  && <AccordionDetails>
              {cour = courses.map(c=>{
                  return(
                    <Accordion id = {c['shortname']}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                      >
                      {c['shortname']}
                     </AccordionSummary>
                     <AccordionDetails style={{justifyContent:"flex-start"}}>
                       <Typography align="left" sx={{fontFamily:"Sansita"}}>
                      Course code : {c['shortname']}
                        <br/>
                     Full name :  {c['fullname']}
                      <br/>
                      Department : {c['department']}
                      <br/>
                      Has scheduled exams : {c['hasExam']===false? 'No':'Yes'}
                     </Typography>
                     <ThemeProvider theme={theme}>
                  
                     <div style={{float:"right"}}>
                         
                        <IconButton aria-label="delete" color="neutral" size="large" id={c['shortname']} onClick={handleClick} name={c['fullname']}> 
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
          <Confirm open={open} name={name} close={handleClose} email={email} success={handlesuccess} user="course" label="Course code" title="Name"/>
          </div>
          
          <hr style={{background:"#006666",height:"5px"}}/>

      





        </div>
    )
}

export default Showcourses
