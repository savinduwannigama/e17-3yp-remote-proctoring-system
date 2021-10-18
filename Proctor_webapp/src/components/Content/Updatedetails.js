import  React,{useState, useEffect} from 'react';
import { styled,createTheme,ThemeProvider  } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useHistory,Link } from 'react-router-dom';
import axios from "axios";
import Errorcomp from "./Error"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { margin } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
const Input = styled('input')({
    display: 'none',
  });

  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      neutral: {
        main: '#006666',
        contrastText: '#fff',
      },
      other:{
        main: 'white'
      }
    },
});

export default function ImageAvatars() {
    const history = useHistory();
    const [data, setData] = useState('');
    const [name,setName] = useState(localStorage.getItem("username"));
    const[success,setSuccess]=useState('');
    const [selected, setselected] = useState('')
    const [fail, setfail] = useState('');
    let img = localStorage.getItem('profileimage') ? localStorage.getItem('profileimage') : '';
   const uploadedImage = React.useRef(img);
   const imageUploader = React.useRef(img); 
  

   /*useEffect(() => {
    axios.get('http://143.244.139.140:5000/api/proctor/proctors/self',
    { headers: {
       'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
     }}
    ).then(resp => {
   
     console.log("proctor's data",resp.data);
     setData(resp.data);
     setName(resp.data['name'])
     console.log("data stored",data)
    
    }).catch(error=>{
     console.log("Error response",error.response.data["error"])
     setfail(1);
    })},[])*/

    const fileSelectedHandler = e => {
        /*setselected(event.target.files[0])
        console.log("inside fileselected handle",selected)
        const file = event.target.files[0];
        getBase64(file).then(base64 => {
        localStorage["profileimage"] = base64;
        console.debug("file stored",base64);
        img= localStorage.getItem('profileimage')
      });*/
      const [file] = e.target.files;
      if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
        localStorage.setItem("profileimage",current.src)
        img=current.src
        console.log(img);
      };
      reader.readAsDataURL(file);
    }
    }
    /*const getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }*/
    /*const fileUploadHandler=()=>{
 //setselected(event.target.files[0])
        
        reader.addEventListener("load", function () {
            // convert image file to base64 string and save to localStorage
            localStorage.setItem("profileimage", reader.result);
        }, false);
        reader.readAsDataURL(selected);
        //localStorage.setItem("profileimage",selected['name'])
        //console.log("inside fileupload handler",selected)
    }*/
    const handleChange= event=> {
      console.log("event value",event.target.value)
        setName(event.target.value)
        console.log("changed",name)
    }
    const handleClick=()=>{
        console.log("inside click",name)
        const email = localStorage.getItem("user")
        axios.put('http://143.244.139.140:5000/api/proctor/proctors/self',
        {name: name,email:email},
        { headers: {
            'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
         }},

        ).then(resp=>{
            console.log(resp.data)
            localStorage.setItem("username",name)
            setSuccess(1)
            window.location.reload(false);
        }
        ).catch(error=>{
            console.log(error.response)
            setfail(1);
        })
      
  }

  return (
    <Stack direction="column" spacing={4} alignItems="center" sx={{margin:"auto"}}>
    {success && <div><p style={{color:"#006666"}}>Changes Saved Successfully!</p></div>}
      
      <ThemeProvider theme={theme}>
      <Box  sx={{ '& > :not(style)': { m: 1, width: '23ch' }, bgcolor: '#00666633',width:"40%",height:"100%",borderRadius:"32px", padding:"5% 7%",alignItems:"center" }} alignItems="center" >
      <input

        src={img}
        type="file"
        accept="image/*"
        onChange={fileSelectedHandler}
        ref={imageUploader? imageUploader:img}
        style={{
          display: "none",
          margin:"auto"
        }}
      />
      <div
        style={{
          height: "100px",
          width: "100px",
          borderRadius:"100%",
          border: "1px dashed black",
          margin:"auto"
        }}
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          style={{
            width: "100%",
            height: "100%",
            borderRadius:"100%",
            position: "acsolute"
          }}
        />
      </div>
      <p style={{textAlign:"center"}}>Click to change profile picture</p>
     
      <TextField
          color="neutral"
          id="filled-read-only-input"
          label="Full Name"
          defaultValue= {localStorage.getItem("username")}
          onChange={handleChange}
          variant="filled"
          InputProps={{
            
            endAdornment:(
              <InputAdornment position="end">
                <EditIcon/>
              </InputAdornment>
            )
          }}
        />


       
        <TextField
        color="neutral"
          id="filled-read-only-input"
          label="Department"
          defaultValue= {sessionStorage.getItem("department")}
          InputProps={{
            readOnly: true,
            endAdornment:(
              <InputAdornment position="end">
                <EditOffIcon/>
              </InputAdornment>
            )
          }}
          variant="filled"
        />
        
        <TextField
        color="neutral"
          id="filled-read-only-input"
          label="Email Address"
          defaultValue={localStorage.getItem("user")}
          InputProps={{
            readOnly: true,
            endAdornment:(
              <InputAdornment position="end">
                <EditOffIcon/>
              </InputAdornment>
            )
          }}
          variant="filled"
        />
     
      <br/><br/>
      <div style={{justifyContent:"right"}}>
      <Button  color="neutral" variant="contained" component="span" size="medium" onClick={handleClick}>
         Save Changes
         </Button>
      </div>
     
      </Box>
      </ThemeProvider>
      {fail && <Errorcomp/>}

    </Stack>
  );
}