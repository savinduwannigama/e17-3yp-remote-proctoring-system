import React from 'react'
import Button from './Button';
import '../css/App.css';
const Register = () => {
    return (
        <div className="login-reg">
        <Button property={'/login'}/>
        {/* <div align="right" className="login-button">
            <span class="switcher switcher-1">
                <input type="checkbox" id="switcher-1" ></input>
                <label for="switcher-1" ></label>
                
            </span>
        </div> */}
        
        <div class="grid-container">
          <div className="titlearea"><p>WELCOME PROCTOR!</p></div>
          <div className="grid-item">
            <p>Register</p>
          </div>
         
        </div>
        
      </div>
    )
}

export default Register
