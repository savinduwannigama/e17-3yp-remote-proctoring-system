import * as React from 'react';
import { styled,createTheme,ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Papa from "papaparse";

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
    this.state = {
      selectedFile: undefined,
      FileName: "No File Selected",
      currentFile: undefined,
      progress: 0,
      message: "",
      isError: false,
      fileInfos: [],
    };
  }
  
  fileSelectedHandler = event => {
    
    /*console.log(event.target.files);*/
    this.setState({
      selectedFile: event.target.files[0],
      FileName: this.upload+event.target.files[0].name? this.upload+event.target.files[0].name:"No File Selected"
    })
    
  }
  
  donothing =()=>{}
  fileUploadHandler = ()=>{
    console.log(this.state.FileName);
    const fd = new FormData();
    const name = this.id;
    //Add the path dynamically by appending this.id
    const url = `http://143.244.139.140:5000/api/admin/${this.path}`
    fd.append(this.id, this.state.selectedFile,this.state.selectedFile.name);
    Papa.parse(this.state.selectedFile, 
      {
        
       complete: function(results) {
         /*console.log("Finished:", results.data);*/
         //store the results.data as a json object
        // fd.append("data",JSON.stringify(results.data,null,4));
         const value =JSON.stringify({"uploaded_file":name,"details":results.data},null,4) 

         console.log(value)
         /*console.log("Printing content of fd")
         for (var pair of fd.entries()) {
            console.log(pair[0]+":"+pair[1])
        }*/
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

          console.log(resp.data);
        }).catch(error => {
          console.log(error.response);
        })
       }}
     )
    
  
    
  }


  render(){
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
      
      </>
    );
  }
  
}
