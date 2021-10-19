import React,{useState,useEffect } from 'react'
import Adminbtn from './Adminbtn'
import ButtonGroup from '@mui/material/ButtonGroup';
import "../css/Admin.css"
import NavBar from './AdminAppBar';
import Box from '@mui/material/Box';
import axios from 'axios';
function Adminhome() {
    const [fail, setfail] = useState('');
    const [proctors,setProctors]=useState('');
    const [students,setStudents] =useState('');
    const [courses,setCourses] =useState('');
    const [adminexams,setExams] = useState('');
    //first get all the proctors
    useEffect(() => {
        axios.get('http://143.244.139.140:5000/api/admin/proctors/all'
       /*,{ headers: {
          'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
        }}*/
      ).then(resp => {
        
        
        console.log("Response from api",resp.data);
        setProctors(resp.data)
        //localStorage.setItem("username",resp.data['name']);
        //sessionStorage.setItem("department",resp.data['department'])
      }).catch(error=>{
        console.log("Error response",error.response.data["error"])
        setfail(1);
        console.log(fail);
      });
      axios.get('http://143.244.139.140:5000/api/admin/students/all'
      /*,{ headers: {
         'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
       }}*/
     ).then(resp => {
       
       
       console.log("Response from api",resp.data);
       setStudents(resp.data)
       //localStorage.setItem("username",resp.data['name']);
       //sessionStorage.setItem("department",resp.data['department'])
     }).catch(error=>{
       console.log("Error response",error.response.data["error"])
       setfail(1);
       console.log(fail);
     });
     axios.get('http://143.244.139.140:5000/api/admin/courses/all'
      /*,{ headers: {
         'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
       }}*/
     ).then(resp => {
       
       
       console.log("Response from api",resp.data);
       setCourses(resp.data)
       //localStorage.setItem("username",resp.data['name']);
       //sessionStorage.setItem("department",resp.data['department'])
     }).catch(error=>{
       console.log("Error response",error.response.data["error"])
       setfail(1);
       console.log(fail);
     });
     axios.get('http://143.244.139.140:5000/api/admin/exams/all'
      /*,{ headers: {
         'Authorization': 'BEARER '+ localStorage.getItem("ptoken")
       }}*/
     ).then(resp => {
       
       
       console.log("Response from api",resp.data);
       setExams(resp.data)
       //localStorage.setItem("username",resp.data['name']);
       //sessionStorage.setItem("department",resp.data['department'])
     }).catch(error=>{
       console.log("Error response",error.response.data["error"])
       setfail(1);
       console.log(fail);
     });
      
    
    },[]);
    /*axios.get("http://143.244.139.140:5000/api/admin/courses/all").then(resp=>{
        console.log(resp.data)
    })
    axios.get("http://143.244.139.140:5000/api/admin/proctors/all").then(resp=>{
        console.log(resp.data)
    })*/
    const jsonProctors = JSON.stringify(proctors);
    const jsonStudents =JSON.stringify(students);
    const jsonCourses =JSON.stringify(courses);
    const jsonExams = JSON .stringify(adminexams);
    localStorage.setItem("Proctors",jsonProctors)
    localStorage.setItem("Students",jsonStudents);
    localStorage.setItem("Admincourses",jsonCourses);
    localStorage.setItem("Adminexams",jsonExams)
    return (
       
        <div className="admin-main">
            <NavBar></NavBar>
            
            <h3>Please upload the relevant files in CSV format.</h3>
            <Box  sx={{ justifyContent:"center", display: 'flex','& > *': { m: 1,}}} >
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add MasterSheet" value="mastersheet" url="exams/mastersheet" />
            
            </ButtonGroup>
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add courses" value="courses" url="courses/mastersheet"/>
            
            </ButtonGroup>
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add students" value="students" url="students/multiple"/>
            
            </ButtonGroup>
            <ButtonGroup  orientation="vertical">
            <Adminbtn btnname="Add Proctors" value="proctors" url="proctors/multiple"/>
            </ButtonGroup>
            </Box>
            
        </div>
        
    )
}

export default Adminhome
