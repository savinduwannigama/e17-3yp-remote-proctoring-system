import React,{useState}  from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import path from '../../jsonfiles/path'
import axios from "axios";
import '../../../css/hide.css'
import Error from '../../Content/Error'
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
export default function FormDialog(props) {
  //const [open, setOpen] = React.useState(false);

  /*const handleClickOpen = () => {
    setOpen(true);
  };*/
  const [fail, setfail] = useState('');
  const [failmsg,setMsg]=useState('')
  const [proctors,setProctors]=useState('');
  const [students,setStudents] = useState('');
  const [courses,setCourses] = useState('');
  const [exams,setExams] = useState('')
  //console.log("pathfile",path[0]['path'])
  const[email,setEmail] = useState('')
  const[error,setError] = useState('')
  const[suc,setSuc]=useState('')

 
  const handleConfirm = () => {
    console.log("confirm clicked")
    if(props.label==="Email Address" && email ==='' ){
        
            setError("Please confirm the email address")
       
    }
    else if(props.label==="Email Address" && email !== props.email){
        setError("Emails don't match")
    }
   
    else if(props.label==="Course code" && email === ''){
        setError("Please confirm the course code")
    }
    else if(props.label==="Course code" && email !== props.email){
        console.log(props.email)
        setError("Course codes don't match. Please recheck the spaces and case of the letters in the code you entered")
    }
    else if(props.label==="Exam name" && email === ''){
        setError("Please confirm the exam name")
    }
    else if(props.label==="Exam name" && email !== props.email){
        setError("Exam names don't match. Please recheck the spaces and case of the letters in the name you entered")
    }
    
    
    else{
        setError('')
        axios.delete(`${path[0]['path']}admin/${props.user}s/single/${props.email}`
        ,{ headers: {
          'Authorization': 'BEARER '+ localStorage.getItem("atoken")
        }}
               
        ).then(resp=>{
            console.log("response after deleting",resp.data)
            setSuc(1)
            axios.get(`${path[0]['path']}admin/${props.user}s/all`
            ,{ headers: {
              'Authorization': 'BEARER '+ localStorage.getItem("atoken")
            }}
           ).then(resp => {
             
             
             console.log("Response from api",resp.data);
             if(props.user ==='proctor'){
                setProctors(resp.data)
             }
             else if(props.user ==='student'){
                setStudents(resp.data)
             }
             else if(props.user === 'course'){
                 setCourses(resp.data)
             }
             else if(props.user === 'exam'){
                 setExams(resp.data)
             }
            // handlesuccess();
            props.success()
            // window. location. reload(false);
             setSuc(1)
            // window.alert("Proctor deleted successfully!")
             //localStorage.setItem("username",resp.data['name']);
             //sessionStorage.setItem("department",resp.data['department'])
           }).catch(error=>{
            if(typeof error.response.data["message"]!=='undefined'){
              console.log("Error response",error.response.data["message"])
              setMsg(error.response.data["message"])
            }
            else{
              console.log(error)
              setMsg(error.response)
            }
            setfail(1);
            
           });
           

        }).catch(error=>{
          if(typeof error.response.data["message"]!=='undefined'){
            console.log("Error response",error.response.data["message"])
            setMsg(error.response.data['message'])
          }
          else{
            console.log(error)
            setMsg(error.response)
          }
          setfail(1);
          setSuc('')
         
            
        })
    }

  
  };

  if(suc===1 && props.user==='proctor'){
    const jsonProctors = JSON.stringify(proctors);
    console.log("json proctors",jsonProctors)
    localStorage.setItem("Proctors",jsonProctors)
}
else if(suc===1 && props.user==='student'){
    const jsonStudents = JSON.stringify(students);
    console.log("json students",jsonStudents)
    localStorage.setItem("Students",jsonStudents)
}
else if(suc===1 && props.user==='course'){
    const jsonCourses = JSON.stringify(courses);
    console.log("json courses",jsonCourses)
    localStorage.setItem("Admincourses",jsonCourses)
}
else if(suc===1 && props.user==='exam'){
    const jsonExams = JSON.stringify(exams);
    console.log("json exams",jsonExams)
    localStorage.setItem("Adminexams",jsonExams)
}



  const handleChange=(event)=>{
      
        setEmail(event.target.value)
        console.log(email)
      
   

  }
  
   
  return (
    <div>
      
      <Dialog open={props.open} sx={{fontFamily:"Sansita"}}>
        <DialogTitle sx={{fontFamily:"Sansita", color:"red"}} >Confirmation</DialogTitle>
        <DialogContent>
            <div sx={{fontFamily:"Sansita",paddingLeft:"20px",color:"black"}}>
            Are you sure you want to delete the {props.user} with the following details? <br/>
            <div style ={{paddingLeft:"10%",color:"black"}}>
            {props.title}: {props.name}<br/>
            {props.label}: {props.email} <br/>
            
           </div>
           
            </div>
            <br/>
           <DialogContentText sx={{fontFamily:"Sansita", color:"black", textAlign:"center"}}>
               Please re-confirm your decision by typing the {props.label.toLowerCase()} of the {props.user} to be deleted.
           </DialogContentText>
           <ThemeProvider theme={theme}>   
          <TextField
            color="neutral"
            autoFocus
            margin="dense"
            id="name"
            label={props.label}
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            {...(error && {error:true,helperText:error})}
           
          />
          </ThemeProvider>
          {fail && failmsg!=='' && !(failmsg.includes('token')||(failmsg.includes('Token'))) && <p className = "#hideMe"style={{color:"red"}}>{failmsg}</p>}
        </DialogContent>
        <DialogActions>
        <ThemeProvider theme={theme}>  
          <Button onClick={props.close} color="neutral">Cancel</Button>
          <Button onClick={handleConfirm} color="neutral">Confirm</Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
      {fail && (failmsg.includes("token") || failmsg.includes("Token"))&& <Error next="/adminsignin"/>}
        
    </div>
  );
}