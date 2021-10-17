/*
Modal to display the content of an event in the calendar as a card

*/


import React from "react";
import ReactDOM from "react-dom";
import '../css/Modal.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import JitsiMeetComponent from './JitsiMeet';
const theme = createTheme({
  
  palette: {
    
    neutral: {
      main: '#006666',
      contrastText: '#fff',
    },
  },
});

class Modal extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      this.props.open? ReactDOM.createPortal(
        <div className = 'modal'>
          
          <Card variant="outlined" sx={{bgcolor:"#006666",color:'white'}}>
          <IconButton
              edge="end"
              color="inherit"
              onClick={this.props.close}
              aria-label="close"
              sx={{paddingLeft:"460px",paddingTop:"20px"}}
            >
              <CloseIcon />
            </IconButton>
          <CardContent>
          <p>Examination: {this.props.einfo['title']}</p>
          
          <p>Start:{this.props.einfo['start'].toString()}</p>
          
          {this.props.einfo['end'].toString()&& <p>End : {this.props.einfo['end'].toString()}</p>}
          {this.props.einfo['url'].toString()&& <p>Exam room :{this.props.einfo['url']}</p>}
           
                  
          <div className ="closebtn">
          <ThemeProvider theme={theme}>
          <Button color= "neutral" size="medium" variant="contained"  sx={{bgcolor:"white",color:'#006666',margin:'auto'}}> <Link to={{pathname:'/meeting',state:{roomname:this.props.einfo['title']}}}  style={{ textDecoration: 'none', color:"#006666"}}>Join Meeting</Link>
         </Button>
          </ThemeProvider>
          </div>
          </CardContent>
          </Card>
          
        </div>,document.body):null
    );
  }
}

export default  Modal;
