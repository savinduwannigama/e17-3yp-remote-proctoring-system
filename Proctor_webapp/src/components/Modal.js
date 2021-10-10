import React from "react";
import ReactDOM from "react-dom";
import '../css/Modal.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { createTheme,ThemeProvider } from '@mui/material/styles';
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
          <CardContent>
          Examination: {this.props.einfo['title']}
          <br/>
          Start:{this.props.einfo['start'].toString()}
          <br/>
          End : {this.props.einfo['end'].toString()}
          <br/>
          Url : <a href={this.props.einfo['url']} style={{color:'white'}}>{this.props.einfo['url']}</a>
          <br/>
          <div className ="closebtn">
            <ThemeProvider theme={theme}>
          <Button color= "neutral" size="small" variant="contained" onClick={this.props.close} sx={{bgcolor:"white",color:'#006666',margin:'auto'}}>CLOSE</Button>
          </ThemeProvider>
          </div>
          </CardContent>
          </Card>
          
        </div>,document.body):null
    );
  }
}

export default  Modal;
