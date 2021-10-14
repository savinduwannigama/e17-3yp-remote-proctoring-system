import React from 'react';
import ProctorAppBar from './ProctorAppBar';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Homecontent from './Content/Homecontent';

import jsonData from './jsonfiles/exams.json';
import Container from '@mui/material/Container';
import axios from "axios";
const CardConfig = [
  { chief_invigilating_exams: 
    [
      [
        {exam_room:"CO325"},
        {examname: "C0325",
         date: "Wednesday Apr 3,2021",
         starttime: "8.00 am",
         duration:"3hrs"
      
        }
      ]
    ],
   /* component: "card",
    children: [
      {
        component: "text",
        children: "Wednesday Apr 3,2021 8.00 am - GP106"
      },
    ]*/
  },
  
];
function Home() {
  const history = useHistory();
  const img = localStorage.getItem('profileimage');
  console.log(jsonData);
  axios.get('http://143.244.139.140:5000/api/admin/students/all').then(resp => {

    console.log(resp.data);
  });
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
      <br/>
    <Homecontent />
    <br/>
    </Box>
   
    </Container>
     
    </ProctorAppBar>
  
                
    </div>
  )
}

export default Home
