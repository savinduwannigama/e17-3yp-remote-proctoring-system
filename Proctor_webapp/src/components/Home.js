import React,{useState,useEffect } from 'react';
import ProctorAppBar from './ProctorAppBar';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Homecontent from './Content/Homecontent';
import Errorcomp from './Content/Error'
//import jsonData from './jsonfiles/exams.json';
import Container from '@mui/material/Container';
import axios from "axios";
import path from './jsonfiles/path.json'

function Home() {
  
  const history = useHistory();
  const img = localStorage.getItem('profileimage');
  const [fail, setfail] = useState('');
  const [invig,setinvig]=useState('');
  const [cinvig,setcinvig]=useState('');
  const[courses,setCourses]=useState('')
  //console.log(jsonData);
  useEffect(() => {
    axios.get(`${path[0]['path']}proctor/proctors/self`,
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

  axios.get(`${path[0]['path']}proctor/courses/invigilating/self`,
   { headers: {
      'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
    }}
  ).then(resp => {
    
    
    console.log("Invigilating courses from api",resp.data['invigilating_courses']);
    setinvig(resp.data)
   // localStorage.setItem("username",resp.data['name']);
    //sessionStorage.setItem("department",resp.data['department'])
  }).catch(error=>{
    console.log("Error response",error.response.data["error"])
    setfail(1);
    console.log(fail);
  });
  
  axios.get(`${path[0]['path']}proctor/courses/chief_invigilating/self`,
   { headers: {
      'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
    }}
  ).then(resp => {
    
    
    console.log("Chief Invigilating courses from api",resp.data['chief_invigilating_courses']);
   // localStorage.setItem("username",resp.data['name']);
    //sessionStorage.setItem("department",resp.data['department'])
    setcinvig(resp.data)
  }).catch(error=>{
    console.log("Error response",error.response.data["error"])
    setfail(1);
    console.log(fail);
  });
  }, []);
  
  
  const invigjson = JSON.stringify(invig)
  const chiefjson =JSON.stringify(cinvig)
  localStorage.setItem("invig courses",invigjson);
  localStorage.setItem("chief_invig courses",chiefjson)
  
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
