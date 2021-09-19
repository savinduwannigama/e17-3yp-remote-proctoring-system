import React from 'react';
import '../css/login.css';
import { useHistory } from 'react-router-dom';
const Button = (props) => {
    const history = useHistory();
    return (
        <div align="right" className="login-button">
            <span class="switcher-login switcher-l1">
                <input type="checkbox" id="switcher-l1" onChange={() => history.push(props.property)}></input>
                <label for="switcher-l1"></label>
            </span>
        </div>
    )
}


export default Button