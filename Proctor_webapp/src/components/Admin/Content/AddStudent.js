import React,{useState}  from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Adminbtn from '../../Adminbtn'
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
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
function Addstudent() {
  const [reqfail,setReqfail]=useState('')
  const [failure,setFail] = useState('')
  const [suc,setSuc]=useState('')
  //const [email,setEmail] = useState('')
  //const [name,setName] = useState('')
  const [items, setItems] = useState({email:"", name:"", regNo:"", department:"",device:""});
  const [errors,setErrors] = useState({email:'',name:'',regNo:"", department:"",device:""})
  const handleChange=(event)=>{
   /* let input = [...items];
    input[event.target.name]=event.target.value;
    const id =event.target.name
    const val = event.target.value*/
    const{name,value} = event.target
    /*if(id==='email'){
      setEmail(val)
    }
    else{
      setName(val)
    }*/
    setItems(prev=>({ ...prev, [name]:value}));
  }
  const validate=()=>{
    console.log("inside validate")
    let isValid = true
    let errors ={}
      if(items.email ===''){
        isValid = false;
        console.log("enter email")
        errors['email'] = "Please enter the proctor's email"
        console.log(errors['email'])
      }
      else if ( items["email"] !== "") {
          console.log("inside testing email")
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(items["email"])) {
          isValid = false;
          errors["email"] = "Please enter a valid email address";
          console.log("inside testing email",errors['email'])
        }
      } 
      if(items.name ===''){
        isValid = false;
        errors['name'] = "Please enter the students's full name"
      }

      if(items.regNo===''){
        isValid = false;
        errors['regNo'] = "Please enter the students's registration number"
      }
      if(items.department===''){
        isValid = false;
        errors['department'] = "Please enter the students's department"
      }
      if(items.device===''){
        isValid = false;
        errors['device'] = "Please enter the students's device ID"
      }

      
      setErrors(prev=>({ ...prev,
         "email":errors['email'],
          "name":errors['name'],
        "regNo":errors['regNo'],
        "department":errors['department'],
        "device":errors['device']
        
        }))
      console.log(isValid)
      return isValid;
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
   
    if(validate()){
      
      console.log("validation done",items);
      const url = "http://143.244.139.140:5000/api/admin/students/single"
      axios.post(url,{
        "name": items['name'],
        "regNo": items['regNo'],
        "email": items['email'],
        "department": items["department"],
        "device" : items['device']
       
    }).then(resp=>{
      setReqfail('')
      setFail('')
      setSuc(1)
      console.log("request successful",resp.data)
     
    }).catch(error=>{
      setReqfail(1);
      setFail(error.response.data["message"])
    })
    }
  }

  let students = localStorage.getItem('Students')? localStorage.getItem("Students"):''
  let stud = ''
  students =students?  JSON.parse(students):''
  return (
        <div style={{textAlign:"center", fontSize:"15px"}}>
          <div style={{width:"50%", display: 'flex',margin:"auto"}}>
              
         <Accordion style={{display:"block",marginLeft: "auto",  marginRight: "auto"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
            
            Students already added to the system : Total ({students.length})
            </AccordionSummary>

            {students.length!==0 && <AccordionDetails>
              {stud = students.map(s=>{
                  return(
                    <Accordion>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                      >
                      {s['name']}
                     </AccordionSummary>
                     <AccordionDetails style={{justifyContent:"flex-start"}}>
                       <Typography align="left" sx={{fontFamily:"Sansita"}}>
                        Registration number : {s['regNo']}
                        <br/>
                      Email address :  {s['email']}
                      <br/>
                      Department : {s['department']}
                      <br/>
                      Already registered : {s['isRegistered']===false? 'No':'Yes'}
                     </Typography>
                     </AccordionDetails>
                     
                      
                    </Accordion>
                  )
              })}
              </AccordionDetails>}
          </Accordion>
          </div>
          <br/>
          <p>If any of the students sitting for the exam to be scheduled is not in the above list please add them to the system here.</p>
          <br/>
          <hr style={{background:"#006666",height:"5px"}}/>
          To add Students in bulk Please upload the CSV file in correct format.

        <Box
      sx={{
        display: 'flex',
        
        '& > *': {
          m: 1,
        },
      }}
    >
           <ButtonGroup  orientation="vertical" sx={{display:"block",marginLeft: "auto",  marginRight: "auto"}}>
           <Adminbtn btnname="Add students" value="students" url="students/multiple" user="students"/>
            </ButtonGroup>
        </Box>
        <hr style={{background:"#006666",height:"5px"}}/>
        To add a single student please fill the form below.

        <Box
              component="form"
              sx={{
                  display:'flex',
                '& > :not(style)': { m: 1, width: '35ch',
                   
                },
                
                width:'100%',
                justifyContent:"center"
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
        >
        {reqfail && <div><p style={{color:"red",fontSize:"15px",textAlign:"center"}}>{failure}<br/></p></div>}
        <Stack spacing={2} >
        <ThemeProvider theme={theme}>   
            <TextField 
            color="neutral"
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            name="email"
            value={items.email}
            placeholder="Enter the student's email" 
            size="small" 
            autoComplete='on'
            onChange={handleChange}
            {...(errors['email'] && {error:true,helperText:errors['email']})}
           
           
            />
            <TextField 
            color="neutral"
            id="outlined-basic" 
            label="Full Name" 
            variant="outlined" 
            name="name"
            value={items.name}
            placeholder="Enter the student's name" 
            size="small" 
            autoComplete='on'
            onChange={handleChange}
            {...(errors['name'] && {error:true,helperText:errors['name']})}
           
            />
            <TextField 
            color="neutral"
            id="outlined-basic" 
            label="Registration Number" 
            variant="outlined" 
            name="regNo"
            value={items.regNo}
            placeholder="E/XX/XXX" 
            size="small" 
            autoComplete='on'
            onChange={handleChange}
            {...(errors['regNo'] && {error:true,helperText:errors['regNo']})}
           
            />

            <TextField 
            color="neutral"
            id="outlined-basic" 
            label="Department" 
            variant="outlined" 
            name="department"
            value={items.department}
            placeholder="Enter the student's department" 
            size="small" 
            autoComplete='on'
            onChange={handleChange}
            {...(errors['department'] && {error:true,helperText:errors['department']})}
           
            />

            <TextField 
            color="neutral"
            id="outlined-basic" 
            label="Device" 
            variant="outlined" 
            name="device"
            value={items.device}
            placeholder="Enter the student's device ID" 
            size="small" 
            autoComplete='on'
            onChange={handleChange}
            {...(errors['device'] && {error:true,helperText:errors['device']})}
           
            />


            {console.log(items)}
            <Button color="neutral" variant="contained" type="submit" value="Submit" size="medium" >
                    ADD STUDENT
            </Button>
           
            </ThemeProvider>
           </Stack>
        </Box>

        {suc && <p style={{textAlign:"center"}}>Student Added successfully. Please proceed to next step</p>}






        </div>
    )
}

export default Addstudent
