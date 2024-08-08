import React, { useContext }  from "react";
import { ShoppingCart} from 'phosphor-react'
import { Link } from 'react-router-dom'
import './navbar.css'

import { ShopContext } from "../context/shop-context";

export const Navbar = () => {
    const { userName, setUserName, setToken, setUserId  } = useContext(ShopContext);

    const handleLogout = () => {
        setUserName('');
        setToken('');
        setUserId('');
    };

    return (
        <div className="navbar">
            
            {userName && <div className="userName"> {userName} </div>}
            {userName && (
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                )}

            {!userName && (
                    <Link to="/loginsignup" className="userName"> Login/SignUp </Link>
                )}

            <div className="links">
                <Link to="/"> Shop </Link>
                <Link to="/settings"> Settings </Link>
                <Link to="/cart">
                    <ShoppingCart size={32} />
                </Link>
            </div>
        </div>
    )
}