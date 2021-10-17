import React from 'react'
import '../css/Portal.css';
import Portalbtn from './Portalbtn';
import logo from '../appicon3.png'

const Portal = () => {
   
    return (
       /* <div className="Portal">
            
            <div className="main">
            <div class="container">
          
          <span class="react-logo">
      
              <span class="nucleo"><img className="connexa" src={logo} alt="logo"/></span>
          </span>

  </div>
            <h1>THE REMOTE PROCTORING SYSTEM PORTAL</h1>
                <h2> Sign in / Register </h2>
                <div className="options">
                <Portalbtn property={'/adminsignin'} btname = {'ADMIN'} size= {'large'}/>
                </div>
                <div className="options">
                <Portalbtn property={'/signin'} btname = {'PROCTOR'}/>
                </div>
               
              
           
        
            </div>
        </div>*/
         <div className="Signin-Main"> 
      
         <div className="proctorlogin">
         <div style={{paddingTop:"55px"}}></div>
         
         <div className = 'lbox'>
         
           
           <div className='box-title'>
          
           <div class="container">
           
                   <span class="react-logo">
               
                       <span class="nucleo"><img className="connexa" src={logo} alt="logo"/></span>
                   </span>
    
           </div>
           
           
            
            
          
             
           </div>
           <div className='box-item'>
               <br/>
             <h4 style={{textAlign:"center"}}>Welcome to the Remote Proctoring System</h4>
             
              
             <div style={{textAlign:'center'}}>
                 <br/>
             <h6> Please choose an option below to enter the system </h6>
                <div className="options">
                <Portalbtn property={'/adminsignin'} btname = {'ADMIN'} size= {'large'}/>
                </div>
                <div className="options">
                <Portalbtn property={'/signin'} btname = {'PROCTOR'}/>
                </div>
             </div>
             <div>
               
            
             <br/>
             </div>
              <br/><br/><br/>
           
           
           
           
           </div>
           
         </div>
         
         </div>
         
         </div>
    )
}

export default Portal
