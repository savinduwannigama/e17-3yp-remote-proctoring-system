import * as React from 'react';
import { styled,createTheme,ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Papa from "papaparse";
import serverpath from '../components/jsonfiles/path.json'
import Error from './Content/Error'

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

export default class Adminbtn extends React.Component {
  constructor(props) {
    super(props);
    this.upload= "Upload ";
    this.id = props.value;
    this.btnname = props.btnname;
    this.path = props.url;
    this.user = props.user;
    this.state = {
      selectedFile: undefined,
      FileName: "No File Selected",
      currentFile: undefined,
      progress: 0,
      message: "",
      isError: false,
      fileInfos: [],
      exams:'',
      courses:'',
      students:'',
      proctors:'',
      success:''
      
    };
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.uploadData = this.uploadData.bind(this)

  }
  
  fileSelectedHandler = event => {
    
    /*console.log(event.target.files);*/
    if(event.target.files[0]){
      this.setState({
        selectedFile: event.target.files[0],
        
        FileName:  this.upload+event.target.files[0].name
      })
    }
    
    
  }
  setLocal=()=>{
    if(this.user==='exams'){
      console.log(this.state.exams)
      const jsonExams = JSON.stringify(this.state.exams);
      localStorage.setItem("Adminexams",jsonExams)
      window.location.reload(false);
    }
    else if(this.user === 'courses'){
      console.log(this.state.courses)
      const jsonCourses = JSON.stringify(this.state.courses);
      localStorage.setItem("Admincourses",jsonCourses)
      window.location.reload(false);
 
    }

    else if(this.user === 'students'){
      console.log(this.state.students)
      const jsonStudents = JSON.stringify(this.state.students);
      localStorage.setItem("Students",jsonStudents)
      window.location.reload(false);
 
    }
    else if(this.user === 'proctors'){
      console.log(this.state.proctors)
      const jsonProctors = JSON.stringify(this.state.proctors);
      localStorage.setItem("Proctors",jsonProctors)
      window.location.reload(false);
 
    }
  }
  uploadData(results){
    const name = this.id;
    console.log(this.path)
    const value =JSON.stringify({"uploaded_file":name,"details":results.data},null,4) 
   
    const url =`${serverpath[0]['path']}admin/${this.path}`
    console.log(value)

    axios.post(url, value,{
      headers: {
        'Authorization': 'BEARER '+ localStorage.getItem("atoken"),
        'Content-Type': 'application/json'
      }
      }, {
        onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total)
    }
    }).then(resp => {
      if(resp.data['status']==='failure'){
        this.setState({
          isError:true,
          message: resp.data["message"]
        })
      }
      else{
        this.setState({
          isError:false,
          message: resp.data["message"]
        })
        axios.get(`${serverpath[0]['path']}admin/${this.user}/all`
        ,{ headers: {
          'Authorization': 'BEARER '+ localStorage.getItem("atoken")
        }}
       ).then(resp => {
         
         
         console.log("Response from api",resp.data);
        if(this.user ==='exams'){
          this.setState({
            exams: resp.data,
            success:1
          })
        }
        else if(this.user ==='courses'){
          this.setState({
            courses: resp.data,
            success:1
          })
        }

        else if(this.user ==='students'){
          this.setState({
            students: resp.data,
            success:1
          })
        }
        else if(this.user ==='proctors'){
          this.setState({
            proctors: resp.data,
            success:1
          })
        }
        this.setLocal()

         //localStorage.setItem("username",resp.data['name']);
         //sessionStorage.setItem("department",resp.data['department'])
       }).catch(error=>{
        if(typeof error.response.data["message"]!=='undefined'){
          console.log("Error response",error.response.data["message"])
          console.log("error data", error.response.data)
          this.setState({
            isError:true,
            message: error.response.data["message"]
          })
        }
        else{
          console.log(error.repsonse)
          this.setState({
            isError:true,
            message: error.response
          })
        }
         
         //setfail(1);
         //console.log(fail);
       });

      }
      
      console.log(resp.data);
    }).catch(error => {
      if(typeof error.response.data["message"]!=='undefined'){
        let errormsg =''
        console.log("Error response",error.response.data['message'])
        console.log("error data", error.response.data)
        if(error.response.data['message'].includes('Following')){
         errormsg = error.response.data['error']
        }
        
        this.setState({
          isError:true,
          message: error.response.data["message"] +errormsg
        })
      }
      else{
        console.log(error)
        this.setState({
          isError:true,
          message: error.response
        })
      }
      
    })
  }
 
  donothing =()=>{}
  fileUploadHandler = ()=>{
    console.log(this.state.FileName);
    const fd = new FormData();
   //if something happens uncomment this const name = this.id;
    //Add the path dynamically by appending this.id
    
    if(this.state.FileName!=="No File Selected"){
    fd.append(this.id, this.state.selectedFile,this.state.selectedFile.name);
    Papa.parse(this.state.selectedFile, 
      {
        
       complete: this.uploadData/*function(results) {
         /*console.log("Finished:", results.data);
         //store the results.data as a json object
        // fd.append("data",JSON.stringify(results.data,null,4));
         const value =JSON.stringify({"uploaded_file":name,"details":results.data},null,4) 

         console.log(value)
         /*console.log("Printing content of fd")
         for (var pair of fd.entries()) {
            console.log(pair[0]+":"+pair[1])
        }
        //after conversion send the fd to the server
        axios.post(url, value,{
          headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json'
          }
          }, {
            onUploadProgress: progressEvent => {
            console.log(progressEvent.loaded / progressEvent.total)
        }
        }).then(resp => {
          this.setState({
            isError:false,
            message: ""
          })
          console.log(resp.data);
        }).catch(error => {
          console.log(error);
          this.setState({
            isError:true,
            message: error["message"]
          })*/
        })
       }//}
     //)
   // }
    else{
      this.setState({
        
        message: "Please select a file to upload"
      })
    }
  
    
  }


  render(){
    console.log(this.id)
    return (
      <>
      <Stack direction="column" alignItems="left" spacing={1}>
        <label htmlFor={this.value}>
          <Input id={this.value} accept=".csv"   multiple type="file" onChange={this.fileSelectedHandler} />
          
          <ThemeProvider theme={theme}>
          <Button color="neutral" variant="contained" component="span" size="large" onChange = {this.fileUploadHandler}>
              {this.btnname}
              
            <IconButton style={{ color:'white' }} aria-label="upload picture" component="span">
            <UploadFileIcon fontSize="large"/>
            </IconButton>
          </Button>
          </ThemeProvider>
        </label>
       
        
        
      </Stack>
     
      <Stack direction= 'column' alignItems="center">
      <label>
          <ThemeProvider theme={theme}>
          <Button color="other" variant="contained" component="span" size="small" onClick = {this.state.FileName?this.fileUploadHandler:this.donothing}>
                           
          <p className="btnp" style={{color:"#0408A0"}}> {this.state.FileName}</p>
          </Button>
          </ThemeProvider>
      </label>
      </Stack>
      {this.state.isError && !(this.state.message.includes('token')|| this.state.message.includes('Token')) && <p style={{color:"red"}}>Error occurred while uploading. {this.state.message}</p>}
      {!(this.state.message.includes('token')|| this.state.message.includes('Token')) && this.state.message ==="Please select a file to upload" && <p style={{color:"red"}}>{this.state.message}</p>}
      {this.state.message !=='' && !this.state.isError && this.id!=='mastersheet' && !(this.state.message.includes('token')|| this.state.message.includes('Token')) && <p style={{color:"green"}}>{this.state.message}. Please Proceed to next step</p>}
      {this.state.message !=='' && !this.state.isError && this.id==='mastersheet' && !(this.state.message.includes('token')|| this.state.message.includes('Token')) && <p style={{color:"green"}}>{this.state.message}. To add another exam start from step 1</p>}
     {(this.state.message.includes('token')|| this.state.message.includes('Token')) && <Error next="/adminsignin"/>}
      </>
    );
  }
  
}
