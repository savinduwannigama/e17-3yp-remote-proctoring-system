import React, {useState }  from 'react'
import Button from './Button';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import TextField from './TextField';
import '../css/reg.css';
const Register = () => {
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
      <>
        <div className="login-reg">
        <Button property={'/signin'}/>
        {/* <div align="right" className="login-button">
            <span class="switcher switcher-1">
                <input type="checkbox" id="switcher-1" ></input>
                <label for="switcher-1" ></label>
                
            </span>
        </div> */}
        
        
        <div className = 'box'>
          <div className='box-title'><h3>WELCOME PROCTOR!</h3></div>
          <div className='box-item'>
            <h4 style={{textAlign:'left'}}>Register</h4>
            <GoogleLogin
               clientId="75011686800-cetim0bpgbit8r00u1umppb8oh0rcivj.apps.googleusercontent.com"
               buttonText="Register with Google"
               onSuccess={responseGoogle}
               onFailure={failureHandle}
               cookiePolicy={'single_host_origin'}
            />
            
            <h6>Or</h6>
            <TextField mode="REGISTER"></TextField>
            
          
          
          
          
          </div>
          
        </div>
      </div>
      </>
    )
}

export default Register
