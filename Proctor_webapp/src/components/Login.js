import React from 'react'
import '../App.css';
import Loginbtn from './Loginbtn';
const Login = () => {
    return (
        <div className="login-reg">
        <Loginbtn ></Loginbtn>
      
        <div class="grid-container">
          <div className="titlearea"><p>WELCOME PROCTOR!</p></div>
          <div className="grid-item">
            <p>Log In</p>
          </div>
         
        </div>
        
        
      </div>
    )
}

export default Login
