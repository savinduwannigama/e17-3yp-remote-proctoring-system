import React, {useState }  from 'react'
import Button from './Button';
import GoogleLogin from 'react-google-login';
import { useHistory,Link } from 'react-router-dom';

import '../css/reg.css';
import Divider from '@mui/material/Divider';

import Validation from './Validation'
const Register = () => {
    const history = useHistory();
    const[name,setName] = useState("");
    const responseGoogle = (response) => {
      setName(response.profileObj.name);
      /*setEmail(response.profileObj.email);
      setUrl(response.profileObj.imageUrl);*/
      history.push("/signin")
     }
    const failureHandle = (response) => {
      setName("Authorization Unsuccessfull!");
    }
    return (
      <div className="Main">
        <div className="login-reg">
        <Button property={'/adminsignin'}/>
        {/* <div align="right" className="login-button">
            <span class="switcher switcher-1">
                <input type="checkbox" id="switcher-1" ></input>
                <label for="switcher-1" ></label>
                
            </span>
        </div> */}
        
        
        <div className = 'box'>
          <div className='box-title'>
              <h3>WELCOME ADMIN!</h3>
              <p style={{textAlign:"center",fontSize:"15px"}}>Please access the portal with your authorized email address</p>
    
          </div>
          <div className='box-item'>
          
         
            <h4>Register</h4>
            
            
            <div style={{textAlign:'center'}}>
            <GoogleLogin
              
               clientId="75011686800-cetim0bpgbit8r00u1umppb8oh0rcivj.apps.googleusercontent.com"
               buttonText="Register with Google"
               onSuccess={responseGoogle}
               onFailure={failureHandle}
               cookiePolicy={'single_host_origin'}
            />
            </div>
            <div>
              
            <Divider>Or</Divider>
            
            <Validation next={'/adminsignin'}/>
            <p style={{textAlign:"left",fontSize:'15px'}}>Already logged in?<Link to='/signin'> Sign in!</Link></p>
            </div>
            
            
            
          
          
          
          
          </div>
          
        </div>
      </div>
      </div>
    )
}

export default Register