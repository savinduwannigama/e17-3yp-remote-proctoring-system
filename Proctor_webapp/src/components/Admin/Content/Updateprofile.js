import  React,{useState} from 'react';
import { createTheme,ThemeProvider  } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import Button from '@mui/material/Button';
import axios from "axios";
import Errorcomp from "../../Content/Error"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import path from '../../jsonfiles/path.json'
import InputAdornment from '@mui/material/InputAdornment';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
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

export default function Updateprofile() {
    
    const [name,setName] = useState(localStorage.getItem("adminusername"));
    const[success,setSuccess]=useState('');
   
    const [fail, setfail] = useState('');
    const[failmsg, setFailmsg] = useState('')
    let filetoupload=''
    let img = localStorage.getItem('aprofileimage') ? localStorage.getItem('aprofileimage') : '';
     const uploadedImage = React.useRef(img);
     console.log("uploaded image", uploadedImage)
  
   const imageUploader = React.useRef(img); 
   let formData = new FormData();

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
      console.log(e.target.files[0])
      filetoupload = e.target.files[0]
      console.log("filetoupload",filetoupload)
      if(filetoupload){
        const { current } = uploadedImage;
        current.file = file;
        
        
        
        formData.append("profile_picture",filetoupload)
        console.log("inside fileto upload")
        const reader = new FileReader();
        //const { current } = uploadedImage;
        //current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
         
        };
        reader.readAsDataURL(file);
        for (var pair of formData.entries()) {
          console.log(pair[0]+":"+pair[1])
       }
        
      }
      else{
        setfail(1)
        setFailmsg("An Image file has not been selected")
      }
      /*if (file) {
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
    }*/
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
        const email = localStorage.getItem("adminuser")
        const role = localStorage.getItem("adminrole")
        axios.put(`${path[0]['path']}admin/admins/self`,
        {"name": name,
        "email": email,
        "role":role},
        { headers: {
            'Authorization': 'BEARER '+ localStorage.getItem("atoken")
         }},

        ).then(resp=>{
            console.log(resp.data)
            localStorage.setItem("adminusername",name)
            setSuccess(1)
            //window.location.reload(false);
        }
        ).catch(error=>{
            console.log(error.response)
            setfail(1);
        });
        if(filetoupload){
          console.log("filetoupload",filetoupload)
          axios.post(`${path[0]['path']}admin/profilePicture`,formData,
        {
          headers: {
            'Authorization': 'BEARER '+ localStorage.getItem("atoken"),
            'Content-Type': 'multipart/form-data'
          }
        }).then(resp=>{
         
          console.log("successfull", resp.data)
          //update localstorage usin self call
          axios.get(`${path[0]['path']}admin/admins/self`,
                  { headers: {
                      'Authorization': 'BEARER '+ localStorage.getItem("atoken")
                    }}
                  ).then(resp => {
                    const profilepath= resp.data['profile_picture']
                    const imageurl = `${path[0]['imagepath']}${profilepath}`
                    //current.src = imageurl
                    console.log("Response from for self",resp.data);
                    localStorage.setItem("aprofileimage",imageurl)
                    localStorage.setItem("adminusername",resp.data['name']);
                    window.setTimeout(function(){window.location.reload()},3500)
                  }).catch(error=>{
                    console.log("Error response",error.response.data["error"])
                    setfail(1);
                    console.log(fail);
                  });
          
        }).catch(error=>{
          setfail(1);
          setFailmsg("Network error. Please try again in a few minutes")
          if(error.response){
            console.log("error caught",error.response.data[0])
          }
          else{
            console.log("error", error.response)
          }
        })
       }
        
      
  }

  return (
    <Stack direction="column" spacing={4} alignItems="center" sx={{margin:"auto"}}>
     
      <ThemeProvider theme={theme}>
      <Box  sx={{ '& > :not(style)': { m: 1, width: '23ch' }, bgcolor: '#00666633',width:"40%",height:"100%",borderRadius:"32px", padding:"5% 8%" }} alignItems="center" >
      {success && <p style={{color:"#006666", textAlign:"center"}}>Changes Saved Successfully!</p>}
    
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
          alt="profile"
          src = {img}
          ref={uploadedImage}
          style={{
            width: "100%",
            height: "100%",
            borderRadius:"100%",
            position: "acsolute"
          }}
        />
       
      </div>
<div >
<p style={{textAlign:"center", fontSize:"15px"}}>Click the circle to change profile picture </p>
{img==='No profile picture'&& !success && <p style={{textAlign:"center", fontSize:"15px", color:"red"}}>You currently don't have a profile picture</p>}
      
</div>
     
     {fail && <p style={{textAlign:"center", color:"red"}}>{failmsg}</p>}
      <TextField
          color="neutral"
          id="filled-read-only-input"
          label="Full Name"
          defaultValue= {localStorage.getItem("adminusername")}
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
          label="Role"
          defaultValue= {localStorage.getItem("adminrole")}
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
          defaultValue={localStorage.getItem("adminuser")}
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
      <div style={{ position: "relative"}}>
      <Button  color="neutral" variant="contained"  size="medium" onClick={handleClick} sx={{left: "25%"}} >
         Save Changes
         </Button>
      </div>
     
      </Box>
      </ThemeProvider>
      {fail && failmsg !=="Network error. Please try again in a few minutes" && failmsg!=="An Image file has not been selected" && <Errorcomp next="/adminsignin" />}

    </Stack>
  );
}