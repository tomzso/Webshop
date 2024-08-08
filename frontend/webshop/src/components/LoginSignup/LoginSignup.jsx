import React, {useState, useContext} from 'react'
import './LoginSignup.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { ShopContext } from "../../context/shop-context";
import {login, register} from '../../services/apiService'
import {useNavigate} from "react-router-dom"


const LoginSignup = () => {
  const {name,    email,    password,    handleNameChange,    handleEmailChange,    handlePasswordChange, setUserName, setToken, setUserId} = useContext(ShopContext);

  const [action, setAction] = useState("Login");

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailure, setLoginFailure] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerFailure, setRegisterFailure] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async () => {
    if(action==="Login"){
      console.log("Logging in user with name: ", name, " password: ", password);
      const loginData = {
        userName: name,
        password: password
      }
      const data = await login(loginData);
      // Check if obj is empty
      const success = Object.keys(data).length === 0 ? false : true;
  
      if (success) {
        // Show the success dialog
        setLoginSuccess(true);

        setUserName(data.userName);
        setToken(data.token);
        setUserId(data.userId);
        console.log("LOGIN:",data.userName, data.token, data.userId);
        


        // Hide the success dialog after 3 seconds
        setTimeout(() => {
          setLoginSuccess(false);
          navigate("/");
        }, 2500);
        
      } else {
        // Show the failure dialog
        setLoginFailure(true);

        // Hide the failure dialog after 3 seconds
        setTimeout(() => {
          setLoginFailure(false);
        }, 2500);
      }
   

    }
    else{
      
      console.log("Registering user with name: ", name, " password: ", password, " email: ", email);
      const registerData = {
        userName: name,
        password: password,
        email: email
      }
      const success = await register(registerData);


      

      if (success) {
        // Show the success dialog
        setRegisterSuccess(true);

        // Hide the success dialog after 3 seconds
        setTimeout(() => {
          setRegisterSuccess(false);
          navigate("/");
        }, 2500);

        
      } else {
        // Show the failure dialog
        setRegisterFailure(true);

        // Hide the failure dialog after 3 seconds
        setTimeout(() => {
          setRegisterFailure(false);
        }, 2500);
      }

    }
  };

  const handleBack =  () => {
    navigate("/");
  }



  return (
    <div>
      <div className='container'>
        <div className='header'>
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" onChange={handleNameChange}/>
          </div>

          {action==="Login"?<div></div>:         
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email Id" onChange={handleEmailChange}/>
          </div>}

          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" onChange={handlePasswordChange}/>
          </div>
        </div>
        <div className="forgot-password">Lost Password? <span> Click here</span></div>

        <div className="submit-container">
          < div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign up</div>
          < div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>

        < div className="next" onClick={()=>{handleSubmit()}} >Next</div>
        < div className="next" onClick={()=>{handleBack()}} >Back</div>

        <div className=""></div>
      </div>

      <div>
        
        {loginSuccess && (
          <div className="successDialog">
            Login Success!
          </div>
        )}
        {loginFailure && (
          <div className="failureDialog">
            Login Failed!
          </div>
        )}
      </div>
      <div>
        
        {registerSuccess && (
          <div className="successDialog">
            Register Success!
          </div>
        )}
        {registerFailure && (
          <div className="failureDialog">
            Register Failed!
          </div>
        )}
      </div>

    
    </div>

  )
}

export default LoginSignup