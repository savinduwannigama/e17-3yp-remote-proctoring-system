import React, {useState }  from 'react'
import Button from './Button';
import GoogleLogin from 'react-google-login';
import { useHistory,Link } from 'react-router-dom';
import logo from '../appicon3.png'
import '../css/reg.css';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import path from './jsonfiles/path.json'
import Validation from './Validation'
const Register = () => {
    const history = useHistory();
    const[name,setName] = useState("");
    const[email,setEmail]= useState("");
    const[pwd,setPwd]=useState("");
    const[cpwd,setCpwd] = useState("");
    const[reqfail,setReq]=useState("");
    const[failure,setFailure]=useState("");
    const responseGoogle = (response) => {
      setEmail(response.profileObj.email);
      setPwd(response.profileObj.googleId);
      setCpwd(response.profileObj.googleId);
      /*setEmail(response.profileObj.email);
      setUrl(response.profileObj.imageUrl);*/
      //history.push("/signin")
     }
     //<p style={{textAlign:"left",fontSize:'15px'}}>Already logged in?<Link to='/signin'> Sign in!</Link></p>
           
     if(email!=='' && pwd !==''){
      const url = `${path[0]['path']}proctor/register`
      
      console.log("email set",email);
      console.log("password set",pwd);
      axios.post(url, {
        email:email,password0:pwd,password1:cpwd}).then(resp => {
          setReq('');
          setFailure('')
          console.log(resp.data);
          /*localStorage.setItem("ptoken",resp.data["token"] )
          localStorage.setItem('rememberMe','true');
          localStorage.setItem('user',email);
          localStorage.setItem("username",name);
          localStorage.setItem("profileimage",img);*/
          history.push('/signin');
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
      <div className="Main">
        <div className="login-reg">
        <Button property={'/signin'}/>
        {/* <div align="right" className="login-button">
            <span class="switcher switcher-1">
                <input type="checkbox" id="switcher-1" ></input>
                <label for="switcher-1" ></label>
                
            </span>
        </div> */}
        
        
        <div className = 'box'>
          <div className='box-title'>
          <div class="container">
          
          <span class="react-logo">
          
            <span class="nucleo"><img className="connexa" src={logo} alt="logo"/></span>
          </span>

          </div>
                   
          
          </div>
          <div className='box-item'>
          
         
            <h4>Proctor Registeration</h4>
            
            
            <div style={{textAlign:'center'}}>
            <GoogleLogin
              
               clientId="75011686800-cetim0bpgbit8r00u1umppb8oh0rcivj.apps.googleusercontent.com"
               buttonText="Register with Google"
               onSuccess={responseGoogle}
               onFailure={failureHandle}
               cookiePolicy={'single_host_origin'}
            />
            {reqfail && <p style={{color:"red",fontSize:"15px",textAlign:"center"}}>{failure}</p>}
        
            </div>
            <div>
              
            <Divider>Or</Divider>
            
            <Validation next={'/signin'} path={'proctor/register'}/>
            <Link to="/" style={{fontSize:"15px", color:"#3b3a3a"}}>Return to Portal</Link>
            <br/><br/><br/>
            
            
            </div>
            
            
            
          
          
          
          
          </div>
          
        </div>
      </div>
      </div>
    )
}

export default Register

