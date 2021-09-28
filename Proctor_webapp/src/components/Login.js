import React, {useState } from 'react'
import '../css/login.css';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import Loginbtn from './Loginbtn';
import TextField from './TextField';
import Divider from '@mui/material/Divider';


function Login ()  {
    const history = useHistory();
    const[name,setName] = useState("");
    const responseGoogle = (response) => {
      setName(response.profileObj.name);
      /*setEmail(response.profileObj.email);
      setUrl(response.profileObj.imageUrl);*/
      history.push("/adminhome")
     }
    const failureHandle = (response) => {
      setName("Authorization Unsuccessfull!");
    }

    return (
      <div className="Main"> 
      
        <div className="login-reg">
        <Loginbtn property={'/register'}/>
        
        <div className = 'box'>
          <div className='box-title'><h3>WELCOME PROCTOR!</h3></div>
          <div className='box-item'>
            <h4 style={{textAlign:'left'}}>Sign in</h4>
            <GoogleLogin
               clientId="75011686800-cetim0bpgbit8r00u1umppb8oh0rcivj.apps.googleusercontent.com"
               buttonText="Sign in with Google"
               onSuccess={responseGoogle}
               onFailure={failureHandle}
               cookiePolicy={'single_host_origin'}
            />
            <div>
              <br/>
            <Divider>Or</Divider>
            <br/>
            </div>
            
            <TextField mode="SIGN IN" next= "/home"></TextField>
            
          
          
          
          
          </div>
          
        </div>
        
        </div>
        
        </div>
    )
}

export default Login
