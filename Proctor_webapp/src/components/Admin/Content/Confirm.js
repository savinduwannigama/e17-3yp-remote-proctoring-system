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
    
  const [proctors,setProctors]=useState('');
  console.log("pathfile",path[0]['path'])
  const[email,setEmail] = useState('')
  const[error,setError] = useState('')
  const[suc,setSuc]=useState('')

  const handlesuccess=()=>{
      console.log("handling success")
      
  }
  const handleConfirm = () => {
    console.log("confirm clicked")
    if(email ==='' ){
        setError("Please confirm the email address")
    }
    else if(email !== props.email){
        setError("Emails don't match")
    }

    
    else{
        setError('')
        axios.delete(`${path[0]['path']}admin/proctors/single/${props.email}`).then(resp=>{
            console.log("response after deleting",resp.data)
            setSuc(1)
            axios.get(`${path[0]['path']}admin/proctors/all`
            /*,{ headers: {
               'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
             }}*/
           ).then(resp => {
             
             
             console.log("Response from api",resp.data);
             setProctors(resp.data)
            // handlesuccess();
            props.success()
            // window. location. reload(false);
             setSuc(1)
            // window.alert("Proctor deleted successfully!")
             //localStorage.setItem("username",resp.data['name']);
             //sessionStorage.setItem("department",resp.data['department'])
           }).catch(error=>{
             console.log("Error response",error.response.data["error"])
             setfail(1);
             console.log(fail);
           });
           

        }).catch(error=>{
            console.log("error occurred", error)
            setSuc('')
        })
    }

  
  };

  if(suc===1){
    const jsonProctors = JSON.stringify(proctors);
    console.log("json proctors",jsonProctors)
    localStorage.setItem("Proctors",jsonProctors)
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
            Are you sure you want to delete the proctor with the following details? <br/>
            <div style ={{paddingLeft:"10%",color:"black"}}>
            Name: {props.name}<br/>
            Email address: {props.email} <br/>
            
           </div>
           
            </div>
            <br/>
           <DialogContentText sx={{fontFamily:"Sansita", color:"black", textAlign:"center"}}>
               Please re-confirm your decision by typing the email address of the proctor to be deleted.
           </DialogContentText>
           <ThemeProvider theme={theme}>   
          <TextField
            color="neutral"
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            {...(error && {error:true,helperText:error})}
           
          />
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
        <ThemeProvider theme={theme}>  
          <Button onClick={props.close} color="neutral">Cancel</Button>
          <Button onClick={handleConfirm} color="neutral">Confirm</Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}