
import React, {useState }from 'react'
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import Loginbtn from './Loginbtn';
import Divider from '@mui/material/Divider';
import "../css/Admin.css"
import Validationlogin from './Validationlogin';
import '../css/login.css';

function Adminlogin() {
    const history = useHistory();
    const[adminname,setName] = useState("");
    const[adminimg,setImg] = useState("");
    /*const[email,setEmail] = useState("");
    const [url,setUrl] = useState("");*/

    const responseGoogle = (response) => {
        setName(response.profileObj.name);
        setImg(response.profileObj.imageUrl);
        localStorage.setItem('rememberMe','true');
        localStorage.setItem('user',response.profileObj.email);
        localStorage.setItem("username",response.profileObj.name);
        localStorage.setItem("profileimage",response.profileObj.imageUrl);
       
        /*setEmail(response.profileObj.email);
        setUrl(response.profileObj.imageUrl);*/
        history.push("/adminhome")
    }
    const failureHandle = (response) => {
        setName("Authorization Unsuccessfull!");
    }

    return (
       /* <div className="page">
        <div className="login">
        <h2>WELCOME ADMIN!</h2>
      
       
        <div className="item">

          <p>Please access the portal with your authorized email address</p>
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
        </div>*/


<div className="Signin-Main"> 
      
<div className="proctorlogin">
<Loginbtn property={'/adminreg'}/>

<div className = 'lbox'>
  <div className='box-title'>
      <h3>WELCOME ADMIN!</h3>
      <p style={{textAlign:"center",fontSize:"15px"}}>Please access the portal with your authorized email address</p>
    
    </div>
  <div className='box-item'>
    <h4 style={{textAlign:"left", paddingBottom:"0px"}}>Sign in</h4>
    
    
    <div style={{textAlign:'center'}}>
    <GoogleLogin
       clientId="75011686800-cetim0bpgbit8r00u1umppb8oh0rcivj.apps.googleusercontent.com"
       buttonText="Sign in with Google"
       onSuccess={responseGoogle}
       onFailure={failureHandle}
       cookiePolicy={'single_host_origin'}
    />
    
    </div>
    <div>
      
    <Divider>Or</Divider>
    <br/>
    </div>
    <Validationlogin next={'/adminhome'} path={'admin/login'} user={'admin'}/>
   
    
  
  
  
  
  </div>
  
</div>

</div>

</div>
    )
}

export default Adminlogin
