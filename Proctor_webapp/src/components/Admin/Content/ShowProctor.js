import React,{useState}  from 'react'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Confirm from './Confirm'
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import Adminbtn from '../../Adminbtn'
import Box from '@mui/material/Box';
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
function Showproctor() {
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
  let proctors = localStorage.getItem('Proctors')? localStorage.getItem("Proctors"):''
  let proc = ''
  proctors =proctors?  JSON.parse(proctors):''
  return (
        <div style={{textAlign:"center", fontSize:"15px"}}>
          
             {suc && <div  style={{textAlign:"center",color:"#006666"}}>Proctor Deleted successfully!</div>}

          <div style={{width:"50%", display: 'flex',margin:"auto"}}>
         
         <Accordion style={{display:"block",marginLeft: "auto",  marginRight: "auto"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
            
            Proctors already added to the system : Total ({proctors.length})
            </AccordionSummary>
            {proctors.length!==0 && <AccordionDetails>
              {proc = proctors.map(p=>{
                  return(
                    <Accordion id = {p['name']}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                      >
                      {p['name']}
                     </AccordionSummary>
                     <AccordionDetails style={{justifyContent:"flex-start"}}>
                       <Typography align="left" sx={{fontFamily:"Sansita"}}>
                      Email address :  {p['email']}
                      <br/>
                      Department : {p['department']}
                      <br/>
                      Already registered : {p['isRegistered']===false? 'No':'Yes'}
                     </Typography>
                     <ThemeProvider theme={theme}>
                  
                     <div style={{float:"right"}}>
                         
                        <IconButton aria-label="delete" color="neutral" size="large" id={p['email']} onClick={handleClick} name={p['name']}>
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
          <Confirm open={open} name={name} close={handleClose} email={email} success={handlesuccess} user="proctor" label="Email Address" title="Name"/>
          </div>
          
          <hr style={{background:"#006666",height:"5px"}}/>

      





        </div>
    )
}

export default Showproctor
