import React,{useState,useEffect } from 'react';
import ProctorAppBar from './ProctorAppBar';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Homecontent from './Content/Homecontent';
import Errorcomp from './Content/Error'
import jsonData from './jsonfiles/exams.json';
import Container from '@mui/material/Container';
import axios from "axios";

function Home() {
  const history = useHistory();
  const img = localStorage.getItem('profileimage');
  const [fail, setfail] = useState('');
  //console.log(jsonData);
  useEffect(() => {
    axios.get('http://143.244.139.140:5000/api/proctor/proctors/self',
   { headers: {
      'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
    }}
  ).then(resp => {
    
    
    console.log("Response from api",resp.data);
    localStorage.setItem("username",resp.data['name']);
    sessionStorage.setItem("department",resp.data['department'])
  }).catch(error=>{
    console.log("Error response",error.response.data["error"])
    setfail(1);
    console.log(fail);
  });
  }, []);
  
  
  /*const rememberMe = localStorage.getItem('rememberMe') === 'true';
  const user = rememberMe ? localStorage.getItem('user') : '';*/
  //add to line 20 if necessary <Button variant="contained" type="submit"  onClick={() => history.push('/meeting')}>Join Meeting</Button>
  return (
    
    <div className="home">
    <ProctorAppBar item="Home Page" icon = {<HomeIcon/>}>
    
    <Container>
    {/*CardConfig.map(config => RenderCard(config))*/}
    
    <Box sx={{ bgcolor: '#00666633',width:"100%",margin:"auto",borderRadius:"32px"  }} >
      <br/>
     <h3 style={{textAlign:"center"}}>Upcoming Examinations</h3>
      <br/><br/>
    <Homecontent />
    <br/>
    </Box>
   
    </Container>
     {fail && <Errorcomp/>}
     
    </ProctorAppBar>
    
                
    </div>
  )
}

export default Home
