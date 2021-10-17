import React, {useState } from 'react'
import '../css/login.css';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import Loginbtn from './Loginbtn';

import Divider from '@mui/material/Divider';

import Validationlogin from './Validationlogin';

function Login ()  {
    const history = useHistory();
    const[name,setName] = useState("");
    const[img,setImg] = useState("");
    const responseGoogle = (response) => {
      setName(response.profileObj.name);
      setImg(response.profileObj.imageUrl);
      localStorage.setItem('rememberMe','true');
      localStorage.setItem('user',response.profileObj.email);
      localStorage.setItem("username",response.profileObj.name);
      localStorage.setItem("profileimage",response.profileObj.imageUrl);
      /*setEmail(response.profileObj.email);
      setUrl(response.profileObj.imageUrl);*/
      history.push("/home")
     }
    const failureHandle = (response) => {
      setName("Authorization Unsuccessfull!");
    }

    return (
      <div className="Signin-Main"> 
      
        <div className="proctorlogin">
        <Loginbtn property={'/register'}/>
        
        <div className = 'lbox'>
          <div className='box-title'><h3>WELCOME PROCTOR!</h3></div>
          <div className='box-item'>
            <h4 style={{textAlign:"left"}}>Sign in</h4>
            
             
            <div style={{textAlign:'center'}}>
            <GoogleLogin
               clientId="1030032301297-iu6nhih0fg4p7temv1b653egltob6n6r.apps.googleusercontent.com"
               buttonText="Sign in with Google"
               onSuccess={responseGoogle}
               onFailure={failureHandle}
               cookiePolicy={'single_host_origin'}
            />
            </div>
            <div>
              <br/>
            <Divider>Or</Divider>
            <br/>
            </div>
            <Validationlogin next={'/home'} path={'proctor/login'} user={'proctor'}/>
           
            
          
          
          
          
          </div>
          
        </div>
        
        </div>
        
        </div>
    )
}

export default Login
