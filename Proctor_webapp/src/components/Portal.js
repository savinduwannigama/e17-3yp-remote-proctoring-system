import React from 'react'
import '../css/Portal.css';
import Portalbtn from './Portalbtn';

const Portal = () => {
   
    return (
        <div className="Portal">
            <h1>THE REMOTE PROCTORING SYSTEM PORTAL</h1>
            <div className="main">
                <h2> Sign in / Register </h2>
                <div className="options">
                <Portalbtn property={'/adminsignin'} btname = {'ADMIN'} size= {'large'}/>
                </div>
                <div className="options">
                <Portalbtn property={'/signin'} btname = {'PROCTOR'}/>
                </div>
               
              
           
        
            </div>
        </div>
        
    )
}

export default Portal
