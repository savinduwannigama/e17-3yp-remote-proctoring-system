import React,{useState,useEffect } from 'react'

import "../../css/Admin.css"
import AdminAppBar from '../AdminAppBar';
import HomeIcon from '@mui/icons-material/Home';

import path from '../jsonfiles/path.json'
import axios from 'axios';
import Errorcomp from '../Content/Error'
import HomePage from './Content/Homepage';
function Adminhome() {
    const [fail, setfail] = useState('');
    const [proctors,setProctors]=useState('');
    const [students,setStudents] =useState('');
    const [courses,setCourses] =useState('');
    const [adminexams,setExams] = useState('');
    //first get all the proctors
    useEffect(() => {
      axios.get(`${path[0]['path']}admin/admins/self`
      ,{ headers: {
         'Authorization': 'BEARER '+ localStorage.getItem("atoken")
       }}
     ).then(resp => {
       
       
       console.log("Self data",resp.data);
       localStorage.setItem("adminusername",resp.data['name']);
   
      
     }).catch(error=>{
       if(error.response){
         console.log("Error response",error.response.data["message"])
       }
       else{
         console.log(error)
       }
       setfail(1);
       console.log(fail);
     });
        axios.get(`${path[0]['path']}admin/proctors/all`
       ,{ headers: {
          'Authorization': 'BEARER '+ localStorage.getItem("atoken")
        }}
      ).then(resp => {
        
        
        console.log("Response from api",resp.data);
        setProctors(resp.data)
       
      }).catch(error=>{
        if(error.response){
          console.log("Error response",error.response.data["message"])
        }
        else{
          console.log(error)
        }
        setfail(1);
        console.log(fail);
      });
      axios.get(`${path[0]['path']}admin/students/all`
      ,{ headers: {
         'Authorization': 'BEARER '+ localStorage.getItem("atoken")
       }}
     ).then(resp => {
       
       
       console.log("Response from api",resp.data);
       setStudents(resp.data)
     
     }).catch(error=>{
      if(error.response){
        console.log("Error response",error.response.data["message"])
      }
      else{
        console.log(error)
      }
       setfail(1);
       console.log(fail);
     });
     axios.get(`${path[0]['path']}admin/courses/all`
      ,{ headers: {
         'Authorization': 'BEARER '+ localStorage.getItem("atoken")
       }}
     ).then(resp => {
       
       
       console.log("Response from api",resp.data);
       setCourses(resp.data)
       //localStorage.setItem("username",resp.data['name']);
       //sessionStorage.setItem("department",resp.data['department'])
     }).catch(error=>{
      if(error.response){
        console.log("Error response",error.response.data["message"])
      }
      else{
        console.log(error)
      }
       setfail(1);
       console.log(fail);
     });
     axios.get(`${path[0]['path']}admin/exams/all`
      ,{ headers: {
         'Authorization': 'BEARER '+ localStorage.getItem("atoken")
       }}
     ).then(resp => {
       
       
       console.log("Response from api",resp.data);
       setExams(resp.data)
       //localStorage.setItem("username",resp.data['name']);
       //sessionStorage.setItem("department",resp.data['department'])
     }).catch(error=>{
      if(error.response){
        console.log("Error response",error.response.data["message"])
      }
      else{
        console.log(error)
      }
       setfail(1);
       console.log(fail);
     });
      
    
    },[fail]);
   
    const jsonProctors = JSON.stringify(proctors);
    const jsonStudents =JSON.stringify(students);
    const jsonCourses =JSON.stringify(courses);
    const jsonExams = JSON.stringify(adminexams);
    localStorage.setItem("Proctors",jsonProctors)
    localStorage.setItem("Students",jsonStudents);
    localStorage.setItem("Admincourses",jsonCourses);
    localStorage.setItem("Adminexams",jsonExams)
    return (
       
        <div style={{color:"black"}}>
              <AdminAppBar item="Home" icon = {<HomeIcon/>}>
           
            <HomePage/>
           </AdminAppBar>
            {fail && <Errorcomp next="/adminsignin"/>}
        </div>
        
    )
}

export default Adminhome
