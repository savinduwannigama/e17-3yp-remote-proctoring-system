
import React, {useState }from 'react'
import GoogleLogin from 'react-google-login';
import { useHistory,Link } from 'react-router-dom';
import Loginbtn from './Loginbtn';
import Divider from '@mui/material/Divider';
import "../css/Admin.css"
import logo from '../appicon3.png'
import axios from 'axios';
import Validationlogin from './Validationlogin';
import '../css/login.css';
import path from './jsonfiles/path.json'

function Adminlogin() {
    const history = useHistory();
    const[name,setName] = useState("");
    const[email,setEmail]= useState("");
    const[pwd,setPwd]=useState("");
    const[img,setImg] = useState("");
    const[reqfail,setReq]=useState("");
    const[failure,setFailure]=useState("");
    /*const[email,setEmail] = useState("");
    const [url,setUrl] = useState("");*/

    const responseGoogle = (response) => {
      setEmail(response.profileObj.email);
      setPwd(response.profileObj.googleId)
      
      setName(response.profileObj.name);
      setImg(response.profileObj.imageUrl);
        /*localStorage.setItem('rememberMe','true');
        localStorage.setItem('user',response.profileObj.email);
        localStorage.setItem("username",response.profileObj.name);
        localStorage.setItem("profileimage",response.profileObj.imageUrl);
       */
        /*setEmail(response.profileObj.email);
        setUrl(response.profileObj.imageUrl);*/
       // history.push("/adminhome")
    }
    if(email!=='' && pwd !==''){
      const url = `${path[0]['path']}admin/login`
      
      console.log("email set",email);
      console.log("password set",pwd);
      axios.post(url, {
        email:email,password:pwd}).then(resp => {
          setReq('');
          setFailure('')
          console.log(resp.data);
          localStorage.setItem("atoken",resp.data["token"] )
          localStorage.setItem('arememberMe','true');
          localStorage.setItem('adminuser',email);
          localStorage.setItem("ausername",name);
          localStorage.setItem("aprofileimage",img);
          history.push('/adminhome');
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
  <div class="container">
          
          <span class="react-logo">
          
            <span class="nucleo"><img className="connexa" src={logo} alt="logo"/></span>
          </span>

      </div>
     
    </div>
  <div className='box-item'>
    <h4 style={{textAlign:"left", paddingBottom:"0px"}}>Admin Sign in</h4>
    
    
    <div style={{textAlign:'center'}}>
    <GoogleLogin
       clientId="75011686800-cetim0bpgbit8r00u1umppb8oh0rcivj.apps.googleusercontent.com"
       buttonText="Sign in with Google"
       onSuccess={responseGoogle}
       onFailure={failureHandle}
       cookiePolicy={'single_host_origin'}
    />
    {reqfail && <p style={{color:"red",fontSize:"15px",textAlign:"center"}}>{failure}<br/>Please <Link to="/adminreg">register </Link>using an authorized email</p>}
        
    </div>
    <div>
      
    <Divider>Or</Divider>
    <br/>
    </div>
    <Validationlogin next={'/admin/home'} path={'admin/login'} user={'admin'}/>
    <Link to="/" style={{fontSize:"15px", color:"#3b3a3a"}}>Return to Portal</Link>
            <br/><br/><br/>
    
  
  
  
  
  </div>
  
</div>

</div>

</div>
    )
}

export default Adminlogin
