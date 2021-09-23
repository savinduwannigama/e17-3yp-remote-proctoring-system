import { color } from '@mui/system';
import React, {useState }from 'react'
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import "../css/Admin.css"


function Adminlogin() {
    const history = useHistory();
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const [url,setUrl] = useState("");

    const responseGoogle = (response) => {
        setName(response.profileObj.name);
        setEmail(response.profileObj.email);
        setUrl(response.profileObj.imageUrl);
        history.push("/adminhome")
    }
    const failureHandle = (response) => {
        setName("Authorization Unsuccessfull!");
    }

    return (
        <div className="login-reg">
        
      
        <div class="grid-container">
          <div className="titlearea"><p>WELCOME ADMIN!</p></div>
          <div className="grid-item">
            <p>Log In</p>
            <GoogleLogin
             clientId="75011686800-cetim0bpgbit8r00u1umppb8oh0rcivj.apps.googleusercontent.com"
             buttonText="Sign in with Google"
             onSuccess={responseGoogle}
             onFailure={failureHandle}
             cookiePolicy={'single_host_origin'}
            />
            <h6 style={{color:"red"}}>{name}</h6>
            
          </div>
         
        </div>
        </div>
    )
}

export default Adminlogin
