import React, { useState, useContext } from 'react';
import './loginSignup.css';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import { ShopContext } from "../../context/shop-context";
import { login, register } from '../../services/apiService';
import { useNavigate } from "react-router-dom";

const Dialog = ({ type, message }) => {
  if (!message) return null;
  return (
    <div className={`${type}Dialog`}>
      {message}
    </div>
  );
};

export const LoginSignup = () => {
  const { name, email, password, handleNameChange, handleEmailChange, handlePasswordChange, setUserName, setToken, setUserId } = useContext(ShopContext);
  const [action, setAction] = useState("Login");
  const [dialog, setDialog] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userData = { userName: name, password };
    if (action === "Login") {
      const response = await login(userData);
      if (response.success) {
        setDialog({ type: 'success', message: response.message });
        setTimeout(() => {
          setUserName(response.data.userName);
          setToken(response.data.token);
          setUserId(response.data.userId);
          navigate("/");
          setDialog({ type: '', message: '' });
        }, 2500);
      } else {
        setDialog({ type: 'failure', message: response.message });
        setTimeout(() => setDialog({ type: '', message: '' }), 2500);
      }
    } else {
      const response = await register({ ...userData, email });
      if (response.success) {
        setDialog({ type: 'success', message: response.message + ' Please login to continue' });
        setTimeout(() => {
          setDialog({ type: '', message: '' });
        }, 2500);
      } else {
        setDialog({ type: 'failure', message: response.message });
        setTimeout(() => setDialog({ type: '', message: '' }), 2500);
      }
    }
  };

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
            <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
          </div>

          {action === "Sign Up" && (
            <div className="input">
              <img src={email_icon} alt="" />
              <input type="email" placeholder="Email Id" value={email} onChange={handleEmailChange} />
            </div>
          )}

          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </div>
        </div>

        <div className="submit-container">
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
        </div>

        <div className="next" onClick={handleSubmit}>Next</div>
      </div>

      <Dialog type="success" message={dialog.type === 'success' ? dialog.message : ''} />
      <Dialog type="failure" message={dialog.type === 'failure' ? dialog.message : ''} />
    </div>
  );
};

export default LoginSignup;
