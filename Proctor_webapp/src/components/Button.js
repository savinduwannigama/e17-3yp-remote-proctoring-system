import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useHistory } from 'react-router-dom';
const Button = (props) => {
    const history = useHistory();
    return (
        <div align="right" className="login-button">
            <span class="switcher switcher-1">
                <input type="checkbox" id="switcher-1" onChange={() => history.push(props.property)}></input>
                <label for="switcher-1"></label>
            </span>
        </div>
    )
}


export default Button
