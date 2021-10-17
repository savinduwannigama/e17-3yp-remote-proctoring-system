import React, {useState } from 'react'
import '../css/login.css';
import GoogleLogin from 'react-google-login';
import { useHistory,Link } from 'react-router-dom';
import Loginbtn from './Loginbtn';
import image from './homevect.png';
import Divider from '@mui/material/Divider';
import logo from '../appicon3.png'
import axios from 'axios';
import Validationlogin from './Validationlogin';

function Login ()  {
    const history = useHistory();
    const[name,setName] = useState("");
    const[email,setEmail]= useState("");
    const[pwd,setPwd]=useState("");
    const[img,setImg] = useState("");
    const[reqfail,setReq]=useState("");
    const[failure,setFailure]=useState("");
    const responseGoogle = (response) => {
      console.log(response.profileObj)
      
      setEmail(response.profileObj.email);
      setPwd(response.profileObj.googleId)
      
      setName(response.profileObj.name);
      setImg(response.profileObj.imageUrl);
      
       
      /*setEmail(response.profileObj.email);
      setUrl(response.profileObj.imageUrl);*/
      
     }

    if(email!=='' && pwd !==''){
      const url = `http://143.244.139.140:5000/api/proctor/login`
      
      console.log("email set",email);
      console.log("password set",pwd);
      axios.post(url, {
        email:email,password:pwd}).then(resp => {
          setReq('');
          setFailure('')
          console.log(resp.data);
          localStorage.setItem("ptoken",resp.data["token"] )
          localStorage.setItem('rememberMe','true');
          localStorage.setItem('user',email);
          localStorage.setItem("username",name);
          localStorage.setItem("profileimage",img);
          history.push('/home');
        }).catch(error => {
          setReq(1);
          setFailure(error.response.data["message"])
        console.log(reqfail)
        console.log(error.response)
        console.log(error.response.data["message"])

        });
    }
    
    const failureHandle = (response) => {
      setName("Authorization Unsuccessfull!");
    }
    
    return (
      <div className="Signin-Main"> 
      
        <div className="proctorlogin">
        <Loginbtn property={'/register'}/>
        
        <div className = 'lbox'>
        
          
          <div className='box-title'>
         
          <div class="container">
          
		          <span class="react-logo">
              
			          <span class="nucleo"><img className="connexa" src={logo} alt="logo"/></span>
		          </span>
   
          </div>
          
          
           
           
         
            
          </div>
          <div className='box-item'>
            <h4 style={{textAlign:"left"}}>Proctor Sign in</h4>
            
             
            <div style={{textAlign:'center'}}>
            <GoogleLogin
               clientId="1030032301297-iu6nhih0fg4p7temv1b653egltob6n6r.apps.googleusercontent.com"
               buttonText="Sign in with Google"
               onSuccess={responseGoogle}
               onFailure={failureHandle}
               cookiePolicy={'single_host_origin'}
            />
            {reqfail && <p style={{color:"red",fontSize:"15px",textAlign:"center"}}>{failure}<br/>Please <Link to="/register">register </Link>using an authorized email</p>}
        
            </div>
            <div>
              
            <Divider>Or</Divider>
            <br/>
            </div>
            <Validationlogin next={'/home'} path={'proctor/login'} user={'proctor'}/>
           <Link to="/" style={{fontSize:"15px", color:"#3b3a3a"}}>Return to Portal</Link>
            <br/><br/><br/>
          
          
          
          
          </div>
          
        </div>
        
        </div>
        
        </div>
    )
}

export default Login
