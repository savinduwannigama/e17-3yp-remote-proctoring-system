import * as React from 'react';
import { styled,createTheme,ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Stack from '@mui/material/Stack';
import axios from 'axios';

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
    
    console.log(event.target.files);
    this.setState({
      selectedFile: event.target.files[0],
      FileName: this.upload+event.target.files[0].name
    })
  }

  fileUploadHandler = ()=>{
    const fd = new FormData();
    fd.append(this.value, this.state.selectedFile,this.state.selectedFile.name);
    axios.post('https://moodle-51262-0.cloudclusters.net/', fd, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total)
      }
    })
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
          <Button color="other" variant="contained" component="span" size="small" onClick = {this.fileUploadHandler}>
                           
          <p className="btnp" style={{color:"#0408A0"}}> {this.state.FileName}</p>
          </Button>
          </ThemeProvider>
      </label>
      </Stack>
      
      </>
    );
  }
  
}
