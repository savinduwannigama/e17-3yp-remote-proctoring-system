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
//import JitsiMeetComponent from './JitsiMeet';
const theme = createTheme({
  
  palette: {
    
    neutral: {
      main: '#006666',
      contrastText: '#fff',
    },
  },
});

class Modal extends React.Component{
  /*constructor(props){
    super(props);
  }*/
  
  render(){
    const minute = 1000 * 60;
    const hour = minute * 60;
    //const day = hour * 24;
    //const year = day * 365;
    //previous start time this.props.einfo['start'].toString()
    const starttime = this.props.einfo['start']? this.props.einfo['start'].toString().replace("+0530 (India Standard Time)",''):'';
    const utctime = starttime? new Date(starttime).toUTCString():''
   const newdatestart = starttime? new Date(this.props.einfo['start']):''
   const currentdate = new Date()
   const dif = Date.parse(newdatestart) - Date.parse(currentdate)
    console.log("starttime in GMT",starttime)
    console.log("starttime in UTC",utctime)
    console.log("current",currentdate)
    console.log("new start time", newdatestart)
    console.log("difference in hours",dif/hour)
  
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
          
          <p>Start: {starttime}</p>
          
          {this.props.einfo['end'].toString()&& <p>End : {this.props.einfo['end'].toString()}</p>}
          {this.props.einfo['url'].toString()&& <p>Exam room :{this.props.einfo['url']}</p>}
           
           {dif<-2 && <p style = {{color:"yellow"}}>Exam has been already completed</p>}       
         
         <div className ="closebtn">
          <ThemeProvider theme={theme}>
            {  (dif>=-2) &&
          <Button color= "neutral" size="medium" variant="contained"  sx={{bgcolor:"white",color:'#006666',margin:'auto'}}> 
          <Link to={{pathname:'/meeting',state:{roomname:this.props.einfo['url']}}}  style={{ textDecoration: 'none', color:"#006666"}}>Join Meeting</Link>
         </Button>}
          </ThemeProvider>
          </div>
          </CardContent>
          </Card>
          
        </div>,document.body):null
    );
  }
}

export default  Modal;
